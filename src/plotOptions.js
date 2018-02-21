import { validateGLSL } from './graphics';
import { isNumber, isString, isArray } from './utility';
import Colormap from './colormap';
import { ClusterMapOptions } from './algorithm';

let currentPlot = null;

// >>> OPTIONS

/**
 * A map of valid options with option descriptions,
 * validation functions and flags about side effects
 * @const
 * @enum {{
 * default: *,
 * valid: (function(*)|Array),
 * requireRedraw: boolean,
 * requireRecompile: boolean
 * }}
 */
const OPTIONS = {
  // General plot options

  /**
   * The space around the drawing area. X-axis, y-axis and colormap are drawn within padding space.
   * Values can be specified as array of length 4 for [top, right, bottom, left],
   * or as a single value specifying all four corners.
   * Values can be absolute (e.g. 120 or "120" ) or
   * percentages (e.g. "20%"" or ["10%", "20%", "10%", "20%""]
   * (default: [50, 60, 50, 50])
   * @type {number[]|string[]|number|string}
   */
  padding: {
    description: 'The space around the drawing area in the form [top, right, bottom, left].' +
      ' X-axis, y-axis and colormap are drawn within padding space.',
    default: [50, 60, 50, 50],
    valid: value =>
      isNumber(value) || isString(value) ||
      (isArray(value) && value.length === 4),
    requireRedraw: true,
    requireRecompile: false,
  },

  /** When enabled, shows a colormap to the right of the plot.
   * @type {boolean} */
  showColormap: {
    description: 'When enabled, shows a colormap to the right of the plot.',
    default: true,
    valid: [true, false],
    requireRedraw: true,
    requireRecompile: false,
  },

  /** When enabled, scrolling above the plot zooms in or out of the data. (default: true)
   * @type {boolean}
   */
  enableScrolling: {
    description: 'When enabled, scrolling above the plot zooms in or out of the data.',
    default: true,
    valid: [true, false],
    requireRedraw: false,
    requireRecompile: false,
  },

  /** When enabled, thumbnails can be dragged with the mouse. (default: true)
   * @type {boolean}
   */
  enableThumbnailDragging: {
    description: 'When enabled, thumbnails can be dragged with the mouse.',
    default: true,
    valid: [true, false],
    requireRedraw: false,
    requireRecompile: false,
  },

  // Advanced plot options
  /**
   * When enabled, the canvas is continuously rerendered at up to 60 frames per second.
   * Keep this setting disabled to save processing resources. (default: false)
   * @type {boolean}
   */
  enableContinuousRendering: {
    description: 'When enabled, the canvas is continuously rerendered at up to 60 frames ' +
      'per second. Keep this setting disabled to save processing resources.',
    default: false,
    valid: [true, false],
    requireRedraw: true,
    requireRecompile: false,
  },

  /**
   * Enables/disables blending in WebGL. Whenever using any kind of transparency,
   * this setting should be kept enabled. (default: true)
   * @type {boolean}
   */
  enableTransparency: {
    description: 'Enables/disables blending in WebGL. Whenever using any kind of transparency' +
      ', this setting should be kept enabled.',
    default: true,
    valid: [true, false],
    requireRedraw: true,
    requireRecompile: false,
  },

  /** When enabled, draws an image into the background, that shows density of points.
   * (can be combined with 'showPointClusters') (default: false)
   * @type {boolean}
   */
  showPointDensity: {
    description: 'When enabled, draws an image into the background,' +
      ' that shows density of points. (can be combined with \'showPointClusters\')',
    default: false,
    valid: [true, false],
    requireRedraw: true,
    requireRecompile: false,
  },

  /** When enabled, draws an image into the background, that shows colored clusters of points.
   * (can be combined with 'showPointDensity')  (default: false)
   * @type {boolean}
   */
  showPointClusters: {
    description: 'When enabled, draws an image into the background, ' +
    'that shows colored clusters of points. (can be combined with \'showPointDensity\')',
    default: false,
    valid: [true, false],
    requireRedraw: true,
    requireRecompile: false,
  },

  /**
   * Specifies the density threshold ratio.
   * Densities below threshold * maximum-density are considered outliers. (default: 0.1).
   * See {@link ClusterMapOptions}
   * @type {number}
   */
  pointClusterThreshold: {
    description: 'Controls the realtive threshold between clusters and outliers when' +
    ' showing clusters (see \'showPointClusters\')',
    default: (new ClusterMapOptions()).threshold,
    valid: value => value > 0,
    requireRedraw: false, // Requests redraw internally
    requireRecompile: false,
  },

  // Histogram options
  /** When enabled, shows a histogram between the x-axis and the plot. (default: false)
   * @type {boolean}
   */
  showXAxisHistogram: {
    description: 'When enabled, shows a histogram between the x-axis and the plot.',
    default: false,
    valid: [true, false],
    requireRedraw: true,
    requireRecompile: false,
  },

  /** When enabled, shows a histogram between the y-axis and the plot. (default: false)
   * @type {boolean}
   */
  showYAxisHistogram: {
    description: 'When enabled, shows a histogram between the y-axis and the plot.',
    default: false,
    valid: [true, false],
    requireRedraw: true,
    requireRecompile: false,
  },

  /** When enabled, shows a histogram between the colormap and the plot. (default: false)
   * @type {boolean}
   */
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

  /** Controls the height of each histogram in the scatterplot (in pixels). (default: 64)
   * @type {number}
   */
  histogramHeight: {
    description: 'Controls the height of each histogram in the scatterplot (in pixels).',
    default: 64,
    valid: value => value >= 0,
    requireRedraw: true,
    requireRecompile: false,
  },

  // Point options

  /** Controls the shape of data points in the scatterplot.
   * Acceptable values are 'Rectangle', 'Circle', 'Cross', 'Diamond', 'Gaussian', 'Custom'.
   * (default: 'Circle')
   * @type {string}
  */
  pointShape: {
    description: 'Controls the shape of data points in the scatterplot.',
    default: 'Circle',
    valid: ['Rectangle', 'Circle', 'Cross', 'Diamond', 'Gaussian', 'Custom'],
    requireRedraw: true,
    requireRecompile: true,
  },

  /** When 'pointShape' is set to 'Custom', this defines a GLSL function given vec2 p,
   * that returns opacity in the range [0.0 ... 1.0] at location p. (default: '{ return 1.0; }')
   * @type {string}
   */
  customPointShape: {
    description: 'When \'pointShape\' is set to \'Custom\', this defines a GLSL function ' +
      'given vec2 p, that returns opacity in the range [0.0 ... 1.0] at location p.',
    default: '{ return 1.0; }',
    valid: value => validateGLSL(currentPlot.gl, `float opacityMap(in vec2 p) ${value}`),
    requireRedraw: true,
    requireRecompile: true,
  },

  /** Controls the diameter of data points in the scatterplot (in pixels). (default: 6)
   * @type {number}
   */
  pointSize: {
    description: 'Controls the diameter of data points in the scatterplot (in pixels).',
    default: 6,
    valid: value => value >= 0,
    requireRedraw: true,
    requireRecompile: false,
  },

  /** Controls the visibility of data points in the scatterplot between
   *  0 (invisible) and 1 (fully opaque). (default: 1.0)
   * @type {number}
   */
  pointOpacity: {
    description: 'Controls the visibility of data points in the scatterplot between ' +
      '0 (invisible) and 1 (fully opaque).',
    default: 1,
    valid: value => value >= 0 && value <= 1,
    requireRedraw: true,
    requireRecompile: false,
  },

  /** Controls the color of data points in the scatterplot.
   * Valid values are an array of bytes ( 0 .. 255) in RGBA order, a color name (e.g. "red"),
   * or a colormap name ("exhue" or "rainbow"). (default: "exhue")
   * @type {(number[] | string)}
   */
  pointColor: {
    description: 'Controls the color of data points in the scatterplot. ' +
    'Valid values are an array of bytes in RGBA order or a colormap name.',
    default: 'exhue',
    valid: value => Colormap.validateColormap(value),
    requireRedraw: true,
    requireRecompile: false,
  },

  // Thumbnail options

  /** Controls the width/height of thumbnails in the scatterplot (in pixels). (default: 64)
   * @type {number}
   */
  thumbnailSize: {
    description: 'Controls the width/height of thumbnails in the scatterplot (in pixels).',
    default: 64,
    valid: value => value > 0,
    requireRedraw: true,
    requireRecompile: false,
  },

  /** Controls the width of thumbnail borders in the scatterplot. (default: 1)
   * @type {number}
   */
  thumbnailBorderWidth: {
    description: 'Controls the width of thumbnail borders in the scatterplot.',
    default: 1,
    valid: value => value >= 0,
    requireRedraw: true,
    requireRecompile: false,
  },

  /** Controls the color of thumbnail borders in the scatterplot.
   * Valid values are an array of bytes in RGBA order, a color name or 'null'.
   * If set to 'null', the CSS foreground color will be used. (default: null)
   * @type {(number[] | string)}
   */
  thumbnailBorderColor: {
    description: 'Controls the color of thumbnail borders in the scatterplot. ' +
      'Valid values are an array of bytes in RGBA order, a color name or \'null\'. ' +
      'If set to \'null\', the CSS foreground color will be used.',
    default: null,
    valid: value => value === null || Colormap.validateColor(value),
    requireRedraw: true,
    requireRecompile: false,
  },
  /** Controls the color of thumbnail line in the scatterplot.
   * Valid values are an array of bytes in RGBA order, a color name or 'null'.
   * If set to 'null', the CSS foreground color will be used. (default: null)
   * @type {(number[] | string)}
   */
  thumbnailLineColor: {
    description: 'Controls the color of thumbnail line in the scatterplot. ' +
      'Valid values are an array of bytes in RGBA order, a color name or\'null\'. ' +
      'If set to \'null\', the CSS foreground color will be used.',
    default: null,
    valid: value => value === null || Colormap.validateColor(value),
    requireRedraw: true,
    requireRecompile: false,
  },

  /** Controls the color of thumbnail labels in the scatterplot.
   * Valid values are an array of bytes in RGBA order, a color name or 'null'.
   * If set to 'null', the CSS background color will be used. (default: null)
   * @type {(number[] | string)}
   */
  thumbnailLabelColor: {
    description: 'Controls the color of thumbnail labels in the scatterplot. ' +
      'Valid values are an array of bytes in RGBA order, a color name or \'null\'. ' +
      'If set to \'null\', the CSS foreground color will be used.',
    default: null,
    valid: value => value === null || Colormap.validateColor(value),
    requireRedraw: true,
    requireRecompile: false,
  },

  /** When enabled, links thumbnails to points using unique labels instead of lines.
   * (default: false)
   * @type {boolean}
   */
  labelThumbnails: {
    description: 'When enabled, links thumbnails to points using unique labels instead of lines.',
    default: false,
    valid: [true, false],
    requireRedraw: true,
    requireRecompile: false,
  },
};

// sets the currently active plot (when multiple GlobalView plots are created.)
// used internally by GlobalView.
function setCurrentPlot(plot) {
  currentPlot = plot;
}

export { OPTIONS, setCurrentPlot };
