import { vec2, vec3 } from 'gl-matrix';
import ImageViewer from './imageViewer';
import TextRenderContext from './textRenderContext';
import { requestAnimFrame } from './webgl-utils';
import { showAlert, consoleWarn, addKeyDownHandler, addKeyUpHandler,
  addMouseMoveHandler, addMouseUpHandler, addMouseWheelHandler,
  isArray, isString, isNumber, isFunction, isUndefined } from './utility';
import { findRepresentativePoints2, findClosePointOfLowDensityNDDescend, findClosePointOfLowDensity,
  markPointsInStencilMap, vectorLineIntersection2D, pointInsidePolygon } from './algorithm';
import PointViewer from './pointViewer';
import DensityViewer from './densityViewer';
import HistogramViewer from './histogramViewer';
import CoordinateSystem from './coordinateSystem';
import Colormap from './colormap';
import Transform from './transform';
import { OPTIONS, setCurrentPlot } from './plotOptions';

let ENABLE_CONTINUOUS_RENDERING = false;
let SHOW_FPS = false;
const SIMULATE_LOW_FPS = false;

/**
 * @summary A fast scatterplot rendered with WebGL
 */
// eslint-disable-next-line import/prefer-default-export
export class GlobalView {
  /**
   * @constructor
   * @export
   * @param {HTMLDivElement} divElement the html div element to contain the canvas
   * @param {OPTIONS} startupOptions  startup options
   */
  constructor(divElement, startupOptions) {
    if (!(this instanceof GlobalView)) {
      throw new Error('GlobalView cannot be invoked without "new"');
    }

    this.canvas = null;
    this.divElement = divElement;
    this.initializeCanvas(divElement);

    // Silently ignore calls to invalidate during initialization
    this.disableInvalidate = true;

    const divStyle = window.getComputedStyle(divElement);

    this.gl.backColor = divStyle.backgroundColor === 'transparent' ?
      [0, 0, 0, 0] :
      Colormap.rgbStringToFloatArray(divStyle.backgroundColor);
    this.gl.foreColor = Colormap.rgbStringToFloatArray(this.gl.foreColorString = divStyle.color);

    this.textRenderContext = new TextRenderContext(this.gl, this.canvas);
    this.textRenderContext.setFont(`${divStyle.fontSize} ${divStyle.fontFamily}`);

    this.timeNow = performance.now();
    this.deltaTime = 0.1;
    this.fps = null;
    this.fpsStart = this.timeNow;
    this.frameCounter = 0;

    this.pointViewer = new PointViewer(this.gl, this);
    this.imageViewer = new ImageViewer(this.gl, this);
    this.densityViewer = new DensityViewer(this.gl, this);
    this.histogramViewer = new HistogramViewer(this.gl, this);
    this.coordSys = new CoordinateSystem(this.gl, this);
    this.colormap = new Colormap(this.gl, this);
    /** @type  {Array<Viewer>} */
    this.viewers = [
      this.pointViewer, this.imageViewer, this.densityViewer,
      this.histogramViewer, this.coordSys, this.colormap];

    this.dataset = null;
    this.activeInputs = Array.create(Transform.NumDim, -1);
    this.animatedInputs = Array.create(Transform.NumDim, () => ({ target: null, f: 0 }));

    this.points = this.pointViewer.points;
    this.pointViewer.representativePoints = this.pointViewer.createPointSet([0, 255, 0, 255], 1);
    this.createPointSet = this.pointViewer.createPointSet.bind(this.pointViewer);
    this.removePointSet = this.pointViewer.removePointSet.bind(this.pointViewer);

    this.mouseRect = null;
    this.mousePolygon = null;
    this.pointDrag = null;

    this.invalidating = false;
    this.plotTransform = null;
    this.plotBounds = {
      x: 0, y: 0, width: 0, height: 0,
    }; // Plot bounds [pixel]

    /** @enum */
    this.options = {};
    this.offscreenRendering = null;

    this.disableInvalidate = false;
    this.resizeTimer = null;

    this.pushedOptions = [];

    // >>> Mouse handlers

    this.mouseOverDatapoint = -1;
    this.pointDragDownPos = null;
    this.viewDragStartPos = null;
    this.viewDragX = null;
    this.viewDragY = null;
    this.viewDragZ = null;
    this.mouseOverAxisLabel = null;
    this.mouseOverImage = null;
    this.imageDragStartPos = null;
    this.imageDragImages = [];

    this.ctrlPressed = false;
    this.shiftPressed = false;
    this.keyCodeCtrl = navigator.appVersion.indexOf('Mac') === -1 ? 17 : 224;
    this.keyCodeShift = 16;

    /**
     * @callback onMouseOverDatapointCallback
     * @param  {Dataset} dataset
     * @param  {number} mouseOverDatapoint Index of the point the mouse cursor is hovering over
     */
    /**
     * There is no mouse-leave event for datapoints.
     * When the mouse cursor leaves a datapoint,
     * this event is raised with `mouseOverDatapoint == -1`.
     * @summary Event handler that gets fired everytime
     *          the mouse cursor enters the boundaries of a datapoint
     * @member
     * @alias onMouseOverDatapoint
     * @memberof GlobalView
     * @type {onMouseOverDatapointCallback}
     */
    this.onMouseOverDatapoint = null;

    /**
     * @callback onMouseOverAxisLabelCallback
     * @param  {DataVector} dataVector Data vector whose axis label the mouse cursor
     *         is hovering over
     * @param  {{l: number, t: number, r: number, b: number}} labelRect
     *          Area of the label relative to the location of the plot
     */
    /**
     * There is no mouse-leave event for axis labels.
     * When the mouse cursor leaves an axis label, this event is raised with
     * `dataVector == labelRect == null`.
     * @summary Event handler that gets fired everytime the mouse cursor
     *          enters the boundaries of an axis label
     * @member
     * @alias onMouseOverAxisLabel
     * @memberof GlobalView
     * @type {onMouseOverAxisLabelCallback}
     */
    this.onMouseOverAxisLabel = null;

    /**
     * @callback onSelectionChangedCallback
     * @param  {Dataset} dataset
     * @param  {Array<number>} selection Array of indices of all selected points
     */
    /**
     * When the selection is cleared, this event is raised with `selection == []`.
     * @summary Event handler that gets fired everytime the collection of selected points is altered
     * @member
     * @alias onSelectionChanged
     * @memberof GlobalView
     * @type {onSelectionChangedCallback}
     */
    this.onSelectionChanged = null;

    /**
     * @callback onLassoSelectionCallback
     * @param  {Dataset} dataset
     * @param  {Array<number>} selection Array of indices of all selected points
     * @param  {{l: number, t: number, r: number, b: number}|Array<Array<number>>} lassoArea
     * Rectangle or list of 2D points of the area selected
     * by the lasso relative to the location of the plot
     */
    /**
     * This event is fired with `selection == []` if no points lie inside the lasso area.
     * @summary Event handler that gets fired everytime a lasso selection was made
     * @member
     * @alias onLassoSelection
     * @memberof GlobalView
     * @type {onLassoSelectionCallback}
     */
    this.onLassoSelection = null;

    /**
     * @callback onThumbnailSelectionChangedCallback
     * @param  {Dataset} dataset
     * @param  {Array<Thumbnail>} selection Array of all selected images
     */
    /**
     * When the selection is cleared, this event is raised with `selection == []`.
     * @summary Event handler that gets fired everytime the collection of selected images is altered
     * @member
     * @alias onThumbnailSelectionChanged
     * @memberof GlobalView
     * @type {onThumbnailSelectionChangedCallback}
     */
    this.onThumbnailSelectionChanged = null;

    /**
     * @summary Event handler that gets fired when dragged over canvas
     */
    this.ondragover = null;

    /**
     * @summary Event handler that gets fired when dropped on canvas
     */
    this.ondrop = null;

    this.addEventHanders();

    this.initializeGL();

    // Hook to window-resize event and fire once for initial setup
    window.addEventListener('resize', this.onresize.bind(this), false);
    this.onresize();

    // Set unset options to default values
    this.setDefaultOptions();
    this.setOptions(startupOptions);
  }

  /**
   * Initializes the html canvas within the specified div element
   * @param {HTMLDivElement} div
   */
  initializeCanvas(div) {
    for (let i = 0; i < div.children.length; i += 1) {
      if (div.children[i] instanceof HTMLCanvasElement && div.children[i].globalViewWebGLCanvas) {
        // If div already contains a GlobalView-WebGL-canvas, share the canvas
        this.canvas = /** @type {HTMLCanvasElement} */ (div.children[i]);
        break;
      }
    }

    // create the canvas element if doesn't exist
    if (this.canvas === null) {
      this.canvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
      this.canvas.setAttribute('id', 'webGLCanvas');
      this.canvas.style.position = 'static';// "absolute";
      this.canvas.style.left = '0px';
      this.canvas.style.top = '0px';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.backgroundColor = 'transparent';
      this.canvas.globalViewWebGLCanvas = true;
      div.appendChild(this.canvas);
    }

    this.gl = this.canvas.getContext('webgl');
    if (!this.gl) {
      showAlert('Error: WebGL not supported');
      return;
    }
    const OESElementIndexUint = this.gl.getExtension('OES_element_index_uint');
    if (!OESElementIndexUint) {
      consoleWarn('GlobalView warning: ' +
        'Unsupported WebGL extension: OES_element_index_uint');
    }
    this.gl.ext = this.gl.getExtension('ANGLE_instanced_arrays');
    if (!this.gl.ext) {
      consoleWarn('GlobalView warning: ' +
        'Unsupported WebGL extension: ANGLE_instanced_arrays');
    }
  }

  /** Initialize global view gl context */
  initializeGL() {
    this.gl.disable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendEquationSeparate(this.gl.FUNC_ADD, this.gl.FUNC_ADD);
    this.gl.blendFuncSeparate(
      this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA,
      this.gl.ONE, this.gl.ONE,
    );
    this.gl.clearColor(...this.gl.backColor);
  }

  /** Add the event handlers */
  addEventHanders() {
    addKeyDownHandler((event) => {
      if (event.keyCode === this.keyCodeCtrl) {
        this.ctrlPressed = true;
      } else if (event.keyCode === this.keyCodeShift) {
        this.shiftPressed = true;
      }
    });

    addKeyUpHandler((event) => {
      if (event.which === this.keyCodeCtrl) {
        this.ctrlPressed = false;
      } else if (event.keyCode === this.keyCodeShift) {
        this.shiftPressed = false;
      }
    });

    this.canvas.oncontextmenu = function () {
      return false;
    }; // Disable canvas context menu

    // add mouse event handlers
    this.canvas.onmousedown = this.onCanvasMouseDown.bind(this);
    addMouseMoveHandler(this.onMouseMove.bind(this));
    addMouseUpHandler(this.onMouseUp.bind(this));
    this.canvas.onmouseleave = this.onMouseLeave.bind(this);
    addMouseWheelHandler(this.onMouseWheel.bind(this));

    this.canvas.ondragover = function (event) {
      if (this.ondragover !== null) {
        this.ondragover(event);
      }
    }.bind(this);

    this.canvas.ondrop = function (event) {
      if (this.ondrop !== null) {
        this.ondrop(event);
      }
    }.bind(this);
  }

  /**
   * @summary Request to rerender the plot
   */
  invalidate() {
    if (this.disableInvalidate) {
      return;
    }
    if (this.invalidating === false && this.offscreenRendering === null) {
      this.invalidating = true;
      requestAnimFrame(this.render.bind(this));
    }
  }

  /** @summary Event handler for onresize event */
  onresize() {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    if (!this.offscreenRendering && (width !== this.gl.width || height !== this.gl.height)) {
      this.gl.width = width;
      this.canvas.width = width;
      this.gl.height = height;
      this.canvas.height = height;
      this.gl.viewport(0, 0, this.gl.width, this.gl.height);
      this.textRenderContext.onResize();
      if (this.options.padding) {
        this.setPlotBounds(this.options.padding);
      }
      if (this.invalidating === false && this.offscreenRendering === null) {
        this.invalidating = true;
        requestAnimFrame(this.render.bind(this));
      }

      // Refire event after 100ms in case another resize handler queued
      // after this on changes the canvas size
      if (this.resizeTimer !== null) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(this.onresize.bind(this), 100);
    }
  }

  /** @summary Returns the plot bounds */
  getPlotBounds() {
    return this.plotBounds;
  }

  /**
   * @summary Sets the plot bounds with the specified padding
   * @param {number[]|string[]|number|string} padding
   * array of length 4 specifying values for [top, right, bottom, left],
   * or a single value used for all four.
   * Values can be absolute (e.g. 120 or "120" ) or
   * percentages (e.g. "20%"" or ["10%", "20%", "10%", "20%""]
   */
  setPlotBounds(padding) {
    let computedPadding;
    if (isArray(padding) && padding.length === 4) {
      computedPadding = padding.map((v, i) => Math.floor(isString(v) ?
        Number.parseFloat(v) *
          (v.endsWith('%') ? (i % 2 === 0 ? this.canvas.width : this.canvas.height) / 100 : 1) :
        padding[i]));
    } else if (isNumber(padding) || isString(padding)) {
      computedPadding = Array.create(4, i => Math.floor(isString(padding) ?
        Number.parseFloat(padding) * (padding.endsWith('%') ?
          (i % 2 === 0 ? this.canvas.width : this.canvas.height) / 100 : 1) :
        padding));
    }

    const newPlotBounds = {
      x: computedPadding[3],
      y: computedPadding[2],
      width: this.canvas.width - computedPadding[3] - computedPadding[1],
      height: this.canvas.height - computedPadding[0] - computedPadding[2],
    };

    if (newPlotBounds.x !== this.plotBounds.x ||
      newPlotBounds.y !== this.plotBounds.y ||
      newPlotBounds.width !== this.plotBounds.width ||
      newPlotBounds.height !== this.plotBounds.height) {
      this.plotBounds = newPlotBounds;
      this.viewers.forEach((viewer) => {
        viewer.onPlotBoundsChanged(this.plotBounds);
      });
    } else {
      this.plotBounds = newPlotBounds;
    }
  }

  /**
   * @summary Zoom all dimensions to exactly fit all data points
   */
  zoomFit() {
    const nv = this.dataset.dataVectors.length;

    // Compute offsets and scales to fit dataset inside view
    for (let v = 0; v < nv; v += 1) {
      this.plotTransform.setFromMinMax(
        v, this.dataset.dataVectors[v].minimum,
        this.dataset.dataVectors[v].maximum,
      );
    }
  }

  /**
   * @summary Zoom currently visible x- and y- dimensions to exactly fit all data points
   */
  zoomFit2D() {
    const d0 = this.activeInputs[0];
    const d1 = this.activeInputs[1];

    // Compute offsets and scales to fit dataset inside view
    this.plotTransform.setFromMinMax(
      d0,
      this.dataset.dataVectors[d0].minimum,
      this.dataset.dataVectors[d0].maximum,
    );
    this.plotTransform.setFromMinMax(
      d1,
      this.dataset.dataVectors[d1].minimum,
      this.dataset.dataVectors[d1].maximum,
    );
  }

  /**
   * @summary Zoom currently visible x- and y- dimensions to the given bounds in data space
   * @param  {{l: number, t: number, r: number, b: number}} rect Bounds of the visible region
   */
  zoomRect(rect) {
    const d0 = this.activeInputs[0];
    const d1 = this.activeInputs[1];

    this.plotTransform.setFromMinMax(d0, rect.l, rect.r);
    this.plotTransform.setFromMinMax(d1, rect.t, rect.b);
  }

  onOptionsChanged(requireRedraw, requireRecompile) {
    // Update trivial options
    ENABLE_CONTINUOUS_RENDERING = this.options.enableContinuousRendering;
    SHOW_FPS = this.options.enableContinuousRendering;
    if (this.options.enableTransparency) {
      this.gl.enable(this.gl.BLEND);
    } else {
      this.gl.disable(this.gl.BLEND);
    }
    this.colormap.visible = this.options.showColormap;
    this.densityViewer.showDensityMap = this.options.showPointDensity;
    this.densityViewer.showClusterMap = this.options.showPointClusters;
    this.densityViewer.setClusterMapThreshold(this.options.pointClusterThreshold);

    if (this.options.padding) {
      this.setPlotBounds(this.options.padding);
    }

    this.viewers.forEach(viewer => viewer.onOptionsChanged(this.options, requireRecompile));

    if (this.dataset !== null) {
      // Reset FPS counter
      this.fps = null;
      this.fpsStart = this.timeNow;
      this.frameCounter = 0;

      // Redraw
      if (requireRedraw) {
        this.invalidate();
      }
    }
  }

  /**
   * Note: When setting multiple options, {@link GlobalView#setOptions} should be prefered.
   * @summary Sets the given option
   * @see OPTIONS
   * @param  {string} option - option name
   * @param  {*} value - a valid value.
   */
  setOption(option, value) {
    setCurrentPlot(this);
    // Validate option
    if (!Object.prototype.hasOwnProperty.call(OPTIONS, option)) {
      consoleWarn(`GlobalView warning: Unsupported option: ${option}`);
      return;
    }
    const optionDefinition = OPTIONS[option];

    // Validate value
    let validationResult;
    // eslint-disable-next-line no-cond-assign
    if ((isArray(optionDefinition.valid) &&
      optionDefinition.valid.indexOf(value) === -1) ||
      (isFunction(optionDefinition.valid) &&
      (validationResult = optionDefinition.valid(value)) !== true)) {
      consoleWarn(`GlobalView warning: Invalid value for option ${option}: ${value}`);
      if (isString(validationResult)) {
        consoleWarn(`                    ${validationResult}`);
      }
      return;
    }

    // Set option
    this.options[option] = value;

    this.onOptionsChanged.call(
      this,
      optionDefinition.requireRedraw,
      optionDefinition.requireRecompile,
    );
  }

  /**
   * @summary Sets multiple options
   * @param  {Object} newOptions A JavaScript object of options. see {@link OPTIONS}.
   */
  setOptions(newOptions) {
    setCurrentPlot(this);
    let requireRecompile = false;
    let requireRedraw = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const option in newOptions) {
      if (!Object.prototype.hasOwnProperty.call(newOptions, option)) {
        continue; // eslint-disable-line no-continue
      }

      // Validate option
      if (!Object.prototype.hasOwnProperty.call(OPTIONS, option)) {
        consoleWarn(`GlobalView warning: Unsupported option: ${option}`);
        continue; // eslint-disable-line no-continue
      }
      const optionDefinition = OPTIONS[option];

      // Validate value
      const value = newOptions[option];
      let validationResult;
      // eslint-disable-next-line no-cond-assign
      if ((isArray(optionDefinition.valid) &&
      optionDefinition.valid.indexOf(value) === -1) ||
        (isFunction(optionDefinition.valid) &&
        (validationResult = optionDefinition.valid(value)) !== true)) {
        consoleWarn(`GlobalView warning: Invalid value for option ${option}: ${value}`);
        if (isString(validationResult)) {
          // HY:
          validationResult = optionDefinition.valid(value);
          consoleWarn(`                    ${validationResult}`);
        }
        continue; // eslint-disable-line no-continue
      }

      // Set option
      this.options[option] = value;

      requireRecompile = requireRecompile || optionDefinition.requireRecompile;
      requireRedraw = requireRedraw || optionDefinition.requireRedraw;
    }

    this.onOptionsChanged.call(this, requireRedraw, requireRecompile);
  }

  /**
   * @summary Sets the given option to its default value
   * @param  {string} option
   */
  setDefaultOption(option) {
    // Validate option
    if (!Object.prototype.hasOwnProperty.call(OPTIONS, option)) {
      consoleWarn(`GlobalView warning: Unsupported option: ${option}`);
      return;
    }
    const optionDefinition = OPTIONS[option];

    this.setOption(option, optionDefinition.default);
  }

  /**
   * @summary Sets all options to their respective defaults
   */
  setDefaultOptions() {
    const defaultOptions = {};
    Object.keys(OPTIONS).forEach((option) => {
      defaultOptions[option] = OPTIONS[option].default;
    });
    this.setOptions(defaultOptions);
  }

  /**
   * @summary Checks the given option for errors without setting it
   * @param  {string} option
   * @param  {*} value
   * @return  {string|boolean} Error message or 'true' if the option is valid
   */
  static validateOption(option, value) {
    // Validate option
    if (!Object.prototype.hasOwnProperty.call(OPTIONS, option)) {
      return `Unsupported option: ${option}`;
    }
    const optionDefinition = OPTIONS[option];

    // Validate value
    let validationResult;
    // eslint-disable-next-line no-cond-assign
    if ((isArray(optionDefinition.valid) &&
      optionDefinition.valid.indexOf(value) === -1) ||
      (isFunction(optionDefinition.valid) &&
      (validationResult = optionDefinition.valid(value)) !== true)) {
      return `Invalid value for option ${option}: ${value}${
        isString(validationResult)}` ? `\n    ${validationResult}` : '';
    }

    return true;
  }

  /**
   * @summary Checks multiple options for errors without setting them
   * @param  {Object} newOptions A JavaScript object of options
   * @return  {string|boolean} Error message or 'true' if all options are valid
   */
  static validateOptions(newOptions) {
    const errors = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const option in newOptions) {
      if (!Object.prototype.hasOwnProperty.call(newOptions, option)) {
        continue; // eslint-disable-line no-continue
      }

      // Validate option
      if (!Object.prototype.hasOwnProperty.call(OPTIONS, option)) {
        errors.push(`Unsupported option: ${option}`);
        continue; // eslint-disable-line no-continue
      }
      const optionDefinition = OPTIONS[option];

      // Validate value
      const value = newOptions[option];
      let validationResult;
      // eslint-disable-next-line no-cond-assign
      if ((isArray(optionDefinition.valid) &&
        optionDefinition.valid.indexOf(value) === -1) ||
        (isFunction(optionDefinition.valid) &&
        (validationResult = optionDefinition.valid(value)) !== true)) {
        errors.push(`Invalid value for option ${option}: ${value}${
          isString(validationResult) ? `\n    ${validationResult}` : ''}`);
        continue; // eslint-disable-line no-continue
      }
    }

    return errors.length === 0 ? true : errors.join('\n');
  }

  /**
   * @summary Returns the value assigned to the given option
   * @param  {string} option
   * @return {*}
   */
  getOption(option) {
    return this.options[option];
  }

  /**
   * @summary Returns a JavaScript object of all options and their values
   * @return {Object}
   */
  getOptions() {
    return /** @type {Object} */(JSON.parse(JSON.stringify(this.options)));
  }

  /**
   * @summary Save all options
   */
  pushOptions() {
    this.pushedOptions.push(this.options);
  }

  /**
   * @summary Recall the options last saved with {@link GlobalView#pushOptions}
   */
  popOptions() {
    if (this.pushedOptions.length !== 0) {
      this.setOptions(this.pushedOptions.pop());
    }
  }

  // >>> Dataset interaction

  /**
   * @private
   * @param  {number} d
   * @param  {number} columnIdx
   * @param  {boolean=} changeTickDistance=true
   */
  updateCoorinateSystem(d, columnIdx, changeTickDistance) {
    if (this.dataset.dataVectors[columnIdx].values) {
      this.coordSys.setEnumRange(
        d, this.plotTransform.getVisibleMinimum(d), this.plotTransform.getVisibleMaximum(d),
        this.dataset.dataVectors[columnIdx].values,
      );
    } else {
      this.coordSys.setNumericRange(
        d, this.plotTransform.getVisibleMinimum(d), this.plotTransform.getVisibleMaximum(d),
        changeTickDistance,
      );
    }
    this.coordSys.setLabel(d, this.dataset.dataVectors[columnIdx].label);
  }

  /**
   * @private
   * @param  {number} columnIdx
   * @param  {boolean=} changeTickDistance=true
   */
  updateColormap(columnIdx, changeTickDistance) {
    if (this.dataset.dataVectors[columnIdx].values) {
      this.colormap.setEnumRange(
        this.plotTransform.getVisibleMinimum(2),
        this.plotTransform.getVisibleMaximum(2),
        this.dataset.dataVectors[columnIdx].values,
      );
    } else {
      this.colormap.setNumericRange(
        this.plotTransform.getVisibleMinimum(2),
        this.plotTransform.getVisibleMaximum(2), changeTickDistance,
      );
    }
    this.colormap.setLabel(this.dataset.dataVectors[columnIdx].label);
  }

  // var pushedDatasets = [];
  /**
   * @summary Load a dataset into the plot
   * @param  {Dataset} dataset
   * @param  {number} activeColumnX
   * @param  {number} activeColumnY
   * @param  {number} activeColumnC
   * @param  {number} activeColumnS
   */
  load(dataset, activeColumnX, activeColumnY, activeColumnC, activeColumnS) {
    // Remove old dataset
    this.dataset = null;
    this.activeInputs = Array.create(Transform.NumDim, -1);
    this.imageViewer.clearImages();

    // Set new dataset
    this.dataset = dataset;
    this.animatedInputs[0].origin = activeColumnX;
    this.activeInputs[0] = activeColumnX;
    this.animatedInputs[1].origin = activeColumnY;
    this.activeInputs[1] = activeColumnY;
    this.animatedInputs[2].origin = activeColumnC;
    this.activeInputs[2] = activeColumnC;
    this.animatedInputs[3].origin = activeColumnS;
    this.activeInputs[3] = activeColumnS;

    // Reset transform
    this.plotTransform = new Transform(this);
    this.zoomFit();

    // Update viewers
    this.viewers.forEach(viewer =>
      viewer.setDataset(dataset, this.options));
    this.viewers.forEach(viewer =>
      viewer.onInputChanged(this.activeInputs, this.animatedInputs, this.options));

    // Reset FPS counter
    this.fps = null;
    this.fpsStart = this.timeNow;
    this.frameCounter = 0;

    // Redraw
    this.invalidate();
  }

  /**
   * Assign dataset column to axis
   * @param  {number} axis Axis for the column
   * @param  {number} column dataset column
   */
  setActiveColumn(axis, column) {
    if (!ENABLE_CONTINUOUS_RENDERING) {
      this.deltaTime = 0.0;
      this.timeNow = performance.now();
    }

    this.animatedInputs[axis].origin = this.activeInputs[axis];
    this.animatedInputs[axis].f = 0.0;
    this.activeInputs[axis] = column;

    this.plotTransform.onInputChanged();
    this.viewers.forEach(viewer =>
      viewer.onInputChanged(this.activeInputs, this.animatedInputs, this.options));
    if (axis < 2) {
      this.updateCoorinateSystem(axis, this.activeInputs[axis]);
    } else {
      this.updateColormap(this.activeInputs[2]);
    }
    if (axis < 3) {
      this.invalidate();
    }
  }

  /**
   * Get column assigned to axis
   * @param  {number} axis
   * @return {number}
   */
  getActiveColumn(axis) {
    return axis >= 0 && axis < this.activeInputs.length ? this.activeInputs[axis] : -1;
  }


  /**
   * @param  {number} numPointsToReturn
   * @param  {number} densityRatio
   * @param  {function(Array<number>)} ondone Event handler,
   *        called after characteristic points have been found
   */
  getCharacteristicPoints(numPointsToReturn, densityRatio, ondone) {
    if (!this.dataset) {
      return;
    }

    let d0 = this.activeInputs[0];
    let d1 = this.activeInputs[1];
    this.dataset.requestDensityMap(d0, d1, undefined, undefined, (densityMap) => {
      if (d1 < d0) {
        // Swap d0 <-> d1
        const temp = d0;
        d0 = d1;
        d1 = temp;
      }

      const characteristicPoints = findRepresentativePoints2(
        this.dataset, d0, d1, densityMap,
        numPointsToReturn, densityRatio,
      );
      ondone(characteristicPoints);
    });
  }

  // >>> Annotation

  /**
   * @summary Remove all thumbnails from the plot
   */
  clearThumbnails() {
    // Clear stencil maps
    if (this.dataset) {
      this.dataset.iterateDensityMaps((densityMap) => {
        if (densityMap.stencilMap && densityMap.stencilMap.data) {
          for (let i = 0, stencilMap = densityMap.stencilMap.data, len = stencilMap.length;
            i < len; i += 1) {
            stencilMap[i] = 0;
          }
        }
      });
    }

    this.imageViewer.clearImages();
    this.invalidate();
  }

  /**
   */
  showData2D() {
    this.imageViewer.clearImages();

    let d0 = this.activeInputs[0];
    let d1 = this.activeInputs[1];
    this.dataset.requestDensityMap(d0, d1, undefined, undefined, (pDensityMap) => {
      const densityMap = pDensityMap;
      if (d1 < d0) {
        // Swap d0 <-> d1
        const temp = d0;
        d0 = d1;
        d1 = temp;
      }

      if (!densityMap.stencilMap) {
        densityMap.stencilMap = {};
      }

      this.pointViewer.representativePoints.assign(findRepresentativePoints2(
        this.dataset,
        d0, d1, densityMap, 16, 0.3,
      ));

      if (this.dataset.imageFilenames) {
        this.pointViewer.representativePoints.forEach((r) => {
          if (this.dataset.imageFilenames[r]) {
            const dataPos = this.dataset.dataVectors.map(v => v.getValue(r));
            const imagePos = dataPos.slice(0);
            const p = findClosePointOfLowDensity(
              this.dataset, d0, d1, r,
              densityMap, densityMap.stencilMap,
              (0.6 * this.options.thumbnailSize) / this.gl.width,
              (0.6 * (this.options.thumbnailSize + ImageViewer.getLabelHeight())) /
                this.gl.height,
            ); // EDIT: Factor 0.6: WHY?
            imagePos[d0] = p[0];
            imagePos[d1] = p[1];
            const imageSize = this.dataset.dataVectors.map(v =>
              this.options.thumbnailSize * (v.maximum - v.minimum));
            this.imageViewer.showImage(
              this.dataset.imageFilenames[r], r,
              dataPos, imagePos, imageSize,
            );
          }
        });
      }
    });
  }

  /**
   * @summary A shorthand function to `showImage(index, "lowDensity")`
   * @param  {number} index Index of the datapoint to show
   */
  showImageLowDensity(index) {
    if (this.dataset.imageFilenames && this.dataset.imageFilenames[index]) {
      let d0 = this.activeInputs[0];
      let d1 = this.activeInputs[1];

      this.dataset.requestDensityMap(d0, d1, undefined, undefined, (pDensityMap) => {
        const densityMap = pDensityMap;
        let imageWidth = (0.6 * this.options.thumbnailSize) / this.gl.width;
        let imageHeight = ((0.6 * this.options.thumbnailSize) + ImageViewer.getLabelHeight()) /
          this.gl.height; // EDIT: Factor 0.6: WHY?
        if (d1 < d0) {
          // Swap d0 <-> d1
          let temp = d0;
          d0 = d1;
          d1 = temp;

          // Swap imageWidth <-> imageHeight
          temp = imageWidth;
          imageWidth = imageHeight;
          imageHeight = temp;
        }

        const dataPos = this.dataset.dataVectors.map(v => v.getValue(index));
        let imagePos;
        if (isUndefined(densityMap.data)) { // If densityMap is nD
          imagePos = findClosePointOfLowDensityNDDescend(
            this.dataset, index, densityMap,
            (0.6 * this.options.thumbnailSize) / Math.min(this.gl.width, this.gl.height),
          );
        } else { // EDIT: Factor 0.6: WHY?
          imagePos = dataPos.slice(0);

          if (!densityMap.stencilMap) {
            densityMap.stencilMap = {};
          }
          const p = findClosePointOfLowDensity(
            this.dataset, d0, d1, index, densityMap,
            densityMap.stencilMap, imageWidth, imageHeight,
          );
          if (p) {
            imagePos[d0] = p[0];
            imagePos[d1] = p[1];
          } else {
            const halfImageSize = [
              (1.1 * this.options.thumbnailSize) / this.gl.width,
              (1.1 * this.options.thumbnailSize) / this.gl.height];
            this.plotTransform.deviceDistToDatasetDist(halfImageSize, halfImageSize);
            imagePos[d0] += halfImageSize[0];
            imagePos[d1] += halfImageSize[1];
          }
        }
        const imageSize = this.dataset.dataVectors.map(v =>
          this.options.thumbnailSize * (v.maximum - v.minimum));
        this.imageViewer.showImage(
          this.dataset.imageFilenames[index],
          index, dataPos, imagePos, imageSize,
        );
      });
    }
  }

  /**
   * @summary A shorthand function to `showImages(index, "lowDensity")`
   * @param  {Array<number>} points List of indices of datapoints to show
   */
  showImagesLowDensity(points) {
    if (this.dataset.imageFilenames) {
      let d0 = this.activeInputs[0];
      let d1 = this.activeInputs[1];
      this.dataset.requestDensityMap(d0, d1, undefined, undefined, (pDensityMap) => {
        const densityMap = pDensityMap;
        let imageWidth = (0.6 * this.options.thumbnailSize) / this.gl.width;
        let imageHeight = ((0.6 * this.options.thumbnailSize) + ImageViewer.getLabelHeight()) /
          this.gl.height; // EDIT: Factor 0.6: WHY?
        if (d1 < d0) {
          // Swap d0 <-> d1
          let temp = d0;
          d0 = d1;
          d1 = temp;

          // Swap imageWidth <-> imageHeight
          temp = imageWidth;
          imageWidth = imageHeight;
          imageHeight = temp;
        }
        if (!densityMap.stencilMap) {
          densityMap.stencilMap = {};
        }
        markPointsInStencilMap(
          this.dataset, d0, d1, points,
          densityMap, densityMap.stencilMap,
          imageWidth, imageHeight,
        );
      });
    }
    const plot = this;
    points.forEach(i => plot.showImageLowDensity(i));
    this.imageViewer.resolveIntersections(this.plotTransform);
  }


  /**
   * @summary A shorthand function to `showImage(index, "none")`
   * @param  {number} index Index of the datapoint to show
   */
  showImageNone(index) {
    const dataPos = this.dataset.dataVectors.map(v => v.getValue(index));
    this.imageViewer.showImage(this.dataset.imageFilenames[index], index, dataPos);
  }

  /**
   * @summary A shorthand function to `showImages(index, "none")`
   * @param  {Array<number>} points List of indices of datapoints to show
   */
  showImagesNone(points) {
    points.forEach((p) => {
      const dataPos = this.dataset.dataVectors.map(v => v.getValue(p));
      this.imageViewer.showImage(this.dataset.imageFilenames[p], p, dataPos);
    });
  }

  /**
   * @summary A shorthand function to `showImage(index, "adjacent")`
   * @param  {number} index Index of the datapoint to show
   */
  showImageAdjacent(index) {
    const dataPos = this.dataset.dataVectors.map(v => v.getValue(index));
    const imageSize = this.dataset.dataVectors.map(v =>
      this.options.thumbnailSize * (v.maximum - v.minimum));
    this.imageViewer.showImage(
      this.dataset.imageFilenames[index],
      index, dataPos, dataPos,
      imageSize, 'bottomleft',
    );
  }

  /**
   * @summary A shorthand function to `showImages(index, "adjacent")`
   * @param  {Array<number>} points List of indices of datapoints to show
   */
  showImagesAdjacent(points) {
    const plot = this;
    points.forEach(i => plot.showImageAdjacent(i));
  }

  /**
   * @summary A shorthand function to `showImages(index, "project")`
   * @param  {Array<number>} points List of indices of datapoints to show
   */
  showImagesProject(points) {
    if (!this.dataset.imageFilenames) {
      return;
    }

    const d0 = this.activeInputs[0];
    const d1 = this.activeInputs[1];
    const offsets = this.plotTransform.getOffsets();
    const scales = this.plotTransform.getScales();

    // Computed expected value (= mean) of points -> E
    const E = [0, 0];
    points.forEach((p) => {
      E[0] += this.dataset.dataVectors[d0].getValue(p);
      E[1] += this.dataset.dataVectors[d1].getValue(p);
    });
    E[0] *= scales[0] / points.length;
    E[1] *= scales[1] / points.length;

    // Compute covariance matrix of points -> cov [symetrical 2D matrix]
    const cov = [0, 0, 0];
    points.forEach((p) => {
      const x0 = (this.dataset.dataVectors[d0].getValue(p) * scales[0]) - E[0];
      const x1 = (this.dataset.dataVectors[d1].getValue(p) * scales[1]) - E[1];
      cov[0] += x0 * x0;
      cov[1] += x0 * x1;
      cov[2] += x1 * x1;
    });
    cov[0] /= points.length;
    cov[1] /= points.length;
    cov[2] /= points.length;

    // Compute eigen values
    const disc = Math.sqrt(((cov[0] - cov[2]) * (cov[0] - cov[2])) + (4 * cov[1] * cov[1])) / 2;
    const eigenval1 = ((cov[0] + cov[2]) / 2) + disc;
    const eigenval2 = ((cov[0] + cov[2]) / 2) - disc;

    // Compute eigen vector with smallest eigen value (for second principal component)
    const eigenvec = [-cov[1], cov[0] - Math.min(eigenval1, eigenval2)];

    // Normalize eigen vector
    const eigenVecLength = Math.sqrt((eigenvec[0] * eigenvec[0]) + (eigenvec[1] * eigenvec[1]));
    eigenvec[0] /= eigenVecLength;
    eigenvec[1] /= eigenVecLength;

    // Define corners of AABB (axis-aligned bounding box)
    const imageSize = this.dataset.dataVectors.map(v =>
      this.options.thumbnailSize * (v.maximum - v.minimum));
    const labelHeightOffset = 1.0 + (ImageViewer.getLabelHeight() / this.options.thumbnailSize);
    const labelWidthOffset = 1.0 +
      ((ImageViewer.getLabelHeight() + (2 * ImageViewer.getLabelWidth()))
        / this.options.thumbnailSize);
    const bl = [ // bottom-left
      this.plotTransform.getMinimum(0) - ((imageSize[d0] * 0.6) / this.plotBounds.width),
      this.plotTransform.getMinimum(1) - ((imageSize[d1] * 0.6) / this.plotBounds.height),
    ];
    const tl = [ // top-left
      this.plotTransform.getMinimum(0) - ((imageSize[d0] * 0.6) / this.plotBounds.width),
      this.plotTransform.getMaximum(1) + ((imageSize[d1] * labelHeightOffset * 0.8) /
        this.plotBounds.height),
    ];
    const tr = [ // top-right
      this.plotTransform.getMaximum(0) + ((imageSize[d0] * labelWidthOffset * 0.6) /
        this.plotBounds.width),
      this.plotTransform.getMaximum(1) + ((imageSize[d1] * labelHeightOffset * 0.8) /
        this.plotBounds.height),
    ];
    const br = [ // bottom-right
      this.plotTransform.getMaximum(0) + ((imageSize[d0] * labelWidthOffset * 0.6) /
        this.plotBounds.width),
      this.plotTransform.getMinimum(1) - ((imageSize[d1] * 0.6) / this.plotBounds.height),
    ];
    this.plotTransform.datasetCoordToDeviceCoord(bl, bl);
    this.plotTransform.datasetCoordToDeviceCoord(tl, tl);
    this.plotTransform.datasetCoordToDeviceCoord(tr, tr);
    this.plotTransform.datasetCoordToDeviceCoord(br, br);

    // >>> Set image locations to be projections of data positions along eigenvec onto AABB

    const posToLoc = (pos) => {
      const p = pos;
      // Normalize p[0] from [l ... r] to [0 ... 1]
      p[0] = Math.max(0, Math.min(1, (p[0] - tl[0]) / (br[0] - tl[0])));
      // Normalize p[1] from [t ... b] to [0 ... 1]
      p[1] = Math.max(0, Math.min(1, (p[1] - tl[1]) / (br[1] - tl[1])));
      switch ([p[0], p[1], 1 - p[0], 1 - p[1]].minIndex()) {
        default: /* case 0: */ return 1 - p[1];
        case 1: return 1 + p[0];
        case 2: return 2 + p[1];
        case 3: return 4 - p[0];
      }
    };

    const locToPos = (loc) => {
      const l = (loc + 4) % 4;
      let p;
      const li = Math.floor(l);
      switch (li) {
        case 0:
          p = [0, (li + 1) - l];
          break;
        case 1:
          p = [l - li, 0];
          break;
        case 2:
          p = [1, l - li];
          break;
        case 3:
          p = [(li + 1) - l, 1];
          break;
        default:
          break;
      }
      p[0] = (p[0] * (br[0] - tl[0])) + tl[0]; // Denormalize p[0] from [0 ... 1] to [l ... r]
      p[1] = (p[1] * (br[1] - tl[1])) + tl[1]; // Denormalize p[1] from [0 ... 1] to [t ... b]
      return p;
    };

    let imageLocations = [];
    let dest;
    const v0 = this.dataset.dataVectors[this.activeInputs[0]];
    const v1 = this.dataset.dataVectors[this.activeInputs[1]];
    points.forEach((p) => {
      if (!this.dataset.imageFilenames[p]) {
        return;
      }

      const src = [v0.getValue(p), v1.getValue(p)];
      // Same as src = [v0.getValue(p) * scales[0] + offsets[0],
      //                v1.getValue(p) * scales[1] + offsets[1]];
      this.plotTransform.datasetCoordToDeviceCoord(src, src);

      if (vec2.dot(
        [src[0] - offsets[0] - E[0], src[1] - offsets[1] - E[1]],
        eigenvec,
      ) > 0.0) {
        // If src is above E in direction eigenvec
        // Project src in direction eigenvec onto line from bl, to tl
        dest = vectorLineIntersection2D(src, eigenvec, bl, tl);
        if (!dest) {
          dest = vectorLineIntersection2D(src, eigenvec, tl, tr);
        } // Project src in direction eigenvec onto line from tl, to tr
      } else {
        // If src is below E in direction eigenvec
        // Project src in direction -eigenvec onto line from bl, to br
        dest = vectorLineIntersection2D(src, eigenvec, bl, br);
        if (!dest) {
          dest = vectorLineIntersection2D(src, eigenvec, br, tr);
        } // Project src in direction -eigenvec onto line from br, to tr
      }
      if (!dest) {
        return;
      } // This should never happen!

      // Convert position on rectangle [bl, br, tl, tr] to scalar -> imagePos
      imageLocations.push(posToLoc(dest));
    });

    const detectOverlap = function (R, overlapThreshold) {
      const P = [];
      for (let j = 1; j < R.length; j += 1) {
        for (let i = 0; i < j; i += 1) {
          if (Math.abs(R[i] - R[j]) < overlapThreshold) {
            P.push([i, j]);
          }
        }
      }
      return P;
    };

    const removeOverlap = function (pR, i, j, rank, overlapThreshold) {
      const R = pR;
      const overlap = overlapThreshold - Math.abs(R[i] - R[j]);
      if (overlap > 0.0) {
        const shift = 0.5 * (rank[i] > rank[j] ?
          overlapThreshold - (R[i] - R[j]) :
          (R[j] - R[i]) - overlapThreshold);
        R[i] += shift;
        R[j] -= shift;
      }
    };

    const maxNumIterations = 10000;
    // if (maxNumIterations !== 0) // condition always true
    {
      const R = imageLocations;
      const overlapThreshold = Math.min(0.15, 4 / imageLocations.length);

      const rank = Array.create(R.length, i => i);
      rank.sort((a, b) => {
        if (imageLocations[a] < imageLocations[b]) {
          return -1;
        } else if (imageLocations[a] > imageLocations[b]) {
          return 1;
        }
        return 0;
      });

      let P = detectOverlap(R, overlapThreshold);
      for (let iter = 0; iter < maxNumIterations && P.length !== 0; iter += 1) {
        // TODO: Shuffle P
        P.forEach(pair => removeOverlap(R, pair[0], pair[1], rank, overlapThreshold + 0.0001));
        P = detectOverlap(R, overlapThreshold);
      }
      // consoleLog(iter, overlapThreshold);

      // Repair order
      const newRank = Array.create(R.length, i => i);
      newRank.sort((a, b) => {
        if (R[a] < R[b]) {
          return -1;
        } else if (R[a] > R[b]) {
          return 1;
        }
        return 0;
      });

      const repairedR = new Array(R.length);
      for (let i = 0; i < R.length; i += 1) {
        repairedR[rank[i]] = R[newRank[i]];
      }

      imageLocations = repairedR;
    }

    let idx = 0;
    points.forEach((p) => {
      if (!this.dataset.imageFilenames[p]) {
        return;
      }

      const dataPos = this.dataset.dataVectors.map(v => v.getValue(p));
      const imagePos = dataPos.slice(0);

      // Convert scalar to position on rectangle [bl, br, tl, tr] -> dest
      dest = locToPos(imageLocations[idx]);
      idx += 1;
      this.plotTransform.deviceCoordToDatasetCoord(dest, dest);
      imagePos[d0] = dest[0];
      imagePos[d1] = dest[1];

      this.imageViewer.showImage(this.dataset.imageFilenames[p], p, dataPos, imagePos, imageSize);
    });

    this.imageViewer.resolveIntersections(this.plotTransform);
  }

  /**
   * Valid placement strategies are:
   * + none
   * + adjacent
   * + lowDensity
   * @summary Show a thumbnail of the given datapoint
   * @param  {number} index Index of the datapoint to show
   * @param  {string} placement
   */
  showImage(index, placement) {
    switch (placement) {
      case 'none':
        return this.showImageNone(index);
      case 'adjacent':
        return this.showImageAdjacent(index);
      case 'lowDensity':
        return this.showImageLowDensity(index);
      case 'project':
        consoleWarn('GlobalView warning: ' +
          "Can't place a single image using the 'project'-strategy");
        return false;
      default:
        consoleWarn('GlobalView warning:' +
          `Unknown image placement strategy: ${placement}`);
        return false;
    }
  }

  /**
   * Valid placement strategies are:
   * + none
   * + adjacent
   * + lowDensity
   * + project
   * @summary Show a thumbnail of the given data points
   * @param  {Array<number>} points List of indices of datapoints to show
   * @param  {string} placement
   */
  showImages(points, placement) {
    switch (placement) {
      case 'none':
        return this.showImagesNone(points);
      case 'adjacent':
        return this.showImagesAdjacent(points);
      case 'lowDensity':
        return this.showImagesLowDensity(points);
      case 'project':
        return this.showImagesProject(points);
      default:
        consoleWarn('GlobalView warning: ' +
          `Unknown image placement strategy: ${placement}`);
        return false;
    }
  }

  /**
   * Images other than the given image will be de-highlighted.
   * @summary Highlight the given image with a highlight color
   * @deprecated Set image.labelColor manually
   * @param  {Thumbnail|number} image Image or index of image to show
   */
  highlightImage(image) {
    const images = this.imageViewer.getImages();
    if (isNumber(image)) {
      for (let i = 0; i < images.length; i += 1) {
        images[i].highlighted = i === image;
      }
    } else {
      for (let i = 0; i < images.length; i += 1) {
        images[i].highlighted = images[i] === image;
      }
    }
    this.invalidate();
  }

  /**
   * @summary Get an array of all images of the plot
   * @return {Array<Thumbnail>}
   */
  getImages() {
    return this.imageViewer.getImages;
  }

  /**
   * @callback onMouseDownCallback
   * @param  {Object} event
   */
  /**
   * The following properties of 'event' can be set to true:
   * + __pointSelection__: Enable selection of data points
   * + __pointDragging__: Enable dragging of data points
   * + __viewDragging__: Enable moving of the view
   * + __lassoSelection__: Enable selection of data points with a rectangular lasso
   * + __polygonLassoSelection__: Enable selection of data points with a freeform lasso
   * @summary Event handler that sets flags about how to process this mouse-down event
   * @member
   * @alias onMouseDown
   * @memberof GlobalView
   * @type {onMouseDownCallback}
   */
  onMouseDown(pEvent) { // Default mouse-down handler
    const event = pEvent;
    switch (event.button) {
      case 0:
        // On left mouse button: Enable point selection and dragging events.
        // If control button is pressed, initiate view dragging; else, enable lasso selection
        event.pointSelection = true;
        event.pointDragging = true;
        if (this.ctrlPressed) {
          event.viewDragging = true;
        } else {
          event.lassoSelection = true;
        }
        break;

      case 1:
        // On middle mouse button: Initiate view dragging
        event.viewDragging = true;
        break;

      case 2:
        // On right mouse button: Do nothing
        break;
      default:
        break;
    }
  }

  /**
   * Handler for the mouse down event on Canvas
   * @param {Object} event event object
   */
  onCanvasMouseDown(event) {
    if (this.plotTransform === null || this.offscreenRendering !== null) {
      return;
    }

    // Compute mousepos in canvas space -> p
    const canvasBounds = this.canvas.getBoundingClientRect();
    const p = new Float32Array([event.clientX - canvasBounds.left,
      event.clientY - canvasBounds.top,
      event.clientY - canvasBounds.top]);

    // Fire mouse-down handler
    this.onMouseDown(event);

    if (event.viewDragging) {
      // If mouse-down handler set viewDragging property to a truthy value
      if (p[0] > this.plotBounds.x + this.plotBounds.width) {
        this.viewDragX = false;
        this.viewDragY = false;
        this.viewDragZ = this.colormap.visible;
      } else {
        this.viewDragX = p[0] >= this.plotBounds.x;
        this.viewDragY = p[1] <= this.plotBounds.y + this.plotBounds.height;
        this.viewDragZ = false;
      }

      // Transform mousepos from canvas space to device coordinates
      p[0] = ((2 * p[0]) / canvasBounds.width) - 1;
      p[1] = 1 - ((2 * p[1]) / canvasBounds.height);
      p[2] = 1 - ((p[2] - this.plotBounds.y) / this.plotBounds.height);

      if (this.viewDragX || this.viewDragY || this.viewDragZ) {
        this.viewDragStartPos = p;
      } // Initiate view dragging
      return; // Prevent other mouse-down events
    }
    // Transform mousepos from canvas space to device coordinates
    p[0] = ((2 * p[0]) / canvasBounds.width) - 1;
    p[1] = 1 - ((2 * p[1]) / canvasBounds.height);


    const selectedImage = this.imageViewer.imageFromPoint(this.plotTransform, p);
    if (!this.shiftPressed && !this.ctrlPressed && this.imageDragImages.length !== 0 &&
      (selectedImage === null || this.imageDragImages.indexOf(selectedImage) === -1)) {
      // Deselect images
      this.imageDragImages.forEach((image) => {
        const varImage = image;
        varImage.highlighted = false;
      });
      this.imageDragImages = [];
      this.invalidate();
      if (this.onThumbnailSelectionChanged !== null) {
        this.onThumbnailSelectionChanged(this.dataset, []);
      }
    }
    if (selectedImage !== null) {
      selectedImage.highlighted = true;
      if (this.imageDragImages.indexOf(selectedImage) === -1) {
        this.imageDragImages.push(selectedImage);
      }
      if (this.options.enableThumbnailDragging) {
        this.imageDragStartPos = p;
      } // Initiate image dragging
      this.invalidate();
      if (event.pointSelection && this.onSelectionChanged !== null) {
        this.onSelectionChanged(this.dataset, []);
      }
      if (this.onThumbnailSelectionChanged !== null) {
        this.onThumbnailSelectionChanged(this.dataset, this.imageDragImages);
      }
      return; // Prevent other mouse-down events
    }

    // Transform p from device coordinates to dataset coordinates
    this.plotTransform.deviceCoordToDatasetCoord(p, p);

    let closest = Number.MAX_VALUE;
    let closestIndex = -1;
    let sqDist;
    const sqscl0 = this.plotTransform.getScale(0) * this.plotTransform.getScale(0);
    const sqscl1 = this.plotTransform.getScale(1) * this.plotTransform.getScale(1);
    const v0 = this.dataset.dataVectors[this.activeInputs[0]];
    const v1 = this.dataset.dataVectors[this.activeInputs[1]];
    this.pointViewer.points.forEach((i) => {
      sqDist =
        (sqscl0 * ((p[0] - v0.getValue(i)) ** 2)) +
        (sqscl1 * ((p[1] - v1.getValue(i)) ** 2));
      if (sqDist < closest) {
        closest = sqDist;
        closestIndex = i;
      }
    });

    // Get closest dataset coordinates in dataset coordinates -> dp
    const dp = new Float32Array([v0.getValue(closestIndex), v1.getValue(closestIndex)]);

    // Transform dp from dataset coordinates to canvas coordinates
    this.plotTransform.datasetCoordToDeviceCoord(dp, dp);
    dp[0] = (0.5 + (0.5 * dp[0])) * canvasBounds.width;
    dp[1] = (0.5 - (0.5 * dp[1])) * canvasBounds.height;

    sqDist =
      (((event.clientX - canvasBounds.left) - dp[0]) ** 2) +
      (((event.clientY - canvasBounds.top) - dp[1]) ** 2);
    if (sqDist > (this.options.pointSize / 2.0) ** 2) {
      if ((event.lassoSelection || event.polygonLassoSelection) &&
          this.onLassoSelection !== null) {
        if (event.polygonLassoSelection) {
          this.mousePolygon = [];
        } else {
          this.mouseRect = {
            x: event.clientX - canvasBounds.left,
            y: event.clientY - canvasBounds.top,
            width: 0,
            height: 0,
          };
        }
      }
      if (event.pointSelection && this.onSelectionChanged !== null) {
        this.onSelectionChanged(this.dataset, []);
      }
    } else {
      if (event.pointDragging) {
        this.pointDragDownPos = [dp[0], dp[1], closestIndex];
      } // (This makes sure pointDragDownPos is centered on the selected datapoint)
      if (event.pointSelection && this.onSelectionChanged !== null) {
        this.onSelectionChanged(this.dataset, [closestIndex]);
      }
    }
  }

  /**
   * Handler for the mouse move event of window
   * @param {Object} event event object
   */
  onMouseMove(event) {
    if (this.plotTransform === null || this.offscreenRendering !== null ||
      (event.target !== this.canvas && this.pointDragDownPos === null &&
        this.viewDragStartPos === null && this.imageDragStartPos === null &&
        this.mouseRect === null && this.mousePolygon === null)) {
      return;
    }

    // Compute mousepos in canvas space -> p
    const canvasBounds = this.canvas.getBoundingClientRect();
    const p = new Float32Array([
      event.clientX - canvasBounds.left,
      event.clientY - canvasBounds.top,
      event.clientY - canvasBounds.top]);

    // Resize mouse polygon
    if (this.mousePolygon !== null) {
      this.mousePolygon.push(p);
      this.invalidate();
      return;
    }

    // Resize mouse rect
    if (this.mouseRect !== null) {
      this.mouseRect.width = p[0] - this.mouseRect.x;
      this.mouseRect.height = p[1] - this.mouseRect.y;
      this.invalidate();
      return;
    }

    if (this.pointDragDownPos) {
      const scale = (1 /
        (this.dataset.dataVectors[this.activeInputs[3]]
          .getValue(this.pointDragDownPos[2]) * this.plotTransform.getScale(3))) +
        this.plotTransform.getOffset(3);
      // consoleLog(scale);

      this.pointDrag = [
        scale * (p[0] - this.pointDragDownPos[0]),
        scale * (p[1] - this.pointDragDownPos[1])];
      this.invalidate();
      return;
    }

    if (this.onMouseOverAxisLabel) {
      const newMouseOverAxisLabel = this.coordSys.labelFromPoint(this.plotBounds, p);
      if (newMouseOverAxisLabel !== this.mouseOverAxisLabel) {
        this.mouseOverAxisLabel = newMouseOverAxisLabel;
        if (this.mouseOverAxisLabel !== null) {
          this.onMouseOverAxisLabel(
            this.dataset.dataVectors[this.activeInputs[this.mouseOverAxisLabel]],
            this.coordSys.getLabelBounds(this.plotBounds, this.mouseOverAxisLabel),
          );
        } else {
          this.onMouseOverAxisLabel(null, null);
        }
      }
    }

    // Transform mousepos from canvas space to device coordinates
    p[0] = ((2 * p[0]) / canvasBounds.width) - 1;
    p[1] = 1 - ((2 * p[1]) / canvasBounds.height);
    p[2] = 1 - ((p[2] - this.plotBounds.y) / this.plotBounds.height);

    const d0 = this.activeInputs[0];
    const d1 = this.activeInputs[1];

    if (this.viewDragStartPos) {
      const d2 = this.activeInputs[2];
      const viewDelta = vec3.create();
      this.plotTransform.deviceDistToDatasetDist(
        viewDelta,
        vec3.subtract(viewDelta, p, this.viewDragStartPos),
      );

      if (this.viewDragX) {
        this.plotTransform.translate(d0, viewDelta[0]);
      }
      if (this.viewDragY) {
        this.plotTransform.translate(d1, viewDelta[1]);
      }
      if (this.viewDragZ) {
        this.plotTransform.translate(d2, viewDelta[2]);
      }
      this.viewDragStartPos = p;
      return;
    }

    if (this.imageDragStartPos) {
      const imageDelta = vec2.create();
      this.plotTransform.deviceDistToDatasetDist(
        imageDelta,
        vec2.subtract(imageDelta, p, this.imageDragStartPos),
      );
      this.imageDragImages.forEach((image) => {
        // eslint-disable-next-line no-param-reassign
        image.imagePos[this.activeInputs[0]] += imageDelta[0];
        // eslint-disable-next-line no-param-reassign
        image.imagePos[this.activeInputs[1]] += imageDelta[1];
      });
      this.imageDragStartPos = p;
      this.invalidate();
      return;
    }

    if (this.mouseOverImage !== null &&
        this.imageDragImages.indexOf(this.mouseOverImage) === -1) {
      this.mouseOverImage.highlighted = false;
      this.invalidate();
      this.mouseOverImage = null;
    }
    this.mouseOverImage = this.imageViewer.imageFromPoint(this.plotTransform, p);
    if (this.mouseOverImage !== null) {
      if (this.imageDragImages.indexOf(this.mouseOverImage) === -1) {
        this.mouseOverImage.highlighted = true;
        this.invalidate();
      }
      if (this.mouseOverDatapoint !== -1) {
        this.mouseOverDatapoint = -1;
        if (this.onMouseOverDatapoint !== null) {
          this.onMouseOverDatapoint(this.dataset, this.mouseOverDatapoint);
        }
      }
      return;
    }

    // Transform p from device coordinates to dataset coordinates
    this.plotTransform.deviceCoordToDatasetCoord(p, p);

    let closest = Number.MAX_VALUE;
    let closestIndex = -1;
    let sqDist;
    const sqscl0 = this.plotTransform.getScale(0) * this.plotTransform.getScale(0);
    const sqscl1 = this.plotTransform.getScale(1) * this.plotTransform.getScale(1);
    const v0 = this.dataset.dataVectors[d0];
    const v1 = this.dataset.dataVectors[d1];
    this.pointViewer.points.forEach((i) => {
      sqDist =
        (sqscl0 * ((p[0] - v0.getValue(i)) ** 2)) +
        (sqscl1 * ((p[1] - v1.getValue(i)) ** 2));
      if (sqDist < closest) {
        closest = sqDist;
        closestIndex = i;
      }
    });
    // Get closest dataset coordinates in dataset coordinates -> dp
    const dp = new Float32Array([v0.getValue(closestIndex), v1.getValue(closestIndex)]);

    // Transform dp from dataset coordinates to canvas coordinates
    this.plotTransform.datasetCoordToDeviceCoord(dp, dp);
    dp[0] = (0.5 + (0.5 * dp[0])) * canvasBounds.width;
    dp[1] = (0.5 - (0.5 * dp[1])) * canvasBounds.height;

    sqDist =
      (((event.clientX - canvasBounds.left) - dp[0]) ** 2) +
      (((event.clientY - canvasBounds.top) - dp[1]) ** 2);
    if (sqDist > (this.options.pointSize / 2.0) ** 2) {
      if (this.mouseOverDatapoint !== -1) {
        this.mouseOverDatapoint = -1;
        if (this.onMouseOverDatapoint !== null) {
          this.onMouseOverDatapoint(this.dataset, this.mouseOverDatapoint);
        }
      }
    } else if (this.mouseOverDatapoint !== closestIndex) {
      this.mouseOverDatapoint = closestIndex;
      if (this.onMouseOverDatapoint !== null) {
        this.onMouseOverDatapoint(this.dataset, this.mouseOverDatapoint);
      }
    }
  }

  /**
   * Handler for the mouse up event of window
   * @param {Object} event event object
   */
  onMouseUp(event) {
    if (this.plotTransform === null || this.offscreenRendering !== null ||
      (event.target !== this.canvas && this.pointDragDownPos === null &&
        this.viewDragStartPos === null && this.mouseRect === null)) {
      return;
    }

    let invalidate = false;
    if (this.pointDragDownPos !== null) {
      this.pointDragDownPos = null;
      this.pointDrag = null;
      invalidate = true;
    }
    this.viewDragStartPos = null;
    this.imageDragStartPos = null;
    if (this.mousePolygon !== null) {
      if (this.onSelectionChanged !== null && this.mousePolygon.length >= 3) {
        // TODO: Find points within this.mousePolygon -> selection

        // Transform this.mousePolygon from canvas space to dataset coordinates
        for (let i = 0; i < this.mousePolygon.length; i += 1) {
          const p = this.mousePolygon[i];

          // Transform p from canvas space to device coordinates
          p[0] = ((2 * p[0]) / this.canvas.width) - 1;
          p[1] = 1 - ((2 * p[1]) / this.canvas.height);

          // Transform p from device coordinates to dataset coordinates
          this.plotTransform.deviceCoordToDatasetCoord(p, p);

          this.mousePolygon[i] = p;
        }

        // Close polygon
        this.mousePolygon.push(this.mousePolygon[0]);

        const selection = [];
        const v0 = this.dataset.dataVectors[this.activeInputs[0]];
        const v1 = this.dataset.dataVectors[this.activeInputs[1]];
        this.pointViewer.points.forEach((i) => {
          const px = v0.getValue(i);
          const py = v1.getValue(i);
          if (pointInsidePolygon([px, py], this.mousePolygon)) {
            selection.push(i);
          }
        });
        this.onLassoSelection(this.dataset, selection, this.mousePolygon);
      }

      this.mousePolygon = null;
      invalidate = true;
    }

    if (this.mouseRect !== null) {
      if (this.onSelectionChanged !== null &&
          this.mouseRect.width !== 0 &&
          this.mouseRect.height !== 0) {
        // Normalize this.mouseRect (make sure width/height are positive)
        if (this.mouseRect.width < 0) {
          this.mouseRect.x += this.mouseRect.width;
          this.mouseRect.width = -this.mouseRect.width;
        }
        if (this.mouseRect.height < 0) {
          this.mouseRect.y += this.mouseRect.height;
          this.mouseRect.height = -this.mouseRect.height;
        }

        // Transform this.mouseRect from canvas space to device coordinates
        this.mouseRect.l = ((2 * this.mouseRect.x) / this.canvas.width) - 1;
        this.mouseRect.r = ((2 * (this.mouseRect.x + this.mouseRect.width)) /
                            this.canvas.width) - 1;
        this.mouseRect.t = 1 - ((2 * (this.mouseRect.y + this.mouseRect.height)) /
                                this.canvas.height);
        this.mouseRect.b = 1 - ((2 * this.mouseRect.y) / this.canvas.height);

        // Transform this.mouseRect from device coordinates to dataset coordinates
        let p = new Float32Array([this.mouseRect.l, this.mouseRect.t]);
        this.plotTransform.deviceCoordToDatasetCoord(p, p);
        this.mouseRect.l = p[0];
        this.mouseRect.t = p[1];
        p = new Float32Array([this.mouseRect.r, this.mouseRect.b]);
        this.plotTransform.deviceCoordToDatasetCoord(p, p);
        this.mouseRect.r = p[0];
        this.mouseRect.b = p[1];

        let px;
        let py;
        const selection = [];
        const v0 = this.dataset.dataVectors[this.activeInputs[0]];
        const v1 = this.dataset.dataVectors[this.activeInputs[1]];
        this.pointViewer.points.forEach((i) => {
          px = v0.getValue(i);
          py = v1.getValue(i);
          if (px >= this.mouseRect.l &&
              px < this.mouseRect.r &&
              py >= this.mouseRect.t &&
              py < this.mouseRect.b) {
            selection.push(i);
          }
        });
        this.onLassoSelection(this.dataset, selection, this.mouseRect);
      }

      this.mouseRect = null;
      invalidate = true;
    }
    if (invalidate) {
      this.invalidate();
      this.onMouseMove(event);
    }
  }


  /**
   * Handler for the mouse leave event of window
   */
  onMouseLeave(/* event */) {
    if (this.mouseOverImage != null && this.imageDragImages.indexOf(this.mouseOverImage) === -1) {
      this.mouseOverImage.highlighted = false;
      this.invalidate();
      this.mouseOverImage = null;
    }

    if (this.onMouseOverAxisLabel && this.mouseOverAxisLabel !== null) {
      this.onMouseOverAxisLabel(null, null);
      this.mouseOverAxisLabel = null;
    }

    if (this.onMouseOverDatapoint !== null && this.mouseOverDatapoint !== -1) {
      this.onMouseOverDatapoint(this.dataset, this.mouseOverDatapoint = -1);
    }
  }

  /**
   * Handler for the mouse wheel event of window
   * @param {Object} event event object
   */
  onMouseWheel(event) {
    if (event.target !== this.canvas || !this.options.enableScrolling) {
      return;
    }
    const deltaZ = event.wheelDelta == null ? event.detail : -event.wheelDelta / 20.0;
    event.preventDefault();

    // Compute mousepos in canvas space -> p
    const canvasBounds = this.canvas.getBoundingClientRect();
    const p = new Float32Array([
      event.clientX - canvasBounds.left,
      event.clientY - canvasBounds.top,
      event.clientY - canvasBounds.top]);

    let scrollX;
    let scrollY;
    let scrollZ;
    if (p[0] > this.plotBounds.x + this.plotBounds.width) {
      scrollX = false;
      scrollY = false;
      scrollZ = true;
    } else {
      scrollX = p[0] >= this.plotBounds.x;
      scrollY = p[1] < this.canvas.height - this.plotBounds.y;
      scrollZ = false;
    }

    // Transform mousepos from canvas space to device coordinates
    p[0] = ((2 * p[0]) / canvasBounds.width) - 1;
    p[1] = 1 - ((2 * p[1]) / canvasBounds.height);
    p[2] = 1 - ((p[2] - this.plotBounds.y) / this.plotBounds.height);

    const d0 = this.activeInputs[0];
    const d1 = this.activeInputs[1];
    const d2 = this.activeInputs[2];

    // Transform p from device coordinates to dataset coordinates
    this.plotTransform.deviceCoordToDatasetCoord(p, p);

    // Zoom towards mouse position
    const zoom = 1.0 - (deltaZ / 50.0);
    // Offset is difference between p in current zoom level and p after zooming
    vec3.scaleAndAdd(p, p, p, -zoom);
    if (scrollX) {
      this.plotTransform.translate(d0, p[0]);
      this.plotTransform.scale(d0, zoom);
    }
    if (scrollY) {
      this.plotTransform.translate(d1, p[1]);
      this.plotTransform.scale(d1, zoom);
    }
    if (scrollZ) {
      this.plotTransform.translate(d2, p[2]);
      this.plotTransform.scale(d2, zoom);
    }
  }

  // >>> Offscreen Rendering

  enableOffscreenRendering(width, height) {
    if (this.offscreenRendering !== null) {
      return;
    }
    this.offscreenRendering = {};

    this.gl.width = width;
    this.canvas.width = width;
    this.gl.height = height;
    this.canvas.height = height;

    this.textRenderContext.enableOffscreenRendering(width, height);

    // Disable continuous rendering
    this.offscreenRendering.enableContinuousRendering = this.options.enableContinuousRendering;
    if (this.offscreenRendering.enableContinuousRendering) {
      this.setOption('enableContinuousRendering', false);
    }

    // Create render target texture
    this.offscreenRendering.rttTexture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.offscreenRendering.rttTexture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

    // Create render target framebuffer -> this.offscreenRendering.rttFramebuffer
    this.offscreenRendering.rttFramebuffer = this.gl.createFramebuffer();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.offscreenRendering.rttFramebuffer);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0,
      this.gl.RGBA, this.gl.UNSIGNED_BYTE, null,
    );

    // Bind framebuffer
    this.gl.framebufferTexture2D(
      this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0,
      this.gl.TEXTURE_2D, this.offscreenRendering.rttTexture, 0,
    );

    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);

    // Set viewport
    this.gl.viewportWidth = width;
    this.gl.viewportHeight = height;
    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

    if (this.options.padding) {
      this.setPlotBounds(this.options.padding);
    }
  }

  disableOffscreenRendering() {
    if (this.offscreenRendering === null) {
      return;
    }

    this.textRenderContext.disableOffscreenRendering();

    // Remove framebuffer
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.deleteFramebuffer(this.offscreenRendering.rttFramebuffer);

    // Restore viewport
    this.gl.viewportWidth = this.canvas.width;
    this.gl.viewportHeight = this.canvas.height;
    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

    // Reenable continuous rendering
    if (this.offscreenRendering.enableContinuousRendering) {
      this.setOption('enableContinuousRendering', true);
    }

    this.offscreenRendering = null;

    this.onresize();
  }

  /** Renders to the off screen buffer */
  renderOffscreenBuffer() {
    // Render scene
    this.render(true);
    this.gl.finish();
  }

  /**
   * Saves the currently rendered offscreen buffer to an image
   */
  saveOffscreenBuffer() {
    // Read pixels
    const data = new Uint8Array(this.gl.viewportWidth * this.gl.viewportHeight * 4);
    this.gl.readPixels(
      0, 0, this.gl.viewportWidth, this.gl.viewportHeight,
      this.gl.RGBA, this.gl.UNSIGNED_BYTE, data,
    );

    // Create a temporary 2D canvas to store the result -> tempCanvas
    let tempCanvas = document.createElement('canvas');
    tempCanvas.setAttribute('id', 'tempCanvas');
    tempCanvas.width = this.gl.viewportWidth;
    tempCanvas.height = this.gl.viewportHeight;
    const tempContext = tempCanvas.getContext('2d');

    // Copy the pixels to the 2D canvas
    const imageData = tempContext.createImageData(tempCanvas.width, tempCanvas.height);
    imageData.data.set(data);
    tempContext.putImageData(imageData, 0, 0);
    tempContext.drawImage(this.textRenderContext.getCanvas(), 0, 0);
    const dataURL = tempCanvas.toDataURL();

    // Free tempCanvas
    tempCanvas = null;

    return dataURL;
  }

  /**
   * Call this method after updating the parent div's color or background-color styles
   * in order for the changes to be applied to the rendering pipeline.
   * @summary Apply div foreground- and background colors to the plot
   */
  updateColorSchema() {
    const vDivStyle = window.getComputedStyle(this.divElement);
    this.gl.backColor = vDivStyle.backgroundColor === 'transparent' ?
      [0, 0, 0, 0] : Colormap.rgbStringToFloatArray(vDivStyle.backgroundColor);
    this.gl.foreColor = Colormap.rgbStringToFloatArray(this.gl.foreColorString = vDivStyle.color);
    this.gl.clearColor(...this.gl.backColor);
    // histogramViewer.updateColorSchema();
    this.coordSys.updateColorSchema();
    this.colormap.updateColorSchema();
    this.invalidate();
  }

  /**
   * Call this method after updating the parent div's font style
   * in order for the changes to be applied to the rendering pipeline.
   * @summary Apply div font to the plot
   */
  updateFont() {
    const vDivStyle = window.getComputedStyle(this.divElement);
    this.textRenderContext.setFont(`${vDivStyle.fontSize} ${vDivStyle.fontFamily}`);
    this.invalidate();
  }

  /** Renders the plot */
  render(pFlipY) {
    let flipY = pFlipY;
    this.invalidating = false;
    if (typeof flipY !== 'boolean') {
      flipY = false;
    }
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.textRenderContext.clear();
    if (this.plotBounds.width <= 0 || this.plotBounds.height <= 0) {
      return;
    }

    this.gl.enable(this.gl.SCISSOR_TEST);
    this.gl.scissor(this.plotBounds.x, flipY ?
      this.gl.height - this.plotBounds.y - this.plotBounds.height :
      this.plotBounds.y, this.plotBounds.width, this.plotBounds.height);

    if (this.plotTransform !== null) {
      const isAnimating = this.plotTransform.animate();
      if (isAnimating) {
        this.invalidate();
      }

      const d0 = this.activeInputs[0];
      const d1 = this.activeInputs[1];
      // densityViewer.updateImages(imageViewer.getImages(), d0, d1);
      this.densityViewer.render(flipY, this.plotTransform, d0, d1);
      this.pointViewer.render(
        flipY, this.plotTransform,
        this.colormap.getTexture(), this.pointDrag,
      );
      // if (!isAnimating)
      this.imageViewer.render(flipY, this.plotTransform);
    }

    this.gl.disable(this.gl.SCISSOR_TEST);

    if (this.plotTransform !== null) {
      this.histogramViewer.render(flipY, this.plotTransform, this.plotBounds);
    }
    this.coordSys.render(flipY, this.plotBounds);
    this.colormap.render(flipY, this.plotBounds);

    if (this.mouseRect !== null && (this.mouseRect.width !== 0 || this.mouseRect.height !== 0)) {
      this.gl.drawRect(
        this.mouseRect.x, this.mouseRect.y,
        this.mouseRect.width, this.mouseRect.height,
      );
    }
    if (this.mousePolygon !== null) {
      this.gl.fillPolygon(this.mousePolygon, 'rgba(255, 255, 255, 0.25)');
      this.gl.drawPolygon(this.mousePolygon);
    }

    const tn = performance.now();
    this.deltaTime = tn - this.timeNow;
    this.timeNow = tn;
    if (SHOW_FPS) {
      this.frameCounter += 1;
      if (this.timeNow - this.fpsStart > 10000.0 || this.frameCounter > 1000) {
        // Refresh FPS after 10s or 1000 frames
        this.fps = (1000 * this.frameCounter) / (this.timeNow - this.fpsStart);
        this.fpsStart = this.timeNow;
        this.frameCounter = 0;
      }
      if (this.fps !== null) {
        this.gl.drawText(`${this.fps.toFixed(5)} FPS`, this.canvas.width - 8, 8, 'topright');
      } else {
        this.gl.drawText(
          `approx. ${Math.floor((this.frameCounter === 1 ?
            10000.0 : 1000 * this.frameCounter) / (this.timeNow - this.fpsStart))} FPS`,
          this.canvas.width - 8, 8, 'topright',
        );
      }
    }

    const plot = this;
    if (SIMULATE_LOW_FPS) {
      setTimeout(() => {
        plot.invalidate();
      }, 100);
    } else if (ENABLE_CONTINUOUS_RENDERING) {
      plot.invalidate();
    }
  }
}

/**
 * A singleton class that renders one aspect of the plot.
 * @interface
 * @package
 */
const Viewer = function () {
  throw new Error('not implemented');
};

/** @type  {Function} */
Viewer.prototype.render = function () {
  throw new Error('not implemented');
};

/** @type  {function(Dataset, Object)} */
Viewer.prototype.setDataset = function () {
  throw new Error('not implemented');
};

/** @type  {function(Object, boolean)} */
Viewer.prototype.onOptionsChanged = function () {
  throw new Error('not implemented');
};

/** @type  {function(Array<number>, Array<number>, Object)} */
Viewer.prototype.onInputChanged = function () {
  throw new Error('not implemented');
};

/** @type  {function(Object)} */
Viewer.prototype.onPlotBoundsChanged = function () {
  throw new Error('not implemented');
};
