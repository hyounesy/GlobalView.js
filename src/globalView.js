const webglUtils = require('./webgl-utils.js');
const libUtility = require('./utility.js');
const libTextRenderContext = require('./textRenderContext.js');
const libPointViewer = require('./pointViewer.js');
const libImageViewer = require('./imageViewer');
const libDensityViewer = require('./densityViewer.js');
const libHistogramViewer = require('./histogramViewer.js');
const libCoordinateSystem = require('./coordinateSystem.js');
const libColormap = require('./colormap.js');
const libAlgorithm = require('./algorithm.js');
const libGraphics = require('./graphics.js');
const libGlMatrix = require('gl-matrix');

/*
function myAlert(msg) {
  alert(msg); // eslint-disable-line no-alert, no-undef
}

export function initCanvas(canvasElement) {
  // var canvas = document.getElementById("canvas");
  const gl = canvasElement.getContext('webgl') ||
    canvasElement.getContext('experimental-webgl');

  // Only continue if WebGL is available and working
  if (!gl) {
    myAlert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  gl.clearColor(1, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // eslint-disable-line no-bitwise
}
*/

// >>> Options

let ENABLE_CONTINUOUS_RENDERING = false;
let SHOW_FPS = false;
const SIMULATE_LOW_FPS = false;

// var IMAGE_SIZE = 64 // Image width/height are smaller or equal to IMAGE_SIZE, maintaining aspect ratio

const ND = 4; // Number of dimensions

/** @typedef {{
 * description: string,
 * default: *,
 * valid: (function(*)|Array),
 * requireRedraw: boolean,
 * requireRecompile: boolean
 * }} */
let OptionDescription;

/**
 * @summary A fast scatterplot rendered with WebGL
 * @constructor
 * @export
 */
export function GlobalView(div, startupOptions) {
  const globalView = this;
  if (!(this instanceof GlobalView)) {
    throw new Error('GlobalView cannot be invoked without "new"');
  }

  let canvas = null;
  for (let i = 0; i < div.children.length; i += 1) {
    if (div.children[i] instanceof HTMLCanvasElement && div.children[i].globalViewWebGLCanvas) {
    // If div already contains a GlobalView-WebGL-canvas, ...
    // Share canvas
      canvas = /** @type {HTMLCanvasElement} */ (div.children[i]);
      break;
    }
  }
  if (canvas === null) {
    canvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    canvas.setAttribute('id', 'webGLCanvas');
    canvas.style.position = 'static';// "absolute";
    canvas.style.left = canvas.style.top = '0px';
    canvas.style.width = canvas.style.height = '100%';
    canvas.style.backgroundColor = 'transparent';
    canvas.globalViewWebGLCanvas = true;
    div.appendChild(canvas);
  }

  this.invalidate = function () {}; // Silently ignore calls to invalidate during initialization

  const gl = canvas.getContext('webgl');
  if (!gl) {
    alert('Error: WebGL not supported');
    return;
  }
  const OES_element_index_uint = gl.getExtension('OES_element_index_uint');
  if (!OES_element_index_uint) {
    console.warn('GlobalView warning: Unsupported WebGL extension: OES_element_index_uint');
  }
  gl.ext = gl.getExtension('ANGLE_instanced_arrays');
  if (!gl.ext) {
    console.warn('GlobalView warning: Unsupported WebGL extension: ANGLE_instanced_arrays');
  }

  const divStyle = window.getComputedStyle(div);

  let coordSys = null;
  let colormap = null;


  gl.backColor = divStyle.backgroundColor === 'transparent' ? [0, 0, 0, 0] : libUtility.rgbStringToFloatArray(divStyle.backgroundColor);
  gl.foreColor = libUtility.rgbStringToFloatArray(gl.foreColorString = divStyle.color);

  /**
   * Call this method after updating the parent div's color or background-color styles in order for the changes to be applied to the rendering pipeline.
   * @summary Apply div foreground- and background colors to the plot
   */
  this.updateColorSchema = function () {
    const divStyle = window.getComputedStyle(div);
    gl.backColor = divStyle.backgroundColor === 'transparent' ? [0, 0, 0, 0] : libUtility.rgbStringToFloatArray(divStyle.backgroundColor);
    gl.foreColor = libUtility.rgbStringToFloatArray(gl.foreColorString = divStyle.color);
    gl.clearColor(...gl.backColor);
    // histogramViewer.updateColorSchema();
    coordSys.updateColorSchema();
    colormap.updateColorSchema();
    this.invalidate();
  };

  const trc = new libTextRenderContext.TextRenderContext(gl, canvas);
  // trc.setFont("10px monospace");
  trc.setFont(`${divStyle.fontSize} ${divStyle.fontFamily}`);

  /**
   * Call this method after updating the parent div's font style in order for the changes to be applied to the rendering pipeline.
   * @summary Apply div font to the plot
   */
  this.updateFont = function () {
    const divStyle = window.getComputedStyle(div);
    trc.setFont(`${divStyle.fontSize} ${divStyle.fontFamily}`);
    this.invalidate();
  };

  let t = performance.now();
  let dt = 0.1;
  let fps = null;
  let fpsStart = t;
  let frameCounter = 0;

  const pointViewer = new libPointViewer.PointViewer(gl, this);
  const imageViewer = new libImageViewer.ImageViewer(gl, this);
  const densityViewer = new libDensityViewer.DensityViewer(gl, this);
  const histogramViewer = new libHistogramViewer.HistogramViewer(gl, this);
  coordSys = new libCoordinateSystem.CoordinateSystem(gl, this);
  colormap = new libColormap.Colormap(gl, this);
  /** @type  {Array<Viewer>} */ const viewers = [pointViewer, imageViewer, densityViewer, histogramViewer, coordSys, colormap];

  let dataset = null;
  let activeInputs = Array.create(ND, -1);
  const animatedInputs = Array.create(ND, function () {
    return { target: null, f: 0 };
  });

  this.points = pointViewer.points;
  pointViewer.representativePoints = pointViewer.createPointSet([0, 255, 0, 255], 1);
  this.createPointSet = pointViewer.createPointSet;
  this.removePointSet = pointViewer.removePointSet;

  let mouseRect = null;
  let mousePolygon = null;
  let pointDrag = null;

  let invalidating = false;
  let tf = null;
  let plotBounds = {
    x: 0, y: 0, width: 0, height: 0,
  }; // Plot bounds [pixel]

  function render(flipY) {
    invalidating = false;
    if (typeof flipY !== 'boolean') {
      flipY = false;
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    trc.clear();
    if (plotBounds.width <= 0 || plotBounds.height <= 0) {
      return;
    }

    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(plotBounds.x, flipY ? gl.height - plotBounds.y - plotBounds.height : plotBounds.y, plotBounds.width, plotBounds.height);

    if (tf !== null) {
      const isAnimating = tf.animate();
      if (isAnimating) {
        globalView.invalidate();
      }

      const d0 = activeInputs[0];
      const d1 = activeInputs[1];
      // densityViewer.updateImages(imageViewer.getImages(), d0, d1);
      densityViewer.render(flipY, tf, d0, d1);
      pointViewer.render(flipY, tf, colormap.getTexture(), pointDrag);
      // if (!isAnimating)
      imageViewer.render(flipY, tf);
    }

    gl.disable(gl.SCISSOR_TEST);

    if (tf !== null) {
      histogramViewer.render(flipY, tf, plotBounds);
    }
    coordSys.render(flipY, plotBounds);
    colormap.render(flipY, plotBounds);

    if (mouseRect !== null && (mouseRect.width !== 0 || mouseRect.height !== 0)) {
      gl.drawRect(mouseRect.x, mouseRect.y, mouseRect.width, mouseRect.height);
    }
    if (mousePolygon !== null) {
      gl.fillPolygon(mousePolygon, 'rgba(255, 255, 255, 0.25)');
      gl.drawPolygon(mousePolygon);
    }

    const tn = performance.now();
    dt = tn - t;
    t = tn;
    if (SHOW_FPS) {
      frameCounter += 1;
      if (t - fpsStart > 10000.0 || frameCounter > 1000) {
        // Refresh FPS after 10s or 1000 frames
        // fps = (frameCounter == 1 ? 10000.0 : 1000 * frameCounter) / (t - fpsStart);
        fps = (1000 * frameCounter) / (t - fpsStart);
        fpsStart = t;
        frameCounter = 0;
      }
      if (fps !== null) {
        gl.drawText(`${fps.toFixed(5)} FPS`, canvas.width - 8, 8, 'topright');
      } else {
        gl.drawText(`approx. ${Math.floor((frameCounter === 1 ? 10000.0 : 1000 * frameCounter) / (t - fpsStart))} FPS`, canvas.width - 8, 8, 'topright');
      }
    }
    if (SIMULATE_LOW_FPS) {
      setTimeout(function () {
        globalView.invalidate();
      }, 100);
    } else if (ENABLE_CONTINUOUS_RENDERING) {
      globalView.invalidate();
    }
  }

  /** @enum */
  const options = {};
  let offscreenRendering = null;

  /**
   * @summary Request to rerender the plot
   */
  this.invalidate = function () {
    if (invalidating === false && offscreenRendering === null) {
      invalidating = true;
      webglUtils.requestAnimFrame(render);
    }
  };
  let reresizeTimer = null;
  function onresize() {
    const rect = canvas.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    if (!offscreenRendering && (width !== gl.width || height !== gl.height)) {
      gl.viewport(0, 0, gl.width = canvas.width = width, gl.height = canvas.height = height);
      trc.onResize();
      if (options.padding) {
        setPlotBounds(options.padding);
      }
      if (invalidating === false && offscreenRendering === null) {
        invalidating = true;
        webglUtils.requestAnimFrame(render);
      }

      // Refire event after 100ms in case another resize handler queued after this on changes the canvas size
      if (reresizeTimer !== null) {
        clearTimeout(reresizeTimer);
      }
      reresizeTimer = setTimeout(onresize, 100);
    }
  }

  /**
   * A class containing variables and functions for transforming data vectors into device space
   * @constructor
   * @package
   */
  function Transform() {
    const offsets = new Float32Array(ND);
    const scales = new Float32Array(ND);
    const animatedScales = new Float32Array(ND);
    let invalid = false;

    // Setter methods
    this.setFromMinMax = function (d, minimum, maximum) {
      dataset.dataVectors[d].scale = maximum - minimum;
      if (dataset.dataVectors[d].scale > -1e-5 && dataset.dataVectors[d].scale < 1e-5) {
        dataset.dataVectors[d].offset = 0.5 - (0.5 * (minimum + maximum) * (dataset.dataVectors[d].scale = 0.5));
      } else {
        dataset.dataVectors[d].offset = -minimum * (dataset.dataVectors[d].scale = 1 / dataset.dataVectors[d].scale);
      }
      invalid = true;

      if (d === activeInputs[0]) {
        updateCoorinateSystem(0, activeInputs[0]);
      }
      if (d === activeInputs[1]) {
        updateCoorinateSystem(1, activeInputs[1]);
      }
      if (d === activeInputs[2]) {
        updateColormap(activeInputs[2]);
      }
      if (d === activeInputs[0] || d === activeInputs[1] || d === activeInputs[2]) {
        globalView.invalidate();
      }
    };
    this.translate = function (d, distance) {
      dataset.dataVectors[d].offset += distance * dataset.dataVectors[d].scale;
      invalid = true;

      if (d === activeInputs[0]) {
        updateCoorinateSystem(0, activeInputs[0], false);
      }
      if (d === activeInputs[1]) {
        updateCoorinateSystem(1, activeInputs[1], false);
      }
      if (d === activeInputs[2]) {
        updateColormap(activeInputs[2], false);
      }
      if (d === activeInputs[0] || d === activeInputs[1] || d === activeInputs[2]) {
        globalView.invalidate();
      }
    };
    this.scale = function (d, factor) {
      dataset.dataVectors[d].scale *= factor;
      invalid = true;

      if (d === activeInputs[0]) {
        updateCoorinateSystem(0, activeInputs[0]);
      }
      if (d === activeInputs[1]) {
        updateCoorinateSystem(1, activeInputs[1]);
      }
      if (d === activeInputs[2]) {
        updateColormap(activeInputs[2]);
      }
      if (d === activeInputs[0] || d === activeInputs[1] || d === activeInputs[2]) {
        globalView.invalidate();
      }
    };
    this.onInputChanged = () => invalid = true;

    // Getter methods
    this.getOffset = function (d) {
      return dataset.dataVectors[activeInputs[d]].offset;
    };
    this.getScale = function (d) {
      return dataset.dataVectors[activeInputs[d]].scale;
    };
    this.getMinimum = function (d) {
      return dataset.dataVectors[activeInputs[d]].minimum;
    };
    this.getMaximum = function (d) {
      return dataset.dataVectors[activeInputs[d]].maximum;
    };
    this.getVisibleMinimum = function (d) {
      return (0 - dataset.dataVectors[activeInputs[d]].offset) / dataset.dataVectors[activeInputs[d]].scale;
    };
    this.getVisibleMaximum = function (d) {
      return (1 - dataset.dataVectors[activeInputs[d]].offset) / dataset.dataVectors[activeInputs[d]].scale;
    };
    this.getOffsets = function () {
      if (invalid === true) {
        recompute();
      }
      return offsets;
    };
    this.getScales = function () {
      if (invalid === true) {
        recompute();
      }
      return scales;
    };
    this.getAnimatedScales = function () {
      if (invalid === true) {
        recompute();
      }
      return animatedScales;
    };

    // Transformation methods
    this.deviceCoordToDatasetCoord = function (vOut, vIn) {
      if (invalid === true) {
        invalid = false;
        recompute();
      }
      for (let d = 0, nd = Math.min(vIn.length, vOut.length, ND); d < nd; d += 1) {
        vOut[d] = (vIn[d] - offsets[d]) / scales[d];
      }
      return vOut;
    };
    this.deviceDistToDatasetDist = function (vOut, vIn) {
      if (invalid === true) {
        invalid = false;
        recompute();
      }
      for (let d = 0, nd = Math.min(vIn.length, vOut.length, ND); d < nd; d += 1) {
        vOut[d] = vIn[d] / scales[d];
      }
      return vOut;
    };
    this.datasetCoordToDeviceCoord = function (vOut, vIn) {
      if (invalid === true) {
        invalid = false;
        recompute();
      }
      for (let d = 0, nd = Math.min(vIn.length, vOut.length, ND); d < nd; d += 1) {
        vOut[d] = offsets[d] + (vIn[d] * scales[d]);
      }
      return vOut;
    };
    this.datasetDistToDeviceDist = function (vOut, vIn) {
      if (invalid === true) {
        invalid = false;
        recompute();
      }
      for (let d = 0, nd = Math.min(vIn.length, vOut.length, ND); d < nd; d += 1) {
        vOut[d] = vIn[d] * scales[d];
      }
      return vOut;
    };
    this.transformPos = function (vOut, vIn) {
      if (invalid === true) {
        invalid = false;
        recompute();
      }
      for (let d = 0, nd = vOut.length; d < nd; d += 1) {
        vOut[d] = offsets[d] + (vIn[activeInputs[d]] * scales[d]);
      }
      return vOut;
    };
    this.transformNml = function (vOut, vIn) {
      if (invalid === true) {
        invalid = false;
        recompute();
      }
      for (let d = 0, nd = vOut.length; d < nd; d += 1) {
        vOut[d] = vIn[activeInputs[d]] * scales[d];
      }
      return vOut;
    };
    this.transformNml2 = function (vOut, vIn) {
      if (invalid === true) {
        invalid = false;
        recompute();
      }
      for (let d = 0, nd = vOut.length; d < nd; d += 1) {
        vOut[d] = vIn[activeInputs[d]] * dataset.dataVectors[activeInputs[d]].scale;
      }
      return vOut;
    };

    // Methods modifying offsets, scales and animatedScales
    function recompute() {
      invalid = false;

      // Compute offsets and scales for active inputs
      for (let d = 0; d < ND; d += 1) {
        offsets[d] = dataset.dataVectors[activeInputs[d]].offset;
        scales[d] = dataset.dataVectors[activeInputs[d]].scale;
        animatedScales[d] = 0;
      }

      // Transform first two dimensions offsets and scales into device coordinates
      offsets[0] *= (2 * plotBounds.width) / gl.width;
      offsets[0] += ((2 * plotBounds.x) / gl.width) - 1;
      offsets[1] *= (2 * plotBounds.height) / gl.height;
      offsets[1] += ((2 * plotBounds.y) / gl.height) - 1;
      scales[0] *= (2 * plotBounds.width) / gl.width;
      scales[1] *= (2 * plotBounds.height) / gl.height;
      animatedScales[0] *= (2 * plotBounds.width) / gl.width;
      animatedScales[1] *= (2 * plotBounds.height) / gl.height;

      return offsets;
    }
    this.animate = function () {
      invalid = false;

      let isAnimating = false;

      // Compute offsets and scales, either static based on activeInputs, or animated between activeInputs and animatedInputs
      const oi = animatedInputs.map(anim => anim.origin);
      const di = activeInputs;
      for (let d = 0; d < ND; d += 1) {
        const ts = dataset.dataVectors[di[d]].scale;
        const tt = dataset.dataVectors[di[d]].offset;

        if (animatedInputs[d].origin === activeInputs[d]) {
          scales[d] = ts;
          offsets[d] = tt;
          animatedScales[d] = 0;
        } else {
          const os = dataset.dataVectors[oi[d]].scale;
          const ot = dataset.dataVectors[oi[d]].offset;

          let alpha = animatedInputs[d].f;
          offsets[d] = (alpha * tt) + ((1 - alpha) * ot);
          alpha *= Math.PI / 2.0;
          scales[d] = Math.sin(alpha) * ts;
          animatedScales[d] = Math.cos(alpha) * os;

          animatedInputs[d].f += dt * 0.001;
          if (animatedInputs[d].f >= 1.0) {
            animatedInputs[d].origin = activeInputs[d];
          }

          isAnimating = true;
        }
      }

      // Transform first two dimensions offsets and scales into device coordinates
      offsets[0] *= (2 * plotBounds.width) / gl.width;
      offsets[0] += ((2 * plotBounds.x) / gl.width) - 1;
      offsets[1] *= (2 * plotBounds.height) / gl.height;
      offsets[1] += ((2 * plotBounds.y) / gl.height) - 1;
      scales[0] *= (2 * plotBounds.width) / gl.width;
      scales[1] *= (2 * plotBounds.height) / gl.height;
      animatedScales[0] *= (2 * plotBounds.width) / gl.width;
      animatedScales[1] *= (2 * plotBounds.height) / gl.height;

      return isAnimating;
    };
  }

  this.getPlotBounds = function () {
    return plotBounds;
  };
  function setPlotBounds(padding) {
    let computedPadding;
    if (libUtility.isArray(padding) && padding.length === 4) {
      computedPadding = padding.map((v, i) => Math.floor(libUtility.isString(v) ?
        Number.parseFloat(v) * (v.endsWith('%') ? (i % 2 === 0 ? canvas.width : canvas.height) / 100 : 1) :
        padding[i]));
    } else if (libUtility.isNumber(padding) || libUtility.isString(padding)) {
      computedPadding = Array.create(4, i => Math.floor(libUtility.isString(padding) ?
        Number.parseFloat(padding) * (padding.endsWith('%') ? (i % 2 === 0 ? canvas.width : canvas.height) / 100 : 1) :
        padding));
    }

    const newPlotBounds = {
      x: computedPadding[3],
      y: computedPadding[2],
      width: canvas.width - computedPadding[3] - computedPadding[1],
      height: canvas.height - computedPadding[0] - computedPadding[2],
    };

    if (newPlotBounds.x !== plotBounds.x ||
      newPlotBounds.y !== plotBounds.y ||
      newPlotBounds.width !== plotBounds.width ||
      newPlotBounds.height !== plotBounds.height) {
      viewers.forEach(viewer => viewer.onPlotBoundsChanged(plotBounds = newPlotBounds));
    } else {
      plotBounds = newPlotBounds;
    }
  }

  /**
   * @summary Zoom all dimensions to exactly fit all data points
   */
  this.zoomFit = function () {
    const nv = dataset.dataVectors.length;

    // Compute offsets and scales to fit dataset inside view
    for (let v = 0; v < nv; v += 1) {
      tf.setFromMinMax(v, dataset.dataVectors[v].minimum, dataset.dataVectors[v].maximum);
    }
  };

  /**
   * @summary Zoom currently visible x- and y- dimensions to exactly fit all data points
   */
  this.zoomFit2D = function () {
    const d0 = activeInputs[0];
    const d1 = activeInputs[1];

    // Compute offsets and scales to fit dataset inside view
    tf.setFromMinMax(d0, dataset.dataVectors[d0].minimum, dataset.dataVectors[d0].maximum);
    tf.setFromMinMax(d1, dataset.dataVectors[d1].minimum, dataset.dataVectors[d1].maximum);
  };

  /**
   * @summary Zoom currently visible x- and y- dimensions to the given bounds in data space
   * @param  {{l: number, t: number, r: number, b: number}} rect Bounds of the visible region
   */
  this.zoomRect = function (rect) {
    const d0 = activeInputs[0];
    const d1 = activeInputs[1];

    tf.setFromMinMax(d0, rect.l, rect.r);
    tf.setFromMinMax(d1, rect.t, rect.b);
  };

  // >>> Options

  /**
   * @summary A map of valid options with option descriptions, validation functions and flags about side effects
   * @const
   * @enum {OptionDescription}
  */
  const OPTIONS = {
    // General plot options
    /** The space around the drawing area in the form [top, right, bottom, left]. X-axis, y-axis and colormap are drawn within padding space. */
    padding: {
      description: 'The space around the drawing area in the form [top, right, bottom, left]. X-axis, y-axis and colormap are drawn within padding space.',
      default: [50, 60, 50, 50],
      valid: value => libUtility.isNumber(value) || libUtility.isString(value) || (libUtility.isArray(value) && value.length === 4),
      requireRedraw: true,
      requireRecompile: false,
    },
    /** When enabled, shows a colormap to the right of the plot. */
    showColormap: {
      description: 'When enabled, shows a colormap to the right of the plot.',
      default: true,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
    /** When enabled, scrolling above the plot zooms in or out of the data. */
    enableScrolling: {
      description: 'When enabled, scrolling above the plot zooms in or out of the data.',
      default: true,
      valid: [true, false],
      requireRedraw: false,
      requireRecompile: false,
    },
    /** When enabled, thumbnails can be dragged with the mouse. */
    enableThumbnailDragging: {
      description: 'When enabled, thumbnails can be dragged with the mouse.',
      default: true,
      valid: [true, false],
      requireRedraw: false,
      requireRecompile: false,
    },

    // Advanced plot options
    /** When enabled, the canvas is continuously rerendered at up to 60 frames per second. Keep this setting disabled to save processing resources. */
    enableContinuousRendering: {
      description: 'When enabled, the canvas is continuously rerendered at up to 60 frames per second. Keep this setting disabled to save processing resources.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Enables/disables blending in WebGL. Whenever using any kind of transparency, this setting should be kept enabled. */
    enableTransparency: {
      description: 'Enables/disables blending in WebGL. Whenever using any kind of transparency, this setting should be kept enabled.',
      default: true,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
    /** When enabled, draws an image into the background, that shows density of points. (can be combined with 'showPointClusters') */
    showPointDensity: {
      description: "When enabled, draws an image into the background, that shows density of points. (can be combined with 'showPointClusters')",
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
    /** When enabled, draws an image into the background, that shows colored clusters of points. (can be combined with 'showPointDensity') */
    showPointClusters: {
      description: "When enabled, draws an image into the background, that shows colored clusters of points. (can be combined with 'showPointDensity')",
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
    pointClusterThreshold: {
      description: "Controls the realtive threshold between clusters and outliers when showing clusters (see 'showPointClusters')",
      default: (new libAlgorithm.ClusterMapOptions()).threshold,
      valid: value => value > 0,
      requireRedraw: false, // Requests redraw internally
      requireRecompile: false,
    },

    // Histogram options
    /** When enabled, shows a histogram between the x-axis and the plot. */
    showXAxisHistogram: {
      description: 'When enabled, shows a histogram between the x-axis and the plot.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
    /** When enabled, shows a histogram between the y-axis and the plot. */
    showYAxisHistogram: {
      description: 'When enabled, shows a histogram between the y-axis and the plot.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
    /** When enabled, shows a histogram between the colormap and the plot. */
    showColormapHistogram: {
      description: 'When enabled, shows a histogram between the colormap and the plot.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Controls the number of bins within each histogram in the scatterplot. */
    numHistogramBins: {
      description: 'Controls the number of bins within each histogram in the scatterplot.',
      default: 50,
      valid: value => value >= 1,
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Controls the height of each histogram in the scatterplot (in pixels). */
    histogramHeight: {
      description: 'Controls the height of each histogram in the scatterplot (in pixels).',
      default: 64,
      valid: value => value >= 0,
      requireRedraw: true,
      requireRecompile: false,
    },

    // Point options
    /** Controls the shape of data points in the scatterplot. */
    pointShape: {
      description: 'Controls the shape of data points in the scatterplot.',
      default: 'Circle',
      valid: ['Rectangle', 'Circle', 'Cross', 'Diamond', 'Gaussian', 'Custom'],
      requireRedraw: true,
      requireRecompile: true,
    },
    /** When 'pointShape' is set to 'Custom', this defines a GLSL function given vec2 p, that returns opacity in the range [0.0 ... 1.0] at location p. */
    customPointShape: {
      description: "When 'pointShape' is set to 'Custom', this defines a GLSL function given vec2 p, that returns opacity in the range [0.0 ... 1.0] at location p.",
      default: '{ return 1.0; }',
      valid: value => libGraphics.validateGLSL(gl, `float opacityMap(in vec2 p) ${value}`),
      requireRedraw: true,
      requireRecompile: true,
    },
    /** Controls the diameter of data points in the scatterplot (in pixels). */
    pointSize: {
      description: 'Controls the diameter of data points in the scatterplot (in pixels).',
      default: 6,
      valid: value => value >= 0,
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Controls the visibility of data points in the scatterplot between 0 (invisible) and 1 (fully opaque). */
    pointOpacity: {
      description: 'Controls the visibility of data points in the scatterplot between 0 (invisible) and 1 (fully opaque).',
      default: 1,
      valid: value => value >= 0 && value <= 1,
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Controls the color of data points in the scatterplot. Valid values are an array of bytes in RGBA order or a colormap name. */
    pointColor: {
      description: 'Controls the color of data points in the scatterplot. Valid values are an array of bytes in RGBA order or a colormap name.',
      default: 'exhue',
      valid: value => libColormap.validateColormap(value),
      requireRedraw: true,
      requireRecompile: false,
    },

    // Thumbnail options
    /** Controls the width/height of thumbnails in the scatterplot (in pixels). */
    thumbnailSize: {
      description: 'Controls the width/height of thumbnails in the scatterplot (in pixels).',
      default: 64,
      valid: value => value > 0,
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Controls the width of thumbnail borders in the scatterplot. */
    thumbnailBorderWidth: {
      description: 'Controls the width of thumbnail borders in the scatterplot.',
      default: 1,
      valid: value => value >= 0,
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Controls the color of thumbnail borders in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'.
      If set to 'null', the CSS foreground color will be used. */
    thumbnailBorderColor: {
      description: "Controls the color of thumbnail borders in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'. " +
        "If set to 'null', the CSS foreground color will be used.",
      default: null,
      valid: value => value === null || libColormap.validateColor(value),
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Controls the color of thumbnail line in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'.
    If set to 'null', the CSS foreground color will be used. */
    thumbnailLineColor: {
      description: "Controls the color of thumbnail line in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'. " +
        "If set to 'null', the CSS foreground color will be used.",
      default: null,
      valid: value => value === null || libColormap.validateColor(value),
      requireRedraw: true,
      requireRecompile: false,
    },
    /** Controls the color of thumbnail labels in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'.
    If set to 'null', the CSS background color will be used. */
    thumbnailLabelColor: {
      description: "Controls the color of thumbnail labels in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'. " +
        "If set to 'null', the CSS foreground color will be used.",
      default: null,
      valid: value => value === null || libColormap.validateColor(value),
      requireRedraw: true,
      requireRecompile: false,
    },
    /** When enabled, links thumbnails to points using unique labels instead of lines. */
    labelThumbnails: {
      description: 'When enabled, links thumbnails to points using unique labels instead of lines.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false,
    },
  };

  const pushedOptions = [];
  function onOptionsChanged(requireRedraw, requireRecompile) {
    // Update trivial options
    ENABLE_CONTINUOUS_RENDERING = options.enableContinuousRendering;
    SHOW_FPS = options.enableContinuousRendering;
    if (options.enableTransparency) {
      gl.enable(gl.BLEND);
    } else {
      gl.disable(gl.BLEND);
    }
    colormap.visible = options.showColormap;
    densityViewer.showDensityMap = options.showPointDensity;
    densityViewer.showClusterMap = options.showPointClusters;
    densityViewer.setClusterMapThreshold(options.pointClusterThreshold);

    if (options.padding) {
      setPlotBounds(options.padding);
    }

    viewers.forEach(viewer => viewer.onOptionsChanged(options, requireRecompile));

    if (dataset !== null) {
      // Reset FPS counter
      fps = null;
      fpsStart = t;
      frameCounter = 0;

      // Redraw
      if (requireRedraw) {
        this.invalidate();
      }
    }
  }

  /**
   * Note: When setting multiple options, {@link GlobalView#setOptions} should be prefered.
   * @summary Sets the given option
   * @see GlobalView#OPTIONS
   * @param  {string} option
   * @param  {*} value
   */
  this.setOption = function (option, value) {
    // Validate option
    if (!OPTIONS.hasOwnProperty(option)) {
      console.warn(`GlobalView warning: Unsupported option: ${option}`);
      return;
    }
    const optionDefinition = OPTIONS[option];

    // Validate value
    let validationResult;
    if ((libUtility.isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1) ||
      (libUtility.isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true)) {
      console.warn(`GlobalView warning: Invalid value for option ${option}: ${value}`);
      if (libUtility.isString(validationResult)) {
        console.warn(`                    ${validationResult}`);
      }
      return;
    }

    // Set option
    options[option] = value;

    onOptionsChanged.call(this, optionDefinition.requireRedraw, optionDefinition.requireRecompile);
  };

  /**
   * @summary Sets multiple options
   * @param  {Object} newOptions A JavaScript object of options
   */
  this.setOptions = function (newOptions) {
    let requireRecompile = false;
    let requireRedraw = false;
    for (const option in newOptions) {
      if (!newOptions.hasOwnProperty(option)) {
        continue;
      }

      // Validate option
      if (!OPTIONS.hasOwnProperty(option)) {
        console.warn(`GlobalView warning: Unsupported option: ${option}`);
        continue;
      }
      const optionDefinition = OPTIONS[option];

      // Validate value
      const value = newOptions[option];
      let validationResult;
      if ((libUtility.isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1) ||
        (libUtility.isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true)) {
        console.warn(`GlobalView warning: Invalid value for option ${option}: ${value}`);
        if (libUtility.isString(validationResult)) {
          // HY:
          validationResult = optionDefinition.valid(value);
          console.warn(`                    ${validationResult}`);
        }
        continue;
      }

      // Set option
      options[option] = value;

      requireRecompile = requireRecompile || optionDefinition.requireRecompile;
      requireRedraw = requireRedraw || optionDefinition.requireRedraw;
    }

    onOptionsChanged.call(this, requireRedraw, requireRecompile);
  };

  /**
   * @summary Sets the given option to its default value
   * @param  {string} option
   */
  this.setDefaultOption = function (option) {
    // Validate option
    if (!OPTIONS.hasOwnProperty(option)) {
      console.warn(`GlobalView warning: Unsupported option: ${option}`);
      return;
    }
    const optionDefinition = OPTIONS[option];

    this.setOption(option, optionDefinition.default);
  };

  /**
   * @summary Sets all options to their respective defaults
   */
  this.setDefaultOptions = function () {
    const defaultOptions = {};
    for (const option in OPTIONS) {
      if (OPTIONS.hasOwnProperty(option)) {
        defaultOptions[option] = OPTIONS[option].default;
      }
    }
    this.setOptions(defaultOptions);
  };

  /**
   * @summary Checks the given option for errors without setting it
   * @param  {string} option
   * @param  {*} value
   * @return  {string|boolean} Error message or 'true' if the option is valid
   */
  this.validateOption = function (option, value) {
    // Validate option
    if (!OPTIONS.hasOwnProperty(option)) {
      return `Unsupported option: ${option}`;
    }
    const optionDefinition = OPTIONS[option];

    // Validate value
    let validationResult;
    if ((libUtility.isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1) ||
      (libUtility.isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true)) {
      return `Invalid value for option ${option}: ${value}${libUtility.isString(validationResult) ? `\n    ${validationResult}` : ''}`;
    }

    return true;
  };

  /**
   * @summary Checks multiple options for errors without setting them
   * @param  {Object} newOptions A JavaScript object of options
   * @return  {string|boolean} Error message or 'true' if all options are valid
   */
  this.validateOptions = function (newOptions) {
    const errors = [];
    for (const option in newOptions) {
      if (!newOptions.hasOwnProperty(option)) {
        continue;
      }

      // Validate option
      if (!OPTIONS.hasOwnProperty(option)) {
        errors.push(`Unsupported option: ${option}`);
        continue;
      }
      const optionDefinition = OPTIONS[option];

      // Validate value
      const value = newOptions[option];
      let validationResult;
      if ((libUtility.isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1) ||
        (libUtility.isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true)) {
        errors.push(`Invalid value for option ${option}: ${value}${libUtility.isString(validationResult) ? `\n    ${validationResult}` : ''}`);
        continue;
      }
    }

    return errors.length === 0 ? true : errors.join('\n');
  };

  /**
   * @summary Returns the value assigned to the given option
   * @param  {string} option
   * @return {*}
   */
  this.getOption = function (option) {
    return options[option];
  };

  /**
   * @summary Returns a JavaScript object of all options and their values
   * @return {Object}
   */
  this.getOptions = function () {
    return /** @type {Object} */(JSON.parse(JSON.stringify(options)));
  };

  /**
   * @summary Save all options
   */
  this.pushOptions = function () {
    pushedOptions.push(options);
    // options = {};
  };

  /**
   * @summary Recall the options last saved with {@link GlobalView#pushOptions}
   */
  this.popOptions = function () {
    if (pushedOptions.length !== 0) {
      this.setOptions(pushedOptions.pop());
    }
  };

  // >>> Dataset interaction

  /**
   * @private
   * @param  {number} d
   * @param  {number} columnIdx
   * @param  {boolean=} changeTickDistance=true
   */
  function updateCoorinateSystem(d, columnIdx, changeTickDistance) {
    if (dataset.dataVectors[columnIdx].values) {
      coordSys.setEnumRange(d, tf.getVisibleMinimum(d), tf.getVisibleMaximum(d), dataset.dataVectors[columnIdx].values);
    } else {
      coordSys.setNumericRange(d, tf.getVisibleMinimum(d), tf.getVisibleMaximum(d), changeTickDistance);
    }
    coordSys.setLabel(d, dataset.dataVectors[columnIdx].label);
  }
  /**
   * @private
   * @param  {number} columnIdx
   * @param  {boolean=} changeTickDistance=true
   */
  function updateColormap(columnIdx, changeTickDistance) {
    if (dataset.dataVectors[columnIdx].values) {
      colormap.setEnumRange(tf.getVisibleMinimum(2), tf.getVisibleMaximum(2), dataset.dataVectors[columnIdx].values);
    } else {
      colormap.setNumericRange(tf.getVisibleMinimum(2), tf.getVisibleMaximum(2), changeTickDistance);
    }
    colormap.setLabel(dataset.dataVectors[columnIdx].label);
  }

  // var pushedDatasets = [];
  /**
   * @summary Load a dataset into the plot
   * @param  {Dataset} _dataset
   * @param  {number} activeColumnX
   * @param  {number} activeColumnY
   * @param  {number} activeColumnC
   * @param  {number} activeColumnS
   */
  this.load = function (_dataset, activeColumnX, activeColumnY, activeColumnC, activeColumnS) {
    // Remove old dataset
    dataset = null;
    activeInputs = Array.create(ND, -1);
    imageViewer.clearImages();

    // Set new dataset
    dataset = _dataset;
    animatedInputs[0].origin = activeInputs[0] = activeColumnX;
    animatedInputs[1].origin = activeInputs[1] = activeColumnY;
    animatedInputs[2].origin = activeInputs[2] = activeColumnC;
    animatedInputs[3].origin = activeInputs[3] = activeColumnS;
    // dataset.dataVectors.push(new DataVector(dataset, "({1} + {2}) / 2.0"));//"i"));
    // dataset.dataVectors.push(new DataVector(dataset, "{2} + 2.0"));//"i"));


    // Reset transform
    tf = new Transform();
    this.zoomFit();

    // Update viewers
    viewers.forEach(viewer => viewer.setDataset(dataset, options));
    viewers.forEach(viewer => viewer.onInputChanged(activeInputs, animatedInputs, options));
    /* pointViewer.setDataset(dataset, options);
    pointViewer.onInputChanged(activeInputs, animatedInputs, options);
    densityViewer.setDataset(dataset, options);
    histogramViewer.setDataset(dataset, options);
    histogramViewer.onInputChanged(activeInputs, animatedInputs, options); */

    // Reset FPS counter
    fps = null;
    fpsStart = t;
    frameCounter = 0;

    // Redraw
    this.invalidate();
  };

  /**
   * Assign dataset column c to axis d
   * @param  {number} d
   * @param  {number} c
   */
  this.setActiveColumn = function (d, c) {
    if (!ENABLE_CONTINUOUS_RENDERING) {
      dt = 0.0;
      t = performance.now();
    }

    animatedInputs[d].origin = activeInputs[d];
    animatedInputs[d].f = 0.0;
    activeInputs[d] = c;

    tf.onInputChanged();
    viewers.forEach(viewer => viewer.onInputChanged(activeInputs, animatedInputs, options));
    /* pointViewer.onInputChanged(activeInputs, animatedInputs, options);
    histogramViewer.onInputChanged(activeInputs, animatedInputs, options); */
    if (d < 2) {
      updateCoorinateSystem(d, activeInputs[d]);
    } else {
      updateColormap(activeInputs[2]);
    }
    if (d < 3) {
      this.invalidate();
    }
  };

  /**
   * Get column assigned to axis c
   * @param  {number} d
   * @return {number}
   */
  this.getActiveColumn = function (d) {
    return d >= 0 && d < activeInputs.length ? activeInputs[d] : -1;
  };


  /**
   * @param  {number} n
   * @param  {number} densityRatio
   * @param  {function(Array<number>)} ondone Event handler, called after characteristic points have been found
   */
  this.getCharacteristicPoints = function (n, densityRatio, ondone) {
    if (!dataset) {
      return;
    }
    let d0 = activeInputs[0];
    let d1 = activeInputs[1];
    dataset.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
      if (d1 < d0) {
        // Swap d0 <-> d1
        const temp = d0;
        d0 = d1;
        d1 = temp;
      }

      const characteristicPoints = libAlgorithm.findRepresentativePoints2(dataset, d0, d1, densityMap, n, densityRatio);
      ondone(characteristicPoints);
    });
  };

  // >>> Annotation

  /**
   * @summary Remove all thumbnails from the plot
   */
  this.clearThumbnails = function () {
    // Clear stencil maps
    if (dataset) {
      dataset.iterateDensityMaps(function (densityMap) {
        if (densityMap.stencilMap && densityMap.stencilMap.data) {
          for (let i = 0, stencilMap = densityMap.stencilMap.data, len = stencilMap.length; i < len; i += 1) {
            stencilMap[i] = 0;
          }
        }
      });
    }

    imageViewer.clearImages();
    this.invalidate();
  };
  /**
   */
  this.showData2D = function () {
    imageViewer.clearImages();

    let d0 = activeInputs[0];
    let d1 = activeInputs[1];
    dataset.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
      if (d1 < d0) {
        // Swap d0 <-> d1
        const temp = d0;
        d0 = d1;
        d1 = temp;
      }

      if (!densityMap.stencilMap) {
        densityMap.stencilMap = {};
      }

      // downloadDensityMap(densityMap);
      pointViewer.representativePoints.assign(libAlgorithm.findRepresentativePoints2(dataset, d0, d1, densityMap, 16, 0.3));
      if (dataset.imageFilenames) {
        pointViewer.representativePoints.forEach(function (r) {
          if (dataset.imageFilenames[r]) {
            const dataPos = dataset.dataVectors.map(v => v.getValue(r));
            const imagePos = dataPos.slice(0);
            const p = libAlgorithm.findClosePointOfLowDensity(
              dataset, d0, d1, r,
              densityMap, densityMap.stencilMap,
              (0.6 * options.thumbnailSize) / gl.width,
              (0.6 * (options.thumbnailSize + libImageViewer.getLabelHeight())) / gl.height,
            ); // EDIT: Factor 0.6: WHY?
            imagePos[d0] = p[0];
            imagePos[d1] = p[1];
            const imageSize = dataset.dataVectors.map(v => options.thumbnailSize * (v.maximum - v.minimum));
            imageViewer.showImage(dataset.imageFilenames[r], r, dataPos, imagePos, imageSize);
          }
        });
      }
      // downloadDensityMap(densityMap);
    });
  };


  /**
   * @summary A shorthand function to `showImage(index, "lowDensity")`
   * @param  {number} index Index of the datapoint to show
   */
  this.showImage_lowDensity = function (index) {
    if (dataset.imageFilenames && dataset.imageFilenames[index]) {
      let d0 = activeInputs[0];
      let d1 = activeInputs[1];
      // console.log(dataset.requestDensityMap(d0, d1, undefined, undefined));
      // dataset.requestDensityMap(d0, d1, undefined, undefined, function(densityMap) { console.log(densityMap); });

      dataset.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
        let imageWidth = (0.6 * options.thumbnailSize) / gl.width;
        let imageHeight = ((0.6 * options.thumbnailSize) + libImageViewer.getLabelHeight()) /
          gl.height; // EDIT: Factor 0.6: WHY?
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

        const dataPos = dataset.dataVectors.map(v => v.getValue(index));
        let imagePos;
        if (libUtility.isUndefined(densityMap.data)) { // If densityMap is nD
          imagePos = libAlgorithm.findClosePointOfLowDensityND_descend(
            dataset, index, densityMap,
            (0.6 * options.thumbnailSize) / Math.min(gl.width, gl.height),
          );
        } else { // EDIT: Factor 0.6: WHY?
          imagePos = dataPos.slice(0);

          if (!densityMap.stencilMap) {
            densityMap.stencilMap = {};
          }
          const p = libAlgorithm.findClosePointOfLowDensity(dataset, d0, d1, index, densityMap, densityMap.stencilMap, imageWidth, imageHeight);
          if (p) {
            imagePos[d0] = p[0];
            imagePos[d1] = p[1];
          } else {
            const halfImageSize = [
              (1.1 * options.thumbnailSize) / gl.width,
              (1.1 * options.thumbnailSize) / gl.height];
            tf.deviceDistToDatasetDist(halfImageSize, halfImageSize);
            imagePos[d0] += halfImageSize[0];
            imagePos[d1] += halfImageSize[1];
          }
        }
        const imageSize = dataset.dataVectors.map(v => options.thumbnailSize * (v.maximum - v.minimum));
        imageViewer.showImage(dataset.imageFilenames[index], index, dataPos, imagePos, imageSize);
      });
    }
  };

  /**
   * @summary A shorthand function to `showImages(index, "lowDensity")`
   * @param  {Array<number>} points List of indices of datapoints to show
   */
  this.showImages_lowDensity = function (points) {
    if (dataset.imageFilenames) {
      let d0 = activeInputs[0];
      let d1 = activeInputs[1];
      dataset.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
        let imageWidth = (0.6 * options.thumbnailSize) / gl.width;
        let imageHeight = ((0.6 * options.thumbnailSize) + libImageViewer.getLabelHeight()) /
          gl.height; // EDIT: Factor 0.6: WHY?
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
        libAlgorithm.markPointsInStencilMap(dataset, d0, d1, points, densityMap, densityMap.stencilMap, imageWidth, imageHeight);
      });
    }
    points.forEach(i => globalView.showImage_lowDensity(i));
    imageViewer.resolveIntersections(tf);
  };


  /**
   * @summary A shorthand function to `showImage(index, "none")`
   * @param  {number} index Index of the datapoint to show
   */
  this.showImage_none = function (index) {
    const dataPos = dataset.dataVectors.map(v => v.getValue(index));
    imageViewer.showImage(dataset.imageFilenames[index], index, dataPos);
  };

  /**
   * @summary A shorthand function to `showImages(index, "none")`
   * @param  {Array<number>} points List of indices of datapoints to show
   */
  this.showImages_none = function (points) {
    points.forEach(function (p) {
      const dataPos = dataset.dataVectors.map(v => v.getValue(p));
      imageViewer.showImage(dataset.imageFilenames[p], p, dataPos);
    });
  };


  /**
   * @summary A shorthand function to `showImage(index, "adjacent")`
   * @param  {number} index Index of the datapoint to show
   */
  this.showImage_adjacent = function (index) {
    const dataPos = dataset.dataVectors.map(v => v.getValue(index));
    const imageSize = dataset.dataVectors.map(v => options.thumbnailSize * (v.maximum - v.minimum));
    imageViewer.showImage(dataset.imageFilenames[index], index, dataPos, dataPos, imageSize, 'bottomleft');
  };

  /**
   * @summary A shorthand function to `showImages(index, "adjacent")`
   * @param  {Array<number>} points List of indices of datapoints to show
   */
  this.showImages_adjacent = function (points) {
    points.forEach(i => globalView.showImage_adjacent(i));
  };


  /**
   * @summary A shorthand function to `showImages(index, "project")`
   * @param  {Array<number>} points List of indices of datapoints to show
   */
  this.showImages_project = function (points) {
    if (!dataset.imageFilenames) {
      return;
    }

    const d0 = activeInputs[0];
    const d1 = activeInputs[1];
    const offsets = tf.getOffsets();
    const scales = tf.getScales();

    // Computed expected value (= mean) of points -> E
    const E = [0, 0];
    points.forEach(function (p) {
      E[0] += dataset.dataVectors[d0].getValue(p);
      E[1] += dataset.dataVectors[d1].getValue(p);
    });
    E[0] *= scales[0] / points.length;
    E[1] *= scales[1] / points.length;

    // Compute covariance matrix of points -> cov [symetrical 2D matrix]
    const cov = [0, 0, 0];
    points.forEach(function (p) {
      const x0 = (dataset.dataVectors[d0].getValue(p) * scales[0]) - E[0];
      const x1 = (dataset.dataVectors[d1].getValue(p) * scales[1]) - E[1];
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
    const eigenvec_length = Math.sqrt((eigenvec[0] * eigenvec[0]) + (eigenvec[1] * eigenvec[1]));
    eigenvec[0] /= eigenvec_length;
    eigenvec[1] /= eigenvec_length;

    // Define corners of AABB
    const imageSize = dataset.dataVectors.map(v => options.thumbnailSize * (v.maximum - v.minimum));
    const labelHeightOffset = 1.0 + (libImageViewer.getLabelHeight() / options.thumbnailSize);
    const labelWidthOffset = 1.0 + ((libImageViewer.getLabelHeight() + (2 * libImageViewer.getLabelWidth())) / options.thumbnailSize);
    const bl = [
      tf.getMinimum(0) - ((imageSize[d0] * 0.6) / plotBounds.width),
      tf.getMinimum(1) - ((imageSize[d1] * 0.6) / plotBounds.height),
    ];
    const tl = [
      tf.getMinimum(0) - ((imageSize[d0] * 0.6) / plotBounds.width),
      tf.getMaximum(1) + ((imageSize[d1] * labelHeightOffset * 0.8) / plotBounds.height),
    ];
    const tr = [
      tf.getMaximum(0) + ((imageSize[d0] * labelWidthOffset * 0.6) / plotBounds.width),
      tf.getMaximum(1) + ((imageSize[d1] * labelHeightOffset * 0.8) / plotBounds.height),
    ];
    const br = [
      tf.getMaximum(0) + ((imageSize[d0] * labelWidthOffset * 0.6) / plotBounds.width),
      tf.getMinimum(1) - ((imageSize[d1] * 0.6) / plotBounds.height),
    ];
    tf.datasetCoordToDeviceCoord(bl, bl);
    tf.datasetCoordToDeviceCoord(tl, tl);
    tf.datasetCoordToDeviceCoord(tr, tr);
    tf.datasetCoordToDeviceCoord(br, br);

    // >>> Set image locations to be projections of data positions along eigenvec onto AABB

    const posToLoc = function (p) {
      p[0] = Math.max(0, Math.min(1, (p[0] - tl[0]) / (br[0] - tl[0]))); // Normalize p[0] from [l ... r] to [0 ... 1]
      p[1] = Math.max(0, Math.min(1, (p[1] - tl[1]) / (br[1] - tl[1]))); // Normalize p[1] from [t ... b] to [0 ... 1]
      switch ([p[0], p[1], 1 - p[0], 1 - p[1]].minIndex()) {
        default: /* case 0: */ return 1 - p[1];
        case 1: return 1 + p[0];
        case 2: return 2 + p[1];
        case 3: return 4 - p[0];
      }
    };
    const locToPos = function (l) {
      l = (l + 4) % 4;
      let p;
      const li = Math.floor(l);
      switch (li) {
        case 0: p = [0, (li + 1) - l]; break;
        case 1: p = [l - li, 0]; break;
        case 2: p = [1, l - li]; break;
        case 3: p = [(li + 1) - l, 1]; break;
      }
      p[0] = (p[0] * (br[0] - tl[0])) + tl[0]; // Denormalize p[0] from [0 ... 1] to [l ... r]
      p[1] = (p[1] * (br[1] - tl[1])) + tl[1]; // Denormalize p[1] from [0 ... 1] to [t ... b]
      return p;
    };

    let imageLocations = [];
    let dest;
    const v0 = dataset.dataVectors[activeInputs[0]];
    const v1 = dataset.dataVectors[activeInputs[1]];
    points.forEach(function (p) {
      if (!dataset.imageFilenames[p]) {
        return;
      }

      const src = [v0.getValue(p), v1.getValue(p)];
      tf.datasetCoordToDeviceCoord(src, src); // Same as src = [v0.getValue(p) * scales[0] + offsets[0], v1.getValue(p) * scales[1] + offsets[1]];

      if (libGlMatrix.vec2.dot([src[0] - offsets[0] - E[0], src[1] - offsets[1] - E[1]], eigenvec) > 0.0) {
        // If src is above E in direction eigenvec
        dest = libAlgorithm.vectorLineIntersection2D(src, eigenvec, bl, tl); // Project src in direction eigenvec onto line from bl, to tl
        if (!dest) {
          dest = libAlgorithm.vectorLineIntersection2D(src, eigenvec, tl, tr);
        } // Project src in direction eigenvec onto line from tl, to tr
      } else {
        // If src is below E in direction eigenvec
        dest = libAlgorithm.vectorLineIntersection2D(src, eigenvec, bl, br); // Project src in direction -eigenvec onto line from bl, to br
        if (!dest) {
          dest = libAlgorithm.vectorLineIntersection2D(src, eigenvec, br, tr);
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
    const removeOverlap = function (R, i, j, rank, overlapThreshold) {
      const overlap = overlapThreshold - Math.abs(R[i] - R[j]);
      if (overlap > 0.0) {
        const shift = 0.5 * (rank[i] > rank[j] ? overlapThreshold - (R[i] - R[j]) : (R[j] - R[i]) - overlapThreshold);
        R[i] += shift;
        R[j] -= shift;
      }
    };

    const maxNumIterations = 10000;
    if (maxNumIterations !== 0) {
      const R = imageLocations;
      const overlapThreshold = Math.min(0.15, 4 / imageLocations.length);

      const rank = Array.create(R.length, i => i);
      rank.sort((a, b) => imageLocations[a] < imageLocations[b] ? -1 : imageLocations[a] > imageLocations[b] ? 1 : 0);

      let P = detectOverlap(R, overlapThreshold);
      for (let iter = 0; iter < maxNumIterations && P.length !== 0; iter += 1) {
        // TODO: Shuffle P
        P.forEach(pair => removeOverlap(R, pair[0], pair[1], rank, overlapThreshold + 0.0001));
        P = detectOverlap(R, overlapThreshold);
      }
      // console.log(iter, overlapThreshold);

      // Repair order
      const newRank = Array.create(R.length, i => i);
      newRank.sort((a, b) => R[a] < R[b] ? -1 : R[a] > R[b] ? 1 : 0);
      const R_repaired = new Array(R.length);
      for (let i = 0; i < R.length; i += 1) {
        R_repaired[rank[i]] = R[newRank[i]];
      }

      imageLocations = R_repaired;
    }

    let idx = 0;
    points.forEach(function (p) {
      if (!dataset.imageFilenames[p]) {
        return;
      }

      const dataPos = dataset.dataVectors.map(v => v.getValue(p));
      const imagePos = dataPos.slice(0);

      // Convert scalar to position on rectangle [bl, br, tl, tr] -> dest
      dest = locToPos(imageLocations[idx]);
      idx += 1;
      tf.deviceCoordToDatasetCoord(dest, dest);
      imagePos[d0] = dest[0];
      imagePos[d1] = dest[1];

      imageViewer.showImage(dataset.imageFilenames[p], p, dataPos, imagePos, imageSize);
    });

    imageViewer.resolveIntersections(tf);
  };


  /**
   * Valid placement strategies are:
   * + none
   * + adjacent
   * + lowDensity
   * @summary Show a thumbnail of the given datapoint
   * @param  {number} index Index of the datapoint to show
   * @param  {string} placement
   */
  this.showImage = function (index, placement) {
    switch (placement) {
      case 'none': return this.showImage_none(index);
      case 'adjacent': return this.showImage_adjacent(index);
      case 'lowDensity': return this.showImage_lowDensity(index);
      case 'project': console.warn("GlobalView warning: Can't place a single image using the 'project'-strategy"); return false;
      default: console.warn(`GlobalView warning: Unknown image placement strategy: ${placement}`); return false;
    }
  };

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
  this.showImages = function (points, placement) {
    switch (placement) {
      case 'none': return this.showImages_none(points);
      case 'adjacent': return this.showImages_adjacent(points);
      case 'lowDensity': return this.showImages_lowDensity(points);
      case 'project': return this.showImages_project(points);
      default: console.warn(`GlobalView warning: Unknown image placement strategy: ${placement}`); return false;
    }
  };


  /**
   * Images other than the given image will be de-highlighted.
   * @summary Highlight the given image with a highlight color
   * @deprecated Set image.labelColor manually
   * @param  {Thumbnail|number} image Image or index of image to show
   */
  this.highlightImage = function (image) {
    const images = imageViewer.getImages();
    if (libUtility.isNumber(image)) {
      for (let i = 0; i < images.length; i += 1) {
        images[i].highlighted = i === image;
      }
    } else {
      for (let i = 0; i < images.length; i += 1) {
        images[i].highlighted = images[i] === image;
      }
    }
    this.invalidate();
  };

  /**
   * @summary Get an array of all images of the plot
   * @return {Array<Thumbnail>}
   */
  this.getImages = imageViewer.getImages;


  // >>> Mouse handlers

  let mouseOverDatapoint = -1;
  let pointDragDownPos = null;
  let viewDragStartPos = null;
  let viewDragX;
  let viewDragY;
  let viewDragZ;
  let mouseOverAxisLabel = null;
  let mouseOverImage = null;
  let imageDragStartPos = null;
  let imageDragImages = [];

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
  this.onMouseDown = function (event) { // Default mouse-down handler
    switch (event.button) {
      // On left mouse button: Enable point selection and dragging events.
      //                       If control button is pressed, initiate view dragging, else, enable lasso selection
      case 0:
        event.pointSelection = true;
        event.pointDragging = true;
        if (ctrlPressed) {
          event.viewDragging = true;
        } else {
          event.lassoSelection = true;
        }
        break;

      // On middle mouse button: Initiate view dragging
      case 1:
        event.viewDragging = true;
        break;

      // On right mouse button: Do nothing
      case 2:
        break;
    }
  };
  /**
   * @callback onMouseOverDatapointCallback
   * @param  {Dataset} dataset
   * @param  {number} mouseOverDatapoint Index of the point the mouse cursor is hovering over
   */
  /**
   * There is no mouse-leave event for datapoints.
   * When the mouse cursor leaves a datapoint, this event is raised with `mouseOverDatapoint == -1`.
   * @summary Event handler that gets fired everytime the mouse cursor enters the boundaries of a datapoint
   * @member
   * @alias onMouseOverDatapoint
   * @memberof GlobalView
   * @type {onMouseOverDatapointCallback}
   */
  this.onMouseOverDatapoint = null;
  /**
   * @callback onMouseOverAxisLabelCallback
   * @param  {DataVector} dataVector Data vector whose axis label the mouse cursor is hovering over
   * @param  {{l: number, t: number, r: number, b: number}} labelRect Area of the label relative to the location of the plot
   */
  /**
   * There is no mouse-leave event for axis labels.
   * When the mouse cursor leaves an axis label, this event is raised with `dataVector == labelRect == null`.
   * @summary Event handler that gets fired everytime the mouse cursor enters the boundaries of an axis label
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
   * Rectangle or list of 2D points of the area selected by the lasso relative to the location of the plot
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
  let ctrlPressed = false;
  let shiftPressed = false;
  const CTRL = navigator.appVersion.indexOf('Mac') === -1 ? 17 : 224;
  libUtility.addKeyDownHandler(function (event) {
    if (event.keyCode === CTRL) {
      ctrlPressed = true;
    } else if (event.keyCode === 16) {
      shiftPressed = true;
    }
  });
  libUtility.addKeyUpHandler(function (event) {
    if (event.which === CTRL) {
      ctrlPressed = false;
    } else if (event.keyCode === 16) {
      shiftPressed = false;
    }
  });
  canvas.oncontextmenu = function () {
    return false;
  }; // Disable canvas context menu
  canvas.onmousedown = function (event) {
    if (tf === null || offscreenRendering !== null) {
      return;
    }

    // Compute mousepos in canvas space -> p
    const canvasBounds = canvas.getBoundingClientRect();
    const p = new Float32Array([event.clientX - canvasBounds.left, event.clientY - canvasBounds.top, event.clientY - canvasBounds.top]);

    // Fire mouse-down handler
    this.onMouseDown(event);

    if (event.viewDragging) {
      // If mouse-down handler set viewDragging property to a truthy value
      if (p[0] > plotBounds.x + plotBounds.width) {
        viewDragX = viewDragY = false;
        viewDragZ = colormap.visible;
      } else {
        viewDragX = p[0] >= plotBounds.x;
        viewDragY = p[1] <= plotBounds.y + plotBounds.height;
        viewDragZ = false;
      }

      // Transform mousepos from canvas space to device coordinates
      p[0] = ((2 * p[0]) / canvasBounds.width) - 1;
      p[1] = 1 - ((2 * p[1]) / canvasBounds.height);
      p[2] = 1 - ((p[2] - plotBounds.y) / plotBounds.height);

      if (viewDragX || viewDragY || viewDragZ) {
        viewDragStartPos = p;
      } // Initiate view dragging
      return; // Prevent other mouse-down events
    } else {
      // Transform mousepos from canvas space to device coordinates
      p[0] = ((2 * p[0]) / canvasBounds.width) - 1;
      p[1] = 1 - ((2 * p[1]) / canvasBounds.height);
    }

    const selectedImage = imageViewer.imageFromPoint(tf, p);
    if (!shiftPressed && !ctrlPressed && imageDragImages.length !== 0 && (selectedImage === null || imageDragImages.indexOf(selectedImage) === -1)) {
      // Deselect images
      imageDragImages.forEach(image => image.highlighted = false);
      imageDragImages = [];
      this.invalidate();
      if (this.onThumbnailSelectionChanged !== null) {
        this.onThumbnailSelectionChanged(dataset, []);
      }
    }
    if (selectedImage !== null) {
      selectedImage.highlighted = true;
      if (imageDragImages.indexOf(selectedImage) === -1) {
        imageDragImages.push(selectedImage);
      }
      if (options.enableThumbnailDragging) {
        imageDragStartPos = p;
      } // Initiate image dragging
      this.invalidate();
      if (event.pointSelection && this.onSelectionChanged !== null) {
        this.onSelectionChanged(dataset, []);
      }
      if (this.onThumbnailSelectionChanged !== null) {
        this.onThumbnailSelectionChanged(dataset, imageDragImages);
      }
      return; // Prevent other mouse-down events
    }

    // Transform p from device coordinates to dataset coordinates
    tf.deviceCoordToDatasetCoord(p, p);

    let closest = Number.MAX_VALUE;
    let closestIndex = -1;
    let sqDist;
    const sqscl0 = tf.getScale(0) * tf.getScale(0);
    const sqscl1 = tf.getScale(1) * tf.getScale(1);
    const v0 = dataset.dataVectors[activeInputs[0]];
    const v1 = dataset.dataVectors[activeInputs[1]];
    pointViewer.points.forEach(function (i) {
      sqDist = (sqscl0 * Math.pow(p[0] - v0.getValue(i), 2)) +
        (sqscl1 * Math.pow(p[1] - v1.getValue(i), 2));
      if (sqDist < closest) {
        closest = sqDist;
        closestIndex = i;
      }
    });

    // Get closest dataset coordinates in dataset coordinates -> dp
    const dp = new Float32Array([v0.getValue(closestIndex), v1.getValue(closestIndex)]);

    // Transform dp from dataset coordinates to canvas coordinates
    tf.datasetCoordToDeviceCoord(dp, dp);
    dp[0] = (0.5 + (0.5 * dp[0])) * canvasBounds.width;
    dp[1] = (0.5 - (0.5 * dp[1])) * canvasBounds.height;

    sqDist = Math.pow((event.clientX - canvasBounds.left) - dp[0], 2) + Math.pow((event.clientY - canvasBounds.top) - dp[1], 2);
    if (sqDist > Math.pow(options.pointSize / 2.0, 2)) {
      if ((event.lassoSelection || event.polygonLassoSelection) && this.onLassoSelection !== null) {
        if (event.polygonLassoSelection) {
          mousePolygon = [];
        } else {
          mouseRect = {
            x: event.clientX - canvasBounds.left, y: event.clientY - canvasBounds.top, width: 0, height: 0,
          };
        }
      }
      if (event.pointSelection && this.onSelectionChanged !== null) {
        this.onSelectionChanged(dataset, []);
      }
    } else {
      if (event.pointDragging) {
        pointDragDownPos = [dp[0], dp[1], closestIndex];
      } // (This makes sure pointDragDownPos is centered on the selected datapoint)
      if (event.pointSelection && this.onSelectionChanged !== null) {
        this.onSelectionChanged(dataset, [closestIndex]);
      }
    }
  }.bind(this);
  let onmousemove;
  libUtility.addMouseMoveHandler(onmousemove = function (event) {
    if (tf === null || offscreenRendering !== null ||
      (event.target !== canvas && pointDragDownPos === null && viewDragStartPos === null && imageDragStartPos === null && mouseRect === null && mousePolygon === null)) {
      return;
    }

    // Compute mousepos in canvas space -> p
    const canvasBounds = canvas.getBoundingClientRect();
    const p = new Float32Array([event.clientX - canvasBounds.left, event.clientY - canvasBounds.top, event.clientY - canvasBounds.top]);

    // Resize mouse polygon
    if (mousePolygon !== null) {
      mousePolygon.push(p);
      this.invalidate();
      return;
    }

    // Resize mouse rect
    if (mouseRect !== null) {
      mouseRect.width = p[0] - mouseRect.x;
      mouseRect.height = p[1] - mouseRect.y;
      this.invalidate();
      return;
    }

    if (pointDragDownPos) {
      const scale = (1 / (dataset.dataVectors[activeInputs[3]].getValue(pointDragDownPos[2]) * tf.getScale(3))) + tf.getOffset(3);
      // console.log(scale);

      pointDrag = [scale * (p[0] - pointDragDownPos[0]), scale * (p[1] - pointDragDownPos[1])];
      this.invalidate();
      return;
    }

    if (this.onMouseOverAxisLabel) {
      const newMouseOverAxisLabel = coordSys.labelFromPoint(plotBounds, p);
      if (newMouseOverAxisLabel !== mouseOverAxisLabel) {
        if ((mouseOverAxisLabel = newMouseOverAxisLabel) !== null) {
          this.onMouseOverAxisLabel(dataset.dataVectors[activeInputs[mouseOverAxisLabel]], coordSys.getLabelBounds(plotBounds, mouseOverAxisLabel));
        } else {
          this.onMouseOverAxisLabel(null, null);
        }
      }
    }

    // Transform mousepos from canvas space to device coordinates
    p[0] = ((2 * p[0]) / canvasBounds.width) - 1;
    p[1] = 1 - ((2 * p[1]) / canvasBounds.height);
    p[2] = 1 - ((p[2] - plotBounds.y) / plotBounds.height);

    const d0 = activeInputs[0];
    const d1 = activeInputs[1];

    if (viewDragStartPos) {
      const d2 = activeInputs[2];
      const viewDelta = libGlMatrix.vec3.create();
      tf.deviceDistToDatasetDist(viewDelta, libGlMatrix.vec3.subtract(viewDelta, p, viewDragStartPos));

      if (viewDragX) {
        tf.translate(d0, viewDelta[0]);
      }
      if (viewDragY) {
        tf.translate(d1, viewDelta[1]);
      }
      if (viewDragZ) {
        tf.translate(d2, viewDelta[2]);
      }
      viewDragStartPos = p;
      return;
    }

    if (imageDragStartPos) {
      const imageDelta = libGlMatrix.vec2.create();
      tf.deviceDistToDatasetDist(imageDelta, libGlMatrix.vec2.subtract(imageDelta, p, imageDragStartPos));
      imageDragImages.forEach(function (image) {
        image.imagePos[activeInputs[0]] += imageDelta[0];
        image.imagePos[activeInputs[1]] += imageDelta[1];
      });
      imageDragStartPos = p;
      this.invalidate();
      return;
    }

    if (mouseOverImage !== null && imageDragImages.indexOf(mouseOverImage) === -1) {
      mouseOverImage.highlighted = false;
      this.invalidate();
      mouseOverImage = null;
    }
    mouseOverImage = imageViewer.imageFromPoint(tf, p);
    if (mouseOverImage !== null) {
      if (imageDragImages.indexOf(mouseOverImage) === -1) {
        mouseOverImage.highlighted = true;
        this.invalidate();
      }
      if (mouseOverDatapoint !== -1) {
        mouseOverDatapoint = -1;
        if (this.onMouseOverDatapoint !== null) {
          this.onMouseOverDatapoint(dataset, mouseOverDatapoint);
        }
      }
      return;
    }

    // Transform p from device coordinates to dataset coordinates
    tf.deviceCoordToDatasetCoord(p, p);

    let closest = Number.MAX_VALUE;
    let closestIndex = -1;
    let sqDist;
    const sqscl0 = tf.getScale(0) * tf.getScale(0);
    const sqscl1 = tf.getScale(1) * tf.getScale(1);
    const v0 = dataset.dataVectors[d0];
    const v1 = dataset.dataVectors[d1];
    pointViewer.points.forEach(function (i) {
      sqDist = (sqscl0 * Math.pow(p[0] - v0.getValue(i), 2)) +
        (sqscl1 * Math.pow(p[1] - v1.getValue(i), 2));
      if (sqDist < closest) {
        closest = sqDist;
        closestIndex = i;
      }
    });

    // Get closest dataset coordinates in dataset coordinates -> dp
    const dp = new Float32Array([v0.getValue(closestIndex), v1.getValue(closestIndex)]);

    // Transform dp from dataset coordinates to canvas coordinates
    tf.datasetCoordToDeviceCoord(dp, dp);
    dp[0] = (0.5 + (0.5 * dp[0])) * canvasBounds.width;
    dp[1] = (0.5 - (0.5 * dp[1])) * canvasBounds.height;

    sqDist = Math.pow((event.clientX - canvasBounds.left) - dp[0], 2) + Math.pow((event.clientY - canvasBounds.top) - dp[1], 2);
    if (sqDist > Math.pow(options.pointSize / 2.0, 2)) {
      if (mouseOverDatapoint !== -1) {
        mouseOverDatapoint = -1;
        if (this.onMouseOverDatapoint !== null) {
          this.onMouseOverDatapoint(dataset, mouseOverDatapoint);
        }
      }
    } else if (mouseOverDatapoint !== closestIndex) {
      mouseOverDatapoint = closestIndex;
      if (this.onMouseOverDatapoint !== null) {
        this.onMouseOverDatapoint(dataset, mouseOverDatapoint);
      }
    }
  }.bind(this));
  libUtility.addMouseUpHandler(function (event) {
    if (tf === null || offscreenRendering !== null || (event.target !== canvas && pointDragDownPos === null && viewDragStartPos === null && mouseRect === null)) {
      return;
    }

    let invalidate = false;
    if (pointDragDownPos !== null) {
      pointDragDownPos = pointDrag = null;
      invalidate = true;
    }
    viewDragStartPos = imageDragStartPos = null;
    if (mousePolygon !== null) {
      if (this.onSelectionChanged !== null && mousePolygon.length >= 3) {
        // TODO: Find points within mousePolygon -> selection

        // Transform mousePolygon from canvas space to dataset coordinates
        for (let i = 0; i < mousePolygon.length; i += 1) {
          const p = mousePolygon[i];

          // Transform p from canvas space to device coordinates
          p[0] = ((2 * p[0]) / canvas.width) - 1;
          p[1] = 1 - ((2 * p[1]) / canvas.height);

          // Transform p from device coordinates to dataset coordinates
          tf.deviceCoordToDatasetCoord(p, p);

          mousePolygon[i] = p;
        }

        // Close polygon
        mousePolygon.push(mousePolygon[0]);

        const selection = [];
        const v0 = dataset.dataVectors[activeInputs[0]];
        const v1 = dataset.dataVectors[activeInputs[1]];
        pointViewer.points.forEach(function (i) {
          const px = v0.getValue(i);
          const py = v1.getValue(i);
          if (libAlgorithm.pointInsidePolygon([px, py], mousePolygon)) {
            selection.push(i);
          }
        });
        this.onLassoSelection(dataset, selection, mousePolygon);
      }

      mousePolygon = null;
      invalidate = true;
    }
    if (mouseRect !== null) {
      if (this.onSelectionChanged !== null && mouseRect.width !== 0 && mouseRect.height !== 0) {
        // Normalize mouseRect (make sure width/height are positive)
        if (mouseRect.width < 0) {
          mouseRect.x += mouseRect.width;
          mouseRect.width = -mouseRect.width;
        }
        if (mouseRect.height < 0) {
          mouseRect.y += mouseRect.height;
          mouseRect.height = -mouseRect.height;
        }

        // Transform mouseRect from canvas space to device coordinates
        mouseRect.l = ((2 * mouseRect.x) / canvas.width) - 1;
        mouseRect.r = ((2 * (mouseRect.x + mouseRect.width)) / canvas.width) - 1;
        mouseRect.t = 1 - ((2 * (mouseRect.y + mouseRect.height)) / canvas.height);
        mouseRect.b = 1 - ((2 * mouseRect.y) / canvas.height);

        // Transform mouseRect from device coordinates to dataset coordinates
        let p = new Float32Array([mouseRect.l, mouseRect.t]);
        tf.deviceCoordToDatasetCoord(p, p);
        mouseRect.l = p[0]; mouseRect.t = p[1];
        p = new Float32Array([mouseRect.r, mouseRect.b]);
        tf.deviceCoordToDatasetCoord(p, p);
        mouseRect.r = p[0]; mouseRect.b = p[1];

        let px;
        let py;
        const selection = [];
        const v0 = dataset.dataVectors[activeInputs[0]];
        const v1 = dataset.dataVectors[activeInputs[1]];
        pointViewer.points.forEach(function (i) {
          px = v0.getValue(i);
          py = v1.getValue(i);
          if (px >= mouseRect.l && px < mouseRect.r && py >= mouseRect.t && py < mouseRect.b) {
            selection.push(i);
          }
        });
        this.onLassoSelection(dataset, selection, mouseRect);
      }

      mouseRect = null;
      invalidate = true;
    }
    if (invalidate) {
      this.invalidate();
      onmousemove(event);
    }
  }.bind(this));
  canvas.onmouseleave = function (event) {
    if (mouseOverImage != null && imageDragImages.indexOf(mouseOverImage) === -1) {
      mouseOverImage.highlighted = false;
      this.invalidate();
      mouseOverImage = null;
    }
    if (this.onMouseOverAxisLabel && mouseOverAxisLabel !== null) {
      this.onMouseOverAxisLabel(null, null);
      mouseOverAxisLabel = null;
    }

    if (this.onMouseOverDatapoint !== null && mouseOverDatapoint !== -1) {
      this.onMouseOverDatapoint(dataset, mouseOverDatapoint = -1);
    }
  }.bind(this);
  libUtility.addMouseWheelHandler(function (event) {
    if (event.target !== canvas || !options.enableScrolling) {
      return;
    }
    const deltaZ = event.wheelDelta == null ? event.detail : -event.wheelDelta / 20.0;
    event.preventDefault();

    // Compute mousepos in canvas space -> p
    const canvasBounds = canvas.getBoundingClientRect();
    const p = new Float32Array([event.clientX - canvasBounds.left, event.clientY - canvasBounds.top, event.clientY - canvasBounds.top]);

    let scrollX;
    let scrollY;
    let scrollZ;
    if (p[0] > plotBounds.x + plotBounds.width) {
      scrollX = scrollY = false;
      scrollZ = true;
    } else {
      scrollX = p[0] >= plotBounds.x;
      scrollY = p[1] < canvas.height - plotBounds.y;
      scrollZ = false;
    }

    // Transform mousepos from canvas space to device coordinates
    p[0] = ((2 * p[0]) / canvasBounds.width) - 1;
    p[1] = 1 - ((2 * p[1]) / canvasBounds.height);
    p[2] = 1 - ((p[2] - plotBounds.y) / plotBounds.height);

    const d0 = activeInputs[0];
    const d1 = activeInputs[1];
    const d2 = activeInputs[2];

    // Transform p from device coordinates to dataset coordinates
    tf.deviceCoordToDatasetCoord(p, p);

    // Zoom towards mouse position
    const zoom = 1.0 - (deltaZ / 50.0);
    libGlMatrix.vec3.scaleAndAdd(p, p, p, -zoom); // Offset is difference between p in current zoom level and p after zooming
    if (scrollX) {
      tf.translate(d0, p[0]);
      tf.scale(d0, zoom);
    }
    if (scrollY) {
      tf.translate(d1, p[1]);
      tf.scale(d1, zoom);
    }
    if (scrollZ) {
      tf.translate(d2, p[2]);
      tf.scale(d2, zoom);
    }
  });

  this.ondragover = null;
  canvas.ondragover = function (event) {
    if (this.ondragover !== null) {
      this.ondragover(event);
    }
  }.bind(this);
  this.ondrop = null;
  canvas.ondrop = function (event) {
    if (this.ondrop !== null) {
      this.ondrop(event);
    }
  }.bind(this);

  // >>> Offscreen Rendering

  this.enableOffscreenRendering = this.enableOffscreenRendering = function (width, height) {
    if (offscreenRendering !== null) {
      return;
    }
    offscreenRendering = {};

    gl.width = canvas.width = width;
    gl.height = canvas.height = height;

    trc.enableOffscreenRendering(width, height);

    // Disable continuous rendering
    offscreenRendering.enableContinuousRendering = options.enableContinuousRendering;
    if (offscreenRendering.enableContinuousRendering) {
      this.setOption('enableContinuousRendering', false);
    }

    // Create render target texture
    offscreenRendering.rttTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, offscreenRendering.rttTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // Create render target framebuffer -> offscreenRendering.rttFramebuffer
    offscreenRendering.rttFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, offscreenRendering.rttFramebuffer);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    /* // Create depth buffer -> offscreenRendering.rttRenderbuffer
    offscreenRendering.rttRenderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, offscreenRendering.rttRenderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height); */

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, offscreenRendering.rttTexture, 0); // Bind framebuffer
    // gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, offscreenRendering.rttRenderbuffer); // Bind depth buffer

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    // Set viewport
    gl.viewportWidth = width;
    gl.viewportHeight = height;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    if (options.padding) {
      setPlotBounds(options.padding);
    }
  };
  this.disableOffscreenRendering = this.disableOffscreenRendering = function () {
    if (offscreenRendering === null) {
      return;
    }

    trc.disableOffscreenRendering();

    // Remove framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(offscreenRendering.rttFramebuffer);

    // Restore viewport
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // if (options.padding)
    //  setPlotBounds(options.padding);

    // Reenable continuous rendering
    if (offscreenRendering.enableContinuousRendering) {
      this.setOption('enableContinuousRendering', true);
    }

    offscreenRendering = null;

    onresize();
  };

  this.renderOffscreenBuffer = function () {
    // Render scene
    render(true);
    gl.finish();
  };

  this.saveOffscreenBuffer = function () {
    // Read pixels
    const data = new Uint8Array(gl.viewportWidth * gl.viewportHeight * 4);
    gl.readPixels(0, 0, gl.viewportWidth, gl.viewportHeight, gl.RGBA, gl.UNSIGNED_BYTE, data);

    // Create a temporary 2D canvas to store the result -> tempCanvas
    let tempCanvas = document.createElement('canvas');
    tempCanvas.setAttribute('id', 'tempCanvas');
    tempCanvas.width = gl.viewportWidth;
    tempCanvas.height = gl.viewportHeight;
    const tempContext = tempCanvas.getContext('2d');

    // Copy the pixels to the 2D canvas
    const imageData = tempContext.createImageData(tempCanvas.width, tempCanvas.height);
    imageData.data.set(data);
    tempContext.putImageData(imageData, 0, 0);
    tempContext.drawImage(trc.getCanvas(), 0, 0);
    const dataURL = tempCanvas.toDataURL();

    // Free tempCanvas
    tempCanvas = null;

    return dataURL;
  };

  // >>> Initialize global view

  gl.disable(gl.CULL_FACE);
  gl.enable(gl.BLEND);
  gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
  gl.clearColor(...gl.backColor);

  // Hook to window-resize event and fire once for initial setup
  window.addEventListener('resize', onresize, false);
  onresize();

  // Set unset options to default values
  this.setDefaultOptions();
  this.setOptions(startupOptions);
}

/**
 * A singleton class that renders one aspect of the plot.
 * @interface
 * @package
 */
const Viewer = function () {};
/** @type  {Function} */ Viewer.prototype.render;
/** @type  {function(Dataset, Object)} */ Viewer.prototype.setDataset;
/** @type  {function(Object, boolean)} */ Viewer.prototype.onOptionsChanged;
/** @type  {function(Array<number>, Array<number>, Object)} */ Viewer.prototype.onInputChanged;
/** @type  {function(Object)} */ Viewer.prototype.onPlotBoundsChanged;
