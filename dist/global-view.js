(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["globalView"] = factory();
	else
		root["globalView"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stats__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mean", function() { return __WEBPACK_IMPORTED_MODULE_0__stats__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return __WEBPACK_IMPORTED_MODULE_0__stats__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globalView__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "initCanvas", function() { return __WEBPACK_IMPORTED_MODULE_1__globalView__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalView", function() { return __WEBPACK_IMPORTED_MODULE_1__globalView__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dataset__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DataVector", function() { return __WEBPACK_IMPORTED_MODULE_2__dataset__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Dataset", function() { return __WEBPACK_IMPORTED_MODULE_2__dataset__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RandomDataset", function() { return __WEBPACK_IMPORTED_MODULE_2__dataset__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CsvDataset", function() { return __WEBPACK_IMPORTED_MODULE_2__dataset__["a"]; });






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mean;
/* harmony export (immutable) */ __webpack_exports__["b"] = range;
function mean() {
  for (var _len = arguments.length, numbers = Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }

  return numbers.reduce(function (accum, next) {
    return accum + next;
  }) / numbers.length;
}

function range() {
  var largest = Math.max.apply(Math, arguments);
  var smallest = Math.min.apply(Math, arguments);
  return largest - smallest;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = initCanvas;
/* harmony export (immutable) */ __webpack_exports__["a"] = GlobalView;
/* eslint-disable */

var webglUtils = __webpack_require__(3);
var libUtility = __webpack_require__(4);
var libTextRenderContext = __webpack_require__(5);

function myAlert(msg) {
	alert(msg); // eslint-disable-line no-alert, no-undef
}

function initCanvas(canvasElement) {
	// var canvas = document.getElementById("canvas");
	var gl = canvasElement.getContext('webgl') || canvasElement.getContext('experimental-webgl');

	// Only continue if WebGL is available and working
	if (!gl) {
		myAlert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}

	gl.clearColor(1, 0, 0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // eslint-disable-line no-bitwise
}

// >>> Options

var ENABLE_CONTINUOUS_RENDERING = false;
var SHOW_FPS = false;
var SIMULATE_LOW_FPS = false;

//var IMAGE_SIZE = 64 // Image width/height are smaller or equal to IMAGE_SIZE, maintaining aspect ratio

var ND = 4; // Number of dimensions

/** @typedef {{
 * description: string,
 * default: *,
 * valid: (function(*)|Array),
 * requireRedraw: boolean,
 * requireRecompile: boolean
 * }} */
var OptionDescription;

/**
 * @summary A fast scatterplot rendered with WebGL
 * @constructor
 * @export
 */
function GlobalView(div, startupOptions) {
	var globalView = this;

	var canvas = null;
	for (var i = 0; i < div.children.length; ++i) {
		if (div.children[i] instanceof HTMLCanvasElement && div.children[i].globalViewWebGLCanvas) // If div already contains a GlobalView-WebGL-canvas, ...
			{
				// Share canvas
				canvas = /** @type {HTMLCanvasElement} */div.children[i];
				break;
			}
	}if (canvas === null) {
		canvas = /** @type {HTMLCanvasElement} */document.createElement('canvas');
		canvas.style.position = "static"; //"absolute";
		canvas.style.left = canvas.style.top = "0px";
		canvas.style.width = canvas.style.height = "100%";
		canvas.style.backgroundColor = "transparent";
		canvas.globalViewWebGLCanvas = true;
		div.appendChild(canvas);
	}

	this['invalidate'] = this.invalidate = function () {}; // Silently ignore calls to invalidate during initialization

	var gl = canvas.getContext("webgl");
	if (!gl) {
		alert("Error: WebGL not supported");
		return;
	}
	var OES_element_index_uint = gl.getExtension("OES_element_index_uint");
	if (!OES_element_index_uint) console.warn("GlobalView warning: Unsupported WebGL extension: OES_element_index_uint");
	gl.ext = gl.getExtension('ANGLE_instanced_arrays');
	if (!gl.ext) console.warn("GlobalView warning: Unsupported WebGL extension: ANGLE_instanced_arrays");

	var divStyle = window.getComputedStyle(div);
	gl.backColor = divStyle.backgroundColor == 'transparent' ? [0, 0, 0, 0] : libUtility.rgbStringToFloatArray(divStyle.backgroundColor);
	gl.foreColor = libUtility.rgbStringToFloatArray(gl.foreColorString = divStyle.color);
	this['updateColorSchema'] =
	/**
  * Call this method after updating the parent div's color or background-color styles in order for the changes to be applied to the rendering pipeline.
  * @summary Apply div foreground- and background colors to the plot
  */
	this.updateColorSchema = function () {
		var divStyle = window.getComputedStyle(div);
		gl.backColor = divStyle.backgroundColor == 'transparent' ? [0, 0, 0, 0] : libUtility.rgbStringToFloatArray(divStyle.backgroundColor);
		gl.foreColor = libUtility.rgbStringToFloatArray(gl.foreColorString = divStyle.color);
		gl.clearColor.apply(gl, gl.backColor);
		//histogramViewer.updateColorSchema();
		coordSys.updateColorSchema();
		colormap.updateColorSchema();
		this.invalidate();
	};

	var trc = new libTextRenderContext.TextRenderContext(gl, canvas);
	//trc.setFont("10px monospace");
	trc.setFont(divStyle.fontSize + ' ' + divStyle.fontFamily);
	this['updateFont'] =
	/**
  * Call this method after updating the parent div's font style in order for the changes to be applied to the rendering pipeline.
  * @summary Apply div font to the plot
  */
	this.updateFont = function () {
		var divStyle = window.getComputedStyle(div);
		trc.setFont(divStyle.fontSize + ' ' + divStyle.fontFamily);
		this.invalidate();
	};

	var t = performance.now(),
	    dt = 0.1,
	    fps = null,
	    fpsStart = t,
	    frameCounter = 0;

	var pointViewer = new PointViewer(gl, this);
	var imageViewer = new ImageViewer(gl, this);
	var densityViewer = new DensityViewer(gl, this);
	var histogramViewer = new HistogramViewer(gl, this);
	var coordSys = new CoordinateSystem(gl, this);
	var colormap = new Colormap(gl, this);
	/** @type  {Array<Viewer>} */var viewers = [pointViewer, imageViewer, densityViewer, histogramViewer, coordSys, colormap];

	var dataset = null;
	var activeInputs = Array.create(ND, -1);
	var animatedInputs = Array.create(ND, function () {
		return { target: null, f: 0 };
	});

	this['points'] = this.points = pointViewer.points;
	pointViewer.representativePoints = pointViewer.createPointSet([0, 255, 0, 255], 1);
	this['createPointSet'] = this.createPointSet = pointViewer.createPointSet;
	this['removePointSet'] = this.removePointSet = pointViewer.removePointSet;

	var mouseRect = null,
	    mousePolygon = null;
	var pointDrag = null;

	function render(flipY) {
		invalidating = false;
		if (typeof flipY !== 'boolean') flipY = false;
		gl.clear(gl.COLOR_BUFFER_BIT);
		trc.clear();
		if (plotBounds.width <= 0 || plotBounds.height <= 0) return;

		gl.enable(gl.SCISSOR_TEST);
		gl.scissor(plotBounds.x, flipY ? gl.height - plotBounds.y - plotBounds.height : plotBounds.y, plotBounds.width, plotBounds.height);

		if (tf !== null) {
			var isAnimating = tf.animate();
			if (isAnimating) globalView.invalidate();

			/*var _dcTransform, _transform;
   if (flipY === true)
   {
   	_dcTransform = matN.clone(tf.getDcTransform());
   	matN.scale(_dcTransform, [1, -1]);
   	_transform = matN.clone(tf.getTransform());
   	matN.scale(_transform, [1, -1]);
   }
   else
   {
   	_dcTransform = tf.getDcTransform();
   	_transform = tf.getTransform();
   }*/

			var d0 = activeInputs[0],
			    d1 = activeInputs[1];
			//			densityViewer.updateImages(imageViewer.getImages(), d0, d1);
			densityViewer.render(flipY, tf, d0, d1);
			pointViewer.render(flipY, tf, colormap.getTexture(), pointDrag);
			//if (!isAnimating)
			imageViewer.render(flipY, tf);
		}

		gl.disable(gl.SCISSOR_TEST);

		if (tf !== null) histogramViewer.render(flipY, tf, plotBounds);
		coordSys.render(flipY, plotBounds);
		colormap.render(flipY, plotBounds);

		if (mouseRect !== null && (mouseRect.width != 0 || mouseRect.height != 0)) gl.drawRect(mouseRect.x, mouseRect.y, mouseRect.width, mouseRect.height);
		if (mousePolygon !== null) {
			gl.fillPolygon(mousePolygon, "rgba(255, 255, 255, 0.25)");
			gl.drawPolygon(mousePolygon);
		}

		var tn = performance.now();
		dt = tn - t;
		t = tn;
		if (SHOW_FPS) {
			++frameCounter;
			if (t - fpsStart > 10000.0 || frameCounter > 1000) // Refresh FPS after 10s or 1000 frames
				{
					//fps = (frameCounter == 1 ? 10000.0 : 1000 * frameCounter) / (t - fpsStart);
					fps = 1000 * frameCounter / (t - fpsStart);
					fpsStart = t;
					frameCounter = 0;
				}
			if (fps !== null) gl.drawText(fps.toFixed(5) + " FPS", canvas.width - 8, 8, "topright");else gl.drawText("approx. " + Math.floor((frameCounter == 1 ? 10000.0 : 1000 * frameCounter) / (t - fpsStart)) + " FPS", canvas.width - 8, 8, "topright");
		}
		if (SIMULATE_LOW_FPS) setTimeout(function () {
			globalView.invalidate();
		}, 100);else if (ENABLE_CONTINUOUS_RENDERING) globalView.invalidate();
	}

	var invalidating = false;
	this['invalidate'] =
	/**
  * @summary Request to rerender the plot
  */
	this.invalidate = function () {
		if (invalidating === false && offscreenRendering === null) {
			invalidating = true;
			webglUtils.requestAnimFrame(render);
		}
	};
	var reresizeTimer = null;
	var onresize = function onresize() {
		var rect = canvas.getBoundingClientRect(),
		    width = rect.right - rect.left,
		    height = rect.bottom - rect.top;
		if (!offscreenRendering && (width !== gl.width || height !== gl.height)) {
			gl.viewport(0, 0, gl.width = canvas.width = width, gl.height = canvas.height = height);
			trc.onResize();
			if (options['padding']) setPlotBounds(options['padding']);
			if (invalidating === false && offscreenRendering === null) {
				invalidating = true;
				webglUtils.requestAnimFrame(render);
			}

			// Refire event after 100ms in case another resize handler queued after this on changes the canvas size
			if (reresizeTimer !== null) clearTimeout(reresizeTimer);
			reresizeTimer = setTimeout(onresize, 100);
		}
	};

	/**
  * A class containing variables and functions for transforming data vectors into device space
  * @constructor
  * @package
  */
	function Transform() {
		var offsets = new Float32Array(ND),
		    scales = new Float32Array(ND),
		    animatedScales = new Float32Array(ND);
		var invalid = false;

		// Setter methods
		this.setFromMinMax = function (d, minimum, maximum) {
			dataset.dataVectors[d].scale = maximum - minimum;
			if (dataset.dataVectors[d].scale > -1e-5 && dataset.dataVectors[d].scale < 1e-5) dataset.dataVectors[d].offset = 0.5 - 0.5 * (minimum + maximum) * (dataset.dataVectors[d].scale = 0.5);else dataset.dataVectors[d].offset = -minimum * (dataset.dataVectors[d].scale = 1 / dataset.dataVectors[d].scale);
			invalid = true;

			if (d === activeInputs[0]) updateCoorinateSystem(0, activeInputs[0]);
			if (d === activeInputs[1]) updateCoorinateSystem(1, activeInputs[1]);
			if (d === activeInputs[2]) updateColormap(activeInputs[2]);
			if (d === activeInputs[0] || d === activeInputs[1] || d === activeInputs[2]) globalView.invalidate();
		};
		this.translate = function (d, distance) {
			dataset.dataVectors[d].offset += distance * dataset.dataVectors[d].scale;
			invalid = true;

			if (d === activeInputs[0]) updateCoorinateSystem(0, activeInputs[0], false);
			if (d === activeInputs[1]) updateCoorinateSystem(1, activeInputs[1], false);
			if (d === activeInputs[2]) updateColormap(activeInputs[2], false);
			if (d === activeInputs[0] || d === activeInputs[1] || d === activeInputs[2]) globalView.invalidate();
		};
		this.scale = function (d, factor) {
			dataset.dataVectors[d].scale *= factor;
			invalid = true;

			if (d === activeInputs[0]) updateCoorinateSystem(0, activeInputs[0]);
			if (d === activeInputs[1]) updateCoorinateSystem(1, activeInputs[1]);
			if (d === activeInputs[2]) updateColormap(activeInputs[2]);
			if (d === activeInputs[0] || d === activeInputs[1] || d === activeInputs[2]) globalView.invalidate();
		};
		this.onInputChanged = function () {
			return invalid = true;
		};

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
			if (invalid === true) recompute();
			return offsets;
		};
		this.getScales = function () {
			if (invalid === true) recompute();
			return scales;
		};
		this.getAnimatedScales = function () {
			if (invalid === true) recompute();
			return animatedScales;
		};

		// Transformation methods
		this.deviceCoordToDatasetCoord = function (vOut, vIn) {
			if (invalid === true) {
				invalid = false;
				recompute();
			}
			for (var d = 0, nd = Math.min(vIn.length, vOut.length, ND); d < nd; ++d) {
				vOut[d] = (vIn[d] - offsets[d]) / scales[d];
			}return vOut;
		};
		this.deviceDistToDatasetDist = function (vOut, vIn) {
			if (invalid === true) {
				invalid = false;
				recompute();
			}
			for (var d = 0, nd = Math.min(vIn.length, vOut.length, ND); d < nd; ++d) {
				vOut[d] = vIn[d] / scales[d];
			}return vOut;
		};
		this.datasetCoordToDeviceCoord = function (vOut, vIn) {
			if (invalid === true) {
				invalid = false;
				recompute();
			}
			for (var d = 0, nd = Math.min(vIn.length, vOut.length, ND); d < nd; ++d) {
				vOut[d] = offsets[d] + vIn[d] * scales[d];
			}return vOut;
		};
		this.datasetDistToDeviceDist = function (vOut, vIn) {
			if (invalid === true) {
				invalid = false;
				recompute();
			}
			for (var d = 0, nd = Math.min(vIn.length, vOut.length, ND); d < nd; ++d) {
				vOut[d] = vIn[d] * scales[d];
			}return vOut;
		};
		this.transformPos = function (vOut, vIn) {
			if (invalid === true) {
				invalid = false;
				recompute();
			}
			for (var d = 0, nd = vOut.length; d < nd; ++d) {
				vOut[d] = offsets[d] + vIn[activeInputs[d]] * scales[d];
			}return vOut;
		};
		this.transformNml = function (vOut, vIn) {
			if (invalid === true) {
				invalid = false;
				recompute();
			}
			for (var d = 0, nd = vOut.length; d < nd; ++d) {
				vOut[d] = vIn[activeInputs[d]] * scales[d];
			}return vOut;
		};
		this.transformNml2 = function (vOut, vIn) {
			if (invalid === true) {
				invalid = false;
				recompute();
			}
			for (var d = 0, nd = vOut.length; d < nd; ++d) {
				vOut[d] = vIn[activeInputs[d]] * dataset.dataVectors[activeInputs[d]].scale;
			}return vOut;
		};

		// Methods modifying offsets, scales and animatedScales
		function recompute() {
			invalid = false;

			// Compute offsets and scales for active inputs
			for (var d = 0; d < ND; ++d) {
				offsets[d] = dataset.dataVectors[activeInputs[d]].offset;
				scales[d] = dataset.dataVectors[activeInputs[d]].scale;
				animatedScales[d] = 0;
			}

			// Transform first two dimensions offsets and scales into device coordinates
			offsets[0] *= 2 * plotBounds.width / gl.width;
			offsets[0] += 2 * plotBounds.x / gl.width - 1;
			offsets[1] *= 2 * plotBounds.height / gl.height;
			offsets[1] += 2 * plotBounds.y / gl.height - 1;
			scales[0] *= 2 * plotBounds.width / gl.width;
			scales[1] *= 2 * plotBounds.height / gl.height;
			animatedScales[0] *= 2 * plotBounds.width / gl.width;
			animatedScales[1] *= 2 * plotBounds.height / gl.height;

			return offsets;
		}
		this.animate = function () {
			invalid = false;

			var isAnimating = false;

			// Compute offsets and scales, either static based on activeInputs, or animated between activeInputs and animatedInputs
			var oi = animatedInputs.map(function (anim) {
				return anim.origin;
			});
			var di = activeInputs;
			for (var d = 0; d < ND; ++d) {
				var ts = dataset.dataVectors[di[d]].scale;
				var tt = dataset.dataVectors[di[d]].offset;

				if (animatedInputs[d].origin == activeInputs[d]) {
					scales[d] = ts;
					offsets[d] = tt;
					animatedScales[d] = 0;
				} else {
					var os = dataset.dataVectors[oi[d]].scale;
					var ot = dataset.dataVectors[oi[d]].offset;

					var alpha = animatedInputs[d].f;
					offsets[d] = alpha * tt + (1 - alpha) * ot;
					alpha *= Math.PI / 2.0;
					scales[d] = Math.sin(alpha) * ts;
					animatedScales[d] = Math.cos(alpha) * os;

					animatedInputs[d].f += dt * 0.001;
					if (animatedInputs[d].f >= 1.0) animatedInputs[d].origin = activeInputs[d];

					isAnimating = true;
				}
			}

			// Transform first two dimensions offsets and scales into device coordinates
			offsets[0] *= 2 * plotBounds.width / gl.width;
			offsets[0] += 2 * plotBounds.x / gl.width - 1;
			offsets[1] *= 2 * plotBounds.height / gl.height;
			offsets[1] += 2 * plotBounds.y / gl.height - 1;
			scales[0] *= 2 * plotBounds.width / gl.width;
			scales[1] *= 2 * plotBounds.height / gl.height;
			animatedScales[0] *= 2 * plotBounds.width / gl.width;
			animatedScales[1] *= 2 * plotBounds.height / gl.height;

			return isAnimating;
		};
	}
	var tf = null;

	var plotBounds = { x: 0, y: 0, width: 0, height: 0 }; // Plot bounds [pixel]
	this.getPlotBounds = function () {
		return plotBounds;
	};
	function setPlotBounds(padding) {
		var computedPadding;
		if (isArray(padding) && padding.length === 4) computedPadding = padding.map(function (v, i) {
			return Math.floor(isString(v) ? Number.parseFloat(v) * (v.endsWith('%') ? (i % 2 === 0 ? canvas.width : canvas.height) / 100 : 1) : padding[i]);
		});else if (isNumber(padding) || isString(padding)) computedPadding = Array.create(4, function (i) {
			return Math.floor(isString(padding) ? Number.parseFloat(padding) * (padding.endsWith('%') ? (i % 2 === 0 ? canvas.width : canvas.height) / 100 : 1) : padding);
		});

		var newPlotBounds = {
			x: computedPadding[3],
			y: computedPadding[2],
			width: canvas.width - computedPadding[3] - computedPadding[1],
			height: canvas.height - computedPadding[0] - computedPadding[2]
		};

		if (newPlotBounds.x != plotBounds.x || newPlotBounds.y != plotBounds.y || newPlotBounds.width != plotBounds.width || newPlotBounds.height != plotBounds.height) viewers.forEach(function (viewer) {
			return viewer.onPlotBoundsChanged(plotBounds = newPlotBounds);
		});else plotBounds = newPlotBounds;
	}

	this['zoomFit'] =
	/**
  * @summary Zoom all dimensions to exactly fit all data points
  */
	this.zoomFit = function () {
		var nv = dataset.dataVectors.length;

		// Compute offsets and scales to fit dataset inside view
		for (var v = 0; v < nv; ++v) {
			tf.setFromMinMax(v, dataset.dataVectors[v].minimum, dataset.dataVectors[v].maximum);
		}
	};
	this['zoomFit2D'] =
	/**
  * @summary Zoom currently visible x- and y- dimensions to exactly fit all data points
  */
	this.zoomFit2D = function () {
		var d0 = activeInputs[0],
		    d1 = activeInputs[1];

		// Compute offsets and scales to fit dataset inside view
		tf.setFromMinMax(d0, dataset.dataVectors[d0].minimum, dataset.dataVectors[d0].maximum);
		tf.setFromMinMax(d1, dataset.dataVectors[d1].minimum, dataset.dataVectors[d1].maximum);
	};
	this['zoomRect'] =
	/**
  * @summary Zoom currently visible x- and y- dimensions to the given bounds in data space
  * @param  {{l: number, t: number, r: number, b: number}} rect Bounds of the visible region
  */
	this.zoomRect = function (rect) {
		var d0 = activeInputs[0],
		    d1 = activeInputs[1];

		tf.setFromMinMax(d0, rect['l'], rect['r']);
		tf.setFromMinMax(d1, rect['t'], rect['b']);
	};

	// >>> Options

	/**
  * @summary A map of valid options with option descriptions, validation functions and flags about side effects
  * @const
  * @enum {OptionDescription}
 */
	var OPTIONS = {
		// General plot options
		/** The space around the drawing area in the form [top, right, bottom, left]. X-axis, y-axis and colormap are drawn within padding space. */
		'padding': {
			description: "The space around the drawing area in the form [top, right, bottom, left]. X-axis, y-axis and colormap are drawn within padding space.",
			default: [50, 60, 50, 50],
			valid: function valid(value) {
				return isNumber(value) || isString(value) || isArray(value) && value.length === 4;
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** When enabled, shows a colormap to the right of the plot. */
		'showColormap': {
			description: "When enabled, shows a colormap to the right of the plot.",
			default: true,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		},
		/** When enabled, scrolling above the plot zooms in or out of the data. */
		'enableScrolling': {
			description: "When enabled, scrolling above the plot zooms in or out of the data.",
			default: true,
			valid: [true, false],
			requireRedraw: false,
			requireRecompile: false
		},
		/** When enabled, thumbnails can be dragged with the mouse. */
		'enableThumbnailDragging': {
			description: "When enabled, thumbnails can be dragged with the mouse.",
			default: true,
			valid: [true, false],
			requireRedraw: false,
			requireRecompile: false
		},

		// Advanced plot options
		/** When enabled, the canvas is continuously rerendered at up to 60 frames per second. Keep this setting disabled to save processing resources. */
		'enableContinuousRendering': {
			description: "When enabled, the canvas is continuously rerendered at up to 60 frames per second. Keep this setting disabled to save processing resources.",
			default: false,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		},
		/** Enables/disables blending in WebGL. Whenever using any kind of transparency, this setting should be kept enabled. */
		'enableTransparency': {
			description: "Enables/disables blending in WebGL. Whenever using any kind of transparency, this setting should be kept enabled.",
			default: true,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		},
		/** When enabled, draws an image into the background, that shows density of points. (can be combined with 'showPointClusters') */
		'showPointDensity': {
			description: "When enabled, draws an image into the background, that shows density of points. (can be combined with 'showPointClusters')",
			default: false,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		},
		/** When enabled, draws an image into the background, that shows colored clusters of points. (can be combined with 'showPointDensity') */
		'showPointClusters': {
			description: "When enabled, draws an image into the background, that shows colored clusters of points. (can be combined with 'showPointDensity')",
			default: false,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		},
		'pointClusterThreshold': {
			description: "Controls the realtive threshold between clusters and outliers when showing clusters (see 'showPointClusters')",
			default: new ClusterMapOptions().threshold,
			valid: function valid(value) {
				return value > 0;
			},
			requireRedraw: false, // Requests redraw internally
			requireRecompile: false
		},

		// Histogram options
		/** When enabled, shows a histogram between the x-axis and the plot. */
		'showXAxisHistogram': {
			description: "When enabled, shows a histogram between the x-axis and the plot.",
			default: false,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		},
		/** When enabled, shows a histogram between the y-axis and the plot. */
		'showYAxisHistogram': {
			description: "When enabled, shows a histogram between the y-axis and the plot.",
			default: false,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		},
		/** When enabled, shows a histogram between the colormap and the plot. */
		'showColormapHistogram': {
			description: "When enabled, shows a histogram between the colormap and the plot.",
			default: false,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		},
		/** Controls the number of bins within each histogram in the scatterplot. */
		'numHistogramBins': {
			description: "Controls the number of bins within each histogram in the scatterplot.",
			default: 50,
			valid: function valid(value) {
				return value >= 1;
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** Controls the height of each histogram in the scatterplot (in pixels). */
		'histogramHeight': {
			description: "Controls the height of each histogram in the scatterplot (in pixels).",
			default: 64,
			valid: function valid(value) {
				return value >= 0;
			},
			requireRedraw: true,
			requireRecompile: false
		},

		// Point options
		/** Controls the shape of data points in the scatterplot. */
		'pointShape': {
			description: "Controls the shape of data points in the scatterplot.",
			default: "Circle",
			valid: ["Rectangle", "Circle", "Cross", "Diamond", "Gaussian", "Custom"],
			requireRedraw: true,
			requireRecompile: true
		},
		/** When 'pointShape' is set to 'Custom', this defines a GLSL function given vec2 p, that returns opacity in the range [0.0 ... 1.0] at location p. */
		'customPointShape': {
			description: "When 'pointShape' is set to 'Custom', this defines a GLSL function given vec2 p, that returns opacity in the range [0.0 ... 1.0] at location p.",
			default: "{ return 1.0; }",
			valid: function valid(value) {
				return validateGLSL(gl, "float opacityMap(in vec2 p) " + value);
			},
			requireRedraw: true,
			requireRecompile: true
		},
		/** Controls the diameter of data points in the scatterplot (in pixels). */
		'pointSize': {
			description: "Controls the diameter of data points in the scatterplot (in pixels).",
			default: 6,
			valid: function valid(value) {
				return value >= 0;
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** Controls the visibility of data points in the scatterplot between 0 (invisible) and 1 (fully opaque). */
		'pointOpacity': {
			description: "Controls the visibility of data points in the scatterplot between 0 (invisible) and 1 (fully opaque).",
			default: 1,
			valid: function valid(value) {
				return value >= 0 && value <= 1;
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** Controls the color of data points in the scatterplot. Valid values are an array of bytes in RGBA order or a colormap name. */
		'pointColor': {
			description: "Controls the color of data points in the scatterplot. Valid values are an array of bytes in RGBA order or a colormap name.",
			default: "exhue",
			valid: function valid(value) {
				return validateColormap(value);
			},
			requireRedraw: true,
			requireRecompile: false
		},

		// Thumbnail options
		/** Controls the width/height of thumbnails in the scatterplot (in pixels). */
		'thumbnailSize': {
			description: "Controls the width/height of thumbnails in the scatterplot (in pixels).",
			default: 64,
			valid: function valid(value) {
				return value > 0;
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** Controls the width of thumbnail borders in the scatterplot. */
		'thumbnailBorderWidth': {
			description: "Controls the width of thumbnail borders in the scatterplot.",
			default: 1,
			valid: function valid(value) {
				return value >= 0;
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** Controls the color of thumbnail borders in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'.
  	If set to 'null', the CSS foreground color will be used. */
		'thumbnailBorderColor': {
			description: "Controls the color of thumbnail borders in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'. " + "If set to 'null', the CSS foreground color will be used.",
			default: null,
			valid: function valid(value) {
				return value === null || validateColor(value);
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** Controls the color of thumbnail line in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'.
  If set to 'null', the CSS foreground color will be used. */
		'thumbnailLineColor': {
			description: "Controls the color of thumbnail line in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'. " + "If set to 'null', the CSS foreground color will be used.",
			default: null,
			valid: function valid(value) {
				return value === null || validateColor(value);
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** Controls the color of thumbnail labels in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'.
  If set to 'null', the CSS background color will be used. */
		'thumbnailLabelColor': {
			description: "Controls the color of thumbnail labels in the scatterplot. Valid values are an array of bytes in RGBA order, a color name or 'null'. " + "If set to 'null', the CSS foreground color will be used.",
			default: null,
			valid: function valid(value) {
				return value === null || validateColor(value);
			},
			requireRedraw: true,
			requireRecompile: false
		},
		/** When enabled, links thumbnails to points using unique labels instead of lines. */
		'labelThumbnails': {
			description: "When enabled, links thumbnails to points using unique labels instead of lines.",
			default: false,
			valid: [true, false],
			requireRedraw: true,
			requireRecompile: false
		}
	};
	/** @enum */
	var options = {};

	var pushedOptions = [];
	function onOptionsChanged(requireRedraw, requireRecompile) {
		// Update trivial options
		ENABLE_CONTINUOUS_RENDERING = options['enableContinuousRendering'];
		SHOW_FPS = options['enableContinuousRendering'];
		if (options['enableTransparency']) gl.enable(gl.BLEND);else gl.disable(gl.BLEND);
		colormap.visible = options['showColormap'];
		densityViewer.showDensityMap = options['showPointDensity'];
		densityViewer.showClusterMap = options['showPointClusters'];
		densityViewer.setClusterMapThreshold(options['pointClusterThreshold']);

		if (options['padding']) setPlotBounds(options['padding']);

		viewers.forEach(function (viewer) {
			return viewer.onOptionsChanged(options, requireRecompile);
		});

		if (dataset !== null) {
			// Reset FPS counter
			fps = null;
			fpsStart = t;
			frameCounter = 0;

			// Redraw
			if (requireRedraw) this.invalidate();
		}
	}
	this['setOption'] =
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
			console.warn("GlobalView warning: Unsupported option: " + option);
			return;
		}
		var optionDefinition = OPTIONS[option];

		// Validate value
		var validationResult;
		if (isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1 || isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true) {
			console.warn("GlobalView warning: Invalid value for option " + option + ": " + value);
			if (isString(validationResult)) console.warn("                    " + validationResult);
			return;
		}

		// Set option
		options[option] = value;

		onOptionsChanged.call(this, optionDefinition.requireRedraw, optionDefinition.requireRecompile);
	};
	this['setOptions'] =
	/**
  * @summary Sets multiple options
  * @param  {Object} newOptions A JavaScript object of options
  */
	this.setOptions = function (newOptions) {
		var requireRecompile = false,
		    requireRedraw = false;
		for (var option in newOptions) {
			if (!newOptions.hasOwnProperty(option)) continue;

			// Validate option
			if (!OPTIONS.hasOwnProperty(option)) {
				console.warn("GlobalView warning: Unsupported option: " + option);
				continue;
			}
			var optionDefinition = OPTIONS[option];

			// Validate value
			var value = newOptions[option],
			    validationResult;
			if (isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1 || isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true) {
				console.warn("GlobalView warning: Invalid value for option " + option + ": " + value);
				if (isString(validationResult)) {
					//HY:
					validationResult = optionDefinition.valid(value);
					console.warn("                    " + validationResult);
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
	this['setDefaultOption'] =
	/**
  * @summary Sets the given option to its default value
  * @param  {string} option
  */
	this.setDefaultOption = function (option) {
		// Validate option
		if (!OPTIONS.hasOwnProperty(option)) {
			console.warn("GlobalView warning: Unsupported option: " + option);
			return;
		}
		var optionDefinition = OPTIONS[option];

		this.setOption(option, optionDefinition.default);
	};
	this['setDefaultOptions'] =
	/**
  * @summary Sets all options to their respective defaults
  */
	this.setDefaultOptions = function () {
		var defaultOptions = {};
		for (var option in OPTIONS) {
			if (OPTIONS.hasOwnProperty(option)) defaultOptions[option] = OPTIONS[option].default;
		}this.setOptions(defaultOptions);
	};
	this['validateOption'] =
	/**
  * @summary Checks the given option for errors without setting it
  * @param  {string} option
  * @param  {*} value
  * @return  {string|boolean} Error message or 'true' if the option is valid
  */
	this.validateOption = function (option, value) {
		// Validate option
		if (!OPTIONS.hasOwnProperty(option)) return "Unsupported option: " + option;
		var optionDefinition = OPTIONS[option];

		// Validate value
		var validationResult;
		if (isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1 || isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true) return "Invalid value for option " + option + ": " + value + (isString(validationResult) ? "\n    " + validationResult : "");

		return true;
	};
	this['validateOptions'] =
	/**
  * @summary Checks multiple options for errors without setting them
  * @param  {Object} newOptions A JavaScript object of options
  * @return  {string|boolean} Error message or 'true' if all options are valid
  */
	this.validateOptions = function (newOptions) {
		var errors = [];
		for (var option in newOptions) {
			if (!newOptions.hasOwnProperty(option)) continue;

			// Validate option
			if (!OPTIONS.hasOwnProperty(option)) {
				errors.push("Unsupported option: " + option);
				continue;
			}
			var optionDefinition = OPTIONS[option];

			// Validate value
			var value = newOptions[option],
			    validationResult;
			if (isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1 || isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true) {
				errors.push("Invalid value for option " + option + ": " + value + (isString(validationResult) ? "\n    " + validationResult : ""));
				continue;
			}
		}

		return errors.length === 0 ? true : errors.join('\n');
	};
	this['getOption'] =
	/**
  * @summary Returns the value assigned to the given option
  * @param  {string} option
  * @return {*}
  */
	this.getOption = function (option) {
		return options[option];
	};
	this['getOptions'] =
	/**
  * @summary Returns a JavaScript object of all options and their values
  * @return {Object}
  */
	this.getOptions = function () {
		return (/** @type {Object} */JSON.parse(JSON.stringify(options))
		);
	};
	this['pushOptions'] =
	/**
  * @summary Save all options
  */
	this.pushOptions = function () {
		pushedOptions.push(options);
		//options = {};
	};
	this['popOptions'] =
	/**
  * @summary Recall the options last saved with {@link GlobalView#pushOptions}
  */
	this.popOptions = function () {
		if (pushedOptions.length !== 0) this.setOptions(pushedOptions.pop());
	};

	// >>> Dataset interaction

	/**
  * @private
  * @param  {number} d
  * @param  {number} columnIdx
  * @param  {boolean=} changeTickDistance=true
  */
	function updateCoorinateSystem(d, columnIdx, changeTickDistance) {
		if (dataset.dataVectors[columnIdx].values) coordSys.setEnumRange(d, tf.getVisibleMinimum(d), tf.getVisibleMaximum(d), dataset.dataVectors[columnIdx].values);else coordSys.setNumericRange(d, tf.getVisibleMinimum(d), tf.getVisibleMaximum(d), changeTickDistance);
		coordSys.setLabel(d, dataset.dataVectors[columnIdx].label);
	}
	/**
  * @private
  * @param  {number} columnIdx
  * @param  {boolean=} changeTickDistance=true
  */
	function updateColormap(columnIdx, changeTickDistance) {
		if (dataset.dataVectors[columnIdx].values) colormap.setEnumRange(tf.getVisibleMinimum(2), tf.getVisibleMaximum(2), dataset.dataVectors[columnIdx].values);else colormap.setNumericRange(tf.getVisibleMinimum(2), tf.getVisibleMaximum(2), changeTickDistance);
		colormap.setLabel(dataset.dataVectors[columnIdx].label);
	}

	//var pushedDatasets = [];
	this['load'] =
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
		//dataset.dataVectors.push(new DataVector(dataset, "({1} + {2}) / 2.0"));//"i"));
		//dataset.dataVectors.push(new DataVector(dataset, "{2} + 2.0"));//"i"));


		// Reset transform
		tf = new Transform();
		this.zoomFit();

		// Update viewers
		viewers.forEach(function (viewer) {
			return viewer.setDataset(dataset, options);
		});
		viewers.forEach(function (viewer) {
			return viewer.onInputChanged(activeInputs, animatedInputs, options);
		});
		/*pointViewer.setDataset(dataset, options);
  pointViewer.onInputChanged(activeInputs, animatedInputs, options);
  densityViewer.setDataset(dataset, options);
  histogramViewer.setDataset(dataset, options);
  histogramViewer.onInputChanged(activeInputs, animatedInputs, options);*/

		// Reset FPS counter
		fps = null;
		fpsStart = t;
		frameCounter = 0;

		// Redraw
		this.invalidate();
	};
	this['setActiveColumn'] =
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
		viewers.forEach(function (viewer) {
			return viewer.onInputChanged(activeInputs, animatedInputs, options);
		});
		/*pointViewer.onInputChanged(activeInputs, animatedInputs, options);
  histogramViewer.onInputChanged(activeInputs, animatedInputs, options);*/
		if (d < 2) updateCoorinateSystem(d, activeInputs[d]);else updateColormap(activeInputs[2]);
		if (d < 3) this.invalidate();
	};
	this['getActiveColumn'] =
	/**
  * Get column assigned to axis c
  * @param  {number} d
  * @return {number}
  */
	this.getActiveColumn = function (d) {
		return d >= 0 && d < activeInputs.length ? activeInputs[d] : -1;
	};

	this['getCharacteristicPoints'] =
	/**
  * @param  {number} n
  * @param  {number} densityRatio
  * @param  {function(Array<number>)} ondone Event handler, called after characteristic points have been found
  */
	this.getCharacteristicPoints = function (n, densityRatio, ondone) {
		if (!dataset) return;
		var d0 = activeInputs[0],
		    d1 = activeInputs[1];
		dataset.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
			if (d1 < d0) {
				// Swap d0 <-> d1
				var temp = d0;
				d0 = d1;
				d1 = temp;
			}

			var characteristicPoints = findRepresentativePoints2(dataset, d0, d1, densityMap, n, densityRatio);
			ondone(characteristicPoints);
		});
	};

	// >>> Annotation

	/**
  * @summary Remove all thumbnails from the plot
  */
	this['clearThumbnails'] = this.clearThumbnails = function () {
		// Clear stencil maps
		if (dataset) dataset.iterateDensityMaps(function (densityMap) {
			if (densityMap.stencilMap && densityMap.stencilMap.data) for (var i = 0, stencilMap = densityMap.stencilMap.data, len = stencilMap.length; i < len; ++i) {
				stencilMap[i] = 0;
			}
		});

		imageViewer.clearImages();
		this.invalidate();
	};
	/**
  */
	this['showData2D'] = this.showData2D = function () {
		imageViewer.clearImages();

		var d0 = activeInputs[0],
		    d1 = activeInputs[1];
		dataset.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
			if (d1 < d0) {
				// Swap d0 <-> d1
				var temp = d0;
				d0 = d1;
				d1 = temp;
			}

			if (!densityMap.stencilMap) densityMap.stencilMap = {};

			//downloadDensityMap(densityMap);
			pointViewer.representativePoints.assign(findRepresentativePoints2(dataset, d0, d1, densityMap, 16, 0.3));
			if (dataset.imageFilenames) pointViewer.representativePoints.forEach(function (r) {
				if (dataset.imageFilenames[r]) {
					var dataPos = dataset.dataVectors.map(function (v) {
						return v.getValue(r);
					});
					var imagePos = dataPos.slice(0);
					var p = findClosePointOfLowDensity(dataset, d0, d1, r, densityMap, densityMap.stencilMap, 0.6 * options['thumbnailSize'] / gl.width, 0.6 * (options['thumbnailSize'] + LABEL_HEIGHT) / gl.height); //EDIT: Factor 0.6: WHY?
					imagePos[d0] = p[0];
					imagePos[d1] = p[1];
					var imageSize = dataset.dataVectors.map(function (v) {
						return options['thumbnailSize'] * (v.maximum - v.minimum);
					});
					imageViewer.showImage(dataset.imageFilenames[r], r, dataPos, imagePos, imageSize);
				}
			});
			//downloadDensityMap(densityMap);
		});
	};

	this['showImage_lowDensity'] =
	/**
  * @summary A shorthand function to `showImage(index, "lowDensity")`
  * @param  {number} index Index of the datapoint to show
  */
	this.showImage_lowDensity = function (index) {
		if (dataset.imageFilenames && dataset.imageFilenames[index]) {
			var d0 = activeInputs[0],
			    d1 = activeInputs[1];
			//console.log(dataset.requestDensityMap(d0, d1, undefined, undefined));
			//dataset.requestDensityMap(d0, d1, undefined, undefined, function(densityMap) { console.log(densityMap); });

			dataset.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
				var imageWidth = 0.6 * options['thumbnailSize'] / gl.width,
				    imageHeight = (0.6 * options['thumbnailSize'] + LABEL_HEIGHT) / gl.height; //EDIT: Factor 0.6: WHY?
				if (d1 < d0) {
					// Swap d0 <-> d1
					var temp = d0;
					d0 = d1;
					d1 = temp;

					// Swap imageWidth <-> imageHeight
					temp = imageWidth;
					imageWidth = imageHeight;
					imageHeight = temp;
				}

				var dataPos = dataset.dataVectors.map(function (v) {
					return v.getValue(index);
				});
				var imagePos;
				if (isUndefined(densityMap.data)) // If densityMap is nD
					imagePos = findClosePointOfLowDensityND_descend(dataset, index, densityMap, 0.6 * options['thumbnailSize'] / Math.min(gl.width, gl.height)); //EDIT: Factor 0.6: WHY?
				else {
						imagePos = dataPos.slice(0);

						if (!densityMap.stencilMap) densityMap.stencilMap = {};
						var p = findClosePointOfLowDensity(dataset, d0, d1, index, densityMap, densityMap.stencilMap, imageWidth, imageHeight);
						if (p) {
							imagePos[d0] = p[0];
							imagePos[d1] = p[1];
						} else {
							var halfImageSize = [1.1 * options['thumbnailSize'] / gl.width, 1.1 * options['thumbnailSize'] / gl.height];
							tf.deviceDistToDatasetDist(halfImageSize, halfImageSize);
							imagePos[d0] += halfImageSize[0];
							imagePos[d1] += halfImageSize[1];
						}
					}
				var imageSize = dataset.dataVectors.map(function (v) {
					return options['thumbnailSize'] * (v.maximum - v.minimum);
				});
				imageViewer.showImage(dataset.imageFilenames[index], index, dataPos, imagePos, imageSize);
			});
		}
	};
	this['showImages_lowDensity'] =
	/**
  * @summary A shorthand function to `showImages(index, "lowDensity")`
  * @param  {Array<number>} points List of indices of datapoints to show
  */
	this.showImages_lowDensity = function (points) {
		if (dataset.imageFilenames) {
			var d0 = activeInputs[0],
			    d1 = activeInputs[1];
			dataset.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
				var imageWidth = 0.6 * options['thumbnailSize'] / gl.width,
				    imageHeight = (0.6 * options['thumbnailSize'] + LABEL_HEIGHT) / gl.height; //EDIT: Factor 0.6: WHY?
				if (d1 < d0) {
					// Swap d0 <-> d1
					var temp = d0;
					d0 = d1;
					d1 = temp;

					// Swap imageWidth <-> imageHeight
					temp = imageWidth;
					imageWidth = imageHeight;
					imageHeight = temp;
				}
				if (!densityMap.stencilMap) densityMap.stencilMap = {};
				markPointsInStencilMap(dataset, d0, d1, points, densityMap, densityMap.stencilMap, imageWidth, imageHeight);
			});
		}
		points.forEach(function (i) {
			return globalView.showImage_lowDensity(i);
		});
		imageViewer.resolveIntersections(tf);
	};

	this['showImage_none'] =
	/**
  * @summary A shorthand function to `showImage(index, "none")`
  * @param  {number} index Index of the datapoint to show
  */
	this.showImage_none = function (index) {
		var dataPos = dataset.dataVectors.map(function (v) {
			return v.getValue(index);
		});
		imageViewer.showImage(dataset.imageFilenames[index], index, dataPos);
	};
	this['showImages_none'] =
	/**
  * @summary A shorthand function to `showImages(index, "none")`
  * @param  {Array<number>} points List of indices of datapoints to show
  */
	this.showImages_none = function (points) {
		points.forEach(function (p) {
			var dataPos = dataset.dataVectors.map(function (v) {
				return v.getValue(p);
			});
			imageViewer.showImage(dataset.imageFilenames[p], p, dataPos);
		});
	};

	this['showImage_adjacent'] =
	/**
  * @summary A shorthand function to `showImage(index, "adjacent")`
  * @param  {number} index Index of the datapoint to show
  */
	this.showImage_adjacent = function (index) {
		var dataPos = dataset.dataVectors.map(function (v) {
			return v.getValue(index);
		});
		var imageSize = dataset.dataVectors.map(function (v) {
			return options['thumbnailSize'] * (v.maximum - v.minimum);
		});
		imageViewer.showImage(dataset.imageFilenames[index], index, dataPos, dataPos, imageSize, 'bottomleft');
	};
	this['showImages_adjacent'] =
	/**
  * @summary A shorthand function to `showImages(index, "adjacent")`
  * @param  {Array<number>} points List of indices of datapoints to show
  */
	this.showImages_adjacent = function (points) {
		points.forEach(function (i) {
			return globalView.showImage_adjacent(i);
		});
	};

	this['showImages_project'] =
	/**
  * @summary A shorthand function to `showImages(index, "project")`
  * @param  {Array<number>} points List of indices of datapoints to show
  */
	this.showImages_project = function (points) {
		if (!dataset.imageFilenames) return;

		var d0 = activeInputs[0],
		    d1 = activeInputs[1];
		var offsets = tf.getOffsets(),
		    scales = tf.getScales();

		// Computed expected value (= mean) of points -> E
		var E = [0, 0];
		points.forEach(function (p) {
			E[0] += dataset.dataVectors[d0].getValue(p);
			E[1] += dataset.dataVectors[d1].getValue(p);
		});
		E[0] *= scales[0] / points.length;
		E[1] *= scales[1] / points.length;

		// Compute covariance matrix of points -> cov [symetrical 2D matrix]
		var cov = [0, 0, 0];
		points.forEach(function (p) {
			var x0 = dataset.dataVectors[d0].getValue(p) * scales[0] - E[0];
			var x1 = dataset.dataVectors[d1].getValue(p) * scales[1] - E[1];
			cov[0] += x0 * x0;
			cov[1] += x0 * x1;
			cov[2] += x1 * x1;
		});
		cov[0] /= points.length;
		cov[1] /= points.length;
		cov[2] /= points.length;

		// Compute eigen values
		var disc = Math.sqrt((cov[0] - cov[2]) * (cov[0] - cov[2]) + 4 * cov[1] * cov[1]) / 2;
		var eigenval1 = (cov[0] + cov[2]) / 2 + disc;
		var eigenval2 = (cov[0] + cov[2]) / 2 - disc;

		// Compute eigen vector with smallest eigen value (for second principal component)
		var eigenvec = [-cov[1], cov[0] - Math.min(eigenval1, eigenval2)];

		// Normalize eigen vector
		var eigenvec_length = Math.sqrt(eigenvec[0] * eigenvec[0] + eigenvec[1] * eigenvec[1]);
		eigenvec[0] /= eigenvec_length;
		eigenvec[1] /= eigenvec_length;

		// Define corners of AABB
		var imageSize = dataset.dataVectors.map(function (v) {
			return options['thumbnailSize'] * (v.maximum - v.minimum);
		});
		var labelHeightOffset = 1.0 + LABEL_HEIGHT / options['thumbnailSize'];
		var labelWidthOffset = 1.0 + (LABEL_HEIGHT + 2 * LABEL_WIDTH) / options['thumbnailSize'];
		var bl = [tf.getMinimum(0) - imageSize[d0] * 0.6 / plotBounds.width, tf.getMinimum(1) - imageSize[d1] * 0.6 / plotBounds.height];
		var tl = [tf.getMinimum(0) - imageSize[d0] * 0.6 / plotBounds.width, tf.getMaximum(1) + imageSize[d1] * labelHeightOffset * 0.8 / plotBounds.height];
		var tr = [tf.getMaximum(0) + imageSize[d0] * labelWidthOffset * 0.6 / plotBounds.width, tf.getMaximum(1) + imageSize[d1] * labelHeightOffset * 0.8 / plotBounds.height];
		var br = [tf.getMaximum(0) + imageSize[d0] * labelWidthOffset * 0.6 / plotBounds.width, tf.getMinimum(1) - imageSize[d1] * 0.6 / plotBounds.height];
		tf.datasetCoordToDeviceCoord(bl, bl);
		tf.datasetCoordToDeviceCoord(tl, tl);
		tf.datasetCoordToDeviceCoord(tr, tr);
		tf.datasetCoordToDeviceCoord(br, br);

		// >>> Set image locations to be projections of data positions along eigenvec onto AABB

		var posToLoc = function posToLoc(p) {
			p[0] = Math.max(0, Math.min(1, (p[0] - tl[0]) / (br[0] - tl[0]))); // Normalize p[0] from [l ... r] to [0 ... 1]
			p[1] = Math.max(0, Math.min(1, (p[1] - tl[1]) / (br[1] - tl[1]))); // Normalize p[1] from [t ... b] to [0 ... 1]
			switch ([p[0], p[1], 1 - p[0], 1 - p[1]].minIndex()) {
				default:
					/*case 0:*/return 1 - p[1];
				case 1:
					return 1 + p[0];
				case 2:
					return 2 + p[1];
				case 3:
					return 4 - p[0];
			}
		};
		var locToPos = function locToPos(l) {
			l = (l + 4) % 4;
			var p,
			    li = Math.floor(l);
			switch (li) {
				case 0:
					p = [0, li + 1 - l];break;
				case 1:
					p = [l - li, 0];break;
				case 2:
					p = [1, l - li];break;
				case 3:
					p = [li + 1 - l, 1];break;
			}
			p[0] = p[0] * (br[0] - tl[0]) + tl[0]; // Denormalize p[0] from [0 ... 1] to [l ... r]
			p[1] = p[1] * (br[1] - tl[1]) + tl[1]; // Denormalize p[1] from [0 ... 1] to [t ... b]
			return p;
		};

		var imageLocations = [];
		var dest,
		    v0 = dataset.dataVectors[activeInputs[0]],
		    v1 = dataset.dataVectors[activeInputs[1]];
		points.forEach(function (p) {
			if (!dataset.imageFilenames[p]) return;

			var src = [v0.getValue(p), v1.getValue(p)];
			tf.datasetCoordToDeviceCoord(src, src); // Same as src = [v0.getValue(p) * scales[0] + offsets[0], v1.getValue(p) * scales[1] + offsets[1]];

			if (vec2.dot([src[0] - offsets[0] - E[0], src[1] - offsets[1] - E[1]], eigenvec) > 0.0) // If src is above E in direction eigenvec
				{
					dest = vectorLineIntersection2D(src, eigenvec, bl, tl); // Project src in direction eigenvec onto line from bl, to tl
					if (!dest) dest = vectorLineIntersection2D(src, eigenvec, tl, tr); // Project src in direction eigenvec onto line from tl, to tr
				} else // If src is below E in direction eigenvec
				{
					dest = vectorLineIntersection2D(src, eigenvec, bl, br); // Project src in direction -eigenvec onto line from bl, to br
					if (!dest) dest = vectorLineIntersection2D(src, eigenvec, br, tr); // Project src in direction -eigenvec onto line from br, to tr
				}
			if (!dest) return; // This should never happen!

			// Convert position on rectangle [bl, br, tl, tr] to scalar -> imagePos
			imageLocations.push(posToLoc(dest));
		});

		var detectOverlap = function detectOverlap(R, overlapThreshold) {
			var P = [];
			for (var j = 1; j < R.length; ++j) {
				for (var i = 0; i < j; ++i) {
					if (Math.abs(R[i] - R[j]) < overlapThreshold) P.push([i, j]);
				}
			}return P;
		};
		var removeOverlap = function removeOverlap(R, i, j, rank, overlapThreshold) {
			var overlap = overlapThreshold - Math.abs(R[i] - R[j]);
			if (overlap > 0.0) {
				var shift = 0.5 * (rank[i] > rank[j] ? overlapThreshold - (R[i] - R[j]) : R[j] - R[i] - overlapThreshold);
				R[i] += shift;
				R[j] -= shift;
			}
		};

		var maxNumIterations = 10000;
		if (maxNumIterations != 0) {
			var R = imageLocations;
			var overlapThreshold = Math.min(0.15, 4 / imageLocations.length);

			var rank = Array.create(R.length, function (i) {
				return i;
			});
			rank.sort(function (a, b) {
				return imageLocations[a] < imageLocations[b] ? -1 : imageLocations[a] > imageLocations[b] ? 1 : 0;
			});

			var P = detectOverlap(R, overlapThreshold);
			for (var iter = 0; iter < maxNumIterations && P.length !== 0; ++iter) {
				//TODO: Shuffle P
				P.forEach(function (pair) {
					return removeOverlap(R, pair[0], pair[1], rank, overlapThreshold + 0.0001);
				});
				P = detectOverlap(R, overlapThreshold);
			}
			//console.log(iter, overlapThreshold);

			// Repair order
			var newRank = Array.create(R.length, function (i) {
				return i;
			});
			newRank.sort(function (a, b) {
				return R[a] < R[b] ? -1 : R[a] > R[b] ? 1 : 0;
			});
			var R_repaired = new Array(R.length);
			for (var i = 0; i < R.length; ++i) {
				R_repaired[rank[i]] = R[newRank[i]];
			}imageLocations = R_repaired;
		}

		var idx = 0;
		points.forEach(function (p) {
			if (!dataset.imageFilenames[p]) return;

			var dataPos = dataset.dataVectors.map(function (v) {
				return v.getValue(p);
			});
			var imagePos = dataPos.slice(0);

			// Convert scalar to position on rectangle [bl, br, tl, tr] -> dest
			dest = locToPos(imageLocations[idx++]);
			tf.deviceCoordToDatasetCoord(dest, dest);
			imagePos[d0] = dest[0];
			imagePos[d1] = dest[1];

			imageViewer.showImage(dataset.imageFilenames[p], p, dataPos, imagePos, imageSize);
		});

		imageViewer.resolveIntersections(tf);
	};

	this['showImage'] =
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
			case 'none':
				return this.showImage_none(index);
			case 'adjacent':
				return this.showImage_adjacent(index);
			case 'lowDensity':
				return this.showImage_lowDensity(index);
			case 'project':
				console.warn("GlobalView warning: Can't place a single image using the 'project'-strategy");return false;
			default:
				console.warn("GlobalView warning: Unknown image placement strategy: " + placement);return false;
		}
	};
	this['showImages'] =
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
			case 'none':
				return this.showImages_none(points);
			case 'adjacent':
				return this.showImages_adjacent(points);
			case 'lowDensity':
				return this.showImages_lowDensity(points);
			case 'project':
				return this.showImages_project(points);
			default:
				console.warn("GlobalView warning: Unknown image placement strategy: " + placement);return false;
		}
	};

	this['highlightImage'] =
	/**
  * Images other than the given image will be de-highlighted.
  * @summary Highlight the given image with a highlight color
  * @deprecated Set image.labelColor manually
  * @param  {Thumbnail|number} image Image or index of image to show
  */
	this.highlightImage = function (image) {
		var images = imageViewer.getImages();
		if (isNumber(image)) for (var i = 0; i < images.length; ++i) {
			images[i].highlighted = i === image;
		} else for (var i = 0; i < images.length; ++i) {
			images[i].highlighted = images[i] === image;
		}this.invalidate();
	};

	this['getImages'] =
	/**
  * @summary Get an array of all images of the plot
  * @return {Array<Thumbnail>}
  */
	this.getImages = imageViewer.getImages;

	// >>> Mouse handlers

	var mouseOverDatapoint = -1,
	    pointDragDownPos = null,
	    viewDragStartPos = null,
	    viewDragX,
	    viewDragY,
	    viewDragZ;
	var mouseOverAxisLabel = null,
	    mouseOverImage = null,
	    imageDragStartPos = null,
	    imageDragImages = [];

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
	this['onMouseDown'] = function (event) {
		// Default mouse-down handler
		switch (event.button) {
			// On left mouse button: Enable point selection and dragging events.
			//                       If control button is pressed, initiate view dragging, else, enable lasso selection
			case 0:
				event['pointSelection'] = true;
				event['pointDragging'] = true;
				if (ctrlPressed) event['viewDragging'] = true;else event['lassoSelection'] = true;
				break;

			// On middle mouse button: Initiate view dragging
			case 1:
				event['viewDragging'] = true;
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
	this['onMouseOverDatapoint'] = null;
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
	this['onMouseOverAxisLabel'] = null;
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
	this['onSelectionChanged'] = null;
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
	this['onLassoSelection'] = null;
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
	this['onThumbnailSelectionChanged'] = null;
	var ctrlPressed = false,
	    shiftPressed = false;
	var CTRL = navigator.appVersion.indexOf("Mac") == -1 ? 17 : 224;
	addKeyDownHandler(function (event) {
		if (event.keyCode === CTRL) ctrlPressed = true;else if (event.keyCode === 16) shiftPressed = true;
	});
	addKeyUpHandler(function (event) {
		if (event.which === CTRL) ctrlPressed = false;else if (event.keyCode === 16) shiftPressed = false;
	});
	canvas.oncontextmenu = function () {
		return false;
	}; // Disable canvas context menu
	canvas.onmousedown = function (event) {
		if (tf === null || offscreenRendering !== null) return;

		// Compute mousepos in canvas space -> p
		var canvasBounds = canvas.getBoundingClientRect();
		var p = new Float32Array([event.clientX - canvasBounds.left, event.clientY - canvasBounds.top, event.clientY - canvasBounds.top]);

		// Fire mouse-down handler
		this['onMouseDown'](event);

		if (event['viewDragging']) // If mouse-down handler set ['viewDragging'] property to a truthy value
			{
				if (p[0] > plotBounds.x + plotBounds.width) {
					viewDragX = viewDragY = false;
					viewDragZ = colormap.visible;
				} else {
					viewDragX = p[0] >= plotBounds.x;
					viewDragY = p[1] <= plotBounds.y + plotBounds.height;
					viewDragZ = false;
				}

				// Transform mousepos from canvas space to device coordinates
				p[0] = 2 * p[0] / canvasBounds.width - 1;
				p[1] = 1 - 2 * p[1] / canvasBounds.height;
				p[2] = 1 - (p[2] - plotBounds.y) / plotBounds.height;

				if (viewDragX || viewDragY || viewDragZ) viewDragStartPos = p; // Initiate view dragging
				return; // Prevent other mouse-down events
			} else {
			// Transform mousepos from canvas space to device coordinates
			p[0] = 2 * p[0] / canvasBounds.width - 1;
			p[1] = 1 - 2 * p[1] / canvasBounds.height;
		}

		var selectedImage = imageViewer.imageFromPoint(tf, p);
		if (!shiftPressed && !ctrlPressed && imageDragImages.length !== 0 && (selectedImage === null || imageDragImages.indexOf(selectedImage) === -1)) {
			// Deselect images
			imageDragImages.forEach(function (image) {
				return image.highlighted = false;
			});
			imageDragImages = [];
			this.invalidate();
			if (this['onThumbnailSelectionChanged'] !== null) this['onThumbnailSelectionChanged'](dataset, []);
		}
		if (selectedImage !== null) {
			selectedImage.highlighted = true;
			if (imageDragImages.indexOf(selectedImage) === -1) imageDragImages.push(selectedImage);
			if (options['enableThumbnailDragging']) imageDragStartPos = p; // Initiate image dragging
			this.invalidate();
			if (event['pointSelection'] && this['onSelectionChanged'] !== null) this['onSelectionChanged'](dataset, []);
			if (this['onThumbnailSelectionChanged'] !== null) this['onThumbnailSelectionChanged'](dataset, imageDragImages);
			return; // Prevent other mouse-down events
		}

		// Transform p from device coordinates to dataset coordinates
		tf.deviceCoordToDatasetCoord(p, p);

		var closest = Number.MAX_VALUE,
		    closestIndex = -1,
		    sqDist;
		var sqscl0 = tf.getScale(0) * tf.getScale(0),
		    sqscl1 = tf.getScale(1) * tf.getScale(1);
		var v0 = dataset.dataVectors[activeInputs[0]],
		    v1 = dataset.dataVectors[activeInputs[1]];
		pointViewer.points.forEach(function (i) {
			sqDist = sqscl0 * Math.pow(p[0] - v0.getValue(i), 2) + sqscl1 * Math.pow(p[1] - v1.getValue(i), 2);
			if (sqDist < closest) {
				closest = sqDist;
				closestIndex = i;
			}
		});

		// Get closest dataset coordinates in dataset coordinates -> dp
		var dp = new Float32Array([v0.getValue(closestIndex), v1.getValue(closestIndex)]);

		// Transform dp from dataset coordinates to canvas coordinates
		tf.datasetCoordToDeviceCoord(dp, dp);
		dp[0] = (0.5 + 0.5 * dp[0]) * canvasBounds.width;
		dp[1] = (0.5 - 0.5 * dp[1]) * canvasBounds.height;

		sqDist = Math.pow(event.clientX - canvasBounds.left - dp[0], 2) + Math.pow(event.clientY - canvasBounds.top - dp[1], 2);
		if (sqDist > Math.pow(options['pointSize'] / 2.0, 2)) {
			if ((event['lassoSelection'] || event['polygonLassoSelection']) && this['onLassoSelection'] !== null) {
				if (event['polygonLassoSelection']) mousePolygon = [];else mouseRect = { x: event.clientX - canvasBounds.left, y: event.clientY - canvasBounds.top, width: 0, height: 0 };
			}
			if (event['pointSelection'] && this['onSelectionChanged'] !== null) this['onSelectionChanged'](dataset, []);
		} else {
			if (event['pointDragging']) pointDragDownPos = [dp[0], dp[1], closestIndex]; // (This makes sure pointDragDownPos is centered on the selected datapoint)
			if (event['pointSelection'] && this['onSelectionChanged'] !== null) this['onSelectionChanged'](dataset, [closestIndex]);
		}
	}.bind(this);
	var onmousemove;
	addMouseMoveHandler(onmousemove = function (event) {
		if (tf === null || offscreenRendering !== null || event.target !== canvas && pointDragDownPos === null && viewDragStartPos === null && imageDragStartPos === null && mouseRect === null && mousePolygon === null) return;

		// Compute mousepos in canvas space -> p
		var canvasBounds = canvas.getBoundingClientRect();
		var p = new Float32Array([event.clientX - canvasBounds.left, event.clientY - canvasBounds.top, event.clientY - canvasBounds.top]);

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
			var scale = 1 / (dataset.dataVectors[activeInputs[3]].getValue(pointDragDownPos[2]) * tf.getScale(3)) + tf.getOffset(3);
			//console.log(scale);

			pointDrag = [scale * (p[0] - pointDragDownPos[0]), scale * (p[1] - pointDragDownPos[1])];
			this.invalidate();
			return;
		}

		if (this['onMouseOverAxisLabel']) {
			var newMouseOverAxisLabel = coordSys.labelFromPoint(plotBounds, p);
			if (newMouseOverAxisLabel !== mouseOverAxisLabel) {
				if ((mouseOverAxisLabel = newMouseOverAxisLabel) !== null) this['onMouseOverAxisLabel'](dataset.dataVectors[activeInputs[mouseOverAxisLabel]], coordSys.getLabelBounds(plotBounds, mouseOverAxisLabel));else this['onMouseOverAxisLabel'](null, null);
			}
		}

		// Transform mousepos from canvas space to device coordinates
		p[0] = 2 * p[0] / canvasBounds.width - 1;
		p[1] = 1 - 2 * p[1] / canvasBounds.height;
		p[2] = 1 - (p[2] - plotBounds.y) / plotBounds.height;

		var d0 = activeInputs[0],
		    d1 = activeInputs[1];

		if (viewDragStartPos) {
			var d2 = activeInputs[2];
			var viewDelta = vec3.create();
			tf.deviceDistToDatasetDist(viewDelta, vec3.subtract(viewDelta, p, viewDragStartPos));

			if (viewDragX) tf.translate(d0, viewDelta[0]);
			if (viewDragY) tf.translate(d1, viewDelta[1]);
			if (viewDragZ) tf.translate(d2, viewDelta[2]);
			viewDragStartPos = p;
			return;
		}

		if (imageDragStartPos) {
			var imageDelta = vec2.create();
			tf.deviceDistToDatasetDist(imageDelta, vec2.subtract(imageDelta, p, imageDragStartPos));
			imageDragImages.forEach(function (image) {
				image.imagePos[activeInputs[0]] += imageDelta[0];
				image.imagePos[activeInputs[1]] += imageDelta[1];
			});
			imageDragStartPos = p;
			this.invalidate();
			return;
		}

		if (mouseOverImage != null && imageDragImages.indexOf(mouseOverImage) === -1) {
			mouseOverImage.highlighted = false;
			this.invalidate();
			mouseOverImage = null;
		}
		mouseOverImage = imageViewer.imageFromPoint(tf, p);
		if (mouseOverImage != null) {
			if (imageDragImages.indexOf(mouseOverImage) === -1) {
				mouseOverImage.highlighted = true;
				this.invalidate();
			}
			if (mouseOverDatapoint !== -1) {
				mouseOverDatapoint = -1;
				if (this['onMouseOverDatapoint'] !== null) this['onMouseOverDatapoint'](dataset, mouseOverDatapoint);
			}
			return;
		}

		// Transform p from device coordinates to dataset coordinates
		tf.deviceCoordToDatasetCoord(p, p);

		var closest = Number.MAX_VALUE,
		    closestIndex = -1,
		    sqDist;
		var sqscl0 = tf.getScale(0) * tf.getScale(0),
		    sqscl1 = tf.getScale(1) * tf.getScale(1);
		var v0 = dataset.dataVectors[d0],
		    v1 = dataset.dataVectors[d1];
		pointViewer.points.forEach(function (i) {
			sqDist = sqscl0 * Math.pow(p[0] - v0.getValue(i), 2) + sqscl1 * Math.pow(p[1] - v1.getValue(i), 2);
			if (sqDist < closest) {
				closest = sqDist;
				closestIndex = i;
			}
		});

		// Get closest dataset coordinates in dataset coordinates -> dp
		var dp = new Float32Array([v0.getValue(closestIndex), v1.getValue(closestIndex)]);

		// Transform dp from dataset coordinates to canvas coordinates
		tf.datasetCoordToDeviceCoord(dp, dp);
		dp[0] = (0.5 + 0.5 * dp[0]) * canvasBounds.width;
		dp[1] = (0.5 - 0.5 * dp[1]) * canvasBounds.height;

		sqDist = Math.pow(event.clientX - canvasBounds.left - dp[0], 2) + Math.pow(event.clientY - canvasBounds.top - dp[1], 2);
		if (sqDist > Math.pow(options['pointSize'] / 2.0, 2)) {
			if (mouseOverDatapoint !== -1) {
				mouseOverDatapoint = -1;
				if (this['onMouseOverDatapoint'] !== null) this['onMouseOverDatapoint'](dataset, mouseOverDatapoint);
			}
		} else {
			if (mouseOverDatapoint !== closestIndex) {
				mouseOverDatapoint = closestIndex;
				if (this['onMouseOverDatapoint'] !== null) this['onMouseOverDatapoint'](dataset, mouseOverDatapoint);
			}
		}
	}.bind(this));
	addMouseUpHandler(function (event) {
		if (tf === null || offscreenRendering !== null || event.target !== canvas && pointDragDownPos === null && viewDragStartPos === null && mouseRect === null) return;

		var invalidate = false;
		if (pointDragDownPos !== null) {
			pointDragDownPos = pointDrag = null;
			invalidate = true;
		}
		viewDragStartPos = imageDragStartPos = null;
		if (mousePolygon !== null) {
			if (this['onSelectionChanged'] !== null && mousePolygon.length >= 3) {
				//TODO: Find points within mousePolygon -> selection

				// Transform mousePolygon from canvas space to dataset coordinates
				for (var i = 0; i < mousePolygon.length; ++i) {
					var p = mousePolygon[i];

					// Transform p from canvas space to device coordinates
					p[0] = 2 * p[0] / canvas.width - 1;
					p[1] = 1 - 2 * p[1] / canvas.height;

					// Transform p from device coordinates to dataset coordinates
					tf.deviceCoordToDatasetCoord(p, p);

					mousePolygon[i] = p;
				}

				// Close polygon
				mousePolygon.push(mousePolygon[0]);

				var px,
				    py,
				    selection = [];
				var v0 = dataset.dataVectors[activeInputs[0]],
				    v1 = dataset.dataVectors[activeInputs[1]];
				pointViewer.points.forEach(function (i) {
					px = v0.getValue(i);
					py = v1.getValue(i);
					;
					if (pointInsidePolygon([px, py], mousePolygon)) selection.push(i);
				});
				this['onLassoSelection'](dataset, selection, mousePolygon);
			}

			mousePolygon = null;
			invalidate = true;
		}
		if (mouseRect !== null) {
			if (this['onSelectionChanged'] !== null && mouseRect.width != 0 && mouseRect.height != 0) {
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
				mouseRect.l = 2 * mouseRect.x / canvas.width - 1;
				mouseRect.r = 2 * (mouseRect.x + mouseRect.width) / canvas.width - 1;
				mouseRect.t = 1 - 2 * (mouseRect.y + mouseRect.height) / canvas.height;
				mouseRect.b = 1 - 2 * mouseRect.y / canvas.height;

				// Transform mouseRect from device coordinates to dataset coordinates
				var p = new Float32Array([mouseRect.l, mouseRect.t]);
				tf.deviceCoordToDatasetCoord(p, p);
				mouseRect.l = p[0];mouseRect.t = p[1];
				p = new Float32Array([mouseRect.r, mouseRect.b]);
				tf.deviceCoordToDatasetCoord(p, p);
				mouseRect.r = p[0];mouseRect.b = p[1];

				var px,
				    py,
				    selection = [];
				var v0 = dataset.dataVectors[activeInputs[0]],
				    v1 = dataset.dataVectors[activeInputs[1]];
				pointViewer.points.forEach(function (i) {
					px = v0.getValue(i);
					py = v1.getValue(i);
					if (px >= mouseRect.l && px < mouseRect.r && py >= mouseRect.t && py < mouseRect.b) selection.push(i);
				});
				this['onLassoSelection'](dataset, selection, mouseRect);
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
		if (this['onMouseOverAxisLabel'] && mouseOverAxisLabel !== null) {
			this['onMouseOverAxisLabel'](null, null);
			mouseOverAxisLabel = null;
		}

		if (this['onMouseOverDatapoint'] !== null && mouseOverDatapoint !== -1) this['onMouseOverDatapoint'](dataset, mouseOverDatapoint = -1);
	}.bind(this);
	addMouseWheelHandler(function (event) {
		if (event.target !== canvas || !options['enableScrolling']) return;
		var deltaZ = event.wheelDelta == null ? event.detail : -event.wheelDelta / 20.0;
		event.preventDefault();

		// Compute mousepos in canvas space -> p
		var canvasBounds = canvas.getBoundingClientRect();
		var p = new Float32Array([event.clientX - canvasBounds.left, event.clientY - canvasBounds.top, event.clientY - canvasBounds.top]);

		var scrollX, scrollY, scrollZ;
		if (p[0] > plotBounds.x + plotBounds.width) {
			scrollX = scrollY = false;
			scrollZ = true;
		} else {
			scrollX = p[0] >= plotBounds.x;
			scrollY = p[1] < canvas.height - plotBounds.y;
			scrollZ = false;
		}

		// Transform mousepos from canvas space to device coordinates
		p[0] = 2 * p[0] / canvasBounds.width - 1;
		p[1] = 1 - 2 * p[1] / canvasBounds.height;
		p[2] = 1 - (p[2] - plotBounds.y) / plotBounds.height;

		var d0 = activeInputs[0],
		    d1 = activeInputs[1],
		    d2 = activeInputs[2];

		// Transform p from device coordinates to dataset coordinates
		tf.deviceCoordToDatasetCoord(p, p);

		// Zoom towards mouse position
		var zoom = 1.0 - deltaZ / 50.0;
		vec3.scaleAndAdd(p, p, p, -zoom); // Offset is difference between p in current zoom level and p after zooming
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
	}.bind(this));

	this['ondragover'] = null;
	canvas.ondragover = function (event) {
		if (this['ondragover'] !== null) this['ondragover'](event);
	}.bind(this);
	this['ondrop'] = null;
	canvas.ondrop = function (event) {
		if (this['ondrop'] !== null) this['ondrop'](event);
	}.bind(this);

	// >>> Offscreen Rendering

	var offscreenRendering = null;
	this['enableOffscreenRendering'] = this.enableOffscreenRendering = function (width, height) {
		if (offscreenRendering !== null) return;
		offscreenRendering = {};

		gl.width = canvas.width = width;
		gl.height = canvas.height = height;

		trc.enableOffscreenRendering(width, height);

		// Disable continuous rendering
		offscreenRendering.enableContinuousRendering = options['enableContinuousRendering'];
		if (offscreenRendering['enableContinuousRendering']) this.setOption('enableContinuousRendering', false);

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
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);*/

		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, offscreenRendering.rttTexture, 0); // Bind framebuffer
		//gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, offscreenRendering.rttRenderbuffer); // Bind depth buffer

		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);

		// Set viewport
		gl.viewportWidth = width;
		gl.viewportHeight = height;
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

		if (options['padding']) setPlotBounds(options['padding']);
	};
	this['disableOffscreenRendering'] = this.disableOffscreenRendering = function () {
		if (offscreenRendering === null) return;

		trc.disableOffscreenRendering();

		// Remove framebuffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.deleteFramebuffer(offscreenRendering.rttFramebuffer);

		// Restore viewport
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

		//if (options['padding'])
		//	setPlotBounds(options['padding']);

		// Reenable continuous rendering
		if (offscreenRendering['enableContinuousRendering']) this.setOption('enableContinuousRendering', true);

		offscreenRendering = null;

		onresize();
	};
	this['renderOffscreenBuffer'] = this.renderOffscreenBuffer = function () {
		// Render scene
		render(true);
		gl.finish();
	};
	this['saveOffscreenBuffer'] = this.saveOffscreenBuffer = function () {
		// Read pixels
		var data = new Uint8Array(gl.viewportWidth * gl.viewportHeight * 4);
		gl.readPixels(0, 0, gl.viewportWidth, gl.viewportHeight, gl.RGBA, gl.UNSIGNED_BYTE, data);

		// Create a temporary 2D canvas to store the result -> tempCanvas
		var tempCanvas = document.createElement('canvas');
		tempCanvas.width = gl.viewportWidth;
		tempCanvas.height = gl.viewportHeight;
		var tempContext = tempCanvas.getContext('2d');

		// Copy the pixels to the 2D canvas
		var imageData = tempContext.createImageData(tempCanvas.width, tempCanvas.height);
		imageData.data.set(data);
		tempContext.putImageData(imageData, 0, 0);
		tempContext.drawImage(trc.getCanvas(), 0, 0);
		var dataURL = tempCanvas.toDataURL();

		// Free tempCanvas
		tempCanvas = null;

		return dataURL;
	};

	// >>> Initialize global view

	gl.disable(gl.CULL_FACE);
	gl.enable(gl.BLEND);
	gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
	gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
	gl.clearColor.apply(gl, gl.backColor);

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
var Viewer = function Viewer() {};
/** @type  {Function} */Viewer.prototype.render;
/** @type  {function(Dataset, Object)} */Viewer.prototype.setDataset;
/** @type  {function(Object, boolean)} */Viewer.prototype.onOptionsChanged;
/** @type  {function(Array<number>, Array<number>, Object)} */Viewer.prototype.onInputChanged;
/** @type  {function(Object)} */Viewer.prototype.onPlotBoundsChanged;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGLUtils", function() { return WebGLUtils; });
/* harmony export (immutable) */ __webpack_exports__["requestAnimFrame"] = requestAnimFrame;
/**
 * @license
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

/* eslint-disable */

var WebGLUtils = function () {

  /**
   * Creates the HTLM for a failure message
   * @param {string} msg
   * @return {string} The html.
   */
  var makeFailHTML = function makeFailHTML(msg) {
    return '' + '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' + '<td align="center">' + '<div style="display: table-cell; vertical-align: middle;">' + '<div style="">' + msg + '</div>' + '</div>' + '</td></tr></table>';
  };

  /**
   * Message for getting a webgl browser
   * @type {string}
   */
  var GET_A_WEBGL_BROWSER = '' + 'This page requires a browser that supports WebGL.<br/>' + '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

  /**
   * Mesasge for need better hardware
   * @type {string}
   */
  var OTHER_PROBLEM = '' + "It doesn't appear your computer can support WebGL.<br/>" + '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

  /**
   * Creates a webgl context. If creation fails it will
   * change the contents of the container of the <canvas>
   * tag to an error message with the correct links for WebGL.
   * @param {HTMLCanvasElement} canvas The canvas element to create a context from.
   * @param {*=} opt_attribs Any creation attributes you want to pass in.
   * @param {function(string)=} opt_onError A function to call if there is an error during creation.
   * @return {WebGLRenderingContext} The created context.
   */
  var setupWebGL = function setupWebGL(canvas, opt_attribs, opt_onError) {
    function handleCreationError(msg) {
      var container = canvas.parentNode;
      if (container) {
        var str = window.WebGLRenderingContext ? OTHER_PROBLEM : GET_A_WEBGL_BROWSER;
        if (msg) {
          str += "<br/><br/>Status: " + msg;
        }
        container.innerHTML = makeFailHTML(str);
      }
    };

    opt_onError = opt_onError || handleCreationError;

    if (canvas.addEventListener) {
      canvas.addEventListener("webglcontextcreationerror", function (event) {
        opt_onError(event.statusMessage);
      }, false);
    }
    var context = create3DContext(canvas, opt_attribs);
    if (!context) {
      if (!window.WebGLRenderingContext) {
        opt_onError("");
      }
    }
    return context;
  };

  /**
   * Creates a webgl context.
   * @param {!HTMLCanvasElement} canvas The canvas tag to get context
   *     from. If one is not passed in one will be created.
   * @return {WebGLRenderingContext|null} The created context.
   */
  var create3DContext = function create3DContext(canvas, opt_attribs) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = /** @type {WebGLRenderingContext} */canvas.getContext(names[ii], opt_attribs);
      } catch (e) {}
      if (context) {
        break;
      }
    }
    return context;
  };

  return {
    create3DContext: create3DContext,
    setupWebGL: setupWebGL
  };
}();

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
var window_requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function FrameRequestCallback */callback, /* DOMElement Element */element) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
function requestAnimFrame(callback) {
  // Initially tried exporting window_requestAnimFrame directly, but got "Illegal Invocation". 
  // probably related to this: https://stackoverflow.com/questions/10743596/why-are-certain-function-calls-termed-illegal-invocations-in-javascript
  window_requestAnimFrame(callback);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["rgbStringToFloatArray"] = rgbStringToFloatArray;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function linspace(first, second, last) {
	var offset = second - first;
	var halfOffset = 0.5 * offset;
	var values = [first],
	    i = 0;
	while (values[i] + halfOffset < last) {
		values.push(first + ++i * offset);
	}values[i] = last;
	console.log(values);
	return new Float32Array(values);
}
//linspace(1, 1.1, 10);

function isUndefined(x) {
	return typeof x === 'undefined';
}

function isFunction(x) {
	return typeof x === 'function';
}

function isArray(x) {
	return Object.prototype.toString.call(x) === "[object Array]";
}

function isString(x) {
	return typeof x === 'string';
}

function isNumber(x) {
	return typeof x === 'number';
}

function isObject(x) {
	var t = typeof x === 'undefined' ? 'undefined' : _typeof(x);
	return t !== 'undefined' && t !== 'function' && t !== 'string' && t !== 'number' && Object.prototype.toString.call(x) !== "[object Array]";
}
function isCloneable(x) {
	return !(isFunction(x) || x instanceof WebGLTexture); //TODO: Add more
}

Array.create = function (n, func) {
	var array = new Array(n);
	if (isFunction(func)) for (var i = 0; i < n; ++i) {
		array[i] = func(i);
	} else array.fill(func);
	return array;
};
Array.prototype.minIndex = function () {
	return this.reduce(function (smallestIndex, currentValue, currentIndex, arr) {
		return currentValue < arr[smallestIndex] ? currentIndex : smallestIndex;
	}, 0);
};
Array.prototype.maxIndex = function () {
	return this.reduce(function (smallestIndex, currentValue, currentIndex, arr) {
		return currentValue > arr[smallestIndex] ? currentIndex : smallestIndex;
	}, 0);
};

if (!String.prototype.format) {
	/**
  * Source: http://stackoverflow.com/a/4673436
  * @param {...*} var_args
  */
	String.prototype.format = function (var_args) {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}
/**
	 * Source: http://stackoverflow.com/a/4673436
	 * @param {RegExp} pattern
	 * @param {string} mismatch
	 * @param {...*} var_args
	 */
String.prototype.format2 = function (pattern, mismatch, var_args) {
	var args = arguments;
	return this.replace(pattern, function (match, number) {
		number = Number.parseInt(number, 10) + 2;
		return typeof args[number] != 'undefined' ? args[number] : mismatch;
	});
};

function makeCloneable(obj) {
	if (!isObject(obj)) // If obj isn't an object
		return obj; // Return obj as is

	// Check all properties of obj
	for (var prop in obj) {
		if (!isCloneable(obj[prop])) // If obj has at least on non-cloneable property
			{
				// Create a new object and clone all cloneable properties into that new object
				var obj_subset = {};
				for (prop in obj) {
					if (isCloneable(obj[prop])) obj_subset[prop] = obj[prop];
				}return obj_subset;
			}
	} // If obj doesn't have type functions
	return obj; // Return obj as is
};

function getScript(id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	return str;
}

function colorNameToHex(color) // Source: https://stackoverflow.com/a/1573141
{
	var colors = {
		"aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
		"beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2",
		"brown": "#a52a2a", "burlywood": "#deb887", "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50",
		"cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff", "darkblue": "#00008b", "darkcyan": "#008b8b",
		"darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b",
		"darkolivegreen": "#556b2f", "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a",
		"darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3",
		"deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff", "firebrick": "#b22222", "floralwhite": "#fffaf0",
		"forestgreen": "#228b22", "fuchsia": "#ff00ff", "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520",
		"gray": "#808080", "green": "#008000", "greenyellow": "#adff2f", "honeydew": "#f0fff0", "hotpink": "#ff69b4", "indianred ": "#cd5c5c",
		"indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c", "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00",
		"lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
		"lightgray": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa",
		"lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "lime": "#00ff00",
		"limegreen": "#32cd32", "linen": "#faf0e6", "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd",
		"mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a",
		"mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1",
		"moccasin": "#ffe4b5", "navajowhite": "#ffdead", "navy": "#000080", "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23",
		"orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6", "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee",
		"palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd",
		"powderblue": "#b0e0e6", "purple": "#800080", "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
		"saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d",
		"silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f",
		"steelblue": "#4682b4", "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0", "violet": "#ee82ee",
		"wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5", "yellow": "#ffff00", "yellowgreen": "#9acd32"
	};
	return colors[color.toLowerCase()];
}

function hexToRgb(hex) // Source: https://stackoverflow.com/a/5624139
{
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function rgbStringToFloatArray(rgbstr) {
	var rgb = rgbstr.match(/\d+/g);
	for (var i = 0; i < 4; ++i) {
		rgb[i] = i < rgb.length ? Math.max(0x00, Math.min(0xFF, rgb[i] / 0xFF)) : 1.0;
	}return rgb;
}

function i24ToFloatArray(clr) {
	return [(clr >> 16 & 0xFF) / 255.0, (clr >> 8 & 0xFF) / 255.0, (clr >> 0 & 0xFF) / 255.0, 1.0];
}

function F32toI24(floats, bounds) {
	var bytes = new Uint8Array(4 * floats.length);
	var i = 0,
	    voffset = -bounds[0],
	    vscale = 0xFFFFFE / (bounds[1] - bounds[0]);
	floats.forEach(function (value) {
		value += voffset;
		value *= vscale;
		value = Math.floor(value);
		value = Math.max(0, value);
		value = Math.min(0xFFFFFE, value);
		++value;
		bytes[i + 0] = value >> 16 & 0xFF;
		bytes[i + 1] = value >> 8 & 0xFF;
		bytes[i + 2] = value >> 0 & 0xFF;
		bytes[i + 3] = 255;
		i += 4;
	});
	return bytes;
}
function F32toI24flipY(floats, bounds, width, height) {
	var bytes = new Uint8Array(4 * floats.length);
	var i = 0,
	    voffset = -bounds[0],
	    vscale = 0xFFFFFE / (bounds[1] - bounds[0]);
	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			//var value = Math.floor((floats[(height - y - 1) * width + x] - bounds[0]) * vscale) + 1;
			var value = floats[(height - y - 1) * width + x];
			value += voffset;
			value *= vscale;
			value = Math.floor(value);
			value = Math.max(0, value);
			value = Math.min(0xFFFFFE, value);
			++value;
			bytes[i + 0] = value >> 16 & 0xFF;
			bytes[i + 1] = value >> 8 & 0xFF;
			bytes[i + 2] = value >> 0 & 0xFF;
			bytes[i + 3] = 255;
			i += 4;
		}
	}return bytes;
}

function hsv2rgb(hsv) // Source: https://stackoverflow.com/a/6930407
{
	if (hsv[1] <= 0.000001) return [hsv[2], hsv[2], hsv[2]];
	var hh, p, q, t, ff, i, out;

	hh = hsv[0];
	if (hh >= 1.0) hh = 0.0;
	hh *= 6.0;
	i = Math.floor(hh);
	ff = hh - i;
	p = hsv[2] * (1.0 - hsv[1]);
	q = hsv[2] * (1.0 - hsv[1] * ff);
	t = hsv[2] * (1.0 - hsv[1] * (1.0 - ff));

	switch (i) {
		case 0:
			return [hsv[2], t, p];
		case 1:
			return [q, hsv[2], p];
		case 2:
			return [p, hsv[2], t];
		case 3:
			return [p, q, hsv[2]];
		case 4:
			return [t, p, hsv[2]];
		default:
			return [hsv[2], p, q];
	}
}

function urlExists(url, onTrue, onFalse, isAsync) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 404 && onFalse) onFalse();
		if (this.readyState == 4 && this.status != 404 && onTrue) onTrue();
	};
	request.open('HEAD', url, !(isAsync === false));
	request.overrideMimeType("text/csv; charset=utf8");
	request.send();
	return request.status != 404;
}

var _downloader;
function download(filename, contentUrl) {
	if (!_downloader) document.body.appendChild(_downloader = document.createElement('a'));

	_downloader.href = contentUrl;
	_downloader.download = filename;
	_downloader.click();
}

function imageUrlFromBytes(bytes, width, height) {
	// Create a temporary 2D canvas to store the result -> tempCanvas
	var tempCanvas = document.createElement('canvas');
	tempCanvas.width = width;
	tempCanvas.height = height;

	// Copy the pixels to the 2D canvas
	var imageData = tempCanvas.getContext('2d').createImageData(width, height);
	imageData.data.set(bytes);
	tempCanvas.getContext('2d').putImageData(imageData, 0, 0);
	var dataURL = tempCanvas.toDataURL();

	// Free tempCanvas
	tempCanvas = null;

	return dataURL;
}

var _seededRandom_seed = 1;
Math.seededRandom = function () {
	// Source: https://stackoverflow.com/a/19303725
	var x = Math.sin(_seededRandom_seed++) * 10000;
	return x - Math.floor(x);
};

Math.clamp = function (f, minimum, maximum) {
	return Math.min(Math.max(f, minimum), maximum);
};

function createCookie(name, value, days) // Source: http://www.quirksmode.org/js/cookies.html
{
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) // Source: http://www.quirksmode.org/js/cookies.html
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; ++i) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function readFloatCookie(name) {
	var cookie = readCookie(name);
	cookie = Number.parseFloat(cookie);
	return isNaN(cookie) ? null : cookie;
}
function readIntCookie(name) {
	var cookie = readCookie(name);
	cookie = Number.parseInt(cookie, 10);
	return isNaN(cookie) ? null : cookie;
}
function eraseCookie(name) // Source: http://www.quirksmode.org/js/cookies.html
{
	createCookie(name, "", -1);
}

function getParameterByName(name, url) // Source: https://stackoverflow.com/a/901144
{
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	    results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addMouseWheelHandler(onmousewheel) // Source: http://www.javascriptkit.com/javatutors/onmousewheel.shtml
{
	var mousewheelevt = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
	if (document.attachEvent) document.attachEvent("on" + mousewheelevt, onmousewheel);else if (document.addEventListener) document.addEventListener(mousewheelevt, onmousewheel, false);
}
function addMouseMoveHandler(onmousemove) {
	if (document.attachEvent) document.attachEvent("onmousemove", onmousemove);else if (document.addEventListener) document.addEventListener("mousemove", onmousemove, false);
}
function addMouseUpHandler(onmouseup) {
	if (document.attachEvent) document.attachEvent("onmouseup", onmouseup);else if (document.addEventListener) document.addEventListener("mouseup", onmouseup, false);
}
function addKeyDownHandler(onkeydown) {
	if (document.attachEvent) document.attachEvent("onkeydown", onkeydown);else if (document.addEventListener) document.addEventListener("keydown", onkeydown, false);
}
function addKeyUpHandler(onkeyup) {
	if (document.attachEvent) document.attachEvent("onkeyup", onkeyup);else if (document.addEventListener) document.addEventListener("keyup", onkeyup, false);
}

// Standard forward-list
/*function ForwardList() {
	function Node(value) {
		this.value = value;
		this.next = null;
	}
	this.front = null;
	this.length = 0;
	
	this.pushFront = function(value)
	{
		var newnode = new Node(value);
		newnode.next = this.front;
		this.front = newnode;
		++this.length;
	}
	this.pushBack = function(value)
	{
		if (this.front === null)
			this.pushFront(value);
		else
		{
			var back = this.front;
			while (back.next !== null)
				back = back.next;
			var newnode = new Node(value);
			back.next = newnode;
			++this.length;
		}
	}
	this.sortedPush = function(value)
	{
		if (this.front === null || this.front.value >= value)
			this.pushFront(value);
		else
		{
			var node = this.front;
			while (node.next !== null && node.next.value < value)
				node = node.next;
			var newnode = new Node(value);
			newnode.next = node.next;
			node.next = newnode;
		}
		++this.length;
	}
	this.toArray = function()
	{
		var array = [];
		for (var node = this.front; node; node = node.next)
			array.push(node.value);
		return array;
	}
	this.print = function()
	{
		var array = [];
		for (var node = this.front; node; node = node.next)
			array.push(node.value);
		console.log(array.join(", "));
	}
	
	ForwardList.sortedMerge = function(a, b) // Source: http://www.geeksforgeeks.org/merge-two-sorted-linked-lists/
	{
		var mergedList = new ForwardList();
		mergedList.length = a.length + b.length;
		
		a = a.front;
		b = b.front;
		var dummy = new Node(null);
		var tail = dummy;
		
		while (a !== null && b!= null) // While neither a nor b run out
		{
			if (a.value <= b.value)
			{
				var newNode = a;
				a = newNode.next;
				newNode.next = tail.next;
				tail.next = newNode;
			}
			else
			{
				var newNode = b;
				b = newNode.next;
				newNode.next = tail.next;
				tail.next = newNode;
			}

			tail = tail.next;
		}
		
		// Concatenate list that didn't run out
		tail.next = a === null ? b : a;
		
		mergedList.front = dummy.next
		return mergedList;
	}
}
//var a = new ForwardList();
//a.sortedPush(10);
//a.sortedPush(15);
//a.sortedPush(5);
//var b = new ForwardList();
//b.sortedPush(2);
//b.sortedPush(3);
//b.sortedPush(20);
//ForwardList.sortedMerge(a, b).print();*/

/**
 * Simple forward-list
 * The first node of the list is the list itself
 * @constructor
 * @package
 */
function ForwardList(value) {
	this.value = value;
	this.next = null;

	this.push = function (value) // Pushes to front
	{
		var newnode = new ForwardList(this.value);
		newnode.next = this.next;
		this.next = newnode;
		this.value = value;
	};
	this.pushBack = function (value) {
		var back = this;
		while (back.next !== null) {
			back = back.next;
		}var newnode = new ForwardList(value);
		back.next = newnode;
	};
	this.sortedPush = function (value) {
		if (value <= this.value) this.push(value);else {
			var node = this;
			while (node.next !== null && node.next.value < value) {
				node = node.next;
			}var newnode = new ForwardList(value);
			newnode.next = node.next;
			node.next = newnode;
		}
	};
	this.toArray = function () {
		var array = [];
		for (var node = this; node; node = node.next) {
			array.push(node.value);
		}return array;
	};
	this.print = function () {
		var array = [];
		for (var node = this; node; node = node.next) {
			array.push(node.value);
		}console.log(array.join(", "));
	};
	this.size = function () {
		var size = 0;
		for (var node = this; node; node = node.next) {
			++size;
		}return size;
	};
	this.forEach = function (callback) {
		for (var node = this; node; node = node.next) {
			callback(node.value);
		}
	};
	ForwardList.sortedMerge = function (a, b) // Source: http://www.geeksforgeeks.org/merge-two-sorted-linked-lists/
	{
		var dummy = new ForwardList(null);
		var tail = dummy;

		while (a !== null && b != null) // While neither a nor b run out
		{
			if (a.value <= b.value) {
				var newNode = a;
				a = newNode.next;
				newNode.next = tail.next;
				tail.next = newNode;
			} else {
				var newNode = b;
				b = newNode.next;
				newNode.next = tail.next;
				tail.next = newNode;
			}

			tail = tail.next;
		}

		// Concatenate list that didn't run out
		tail.next = a === null ? b : a;

		return dummy.next;
	};
}

/**
 * A collection of objects sorted by object[priorityProperty]
 * @constructor
 * @package
 * @param {string} priorityProperty
 */
function PriorityQueue(priorityProperty) {
	var data = [];
	this.length = 0;
	this.push = function (element) {
		++this.length;
		var i,
		    p = element[priorityProperty];
		for (i = 0; i < data.length && data[i][priorityProperty] >= p; i++) {}
		data.splice(i, 0, element);
	};
	this.pop = function () {
		--this.length;
		return data.pop();
	};
	this.shift = function () {
		--this.length;
		return data.shift();
	};
}
/*var queue = new PriorityQueue('p');
queue.push({str: 'high', p: 9});
queue.push({str: 'low', p: 1});
queue.push({str: 'medium-low', p: 3});
queue.push({str: 'medium', p: 5});
queue.push({str: 'medium-low-2', p: 3});
queue.push({str: 'medium-high', p: 7});
queue.push({str: 'very-high', p: 15});
while (queue.length)
	console.log(queue.shift());*/

/**
 * A set container that raises on-changed events whenever the collection is altered
 * @constructor
 * @export
 */
function HashSet(onchanged) {
	/** A dictionary of all values in the hash set @type {!Object<number, boolean>} */var hash = {};
	/** The number of values in this hash set @type {number} */this.length = 0;
	/** A callback to be raised whenever values have been added or deleted @public @type {function()} */this.onchanged = isFunction(onchanged) ? onchanged : function () {};

	this['push'] =
	/**
  * Add a single value into the hash set
  * @param  {number} value
  */
	this.push = function (value) {
		if (hash[value] !== true) {
			hash[value] = true;
			++this.length;
			this.onchanged();
		}
	};

	this['append'] =
	/**
  * Add an iterable list of values into the hash set
  * @param  {Object} values
  */
	this.append = function (values) {
		//var t = performance.now();
		var invalidate = false,
		    self = this;
		values.forEach(function (value) {
			if (hash[value] !== true) {
				hash[value] = true;
				++self.length;
				invalidate = true;
			}
		});
		//console.log('append ' + values.length + ': ' + (performance.now() - t));
		if (invalidate) this.onchanged();
	};

	this['set'] =
	/**
  * Reset the hash set to only contain the given value
  * @param  {number} value
  */
	this.set = function (value) {
		if (this.length !== 1 || hash[value] !== true) {
			hash = {};
			hash[value] = true;
			this.length = 1;
			this.onchanged();
		}
	};

	this['assign'] =
	/**
  * Reset the hash set to only contain the given iterable list of values
  * @param  {Object} values
  */
	this.assign = function (values) {
		if (values.length === 0) {
			this.clear();
			return;
		}

		//var t = performance.now();
		var newHash = {},
		    identical = values.length === this.length;
		values.forEach(function (value) {
			if (identical && hash[value] !== true) identical = false;
			newHash[value] = true;
		});

		hash = newHash;
		this.length = values.length;
		//console.log('assign ' + values.length + ': ' + (performance.now() - t));

		if (identical === false) this.onchanged();
	};

	this['assignRange'] =
	/**
  * Reset the hash set to only contain numbers 0 through n - 1
  * @param  {number} n The number of values to set
  */
	this.assignRange = function (n) {
		if (n <= 0) return;
		//var t = performance.now();
		hash = new Array(n);
		hash.fill(true);
		this.length = n;
		//console.log('assignRange ' + n + ': ' + (performance.now() - t));
		this.onchanged();
	};

	this['erase'] =
	/**
  * Remove the given value from the hash set
  * @param  {number} value The value to remove
  */
	this.erase = function (value) {
		if (hash[value] === true) {
			delete hash[value];
			--this.length;
			this.onchanged();
		}
	};

	this['remove'] =
	/**
  * Remove the given iterable list of values from the hash set
  * @param  {Object} values The values to remove
  */
	this.remove = function (values) {
		//var t = performance.now();
		var invalidate = false,
		    self = this;
		values.forEach(function (value) {
			if (hash[value] === true) {
				delete hash[value];
				--self.length;
				invalidate = true;
			}
		});
		//console.log('remove ' + values.length + ': ' + (performance.now() - t));
		if (invalidate) this.onchanged();
	};

	this['isempty'] =
	/**
  * @return {boolean} True, if the hash set doesn't contain any values
  */
	this.isempty = function () {
		return this.length === 0;
	};

	this['clear'] =
	/**
  * Resets the hash set to an empty set
  */
	this.clear = function () {
		if (this.length !== 0) {
			hash = {};
			this.length = 0;
			this.onchanged();
		}
	};

	this['forEach'] =
	/**
  * Calls the given function once for each value in the hash set
  * @param  {function(number)} callback
  */
	this.forEach = function (callback) {
		//var last = Number.MIN_SAFE_INTEGER, badOrder = 0;
		for (var value in hash) {
			value = Number.parseInt(value, 10);
			//if (value < last) ++badOrder; last = value;
			callback(value);
		}
		//if (badOrder !== 0) console.log('bad order: ' + badOrder + ' times');
	};

	this['get'] =
	/**
  * @return  {Uint32Array} A sorted array of all values in the hash set
  */
	this.get = function () {
		return new Uint32Array(Object.keys(hash).map(Number));
	};

	this['size'] =
	/**
  * @return  {number} The number of values in the hash set
  */
	this.size = function () {
		return this.length;
	};

	this['contains'] =
	/**
  * @param  {number} value
  * @return  {boolean} True, if the given value is part of the hash set
  */
	this.contains = function (value) {
		return hash[value] === true;
	};
}
/*function HashSet(onchanged) // Set-based (slower on Firefox!)
{
	var hash = new Set();
	this.onchanged = isFunction(onchanged) ? onchanged : function() {};
	
	this.push = function(value)
	{
		if (!hash.has(value))
		{
			hash.add(value);
			this.onchanged();
		}
	}
	this.append = function(values)
	{
//var t = performance.now();
		var sizeBefore = hash.size;
		hash = new Set([...hash, ...values]);
		var invalidate = hash.size !== sizeBefore;
//console.log('append ' + values.length + ': ' + (performance.now() - t));
		if (invalidate)
			this.onchanged();
	}
	this.set = function(value)
	{
		if (hash.size !== 1 || !hash.has(value))
		{
			hash = new Set([value]);
			this.onchanged();
		}
	}
	this.assign = function(values)
	{
		if (values.length === 0)
		{
			this.clear();
			return;
		}
		
//var t = performance.now();
		var newHash = new Set(), identical = (values.length === hash.size);
		values.forEach(function(value) {
			if (identical && !hash.has(value))
				identical = false;
			newHash.add(value);
		});
		
		hash = newHash;
//console.log('assign ' + values.length + ': ' + (performance.now() - t));
		
		if (identical === false)
			this.onchanged();
	}
	this.assignRange = function(n)
	{
		if (n <= 0)
			return;
//var t = performance.now();
		hash = new Set();
		for (var i = 0; i < n; ++i)
			hash.add(i);
//console.log('assignRange ' + n + ': ' + (performance.now() - t));
		this.onchanged();
	}
	this.erase = function(value)
	{
		if (hash.has(value))
		{
			hash.delete(value);
			this.onchanged();
		}
	}
	this.remove = function(values)
	{
//var t = performance.now();
		var invalidate = false, self = this;
		values.forEach(function(value) {
			if (hash.has(value))
			{
				hash.delete(value);
				--self.length;
				invalidate = true;
			}
		});
//console.log('remove ' + values.length + ': ' + (performance.now() - t));
		if (invalidate)
			this.onchanged();
	}
	this.isempty = function()
	{
		return hash.size === 0;
	}
	this.clear = function()
	{
		if (hash.size !== 0)
		{
			hash = new Set();
			this.onchanged();
		}
	}
	this.forEach = function(callback)
	{
//var last = Number.MIN_SAFE_INTEGER, badOrder = 0;
		for (var value of hash)
		{
//if (value < last) ++badOrder; last = value;
			callback(value);
		}
//if (badOrder !== 0) console.log('bad order: ' + badOrder + ' times');
	}
	this.get = function()
	{
		return new Uint32Array(hash.keys());
	}
	this.size = function()
	{
		return hash.size;
	}
	this.contains = function(value)
	{
		return hash.has(value);
	}
}*/

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["TextRenderContext"] = TextRenderContext;
/**
 * A helper class that attaches a 2D canvas to the parent div of the given WebGL canvas.
 * This 2D canvas is used to draw text.
 * @constructor
 * @package
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {HTMLCanvasElement} canvas
 */
function TextRenderContext(gl, canvas) {
	var textCanvas = document.createElement('canvas');
	textCanvas.style.backgroundColor = 'transparent';
	textCanvas.style.pointerEvents = 'none';
	textCanvas.style.zIndex = canvas.style.zIndex + 1;
	textCanvas.style.position = "static"; //"absolute";
	//textCanvas.style.left = textCanvas.style.top = "0px";
	textCanvas.style.width = textCanvas.style.height = "100%";
	canvas.parentElement.appendChild(textCanvas);
	var ctx = textCanvas.getContext("2d");
	var _font = ctx.font;
	var fontHeight = ctx.measureText('M').width;

	this.clear = function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = ctx.fillStyle = gl.foreColorString;
	};

	gl.drawText = function (str, x, y, anchor, rotation, color) {
		x = Math.floor(x);
		y = Math.floor(y);

		if (color) ctx.fillStyle = color;

		var offsetV;
		switch (anchor) {
			default:
				// 'topleft'
				ctx.textAlign = "left";
				offsetV = fontHeight;
				break;
			case 'topcenter':
				ctx.textAlign = "center";
				offsetV = fontHeight;
				break;
			case 'topright':
				ctx.textAlign = "right";
				offsetV = fontHeight;
				break;
			case 'middleleft':
				ctx.textAlign = "left";
				offsetV = fontHeight * 0.53;
				break;
			case 'middlecenter':
				ctx.textAlign = "center";
				offsetV = fontHeight * 0.53;
				break;
			case 'middleright':
				ctx.textAlign = "right";
				offsetV = fontHeight * 0.53;
				break;
			case 'bottomleft':
				ctx.textAlign = "left";
				offsetV = 0;
				break;
			case 'bottomcenter':
				ctx.textAlign = "center";
				offsetV = 0;
				break;
			case 'bottomright':
				ctx.textAlign = "right";
				offsetV = 0;
				break;
		}
		if (rotation == 0) ctx.fillText(str, x, y + offsetV);else {
			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(rotation);
			ctx.translate(0, offsetV);
			ctx.fillText(str, 0, 0);
			ctx.restore();
		}

		if (color) ctx.fillStyle = gl.foreColorString;
	};
	gl.measureTextWidth = function (str) {
		return ctx.measureText(str).width;
	};
	gl.measureTextHeight = function () {
		return fontHeight;
	};

	gl.drawRect = function (x, y, width, height) {
		if (width < 0) {
			x += width;
			width = -width;
		}
		if (height < 0) {
			y += height;
			height = -height;
		}

		x = Math.floor(x) + 0.5;
		y = Math.floor(y) + 0.5;
		width = Math.floor(width);
		height = Math.floor(height);

		//ctx.strokeStyle = gl.foreColorString;
		ctx.strokeRect(x, y, width, height);
	};

	gl.drawPolygon = function (points, color) {
		if (points.length < 2) return;

		if (color) ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(points[0][0], points[0][1]);
		for (var i = 1; i < points.length; ++i) {
			ctx.lineTo(points[i][0], points[i][1]);
		}ctx.closePath();
		ctx.stroke();
		if (color) ctx.fillStyle = gl.foreColorString;
	};
	gl.fillPolygon = function (points, color) {
		if (points.length < 2) return;

		if (color) ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(points[0][0], points[0][1]);
		for (var i = 1; i < points.length; ++i) {
			ctx.lineTo(points[i][0], points[i][1]);
		}ctx.closePath();
		ctx.fill();
		if (color) ctx.fillStyle = gl.foreColorString;
	};

	this.setFont = function (font) {
		ctx.font = _font = font;

		// Compute fontHeight (Source: http://stackoverflow.com/a/7462767)
		var body = document.getElementsByTagName("body")[0];
		var dummy = document.createElement("div");
		var dummyText = document.createTextNode("M");
		dummy.appendChild(dummyText);
		dummy.style.font = font;
		body.appendChild(dummy);
		fontHeight = dummy.offsetHeight * 0.62;
		body.removeChild(dummy);
	};

	this.onResize = function () {
		/*var canvasBounds = canvas.getBoundingClientRect();
  textCanvas.style.left = canvasBounds.left;
  textCanvas.style.top = canvasBounds.top;
  textCanvas.style.width = textCanvas.width = canvasBounds.width;
  textCanvas.style.height = textCanvas.height = canvasBounds.height;*/

		if (offscreenRendering !== null) {
			textCanvas.width = offscreenRendering.width;
			textCanvas.height = offscreenRendering.height;
		} else {
			var rect = textCanvas.getBoundingClientRect();
			textCanvas.style.marginTop = -(rect.bottom - rect.top) + "px";
			textCanvas.width = rect.right - rect.left;
			textCanvas.height = rect.bottom - rect.top;
		}
		this.setFont(_font); // Reset canvas font
	};

	var offscreenRendering = null;
	this.enableOffscreenRendering = function (width, height) {
		if (offscreenRendering !== null) return;
		offscreenRendering = {};

		offscreenRendering.width = width;
		offscreenRendering.height = height;
		offscreenRendering.oldCanvas = textCanvas;
		offscreenRendering.oldContext = ctx;
		textCanvas = document.createElement('canvas');
		ctx = textCanvas.getContext("2d");
		this.onResize();
	};
	this.disableOffscreenRendering = function () {
		if (offscreenRendering === null) return;

		textCanvas = offscreenRendering.oldCanvas;
		ctx = offscreenRendering.oldContext;
		offscreenRendering = null;
		//this.onResize();
	};
	this.getCanvas = function () {
		return textCanvas;
	};

	this.onResize();
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = DataVector;
/* harmony export (immutable) */ __webpack_exports__["c"] = Dataset;
/* harmony export (immutable) */ __webpack_exports__["d"] = RandomDataset;
/* harmony export (immutable) */ __webpack_exports__["a"] = CsvDataset;
/* eslint-disable */

// const $ = require("jquery");

/**
 * A vector of data values inside the dataset.
 * The source of a data vector can be either a column in the dataset's data table or a formula.
 * The length of the vector is fixed by the dataset.
 * The DataVector class doesn't store actual values, it only defines functions to read from the dataset.
 * @constructor
 * @export
 * @param {Dataset} dataset The underlying dataset
 * @param {number|string} source Either a column index into the dataset, or a formula
 */
function DataVector(dataset, source) {
	var nc = dataset.numColumns;

	if (isNumber(source)) {
		var c = Math.round(source);
		this['getValue'] = this.getValue = function (i) {
			//return Math.log(dataset.fdata[i * nc + c]);
			return dataset.fdata[i * nc + c];
		};

		//this.getValueCode = "log(c{0})".format(c);
		this.getValueCode = "c" + c; //"{" + c + "}";

		var column = dataset.columns[c];
		this['minimum'] = this.minimum = column.minimum;
		this['maximum'] = this.maximum = column.maximum;
		this.offset = -column.minimum * (this.scale = 1 / (column.maximum - column.minimum));
		this['values'] = this.values = column.values;
		this['label'] = this.label = column.label;
	} else {
		var stack = new Array(16);
		var globalTypes = {
			'n': FormulaCompiler.types.float,
			'PI': FormulaCompiler.types.float,
			'i': FormulaCompiler.types.float
		};
		for (var c = 0; c < nc; ++c) {
			globalTypes['c' + c] = FormulaCompiler.types.float;
		}var globals = {
			'n': dataset.length,
			'PI': Math.PI
		};

		var code = FormulaCompiler.compile(source + ";", globalTypes);
		if (isString(code)) {
			console.error("GlobalView error: Error while parsing data vector formula '{0}'".format(source));
			console.error("                  " + code);
			return;
		}
		var formula = source;
		this.getValueCode = formula;

		this['getValue'] = this.getValue = function (i) {
			globals['i'] = i;
			for (var c = 0; c < nc; ++c) {
				globals['c' + c] = dataset.fdata[i * nc + c];
			}return FormulaCompiler.run(code, stack, globals);
		};

		this.minimum = Number.MAX_VALUE;
		this.maximum = Number.MIN_VALUE;
		for (var i = 0, n = dataset.length; i < n; ++i) {
			var value = this.getValue(i);
			this.minimum = Math.min(this.minimum, value);
			this.maximum = Math.max(this.maximum, value);
		}
		this['minimum'] = this.minimum;
		this['maximum'] = this.maximum;
		//console.log([this.minimum, this.maximum]);
		this.scale = this.maximum - this.minimum;
		if (this.scale > -1e-5 && this.scale < 1e-5) this.offset = 0.5 - 0.5 * (this.minimum + this.maximum) * (this.scale = 0.5);else this.offset = -this.minimum * (this.scale = 1 / this.scale);
		this['values'] = this.values = null;
		this['label'] = this.label = formula;
	}
}

/**
 * A dataset template for the GlobalView scatter plot framework
 * @abstract
 * @constructor
 * @export
 */
function Dataset() {
	/**
  * @summary Number of columns in the {@link Dataset#data} table
  * @type {number}
  */
	this.numColumns = this['numColumns'] = 0;
	/**
  * Note: Each dataVector has exactly 'length' elements
  * @summary Number of rows in the {@link Dataset#data} table
  * @type {number}
  */
	this.length = this['length'] = 0;
	/**
  * @summary Metadata about one column of data in the {@link Dataset#data} table
  * @type {Object}
  * @deprecated Use {@link Dataset#dataVectors} for access to metadata instead
  */
	this.columns = this['columns'] = [];
	/**
  * An input dimension to the plot.
  * A data vector doesn't physically contain data.
  * Instead it holds meta data and a transfer function that produces data based on zero or more columns from the {@link Dataset#fdata} table
  * @summary A logical vector of data
  * @type {Array<DataVector>}
  */
	this.dataVectors = this['dataVectors'] = [];
	/**
  * The data matrix isn't limited to numeric data.
  * Categorical columns are stored as strings.
  * {@link Dataset#dataVectors} access the numeric version of this matrix ({@link Dataset#fdata}).
  * It is of size {@link Dataset#numColumns} by {@link Dataset#length}.
  * @summary A matrix of data
  * @type {Float32Array|Array}
  */
	this.data = this['data'] = [];
	/**
  * This matrix is the numeric version of {@link Dataset#data}.
  * Categorical columns are stored as 0-based indices.
  * @summary A matrix of numeric data for the {@link Dataset#dataVectors}
  * @type {Float32Array}
  */
	this.fdata = this['fdata'] = new Float32Array(0);
	/**
  * This vector is of length {@link Dataset#length}.
  * @summary A vector of data point names
  * @type {Array<string>}
  */
	this.names = this['names'] = null;
	/**
  * This vector is of length {@link Dataset#length}.
  * @summary A vector of data point image URLs.
  * @type {Array<string>}
  */
	this.imageFilenames = this['imageFilenames'] = null;

	/**
  * @type {Array<Array<Object>>}
  */
	var _densityMaps = [];
	/**
  * @type {Array<Array<Object>>}
 */
	var _clusterMaps = [];

	this['isDensityMapReady'] =
	/**
  * Checks if a density map on dimensions d0 and d1 is available.
  * Hint: d0 and d1 can't be identical. The order of d0 and d1 is ignored.
  * @param  {number!} d0
  * @param  {number!} d1
  * @return {boolean!} True, if a densitymap for dimensions d0, d1 has been computed
  */
	this.isDensityMapReady = function (d0, d1) {
		// Validate inputs
		if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) return false;

		// Assure d0 < d1
		if (d0 === d1) return false;
		if (d1 < d0) {
			// Swap d0 <-> d1
			var temp = d0;
			d0 = d1;
			d1 = temp;
		}

		return _densityMaps.length > d0 && _densityMaps[d0].length > d1 && _densityMaps[d0][d1] && (isUndefined(_densityMaps[d0][d1].pending) || _densityMaps[d0][d1].old);
	};

	this['iterateDensityMaps'] =
	/**
  * Calls the given function for each computed density map
  * @param  {function(DensityMap!)!} callback
  */
	this.iterateDensityMaps = function (callback) {
		_densityMaps.forEach(function (_densityMaps) {
			return _densityMaps.forEach(function (densityMap) {
				return densityMap && (isUndefined(densityMap.pending) || densityMap.old) ? callback(densityMap.old || densityMap) : null;
			});
		});
	};

	this['requestDensityMap'] =
	/**
  * This function returns a density map for the given dimensions. If the density map doesn't exist it is computed.
  * When a function is passed to ondone, the density map is computed by a background worker, otherwise it is computed on the current thread.
  * After the worker has finished all ondone events for calls to this function are fired.
  * Hint: d0 and d1 can't be identical. The order of d0 and d1 is ignored.
  * @summary Returns a density map for dimensions d0 and d1.
  * @param  {!number} d0
  * @param  {!number} d1
  * @param  {number=} size=1024 The width and height of the density map
  * @param  {DensityMapOptions=} options
  * @param  {function(DensityMap)=} ondone A function to be called when the density map is ready
  * @return {DensityMap}
  */
	this.requestDensityMap = function (d0, d1, size, options, ondone) {
		// Validate inputs
		if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
			console.warn("GlobalView warning: Requesting density map for dimensions {0}, {1} on a dataset with only {2} data vectors".format(d0, d1, this.dataVectors.length));
			return null;
		}
		var isAsync = isFunction(ondone); //&& !/Firefox/i.test(navigator.userAgent);// Firefox tends to crash with Parallel.js

		// Assure d0 < d1
		if (d0 === d1) return null;
		if (d1 < d0) {
			// Swap d0 <-> d1
			var temp = d0;
			d0 = d1;
			d1 = temp;
		}

		while (_densityMaps.length <= d0) {
			_densityMaps.push([]);
		}while (_densityMaps[d0].length <= d1) {
			_densityMaps[d0].push(null);
		}var densityMap = _densityMaps[d0][d1];

		if (!size) size = 1024;

		if (densityMap && options && densityMap.options && !DensityMapOptions.equals(options, densityMap.options)) // If options changed
			densityMap = null; // Recompute density map

		if (isAsync) // If async
			{
				if (!densityMap) // If _densityMaps[d0][d1] isn't computed or being computed yet
					{
						// While we compute _densityMaps[d0][d1], replace it with an array of functions to execute when it is ready
						_densityMaps[d0][d1] = { pending: [ondone], old: _densityMaps[d0][d1] };

						// Compute histogram synchronously
						var histogram = computeHistogram2D(this, d0, d1, size, size);

						// Execute an asynchronous worker that computes _densityMaps[d0][d1]
						var p = new Parallel([makeCloneable(histogram), new DensityMapOptions(options)], { evalPath: 'eval.js' });
						p.require(DensityMap);
						p.require(computeDensityMap);
						p.spawn(function (params) {
							return computeDensityMap.apply(null, params);
						}).then(function (densityMap) {
							densityMap = new DensityMap(densityMap);
							// Free histogram
							histogram = null;

							// Set _densityMaps[d0][d1]
							_densityMaps[d0][d1].old = null;
							var pending = _densityMaps[d0][d1].pending;
							_densityMaps[d0][d1] = densityMap;

							if (_clusterMaps.length > d0 && _clusterMaps[d0].length > d1 && _clusterMaps[d0][d1] && isUndefined(_clusterMaps[d0][d1].pending)) _clusterMaps[d0][d1] = null;

							// Execute queued 'ondone' functions
							pending.forEach(function (ondone) {
								ondone(densityMap);
							});
						});
					} else if (!isUndefined(densityMap.pending)) // If _densityMaps[d0][d1] is currently being computed asynchronously
					{
						if (densityMap.old && (!options || DensityMapOptions.equals(densityMap.old.options, options))) // If the deprecated densityMap satisfies our requested options
							ondone( /** @type {DensityMap} */densityMap.old);else densityMap.pending.push(ondone);
					} else // If _densityMaps[d0][d1] is available
					ondone( /** @type {DensityMap} */densityMap);
				return null;
			} else {
			if (!densityMap) // If _densityMaps[d0][d1] isn't computed or being computed yet
				{
					//var tStart = performance.now();
					var histogram = computeHistogram2D(this, d0, d1, size, size);
					_densityMaps[d0][d1] = densityMap = new DensityMap(computeDensityMap(histogram, new DensityMapOptions(options)));
					histogram = null; // Free histogram
					//console.log(performance.now() - tStart + "ms");
				} else if (densityMap.old && (!options || DensityMapOptions.equals(densityMap.old.options, options))) // If the deprecated densityMap satisfies our requested options
				densityMap = densityMap.old;else while (!isUndefined(_densityMaps[d0][d1].pending)) {} // Wait while _densityMaps[d0][d1] is being computed asynchronously

			if (isFunction(ondone)) ondone( /** @type {DensityMap} */densityMap);
			return (/** @type {DensityMap} */densityMap
			);
		}
	};

	this['isClusterMapReady'] = this.isClusterMapReady = function (d0, d1) {
		// Validate inputs
		if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) return false;

		// Assure d0 < d1
		if (d0 === d1) return false;
		if (d1 < d0) {
			// Swap d0 <-> d1
			var temp = d0;
			d0 = d1;
			d1 = temp;
		}

		return _clusterMaps.length > d0 && _clusterMaps[d0].length > d1 && _clusterMaps[d0][d1] && (isUndefined(_clusterMaps[d0][d1].pending) || _clusterMaps[d0][d1].old);
	};
	this['requestClusterMap'] = this.requestClusterMap = function (d0, d1, options, ondone) {
		// Validate inputs
		if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
			console.warn("GlobalView warning: Requesting cluster map for dimensions {0}, {1} on a dataset with only {2} data vectors".format(d0, d1, this.dataVectors.length));
			return null;
		}
		var isAsync = isFunction(ondone); //&& !/Firefox/i.test(navigator.userAgent);// Firefox tends to crash with Parallel.js

		// Assure d0 < d1
		if (d0 === d1) return;
		if (d1 < d0) {
			// Swap d0 <-> d1
			var temp = d0;
			d0 = d1;
			d1 = temp;
		}

		while (_clusterMaps.length <= d0) {
			_clusterMaps.push([]);
		}while (_clusterMaps[d0].length <= d1) {
			_clusterMaps[d0].push(null);
		}var clusterMap = _clusterMaps[d0][d1];

		if (clusterMap && options && clusterMap.options && !ClusterMapOptions.equals(options, clusterMap.options)) // If options changed
			clusterMap = null; // Recompute density map

		if (isAsync) // If async
			{
				if (!clusterMap) // If _clusterMaps[d0][d1] isn't computed or being computed yet
					{
						// While we compute _clusterMaps[d0][d1], replace it with an array of functions to execute when it is ready
						_clusterMaps[d0][d1] = { pending: [ondone] };

						this.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
							// Execute an asynchronous worker that computes _clusterMaps[d0][d1]
							var p = new Parallel([makeCloneable(densityMap), d0, d1, new ClusterMapOptions(options)], { evalPath: 'eval.js' });
							p.require(computeClusterMap_method3);
							p.require(ForwardList);
							p.require(PriorityQueue);
							p.spawn(function (params) {
								return computeClusterMap_method3.apply(null, params);
							}).then(function (clusterMap) {
								clusterMap = new ClusterMap(clusterMap);
								// Set _clusterMaps[d0][d1]
								var pending = _clusterMaps[d0][d1].pending;
								_clusterMaps[d0][d1] = clusterMap;

								// Execute queued 'ondone' functions
								pending.forEach(function (ondone) {
									ondone(clusterMap);
								});
							});
						});
					} else if (!isUndefined(clusterMap.pending)) // If _clusterMaps[d0][d1] is currently being computed asynchronously
					{
						if (clusterMap.old && (!options || ClusterMapOptions.equals(clusterMap.old.options, options))) // If the deprecated clusterMap satisfies our requested options
							ondone( /** @type {ClusterMap} */clusterMap.old);else clusterMap.pending.push(ondone);
					} else // If _clusterMaps[d0][d1] is available
					ondone(clusterMap);
			} else {
			if (!clusterMap) // If _clusterMaps[d0][d1] isn't computed or being computed yet
				{
					var densityMap = this.requestDensityMap(d0, d1, undefined, undefined);
					if (densityMap) {
						//var tStart = performance.now();
						_clusterMaps[d0][d1] = clusterMap = new ClusterMap(computeClusterMap_method3(densityMap, d0, d1, new ClusterMapOptions(options)));
						//console.log(performance.now() - tStart + "ms");
					} else _clusterMaps[d0][d1] = clusterMap = null;
				} else if (clusterMap.old && (!options || ClusterMapOptions.equals(clusterMap.old.options, options))) // If the deprecated clusterMap satisfies our requested options
				clusterMap = clusterMap.old;else while (!isUndefined(clusterMap.pending)) {} // Wait while _clusterMaps[d0][d1] is being computed asynchronously

			if (isFunction(ondone)) ondone(clusterMap);
			return clusterMap;
		}
	};

	this['inflate'] = this.inflate = function (factor, densityMapChain) {
		var n = this.length,
		    n_inflated = Math.floor(factor * n),
		    nc = this.numColumns;
		if (isNaN(n_inflated) || n_inflated <= n) return;
		var fdata = this.fdata,
		    fdata_inflated = new Float32Array(n_inflated * nc);
		var data = this.data,
		    data_inflated = new Array(n_inflated * nc);

		for (var i = 0, len = n * nc; i < len; ++i) {
			fdata_inflated[i] = fdata[i];
		}for (var i = 0, len = n * nc; i < len; ++i) {
			data_inflated[i] = data[i];
		}var column,
		    samples,
		    sample,
		    sampleScale = 1 / densityMapChain[0].size;
		for (var i, i_inflated = n, len = n * nc; i_inflated < n_inflated; ++i_inflated) {
			i = i_inflated % n;

			samples = sampleDensityMapChain(densityMapChain);
			for (var c = 0; c < nc; ++c) {
				column = this.columns[c];
				sample = column.minimum + (column.maximum - column.minimum) * samples[c] * sampleScale;

				if (column.values) // If column is qualitative
					{
						fdata_inflated[i_inflated * nc + c] = sample = Math.max(0, Math.min(column.values.length - 1, Math.round(sample)));
						data_inflated[i_inflated * nc + c] = column.values[sample];
					} else // If column is numeric
					{
						fdata_inflated[i_inflated * nc + c] = sample;
						data_inflated[i_inflated * nc + c] = sample;
					}
			}
		}
		this['fdata'] = this.fdata = fdata_inflated;
		this['data'] = this.data = data_inflated;

		if (this.names !== null) {
			var names = /** @type {Array<string>} */this.names,
			    names_inflated = new Array(n_inflated);
			for (var i = 0, len = n; i < len; ++i) {
				names_inflated[i] = names[i];
			}for (var index = 0, i_inflated = n, len = n * nc; i_inflated < n_inflated; ++i_inflated) {
				names_inflated[i_inflated] = "generated datapoint " + ++index;
			}this['names'] = this.names = names_inflated;
		}

		if (this.imageFilenames !== null) {
			var imageFilenames = /** @type {Array<string>} */this.imageFilenames,
			    imageFilenames_inflated = new Array(n_inflated);
			for (var i = 0, len = n; i < len; ++i) {
				imageFilenames_inflated[i] = imageFilenames[i];
			}for (var i_inflated = n, len = n * nc; i_inflated < n_inflated; ++i_inflated) {
				imageFilenames_inflated[i_inflated] = imageFilenames[i_inflated % n];
			}this['imageFilenames'] = this.imageFilenames = imageFilenames_inflated;
		}

		this['length'] = this.length = n_inflated;
	};

	this['save'] = this.save = function (filename, nameColumn, nameColumnLabel) {
		var nc = this.numColumns,
		    csv_nc;
		if (this.names && !isUndefined(nameColumn) && !isUndefined(nameColumnLabel)) csv_nc = nc + 1;else {
			nameColumn = -1;
			csv_nc = nc;
		}

		var csv = new Array(this.length + 1); // +1 ... Header row

		// Create csv header array
		var header = new Array(csv_nc);
		for (var c = 0, ci = 0; c < csv_nc; ++c, ++ci) {
			if (c === nameColumn) {
				header[c] = nameColumnLabel;
				--ci;
			} else header[c] = this.columns[ci].label;
		}
		csv[0] = header;

		// Create csv body arrays
		for (var i = 0; i < this.length; ++i) {
			var row = new Array(csv_nc);
			for (var c = 0, ci = 0; c < csv_nc; ++c, ++ci) {
				if (c === nameColumn) {
					row[c] = this.names[i];
					--ci;
				} else row[c] = this.data[i * nc + ci];
			}
			csv[i + 1] = row; // +1 ... Header row
		}

		download(filename, "data:text/csv;charset=utf-8," + encodeURIComponent($.csv.fromArrays(csv)));
	};
}

// >>> Random dataset

/**
 * A randomly generated dataset
 * @extends {Dataset}
 * @constructor
 * @export
 * @param {number} n Number of rows (points) of the dataset
 * @param {number} nc Number of columns (dimensions) of the dataset
 * @param {function(Dataset)} onload Event handler, called after the dataset was created
 */
function RandomDataset(n, nc, onload) {
	Dataset.call(this);

	this['numColumns'] = this.numColumns = nc;
	this['length'] = this.length = n;
	for (var i = 0; i < nc; ++i) {
		this.columns.push({ minimum: 0, maximum: 1, label: generateColumnName(i, nc) });
		this.dataVectors.push(new DataVector(this, i));
	}

	var nnc = n * nc;
	this['fdata'] = this.fdata = new Float32Array(nnc);
	for (var i = 0; i < nnc; ++i) {
		this.fdata[i] = Math.random();
	}this['data'] = this.data = this.fdata;

	if (onload) onload(this);
}

// >>> CSV dataset

/**
 * A map of valid options for CSV datasets with option descriptions and validation functions
 * @const
 * @enum {{
 * description: string,
 * default: *,
 * valid: Array
 * }}
*/
var CSV_DATASET_OPTIONS = {
	/** When true, tries to infer other options based on the structure of the dataset (slow). */
	'autoDetect': {
		description: "When true, tries to infer other options based on the structure of the dataset (slow).",
		default: false,
		valid: [true, false]
	},

	/** When true, interprets the first row of the dataset as column labels. */
	'hasHeader': {
		description: "When true, interprets the first row of the dataset as column labels.",
		default: false,
		valid: [true, false]
	},

	/** Index of a column of the dataset that contains data point names. */
	'nameColumn': {
		description: "Index of a column of the dataset that contains data point names.",
		default: null,
		valid: null
	},

	/** An array of column labels, or a function that takes the column index as input and returns the column label. */
	'columnLabels': {
		description: "An array of column labels, or a function that takes the column index as input and returns the column label.",
		default: null,
		valid: null
	},

	/** An array of image URLs, or a function that takes a row of data and the row index as input and returns a URL to an image of the data point. */
	'imageFilenames': {
		description: "An array of image URLs, or a function that takes a row of data and the row index as input and returns a URL to an image of the data point.",
		default: null,
		valid: null
	}
};

/**
 * A dataset constructed from a CSV table
 * @extends {Dataset}
 * @constructor
 * @export
 * @param {string|Blob} file File or URL of file, containing the CSV-formatted dataset
 * @param {Object} options
 * @param {function(Dataset)} onload Event handler, called after the dataset was created
 */
function CsvDataset(file, options, onload) {
	Dataset.call(this);

	// Validate options
	for (var option in options) {
		if (!options.hasOwnProperty(option)) continue;

		// Validate option
		if (!CSV_DATASET_OPTIONS.hasOwnProperty(option)) {
			console.warn("CsvDataset warning: Unsupported option: " + option);
			continue;
		}
		var optionDefinition = CSV_DATASET_OPTIONS[option];

		// Validate value
		var value = options[option];
		if (optionDefinition.valid && optionDefinition.valid.indexOf(value) === -1 || optionDefinition.validRange && (value < optionDefinition.validRange[0] || value > optionDefinition.validRange[1])) {
			console.warn("CsvDataset warning: Invalid value for option " + option + ": " + value);
			delete options[option];
			continue;
		}
	}

	// Load csv file
	var dataset = this;
	var parseCsv = function parseCsv(csv) {
		var data = $.csv.toArrays(csv);

		if (options['autoDetect']) {
			if (isUndefined(options['hasHeader'])) {
				// Assume no-header by default
				options['hasHeader'] = false;

				var firstRowOnlyStrings = data[0].every(function (value) {
					return isNaN(parseData(value));
				});
				var secondRowHasNumbers = data[1].some(function (value) {
					return !isNaN(parseData(value));
				});

				// If the first row consists of only string values, but the second row has at least one numeric value, we can assume the first row is a header
				if (firstRowOnlyStrings && secondRowHasNumbers) options['hasHeader'] = true;
				console.log("Assuming hasHeader = " + options['hasHeader']);
			}
			if (isUndefined(options['nameColumn'])) {
				// Assume no name column by default
				options['nameColumn'] = null;

				// If any row consists of only unique strings, we can assume it contains data point names
				for (var c = 0; c < data[0].length; ++c) {
					var valueMap = {};
					if (data.every(function (row) {
						return row.length > c && isNaN(parseData(row[c])) && !(row[c] in valueMap) ? valueMap[row[c]] = true : false;
					})) {
						options['nameColumn'] = c;
						break;
					}
				}
				console.log("Assuming nameColumn = " + options['nameColumn']);
			}
		}

		var n = data.length,
		    nc = data[0].length - (options['nameColumn'] ? 1 : 0),
		    firstRow = options['hasHeader'] ? 1 : 0;
		dataset['numColumns'] = dataset.numColumns = nc;

		// Generate column labels
		var columnLabels;
		if (isFunction(options['columnLabels'])) {
			columnLabels = new Array(n);
			for (var c = 0, ci = 0; c < data[0].length; ++c, ++ci) {
				if (c == options['nameColumn']) {
					--ci;
					continue;
				}

				columnLabels[ci] = options['columnLabels'](c);
			}
		} else if (isArray(options['columnLabels'])) {
			if (options['columnLabels'].length !== nc) {
				console.warn("CsvDataset warning: Number of provided column labels (" + options['columnLabels'].length + ") differs from number of data columns in the dataset (" + nc + ")");
				columnLabels = null;
			} else columnLabels = options['columnLabels'];
		} else columnLabels = null;

		dataset['data'] = dataset.data = new Array(nc * n);
		dataset['fdata'] = dataset.fdata = new Float32Array(nc * n);
		var i, di;
		for (var c = 0, ci = 0; c < data[0].length; ++c, ++ci) {
			if (c == options['nameColumn']) {
				--ci;
				continue;
			}

			// Loop through all values of column c -> value, fvalue, min, max
			var min = Number.MAX_VALUE,
			    max = Number.MIN_VALUE,
			    isNumeric = true;
			for (i = firstRow, di = 0; i < data.length; ++i, ++di) {
				// Skip blank lines
				if (data[i].length === 1 && data[i][0] === "") {
					--di;
					continue;
				}

				var value = data[i][c];
				var fvalue = parseData(value);
				if (isNaN(fvalue)) {
					isNumeric = false;
					break;
				}

				dataset.data[di * nc + ci] = value;
				dataset.fdata[di * nc + ci] = fvalue;
				min = Math.min(min, fvalue);
				max = Math.max(max, fvalue);
			}

			var valueList = null;
			if (!isNumeric) {
				// Loop through all values of column c again, generating a value map -> value, fvalue, min, max
				valueList = [];
				var valueMap = {},
				    valueIdx = 0;
				for (i = firstRow, di = 0; i < data.length; ++i, ++di) {
					// Skip blank lines
					if (data[i].length === 1 && data[i][0] === "") {
						--di;
						continue;
					}

					var value = data[i][c];
					var cls = valueMap[value];
					var fvalue;
					if (typeof cls === 'undefined') {
						valueList.push(value);
						fvalue = valueMap[value] = valueIdx++;
					} else fvalue = cls;

					fvalue += 0.5;

					dataset.data[di * nc + ci] = value;
					dataset.fdata[di * nc + ci] = fvalue;
				}
				min = 0;
				max = valueList.length;
			}

			// Save column meta data
			dataset.columns.push({ minimum: min, maximum: max, label: columnLabels ? columnLabels[ci] : options['hasHeader'] ? data[0][c] : generateColumnName(ci, nc), values: valueList });
			dataset.dataVectors.push(new DataVector(dataset, ci));
		}

		if (di !== n) // If some line were blank
			{
				di = n - di; // Set di to the number of skipped lines
				n -= di; // Shrink n
				di *= nc; // Set di to the number of skipped values

				// Shrink dataset.data and dataset.fdata
				dataset.data.splice(-di);
				if (Float32Array.prototype.splice)
					/** @type {{splice: Function}} */dataset.fdata.splice(-di);else if (Float32Array.prototype.slice) dataset['fdata'] = dataset.fdata = dataset.fdata.slice(0, -di);else {
					var trimedFdata = new Float32Array(nc * n);
					var len;
					for (i = 0, len = trimedFdata.length; i < len; ++i) {
						trimedFdata[i] = dataset.fdata[i];
					}dataset['fdata'] = dataset.fdata = trimedFdata;
				}
			}

		// Set number of data points
		dataset['length'] = dataset.length = n;

		// Extract data point names
		if (options['nameColumn']) {
			var names = dataset['names'] = dataset.names = new Array(n);
			var nameColumn = options['nameColumn'];
			for (i = firstRow, di = 0; i < data.length; ++i, ++di) {
				// Skip blank lines
				if (data[i].length === 1 && data[i][0] === "") {
					--di;
					continue;
				}

				names[di] = data[i][nameColumn];
			}
		} else dataset['names'] = dataset.names = null;

		// Generate image filenames
		if (isFunction(options['imageFilenames'])) {
			dataset['imageFilenames'] = dataset.imageFilenames = new Array(n);
			for (i = firstRow, di = 0; i < data.length; ++i, ++di) {
				// Skip blank lines
				if (data[i].length === 1 && data[i][0] === "") {
					--di;
					continue;
				}

				dataset.imageFilenames[di] = options['imageFilenames'](data[i], i);
			}
		} else if (isArray(options['imageFilenames'])) {
			if (options['imageFilenames'].length !== n) {
				console.warn("CsvDataset warning: Number of provided image filenames (" + options['imageFilenames'].length + ") differs from number of data points (" + n + ")");
				dataset['imageFilenames'] = dataset.imageFilenames = null;
			} else dataset['imageFilenames'] = dataset.imageFilenames = options['imageFilenames'];
		} else dataset['imageFilenames'] = dataset.imageFilenames = null;

		// Notify success
		if (onload) onload(dataset);
	};

	if (isString(file))
		//$.get(file, parseCsv, "text");
		{
			var request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) parseCsv(this.responseText);
			};
			request.open("GET", /** @type {string} */file, true);
			request.overrideMimeType("text/csv; charset=utf8");
			request.send();
		} else {
		var reader = new FileReader();
		reader.onload = function (event) {
			return parseCsv(reader.result);
		};
		reader.readAsText( /** @type {!Blob} */file);
	}
}

// >>> Helper functions

var generateColumnName = function generateColumnName(i, nc) {
	var XYZW = ['x', 'y', 'z', 'w'];
	if (nc <= XYZW.length) return XYZW[i]; // x, y, z, w
	else if (nc <= 26) return String.fromCharCode(65 + i); // A, B, C, ...
		else return 'c' + (i + 1); // c1, c2, c3, ...
};

function parseData(input) {
	return parseFloat(input);
}

/***/ })
/******/ ]);
});