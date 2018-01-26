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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["linspace"] = linspace;
/* harmony export (immutable) */ __webpack_exports__["isUndefined"] = isUndefined;
/* harmony export (immutable) */ __webpack_exports__["isFunction"] = isFunction;
/* harmony export (immutable) */ __webpack_exports__["isArray"] = isArray;
/* harmony export (immutable) */ __webpack_exports__["isString"] = isString;
/* harmony export (immutable) */ __webpack_exports__["isNumber"] = isNumber;
/* harmony export (immutable) */ __webpack_exports__["isObject"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["isCloneable"] = isCloneable;
/* harmony export (immutable) */ __webpack_exports__["debugLog"] = debugLog;
/* harmony export (immutable) */ __webpack_exports__["makeCloneable"] = makeCloneable;
/* harmony export (immutable) */ __webpack_exports__["colorNameToHex"] = colorNameToHex;
/* harmony export (immutable) */ __webpack_exports__["hexToRgb"] = hexToRgb;
/* harmony export (immutable) */ __webpack_exports__["rgbStringToFloatArray"] = rgbStringToFloatArray;
/* harmony export (immutable) */ __webpack_exports__["i24ToFloatArray"] = i24ToFloatArray;
/* harmony export (immutable) */ __webpack_exports__["F32toI24"] = F32toI24;
/* harmony export (immutable) */ __webpack_exports__["F32toI24flipY"] = F32toI24flipY;
/* harmony export (immutable) */ __webpack_exports__["hsv2rgb"] = hsv2rgb;
/* harmony export (immutable) */ __webpack_exports__["urlExists"] = urlExists;
/* harmony export (immutable) */ __webpack_exports__["download"] = download;
/* harmony export (immutable) */ __webpack_exports__["imageUrlFromBytes"] = imageUrlFromBytes;
/* harmony export (immutable) */ __webpack_exports__["createCookie"] = createCookie;
/* harmony export (immutable) */ __webpack_exports__["readCookie"] = readCookie;
/* harmony export (immutable) */ __webpack_exports__["readFloatCookie"] = readFloatCookie;
/* harmony export (immutable) */ __webpack_exports__["readIntCookie"] = readIntCookie;
/* harmony export (immutable) */ __webpack_exports__["eraseCookie"] = eraseCookie;
/* harmony export (immutable) */ __webpack_exports__["getParameterByName"] = getParameterByName;
/* harmony export (immutable) */ __webpack_exports__["addMouseWheelHandler"] = addMouseWheelHandler;
/* harmony export (immutable) */ __webpack_exports__["addMouseMoveHandler"] = addMouseMoveHandler;
/* harmony export (immutable) */ __webpack_exports__["addMouseUpHandler"] = addMouseUpHandler;
/* harmony export (immutable) */ __webpack_exports__["addKeyDownHandler"] = addKeyDownHandler;
/* harmony export (immutable) */ __webpack_exports__["addKeyUpHandler"] = addKeyUpHandler;
/* harmony export (immutable) */ __webpack_exports__["ForwardList"] = ForwardList;
/* harmony export (immutable) */ __webpack_exports__["PriorityQueue"] = PriorityQueue;
/* harmony export (immutable) */ __webpack_exports__["HashSet"] = HashSet;
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
  return Object.prototype.toString.call(x) === '[object Array]';
}

function isString(x) {
  return typeof x === 'string';
}

function isNumber(x) {
  return typeof x === 'number';
}

function isObject(x) {
  var t = typeof x === 'undefined' ? 'undefined' : _typeof(x);
  return t !== 'undefined' && t !== 'function' && t !== 'string' && t !== 'number' && Object.prototype.toString.call(x) !== '[object Array]';
}
function isCloneable(x) {
  return !(isFunction(x) || x instanceof WebGLTexture); //TODO: Add more
}

var enableDebugLog = true;
function debugLog(x) {
  // TODO: disable for release
  if (enableDebugLog) {
    console.log(x);
  }
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
    if (!isCloneable(obj[prop])) {
      // If obj has at least on non-cloneable property
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

  var str = '';
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  return str;
}

function colorNameToHex(color) {
  // Source: https://stackoverflow.com/a/1573141
  var colors = {
    'aliceblue': '#f0f8ff', 'antiquewhite': '#faebd7', 'aqua': '#00ffff', 'aquamarine': '#7fffd4', 'azure': '#f0ffff',
    'beige': '#f5f5dc', 'bisque': '#ffe4c4', 'black': '#000000', 'blanchedalmond': '#ffebcd', 'blue': '#0000ff', 'blueviolet': '#8a2be2',
    'brown': '#a52a2a', 'burlywood': '#deb887', 'cadetblue': '#5f9ea0', 'chartreuse': '#7fff00', 'chocolate': '#d2691e', 'coral': '#ff7f50',
    'cornflowerblue': '#6495ed', 'cornsilk': '#fff8dc', 'crimson': '#dc143c', 'cyan': '#00ffff', 'darkblue': '#00008b', 'darkcyan': '#008b8b',
    'darkgoldenrod': '#b8860b', 'darkgray': '#a9a9a9', 'darkgreen': '#006400', 'darkkhaki': '#bdb76b', 'darkmagenta': '#8b008b',
    'darkolivegreen': '#556b2f', 'darkorange': '#ff8c00', 'darkorchid': '#9932cc', 'darkred': '#8b0000', 'darksalmon': '#e9967a',
    'darkseagreen': '#8fbc8f', 'darkslateblue': '#483d8b', 'darkslategray': '#2f4f4f', 'darkturquoise': '#00ced1', 'darkviolet': '#9400d3',
    'deeppink': '#ff1493', 'deepskyblue': '#00bfff', 'dimgray': '#696969', 'dodgerblue': '#1e90ff', 'firebrick': '#b22222', 'floralwhite': '#fffaf0',
    'forestgreen': '#228b22', 'fuchsia': '#ff00ff', 'gainsboro': '#dcdcdc', 'ghostwhite': '#f8f8ff', 'gold': '#ffd700', 'goldenrod': '#daa520',
    'gray': '#808080', 'green': '#008000', 'greenyellow': '#adff2f', 'honeydew': '#f0fff0', 'hotpink': '#ff69b4', 'indianred ': '#cd5c5c',
    'indigo': '#4b0082', 'ivory': '#fffff0', 'khaki': '#f0e68c', 'lavender': '#e6e6fa', 'lavenderblush': '#fff0f5', 'lawngreen': '#7cfc00',
    'lemonchiffon': '#fffacd', 'lightblue': '#add8e6', 'lightcoral': '#f08080', 'lightcyan': '#e0ffff', 'lightgoldenrodyellow': '#fafad2',
    'lightgray': '#d3d3d3', 'lightgreen': '#90ee90', 'lightpink': '#ffb6c1', 'lightsalmon': '#ffa07a', 'lightseagreen': '#20b2aa',
    'lightskyblue': '#87cefa', 'lightslategray': '#778899', 'lightsteelblue': '#b0c4de', 'lightyellow': '#ffffe0', 'lime': '#00ff00',
    'limegreen': '#32cd32', 'linen': '#faf0e6', 'magenta': '#ff00ff', 'maroon': '#800000', 'mediumaquamarine': '#66cdaa', 'mediumblue': '#0000cd',
    'mediumorchid': '#ba55d3', 'mediumpurple': '#9370d8', 'mediumseagreen': '#3cb371', 'mediumslateblue': '#7b68ee', 'mediumspringgreen': '#00fa9a',
    'mediumturquoise': '#48d1cc', 'mediumvioletred': '#c71585', 'midnightblue': '#191970', 'mintcream': '#f5fffa', 'mistyrose': '#ffe4e1',
    'moccasin': '#ffe4b5', 'navajowhite': '#ffdead', 'navy': '#000080', 'oldlace': '#fdf5e6', 'olive': '#808000', 'olivedrab': '#6b8e23',
    'orange': '#ffa500', 'orangered': '#ff4500', 'orchid': '#da70d6', 'palegoldenrod': '#eee8aa', 'palegreen': '#98fb98', 'paleturquoise': '#afeeee',
    'palevioletred': '#d87093', 'papayawhip': '#ffefd5', 'peachpuff': '#ffdab9', 'peru': '#cd853f', 'pink': '#ffc0cb', 'plum': '#dda0dd',
    'powderblue': '#b0e0e6', 'purple': '#800080', 'rebeccapurple': '#663399', 'red': '#ff0000', 'rosybrown': '#bc8f8f', 'royalblue': '#4169e1',
    'saddlebrown': '#8b4513', 'salmon': '#fa8072', 'sandybrown': '#f4a460', 'seagreen': '#2e8b57', 'seashell': '#fff5ee', 'sienna': '#a0522d',
    'silver': '#c0c0c0', 'skyblue': '#87ceeb', 'slateblue': '#6a5acd', 'slategray': '#708090', 'snow': '#fffafa', 'springgreen': '#00ff7f',
    'steelblue': '#4682b4', 'tan': '#d2b48c', 'teal': '#008080', 'thistle': '#d8bfd8', 'tomato': '#ff6347', 'turquoise': '#40e0d0', 'violet': '#ee82ee',
    'wheat': '#f5deb3', 'white': '#ffffff', 'whitesmoke': '#f5f5f5', 'yellow': '#ffff00', 'yellowgreen': '#9acd32'
  };
  return colors[color.toLowerCase()];
}

function hexToRgb(hex) {
  // Source: https://stackoverflow.com/a/5624139
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

function hsv2rgb(hsv) {
  // Source: https://stackoverflow.com/a/6930407
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
  request.overrideMimeType('text/csv; charset=utf8');
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

function createCookie(name, value, days) {
  // Source: http://www.quirksmode.org/js/cookies.html
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}
function readCookie(name) {
  // Source: http://www.quirksmode.org/js/cookies.html
  var nameEQ = name + '=';
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
function eraseCookie(name) {
  // Source: http://www.quirksmode.org/js/cookies.html
  createCookie(name, '', -1);
}

function getParameterByName(name, url) {
  // Source: https://stackoverflow.com/a/901144
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function addMouseWheelHandler(onmousewheel) {
  // Source: http://www.javascriptkit.com/javatutors/onmousewheel.shtml
  var mousewheelevt = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel';
  if (document.attachEvent) document.attachEvent('on' + mousewheelevt, onmousewheel);else if (document.addEventListener) document.addEventListener(mousewheelevt, onmousewheel, false);
}
function addMouseMoveHandler(onmousemove) {
  if (document.attachEvent) document.attachEvent('onmousemove', onmousemove);else if (document.addEventListener) document.addEventListener('mousemove', onmousemove, false);
}
function addMouseUpHandler(onmouseup) {
  if (document.attachEvent) document.attachEvent('onmouseup', onmouseup);else if (document.addEventListener) document.addEventListener('mouseup', onmouseup, false);
}
function addKeyDownHandler(onkeydown) {
  if (document.attachEvent) document.attachEvent('onkeydown', onkeydown);else if (document.addEventListener) document.addEventListener('keydown', onkeydown, false);
}
function addKeyUpHandler(onkeyup) {
  if (document.attachEvent) document.attachEvent('onkeyup', onkeyup);else if (document.addEventListener) document.addEventListener('keyup', onkeyup, false);
}

/**
 * Simple forward-list
 * The first node of the list is the list itself
 * @constructor
 * @package
 */
function ForwardList(value) {
  this.value = value;
  this.next = null;

  this.push = function (value) {
    // Pushes to front
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
    }console.log(array.join(', '));
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
  ForwardList.sortedMerge = function (a, b) {
    // Source: http://www.geeksforgeeks.org/merge-two-sorted-linked-lists/
    var dummy = new ForwardList(null);
    var tail = dummy;

    while (a !== null && b != null) {
      // While neither a nor b run out
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARRAY_TYPE", function() { return ARRAY_TYPE; });
/* harmony export (immutable) */ __webpack_exports__["setMatrixArrayType"] = setMatrixArrayType;
/* harmony export (immutable) */ __webpack_exports__["toRadian"] = toRadian;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
const EPSILON = 0.000001;
/* harmony export (immutable) */ __webpack_exports__["EPSILON"] = EPSILON;

let ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
const RANDOM = Math.random;
/* harmony export (immutable) */ __webpack_exports__["RANDOM"] = RANDOM;


/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}

const degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
  return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
  return Math.abs(a - b) <= EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Shader"] = Shader;
/* harmony export (immutable) */ __webpack_exports__["validateGLSL"] = validateGLSL;
/* harmony export (immutable) */ __webpack_exports__["Mesh"] = Mesh;
/* harmony export (immutable) */ __webpack_exports__["LoadTexture"] = LoadTexture;
/* harmony export (immutable) */ __webpack_exports__["LoadTextureFromImage"] = LoadTextureFromImage;
/* harmony export (immutable) */ __webpack_exports__["LoadTextureFromByteArray"] = LoadTextureFromByteArray;
/* harmony export (immutable) */ __webpack_exports__["LoadTextureFromFloatArray"] = LoadTextureFromFloatArray;
var libUtility = __webpack_require__(0);

var currentShader = null;
/**
 * A WebGL shader
 * @constructor
 * @package
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {string|Array<string>} vs
 * @param {string|Array<string>} fs
 * @param {boolean=} debug = false
 */
function Shader(gl, vs, fs, debug) {
  if (libUtility.isArray(vs)) vs = vs.join('\n');
  if (libUtility.isArray(fs)) fs = fs.join('\n');
  if (debug === true) {
    console.log(vs);
    console.log(fs);
  }

  // Compile vertex shader -> vertexShader
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vs);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log(vs);
    alert(gl.getShaderInfoLog(vertexShader));
    return null;
  }

  // Compile frament shader -> fragmentShader
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fs);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.log(fs);
    alert(gl.getShaderInfoLog(fragmentShader));
    return null;
  }

  // Link shader program -> sdr
  var sdr = gl.createProgram();
  gl.attachShader(sdr, vertexShader);
  gl.attachShader(sdr, fragmentShader);
  gl.linkProgram(sdr);
  if (!gl.getProgramParameter(sdr, gl.LINK_STATUS)) {
    console.log(vs);
    console.log(fs);
    alert(gl.getProgramInfoLog(sdr));
    return null;
  }

  /* // Print active uniforms
  var count = gl.getProgramParameter(sdr, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < count; ++i)
    console.log(gl.getActiveUniform(sdr, i).name);*/

  this.vertexPositionAttribute = gl.getAttribLocation(sdr, 'vpos');
  this.vertexNormalAttribute = gl.getAttribLocation(sdr, 'vnml');
  this.vertexTangentAttribute = gl.getAttribLocation(sdr, 'vtng');
  this.vertexBinormalAttribute = gl.getAttribLocation(sdr, 'vbnml');
  this.VertexTexCoordAttribute = gl.getAttribLocation(sdr, 'vtexcoord');
  this.samplerUniform = gl.getUniformLocation(sdr, 'uSampler');
  this.samplerArrayUniform = gl.getUniformLocation(sdr, 'uSamplers');

  this.bind = function () {
    if (currentShader !== this) {
      currentShader = this;
      gl.useProgram(sdr);
    }
  };

  this.u1i = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (i) {
      this.bind();
      gl.uniform1i(uniform, i);
      if (debug) console.log('gl.uniform1i({0}, {1})'.format(uniformString, i));
    };else return debug ? function (i) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };
  this.u1f = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (f) {
      this.bind();
      gl.uniform1f(uniform, f);
      if (debug) console.log('gl.uniform1f({0}, {1})'.format(uniformString, f));
    };else return debug ? function (f) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };
  this.u2f = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (x, y) {
      this.bind();
      gl.uniform2f(uniform, x, y);
      if (debug) console.log('gl.uniform2f({0}, {1}, {2})'.format(uniformString, x, y));
    };else return debug ? function (f) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };
  this.u2x2f = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (m) {
      this.bind();
      gl.uniformMatrix2fv(uniform, false, m);
      if (debug) console.log('gl.uniformMatrix2fv({0}, {1})'.format(uniformString, m));
    };else return debug ? function (f) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };
  this.u3f = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (x, y, z) {
      this.bind();
      gl.uniform3f(uniform, x, y, z);
      if (debug) console.log('gl.uniform3f({0}, {1}, {2}, {3})'.format(uniformString, x, y, z));
    };else return debug ? function (f) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };
  this.u4f = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (x, y, z, w) {
      this.bind();
      gl.uniform4f(uniform, x, y, z, w);
      if (debug) console.log('gl.uniform4f({0}, {1}, {2}, {3}, {4})'.format(uniformString, x, y, z, w));
    };else return debug ? function (f) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };
  this.u1fv = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (v) {
      this.bind();
      gl.uniform1fv(uniform, v);
      if (debug) console.log('gl.uniform1fv({0}, {1})'.format(uniformString, v));
    };else return debug ? function (f) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };
  this.u4fv = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (v) {
      this.bind();
      gl.uniform4fv(uniform, v);
      if (debug) console.log('gl.uniform4fv({0}, {1})'.format(uniformString, v));
    };else return debug ? function (f) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };
  this.u4x4f = function (uniformString) {
    this.bind();
    var uniform = gl.getUniformLocation(sdr, uniformString);
    if (uniform) return function (m) {
      this.bind();
      gl.uniformMatrix4fv(uniform, false, m);
      if (debug) console.log('gl.uniformMatrix4fv({0}, {1})'.format(uniformString, m));
    };else return debug ? function (f) {
      return console.log('Passing value to unused uniform ' + uniformString);
    } : null;
  };

  this.getAttribLocation = function (attributeName) {
    return gl.getAttribLocation(sdr, attributeName);
  };

  this.free = function () {
    if (vertexShader != null || fragmentShader != null || sdr != null) gl.useProgram(null);

    if (vertexShader != null) {
      gl.deleteShader(vertexShader);
      vertexShader = null;
    }
    if (fragmentShader != null) {
      gl.deleteShader(fragmentShader);
      fragmentShader = null;
    }
    if (sdr != null) {
      gl.deleteProgram(sdr);
      sdr = null;
    }
  };
}

function validateGLSL(gl, code) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, 'void main() {} ' + code);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    var err = gl.getShaderInfoLog(vertexShader);
    gl.deleteShader(vertexShader);
    return err;
  }
  gl.deleteShader(vertexShader);
  return true;
}

/**
 * A renderable WebGL mesh
 * @constructor
 * @package
 * @param {Object} _gl // {WebGLRenderingContext}
 * @param {Float32Array} positions
 * @param {Float32Array=} normals
 * @param {Float32Array=} tangents
 * @param {Float32Array=} binormals
 * @param {Float32Array=} texcoords
 * @param {Uint16Array=} indices
 * @param {number=} _primitivetype = gl.TRIANGLE_STRIP
 * @param {number=} _ndim = 3
 */
function Mesh(_gl, positions, normals, tangents, binormals, texcoords, indices, _primitivetype, _ndim) {
  var gl = _gl;
  var posbuffer, nmlbuffer, tgtbuffer, bnmbuffer, texcoordbuffer, idxbuffer;
  var primitivetype, numvertices, numindices;
  var ndim;

  this.reset = function (positions, normals, tangents, binormals, texcoords, indices, _primitivetype, _ndim) {
    ndim = _ndim ? _ndim : 3;
    primitivetype = _primitivetype;
    numvertices = Math.floor(positions.length / ndim);
    numindices = 0;

    if (!posbuffer) posbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    if (normals) {
      if (!nmlbuffer) nmlbuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, nmlbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    } else if (!nmlbuffer) gl.deleteBuffer(nmlbuffer);
    if (tangents) {
      if (!tgtbuffer) tgtbuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, tgtbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, tangents, gl.STATIC_DRAW);
    } else if (!tgtbuffer) gl.deleteBuffer(tgtbuffer);
    if (binormals) {
      if (!bnmbuffer) bnmbuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bnmbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, binormals, gl.STATIC_DRAW);
    } else if (!bnmbuffer) gl.deleteBuffer(bnmbuffer);
    if (texcoords) {
      if (!texcoordbuffer) texcoordbuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);
    } else if (!texcoordbuffer) gl.deleteBuffer(texcoordbuffer);
    if (indices) {
      if (!idxbuffer) idxbuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxbuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
      numindices = indices.length;
      if (typeof primitivetype === 'undefined') primitivetype = gl.TRIANGLES; // Default primitive type for indexed geometry is TRIANGLES
    } else {
      if (!idxbuffer) gl.deleteBuffer(idxbuffer);
      if (typeof primitivetype === 'undefined') primitivetype = gl.TRIANGLE_STRIP; // Default primitive type for non-indexed geometry is TRIANGLE_STRIP
    }
  };
  if (positions) // Mesh vertex positions array can't be null
    this.reset(positions, normals, tangents, binormals, texcoords, indices, _primitivetype, _ndim);

  this.bind = function (sdr, texture) {
    if (!posbuffer) // Mesh without vertex positions can't be rendered
      return;

    sdr.bind();

    for (var i = 0; i < 16; i++) {
      gl.disableVertexAttribArray(i);
      if (gl.ext) gl.ext.vertexAttribDivisorANGLE(i, 0);
    }

    gl.enableVertexAttribArray(sdr.vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
    gl.vertexAttribPointer(sdr.vertexPositionAttribute, ndim, gl.FLOAT, false, 0, 0);
    if (nmlbuffer && sdr.vertexNormalAttribute != -1) {
      gl.enableVertexAttribArray(sdr.vertexNormalAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, nmlbuffer);
      gl.vertexAttribPointer(sdr.vertexNormalAttribute, ndim, gl.FLOAT, false, 0, 0);
    }
    if (tgtbuffer && sdr.vertexTangentAttribute != -1) {
      gl.enableVertexAttribArray(sdr.vertexTangentAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, tgtbuffer);
      gl.vertexAttribPointer(sdr.vertexTangentAttribute, ndim, gl.FLOAT, false, 0, 0);
    }
    if (bnmbuffer && sdr.vertexBinormalAttribute != -1) {
      gl.enableVertexAttribArray(sdr.vertexBinormalAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, bnmbuffer);
      gl.vertexAttribPointer(sdr.vertexBinormalAttribute, ndim, gl.FLOAT, false, 0, 0);
    }
    if (texcoordbuffer && sdr.VertexTexCoordAttribute != -1) {
      gl.enableVertexAttribArray(sdr.VertexTexCoordAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordbuffer);
      gl.vertexAttribPointer(sdr.VertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    }
    if (texture) {
      if (libUtility.isArray(texture)) {
        if (sdr.samplerArrayUniform) {
          var idxarray = new Array(i);
          for (var i = 0; i < texture.length; i++) {
            gl.activeTexture(gl.TEXTURE0 + i);
            gl.bindTexture(gl.TEXTURE_2D, texture[i]);
            idxarray[i] = i;
          }
          gl.uniform1iv(sdr.samplerArrayUniform, idxarray);
        }
      } else {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        if (sdr.samplerUniform) gl.uniform1i(sdr.samplerUniform, 0);
        if (sdr.samplerArrayUniform) gl.uniform1iv(sdr.samplerArrayUniform, [0]);
      }
    }
    if (idxbuffer) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxbuffer);
  };

  this.draw = function () {
    if (!posbuffer) // Mesh without vertex positions can't be rendered
      return;

    if (idxbuffer) gl.drawElements(primitivetype, numindices, gl.UNSIGNED_SHORT, 0);else gl.drawArrays(primitivetype, 0, numvertices);
  };

  this.free = function () {
    if (posbuffer) {
      gl.deleteBuffer(posbuffer);
      posbuffer = null;
    }
    if (nmlbuffer) {
      gl.deleteBuffer(posbuffer);
      posbuffer = null;
    }
    if (tgtbuffer) {
      gl.deleteBuffer(posbuffer);
      posbuffer = null;
    }
    if (bnmbuffer) {
      gl.deleteBuffer(posbuffer);
      posbuffer = null;
    }
    if (texcoordbuffer) {
      gl.deleteBuffer(posbuffer);
      posbuffer = null;
    }
    if (idxbuffer) {
      gl.deleteBuffer(posbuffer);
      posbuffer = null;
    }
  };
}

// >>> Section: Textures


function handleLoadedTexture(gl, texture, onload) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);

  if (typeof onload == 'function') onload(texture);
}
function LoadTexture(gl, filename, onload) {
  var texture = gl.createTexture();
  texture.image = new Image();
  texture.image.onload = function () {
    handleLoadedTexture(gl, texture, onload);
  };
  texture.image.src = filename;
  return texture;
}
function LoadTextureFromImage(gl, image) {
  var texture = gl.createTexture();
  texture.image = image;
  handleLoadedTexture(gl, texture, null);
  return texture;
}
function LoadTextureFromByteArray(gl, array, width, height) {
  var texture = gl.createTexture();
  texture.byteArray = array;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, array);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}
function LoadTextureFromFloatArray(gl, array, width, height) {
  if (gl.getExtension('OES_texture_float') === null) {
    console.warn("GlobalView warning: The browser doesn't support floatingpoint textures");
    return null;
  }
  var texture = gl.createTexture();
  texture.floatArray = array;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.FLOAT, array);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_matrix_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_matrix_mat2__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gl_matrix_mat2d__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gl_matrix_mat3__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gl_matrix_mat4__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gl_matrix_quat__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gl_matrix_vec2__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gl_matrix_vec3__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gl_matrix_vec4__ = __webpack_require__(9);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "glMatrix", function() { return __WEBPACK_IMPORTED_MODULE_0__gl_matrix_common__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2", function() { return __WEBPACK_IMPORTED_MODULE_1__gl_matrix_mat2__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2d", function() { return __WEBPACK_IMPORTED_MODULE_2__gl_matrix_mat2d__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat3", function() { return __WEBPACK_IMPORTED_MODULE_3__gl_matrix_mat3__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat4", function() { return __WEBPACK_IMPORTED_MODULE_4__gl_matrix_mat4__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat", function() { return __WEBPACK_IMPORTED_MODULE_5__gl_matrix_quat__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec2", function() { return __WEBPACK_IMPORTED_MODULE_6__gl_matrix_vec2__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec3", function() { return __WEBPACK_IMPORTED_MODULE_7__gl_matrix_vec3__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return __WEBPACK_IMPORTED_MODULE_8__gl_matrix_vec4__; });
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.4.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER













/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Blocks of GLSL shader code. Blocks starting with vs... are vertex shaders,
 * blocks starting with fs... are fragment shaders
 * @summary Vertex- and fragment shader code
 * @package
 * @namespace
*/
var Shaders = {};
module.exports = {
  Shaders: Shaders
};

/**
 * @summary A simple vertex shader for meshes with positions and texture coordinates.
 * @static
 * @readonly
*/
Shaders.vsSimple = "attribute vec3 vpos;\nattribute vec2 vtexcoord;\nuniform mat4 matWorldViewProj;\nvarying vec2 uv;\n\nvoid main()\n{\n  gl_Position = matWorldViewProj * vec4(vpos, 1.0);\n  uv = vtexcoord;\n}\n";
Shaders.fsLine = "precision mediump float;\nuniform vec4 color;\n\nvoid main()\n{\n  gl_FragColor = color;\n}\n";
Shaders.vsTextured = "attribute vec3 vpos;\nattribute vec2 vtexcoord;\nuniform mat4 matWorldViewProj;\nvarying vec2 uv;\n\nvoid main()\n{\n  gl_Position = matWorldViewProj * vec4(vpos, 1.0);\n  uv = vtexcoord;\n}\n";
Shaders.vsTextured2 = "attribute vec3 vpos;\nattribute vec2 vtexcoord;\nuniform mat4 matWorldViewProj;\nuniform mat2 matTexCoordTransform;\nvarying vec2 uv;\n\nvoid main()\n{\n  gl_Position = matWorldViewProj * vec4(vpos, 1.0);\n  uv = matTexCoordTransform * vtexcoord;\n}\n";
Shaders.fsTextured = "precision mediump float;\nvarying vec2 uv;\nuniform sampler2D uSampler;\n\nvoid main()\n{\n  gl_FragColor = texture2D(uSampler, uv);\n}\n";
Shaders.fsTextured1D = "precision mediump float;\nvarying vec2 uv;\nuniform sampler2D uSampler;\n\nvoid main()\n{\n  gl_FragColor = texture2D(uSampler, vec2(uv.y, 0.5));\n}\n";
Shaders.fsViewDensityMap = "precision mediump float;\nvarying vec2 uv;\nuniform float scale;\nuniform vec3 color;\nuniform sampler2D uSamplers[2];\n\nvoid main()\n{\n  float depth = texture2D(uSamplers[0], uv).r * scale;\n  //gl_FragColor = vec4(texture2D(uSamplers[1], vec2(depth, 0.5)).rgb, 1.0);\n  gl_FragColor = vec4(color, depth);\n}\n";

Shaders.vsDataPoint = "uniform sampler2D uSampler;\nuniform float pointOpacity, pointSize;\nuniform bool flipY;\nvarying vec4 color;\n\nvoid main()\n{\n  vec3 pos = getPos();\n  color = texture2D(uSampler, vec2(pos.z, 0.5));\n  color.a *= pointOpacity;\n  gl_Position = vec4(pos.x, flipY ? -pos.y : pos.y, 0.0, 1.0);\n  gl_PointSize = pointSize;\n}\n";
Shaders.fsDataPoint = "varying vec4 color;\n\nvoid main()\n{\n  //float t = clamp(1.0 - length(gl_PointCoord * 2.0 - 1.0), 0.0, 1.0);\n  gl_FragColor = vec4(color.rgb, color.a * clamp(opacityMap(gl_PointCoord * 2.0 - 1.0), 0.0, 1.0));\n}\n";
Shaders.vsDataLine = "uniform sampler2D uSampler;\nuniform float pointOpacity, pointSize;\nuniform bool flipY;\nuniform mat2 lineTransform;\nattribute vec2 lineOffset;\nvarying vec4 color;\n\nvoid main()\n{\n  vec4 pos = getPos();\n  color = texture2D(uSampler, vec2(pos.z, 0.5));\n  color.a *= pointOpacity;\n  gl_Position = vec4(pos.x, flipY ? -pos.y : pos.y, 0.0, 1.0) + vec4(lineOffset * vec2(pos.w, 1.0) * lineTransform, 0.0, 0.0);\n  gl_PointSize = pointSize;\n}\n";
Shaders.fsDataLine = "varying vec4 color;\n\nvoid main()\n{\n  gl_FragColor = color;\n}\n";
Shaders.vsDensityMap = "void main()\n{\n  vec3 pos = getPos();\n  gl_Position = vec4(pos.xy, 0.0, 1.0);\n  gl_PointSize = 1.0;\n}\n";
Shaders.fsDensityMap = "precision highp float;\n\nvoid main()\n{\n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}\n";
Shaders.vsBlurDensityMap = "attribute vec3 vpos;\nattribute vec2 vtexcoord;\nvarying vec2 uv;\n\nvoid main()\n{\n  gl_Position = vec4(vpos, 1.0);\n  uv = vtexcoord;\n}\n";
Shaders.fsBlurDensityMap = "precision highp float;\nvarying vec2 uv;\nuniform sampler2D uSampler;\nuniform vec2 pixelSize;\nuniform float gauss[33 * 33];\n\nvec4 pack_float(float value)\n{\n  value = clamp(value, 0.0, 1.0);\n  return vec4(value, mod(value * 256.0, 256.0 / 255.0), mod(value * 65536.0, 256.0 / 255.0), 1.0);\n  \n  /*value = clamp(value, 0.0, 1.0);\n  if(value <= 1e-5)\n    return vec4(0.0, 0.0, 0.0, 1.0);\n  value = value * 16777214.0 - 1.0;\n  return vec4(mod(value / 65536.0, 255.0) / 255.0, mod(value / 256.0, 255.0) / 255.0, mod(value / 1.0, 255.0) / 255.0, 1.0);*/\n}\nfloat unpack_float(vec4 rgba)\n{\n  float value = floor(rgba.r * 255.0) * 65536.0 + floor(rgba.g * 255.0) * 256.0 + floor(rgba.b * 255.0);\n  value = value / 16777215.0; // 16777215.0 == float(0xffffff)\n  value = clamp(value, 0.0, 1.0);\n  return value;\n  \n  \n  /*if(rgba.a <= 1e-5)\n    return -1e20;\n  float valueI = floor(rgba.r * 255.0) * 65536.0 + floor(rgba.g * 255.0) * 256.0 + floor(rgba.b * 255.0);\n  if(valueI < 0.5)\n    return -1e20;\n  float valueS = (valueI - 1.0) / 16777214.0; // 0 is reserved as 'nothing' //float(0xfffffe)\n  valueS = clamp(valueS, 0.0, 1.0);\n  return valueS;*/\n}\n\nvoid main()\n{\n  float c = 0.0;\n  for (int y = -16; y <= 16; ++y)\n    for (int x = -16; x <= 16; ++x)\n      c += unpack_float(texture2D(uSampler, uv + pixelSize * vec2(x, y))) * gauss[(y + 16) * 33 + x + 16];\n  gl_FragColor = pack_float(c);\n}\n";

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["addTransformFunctions"] = addTransformFunctions;
/* harmony export (immutable) */ __webpack_exports__["DensityMap"] = DensityMap;
/* harmony export (immutable) */ __webpack_exports__["DensityMapOptions"] = DensityMapOptions;
/* harmony export (immutable) */ __webpack_exports__["ClusterMap"] = ClusterMap;
/* harmony export (immutable) */ __webpack_exports__["ClusterMapOptions"] = ClusterMapOptions;
/* harmony export (immutable) */ __webpack_exports__["computeHistogram"] = computeHistogram;
/* harmony export (immutable) */ __webpack_exports__["computeHistogram2D"] = computeHistogram2D;
/* harmony export (immutable) */ __webpack_exports__["computeDensityMap"] = computeDensityMap;
/* harmony export (immutable) */ __webpack_exports__["computeDensityMapND"] = computeDensityMapND;
/* harmony export (immutable) */ __webpack_exports__["findRepresentativePoints"] = findRepresentativePoints;
/* harmony export (immutable) */ __webpack_exports__["findRepresentativePoints2"] = findRepresentativePoints2;
/* harmony export (immutable) */ __webpack_exports__["findRepresentativePointsND"] = findRepresentativePointsND;
/* harmony export (immutable) */ __webpack_exports__["findRepresentativePointsND2"] = findRepresentativePointsND2;
/* harmony export (immutable) */ __webpack_exports__["findClosePointOfLowDensity"] = findClosePointOfLowDensity;
/* harmony export (immutable) */ __webpack_exports__["markPointsInStencilMap"] = markPointsInStencilMap;
/* harmony export (immutable) */ __webpack_exports__["downloadStencilMap"] = downloadStencilMap;
/* harmony export (immutable) */ __webpack_exports__["findClosePointOfLowDensity_descend"] = findClosePointOfLowDensity_descend;
/* harmony export (immutable) */ __webpack_exports__["findClosePointOfLowDensityND_descend"] = findClosePointOfLowDensityND_descend;
/* harmony export (immutable) */ __webpack_exports__["sampleDensityMap"] = sampleDensityMap;
/* harmony export (immutable) */ __webpack_exports__["sampleDensityMapRow"] = sampleDensityMapRow;
/* harmony export (immutable) */ __webpack_exports__["sampleDensityMapColumn"] = sampleDensityMapColumn;
/* harmony export (immutable) */ __webpack_exports__["sampleDensityMapChain"] = sampleDensityMapChain;
/* harmony export (immutable) */ __webpack_exports__["computeClusterMap_method1"] = computeClusterMap_method1;
/* harmony export (immutable) */ __webpack_exports__["computeClusterMap_method2"] = computeClusterMap_method2;
/* harmony export (immutable) */ __webpack_exports__["computeClusterMap_method3"] = computeClusterMap_method3;
/* harmony export (immutable) */ __webpack_exports__["downloadDensityMap"] = downloadDensityMap;
/* harmony export (immutable) */ __webpack_exports__["vectorLineIntersection2D"] = vectorLineIntersection2D;
/* harmony export (immutable) */ __webpack_exports__["linesIntersect"] = linesIntersect;
/* harmony export (immutable) */ __webpack_exports__["pointInsidePolygon"] = pointInsidePolygon;
var libUtility = __webpack_require__(0);

function addTransformFunctions(cls) {
  cls.transformX = function (x) {
    return cls.transform[0] * x + cls.transform[1];
  };
  cls.transformY = function (y) {
    return cls.transform[2] * y + cls.transform[3];
  };
  cls.invTransformX = function (x) {
    return (x - cls.transform[1]) / cls.transform[0];
  };
  cls.invTransformY = function (y) {
    return (y - cls.transform[3]) / cls.transform[2];
  };
}

/**
 * @constructor
 * @package
 */
function DensityMap(obj) {
  this.data = obj.data;
  this.width = obj.width;
  this.height = obj.height;
  this.minimum = obj.minimum;
  this.maximum = obj.maximum;
  this.scale = obj.scale;
  this.offset = obj.offset;
  this.transform = obj.transform;
  this.options = obj.options;
  this.transformX = function (x) {
    return this.transform[0] * x + this.transform[1];
  };
  this.transformY = function (y) {
    return this.transform[2] * y + this.transform[3];
  };
  this.invTransformX = function (x) {
    return (x - this.transform[1]) / this.transform[0];
  };
  this.invTransformY = function (y) {
    return (y - this.transform[3]) / this.transform[2];
  };
}

/**
 * @summary Options to the {@link algorithm#computeDensityMap|computeDensityMap()} function
 * @constructor
 * @export
 * @param {DensityMapOptions=} source If not null, creates a copy of source
 */
function DensityMapOptions(source) {
  if (source) {
    // Copy constructor
    //this.targetWidth = source.targetWidth;
    //this.targetHeight = source.targetHeight;
    this['maxExpectedRuntime'] = source['maxExpectedRuntime'];
    this['cutoffIntensity'] = source['cutoffIntensity'];
    this['gaussScale'] = source['gaussScale'];
    this['logScale'] = source['logScale'];
    this['inflateToFit'] = source['inflateToFit'];
    this['shrinkToFit'] = source['shrinkToFit'];
  } else {
    // Default constructor
    //this.targetWidth = this.targetHeight = 1024; // Initial density map size (affected by maxExpectedRuntime, inflateToFit and shrinkToFit)
    /**
     * @alias maxExpectedRuntime
     * @memberof DensityMapOptions
     * @summary If the estimated runtime for computing the density map (in seconds) is higher than maxExpectedRuntime, the density map size is reduced
     * @type {number}
     * @default
     */
    this['maxExpectedRuntime'] = 1.0;
    /**
     * @alias cutoffIntensity
     * @memberof DensityMapOptions
     * @summary Densities below cutoffIntensity aren't computed
     * @type {number}
     * @default
     */
    this['cutoffIntensity'] = 0.001;
    /**
     * @alias gaussScale
     * @memberof DensityMapOptions
     * @summary Relative variance (variance normalized by density map size)
     * @type {number}
     * @default
     */
    this['gaussScale'] = 1000;
    /**
     * @alias logScale
     * @memberof DensityMapOptions
     * @summary When true, computes log-densities
     * @type {boolean}
     * @default
     */
    this['logScale'] = true;
    /**
     * @alias inflateToFit
     * @memberof DensityMapOptions
     * @summary When true, increases density map size to fit the full density map
     * @type {boolean}
     * @default
     */
    this['inflateToFit'] = true;
    /**
     * @alias shrinkToFit
     * @memberof DensityMapOptions
     * @summary When true, decreases density map size to the area of non-zero densities plus a zero-density border of 1 pixel thickness
     * @type {boolean}
     * @default
     */
    this['shrinkToFit'] = true;
  }
}
DensityMapOptions.equals = function (a, b) {
  return a['maxExpectedRuntime'] === b['maxExpectedRuntime'] && a['cutoffIntensity'] === b['cutoffIntensity'] && a['gaussScale'] === b['gaussScale'] && a['logScale'] === b['logScale'] && a['inflateToFit'] === b['inflateToFit'] && a['shrinkToFit'] === b['shrinkToFit'];
};

/**
 * @constructor
 * @package
 */
function ClusterMap(obj) {
  this.data = obj.data;
  this.densities = obj.densities;
  this.minDensities = obj.minDensities;
  this.threshold = obj.threshold;
  this.n = obj.n;
  this.width = obj.width;
  this.height = obj.height;
  this.transform = obj.transform;
  this.transformX = function (x) {
    return this.transform[0] * x + this.transform[1];
  };
  this.transformY = function (y) {
    return this.transform[2] * y + this.transform[3];
  };
  this.invTransformX = function (x) {
    return (x - this.transform[1]) / this.transform[0];
  };
  this.invTransformY = function (y) {
    return (y - this.transform[3]) / this.transform[2];
  };
}

/**
 * @summary Options to the {@link algorithm#computeClusterMap_method3|computeClusterMap()} function
 * @constructor
 * @export
 * @param {ClusterMapOptions=} source If not null, creates a copy of source
 */
function ClusterMapOptions(source) {
  if (source) {
    this.densityMap = source.densityMap;
    this['threshold'] = this.threshold = source.threshold;
  } else {
    this.densityMap = null;
    /**
     * @alias threshold
     * @memberof ClusterMapOptions
     * @summary Densities below threshold * maximum-density are considered outliers
     * @type {number}
     * @default
     */
    this['threshold'] = this.threshold = 0.1;
  }
}
ClusterMapOptions.equals = function (a, b) {
  return DensityMapOptions.equals(a.densityMap.options, b.densityMap.options) && a.threshold === b.threshold;
};

/**
 * Compute a histogram of all points in the dataset over dimension d
 * @package
 * @param  {Dataset} dataset
 * @param  {number} d Index of the dataset dimension to use for binning
 * @param  {number} width The number of histogram bins
 * @return {Object} A 1D histogram
 */
function computeHistogram(dataset, d, width) {
  var n = dataset.length;
  var v = dataset.dataVectors[d];
  var s = width / (v.maximum - v.minimum);
  var o = -v.minimum * s;
  var transform = [s, o, 1, 0];

  // Computed number of datapoints per histogram bin -> histogram, maximum
  var histogram = new Float32Array(width);
  var maximum = 1; // Start with 1, because as long as n > 0, there will be at least one bin with magnitude >= 1
  for (var i = 0; i < n; ++i) {
    var p = Math.floor(v.getValue(i) * s + o);
    if (++histogram[Math.min(width - 1, p)] > maximum) ++maximum; // maximum can only grow by 1, so we know histogram[...] == maximum + 1
  }

  histogram = {
    data: histogram,
    maximum: maximum,
    width: width, height: 1,
    transform: transform
  };
  return histogram;
}

/**
 * Compute a histogram of all points in the dataset over dimensions d0 and d1
 * @package
 * @param  {Dataset} dataset
 * @param  {number} d0 Index of the first dataset dimension to use for binning
 * @param  {number} d1 Index of the second dataset dimension to use for binning
 * @param  {number} width The number of histogram bins in the first dimension
 * @param  {number} height The number of histogram bins in the first second
 * @return {Object} A 2D histogram
 */
function computeHistogram2D(dataset, d0, d1, width, height) {
  var n = dataset.length;
  var v0 = dataset.dataVectors[d0],
      v1 = dataset.dataVectors[d1];
  var s0 = width / (v0.maximum - v0.minimum);
  var o0 = -v0.minimum * s0;
  var s1 = height / (v1.maximum - v1.minimum);
  var o1 = -v1.minimum * s1;
  var transform = [s0, o0, s1, o1];

  // Computed number of datapoints per histogram bin -> histogram, maximum
  var histogram = new Float32Array(width * height);
  var maximum = 1; // Start with 1, because as long as n > 0, there will be at least one bin with magnitude >= 1
  for (var i = 0; i < n; ++i) {
    var p0 = Math.floor(v0.getValue(i) * s0 + o0);
    var p1 = Math.floor(v1.getValue(i) * s1 + o1);
    if (++histogram[Math.min(height - 1, p1) * width + Math.min(width - 1, p0)] > maximum) ++maximum; // maximum can only grow by 1, so we know histogram[...] == maximum + 1
  }

  histogram = {
    data: histogram,
    maximum: maximum,
    width: width, height: height,
    transform: transform
    /*transformX: x => transform[0] * x + transform[1],
    transformY: y => transform[2] * y + transform[3],
    invTransformX: x => (x - transform[1]) / transform[0],
    invTransformY: y => (y - transform[3]) / transform[2]*/
  };
  return histogram;
}
/**
 * This function can be computed by an asynchronous worker.
 * It inputs and outputs plain JavaScript objects, because data passed between the main thread and an asynchronous worker has to be primitive
 * (e.g. it cannot contain function objects).
 * @summary Compute a 2D density map from a 2D histogram computed by {@link computeHistogram2D}
 * @package
 * @param  {Object} histogram To create a histogram object from a 2D histogram, call `makeCloneable(histogram)`
 * @param  {DensityMapOptions} options
 * @return {Object} A density map object
 *
 * To get a {@link DensityMap} from the output object, call `new DensityMap(output)`.
 */
function computeDensityMap(histogram, options) {
  var _tiktok_start;
  var tik = function tik() {
    _tiktok_start = performance.now();
  };
  var tok = function tok() {
    return (performance.now() - _tiktok_start) / 1000;
  };

  // Get required information from histogram
  var width = histogram.width,
      height = histogram.height,
      transform = histogram.transform.slice(),
      initialDensities = histogram.data;
  var minDensity,
      maxDensity = histogram.maximum;

  // Set parameters
  var cutoffIntensity = options['cutoffIntensity'];
  var gaussScale = options['gaussScale'];
  var normalizedGaussScale = -gaussScale / (width * height);
  var logScale = options['logScale'];
  var inflateToFit = options['inflateToFit'];
  var maxExtend = Math.max(width, height);

  // Compute a measure of expected runtime
  var expectedRuntime = 0;
  var newBounds_l = Number.MAX_VALUE,
      newBounds_r = Number.MIN_VALUE,
      newBounds_t = Number.MAX_VALUE,
      newBounds_b = Number.MIN_VALUE;
  tik();
  if (inflateToFit) {
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        if (initialDensities[y * width + x] !== 0.0) {
          var r = Math.floor(Math.sqrt(Math.log(cutoffIntensity / initialDensities[y * width + x]) / normalizedGaussScale)) - 1;
          r = Math.max(1, Math.min(maxExtend, r));

          expectedRuntime += r * r * Math.PI;
          newBounds_l = Math.min(newBounds_l, x - r);
          newBounds_r = Math.max(newBounds_r, x + r);
          newBounds_t = Math.min(newBounds_t, y - r);
          newBounds_b = Math.max(newBounds_b, y + r);
        }
      }
    }
  } else {
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        if (initialDensities[y * width + x] !== 0.0) {
          var r = Math.floor(Math.sqrt(Math.log(cutoffIntensity / initialDensities[y * width + x]) / normalizedGaussScale)) - 1;
          r = Math.max(1, Math.min(maxExtend, r));

          var trimX = Math.min(r, Math.min(x, width - x)) / r;
          var trimY = Math.min(r, Math.min(y, height - y)) / r;
          trimX = 0.5 + 0.5 * trimX * trimX;
          trimY = 0.5 + 0.5 * trimY * trimY;
          expectedRuntime += r * r * Math.PI * trimX * trimY;
        }
      }
    }
  }
  var t1 = tok(); // t1 = Runtime of runtime estimation

  expectedRuntime = inflateToFit ? 0.011447356659209 * Math.pow(expectedRuntime, 0.508796587646921) : 0.017471566555264 * Math.pow(expectedRuntime, 0.466050299746328);
  expectedRuntime *= t1;
  //console.log("Expected runtime: " + expectedRuntime + "s");

  while (expectedRuntime > options['maxExpectedRuntime'] && width >= 2 && height >= 2) {
    // Downscale density map size by a factor of 2
    var downScaledWidth = width >> 1,
        downScaledHeight = height >> 1;
    //console.log("Expected runtime too high. Down-scaling to: " + downScaledWidth + "x" + downScaledHeight);

    transform[0] *= downScaledWidth / width;
    transform[1] *= downScaledWidth / width;
    transform[2] *= downScaledHeight / height;
    transform[3] *= downScaledHeight / height;

    // Recompute number of datapoints per density map pixel
    var downScaledInitialDensities = new Float32Array(downScaledWidth * downScaledHeight);
    maxDensity = 1;
    for (var y = 0; y < downScaledHeight; ++y) {
      for (var x = 0; x < downScaledWidth; ++x) {
        maxDensity = Math.max(maxDensity, downScaledInitialDensities[y * downScaledWidth + x] = initialDensities[(2 * y + 0) * width + (2 * x + 0)] + initialDensities[(2 * y + 0) * width + (2 * x + 1)] + initialDensities[(2 * y + 1) * width + (2 * x + 0)] + initialDensities[(2 * y + 1) * width + (2 * x + 1)]);
      }
    }initialDensities = downScaledInitialDensities;
    width = downScaledWidth;
    height = downScaledHeight;
    maxExtend = Math.max(width, height);
    normalizedGaussScale = -gaussScale / (width * height);

    // Recompute expected runtime
    expectedRuntime = 0;
    newBounds_l = Number.MAX_VALUE;newBounds_r = Number.MIN_VALUE;newBounds_t = Number.MAX_VALUE;newBounds_b = Number.MIN_VALUE;
    tik();
    if (inflateToFit) {
      for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
          if (initialDensities[y * width + x] !== 0.0) {
            var r = Math.floor(Math.sqrt(Math.log(cutoffIntensity / initialDensities[y * width + x]) / normalizedGaussScale)) - 1;
            r = Math.max(1, Math.min(maxExtend, r));

            expectedRuntime += r * r * Math.PI;
            newBounds_l = Math.min(newBounds_l, x - r);
            newBounds_r = Math.max(newBounds_r, x + r);
            newBounds_t = Math.min(newBounds_t, y - r);
            newBounds_b = Math.max(newBounds_b, y + r);
          }
        }
      }
    } else {
      for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
          if (initialDensities[y * width + x] !== 0.0) {
            var r = Math.floor(Math.sqrt(Math.log(cutoffIntensity / initialDensities[y * width + x]) / normalizedGaussScale)) - 1;
            r = Math.max(1, Math.min(maxExtend, r));

            var trimX = Math.min(r, Math.min(x, width - x)) / r;
            var trimY = Math.min(r, Math.min(y, height - y)) / r;
            trimX = 0.5 + 0.5 * trimX * trimX;
            trimY = 0.5 + 0.5 * trimY * trimY;
            expectedRuntime += r * r * Math.PI * trimX * trimY;
          }
        }
      }
    }
    t1 = tok(); // t1 = Runtime of runtime estimation

    expectedRuntime = inflateToFit ? 0.011447356659209 * Math.pow(expectedRuntime, 0.508796587646921) : 0.017471566555264 * Math.pow(expectedRuntime, 0.466050299746328);
    expectedRuntime *= t1;
    //console.log("Expected runtime: " + expectedRuntime + "s");
  }
  //console.log("Expected runtime acceptable");

  var densitMapWidth, densitMapHeight;
  if (inflateToFit) {
    if (options['shrinkToFit']) {
      // Inflate output size to keep a 1-pixel-wide frame of zeros around the density map
      // This allows algorithms that march through densities to stay within density map bounds without explictly checking
      --newBounds_l;
      ++newBounds_r;
      --newBounds_t;
      ++newBounds_b;
    }

    densitMapWidth = newBounds_r - newBounds_l + 1;
    densitMapHeight = newBounds_b - newBounds_t + 1;

    transform[1] -= newBounds_l;
    transform[3] -= newBounds_t;
  } else {
    densitMapWidth = width;
    densitMapHeight = height;
  }
  var densities = new Float32Array(densitMapWidth * densitMapHeight);

  /*// Precompute extends of gaussians up to maxDensity based on cutoffIntensity and normalizedGaussScale -> ext[]
  var ext = new Float32Array(maxDensity);
  for (var i = 0; i < maxDensity; ++i) {
    ext[i] = Math.floor(Math.sqrt(Math.log(cutoffIntensity / (i + 1)) / normalizedGaussScale));
    ext[i] = Math.min(ext[i], maxExtend); // Set upper bound for ext[i]: Precomputed map of gaussian scales shouldn't be larger than densityMap (size*size)
  }*/

  // Compute extend of the largest gaussian based on cutoffIntensity and normalizedGaussScale -> maxExtend
  //console.log(maxExtend);
  maxExtend = Math.min(Math.floor(Math.sqrt(Math.log(cutoffIntensity / maxDensity) / normalizedGaussScale)), maxExtend); // Set upper bound for maxExtend: Precomputed map of gaussian scales shouldn't be larger than densityMap (size*size)
  //var maxExtend = ext[maxDensity - 1]; // Get precomputed maxExtend
  //console.log(maxExtend);

  // Precompute 2D map array of gaussian scales within maxExtend*maxExtend -> gauss[]
  var gauss = new Float32Array(maxExtend * maxExtend);
  for (var y = 0; y < maxExtend; ++y) {
    for (var x = 0; x < maxExtend; ++x) {
      gauss[y * maxExtend + x] = Math.exp(normalizedGaussScale * (x * x + y * y));
    }
  } // Draw gaussians -> densities[]
  tik();
  if (inflateToFit) {
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        if (initialDensities[y * width + x] !== 0.0) {
          var initialDensities_xy = initialDensities[y * width + x];

          // Compute extend of gaussian with value initialDensities_xy -> yExtend
          var yExtend = Math.sqrt(Math.log(cutoffIntensity / initialDensities_xy) / normalizedGaussScale);
          yExtend = Math.min(Math.floor(yExtend), maxExtend) - 1;
          if (yExtend <= 0) {
            densities[y * densitMapWidth + x] += initialDensities_xy;
            continue;
          }
          //var yExtend = ext[initialDensities_xy - 1] - 1; // Get precomputed yExtend
          var sqYExtend = yExtend * yExtend;

          for (var yy = y - yExtend, yend = y + yExtend; yy <= yend; ++yy) {
            // Compute horizontal extend of gaussian at height yy - y => xExtend
            var xExtend = Math.floor(Math.sqrt(sqYExtend - (yy - y) * (yy - y)));

            for (var xx = x - xExtend, xend = x + xExtend; xx <= xend; ++xx) {
              densities[(yy - newBounds_t) * densitMapWidth + xx - newBounds_l] += initialDensities_xy * gauss[Math.abs(y - yy) * maxExtend + Math.abs(x - xx)];
            }
          }
        }
      }
    }
  } else {
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        if (initialDensities[y * width + x] !== 0.0) {
          var initialDensities_xy = initialDensities[y * width + x];

          // Compute extend of gaussian with value initialDensities_xy -> yExtend
          var yExtend = Math.sqrt(Math.log(cutoffIntensity / initialDensities_xy) / normalizedGaussScale);
          yExtend = Math.min(Math.floor(yExtend), maxExtend) - 1;
          if (yExtend <= 0) {
            densities[y * densitMapWidth + x] += initialDensities_xy;
            continue;
          }
          //var yExtend = ext[initialDensities_xy - 1] - 1; // Get precomputed yExtend
          var sqYExtend = yExtend * yExtend;

          for (var yy = Math.max(0, y - yExtend), yend = Math.min(densitMapHeight - 1, y + yExtend); yy <= yend; ++yy) {
            // Compute horizontal extend of gaussian at height yy - y => xExtend
            var xExtend = Math.floor(Math.sqrt(sqYExtend - (yy - y) * (yy - y)));

            for (var xx = Math.max(0, x - xExtend), xend = Math.min(densitMapWidth - 1, x + xExtend); xx <= xend; ++xx) {
              densities[yy * densitMapWidth + xx] += initialDensities_xy * gauss[Math.abs(y - yy) * maxExtend + Math.abs(x - xx)];
            }
          }
        }
      }
    }
  }
  var t2 = tok(); // t2 = Measured runtime
  //console.log("Actual runtime: " + t2 + "s");

  // Free precomputed gaussian scales
  gauss = null;

  // Compute overall bounds of density map
  minDensity = Number.MAX_VALUE;maxDensity = Number.MIN_VALUE;
  newBounds_l = densitMapWidth - 1;newBounds_r = 0;newBounds_t = densitMapHeight - 1;newBounds_b = 0;
  for (var y = 0, i = 0; y < densitMapHeight; ++y) {
    for (var x = 0; x < densitMapWidth; ++x, ++i) {
      var density = logScale ? Math.log(densities[i]) : densities[i];
      if (density > 0.0) {
        densities[i] = density;
        minDensity = Math.min(minDensity, density);
        maxDensity = Math.max(maxDensity, density);
        newBounds_l = Math.min(newBounds_l, x);
        newBounds_r = Math.max(newBounds_r, x);
        newBounds_t = Math.min(newBounds_t, y);
        newBounds_b = Math.max(newBounds_b, y);
      } else densities[i] = 0.0;
    }
  }if (options['shrinkToFit']) {
    if (inflateToFit) {
      // Inflate output size to keep a 1-pixel-wide frame of zeros around the density map
      // This allows algorithms that march through densities to stay within density map bounds without explictly checking
      --newBounds_l;
      ++newBounds_r;
      --newBounds_t;
      ++newBounds_b;
    }

    transform[1] -= newBounds_l;
    transform[3] -= newBounds_t;

    // Shrink density map to exclude non-empty area
    var resizedDensitMapWidth = Math.max(0, newBounds_r - newBounds_l + 1),
        resizedDensitMapHeight = Math.max(0, newBounds_b - newBounds_t + 1),
        resizedDensityMapLength = resizedDensitMapWidth * resizedDensitMapHeight;
    var resizedDensities = new Float32Array(resizedDensityMapLength);
    if (resizedDensities.length !== 0) for (var y = 0, i = 0, j = newBounds_l + newBounds_t * densitMapWidth; y < resizedDensitMapHeight; ++y, j += densitMapWidth - resizedDensitMapWidth) {
      for (var x = 0; x < resizedDensitMapWidth; ++x, ++i, ++j) {
        resizedDensities[i] = densities[j];
      }
    }densities = resizedDensities;
    densitMapWidth = resizedDensitMapWidth;
    densitMapHeight = resizedDensitMapHeight;
  }

  var densityMap = {
    data: densities,
    minimum: minDensity,
    maximum: maxDensity,
    scale: 1.0 / (maxDensity - minDensity),
    offset: -minDensity / (maxDensity - minDensity),
    width: densitMapWidth, height: densitMapHeight,
    transform: transform,
    options: options
    /*transformX: x => transform[0] * x + transform[1],
    transformY: y => transform[2] * y + transform[3],
    invTransformX: x => (x - transform[1]) / transform[0],
    invTransformY: y => (y - transform[3]) / transform[2]*/
  };
  return densityMap;
}
/**
 * @summary Create a triangular matrix (d0 < d1) of density maps for each combination of dimensions
 * @package
 * @param  {Dataset} dataset
 * @param  {number} width
 * @param  {number} height
 * @param  {DensityMapOptions} options
 * @return {Array<Array<DensityMap>>} 2D array of density maps
 *
 * The density map of dimensions d0 and d1 can be accessed using `densityMapArray[d0][d1 - d0 - 1]`.
 */
function computeDensityMapND(dataset, width, height, options) {
  var nc = dataset.numColumns;
  var densityMap = new Array(nc - 1);
  for (var d0 = 0; d0 < nc; ++d0) {
    densityMap[d0] = new Array(nc - d0 - 1);
    for (var d1 = d0 + 1; d1 < nc; ++d1) {
      densityMap[d0][d1 - d0 - 1] = new DensityMap(computeDensityMap(computeHistogram2D(dataset, d0, d1, width, height), options));
    }
  }
  return densityMap;
}

/**
 * This function computes point densities for each point in the dataset.
 * It returns the first `Math.floor(k * (1 - targetRatio))` lowest density points (outliers) and
 * the first `Math.floor(k * targetRatio)` highest density points (cluster centers),
 * given that all returned points are at least 'dist' apart.
 * @summary Choose k characteristic points from the given dataset based on the given density map
 * @package
 * @param  {Dataset} dataset
 * @param  {number} d0 The first input dimension (This value must match the one used to compute the histogram)
 * @param  {number} d1 The second input dimension (This value must match the one used to compute the histogram)
 * @param  {DensityMap} densityMap
 * @param  {number} k Maximum number of points to return
 * @param  {number} dist Minimum Euclidean distance between returned points in normalized space (in percentage of overall data space bounds)
 * @param  {number} targetRatio A ratio between 0 (only outliers) and 1 (only cluster centers)
 * @return {Array<number>} An array of up to k point indices of characteristic points
 */
function findRepresentativePoints(dataset, d0, d1, densityMap, k, dist, targetRatio) {
  if (k <= 0) return []; // No representative points

  var n = dataset.length;
  var densities = densityMap.data,
      width = densityMap.width,
      height = densityMap.height;
  var v0 = dataset.dataVectors[d0],
      v1 = dataset.dataVectors[d1];

  // Compute density at each datapoint
  var pointDensities = new Float32Array(n);
  for (var i = 0; i < n; ++i) {
    var p0 = Math.floor(densityMap.transformX(v0.getValue(i)));
    var p1 = Math.floor(densityMap.transformY(v1.getValue(i)));

    pointDensities[i] = densities[Math.min(height - 1, p1) * width + Math.min(width - 1, p0)];
  }

  // Create indices sorted by density
  var indices = Array.from(pointDensities.keys());
  indices.sort(function (idxA, idxB) {
    return pointDensities[idxA] - pointDensities[idxB];
  });

  /*// If k >= n, all points are representative
  if (k >= n)
    return indices;*/

  // Find k representative points
  var sqDist = dist * dist;
  var d_high = indices.length - 1,
      d_low = 0;
  var pointIsHigh,
      numHighRepresentativePoints = 0,
      ratio = 0.5; // Initial ratio is "fifty-fifty"
  var next = function next() {
    if (ratio < targetRatio || ratio === targetRatio && targetRatio >= 0.5) {
      // If ratio is too low or ratio is perfect and targetRatio is high
      pointIsHigh = 1;
      return d_high--; // Retrieve next high density data point
    } else {
      // If ratio is too high or ratio is perfect and targetRatioChoose k characteristic points from the given dataset based on the given density map is low
      pointIsHigh = 0;
      return d_low++; // Retrieve next low density data point
    }
  };
  var representativePoints = [indices[next()]]; // Set first represenatative point
  numHighRepresentativePoints += pointIsHigh;
  ratio = numHighRepresentativePoints / representativePoints.length;
  while (d_high >= d_low && representativePoints.length < k) {
    var di = indices[next()];
    var di_0 = densityMap.transformX(v0.getValue(di)) / densityMap.width;
    var di_1 = densityMap.transformY(v1.getValue(di)) / densityMap.height;

    if (representativePoints.every(function (p) {
      var p0 = densityMap.transformX(v0.getValue(p)) / densityMap.width;
      var p1 = densityMap.transformY(v1.getValue(p)) / densityMap.height;
      return Math.pow(p0 - di_0, 2) + Math.pow(p1 - di_1, 2) > sqDist;
    })) {
      representativePoints.push(di);
      numHighRepresentativePoints += pointIsHigh;
      ratio = numHighRepresentativePoints / representativePoints.length;
    }
  }
  //console.log([targetRatio, ratio]);
  //console.log("[" + representativePoints.join(", ") + "]");
  return representativePoints;
}

/**
 * This function calls {@link findRepresentativePoints} first with a point distance of 0.1
 * and then iteratively shrinks the distance by half until the full k number of points are returned.
 * @summary Call {@link findRepresentativePoints}, choosing the maximum point distance that yields k points
 * @package
 * @param  {Dataset} dataset
 * @param  {number} d0 The first input dimension (This value must match the one used to compute the histogram)
 * @param  {number} d1 The second input dimension (This value must match the one used to compute the histogram)
 * @param  {DensityMap} densityMap
 * @param  {number} k Maximum number of points to return
 * @param  {number} targetRatio A ratio between 0 (only outliers) and 1 (only cluster centers)
 * @return {Array<number>} An array of up to k point indices of characteristic points
 */
function findRepresentativePoints2(dataset, d0, d1, densityMap, k, targetRatio) {
  if (libUtility.isUndefined(targetRatio)) targetRatio = 0.5; // Default ratio is "fifty-fifty"

  k = Math.min(k, dataset.length);
  var dist = 0.1;
  var representativePoints;
  while ((representativePoints = findRepresentativePoints(dataset, d0, d1, densityMap, k, dist, targetRatio)).length < k) {
    dist /= 2.0;
  }return representativePoints;
}

/**
 * @summary N-dimensional version of {@link findRepresentativePoints}
 * @package
 * @param  {Dataset} dataset
 * @param  {Array<Array<DensityMap>>} densityMap
 * @param  {number} k Maximum number of points to return
 * @param  {number} dist Minimum Euclidean distance between returned points in normalized space (in percentage of overall data space bounds)
 * @return {Array<number>} An array of up to k point indices of characteristic points
 */
function findRepresentativePointsND(dataset, densityMap, k, dist) {
  if (k <= 0) return []; // No representative points

  var data = dataset.fdata;
  var n = dataset.length;
  var nc = dataset.numColumns;
  var size = densityMap[0][0].width;
  var offsets = new Float32Array(nc),
      scales = new Float32Array(nc),
      p = new Float32Array(nc);
  for (var c = 0; c < nc; ++c) {
    scales[c] = 1 / (dataset.columns[c].maximum - dataset.columns[c].minimum);
    offsets[c] = -dataset.columns[c].minimum * scales[c];
  }

  // Compute density at each datapoint
  var pointDensities = new Float32Array(n);
  for (var i = 0; i < n; ++i) {
    for (var c = 0; c < nc; ++c) {
      p[c] = data[i * nc + c] * scales[c] + offsets[c];
    }pointDensities[i] = 0.0;
    for (var d0 = 0; d0 < nc; ++d0) {
      for (var d1 = d0 + 1; d1 < nc; ++d1) {
        var idx = Math.min(Math.floor(p[d1] * size), size - 1) * size + Math.min(Math.floor(p[d0] * size), size - 1);
        pointDensities[i] += densityMap[d0][d1 - d0 - 1].data[idx];
      }
    }
  }

  // Create indices sorted by density
  var indices = Array.from(pointDensities.keys());
  indices.sort(function (idxA, idxB) {
    return pointDensities[idxA] - pointDensities[idxB];
  });

  /*// If k >= n, all points are representative
  if (k >= n)
    return indices;*/

  // Find k representative points
  var sqDist = dist * dist,
      dpsq = new Float32Array(nc);
  var d_high = indices.length - 1,
      d_low = 0;
  var representativePoints = [indices[d_high--]]; // First represenatative point is point with highest density
  while (d_high >= d_low && representativePoints.length < k) {
    var di = indices[representativePoints.length & 0x1 ? d_low++ : d_high--];
    for (var c = 0; c < nc; ++c) {
      p[c] = data[di * nc + c] * scales[c];
    }if (representativePoints.every(function (r) {
      for (var c = 0; c < nc; ++c) {
        dpsq[c] = Math.pow(data[r * nc + c] * scales[c] - p[c], 2);
      }for (var d0 = 0; d0 < nc; ++d0) {
        for (var d1 = d0 + 1; d1 < nc; ++d1) {
          if (dpsq[d0] + dpsq[d1] <= sqDist) return false;
        }
      }return true;
    })) representativePoints.push(di);
  }
  //console.log("[" + representativePoints.join(", ") + "]");
  return representativePoints;
}
/**
 * @summary N-dimensional version of {@link findRepresentativePoints2}
 * @package
 * @param  {Dataset} dataset
 * @param  {Array<Array<DensityMap>>} densityMap
 * @param  {number} k Maximum number of points to return
 * @return {Array<number>} An array of up to k point indices of characteristic points
 */
function findRepresentativePointsND2(dataset, densityMap, k) {
  k = Math.min(k, dataset.length);
  var dist = 0.2;
  var representativePoints;
  while ((representativePoints = findRepresentativePointsND(dataset, densityMap, k, dist)).length < k) {
    dist /= 2.0;
  }return representativePoints;
}

/**
 * @summary Find a low density point close to the p-th point of the dataset
 * @package
 * @param  {Dataset} dataset
 * @param  {number} d0 The first input dimension (This value must match the one used to compute the histogram)
 * @param  {number} d1 The second input dimension (This value must match the one used to compute the histogram)
 * @param  {number} p Index of the reference point
 * @param  {DensityMap} densityMap
 * @param  {Object} stencilMap A binary matrix of same size as the density map that records low-density points to avoid overlap
 * @param  {number} minDistX Minimum distance to reserve around the returned point in x-direction of normalized space (in percentage of overall data space width)
 * @param  {number} minDistY Minimum distance to reserve around the returned point in y-direction of normalized space (in percentage of overall data space height)
 * @return {Array<number>} 2D coordinates of the found point in data space
 */
function findClosePointOfLowDensity(dataset, d0, d1, p, densityMap, stencilMap, minDistX, minDistY) {
  var densities = densityMap.data,
      width = densityMap.width,
      height = densityMap.height,
      densityScale = densityMap.scale,
      densityOffset = -densityMap.offset;
  var v0 = dataset.dataVectors[d0],
      v1 = dataset.dataVectors[d1];

  // Transform density, minDistX, minDistY from [0 ... 1] space to density map space
  densityOffset *= (width + height) / 2;
  densityScale *= (width + height) / 2;
  minDistX = Math.ceil(minDistX * width);
  minDistY = Math.ceil(minDistY * height);

  // Transform data point and data space bounds from data space to density map space
  var p0 = densityMap.transformX(v0.getValue(p));
  var p1 = densityMap.transformY(v1.getValue(p));
  var xmin = Math.min(0, Math.floor(densityMap.transformX(v0.minimum)) - minDistX - 1); //TODO: -1 ... Why?
  var xmax = Math.max(width, Math.ceil(densityMap.transformX(v0.maximum)) + minDistX + 2); //TODO: +2 ... Why?
  var ymin = Math.min(0, Math.floor(densityMap.transformY(v1.minimum)) - minDistY - 1); //TODO: -1 ... Why?
  var ymax = Math.max(height, Math.ceil(densityMap.transformY(v1.maximum)) + minDistY + 2); //TODO: +2 ... Why?
  var stencilStride = xmax - xmin;

  // Create stencilMap if it doesn't exist
  if (!stencilMap.data) stencilMap.data = new Uint8Array((stencilMap.width = xmax - xmin) * (stencilMap.height = ymax - ymin));
  var stencil = stencilMap.data;

  // Mark p in stencil map
  var imgxmin = Math.max(xmin, Math.floor(p0) - minDistX),
      imgxmax = Math.min(xmax, Math.floor(p0) + minDistX);
  var imgymin = Math.max(ymin, Math.floor(p1) - minDistY),
      imgymax = Math.min(ymax, Math.floor(p1) + minDistY);
  for (var y = imgymin; y < imgymax; ++y) {
    for (var x = imgxmin; x < imgxmax; ++x) {
      stencil[(y - ymin) * stencilStride + (x - xmin)] = 1;
    }
  } // Square minimum distances
  var sqMinDistX = minDistX * minDistX,
      sqMinDistY = minDistY * minDistY;
  var sqDensityOffset = densityOffset * densityOffset;

  var closestPoint = null,
      closestPointPenalty = Number.MAX_VALUE;
  var sqdx, sqdy;
  for (var y = ymin; y < ymax; ++y) {
    for (var x = xmin; x < xmax; ++x) {
      if (stencil[(y - ymin) * stencilStride + (x - xmin)] === 0) {
        sqdx = Math.pow(x - p0, 2);
        sqdy = Math.pow(y - p1, 2);
        if (sqdx > sqMinDistX && sqdy > sqMinDistY) {
          var sqDensity = x >= 0 && x < width && y >= 0 && y < height ? Math.pow(densityOffset + densities[y * width + x] * densityScale, 2) : sqDensityOffset;
          var sqDist = sqdx + sqdy;
          var penalty = 1e10 * sqDensity + sqDist;
          if (penalty < closestPointPenalty) {
            closestPointPenalty = penalty;
            closestPoint = [x, y];
          }
        }
      }
    }
  }if (closestPoint === null) return closestPoint;

  // Mark image in stencil map
  imgxmin = Math.max(xmin, closestPoint[0] - 2 * minDistX);imgxmax = Math.min(xmax, closestPoint[0] + 2 * minDistX);
  imgymin = Math.max(ymin, closestPoint[1] - 2 * minDistY);imgymax = Math.min(ymax, closestPoint[1] + 2 * minDistY);
  for (var y = imgymin; y < imgymax; ++y) {
    for (var x = imgxmin; x < imgxmax; ++x) {
      stencil[(y - ymin) * stencilStride + (x - xmin)] = 1;
    }
  } //downloadStencilMap(stencilMap);

  // Transform closestPoint back from density map space to data space
  closestPoint[0] = densityMap.invTransformX(closestPoint[0]); //(closestPoint[0] / width - o0) / s0;
  closestPoint[1] = densityMap.invTransformY(closestPoint[1]); //(closestPoint[1] / height - o1) / s1;

  return closestPoint;
}
/**
 * This function marks regions of minDistX/minDistY around each point in points in the stencil map.
 * These regions are ignored when looking for points of low density using {@link findClosePointOfLowDensity}.
 * @package
 * @summary Mark the given points in the stencil map
 * @param  {Dataset} dataset
 * @param  {number} d0 The first input dimension (This value must match the one used to compute the histogram)
 * @param  {number} d1 The second input dimension (This value must match the one used to compute the histogram)
 * @param  {Array<number>} points Indices to points to mark
 * @param  {DensityMap} densityMap
 * @param  {Object} stencilMap A binary matrix of same size as the density map that records low-density points to avoid overlap
 * @param  {number} minDistX Minimum distance to reserve around the marked points in x-direction of normalized space (in percentage of overall data space width)
 * @param  {number} minDistY Minimum distance to reserve around the marked points in y-direction of normalized space (in percentage of overall data space height)
 */
function markPointsInStencilMap(dataset, d0, d1, points, densityMap, stencilMap, minDistX, minDistY) {
  var width = densityMap.width,
      height = densityMap.height;
  var v0 = dataset.dataVectors[d0],
      v1 = dataset.dataVectors[d1];

  // Transform minDistX, minDistY from [0 ... 1] space to density map space
  minDistX = Math.ceil(minDistX * width);
  minDistY = Math.ceil(minDistY * height);

  // Transform data space bounds from data space to density map space
  var xmin = Math.min(0, Math.floor(densityMap.transformX(v0.minimum)) - minDistX - 1); //TODO: -1 ... Why?
  var xmax = Math.max(width, Math.ceil(densityMap.transformX(v0.maximum)) + minDistX + 2); //TODO: +2 ... Why?
  var ymin = Math.min(0, Math.floor(densityMap.transformY(v1.minimum)) - minDistY - 1); //TODO: -1 ... Why?
  var ymax = Math.max(height, Math.ceil(densityMap.transformY(v1.maximum)) + minDistY + 2); //TODO: +2 ... Why?
  var stencilStride = xmax - xmin;

  // Create stencilMap if it doesn't exist
  if (!stencilMap.data) stencilMap.data = new Uint8Array((stencilMap.width = xmax - xmin) * (stencilMap.height = ymax - ymin));
  var stencil = stencilMap.data;

  points.forEach(function (p) {
    var p0 = Math.floor(densityMap.transformX(v0.getValue(p)));
    var p1 = Math.floor(densityMap.transformY(v1.getValue(p)));
    var imgxmin = Math.max(xmin, p0 - minDistX),
        imgxmax = Math.min(xmax, p0 + minDistX);
    var imgymin = Math.max(ymin, p1 - minDistY),
        imgymax = Math.min(ymax, p1 + minDistY);
    for (var y = imgymin; y < imgymax; ++y) {
      for (var x = imgxmin; x < imgxmax; ++x) {
        stencil[(y - ymin) * stencilStride + (x - xmin)] = 1;
      }
    }
  });
  //downloadStencilMap(stencilMap);
}
/**
 * @summary Download the given stencil map as black-and-white image
 * @package
 * @param  {Object} stencilMap
 * @param  {string=} fileName=stencilMap.png The file name of the downloaded image.
 */
function downloadStencilMap(stencilMap, fileName) {
  if (!fileName) fileName = 'stencilMap.png';

  var bytes = new Uint8Array(4 * stencilMap.width * stencilMap.height);
  for (var i = 0; i < stencilMap.data.length; ++i) {
    bytes[i * 4 + 0] = bytes[i * 4 + 1] = bytes[i * 4 + 2] = stencilMap.data[i] != 0 ? 255 : 0;
    bytes[i * 4 + 3] = 255;
  }
  libUtility.download(fileName, libUtility.imageUrlFromBytes(bytes, stencilMap.width, stencilMap.height));
}
/**
 * This function uses uniform cost search to explore regions beyond local minima.
 * @summary Find a low density point close to the p-th point of the dataset by following the gradient of the density map
 * @package
 * @param  {Dataset} dataset
 * @param  {number} d0 The first input dimension (This value must match the one used to compute the histogram)
 * @param  {number} d1 The second input dimension (This value must match the one used to compute the histogram)
 * @param  {number} p Index of the reference point
 * @param  {DensityMap} densityMap
 * @param  {number} minDistX Minimum distance to reserve around the returned point in x-direction of normalized space (in percentage of overall data space width)
 * @param  {number} minDistY Minimum distance to reserve around the returned point in y-direction of normalized space (in percentage of overall data space height)
 * @return {Array<number>} 2D coordinates of the found point in data space
 * @deprecated Use {@link findClosePointOfLowDensity} instead
 */
function findClosePointOfLowDensity_descend(dataset, d0, d1, p, densityMap, minDistX, minDistY) {
  var data = dataset.fdata;
  var n = dataset.length;
  var nc = dataset.numColumns;
  var s0 = 1 / (dataset.columns[d0].maximum - dataset.columns[d0].minimum);
  var o0 = -dataset.columns[d0].minimum * s0;
  var s1 = 1 / (dataset.columns[d1].maximum - dataset.columns[d1].minimum);
  var o1 = -dataset.columns[d1].minimum * s1;
  var densities = densityMap.data,
      width = densityMap.width,
      height = densityMap.height,
      densityScale = densityMap.scale,
      densityOffset = -densityMap.offset;

  // Transform data point from data space to density map space
  var p0 = (data[p * nc + d0] * s0 + o0) * width;
  var p1 = (data[p * nc + d1] * s1 + o1) * height;
  //console.log(p0);
  //console.log(p1);

  // Transform density, minDistX, minDistY from [0 ... 1] space to density map space
  densityOffset *= (width + height) / 2;
  densityScale *= (width + height) / 2;
  minDistX = Math.ceil(minDistX * width);
  minDistY = Math.ceil(minDistY * height);

  // Define overall bounds
  var xMin = minDistX,
      xMax = width - minDistX;
  var yMin = minDistY,
      yMax = height - minDistY;

  var computePenalty = function computePenalty(x, y) {
    var sqDensity = Math.pow(densityOffset + densities[y * width + x] * densityScale, 2);
    var sqDist = Math.pow(x - p0, 2) + Math.pow(y - p1, 2);
    return 1e5 * sqDensity + sqDist;
  };

  var bestState = { penalty: Number.MAX_VALUE },
      maxIterations = 5000;
  var searchProblem = {
    getStartState: function getStartState() {
      return {
        x: Math.max(xMin, Math.min(xMax - 1, Math.floor(p0))),
        y: Math.max(yMin, Math.min(yMax - 1, Math.floor(p1)))
      };
    },
    isGoalState: function isGoalState(state) {
      return --maxIterations === 0;
    },
    forEachSuccessor: function forEachSuccessor(state, onSuccessor) {
      [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].forEach(function (action) {
        var x = state.x + action[0];
        var y = state.y + action[1];
        if (x >= xMin && x < xMax && y >= yMin && y < yMax) {
          var newState = { x: x, y: y, penalty: computePenalty(x, y) };
          if (newState.penalty < bestState.penalty && (x < p0 - minDistX || x > p0 + minDistX) && (y < p0 - minDistY || y > p0 + minDistY)) bestState = newState;
          onSuccessor(newState, newState.penalty);
        }
      });
    },
    computeHash: function computeHash(state) {
      return state.y * width + state.x;
    },
    heuristic: function heuristic(state) {
      return Math.pow(densityOffset + densities[state.y * width + state.x] * densityScale, 2);
    }
  };
  SimpleUniformCostSearch(searchProblem);
  var closestPoint = [bestState.x, bestState.y];

  // Transform closestPoint back from density map space to data space
  closestPoint[0] = (closestPoint[0] / width - o0) / s0;
  closestPoint[1] = (closestPoint[1] / height - o1) / s1;

  return closestPoint;
}

/**
 * @summary N-dimensional version of {@link findClosePointOfLowDensity_descend}
 * @package
 * @param  {Dataset} dataset
 * @param  {number} p Index of the reference point
 * @param  {Array<Array<DensityMap>>} densityMap
 * @param  {number} minDist Minimum distance to reserve around the returned point in normalized space (in percentage of overall data space bounds)
 * @return {Array<number>} {@link Dataset#numColumns}-diemnsional coordinates of the found point in data space
 * @deprecated This function is slow and yields unsatisfying results. Consider using 2D algorithms instead.
 */
function findClosePointOfLowDensityND_descend(dataset, p, densityMap, minDist) {
  var data = dataset.fdata;
  var n = dataset.length;
  var nc = dataset.numColumns;
  var size = densityMap[0][0].width,
      densityScale = densityMap[0][0].scale,
      densityOffset = -densityMap[0][0].offset; //EDIT: Take offset/scale over all density maps

  // Transform data point from data space to [0 ... size] space
  var start = new Float32Array(nc);
  for (var c = 0; c < nc; ++c) {
    start[c] = (data[p * nc + c] - dataset.columns[c].minimum) * size / (dataset.columns[c].maximum - dataset.columns[c].minimum);
  } // Transform density and minDist from [0 ... 1] space to [0 ... size] space
  densityOffset *= size;
  densityScale *= size;
  minDist = Math.ceil(minDist * size);

  // Define overall bounds
  var min = minDist,
      max = size - minDist;

  var actions = [];
  var a = new Float32Array(nc),
      i;
  for (var c = 0; c < nc; ++c) {
    a[c] = -1;
  }do {
    if (!a.every(function (aa) {
      return aa === 0;
    })) actions.push(a.slice());
    i = 0;
    while (i !== a.length && ++a[i] === 2) {
      a[i] = 0;
      ++i;
    }
  } while (i !== a.length);

  var computePenalty = function computePenalty(p) {
    var sqDensity = 0.0;
    for (var d0 = 0; d0 < nc; ++d0) {
      for (var d1 = d0 + 1; d1 < nc; ++d1) {
        sqDensity += Math.pow(densityOffset + densityMap[d0][d1 - d0 - 1].data[p[d1] * size + p[d0]] * densityScale, 2);
      }
    }var sqDist = p.reduce(function (a, p, pi) {
      var dp = Math.abs(p - start[pi]);
      return a + (dp > minDist ? Math.pow(dp - minDist, 2) : Math.pow(minDist - dp, 2));
    });
    return sqDensity + sqDist;
  };

  var bestState = { penalty: Number.MAX_VALUE },
      maxIterations = 100; //5000;
  var searchProblem = {
    getStartState: function getStartState() {
      var _start = new Float32Array(nc);
      for (var c = 0; c < nc; ++c) {
        _start[c] = Math.max(min, Math.min(max - 1, Math.floor(start[c])));
      }return { p: _start };
    },
    isGoalState: function isGoalState(state) {
      return --maxIterations === 0;
    },
    forEachSuccessor: function forEachSuccessor(state, onSuccessor) {
      actions.forEach(function (action) {
        var p = new Float32Array(nc);
        for (var c = 0; c < nc; ++c) {
          p[c] = state.p[c] + action[c];
          if (p[c] < min || p[c] >= max) return;
        }
        var newState = { p: p, penalty: computePenalty(p) };
        if (newState.penalty < bestState.penalty /*&& p.every(function(pp, pi) { return pp < start[pi] - minDist || pp > start[pi] + minDist; })*/) bestState = newState;
        onSuccessor(newState, newState.penalty);
      });
    },
    computeHash: function computeHash(state) {
      var factor = 1.0,
          hash = 0.0;
      for (var c = 0; c < nc; ++c) {
        hash += state.p[c] * factor;
        factor *= size;
      }
      return hash;
    },
    heuristic: function heuristic(state) {
      var sqDensity = 0.0;
      for (var d0 = 0; d0 < nc; ++d0) {
        for (var d1 = d0 + 1; d1 < nc; ++d1) {
          sqDensity += Math.pow(densityOffset + densityMap[d0][d1 - d0 - 1].data[state.p[d1] * size + state.p[d0]] * densityScale, 2);
        }
      }return sqDensity;
    }
  };
  //var tStart = performance.now();
  //BreadthFirstSearch(searchProblem);
  //DepthFirstSearch(searchProblem);
  SimpleUniformCostSearch(searchProblem);
  //SimpleAStarSearch(searchProblem);
  //SimpleGreedySearch(searchProblem);
  //var tEnd = performance.now();
  //console.log((tEnd - tStart) / 1000.0);
  var closestPoint = bestState.p;

  /*var xMin = Math.max(0, closestPoint[0] - 2 * minDistX), xMax = Math.min(size, closestPoint[0] + 2 * minDistX);
  var yMin = Math.max(0, closestPoint[1] - 2 * minDistY), yMax = Math.min(size, closestPoint[1] + 2 * minDistY);
  for (var y = yMin; y < yMax; ++y)
    for (var x = xMin; x < xMax; ++x)
      densityMap[y * size + x] = 1e20;*/

  // Transform closestPoint back from [0 ... size] space to data space
  for (var c = 0; c < nc; ++c) {
    closestPoint[c] = dataset.columns[c].minimum + closestPoint[c] * (dataset.columns[c].maximum - dataset.columns[c].minimum) / size;
  }return closestPoint;
}
/**
 * This function uses rejection sampling
 * @summary Find a point within the density map by sampling densities
 * @package
 * @param  {DensityMap} densityMap
 * @return {Array<number>} 2D coordinates of the sampled point in density map coordinates
 */
function sampleDensityMap(densityMap) {
  var width = densityMap.width,
      height = densityMap.height,
      scale = densityMap.maximum;

  var sample_x, sample_y, sample_d;
  //var nAttempts = 0;
  do {
    sample_x = Math.random() * width;
    sample_y = Math.random() * height;
    sample_d = Math.random() * scale;
    //++nAttempts;
  } while (densityMap.data[Math.floor(sample_y) * width + Math.floor(sample_x)] < sample_d);

  return [sample_x, sample_y];
}
/**
 * This function uses rejection sampling
 * @summary Find a point within a fixed column of the density map by sampling densities
 * @package
 * @param  {DensityMap} densityMap
 * @param  {number} sample_y The column of the density map to sample
 * @param  {number} maxIterations The maximum number of attempts, before `NaN` is returned
 * @return {number} The y-coordinate (row) of the sampled point or `NaN` if maxIterations attempts were unsuccessful
 */
function sampleDensityMapRow(densityMap, sample_y, maxIterations) {
  if (libUtility.isUndefined(maxIterations)) maxIterations = Number.MAX_SAFE_INTEGER;

  var width = densityMap.width,
      height = densityMap.height,
      scale = densityMap.maximum;
  sample_y = Math.floor(sample_y) * height;

  var sample_x, sample_d;
  do {
    sample_x = Math.random() * width;
    sample_d = Math.random() * scale;
  } while (--maxIterations && densityMap.data[sample_y + Math.floor(sample_x)] < sample_d);

  return densityMap.data[sample_y + Math.floor(sample_x)] >= sample_d ? sample_x : NaN;
}
/**
 * This function uses rejection sampling
 * @summary Find a point within a fixed row of the density map by sampling densities
 * @package
 * @param  {DensityMap} densityMap
 * @param  {number} sample_x The row of the density map to sample
 * @param  {number} maxIterations The maximum number of attempts, before `NaN` is returned
 * @return {number} The x-coordinate (column) of the sampled point or `NaN` if maxIterations attempts were unsuccessful
 */
function sampleDensityMapColumn(densityMap, sample_x, maxIterations) {
  if (libUtility.isUndefined(maxIterations)) maxIterations = Number.MAX_SAFE_INTEGER;

  var width = densityMap.width,
      height = densityMap.height,
      scale = densityMap.maximum;
  sample_x = Math.floor(sample_x);

  var sample_y, sample_d;
  do {
    sample_y = Math.random() * height;
    sample_d = Math.random() * scale;
  } while (--maxIterations && densityMap.data[Math.floor(sample_y) * width + sample_x] < sample_d);

  return densityMap.data[Math.floor(sample_y) * width + sample_x] >= sample_d ? sample_y : NaN;
}

/**
 * This function uses rejection sampling
 * @summary Find a point in n-dimensional space by sampling a chain of (n-1) 2D density maps
 * @package
 * @param  {Array<DensityMap>} densityMapChain An array of density maps of the form `[DensityMap(d0=0, d1=1), DensityMap(d0=1, d1=2) ... DensityMap(d0=n-2, d1=n-1)]`
 * @return {Array<number>} n-dimensional coordinates of the sampled point in density map coordinates
 */
function sampleDensityMapChain(densityMapChain) {
  var chainLength = densityMapChain.length,
      sample = new Array(chainLength + 1);

  // Pick an initial densityMap from the chain
  var sample_m = Math.floor(Math.random() * chainLength);

  var i;
  do {
    // Sample the initial map
    var initialSamples = sampleDensityMap(densityMapChain[sample_m]);
    sample[sample_m] = initialSamples[0];
    sample[sample_m + 1] = initialSamples[1];

    // Sample below initialSamples
    var lastSample = initialSamples[0];
    for (i = sample_m - 1; i >= 0 && !isNaN(lastSample); --i) {
      sample[i] = lastSample = sampleDensityMapRow(densityMapChain[i], lastSample, sample_m - i);
    }if (isNaN(lastSample)) continue;

    // Sample above initialSamples
    lastSample = initialSamples[1];
    for (i = sample_m + 1; i < chainLength && !isNaN(lastSample); ++i) {
      sample[i + 1] = lastSample = sampleDensityMapColumn(densityMapChain[i], lastSample, i - sample_m);
    }
  } while (isNaN(lastSample));

  return sample;
}

/**
 * @package
 * @param  {Dataset} dataset
 * @param  {number} d0
 * @param  {number} d1
 * @param  {DensityMap} densityMap
 * @return {Object}
 * @deprecated Use {@link computeClusterMap_method3} instead
 */
function computeClusterMap_method1(dataset, d0, d1, densityMap) {
  var data = dataset.fdata;
  var n = dataset.length;
  var nc = dataset.numColumns;
  var s0 = 1 / (dataset.columns[d0].maximum - dataset.columns[d0].minimum);
  var o0 = -dataset.columns[d0].minimum * s0;
  var s1 = 1 / (dataset.columns[d1].maximum - dataset.columns[d1].minimum);
  var o1 = -dataset.columns[d1].minimum * s1;
  var densities = densityMap.data,
      width = densityMap.width,
      height = densityMap.height;

  // Compute density at each datapoints -> pointDensities
  var pointDensities = new Float32Array(n);
  for (var i = 0; i < n; ++i) {
    var p0 = data[i * nc + d0] * s0 + o0;
    var p1 = data[i * nc + d1] * s1 + o1;

    var idx = Math.min(Math.floor(p1 * height), height - 1) * width + Math.min(Math.floor(p0 * width), width - 1);
    pointDensities[i] = densities[idx];
  }

  // Create indices sorted by density
  var indices = Array.from(pointDensities.keys());
  indices.sort(function (idxA, idxB) {
    return pointDensities[idxA] - pointDensities[idxB];
  });

  // Allocate cluster map
  var clustermap = new Uint32Array(width * height);

  var currentClusterId = 1; // Cluster IDs start at 1. 0 represents empty areas

  var floodFillRecursive = function floodFillRecursive(x, y, d) {
    clustermap[y * width + x] = currentClusterId;

    --x;
    --y;
    if (x !== -1 && y !== -1) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) floodFillRecursive(x, y, nd);
    }

    ++x;
    if (y !== -1) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) floodFillRecursive(x, y, nd);
    }

    ++x;
    if (x !== width && y !== -1) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) floodFillRecursive(x, y, nd);
    }

    ++y;
    if (x !== width) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) floodFillRecursive(x, y, nd);
    }

    ++y;
    if (x !== width && y !== height) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) floodFillRecursive(x, y, nd);
    }

    --x;
    if (y !== height) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) floodFillRecursive(x, y, nd);
    }

    --x;
    if (x !== -1 && y !== height) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) floodFillRecursive(x, y, nd);
    }

    ++y;
    if (x !== -1) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) floodFillRecursive(x, y, nd);
    }
  };

  //for (var i = n - 1; i >= 0; --i) // Iteraterate points in order of decreasing point density
  for (var i = 0; i < n; ++i) {
    // Iteraterate points in order of increasing point density
    var p0 = data[indices[i] * nc + d0] * s0 + o0;
    var p1 = data[indices[i] * nc + d1] * s1 + o1;

    var x = Math.clamp(Math.floor(p0 * width), 0, width - 1);
    var y = Math.clamp(Math.floor(p1 * height), 0, height - 1);
    if (clustermap[y * width + x] === 0) {
      // If clustermap[y * width + x] doesn't contain a cluster
      floodFillRecursive(x, y, densities[y * width + x]);
      ++currentClusterId;
    }
  }

  return clustermap;
}

/**
 * @package
 * @param  {Dataset} dataset
 * @param  {number} d0
 * @param  {number} d1
 * @param  {DensityMap} densityMap
 * @return {Object}
 * @deprecated Use {@link computeClusterMap_method3} instead
 */
function computeClusterMap_method2(dataset, d0, d1, densityMap) {
  var data = dataset.fdata;
  var n = dataset.length;
  var nc = dataset.numColumns;
  var s0 = 1 / (dataset.columns[d0].maximum - dataset.columns[d0].minimum);
  var o0 = -dataset.columns[d0].minimum * s0;
  var s1 = 1 / (dataset.columns[d1].maximum - dataset.columns[d1].minimum);
  var o1 = -dataset.columns[d1].minimum * s1;
  var densities = densityMap.data,
      width = densityMap.width,
      height = densityMap.height;

  // Compute density at each datapoints -> pointDensities
  var pointDensities = new Float32Array(n);
  for (var i = 0; i < n; ++i) {
    var p0 = data[i * nc + d0] * s0 + o0;
    var p1 = data[i * nc + d1] * s1 + o1;

    var idx = Math.min(Math.floor(p1 * height), height - 1) * width + Math.min(Math.floor(p0 * width), width - 1);
    pointDensities[i] = densities[idx];
  }

  // Create indices sorted by density
  var indices = Array.from(pointDensities.keys());
  indices.sort(function (idxA, idxB) {
    return pointDensities[idxA] - pointDensities[idxB];
  });

  // Allocate cluster map
  var clustermap = new Uint32Array(width * height);
  //var clusterQueues = [];

  var currentClusterId = 1; // Cluster IDs start at 1. 0 represents empty areas

  var neighborQueue = new libUtility.PriorityQueue('d'); // Queue of all neighbors of clusters (candidates ro be included in the cluster)

  //for (var i = n - 1; i >= 0; --i) // Iteraterate points in order of decreasing point density
  for (var i = 0; i < n; ++i) {
    // Iteraterate points in order of increasing point density
    var p0 = data[indices[i] * nc + d0] * s0 + o0;
    var p1 = data[indices[i] * nc + d1] * s1 + o1;

    var x = Math.clamp(Math.floor(p0 * width), 0, width - 1);
    var y = Math.clamp(Math.floor(p1 * height), 0, height - 1);
    if (clustermap[y * width + x] === 0) {
      // If clustermap[y * width + x] doesn't contain a cluster
      clustermap[y * width + x] = currentClusterId;
      var d = densities[y * width + x]; //EDIT: Not sure if we need 'nd < n'

      if (--x !== -1) {
        var nd = densities[y * width + x];
        if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) neighborQueue.push({ c: clustermap[y * width + x] = currentClusterId, x: x, y: y, d: densities[y * width + x] });
      }

      ++x;
      if (++x !== width) {
        var nd = densities[y * width + x];
        if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) neighborQueue.push({ c: clustermap[y * width + x] = currentClusterId, x: x, y: y, d: densities[y * width + x] });
      }

      --x;
      if (--y !== -1) {
        var nd = densities[y * width + x];
        if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) neighborQueue.push({ c: clustermap[y * width + x] = currentClusterId, x: x, y: y, d: densities[y * width + x] });
      }

      ++y;
      if (++y !== height) {
        var nd = densities[y * width + x];
        if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) neighborQueue.push({ c: clustermap[y * width + x] = currentClusterId, x: x, y: y, d: densities[y * width + x] });
      }

      ++currentClusterId; // EDIT: Maybe use 'i + 1' as cluster ID
    }
  }

  while (neighborQueue.length) {
    var neighbor = neighborQueue.shift();
    var x = neighbor.x,
        y = neighbor.y,
        d = neighbor.d,
        id = neighbor.c;

    if (--x !== -1) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) neighborQueue.push({ c: clustermap[y * width + x] = id, x: x, y: y, d: densities[y * width + x] });
    }

    ++x;
    if (++x !== width) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) neighborQueue.push({ c: clustermap[y * width + x] = id, x: x, y: y, d: densities[y * width + x] });
    }

    --x;
    if (--y !== -1) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) neighborQueue.push({ c: clustermap[y * width + x] = id, x: x, y: y, d: densities[y * width + x] });
    }

    ++y;
    if (++y !== height) {
      var nd = densities[y * width + x];
      if (nd !== 0 && nd < d && clustermap[y * width + x] === 0) neighborQueue.push({ c: clustermap[y * width + x] = id, x: x, y: y, d: densities[y * width + x] });
    }
  }

  return clustermap;
}

var ForwardList = libUtility.ForwardList;
var PriorityQueue = libUtility.PriorityQueue;

/**
 * This function can be computed by an asynchronous worker.
 * It inputs and outputs plain JavaScript objects, because data passed between the main thread and an asynchronous worker has to be primitive
 * (e.g. it cannot contain function objects).
 * @summary Compute a {@link ClusterMap} from a {@link DensityMap} computed by {@link computeDensityMap}
 * @package
 * @param  {Object} densityMap To create a densityMap object from a {@link DensityMap}, call `makeCloneable(densityMap)`
 * @param  {number} d0 The first input dimension (This value must match the one used to compute the histogram)
 * @param  {number} d1 The second input dimension (This value must match the one used to compute the histogram)
 * @param  {ClusterMapOptions} options
 * @return {Object} A cluster map object
 *
 * To get a {@link ClusterMap} from the output object, call `new ClusterMap(clusterMap)`
 */
function computeClusterMap_method3(densityMap, d0, d1, options) {
  var densities = densityMap.data,
      width = densityMap.width,
      height = densityMap.height,
      len = width * height;
  var densityThreshold = options.threshold * densityMap.maximum;

  // Allocate cluster map
  var clustermap = new Uint32Array(len);

  // Walk through density map and combine regions of density>=densityThreshold into clusters -> clusters, clustermap
  var leftClusterId, topClusterId;
  var clusters = [];
  for (var y = 0; y < height; ++y) {
    leftClusterId = 0;
    for (var x = 0; x < width; ++x) {
      var d = densities[y * width + x];

      if (d >= densityThreshold) {
        if (leftClusterId !== 0) {
          if (y !== 0 && (topClusterId = clustermap[(y - 1) * width + x]) !== 0 && topClusterId !== leftClusterId) {
            // Link clusters
            var leftCluster = clusters[leftClusterId - 1];
            var topCluster = clusters[topClusterId - 1];
            clusters[leftClusterId - 1] = ForwardList.sortedMerge(leftCluster, topCluster);
            clusters[topClusterId - 1] = clusters[leftClusterId - 1];
            topClusterId = leftClusterId;
          }
          clustermap[y * width + x] = leftClusterId;
        } else if (y !== 0 && (topClusterId = clustermap[(y - 1) * width + x]) !== 0) clustermap[y * width + x] = leftClusterId = topClusterId;else clusters.push(new ForwardList(clustermap[y * width + x] = leftClusterId = clusters.length + 1));
      } else
        //clustermap[y * width + x] = leftClusterId = 0; // For languages that don't initialize arrays
        leftClusterId = 0;
    }
  }

  // Combine lists of merged cluster IDs to cluster IDs -> clusters
  var clusterId = 1;
  for (var i = 0; i < clusters.length; ++i) {
    if (clusters[i] === null) clusters[i] = 0;else if (clusters[i] instanceof ForwardList) {
      clusters[i].forEach(function (id) {
        clusters[id - 1] = clusterId;
      });
      ++clusterId;
    }
  }
  var numClusters = --clusterId;

  // Assign cluster IDs to clustermap -> clustermap
  for (var i = 0; i < len; ++i) {
    clustermap[i] = clustermap[i] ? clusters[clustermap[i] - 1] : 0;
  } // Compute cluster densities (= maximum densities per cluster) -> clusterDensities
  var clusterDensities = Array.apply(null, Array(numClusters)).map(Number.prototype.valueOf, Number.MIN_VALUE);
  for (var i = 0; i < len; ++i) {
    if (clusterId = clustermap[i]) clusterDensities[clusterId - 1] = Math.max(clusterDensities[clusterId - 1], densityMap.data[i]);
  }var clusterMinDensities = Array.apply(null, Array(numClusters)).map(Number.prototype.valueOf, densityThreshold);

  if (false) {
    // Extend clusters to fill entire density != 0 area

    var neighborQueue = new PriorityQueue('d'); // Queue of all neighbors of clusters (candidates ro be included in the cluster)

    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        if (clustermap[y * width + x] !== 0 && (x < width - 1 && clustermap[y * width + x - 1] === 0 || x > 0 && clustermap[y * width + x + 1] === 0 || y > 0 && clustermap[(y - 1) * width + x] === 0 || y < height - 1 && clustermap[(y + 1) * width + x] === 0)) neighborQueue.push({ c: clustermap[y * width + x], x: x, y: y, d: densities[y * width + x] });
      }
    }while (neighborQueue.length) {
      var neighbor = neighborQueue.shift();
      var x = neighbor.x,
          y = neighbor.y,
          d = neighbor.d,
          id = neighbor.c;

      if (--x !== -1) {
        var nd = densities[y * width + x];
        if (nd !== 0 && clustermap[y * width + x] === 0) {
          neighborQueue.push({ c: clustermap[y * width + x] = id, x: x, y: y, d: nd = densities[y * width + x] });
          clusterMinDensities[id - 1] = Math.min(clusterMinDensities[id - 1], nd);
        }
      }

      ++x;
      if (++x !== width) {
        var nd = densities[y * width + x];
        if (nd !== 0 && clustermap[y * width + x] === 0) {
          neighborQueue.push({ c: clustermap[y * width + x] = id, x: x, y: y, d: nd = densities[y * width + x] });
          clusterMinDensities[id - 1] = Math.min(clusterMinDensities[id - 1], nd);
        }
      }

      --x;
      if (--y !== -1) {
        var nd = densities[y * width + x];
        if (nd !== 0 && clustermap[y * width + x] === 0) {
          neighborQueue.push({ c: clustermap[y * width + x] = id, x: x, y: y, d: nd = densities[y * width + x] });
          clusterMinDensities[id - 1] = Math.min(clusterMinDensities[id - 1], nd);
        }
      }

      ++y;
      if (++y !== height) {
        var nd = densities[y * width + x];
        if (nd !== 0 && clustermap[y * width + x] === 0) {
          neighborQueue.push({ c: clustermap[y * width + x] = id, x: x, y: y, d: nd = densities[y * width + x] });
          clusterMinDensities[id - 1] = Math.min(clusterMinDensities[id - 1], nd);
        }
      }
    }
  }

  var clusterMap = {
    data: clustermap,
    densities: clusterDensities,
    minDensities: clusterMinDensities,
    threshold: densityThreshold,
    n: numClusters,
    width: width, height: height,
    transform: densityMap.transform
    /*transformX: densityMap.transformX,
    transformY: densityMap.transformY,
    invTransformX: densityMap.invTransformX,
    invTransformY: densityMap.invTransformY*/
  };
  return clusterMap;
}

/**
 * @summary Download the given density map as floating point image
 * @package
 * @param  {DensityMap} densityMap
 * @param  {string=} fileName=densityMap.png The file name of the downloaded image.
 */
function downloadDensityMap(densityMap, fileName) {
  if (!fileName) fileName = 'densityMap.png';

  libUtility.download(fileName, libUtility.imageUrlFromBytes(libUtility.F32toI24flipY(densityMap.data, [densityMap.minimum, densityMap.maximum], densityMap.width, densityMap.height), densityMap.width, densityMap.height));
}

/**
 * @summary 2D vector-line intersection test
 * @package
 * @param  {Array<number>} vpos Origin of the vector
 * @param  {Array<number>} vdir Direction of the vector
 * @param  {Array<number>} a Start point of the line
 * @param  {Array<number>} b End point of the line
 * @return {Array<number>} Point of intersection or null if no intersection occured
 */
function vectorLineIntersection2D(vpos, vdir, a, b) {
  var x1 = vpos[0],
      y1 = vpos[1],
      x2 = vpos[0] + vdir[0],
      y2 = vpos[1] + vdir[1];
  var x3 = a[0],
      y3 = a[1],
      x4 = b[0],
      y4 = b[1];

  var denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denom > -1e-5 && denom < 1e-5) return null; // Line and vector are parallel or coincident

  //console.log([(x1 * y2 - y1 * x2) / denom, (x3 * y4 - y3 * x4) / denom]);

  var xi = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
  var yi = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;

  var u = Math.abs(x4 - x3) > Math.abs(y4 - y3) ? (xi - x3) / (x4 - x3) : (yi - y3) / (y4 - y3);
  //console.log(u);
  if (u < 0.0 || u > 1.0) return null; // Intersection lies outside the range a...b


  return [xi, yi];
}

/**
 * Source: http://ideone.com/PnPJgb
 * @summary 2D line-line intersection test
 * @package
 * @param  {Array<number>} a Start point of line 1
 * @param  {Array<number>} b End point of line 1
 * @param  {Array<number>} c Start point of line 2
 * @param  {Array<number>} d End point of line 2
 * @return {boolean} True if the two lines intersect
 */
function linesIntersect(a, b, c, d) {
  var CmP = [c[0] - a[0], c[1] - a[1]];
  var r = [b[0] - a[0], b[1] - a[1]];
  var s = [d[0] - c[0], d[1] - c[1]];

  var CmPxr = CmP[0] * r[1] - CmP[1] * r[0];
  var CmPxs = CmP[0] * s[1] - CmP[1] * s[0];
  var rxs = r[0] * s[1] - r[1] * s[0];

  if (CmPxr === 0)
    // Lines are collinear, and therefore intersect if they have any overlap
    return c[0] - a[0] < 0 !== c[0] - b[0] < 0 || c[1] - a[1] < 0 !== c[1] - b[1] < 0;

  if (rxs === 0)
    // Lines are parallel
    return false;

  var rxsr = 1 / rxs;
  var t = CmPxs * rxsr;
  var u = CmPxr * rxsr;

  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

/**
 * Tests if point P lies within polygon V.
 * <pre>
 * // Copyright 2000 softSurfer, 2012 Dan Sunday
 * // This code may be freely used and modified for any purpose
 * // providing that this copyright notice is included with it.
 * // SoftSurfer makes no warranty for this code, and cannot be held
 * // liable for any real or imagined damage resulting from its use.
 * // Users of this code must verify correctness for their application.
 * </pre>
 * @summary 2D winding number test by Dan Sunday
 * @package
 * @param  {Array<number>} P The point to be tested
 * @param  {Array<Array<number>>} V A closed (first point == last point) polygon of points
 * @return {boolean} True if point P is included by polygon V
 */
function pointInsidePolygon(P, V) {
  var n = V.length - 1,
      wn = 0; // wn: The winding number counter

  var isLeft = function isLeft(P0, P1, P2) {
    return (P1[0] - P0[0]) * (P2[1] - P0[1]) - (P2[0] - P0[0]) * (P1[1] - P0[1]);
  };

  // loop through all edges of the polygon
  for (var i = 0; i < n; i++) {
    // Test edge from V[i] to V[i + 1]
    if (V[i][1] <= P[1]) {
      // If edge-start is on or below P
      if (V[i + 1][1] > P[1]) // If edge is upward crossing
        if (isLeft(V[i], V[i + 1], P) > 0) // If P is to the left of edge
          ++wn; // We have a valid up intersect
    } else {
      // If edge-start is above P
      if (V[i + 1][1] <= P[1]) // If edge is downward crossing
        if (isLeft(V[i], V[i + 1], P) < 0) // If P is to the right of edge
          --wn; // We have a valid down intersect
    }
  }
  return wn !== 0;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORMAP_WIDTH", function() { return COLORMAP_WIDTH; });
/* harmony export (immutable) */ __webpack_exports__["Colormap"] = Colormap;
/* harmony export (immutable) */ __webpack_exports__["validateColor"] = validateColor;
/* harmony export (immutable) */ __webpack_exports__["parseColor"] = parseColor;
/* harmony export (immutable) */ __webpack_exports__["validateColormap"] = validateColormap;
/* harmony export (immutable) */ __webpack_exports__["parseColormap"] = parseColormap;
var libUtility = __webpack_require__(0);
var libGraphics = __webpack_require__(2);
var libShaders = __webpack_require__(4);
var libGlMatrix = __webpack_require__(3);

var COLORMAP_WIDTH = 10; // [pixel]

/**
 * A class holding the active colormap for the global view.
 * This class also draws a color axis to the right of the scatter plot.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */

// http://base64online.org/encode
// http://textmechanic.co/Line-Length-Breaker.html
var imageExhue = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAABCAYAAABADtw1AAAABHNCSVQICA' + 'gIfAhkiAAAAh5JREFUWIWlVu1xxTAIQ92rI3SN7r+B+iM2HwInedfevcYGBJJN7MDM7Of7l2YwoxkNFn' + '+XbY+5bWbLjuq7bAwHjCXuyRZ2DnXERqY6yl11JH6RosQPPvZcFH3VL+uhdsz2yDnnm7nmOskOSIzyL9' + 'jQgswzgZEmhdYx9sqJBJKWOtpaDYmtts79bZ3/2aSuxtCklfu4zUlCInpLrSdjPsawztOYir9aA69qlR' + 'x3HMmdkbdxc/4briNejodYQ0SnR0x6K+r6V10blfa68LEaV6xShxI7jnJP9Yyel5ox8Y2eGyqqLvO9SX' + 'VZ/ft0EHtlPvguIGZ/i631NIZn/MDvqEVrTVoO+l3LI0byt52+0WLG5X6npXfRYX2q72Ff0m0it1uN2Y' + 'PJ7iKQb7MW5/lrL/fjlnV+4gZ/PSL98droWnCos3N+dpVROO4aJ5vc7qolnQqt1smX1zcAhPnJLPjEJf' + 'NcNojopjFhKwfuTx7Aa8CvJSxCsQ9pjri+djOlOQ0r5+QHSv473xgH50jAcPD1XOn5dfTf45af8DXL65' + 'Nq3/lm+5XzM8xjfZO4ATNryXrTvPtyPwz7cqivduVvosXe4V2LOd+qKd6BYJd1leeF54YEfmds2S0Brf' + '5/xLAjI67EE8UWz4Vjt5Uc9cOP5ru5KyQ/9AP0EJdW79JSukXw9QfzDjz87G28a8H2O/8+LnH2dcLQu7' + '1hBh5vfQ+xXHX/AM1S5PNCNCVNAAAAAElFTkSuQmCC';

var imageRainbow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAABCAYAAABADtw1AAAAt0lEQVRYhe' + 'WNsQ0CMRAErxOQeJHRwveAXk/sBj6iAKgAioAeoBXIQRBBAOmZCnzy7pvg5GCkDXZ2ZTaZRgAF+8yW9c' + 'E4Lln3EAr2mS3rg3FcEkX+gRbwUrkaHm2TzbNtFOkzW9YH43jltRmK894OOtZL5Zr43LpsvvdOkT6zZX' + '0wjlfCJeRzDQr1mS3rg3GcsjvF4uzPUcd6qVwTi+UB4KhYn9myPhjHJ6t5j6Bgn9myPhjHJSIiP3thWH' + 'cGKpqFAAAAAElFTkSuQmCC';

var colormaps = {};

function Colormap(gl, globalView) {
  var TICK_LENGTH = 6; // [pixel]
  var NUM_TICKS = 10;

  var sdrLine = new libGraphics.Shader(gl, libShaders.Shaders.vsSimple, libShaders.Shaders.fsLine);
  sdrLine.color = sdrLine.u4f('color');
  sdrLine.color.apply(sdrLine, gl.foreColor);
  sdrLine.matWorldViewProj = sdrLine.u4x4f('matWorldViewProj');
  this.updateColorSchema = function () {
    sdrLine.color.apply(sdrLine, gl.foreColor);
  };

  var sdrColormap = new libGraphics.Shader(gl, libShaders.Shaders.vsTextured, libShaders.Shaders.fsTextured1D);
  sdrColormap.matWorldViewProj = sdrColormap.u4x4f('matWorldViewProj');
  colormaps = {
    exhue: libGraphics.LoadTexture(gl, imageExhue, function () {
      globalView.invalidate();
    }), // function() { setTimeout(function() { globalView.invalidate(); }, 1000); }),
    rainbow: libGraphics.LoadTexture(gl, imageRainbow, function () {
      globalView.invalidate();
    }), // function() { setTimeout(function() { globalView.invalidate(); }, 1000); }),
    2: libGraphics.LoadTextureFromByteArray(gl, new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255]), 2, 1)
  };
  // not used:
  // this.builtinColormaps = ['exhue', 'rainbow'];
  var texColormap = colormaps.exhue;

  // Create a 2D line mesh
  var meshLine = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 0, 0, 1, 0, 0]), null, null, null, null, null, gl.LINES);

  // Create a 2D line quad mesh
  var meshLineQuad = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]), null, null, null, null, null, gl.LINE_LOOP);

  // Create a 2D quad mesh
  var meshQuad = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0]), null, null, null, new Float32Array([
  // Texture coordinates
  0, 1, 0, 0, 1, 1, 1, 0]));

  var axis = { minimum: 0, maximum: 100, values: null, tickOffset: 0, tickDistance: 10, tickCount: 11, tickLength: TICK_LENGTH };

  this.visible = true;
  this.render = function (flipY, plotBounds) {
    if (!this.visible) return;

    // >>> Draw colormap

    sdrColormap.bind();
    meshQuad.bind(sdrColormap, texColormap);

    var mattrans = libGlMatrix.mat4.create();
    libGlMatrix.mat4.identity(mattrans);
    if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
    libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + plotBounds.width + 0.5) / gl.width - 1, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0]); // 0.5 ... center inside pixel
    libGlMatrix.mat4.scale(mattrans, mattrans, [2 * COLORMAP_WIDTH / gl.width, 2 * plotBounds.height / gl.height, 1]);
    sdrColormap.matWorldViewProj(mattrans);
    meshQuad.draw();

    // >>> Draw borders

    sdrLine.bind();
    meshLineQuad.bind(sdrLine, null);

    sdrLine.matWorldViewProj(mattrans);
    meshLineQuad.draw();

    // >>> Draw ticks and tick labels

    // Draw y-axis ticks and tick labels
    var tickLabel_left = 0.0;
    libGlMatrix.mat4.identity(mattrans);
    if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
    libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + plotBounds.width + COLORMAP_WIDTH + 0.5) / gl.width - 1, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0]); // 0.5 ... center inside pixel
    libGlMatrix.mat4.scale(mattrans, mattrans, [2 * axis.tickLength / gl.width, 2 * plotBounds.height / gl.height, 1]);
    sdrLine.matWorldViewProj(mattrans);
    meshLine.draw();
    libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, 1.0, 0.0]);
    sdrLine.matWorldViewProj(mattrans);
    meshLine.draw();
    libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -1.0, 0.0]);
    for (var i = 0; i < axis.tickCount; ++i) {
      var y = axis.tickOffset + i * axis.tickDistance;
      var tickPos = (y - axis.minimum) / (axis.maximum - axis.minimum);

      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, tickPos, 0.0]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -tickPos, 0.0]);

      var tickLabel = axis.values ? axis.values[y] : y.toPrecision(6) / 1;
      tickLabel_left = Math.max(tickLabel_left, gl.measureTextWidth(tickLabel));
      gl.drawText(tickLabel, plotBounds.x + plotBounds.width + COLORMAP_WIDTH + axis.tickLength + 2, gl.height - plotBounds.y - plotBounds.height * tickPos, 'middleleft');
    }
    tickLabel_left = Math.ceil(plotBounds.x + plotBounds.width + COLORMAP_WIDTH + axis.tickLength + 10 + tickLabel_left);

    // >>> Draw axis label

    if (axis.label) gl.drawText(axis.label, tickLabel_left, gl.height - plotBounds.y - plotBounds.height / 2, 'topcenter', -Math.PI / 2);
  };

  function checkOverlap() {
    var MIN_TICK_LABEL_DISTANCE = gl.measureTextWidth('  '); // Minimum distance between tick labels in pixel
    var plotBounds = globalView.getPlotBounds();
    return plotBounds.height * axis.tickDistance / (axis.maximum - axis.minimum) >= gl.measureTextHeight() + MIN_TICK_LABEL_DISTANCE;
  }

  /**
   * @param  {number} minimum
   * @param  {number} maximum
   * @param  {boolean=} changeTickDistance=true
   */
  this.setNumericRange = function (minimum, maximum, changeTickDistance) {
    axis.minimum = minimum;
    axis.maximum = maximum;
    axis.values = null;

    for (var numTicks = NUM_TICKS; numTicks >= 0; --numTicks) {
      if (changeTickDistance === false) {
        axis.tickOffset = Math.ceil(minimum / axis.tickDistance) * axis.tickDistance;
        axis.tickCount = Math.floor((maximum - axis.tickOffset) / axis.tickDistance) + 1;
      } else {
        axis.tickDistance = (maximum - minimum) / numTicks;
        var exp = Math.ceil(Math.log(axis.tickDistance) / Math.log(10)); // Compute power-of-10 just above tickDistance -> pow(10, exp)

        // Try less aggressive rounding in each iteration until break condition is met
        for (var i = 0; i < 10; ++i) {
          // Maximum 10 iterations
          axis.tickDistance = (maximum - minimum) / numTicks;
          var base = Math.pow(10, exp--);
          axis.tickDistance = Math.round(axis.tickDistance / base) * base; // Round tickDistance to base
          axis.tickOffset = Math.ceil(minimum / axis.tickDistance) * axis.tickDistance;
          axis.tickCount = Math.floor((maximum - axis.tickOffset) / axis.tickDistance) + 1;
          if (axis.tickCount >= numTicks - 2 && axis.tickCount <= numTicks + 2) // Condition: numTicks - 2 <= tickCount <= numTicks + 2
            break;
        }
      }

      if (checkOverlap()) break;
    }
  };
  this.setEnumRange = function (minimum, maximum, values) {
    axis.minimum = minimum -= 0.5; // 0.5 ... Move to center of value-bin
    axis.maximum = maximum -= 0.5; // 0.5 ... Move to center of value-bin
    axis.values = values;

    axis.tickDistance = 1;
    axis.tickOffset = Math.max(0, Math.ceil(minimum / axis.tickDistance) * axis.tickDistance);
    axis.tickCount = Math.min(values.length - axis.tickOffset, Math.floor((maximum - axis.tickOffset + 1) / axis.tickDistance));
  };
  this.setLabel = function (label) {
    axis.label = label;
  };

  var pointColor = null;
  this.setDataset = function (dataset, options) {};
  this.onInputChanged = function (activeInputs, animatedInputs, options) {};
  this.onOptionsChanged = function (options) {
    axis.tickLength = TICK_LENGTH + (options['showColormapHistogram'] ? options['histogramHeight'] : 0);
    if (options['pointColor'] !== pointColor) {
      pointColor = options['pointColor'];
      if (pointColor === null) {
        texColormap = colormaps['exhue'];
      } else if (colormaps[pointColor]) {
        texColormap = colormaps[pointColor];
      } else {
        var c = parseColormap(pointColor);
        if (c) texColormap = libGraphics.LoadTextureFromByteArray(gl, c, c.length / 4, 1);
      }
    }
  };
  this.onPlotBoundsChanged = function (plotBounds) {
    axis.values === null ? this.setNumericRange(axis.minimum, axis.maximum, true) : this.setEnumRange(axis.minimum + 0.5, axis.maximum + 0.5, axis.values);
  };

  this.getTexture = function () {
    return texColormap;
  };

  this.free = function () {
    meshLine.free();
  };
}

function validateColor(color) {
  if (libUtility.isString(color)) {
    if (!libUtility.isUndefined(libUtility.colorNameToHex(color))) return true; // color is known color name
    var rgb;
    if ((rgb = libUtility.hexToRgb(color)) !== null && rgb.r >= 0x00 && rgb.r <= 0xFF && rgb.g >= 0x00 && rgb.g <= 0xFF && rgb.b >= 0x00 && rgb.b <= 0xFF) return true; // color is hex color
    return 'Unknown color ' + color;
  }

  if (libUtility.isArray(color)) {
    if (color.length !== 4) return 'Color array needs to have 4 components (RGBA).';
    return true;
  }

  return 'Unknown color ' + color;
}

function parseColor(color) {
  if (libUtility.isString(color)) {
    var hex = libUtility.colorNameToHex(color);
    var rgb = libUtility.hexToRgb(hex ? hex : color);
    return rgb ? new Uint8Array([rgb.r, rgb.g, rgb.b, 255]) : null;
  }

  if (libUtility.isArray(color)) return color.length >= 4 ? new Uint8Array([color[0], color[1], color[2], color[3]]) : null;

  return null;
}

function validateColormap(colormap) {
  if (colormap === null) return true;
  if (libUtility.isString(colormap)) {
    if (colormaps[colormap]) return true;
    return validateColor(colormap);
  }

  if (libUtility.isArray(colormap)) {
    if (colormap.length === 0) return 'Colormap array cannot be empty.';
    if (libUtility.isString(colormap[0])) {
      var err;
      for (var i = 0; i < colormap.length; ++i) {
        if ((err = validateColor(colormap[i])) !== true) return err;
      }return true;
    } else {
      if (colormap.length % 4 !== 0) return 'Colormap array length must be multiple of 4.';
      for (var i = 0; i < colormap.length; ++i) {
        if (!libUtility.isNumber(colormap[i]) || colormap[i] < 0x00 || colormap[i] > 0xFF) return 'Colormap array must contain numbers between 0 and 255.';
      }return true;
    }
  }

  return 'Unknown colormap ' + colormap;
}

function parseColormap(colormap) {
  if (libUtility.isString(colormap)) return parseColor(colormap);

  if (libUtility.isArray(colormap)) {
    if (colormap.length === 0) return null;
    if (libUtility.isString(colormap[0])) {
      var array = [],
          color;
      for (var i = 0; i < colormap.length; ++i) {
        if (color = parseColor(colormap[i])) Array.prototype.push.apply(array, color);else return null;
      }return new Uint8Array(array);
    } else if (libUtility.isNumber(colormap[0])) return new Uint8Array(colormap);
  }

  return null;
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["fromMat4"] = fromMat4;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["transpose"] = transpose;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["adjoint"] = adjoint;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["fromTranslation"] = fromTranslation;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["fromMat2d"] = fromMat2d;
/* harmony export (immutable) */ __webpack_exports__["fromQuat"] = fromQuat;
/* harmony export (immutable) */ __webpack_exports__["normalFromMat4"] = normalFromMat4;
/* harmony export (immutable) */ __webpack_exports__["projection"] = projection;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */



/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](9);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1], a02 = a[2], a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  let b01 = a22 * a11 - a12 * a21;
  let b11 = -a22 * a10 + a12 * a20;
  let b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  let det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function adjoint(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  out[0] = (a11 * a22 - a12 * a21);
  out[1] = (a02 * a21 - a01 * a22);
  out[2] = (a01 * a12 - a02 * a11);
  out[3] = (a12 * a20 - a10 * a22);
  out[4] = (a00 * a22 - a02 * a20);
  out[5] = (a02 * a10 - a00 * a12);
  out[6] = (a10 * a21 - a11 * a20);
  out[7] = (a01 * a20 - a00 * a21);
  out[8] = (a00 * a11 - a01 * a10);
  return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  let b00 = b[0], b01 = b[1], b02 = b[2];
  let b10 = b[3], b11 = b[4], b12 = b[5];
  let b20 = b[6], b21 = b[7], b22 = b[8];

  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;

  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;

  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  let a00 = a[0], a01 = a[1], a02 = a[2],
    a10 = a[3], a11 = a[4], a12 = a[5],
    a20 = a[6], a21 = a[7], a22 = a[8],
    x = v[0], y = v[1];

  out[0] = a00;
  out[1] = a01;
  out[2] = a02;

  out[3] = a10;
  out[4] = a11;
  out[5] = a12;

  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  let a00 = a[0], a01 = a[1], a02 = a[2],
    a10 = a[3], a11 = a[4], a12 = a[5],
    a20 = a[6], a21 = a[7], a22 = a[8],

    s = Math.sin(rad),
    c = Math.cos(rad);

  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;

  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;

  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  let x = v[0], y = v[1];

  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];

  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];

  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function fromRotation(out, rad) {
  let s = Math.sin(rad), c = Math.cos(rad);

  out[0] = c;
  out[1] = s;
  out[2] = 0;

  out[3] = -s;
  out[4] = c;
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;

  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;

  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;

  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
function fromQuat(out, q) {
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;

  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;

  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;

  return out;
}

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
function normalFromMat4(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
}

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
          a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
          a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}



/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  out[4] = a[4] + (b[4] * scale);
  out[5] = a[5] + (b[5] * scale);
  out[6] = a[6] + (b[6] * scale);
  out[7] = a[7] + (b[7] * scale);
  out[8] = a[8] + (b[8] * scale);
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] &&
         a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
         a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
          Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
          Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
          Math.abs(a6 - b6) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
          Math.abs(a7 - b7) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
          Math.abs(a8 - b8) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
}

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link mat3.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["length"] = length;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["divide"] = divide;
/* harmony export (immutable) */ __webpack_exports__["ceil"] = ceil;
/* harmony export (immutable) */ __webpack_exports__["floor"] = floor;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["scaleAndAdd"] = scaleAndAdd;
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
/* harmony export (immutable) */ __webpack_exports__["squaredDistance"] = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["inverse"] = inverse;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;
/* harmony export (immutable) */ __webpack_exports__["cross"] = cross;
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["hermite"] = hermite;
/* harmony export (immutable) */ __webpack_exports__["bezier"] = bezier;
/* harmony export (immutable) */ __webpack_exports__["random"] = random;
/* harmony export (immutable) */ __webpack_exports__["transformMat4"] = transformMat4;
/* harmony export (immutable) */ __webpack_exports__["transformMat3"] = transformMat3;
/* harmony export (immutable) */ __webpack_exports__["transformQuat"] = transformQuat;
/* harmony export (immutable) */ __webpack_exports__["rotateX"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["rotateY"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["rotateZ"] = rotateZ;
/* harmony export (immutable) */ __webpack_exports__["angle"] = angle;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */



/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return Math.sqrt(x*x + y*y + z*z);
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return Math.sqrt(x*x + y*y + z*z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return x*x + y*y + z*z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return x*x + y*y + z*z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let len = x*x + y*y + z*z;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  let ax = a[0], ay = a[1], az = a[2];
  let bx = b[0], by = b[1], bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function hermite(out, a, b, c, d, t) {
  let factorTimes2 = t * t;
  let factor1 = factorTimes2 * (2 * t - 3) + 1;
  let factor2 = factorTimes2 * (t - 2) + t;
  let factor3 = factorTimes2 * (t - 1);
  let factor4 = factorTimes2 * (3 - 2 * t);

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function bezier(out, a, b, c, d, t) {
  let inverseFactor = 1 - t;
  let inverseFactorTimesTwo = inverseFactor * inverseFactor;
  let factorTimes2 = t * t;
  let factor1 = inverseFactorTimesTwo * inverseFactor;
  let factor2 = 3 * t * inverseFactorTimesTwo;
  let factor3 = 3 * factorTimes2 * inverseFactor;
  let factor4 = factorTimes2 * t;

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
  scale = scale || 1.0;

  let r = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]() * 2.0 * Math.PI;
  let z = (__WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]() * 2.0) - 1.0;
  let zScale = Math.sqrt(1.0-z*z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
  let x = a[0], y = a[1], z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  let x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
  // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

  let x = a[0], y = a[1], z = a[2];
  let qx = q[0], qy = q[1], qz = q[2], qw = q[3];

  // calculate quat * vec
  let ix = qw * x + qy * z - qz * y;
  let iy = qw * y + qz * x - qx * z;
  let iz = qw * z + qx * y - qy * x;
  let iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  return out;
}

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c){
  let p = [], r=[];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c){
  let p = [], r=[];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  r[1] = p[1];
  r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c){
  let p = [], r=[];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  let tempA = fromValues(a[0], a[1], a[2]);
  let tempB = fromValues(b[0], b[1], b[2]);

  normalize(tempA, tempA);
  normalize(tempB, tempB);

  let cosine = dot(tempA, tempB);

  if(cosine > 1.0) {
    return 0;
  }
  else if(cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2];
  let b0 = b[0], b1 = b[1], b2 = b[2];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
}

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;


/**
 * Alias for {@link vec3.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link vec3.divide}
 * @function
 */
const div = divide;
/* harmony export (immutable) */ __webpack_exports__["div"] = div;


/**
 * Alias for {@link vec3.distance}
 * @function
 */
const dist = distance;
/* harmony export (immutable) */ __webpack_exports__["dist"] = dist;


/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
const sqrDist = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["sqrDist"] = sqrDist;


/**
 * Alias for {@link vec3.length}
 * @function
 */
const len = length;
/* harmony export (immutable) */ __webpack_exports__["len"] = len;


/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
const sqrLen = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["sqrLen"] = sqrLen;


/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach = (function() {
  let vec = create();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 3;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
    }

    return a;
  };
})();
/* harmony export (immutable) */ __webpack_exports__["forEach"] = forEach;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["divide"] = divide;
/* harmony export (immutable) */ __webpack_exports__["ceil"] = ceil;
/* harmony export (immutable) */ __webpack_exports__["floor"] = floor;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["scaleAndAdd"] = scaleAndAdd;
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
/* harmony export (immutable) */ __webpack_exports__["squaredDistance"] = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["length"] = length;
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["inverse"] = inverse;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["random"] = random;
/* harmony export (immutable) */ __webpack_exports__["transformMat4"] = transformMat4;
/* harmony export (immutable) */ __webpack_exports__["transformQuat"] = transformQuat;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */



/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function fromValues(x, y, z, w) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  return out;
}

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  let w = b[3] - a[3];
  return Math.sqrt(x*x + y*y + z*z + w*w);
}

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  let w = b[3] - a[3];
  return x*x + y*y + z*z + w*w;
}

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  return Math.sqrt(x*x + y*y + z*z + w*w);
}

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  return x*x + y*y + z*z + w*w;
}

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  let len = x*x + y*y + z*z + w*w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
function lerp(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  let aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
function random(out, vectorScale) {
  vectorScale = vectorScale || 1.0;

  //TODO: This is a pretty awful way of doing this. Find something better.
  out[0] = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]();
  out[1] = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]();
  out[2] = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]();
  out[3] = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]();
  normalize(out, out);
  scale(out, out, vectorScale);
  return out;
}

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
function transformMat4(out, a, m) {
  let x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
function transformQuat(out, a, q) {
  let x = a[0], y = a[1], z = a[2];
  let qx = q[0], qy = q[1], qz = q[2], qw = q[3];

  // calculate quat * vec
  let ix = qw * x + qy * z - qz * y;
  let iy = qw * y + qz * x - qx * z;
  let iz = qw * z + qx * y - qy * x;
  let iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
}

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;


/**
 * Alias for {@link vec4.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link vec4.divide}
 * @function
 */
const div = divide;
/* harmony export (immutable) */ __webpack_exports__["div"] = div;


/**
 * Alias for {@link vec4.distance}
 * @function
 */
const dist = distance;
/* harmony export (immutable) */ __webpack_exports__["dist"] = dist;


/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
const sqrDist = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["sqrDist"] = sqrDist;


/**
 * Alias for {@link vec4.length}
 * @function
 */
const len = length;
/* harmony export (immutable) */ __webpack_exports__["len"] = len;


/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
const sqrLen = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["sqrLen"] = sqrLen;


/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach = (function() {
  let vec = create();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 4;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
    }

    return a;
  };
})();
/* harmony export (immutable) */ __webpack_exports__["forEach"] = forEach;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stats__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mean", function() { return __WEBPACK_IMPORTED_MODULE_0__stats__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return __WEBPACK_IMPORTED_MODULE_0__stats__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globalView__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalView", function() { return __WEBPACK_IMPORTED_MODULE_1__globalView__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dataset__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DataVector", function() { return __WEBPACK_IMPORTED_MODULE_2__dataset__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Dataset", function() { return __WEBPACK_IMPORTED_MODULE_2__dataset__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RandomDataset", function() { return __WEBPACK_IMPORTED_MODULE_2__dataset__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CsvDataset", function() { return __WEBPACK_IMPORTED_MODULE_2__dataset__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__algorithm__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DensityMapOptions", function() { return __WEBPACK_IMPORTED_MODULE_3__algorithm__["DensityMapOptions"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "downloadStencilMap", function() { return __WEBPACK_IMPORTED_MODULE_3__algorithm__["downloadStencilMap"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "downloadDensityMap", function() { return __WEBPACK_IMPORTED_MODULE_3__algorithm__["downloadDensityMap"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utility__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HashSet", function() { return __WEBPACK_IMPORTED_MODULE_4__utility__["HashSet"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "readIntCookie", function() { return __WEBPACK_IMPORTED_MODULE_4__utility__["readIntCookie"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "urlExists", function() { return __WEBPACK_IMPORTED_MODULE_4__utility__["urlExists"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createCookie", function() { return __WEBPACK_IMPORTED_MODULE_4__utility__["createCookie"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "download", function() { return __WEBPACK_IMPORTED_MODULE_4__utility__["download"]; });










/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = GlobalView;
var webglUtils = __webpack_require__(13);
var libUtility = __webpack_require__(0);
var libTextRenderContext = __webpack_require__(14);
var libPointViewer = __webpack_require__(15);
var libImageViewer = __webpack_require__(21);
var libDensityViewer = __webpack_require__(22);
var libHistogramViewer = __webpack_require__(23);
var libCoordinateSystem = __webpack_require__(24);
var libColormap = __webpack_require__(6);
var libAlgorithm = __webpack_require__(5);
var libGraphics = __webpack_require__(2);
var libGlMatrix = __webpack_require__(3);

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
    if (div.children[i] instanceof HTMLCanvasElement && div.children[i].globalViewWebGLCanvas) {
      // If div already contains a GlobalView-WebGL-canvas, ...
      // Share canvas
      canvas = /** @type {HTMLCanvasElement} */div.children[i];
      break;
    }
  }if (canvas === null) {
    canvas = /** @type {HTMLCanvasElement} */document.createElement('canvas');
    canvas.setAttribute('id', 'webGLCanvas');
    canvas.style.position = 'static'; //"absolute";
    canvas.style.left = canvas.style.top = '0px';
    canvas.style.width = canvas.style.height = '100%';
    canvas.style.backgroundColor = 'transparent';
    canvas.globalViewWebGLCanvas = true;
    div.appendChild(canvas);
  }

  this['invalidate'] = this.invalidate = function () {}; // Silently ignore calls to invalidate during initialization

  var gl = canvas.getContext('webgl');
  if (!gl) {
    alert('Error: WebGL not supported');
    return;
  }
  var OES_element_index_uint = gl.getExtension('OES_element_index_uint');
  if (!OES_element_index_uint) console.warn('GlobalView warning: Unsupported WebGL extension: OES_element_index_uint');
  gl.ext = gl.getExtension('ANGLE_instanced_arrays');
  if (!gl.ext) console.warn('GlobalView warning: Unsupported WebGL extension: ANGLE_instanced_arrays');

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

  var pointViewer = new libPointViewer.PointViewer(gl, this);
  var imageViewer = new libImageViewer.ImageViewer(gl, this);
  var densityViewer = new libDensityViewer.DensityViewer(gl, this);
  var histogramViewer = new libHistogramViewer.HistogramViewer(gl, this);
  var coordSys = new libCoordinateSystem.CoordinateSystem(gl, this);
  var colormap = new libColormap.Colormap(gl, this);
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

      var d0 = activeInputs[0],
          d1 = activeInputs[1];
      // densityViewer.updateImages(imageViewer.getImages(), d0, d1);
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
      gl.fillPolygon(mousePolygon, 'rgba(255, 255, 255, 0.25)');
      gl.drawPolygon(mousePolygon);
    }

    var tn = performance.now();
    dt = tn - t;
    t = tn;
    if (SHOW_FPS) {
      ++frameCounter;
      if (t - fpsStart > 10000.0 || frameCounter > 1000) {
        // Refresh FPS after 10s or 1000 frames
        //fps = (frameCounter == 1 ? 10000.0 : 1000 * frameCounter) / (t - fpsStart);
        fps = 1000 * frameCounter / (t - fpsStart);
        fpsStart = t;
        frameCounter = 0;
      }
      if (fps !== null) gl.drawText(fps.toFixed(5) + ' FPS', canvas.width - 8, 8, 'topright');else gl.drawText('approx. ' + Math.floor((frameCounter == 1 ? 10000.0 : 1000 * frameCounter) / (t - fpsStart)) + ' FPS', canvas.width - 8, 8, 'topright');
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
    if (libUtility.isArray(padding) && padding.length === 4) computedPadding = padding.map(function (v, i) {
      return Math.floor(libUtility.isString(v) ? Number.parseFloat(v) * (v.endsWith('%') ? (i % 2 === 0 ? canvas.width : canvas.height) / 100 : 1) : padding[i]);
    });else if (libUtility.isNumber(padding) || libUtility.isString(padding)) computedPadding = Array.create(4, function (i) {
      return Math.floor(libUtility.isString(padding) ? Number.parseFloat(padding) * (padding.endsWith('%') ? (i % 2 === 0 ? canvas.width : canvas.height) / 100 : 1) : padding);
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
      description: 'The space around the drawing area in the form [top, right, bottom, left]. X-axis, y-axis and colormap are drawn within padding space.',
      default: [50, 60, 50, 50],
      valid: function valid(value) {
        return libUtility.isNumber(value) || libUtility.isString(value) || libUtility.isArray(value) && value.length === 4;
      },
      requireRedraw: true,
      requireRecompile: false
    },
    /** When enabled, shows a colormap to the right of the plot. */
    'showColormap': {
      description: 'When enabled, shows a colormap to the right of the plot.',
      default: true,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false
    },
    /** When enabled, scrolling above the plot zooms in or out of the data. */
    'enableScrolling': {
      description: 'When enabled, scrolling above the plot zooms in or out of the data.',
      default: true,
      valid: [true, false],
      requireRedraw: false,
      requireRecompile: false
    },
    /** When enabled, thumbnails can be dragged with the mouse. */
    'enableThumbnailDragging': {
      description: 'When enabled, thumbnails can be dragged with the mouse.',
      default: true,
      valid: [true, false],
      requireRedraw: false,
      requireRecompile: false
    },

    // Advanced plot options
    /** When enabled, the canvas is continuously rerendered at up to 60 frames per second. Keep this setting disabled to save processing resources. */
    'enableContinuousRendering': {
      description: 'When enabled, the canvas is continuously rerendered at up to 60 frames per second. Keep this setting disabled to save processing resources.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false
    },
    /** Enables/disables blending in WebGL. Whenever using any kind of transparency, this setting should be kept enabled. */
    'enableTransparency': {
      description: 'Enables/disables blending in WebGL. Whenever using any kind of transparency, this setting should be kept enabled.',
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
      default: new libAlgorithm.ClusterMapOptions().threshold,
      valid: function valid(value) {
        return value > 0;
      },
      requireRedraw: false, // Requests redraw internally
      requireRecompile: false
    },

    // Histogram options
    /** When enabled, shows a histogram between the x-axis and the plot. */
    'showXAxisHistogram': {
      description: 'When enabled, shows a histogram between the x-axis and the plot.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false
    },
    /** When enabled, shows a histogram between the y-axis and the plot. */
    'showYAxisHistogram': {
      description: 'When enabled, shows a histogram between the y-axis and the plot.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false
    },
    /** When enabled, shows a histogram between the colormap and the plot. */
    'showColormapHistogram': {
      description: 'When enabled, shows a histogram between the colormap and the plot.',
      default: false,
      valid: [true, false],
      requireRedraw: true,
      requireRecompile: false
    },
    /** Controls the number of bins within each histogram in the scatterplot. */
    'numHistogramBins': {
      description: 'Controls the number of bins within each histogram in the scatterplot.',
      default: 50,
      valid: function valid(value) {
        return value >= 1;
      },
      requireRedraw: true,
      requireRecompile: false
    },
    /** Controls the height of each histogram in the scatterplot (in pixels). */
    'histogramHeight': {
      description: 'Controls the height of each histogram in the scatterplot (in pixels).',
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
      description: 'Controls the shape of data points in the scatterplot.',
      default: 'Circle',
      valid: ['Rectangle', 'Circle', 'Cross', 'Diamond', 'Gaussian', 'Custom'],
      requireRedraw: true,
      requireRecompile: true
    },
    /** When 'pointShape' is set to 'Custom', this defines a GLSL function given vec2 p, that returns opacity in the range [0.0 ... 1.0] at location p. */
    'customPointShape': {
      description: "When 'pointShape' is set to 'Custom', this defines a GLSL function given vec2 p, that returns opacity in the range [0.0 ... 1.0] at location p.",
      default: '{ return 1.0; }',
      valid: function valid(value) {
        return libGraphics.validateGLSL(gl, 'float opacityMap(in vec2 p) ' + value);
      },
      requireRedraw: true,
      requireRecompile: true
    },
    /** Controls the diameter of data points in the scatterplot (in pixels). */
    'pointSize': {
      description: 'Controls the diameter of data points in the scatterplot (in pixels).',
      default: 6,
      valid: function valid(value) {
        return value >= 0;
      },
      requireRedraw: true,
      requireRecompile: false
    },
    /** Controls the visibility of data points in the scatterplot between 0 (invisible) and 1 (fully opaque). */
    'pointOpacity': {
      description: 'Controls the visibility of data points in the scatterplot between 0 (invisible) and 1 (fully opaque).',
      default: 1,
      valid: function valid(value) {
        return value >= 0 && value <= 1;
      },
      requireRedraw: true,
      requireRecompile: false
    },
    /** Controls the color of data points in the scatterplot. Valid values are an array of bytes in RGBA order or a colormap name. */
    'pointColor': {
      description: 'Controls the color of data points in the scatterplot. Valid values are an array of bytes in RGBA order or a colormap name.',
      default: 'exhue',
      valid: function valid(value) {
        return libColormap.validateColormap(value);
      },
      requireRedraw: true,
      requireRecompile: false
    },

    // Thumbnail options
    /** Controls the width/height of thumbnails in the scatterplot (in pixels). */
    'thumbnailSize': {
      description: 'Controls the width/height of thumbnails in the scatterplot (in pixels).',
      default: 64,
      valid: function valid(value) {
        return value > 0;
      },
      requireRedraw: true,
      requireRecompile: false
    },
    /** Controls the width of thumbnail borders in the scatterplot. */
    'thumbnailBorderWidth': {
      description: 'Controls the width of thumbnail borders in the scatterplot.',
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
        return value === null || libColormap.validateColor(value);
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
        return value === null || libColormap.validateColor(value);
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
        return value === null || libColormap.validateColor(value);
      },
      requireRedraw: true,
      requireRecompile: false
    },
    /** When enabled, links thumbnails to points using unique labels instead of lines. */
    'labelThumbnails': {
      description: 'When enabled, links thumbnails to points using unique labels instead of lines.',
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
      console.warn('GlobalView warning: Unsupported option: ' + option);
      return;
    }
    var optionDefinition = OPTIONS[option];

    // Validate value
    var validationResult;
    if (libUtility.isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1 || libUtility.isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true) {
      console.warn('GlobalView warning: Invalid value for option ' + option + ': ' + value);
      if (libUtility.isString(validationResult)) console.warn('                    ' + validationResult);
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
        console.warn('GlobalView warning: Unsupported option: ' + option);
        continue;
      }
      var optionDefinition = OPTIONS[option];

      // Validate value
      var value = newOptions[option],
          validationResult;
      if (libUtility.isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1 || libUtility.isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true) {
        console.warn('GlobalView warning: Invalid value for option ' + option + ': ' + value);
        if (libUtility.isString(validationResult)) {
          //HY:
          validationResult = optionDefinition.valid(value);
          console.warn('                    ' + validationResult);
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
      console.warn('GlobalView warning: Unsupported option: ' + option);
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
    if (!OPTIONS.hasOwnProperty(option)) return 'Unsupported option: ' + option;
    var optionDefinition = OPTIONS[option];

    // Validate value
    var validationResult;
    if (libUtility.isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1 || libUtility.isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true) return 'Invalid value for option ' + option + ': ' + value + (libUtility.isString(validationResult) ? '\n    ' + validationResult : '');

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
        errors.push('Unsupported option: ' + option);
        continue;
      }
      var optionDefinition = OPTIONS[option];

      // Validate value
      var value = newOptions[option],
          validationResult;
      if (libUtility.isArray(optionDefinition.valid) && optionDefinition.valid.indexOf(value) === -1 || libUtility.isFunction(optionDefinition.valid) && (validationResult = optionDefinition.valid(value)) !== true) {
        errors.push('Invalid value for option ' + option + ': ' + value + (libUtility.isString(validationResult) ? '\n    ' + validationResult : ''));
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

      var characteristicPoints = libAlgorithm.findRepresentativePoints2(dataset, d0, d1, densityMap, n, densityRatio);
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
      pointViewer.representativePoints.assign(libAlgorithm.findRepresentativePoints2(dataset, d0, d1, densityMap, 16, 0.3));
      if (dataset.imageFilenames) pointViewer.representativePoints.forEach(function (r) {
        if (dataset.imageFilenames[r]) {
          var dataPos = dataset.dataVectors.map(function (v) {
            return v.getValue(r);
          });
          var imagePos = dataPos.slice(0);
          var p = libAlgorithm.findClosePointOfLowDensity(dataset, d0, d1, r, densityMap, densityMap.stencilMap, 0.6 * options['thumbnailSize'] / gl.width, 0.6 * (options['thumbnailSize'] + libImageViewer.LABEL_HEIGHT) / gl.height); //EDIT: Factor 0.6: WHY?
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
            imageHeight = (0.6 * options['thumbnailSize'] + libImageViewer.LABEL_HEIGHT) / gl.height; //EDIT: Factor 0.6: WHY?
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
        if (libUtility.isUndefined(densityMap.data)) // If densityMap is nD
          imagePos = libAlgorithm.findClosePointOfLowDensityND_descend(dataset, index, densityMap, 0.6 * options['thumbnailSize'] / Math.min(gl.width, gl.height)); //EDIT: Factor 0.6: WHY?
        else {
            imagePos = dataPos.slice(0);

            if (!densityMap.stencilMap) densityMap.stencilMap = {};
            var p = libAlgorithm.findClosePointOfLowDensity(dataset, d0, d1, index, densityMap, densityMap.stencilMap, imageWidth, imageHeight);
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
            imageHeight = (0.6 * options['thumbnailSize'] + libImageViewer.LABEL_HEIGHT) / gl.height; //EDIT: Factor 0.6: WHY?
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
        libAlgorithm.markPointsInStencilMap(dataset, d0, d1, points, densityMap, densityMap.stencilMap, imageWidth, imageHeight);
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
    var labelHeightOffset = 1.0 + libImageViewer.LABEL_HEIGHT / options['thumbnailSize'];
    var labelWidthOffset = 1.0 + (libImageViewer.LABEL_HEIGHT + 2 * libImageViewer.LABEL_WIDTH) / options['thumbnailSize'];
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

      if (libGlMatrix.vec2.dot([src[0] - offsets[0] - E[0], src[1] - offsets[1] - E[1]], eigenvec) > 0.0) {
        // If src is above E in direction eigenvec
        dest = libAlgorithm.vectorLineIntersection2D(src, eigenvec, bl, tl); // Project src in direction eigenvec onto line from bl, to tl
        if (!dest) dest = libAlgorithm.vectorLineIntersection2D(src, eigenvec, tl, tr); // Project src in direction eigenvec onto line from tl, to tr
      } else {
        // If src is below E in direction eigenvec
        dest = libAlgorithm.vectorLineIntersection2D(src, eigenvec, bl, br); // Project src in direction -eigenvec onto line from bl, to br
        if (!dest) dest = libAlgorithm.vectorLineIntersection2D(src, eigenvec, br, tr); // Project src in direction -eigenvec onto line from br, to tr
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
        console.warn('GlobalView warning: Unknown image placement strategy: ' + placement);return false;
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
        console.warn('GlobalView warning: Unknown image placement strategy: ' + placement);return false;
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
    if (libUtility.isNumber(image)) for (var i = 0; i < images.length; ++i) {
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
  var CTRL = navigator.appVersion.indexOf('Mac') == -1 ? 17 : 224;
  libUtility.addKeyDownHandler(function (event) {
    if (event.keyCode === CTRL) ctrlPressed = true;else if (event.keyCode === 16) shiftPressed = true;
  });
  libUtility.addKeyUpHandler(function (event) {
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

    if (event['viewDragging']) {
      // If mouse-down handler set ['viewDragging'] property to a truthy value
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
  libUtility.addMouseMoveHandler(onmousemove = function (event) {
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
      var viewDelta = libGlMatrix.vec3.create();
      tf.deviceDistToDatasetDist(viewDelta, libGlMatrix.vec3.subtract(viewDelta, p, viewDragStartPos));

      if (viewDragX) tf.translate(d0, viewDelta[0]);
      if (viewDragY) tf.translate(d1, viewDelta[1]);
      if (viewDragZ) tf.translate(d2, viewDelta[2]);
      viewDragStartPos = p;
      return;
    }

    if (imageDragStartPos) {
      var imageDelta = libGlMatrix.vec2.create();
      tf.deviceDistToDatasetDist(imageDelta, libGlMatrix.vec2.subtract(imageDelta, p, imageDragStartPos));
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
  libUtility.addMouseUpHandler(function (event) {
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
          if (libAlgorithm.pointInsidePolygon([px, py], mousePolygon)) selection.push(i);
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
  libUtility.addMouseWheelHandler(function (event) {
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
    //  setPlotBounds(options['padding']);

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
    tempCanvas.setAttribute('id', 'tempCanvas');
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
/* 13 */
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
          str += '<br/><br/>Status: ' + msg;
        }
        container.innerHTML = makeFailHTML(str);
      }
    };

    opt_onError = opt_onError || handleCreationError;

    if (canvas.addEventListener) {
      canvas.addEventListener('webglcontextcreationerror', function (event) {
        opt_onError(event.statusMessage);
      }, false);
    }
    var context = create3DContext(canvas, opt_attribs);
    if (!context) {
      if (!window.WebGLRenderingContext) {
        opt_onError('');
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
    var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
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
/* 14 */
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
  textCanvas.setAttribute('id', 'textCanvas');
  textCanvas.style.backgroundColor = 'transparent';
  textCanvas.style.pointerEvents = 'none';
  textCanvas.style.zIndex = canvas.style.zIndex + 1;
  textCanvas.style.position = 'static'; //"absolute";
  //textCanvas.style.left = textCanvas.style.top = "0px";
  textCanvas.style.width = textCanvas.style.height = '100%';
  canvas.parentElement.appendChild(textCanvas);
  var ctx = textCanvas.getContext('2d');
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
        ctx.textAlign = 'left';
        offsetV = fontHeight;
        break;
      case 'topcenter':
        ctx.textAlign = 'center';
        offsetV = fontHeight;
        break;
      case 'topright':
        ctx.textAlign = 'right';
        offsetV = fontHeight;
        break;
      case 'middleleft':
        ctx.textAlign = 'left';
        offsetV = fontHeight * 0.53;
        break;
      case 'middlecenter':
        ctx.textAlign = 'center';
        offsetV = fontHeight * 0.53;
        break;
      case 'middleright':
        ctx.textAlign = 'right';
        offsetV = fontHeight * 0.53;
        break;
      case 'bottomleft':
        ctx.textAlign = 'left';
        offsetV = 0;
        break;
      case 'bottomcenter':
        ctx.textAlign = 'center';
        offsetV = 0;
        break;
      case 'bottomright':
        ctx.textAlign = 'right';
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
    var body = document.getElementsByTagName('body')[0];
    var dummy = document.createElement('div');
    var dummyText = document.createTextNode('M');
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
      textCanvas.style.marginTop = -(rect.bottom - rect.top) + 'px';
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
    textCanvas.setAttribute('id', 'textCanvasOffScreen');
    ctx = textCanvas.getContext('2d');
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["PointViewer"] = PointViewer;
var libUtility = __webpack_require__(0);
var libGraphics = __webpack_require__(2);
var libShaders = __webpack_require__(4);
var libColormap = __webpack_require__(6);
var libGlMatrix = __webpack_require__(3);

/**
 * A viewer that renders point sets to the global view.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */
function PointViewer(gl, globalView) {
  var _dataset;
  var meshDataPoints = null;

  var _pointOpacity = 1.0;
  /*var highlightTexture = libGraphics.LoadTextureFromByteArray(gl, new Uint8Array([255, 255, 0, 255]), 1, 1);
  var selectionTexture = libGraphics.LoadTextureFromByteArray(gl, new Uint8Array([255, 0, 0, 255]), 1, 1);
  var representativeTexture = libGraphics.LoadTextureFromByteArray(gl, new Uint8Array([0, 255, 0, 255]), 1, 1);*/

  /**
   * A renderable set of points
   * @constructor
   * @package
   * @extends {HashSet}
   */
  function PointGroup() {
    function onchange() {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxbuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.get(), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

      globalView.invalidate();
    }

    libUtility.HashSet.call(this, onchange);
    var idxbuffer = gl.createBuffer();

    this.render = function (texture) {
      if (this.size() === _dataset.length) meshDataPoints.draw(texture, 0, _dataset.length);else if (this.size() !== 0) meshDataPoints.drawIndexed(texture, idxbuffer, this.size());
    };
    this.renderLines = function (texture, pointDrag) {
      if (this.size() === _dataset.length) meshDataPoints.drawLines(texture, pointDrag, 0, _dataset.length);else if (this.size() !== 0) {
        // drawLines doesn't support index buffers
        // Therefore, draw point group as continuous index sequences
        var startIndex = 0,
            lastIndex = -1,
            count = 0;
        this.forEach(function (index) {
          if (index === lastIndex + 1) ++count;else {
            if (count !== 0) meshDataPoints.drawLines(texture, pointDrag, startIndex, count);
            startIndex = index;
            count = 1;
          }
          lastIndex = index;
        });
        if (count !== 0) meshDataPoints.drawLines(texture, pointDrag, startIndex, count);
      }
    };

    this.free = function () {
      if (idxbuffer !== -1) {
        gl.deleteBuffer(idxbuffer);
        idxbuffer = -1;
      }
    };
  }

  var pointSets = [this.points = new PointGroup()];
  /**
   * Create a subset of points that can be rendered independently
   * Optional parameters color and opacity overwrite the default values
   * @param  {Object=} color
   * @param  {number=} opacity
   * @return {HashSet}
   */
  this.createPointSet = function (color, opacity) {
    var pointSet = new PointGroup();
    if (color) {
      var validationResult;
      if ((validationResult = libColormap.validateColormap(color)) === true) {
        var c = libColormap.parseColormap(color);
        if (c) pointSet.colormap = libGraphics.LoadTextureFromByteArray(gl, c, c.length / 4, 1);
      } else {
        console.warn('GlobalView warning: Invalid value for point set color: ' + color);
        if (libUtility.isString(validationResult)) console.warn('                    ' + validationResult);
      }
    }
    pointSet.opacity = opacity;
    pointSets.push(pointSet);
    return pointSet;
  };
  /**
   * Remove point subset
   * (This does not remove any of the points)
   * @param  {HashSet} pointSet
   */
  this.removePointSet = function (pointSet) {
    var index = pointSets.indexOf(pointSet);
    if (index !== -1) pointSets.splice(index, 1);
  };

  this.render = function (flipY, tf, colormapTexture, pointDrag) {
    if (meshDataPoints === null) return;

    meshDataPoints.sdr.bind();
    meshDataPoints.sdr.offsets.apply(meshDataPoints.sdr, tf.getOffsets());
    meshDataPoints.sdr.scales.apply(meshDataPoints.sdr, tf.getScales());
    meshDataPoints.sdr.animatedScales.apply(meshDataPoints.sdr, tf.getAnimatedScales());
    meshDataPoints.sdr.flipY(flipY ? 1 : 0);
    pointSets.forEach(function (pointSet) {
      meshDataPoints.sdr.pointOpacity(pointSet.opacity ? pointSet.opacity : _pointOpacity);
      pointSet.render(pointSet.colormap ? pointSet.colormap : colormapTexture);
    });

    if (pointDrag) {
      meshDataPoints.sdrLine.bind();
      meshDataPoints.sdrLine.offsets.apply(meshDataPoints.sdrLine, tf.getOffsets());
      meshDataPoints.sdrLine.scales.apply(meshDataPoints.sdrLine, tf.getScales());
      meshDataPoints.sdrLine.animatedScales.apply(meshDataPoints.sdrLine, tf.getAnimatedScales());
      meshDataPoints.sdrLine.flipY(flipY ? 1 : 0);
      pointSets.forEach(function (pointSet) {
        meshDataPoints.sdrLine.pointOpacity(pointSet.opacity ? pointSet.opacity : Math.max(0.1, _pointOpacity / 2.0));
        pointSet.renderLines(pointSet.colormap ? pointSet.colormap : colormapTexture, pointDrag);
      });
    }
  };

  this.setDataset = function (dataset, options) {
    // Remove old mesh
    if (meshDataPoints != null) meshDataPoints.free();
    pointSets.forEach(function (pointSet) {
      return pointSet.clear();
    });

    _dataset = dataset;
    _pointOpacity = options['pointOpacity'];

    // Validate numvertices
    if (dataset.fdata.length !== dataset.length * dataset.numColumns) {
      alert("'dataset.fdata.length !== dataset.length * dataset.numColumns'");
      return;
    }

    // Create position buffer
    var posbuffer;
    if (dataset.numColumns) {
      posbuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataset.fdata), gl.STATIC_DRAW);
    } else posbuffer = null;
    this.getPosBuffer = function () {
      return posbuffer;
    };

    meshDataPoints = new DataMesh(gl, posbuffer, dataset.length, dataset.numColumns, options);

    this.points.assignRange(dataset.length);
  };

  this.onOptionsChanged = function (options, recompileShader) {
    _pointOpacity = options['pointOpacity'];
    if (meshDataPoints) {
      if (recompileShader === true) meshDataPoints.recompileShader(options);else meshDataPoints.sdr.pointSize(options['pointSize']);
    }
  };

  var activeInputVectors = null,
      animatedInputVectors = null;
  this.onInputChanged = function (activeInputs, animatedInputs, options) {
    activeInputVectors = activeInputs.map(function (i) {
      return _dataset.dataVectors[i];
    });
    animatedInputVectors = animatedInputs.map(function (animatedInput) {
      return _dataset.dataVectors[animatedInput.origin];
    });
    if (meshDataPoints != null) meshDataPoints.recompileShader(options);
  };

  this.onPlotBoundsChanged = function (plotBounds) {};

  /**
   * A renderable WebGL mesh of ndim-dimensional points
   * @constructor
   * @package
   * @param {Object} gl // {WebGLRenderingContext}
   * @param {WebGLBuffer} posbuffer
   * @param {number} numvertices
   * @param {number} ndim
   * @param {Object} options
   */
  function DataMesh(gl, posbuffer, numvertices, ndim, options) {
    // Create line buffer
    var linebuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, linebuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, -1, 0, 1, 2, 1, 2, -1]), gl.STATIC_DRAW);

    // Create vertex ID buffer
    var vertexIds = new Float32Array(numvertices);
    for (var i = 0; i < numvertices; ++i) {
      vertexIds[i] = i;
    }var vidbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vidbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexIds, gl.STATIC_DRAW);

    this.getPosCode = function (forLineSdr) {
      // Create shader code for getPos() function -> getPosCode
      var getPosCode = '\n{0}\nuniform vec{1} offsets, scales, animatedScales;\nuniform float n;\n#define PI 3.14159265359\nvec{1} getPos()\n{\n  return offsets + vec{1}({2}) * scales + vec{1}({3}) * animatedScales;\n}\n';
      var attrDeclCode = '',
          inputs = [/c(\d+)/g, '0.0'],
          inputCode = [],
          animatedInputCode = [];
      for (var d = 0, i = 0; d < ndim; d += 4, ++i) {
        var attrLen = Math.min(4, ndim - d);
        attrDeclCode += 'attribute ' + (attrLen == 1 ? 'float' : 'vec' + attrLen) + ' p' + i + ';\n';
        for (var a = 0; a < attrLen; ++a) {
          inputs.push('p' + i + (attrLen == 1 ? '' : '[' + a + ']'));
        }
      }
      //HY:
      var ND = 4; //todo: should use the globalView.ND
      for (var d = 0; d < ND; ++d) {
        inputCode.push(String.prototype.format2.apply(activeInputVectors[d] ? activeInputVectors[d].getValueCode : '0.0', inputs));
        animatedInputCode.push(String.prototype.format2.apply(activeInputVectors[d] ? animatedInputVectors[d].getValueCode : '0.0', inputs));
      }
      attrDeclCode += 'attribute float i;\n';
      if (forLineSdr) getPosCode = getPosCode.format(attrDeclCode, 4, inputCode.slice(0, 4).join(', '), animatedInputCode.slice(0, 4).join(', '));else getPosCode = getPosCode.format(attrDeclCode, 3, inputCode.slice(0, 3).join(', '), animatedInputCode.slice(0, 3).join(', '));

      //console.log(getPosCode);
      return getPosCode;
    };

    var posattr, lineattr;
    this.sdr = null;
    this.sdrLine = null;
    this.recompileShader = function (options) {
      // Free shaders
      if (this.sdr !== null) this.sdr.free();
      if (this.sdrLine !== null) this.sdrLine.free();

      // Create shader code for opacityMap() function -> opacityMapCoe
      var opacityMapCoe = 'float opacityMap(in vec2 p) ';
      switch (options['pointShape']) {
        case 'Circle':
          opacityMapCoe += '{ return 1.0 - pow(p.x*p.x + p.y*p.y, pointSize / 4.0); }';
          //opacityMapCoe += "{ return p.x*p.x + p.y*p.y < 1.0 ? 1.0 : 0.0; }";
          break;
        case 'Cross':
          opacityMapCoe += '{ return pointSize / 4.0 * (max(4.0 / pointSize - abs(p.x - p.y), 0.0) + max(4.0 / pointSize - abs(-p.x - p.y), 0.0)); }';
          break;
        case 'Diamond':
          opacityMapCoe += '{ return 1.0 - pow(abs(p.x) + abs(p.y), 2.0 + pointSize / 4.0); }';
          break;
        case 'Gaussian':
          //opacityMapCoe += "{ return exp({0} * (p.x*p.x + p.y*p.y)); }".format(Math.log(0.001));
          opacityMapCoe += '{ return exp(-7.0 * (p.x*p.x + p.y*p.y)); }';
          break;
        case 'Custom':
          opacityMapCoe += options['customPointShape'];
          break;
        default:
          opacityMapCoe += '{ return 1.0; }';
          break;
      }

      // Compile shaders
      this.sdr = new libGraphics.Shader(gl, [this.getPosCode(false), libShaders.Shaders.vsDataPoint], ['precision highp float; uniform float pointSize;', opacityMapCoe, libShaders.Shaders.fsDataPoint]);
      //this.sdr.transform = this.sdr.u1fv("transform");
      this.sdr.offsets = this.sdr.u3f('offsets');
      this.sdr.scales = this.sdr.u3f('scales');
      this.sdr.animatedScales = this.sdr.u3f('animatedScales');
      this.sdr.flipY = this.sdr.u1i('flipY');
      this.sdr.quadsize = this.sdr.u2f('quadsize');
      this.sdr.pointOpacity = this.sdr.u1f('pointOpacity');this.sdr.pointOpacity(options['pointOpacity']);
      this.sdr.pointSize = this.sdr.u1f('pointSize');this.sdr.pointSize(options['pointSize']);
      this.sdr.n = this.sdr.u1f('n');if (this.sdr.n) this.sdr.n(numvertices);
      this.sdr.posattr = [this.sdr.getAttribLocation('p0'), this.sdr.getAttribLocation('p1'), this.sdr.getAttribLocation('p2'), this.sdr.getAttribLocation('p3')];
      this.sdr.vidattr = this.sdr.getAttribLocation('i');
      this.sdrLine = new libGraphics.Shader(gl, [this.getPosCode(true), libShaders.Shaders.vsDataLine], ['precision highp float; uniform float pointSize;', opacityMapCoe, libShaders.Shaders.fsDataLine]);
      //this.sdrLine.transform = this.sdrLine.u1fv("transform");
      this.sdrLine.offsets = this.sdrLine.u4f('offsets');
      this.sdrLine.scales = this.sdrLine.u4f('scales');
      this.sdrLine.animatedScales = this.sdrLine.u4f('animatedScales');
      this.sdrLine.flipY = this.sdrLine.u1i('flipY');
      this.sdrLine.quadsize = this.sdrLine.u2f('quadsize');
      this.sdrLine.pointOpacity = this.sdrLine.u1f('pointOpacity');this.sdrLine.pointOpacity(options['pointOpacity']);
      this.sdrLine.pointSize = this.sdrLine.u1f('pointSize');this.sdrLine.pointSize(options['pointSize']);
      this.sdrLine.n = this.sdrLine.u1f('n');if (this.sdrLine.n) this.sdrLine.n(numvertices);
      this.sdrLine.posattr = [this.sdrLine.getAttribLocation('p0'), this.sdrLine.getAttribLocation('p1'), this.sdrLine.getAttribLocation('p2'), this.sdrLine.getAttribLocation('p3')];
      this.sdrLine.vidattr = this.sdrLine.getAttribLocation('i');
      this.sdrLine.lineattr = this.sdrLine.getAttribLocation('lineOffset');
      this.sdrLine.lineTransform = this.sdrLine.u2x2f('lineTransform');
    };
    if (activeInputVectors && animatedInputVectors) this.recompileShader(options);

    this.draw = function (texture, offset, count) {
      // Default values
      if (typeof offset === 'undefined') offset = 0;
      if (typeof count === 'undefined') count = numvertices;

      for (var i = 0; i < 16; i++) {
        gl.disableVertexAttribArray(i);
        if (gl.ext) gl.ext.vertexAttribDivisorANGLE(i, 0);
      }

      if (posbuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
        for (var d = 0, i = 0; d < ndim; d += 4, ++i) {
          if (this.sdr.posattr[i] !== -1) {
            gl.enableVertexAttribArray(this.sdr.posattr[i]);
            gl.vertexAttribPointer(this.sdr.posattr[i], Math.min(4, ndim - d), gl.FLOAT, false, ndim * 4, (offset * ndim + d) * 4);
          }
        }
      }

      if (this.sdr.vidattr !== -1) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vidbuffer);
        gl.enableVertexAttribArray(this.sdr.vidattr);
        gl.vertexAttribPointer(this.sdr.vidattr, 1, gl.FLOAT, false, 4, offset * 4);
      }

      if (texture && this.sdr.samplerUniform) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(this.sdr.samplerUniform, 0);
      }

      gl.drawArrays(gl.POINTS, 0, Math.min(count, numvertices - offset));
    };
    this.drawIndexed = function (texture, idxbuffer, count) {
      for (var i = 0; i < 16; i++) {
        gl.disableVertexAttribArray(i);
        if (gl.ext) gl.ext.vertexAttribDivisorANGLE(i, 0);
      }

      if (posbuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
        for (var d = 0, i = 0; d < ndim; d += 4, ++i) {
          if (this.sdr.posattr[i] !== -1) {
            gl.enableVertexAttribArray(this.sdr.posattr[i]);
            gl.vertexAttribPointer(this.sdr.posattr[i], Math.min(4, ndim - d), gl.FLOAT, false, ndim * 4, d * 4);
          }
        }
      }

      if (this.sdr.vidattr !== -1) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vidbuffer);
        gl.enableVertexAttribArray(this.sdr.vidattr);
        gl.vertexAttribPointer(this.sdr.vidattr, 1, gl.FLOAT, false, 4, 0);
      }

      if (texture && this.sdr.samplerUniform) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(this.sdr.samplerUniform, 0);
      }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxbuffer);
      gl.drawElements(gl.POINTS, count, gl.UNSIGNED_INT, 0);
    };

    this.drawLines = function (texture, line, offset, count) {
      // Default values
      if (typeof offset === 'undefined') offset = 0;
      if (typeof count === 'undefined') count = numvertices;

      for (var i = 0; i < 16; i++) {
        gl.disableVertexAttribArray(i);
        gl.ext.vertexAttribDivisorANGLE(i, 0);
      }

      if (posbuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
        for (var d = 0, i = 0; d < ndim; d += 4, ++i) {
          if (this.sdrLine.posattr[i] !== -1) {
            gl.enableVertexAttribArray(this.sdrLine.posattr[i]);
            gl.vertexAttribPointer(this.sdrLine.posattr[i], Math.min(4, ndim - d), gl.FLOAT, false, ndim * 4, (offset * ndim + d) * 4);
            gl.ext.vertexAttribDivisorANGLE(this.sdrLine.posattr[i], 1);
          }
        }
      }

      if (this.sdr.vidattr !== -1) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vidbuffer);
        gl.enableVertexAttribArray(this.sdr.vidattr);
        gl.vertexAttribPointer(this.sdrLine.vidattr, 1, gl.FLOAT, false, 4, offset * 4);
        gl.ext.vertexAttribDivisorANGLE(this.sdrLine.vidattr, 1);
      }

      if (texture && this.sdrLine.samplerUniform) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(this.sdrLine.samplerUniform, 0);
      }

      // Compute line vertices
      var lineTransform = libGlMatrix.mat2.create();
      libGlMatrix.mat2.scale(lineTransform, lineTransform, libGlMatrix.vec2.fromValues(Math.sqrt(line[0] * line[0] + line[1] * line[1]), Math.max(1, options['pointSize'] /*/ 10*/)));
      libGlMatrix.mat2.rotate(lineTransform, lineTransform, Math.atan2(line[1], line[0]));
      libGlMatrix.mat2.scale(lineTransform, lineTransform, libGlMatrix.vec2.fromValues(1 / gl.width, 1 / gl.height));
      this.sdrLine.lineTransform(lineTransform);

      gl.bindBuffer(gl.ARRAY_BUFFER, linebuffer);
      gl.enableVertexAttribArray(this.sdrLine.lineattr);
      gl.vertexAttribPointer(this.sdrLine.lineattr, 2, gl.FLOAT, false, 0, 0);
      gl.ext.vertexAttribDivisorANGLE(this.sdrLine.lineattr, 0);

      gl.ext.drawArraysInstancedANGLE(gl.TRIANGLE_FAN, 0, 4, Math.min(count, numvertices - offset));
    };

    this.free = function () {
      gl.bindBuffer(gl.ARRAY_BUFFER, null);

      if (posbuffer) gl.deleteBuffer(posbuffer);
      posbuffer = null;

      gl.deleteBuffer(linebuffer);
      linebuffer = null;

      if (this.sdr != null) this.sdr.free();
    };
  }
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["transpose"] = transpose;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["adjoint"] = adjoint;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["LDU"] = LDU;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */



/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
function fromValues(m00, m01, m10, m11) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    let a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function invert(out, a) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];

  // Calculate the determinant
  let det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] =  a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] =  a0 * det;

  return out;
}

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  let a0 = a[0];
  out[0] =  a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] =  a0;

  return out;
}

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function multiply(out, a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function rotate(out, a, rad) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = a0 *  c + a2 * s;
  out[1] = a1 *  c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
function scale(out, a, v) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let v0 = v[0], v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function fromRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
}

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2]/a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  return out;
}

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link mat2.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["fromTranslation"] = fromTranslation;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */



/**
 * 2x3 Matrix
 * @module mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](6);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
function fromValues(a, b, c, d, tx, ty) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function invert(out, a) {
  let aa = a[0], ab = a[1], ac = a[2], ad = a[3];
  let atx = a[4], aty = a[5];

  let det = aa * ad - ab * ac;
  if(!det){
    return null;
  }
  det = 1.0 / det;

  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function multiply(out, a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function rotate(out, a, rad) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = a0 *  c + a2 * s;
  out[1] = a1 *  c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
function scale(out, a, v) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let v0 = v[0], v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
function translate(out, a, v) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let v0 = v[0], v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function fromRotation(out, rad) {
  let s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
          a[3] + ', ' + a[4] + ', ' + a[5] + ')';
}

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  out[4] = a[4] + (b[4] * scale);
  out[5] = a[5] + (b[5] * scale);
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
          Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
          Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
}

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["transpose"] = transpose;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["adjoint"] = adjoint;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["rotateX"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["rotateY"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["rotateZ"] = rotateZ;
/* harmony export (immutable) */ __webpack_exports__["fromTranslation"] = fromTranslation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromXRotation"] = fromXRotation;
/* harmony export (immutable) */ __webpack_exports__["fromYRotation"] = fromYRotation;
/* harmony export (immutable) */ __webpack_exports__["fromZRotation"] = fromZRotation;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslation"] = fromRotationTranslation;
/* harmony export (immutable) */ __webpack_exports__["getTranslation"] = getTranslation;
/* harmony export (immutable) */ __webpack_exports__["getScaling"] = getScaling;
/* harmony export (immutable) */ __webpack_exports__["getRotation"] = getRotation;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslationScale"] = fromRotationTranslationScale;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslationScaleOrigin"] = fromRotationTranslationScaleOrigin;
/* harmony export (immutable) */ __webpack_exports__["fromQuat"] = fromQuat;
/* harmony export (immutable) */ __webpack_exports__["frustum"] = frustum;
/* harmony export (immutable) */ __webpack_exports__["perspective"] = perspective;
/* harmony export (immutable) */ __webpack_exports__["perspectiveFromFieldOfView"] = perspectiveFromFieldOfView;
/* harmony export (immutable) */ __webpack_exports__["ortho"] = ortho;
/* harmony export (immutable) */ __webpack_exports__["lookAt"] = lookAt;
/* harmony export (immutable) */ __webpack_exports__["targetTo"] = targetTo;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */



/**
 * 4x4 Matrix
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](16);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}


/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1], a02 = a[2], a03 = a[3];
    let a12 = a[6], a13 = a[7];
    let a23 = a[11];

    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out;
}

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
  out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
  out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
  out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
  out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
  out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
  return out;
}

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  // Cache only the current line of the second matrix
  let b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
  out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
  out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
  out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  return out;
}

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
  let x = v[0], y = v[1], z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
    out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
    out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
  let x = v[0], y = v[1], z = v[2];

  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
  let x = axis[0], y = axis[1], z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;

  if (Math.abs(len) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]) { return null; }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
  a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
  a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
  b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
  b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) { // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  if (a !== out) { // If the source and destination differ, copy the unchanged rows
    out[0]  = a[0];
    out[1]  = a[1];
    out[2]  = a[2];
    out[3]  = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  if (a !== out) { // If the source and destination differ, copy the unchanged rows
    out[4]  = a[4];
    out[5]  = a[5];
    out[6]  = a[6];
    out[7]  = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];

  if (a !== out) { // If the source and destination differ, copy the unchanged last row
    out[8]  = a[8];
    out[9]  = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function fromRotation(out, rad, axis) {
  let x = axis[0], y = axis[1], z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;

  if (Math.abs(len) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]) { return null; }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromXRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0]  = 1;
  out[1]  = 0;
  out[2]  = 0;
  out[3]  = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromYRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0]  = c;
  out[1]  = 0;
  out[2]  = -s;
  out[3]  = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromZRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0]  = c;
  out[1]  = s;
  out[2]  = 0;
  out[3]  = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
  // Quaternion math
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getScaling(out, mat) {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];

  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);

  return out;
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
function getRotation(out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  let trace = mat[0] + mat[5] + mat[10];
  let S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S;
    out[2] = (mat[1] - mat[4]) / S;
  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) {
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S;
    out[2] = (mat[8] + mat[2]) / S;
  } else if (mat[5] > mat[10]) {
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S;
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S;
  } else {
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  let sx = s[0];
  let sy = s[1];
  let sz = s[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  let sx = s[0];
  let sy = s[1];
  let sz = s[2];

  let ox = o[0];
  let oy = o[1];
  let oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
function fromQuat(out, q) {
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;

  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;

  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;

  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;

  return out;
}

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
  let rl = 1 / (right - left);
  let tb = 1 / (top - bottom);
  let nf = 1 / (near - far);
  out[0] = (near * 2) * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = (near * 2) * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = (far * near * 2) * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
  let f = 1.0 / Math.tan(fovy / 2);
  let nf = 1 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = (2 * far * near) * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
  let upTan = Math.tan(fov.upDegrees * Math.PI/180.0);
  let downTan = Math.tan(fov.downDegrees * Math.PI/180.0);
  let leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0);
  let rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0);
  let xScale = 2.0 / (leftTan + rightTan);
  let yScale = 2.0 / (upTan + downTan);

  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = ((upTan - downTan) * yScale * 0.5);
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = (far * near) / (near - far);
  out[15] = 0.0;
  return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
  let lr = 1 / (left - right);
  let bt = 1 / (bottom - top);
  let nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
  let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  let eyex = eye[0];
  let eyey = eye[1];
  let eyez = eye[2];
  let upx = up[0];
  let upy = up[1];
  let upz = up[2];
  let centerx = center[0];
  let centery = center[1];
  let centerz = center[2];

  if (Math.abs(eyex - centerx) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"] &&
      Math.abs(eyey - centery) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"] &&
      Math.abs(eyez - centerz) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]) {
    return mat4.identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;

  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;

  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;

  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;

  return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function targetTo(out, eye, target, up) {
  let eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];

  let z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];

  let len = z0*z0 + z1*z1 + z2*z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  let x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
          a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
          a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
          a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
}

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  out[4] = a[4] + (b[4] * scale);
  out[5] = a[5] + (b[5] * scale);
  out[6] = a[6] + (b[6] * scale);
  out[7] = a[7] + (b[7] * scale);
  out[8] = a[8] + (b[8] * scale);
  out[9] = a[9] + (b[9] * scale);
  out[10] = a[10] + (b[10] * scale);
  out[11] = a[11] + (b[11] * scale);
  out[12] = a[12] + (b[12] * scale);
  out[13] = a[13] + (b[13] * scale);
  out[14] = a[14] + (b[14] * scale);
  out[15] = a[15] + (b[15] * scale);
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] &&
         a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] &&
         a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
         a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  let a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3];
  let a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7];
  let a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11];
  let a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

  let b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3];
  let b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7];
  let b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11];
  let b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
          Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
          Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
          Math.abs(a6 - b6) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
          Math.abs(a7 - b7) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
          Math.abs(a8 - b8) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
          Math.abs(a9 - b9) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
          Math.abs(a10 - b10) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
          Math.abs(a11 - b11) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
          Math.abs(a12 - b12) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
          Math.abs(a13 - b13) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
          Math.abs(a14 - b14) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
          Math.abs(a15 - b15) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
}

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link mat4.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["setAxisAngle"] = setAxisAngle;
/* harmony export (immutable) */ __webpack_exports__["getAxisAngle"] = getAxisAngle;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["rotateX"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["rotateY"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["rotateZ"] = rotateZ;
/* harmony export (immutable) */ __webpack_exports__["calculateW"] = calculateW;
/* harmony export (immutable) */ __webpack_exports__["slerp"] = slerp;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["conjugate"] = conjugate;
/* harmony export (immutable) */ __webpack_exports__["fromMat3"] = fromMat3;
/* harmony export (immutable) */ __webpack_exports__["fromEuler"] = fromEuler;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mat3__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vec3__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vec4__ = __webpack_require__(9);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */






/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  let s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
function getAxisAngle(out_axis, q) {
  let rad = Math.acos(q[3]) * 2.0;
  let s = Math.sin(rad / 2.0);
  if (s != 0.0) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function multiply(out, a, b) {
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = b[0], by = b[1], bz = b[2], bw = b[3];

  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateX(out, a, rad) {
  rad *= 0.5;

  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = Math.sin(rad), bw = Math.cos(rad);

  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateY(out, a, rad) {
  rad *= 0.5;

  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let by = Math.sin(rad), bw = Math.cos(rad);

  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateZ(out, a, rad) {
  rad *= 0.5;

  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bz = Math.sin(rad), bw = Math.cos(rad);

  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
function calculateW(out, a) {
  let x = a[0], y = a[1], z = a[2];

  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = b[0], by = b[1], bz = b[2], bw = b[3];

  let omega, cosom, sinom, scale0, scale1;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if ( cosom < 0.0 ) {
    cosom = -cosom;
    bx = - bx;
    by = - by;
    bz = - bz;
    bw = - bw;
  }
  // calculate coefficients
  if ( (1.0 - cosom) > 0.000001 ) {
    // standard case (slerp)
    omega  = Math.acos(cosom);
    sinom  = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;

  return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert(out, a) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let dot = a0*a0 + a1*a1 + a2*a2 + a3*a3;
  let invDot = dot ? 1.0/dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0*invDot;
  out[1] = -a1*invDot;
  out[2] = -a2*invDot;
  out[3] = a3*invDot;
  return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  let fTrace = m[0] + m[4] + m[8];
  let fRoot;

  if ( fTrace > 0.0 ) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0);  // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5/fRoot;  // 1/(4w)
    out[0] = (m[5]-m[7])*fRoot;
    out[1] = (m[6]-m[2])*fRoot;
    out[2] = (m[1]-m[3])*fRoot;
  } else {
    // |w| <= 1/2
    let i = 0;
    if ( m[4] > m[0] )
      i = 1;
    if ( m[8] > m[i*3+i] )
      i = 2;
    let j = (i+1)%3;
    let k = (i+2)%3;

    fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
    out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
    out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
  }

  return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */
function fromEuler(out, x, y, z) {
    let halfToRad = 0.5 * Math.PI / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;

    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);

    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;

    return out;
}

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
const clone = __WEBPACK_IMPORTED_MODULE_3__vec4__["clone"];
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;


/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
const fromValues = __WEBPACK_IMPORTED_MODULE_3__vec4__["fromValues"];
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;


/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
const copy = __WEBPACK_IMPORTED_MODULE_3__vec4__["copy"];
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;


/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
const set = __WEBPACK_IMPORTED_MODULE_3__vec4__["set"];
/* harmony export (immutable) */ __webpack_exports__["set"] = set;


/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
const add = __WEBPACK_IMPORTED_MODULE_3__vec4__["add"];
/* harmony export (immutable) */ __webpack_exports__["add"] = add;


/**
 * Alias for {@link quat.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
const scale = __WEBPACK_IMPORTED_MODULE_3__vec4__["scale"];
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;


/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
const dot = __WEBPACK_IMPORTED_MODULE_3__vec4__["dot"];
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;


/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
const lerp = __WEBPACK_IMPORTED_MODULE_3__vec4__["lerp"];
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;


/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */
const length = __WEBPACK_IMPORTED_MODULE_3__vec4__["length"];
/* harmony export (immutable) */ __webpack_exports__["length"] = length;


/**
 * Alias for {@link quat.length}
 * @function
 */
const len = length;
/* harmony export (immutable) */ __webpack_exports__["len"] = len;


/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
const squaredLength = __WEBPACK_IMPORTED_MODULE_3__vec4__["squaredLength"];
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;


/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
const sqrLen = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["sqrLen"] = sqrLen;


/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
const normalize = __WEBPACK_IMPORTED_MODULE_3__vec4__["normalize"];
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;


/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
const exactEquals = __WEBPACK_IMPORTED_MODULE_3__vec4__["exactEquals"];
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;


/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
const equals = __WEBPACK_IMPORTED_MODULE_3__vec4__["equals"];
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;


/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
const rotationTo = (function() {
  let tmpvec3 = __WEBPACK_IMPORTED_MODULE_2__vec3__["create"]();
  let xUnitVec3 = __WEBPACK_IMPORTED_MODULE_2__vec3__["fromValues"](1,0,0);
  let yUnitVec3 = __WEBPACK_IMPORTED_MODULE_2__vec3__["fromValues"](0,1,0);

  return function(out, a, b) {
    let dot = __WEBPACK_IMPORTED_MODULE_2__vec3__["dot"](a, b);
    if (dot < -0.999999) {
      __WEBPACK_IMPORTED_MODULE_2__vec3__["cross"](tmpvec3, xUnitVec3, a);
      if (__WEBPACK_IMPORTED_MODULE_2__vec3__["len"](tmpvec3) < 0.000001)
        __WEBPACK_IMPORTED_MODULE_2__vec3__["cross"](tmpvec3, yUnitVec3, a);
      __WEBPACK_IMPORTED_MODULE_2__vec3__["normalize"](tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      __WEBPACK_IMPORTED_MODULE_2__vec3__["cross"](tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
})();
/* harmony export (immutable) */ __webpack_exports__["rotationTo"] = rotationTo;


/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
const sqlerp = (function () {
  let temp1 = create();
  let temp2 = create();

  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));

    return out;
  };
}());
/* harmony export (immutable) */ __webpack_exports__["sqlerp"] = sqlerp;


/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
const setAxes = (function() {
  let matr = __WEBPACK_IMPORTED_MODULE_1__mat3__["create"]();

  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];

    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];

    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];

    return normalize(out, fromMat3(out, matr));
  };
})();
/* harmony export (immutable) */ __webpack_exports__["setAxes"] = setAxes;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["divide"] = divide;
/* harmony export (immutable) */ __webpack_exports__["ceil"] = ceil;
/* harmony export (immutable) */ __webpack_exports__["floor"] = floor;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["scaleAndAdd"] = scaleAndAdd;
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
/* harmony export (immutable) */ __webpack_exports__["squaredDistance"] = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["length"] = length;
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["inverse"] = inverse;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;
/* harmony export (immutable) */ __webpack_exports__["cross"] = cross;
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["random"] = random;
/* harmony export (immutable) */ __webpack_exports__["transformMat2"] = transformMat2;
/* harmony export (immutable) */ __webpack_exports__["transformMat2d"] = transformMat2d;
/* harmony export (immutable) */ __webpack_exports__["transformMat3"] = transformMat3;
/* harmony export (immutable) */ __webpack_exports__["transformMat4"] = transformMat4;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */



/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](2);
  out[0] = 0;
  out[1] = 0;
  return out;
}

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
function fromValues(x, y) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](2);
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
};

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
};

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
function round (out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1];
  return Math.sqrt(x*x + y*y);
};

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1];
  return x*x + y*y;
};

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0],
    y = a[1];
  return Math.sqrt(x*x + y*y);
};

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength (a) {
  var x = a[0],
    y = a[1];
  return x*x + y*y;
};

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
  var x = a[0],
    y = a[1];
  var len = x*x + y*y;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
  }
  return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
  var ax = a[0],
    ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
function random(out, scale) {
  scale = scale || 1.0;
  var r = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
  let x = a[0];
  let y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1];
  let b0 = b[0], b1 = b[1];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
}

/**
 * Alias for {@link vec2.length}
 * @function
 */
const len = length;
/* harmony export (immutable) */ __webpack_exports__["len"] = len;


/**
 * Alias for {@link vec2.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;


/**
 * Alias for {@link vec2.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link vec2.divide}
 * @function
 */
const div = divide;
/* harmony export (immutable) */ __webpack_exports__["div"] = div;


/**
 * Alias for {@link vec2.distance}
 * @function
 */
const dist = distance;
/* harmony export (immutable) */ __webpack_exports__["dist"] = dist;


/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
const sqrDist = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["sqrDist"] = sqrDist;


/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
const sqrLen = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["sqrLen"] = sqrLen;


/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach = (function() {
  let vec = create();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 2;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1];
    }

    return a;
  };
})();
/* harmony export (immutable) */ __webpack_exports__["forEach"] = forEach;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LABEL_HEIGHT", function() { return LABEL_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LABEL_WIDTH", function() { return LABEL_WIDTH; });
/* harmony export (immutable) */ __webpack_exports__["ImageViewer"] = ImageViewer;
var libGraphics = __webpack_require__(2);
var libShaders = __webpack_require__(4);
var libAlgorithm = __webpack_require__(5);
var libColormap = __webpack_require__(6);
var libGlMatrix = __webpack_require__(3);

//const LABEL_HEIGHT = 12, LABEL_WIDTH = 16.5;
var LABEL_HEIGHT = 12;
var LABEL_WIDTH = 16.5;
var LABEL_TEXT_PADDING = 2;

/**
 * An image label associated to a single datapoint of the dataset
 * @constructor
 * @export
 * @param {Object} globalView // {GlobalView}
 */
function Thumbnail(globalView) {
  /** @type {WebGLTexture} */this.tex = null;
  /** @type {Array<number>} */this.imagePos = null;
  /** @type {Array<number>} */this.refPos = null;
  /** @type {Array<number>} */this.imageSize = null;
  /** @type {Array<number>} */this.imageAnchor = null;

  /** @type {boolean} */this.highlighted = false;

  /** @type {number} */this.refIndex = -1;
  this['getPoint'] =
  /**
   * @summary Retrieve index of associated datapoint
   * @return {number}
   */
  this.getPoint = function () {
    return this.refIndex;
  };

  /** @type {number} */this.borderWidth = null;
  this['getBorderWidth'] =
  /**
   * @summary Retrieve width of the image border
   * @return {number}
   */
  this.getBorderWidth = function () {
    return this.borderWidth ? this.borderWidth.slice() : null;
  };
  this['setBorderWidth'] =
  /**
   * @summary Set width of the image border
   * @param {number} width
   */
  this.setBorderWidth = function (width) {
    this.borderWidth = width;
    globalView.invalidate();
  };

  /** @type {Array<number>} */this.borderColor = null;
  this['getBorderColor'] =
  /**
   * @summary Retrieve color of the image border
   * @return {Array<number>} Float array [red, green, blue, alpha] or null
   */
  this.getBorderColor = function () {
    return this.borderColor ? this.borderColor.slice() : null;
  };
  this['setBorderColor'] =
  /**
   * @summary Set color of the image border
   * @param {Array<number>} color Float array [red, green, blue, alpha] or null
   */
  this.setBorderColor = function (color) {
    this.borderColor = color;
    globalView.invalidate();
  };

  /** @type {Array<number>} */this.lineColor = null;
  this['getLineColor'] =
  /**
   * @summary Retrieve color of the image line
   * @return {Array<number>} Float array [red, green, blue, alpha] or null
   */
  this.getLineColor = function () {
    return this.lineColor ? this.lineColor.slice() : null;
  };
  this['setLineColor'] =
  /**
   * @summary Set color of the image line
   * @param {Array<number>} color Float array [red, green, blue, alpha] or null
   */
  this.setLineColor = function (color) {
    this.lineColor = color;
    globalView.invalidate();
  };

  /** @type {Array<number>} */this.labelColor = null;
  this['getLabelColor'] =
  /**
   * @summary Retrieve color of the image label
   * @return {Array<number>} Float array [red, green, blue, alpha] or null
   */
  this.getLabelColor = function () {
    return this.labelColor ? this.labelColor.slice() : null;
  };
  this['setLabelColor'] =
  /**
   * @summary Set color of the image label
   * @param {Array<number>} color Float array [red, green, blue, alpha] or null
   */
  this.setLabelColor = function (color) {
    this.labelColor = color;
    globalView.invalidate();
  };
}

/**
 * A viewer that renders labels (thumbnails) to the global view.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */
function ImageViewer(gl, globalView) {
  var sdrImage = new libGraphics.Shader(gl, libShaders.Shaders.vsTextured, libShaders.Shaders.fsTextured);
  sdrImage.matWorldViewProj = sdrImage.u4x4f('matWorldViewProj');

  var sdrLine = new libGraphics.Shader(gl, libShaders.Shaders.vsSimple, libShaders.Shaders.fsLine);
  sdrLine.color = sdrLine.u4f('color');
  sdrLine.color.apply(sdrLine, gl.foreColor);
  sdrLine.matWorldViewProj = sdrLine.u4x4f('matWorldViewProj');

  // Create a 2D line mesh
  var meshLine = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 0, 0, 1, 0, 0]), null, null, null, null, null, gl.LINES);

  // Create a 2D quad mesh
  var meshQuad = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0]), null, null, null, new Float32Array([
  // Texture coordinates
  0, 1, 0, 0, 1, 1, 1, 0]));

  // Create a 2D line quad mesh
  var meshLineQuad = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0]), null, null, null, null, null, gl.LINE_LOOP);

  // Create a 2D arrow mesh
  LABEL_HEIGHT = gl.measureTextHeight() + 2 * LABEL_TEXT_PADDING;
  LABEL_WIDTH = gl.measureTextWidth('888') + 2 * LABEL_TEXT_PADDING;
  var meshLabel = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0.0, 0.0, 0, 0.5 * LABEL_HEIGHT, 0.5 * LABEL_HEIGHT, 0, 0.5 * LABEL_HEIGHT + LABEL_WIDTH, 0.5 * LABEL_HEIGHT, 0, 0.5 * LABEL_HEIGHT + LABEL_WIDTH, -0.5 * LABEL_HEIGHT, 0, 0.5 * LABEL_HEIGHT, -0.5 * LABEL_HEIGHT, 0]), null, null, null, null, null, gl.TRIANGLE_FAN);

  // Create a 2D line arrow mesh
  var meshLineLabel = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0.0, 0.0, 0, 0.5 * LABEL_HEIGHT, 0.5 * LABEL_HEIGHT, 0, 0.5 * LABEL_HEIGHT + LABEL_WIDTH, 0.5 * LABEL_HEIGHT, 0, 0.5 * LABEL_HEIGHT + LABEL_WIDTH, -0.5 * LABEL_HEIGHT, 0, 0.5 * LABEL_HEIGHT, -0.5 * LABEL_HEIGHT, 0]), null, null, null, null, null, gl.LINE_LOOP);

  /** @type Array<Thumbnail> */var images = [];

  var PixelAlignX = function PixelAlignX(x) {
    return (Math.floor(x * gl.width / 2.0) + 0.5) * 2.0 / gl.width;
  };
  var PixelAlignY = function PixelAlignY(y) {
    return (Math.floor(y * gl.height / 2.0) + 0.5) * 2.0 / gl.height;
  };

  this.render = function (flipY, tf) {
    if (images.length === 0) return;
    var mattrans = libGlMatrix.mat4.create();
    var imagePos = libGlMatrix.vec2.create(),
        refPos = libGlMatrix.vec2.create(),
        imageSize = libGlMatrix.vec2.create();

    //gl.disable(gl.SCISSOR_TEST);

    if (options['labelThumbnails']) {
      // Draw labels at image.refPos
      var label = 1;
      images.forEach(function (image) {
        if (image.imagePos === image.refPos) return;
        tf.transformPos(refPos, image.refPos);

        sdrLine.bind();
        libGlMatrix.mat4.identity(mattrans);
        if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        refPos[0] = PixelAlignX(refPos[0]);
        refPos[1] = PixelAlignY(refPos[1]);
        libGlMatrix.mat4.translate(mattrans, mattrans, [refPos[0], refPos[1], 0]);
        libGlMatrix.mat4.scale(mattrans, mattrans, [2 / gl.width, 2 / gl.height, 1]);
        sdrLine.matWorldViewProj(mattrans);

        sdrLine.color.apply(sdrLine, image.highlighted ? [1, 1, 0, 1] : image.labelColor ? image.labelColor : defaultImageLabelColor);
        meshLabel.bind(sdrLine, null);
        meshLabel.draw();

        sdrLine.color.apply(sdrLine, image.borderColor ? image.borderColor : defaultImageBorderColor);
        meshLineLabel.bind(sdrLine, null);
        meshLineLabel.draw();

        refPos[0] = (1 + refPos[0]) * gl.width / 2;
        refPos[1] = (1 - refPos[1]) * gl.height / 2;
        refPos[0] += 0.5 * LABEL_HEIGHT + LABEL_WIDTH - LABEL_TEXT_PADDING; // Right-align label
        refPos[1] -= 0.5 * LABEL_HEIGHT - LABEL_TEXT_PADDING; // Right-align label
        gl.drawText(label++, refPos[0], refPos[1], 'topright');
      });
    } else {
      // Draw lines between image.imagePos and image.refPos
      sdrLine.bind();
      meshLine.bind(sdrLine, null);
      images.forEach(function (image) {
        if (!image.imagePos || image.imagePos === image.refPos) return;
        libGlMatrix.mat4.identity(mattrans);
        if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        tf.transformPos(imagePos, image.imagePos);
        tf.transformPos(refPos, image.refPos);
        libGlMatrix.mat4.translate(mattrans, mattrans, [imagePos[0], imagePos[1], 0.0]);
        var dx = refPos[0] - imagePos[0],
            dy = refPos[1] - imagePos[1];
        libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.atan2(dy, dx));
        libGlMatrix.mat4.scale(mattrans, mattrans, [Math.sqrt(dx * dx + dy * dy), 1.0, 1.0]);
        sdrLine.matWorldViewProj(mattrans);
        sdrLine.color.apply(sdrLine, image.lineColor ? image.lineColor : defaultImageLineColor);
        meshLine.draw();
      });
    }

    //gl.disable(gl.SCISSOR_TEST);

    sdrImage.bind();
    var label = 1;
    images.forEach(function (image) {
      if (!image.imagePos) return;

      //var normalizedImagePos = vec2.create();
      //tf.transformPos(normalizedImagePos, image.imagePos);
      //if (normalizedImagePos[0] < 0.0 || normalizedImagePos[0] >= 1.0 || normalizedImagePos[1] < 0.0 || normalizedImagePos[1] >= 1.0)
      //  return;

      tf.transformPos(imagePos, image.imagePos);

      // Set image size
      tf.transformNml2(imageSize, image.imageSize);
      var w = image.tex.image.width,
          h = image.tex.image.height;
      //imageSize[0] *= 2 / gl.width; imageSize[1] *= 2 / gl.height; // Transform imageSize from normalized space to device space
      var scale;
      if (Math.max(imageSize[0], imageSize[0] * h / w, 1.0) < Math.max(imageSize[1] * w / h, imageSize[1])) scale = [2 * Math.floor(imageSize[0]) / gl.width, 2 * Math.floor(imageSize[0] * h / w) / gl.height, 1];else scale = [2 * Math.floor(imageSize[1] * w / h) / gl.width, 2 * Math.floor(imageSize[1]) / gl.height, 1];

      var borderWidth = image.borderWidth ? image.borderWidth : defaultImageBorderWidth;
      if (borderWidth > 0) {
        scale[0] += 2 * borderWidth / gl.width;
        scale[1] += 2 * borderWidth / gl.height;

        meshQuad.bind(sdrLine);
        libGlMatrix.mat4.identity(mattrans);
        if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        imagePos[0] = PixelAlignX(imagePos[0]);
        libGlMatrix.mat4.translate(mattrans, mattrans, [imagePos[0], PixelAlignY(imagePos[1]), 0.0]);
        libGlMatrix.mat4.scale(mattrans, mattrans, scale);
        libGlMatrix.mat4.translate(mattrans, mattrans, image.imageAnchor); // Move anchor to imageAnchor
        sdrLine.matWorldViewProj(mattrans);
        sdrLine.color.apply(sdrLine, image.borderColor ? image.borderColor : defaultImageBorderColor);
        meshQuad.draw();

        scale[0] -= 2 * borderWidth / gl.width;
        scale[1] -= 2 * borderWidth / gl.height;
      }

      meshQuad.bind(sdrImage, image.tex);
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      imagePos[0] = PixelAlignX(imagePos[0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [imagePos[0], PixelAlignY(imagePos[1]), 0.0]);
      libGlMatrix.mat4.scale(mattrans, mattrans, scale);
      libGlMatrix.mat4.translate(mattrans, mattrans, image.imageAnchor); // Move anchor to imageAnchor
      sdrImage.matWorldViewProj(mattrans);
      meshQuad.draw();

      if (options['labelThumbnails']) {
        // Draw thumbnail label below thumbnail
        libGlMatrix.mat4.identity(mattrans);
        if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        imagePos[0] += image.imageAnchor[0] * scale[0]; // Move stripe position depending on image anchor
        imagePos[1] += image.imageAnchor[1] * scale[1]; // Move stripe position depending on image anchor

        libGlMatrix.mat4.translate(mattrans, mattrans, [imagePos[0], PixelAlignY(imagePos[1]), 0.0]);
        scale[1] = 2 * LABEL_HEIGHT / gl.height;
        scale[1] = PixelAlignY(scale[1]);
        //scale[0] += 2 / gl.width; // Widen by 1 pixel
        libGlMatrix.mat4.scale(mattrans, mattrans, scale);
        libGlMatrix.mat4.translate(mattrans, mattrans, [-0.0, -1.0, 0.0]); // Move anchor to top of stripe
        sdrLine.matWorldViewProj(mattrans);

        sdrLine.color.apply(sdrLine, image.highlighted ? [1, 1, 0, 1] : image.labelColor ? image.labelColor : defaultImageLabelColor);
        meshQuad.bind(sdrLine, null);
        meshQuad.draw();

        sdrLine.color.apply(sdrLine, image.borderColor ? image.borderColor : defaultImageBorderColor);
        meshLineQuad.bind(sdrLine, null);
        meshLineQuad.draw();

        imagePos[0] += 1.0 * scale[0] - LABEL_TEXT_PADDING * 2 / gl.width; // Right-align label (right-padding = 4)
        imagePos[1] -= LABEL_TEXT_PADDING * 2 / gl.height; // Right-align label (top-padding = 5)
        imagePos[1] = PixelAlignY(imagePos[1]);
        gl.drawText(label++, gl.width * (1 + imagePos[0]) / 2, gl.height * (1 - imagePos[1]) / 2, 'topright');
      }
    });

    //gl.enable(gl.SCISSOR_TEST);
  };

  var options = {},
      defaultImageBorderWidth = 1,
      defaultImageBorderColor = gl.foreColor,
      defaultImageLineColor = gl.foreColor,
      defaultImageLabelColor = gl.backColor;
  this.setDataset = function (dataset, options) {};
  this.onInputChanged = function (activeInputs, animatedInputs, options) {};
  this.onOptionsChanged = function (_options) {
    options = _options;
    defaultImageBorderWidth = options['thumbnailBorderWidth'];
    defaultImageBorderColor = options['thumbnailBorderColor'] ? new Float32Array(libColormap.parseColor(options['thumbnailBorderColor'])).map(function (c) {
      return c / 255.0;
    }) : gl.foreColor;
    defaultImageLineColor = options['thumbnailLineColor'] ? new Float32Array(libColormap.parseColor(options['thumbnailLineColor'])).map(function (c) {
      return c / 255.0;
    }) : gl.foreColor;
    defaultImageLabelColor = options['thumbnailLabelColor'] ? new Float32Array(libColormap.parseColor(options['thumbnailLabelColor'])).map(function (c) {
      return c / 255.0;
    }) : gl.backColor;
  };
  this.onPlotBoundsChanged = function (plotBounds) {};

  /**
   * @param  {string} imageFilename
   * @param  {number} refIndex
   * @param  {Array<number>} refPos
   * @param  {Array<number>=} imagePos
   * @param  {Array<number>=} imageSize
   * @param  {string=} imageAnchor (default: 'middlecenter')
   */
  this.showImage = function (imageFilename, refIndex, refPos, imagePos, imageSize, imageAnchor) {
    // Convert imageAnchor from string to vec3
    var imageAnchorVector;
    switch (imageAnchor) {
      case 'topleft':
        imageAnchorVector = [-0.0, -1.0, 0.0];break;
      case 'topcenter':
        imageAnchorVector = [-0.5, -1.0, 0.0];break;
      case 'topright':
        imageAnchorVector = [-1.0, -1.0, 0.0];break;
      case 'middleleft':
        imageAnchorVector = [-0.0, -0.5, 0.0];break;
      default:
        imageAnchorVector = [-0.5, -0.5, 0.0];break;
      case 'middleright':
        imageAnchorVector = [-1.0, -0.5, 0.0];break;
      case 'bottomleft':
        imageAnchorVector = [-0.0, -0.0, 0.0];break;
      case 'bottomcenter':
        imageAnchorVector = [-0.5, -0.0, 0.0];break;
      case 'bottomright':
        imageAnchorVector = [-1.0, -0.0, 0.0];break;
    }

    var newImage = new Thumbnail(globalView);
    newImage.tex = libGraphics.LoadTexture(gl, imageFilename, function () {
      globalView.invalidate();
    });
    newImage.imagePos = imagePos;
    newImage.refIndex = refIndex;
    newImage.refPos = refPos;
    newImage.imageSize = imageSize;
    newImage.imageAnchor = imageAnchorVector;
    newImage.borderColor = null;
    images.push(newImage);
  };
  this.clearImages = function () {
    images = [];
  };
  /**
   * @return {Array<Thumbnail>}
   */
  this.getImages = function () {
    return images;
  };

  this.resolveIntersections = function (tf) {
    var a = libGlMatrix.vec2.create(),
        b = libGlMatrix.vec2.create(),
        c = libGlMatrix.vec2.create(),
        d = libGlMatrix.vec2.create();
    for (var i = 1; i < images.length; ++i) {
      if (images[i].imagePos) {
        tf.transformPos(a, images[i].imagePos);
        tf.transformPos(b, images[i].refPos);
        for (var j = 0; j < i; ++j) {
          if (images[j].imagePos) {
            tf.transformPos(c, images[j].imagePos);
            tf.transformPos(d, images[j].refPos);

            if (libGlMatrix.vec2.sqrDist(a, b) + libGlMatrix.vec2.sqrDist(c, d) > libGlMatrix.vec2.sqrDist(a, d) + libGlMatrix.vec2.sqrDist(c, b) && !libAlgorithm.linesIntersect(a, d, c, b)) {
              //console.log("exchange {0} - {1}".format(i, j));
              var tmp = images[j].imagePos;
              images[j].imagePos = images[i].imagePos;
              images[i].imagePos = tmp;
              i = j = 0;break; //EDIT: How neccessary is this?
            }
          }
        }
      }
    }for (var i = 1; i < images.length; ++i) {
      if (images[i].imagePos) {
        tf.transformPos(a, images[i].imagePos);
        tf.transformPos(b, images[i].refPos);
        for (var j = 0; j < i; ++j) {
          if (images[j].imagePos) {
            tf.transformPos(c, images[j].imagePos);
            tf.transformPos(d, images[j].refPos);

            if (libAlgorithm.linesIntersect(a, b, c, d)) {
              //console.log("intersection {0} - {1}".format(i, j));
              var tmp = images[j].imagePos;
              images[j].imagePos = images[i].imagePos;
              images[i].imagePos = tmp;
              i = j = 0;break; //EDIT: How neccessary is this?
            }
          }
        }
      }
    }
  };

  this.imageFromPoint = function (tf, p) {
    var imagePos = libGlMatrix.vec2.create(),
        refPos = libGlMatrix.vec2.create(),
        imageSize = libGlMatrix.vec2.create();

    var selectedImage = null;
    images.forEach(function (image) {
      if (!image.imagePos) return;

      tf.transformPos(imagePos, image.imagePos);

      tf.transformNml2(imageSize, image.imageSize);
      var w = image.tex.image.width,
          h = image.tex.image.height;
      var size;
      if (Math.max(imageSize[0], imageSize[0] * h / w, 1.0) < Math.max(imageSize[1] * w / h, imageSize[1])) size = [Math.floor(imageSize[0]) * 2 / gl.width, Math.floor(imageSize[0] * h / w) * 2 / gl.height, 1];else size = [Math.floor(imageSize[1] * w / h) * 2 / gl.width, Math.floor(imageSize[1]) * 2 / gl.height, 1];
      var imageBounds = [imagePos[0] + image.imageAnchor[0] * size[0], imagePos[0] + (image.imageAnchor[0] + 1.0) * size[0], imagePos[1] + image.imageAnchor[1] * size[1], imagePos[1] + (image.imageAnchor[1] + 1.0) * size[1]];

      if (options['labelThumbnails']) imageBounds[2] -= LABEL_HEIGHT * 2 / gl.height;

      if (p[0] >= imageBounds[0] && p[0] <= imageBounds[1] && p[1] >= imageBounds[2] && p[1] <= imageBounds[3]) {
        selectedImage = image;
        return;
      }
    });

    return selectedImage;
  };
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["DensityViewer"] = DensityViewer;
var libGraphics = __webpack_require__(2);
var libShaders = __webpack_require__(4);
var libAlgorithm = __webpack_require__(5);
var libGlMatrix = __webpack_require__(3);
var libUtility = __webpack_require__(0);

/**
 * A viewer that renders point density to the global view.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */
function DensityViewer(gl, globalView) {
  var sdrDensityMap = new libGraphics.Shader(gl, libShaders.Shaders.vsTextured2, libShaders.Shaders.fsViewDensityMap);
  sdrDensityMap.matWorldViewProj = sdrDensityMap.u4x4f('matWorldViewProj');
  sdrDensityMap.matTexCoordTransform = sdrDensityMap.u2x2f('matTexCoordTransform');
  sdrDensityMap.scale = sdrDensityMap.u1f('scale');
  sdrDensityMap.color = sdrDensityMap.u3f('color');
  //var colormap = libGraphics.LoadTexture(gl, "cmDensityMap.png", function() { globalView.invalidate(); });

  var sdrClusterMap = new libGraphics.Shader(gl, libShaders.Shaders.vsTextured2, libShaders.Shaders.fsTextured);
  sdrClusterMap.matWorldViewProj = sdrClusterMap.u4x4f('matWorldViewProj');
  sdrClusterMap.matTexCoordTransform = sdrClusterMap.u2x2f('matTexCoordTransform');

  // Create a 2D quad mesh
  var meshQuad = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0]), null, null, null, new Float32Array([
  // Texture coordinates
  0, 1, 0, 0, 1, 1, 1, 0]));

  var dataset = null;

  var clusterMapOptions = new libAlgorithm.ClusterMapOptions();
  this.setClusterMapThreshold = function (threshold) {
    if (this.showDensityMap && clusterMapOptions.threshold !== threshold) {
      clusterMapOptions.threshold = threshold;
      dataset.requestClusterMap(globalView.getActiveColumn(0), globalView.getActiveColumn(1), clusterMapOptions, function () {
        globalView.invalidate();
      }); // Request clusterMap and redraw once it's computed
    } else clusterMapOptions.threshold = threshold;
  };
  this.getClusterMapThreshold = function () {
    return clusterMapOptions.threshold;
  };

  this.showDensityMap = false;
  this.showClusterMap = false;
  this.render = function (flipY, tf, d0, d1) {
    var pos = libGlMatrix.vec2.create();

    if (this.showClusterMap) {
      if (dataset && dataset.isClusterMapReady(d0, d1)) {
        // If clusterMap is ready
        var clusterMap = dataset.requestClusterMap(d0, d1, clusterMapOptions); // Retrieve clusterMap synchronously (since we already know it's ready)
        if (clusterMap.width === 0 || clusterMap.height === 0) return;

        // Create texture if it wasn't already created
        var texture = this.showDensityMap ? clusterMap.dtex : clusterMap.tex;
        if (!texture) {
          var densityMap = this.showDensityMap ? dataset.requestDensityMap(d0, d1, undefined, undefined) : null; // Retrieve densityMap synchronously (since we already know it's ready)
          var rgba = new Uint8Array(4 * clusterMap.data.length);
          for (var i = 0; i < clusterMap.data.length; ++i) {
            var c = clusterMap.data[i];

            if (c === 0) {
              rgba[4 * i + 0] = 0;
              rgba[4 * i + 1] = 0;
              rgba[4 * i + 2] = 0;
              rgba[4 * i + 3] = 0;
            } else {
              // Use random RGB color (deprecated)
              /*var clr = [Math.sin(++c) * 10000, Math.sin(++c) * 10000, Math.sin(++c) * 10000];
              clr[0] -= Math.floor(clr[0]);
              clr[1] -= Math.floor(clr[1]);
              clr[2] -= Math.floor(clr[2]);*/

              // Use evenly spaced hues
              --c; // --c ... ID to index
              var d = densityMap ? (densityMap.data[i] - clusterMap.minDensities[c]) / (clusterMap.densities[c] - clusterMap.minDensities[c]) : 0.75;
              if (d < 0.0) d = 0.0;
              c = (c + 0.5) / clusterMap.n; // +0.5 ... Use off-hues
              if (c > 1) c -= 1;

              var clr = [c, 0.5, 1]; // 0.5 ... Use 50% saturated colors
              clr = libUtility.hsv2rgb(clr);

              rgba[4 * i + 0] = Math.floor(clr[0] * 255);
              rgba[4 * i + 1] = Math.floor(clr[1] * 255);
              rgba[4 * i + 2] = Math.floor(clr[2] * 255);
              rgba[4 * i + 3] = Math.floor(d * 255);
            }
          }
          //libUtility.download("clustermap.png", libUtility.imageUrlFromBytes(rgba, clusterMap.width, clusterMap.height));
          texture = libGraphics.LoadTextureFromByteArray(gl, rgba, clusterMap.width, clusterMap.height);
          if (this.showDensityMap) clusterMap.dtex = texture;else clusterMap.tex = texture;
        }

        sdrClusterMap.bind();
        meshQuad.bind(sdrClusterMap, texture);

        var mattrans = libGlMatrix.mat4.create();
        if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        tf.datasetCoordToDeviceCoord(pos, d0 > d1 ? [clusterMap.invTransformY(0), clusterMap.invTransformX(0)] : [clusterMap.invTransformX(0), clusterMap.invTransformY(0)]);
        libGlMatrix.mat4.translate(mattrans, mattrans, [pos[0], pos[1], 0.0]);
        tf.datasetDistToDeviceDist(pos, d0 > d1 ? [clusterMap.height / clusterMap.transform[2], clusterMap.width / clusterMap.transform[0]] : [clusterMap.width / clusterMap.transform[0], clusterMap.height / clusterMap.transform[2]]);
        libGlMatrix.mat4.scale(mattrans, mattrans, [pos[0], pos[1], 1.0]);
        sdrClusterMap.matWorldViewProj(mattrans);

        sdrClusterMap.matTexCoordTransform(new Float32Array(d0 > d1 ? [0, 1, 1, 0] : [1, 0, 0, 1]));
        meshQuad.draw();
      } else // If clusterMap isn't ready yet
        dataset.requestClusterMap(d0, d1, clusterMapOptions, function () {
          globalView.invalidate();
        }); // Request clusterMap and redraw once it's computed
    } else if (this.showDensityMap) {
      if (dataset && dataset.isDensityMapReady(d0, d1)) {
        // If densityMap is ready
        var densityMap = /** @type {DensityMap} */dataset.requestDensityMap(d0, d1, undefined, undefined); // Retrieve densityMap synchronously (since we already know it's ready)
        if (densityMap.width === 0 || densityMap.height === 0) return;
        //libUtility.download("densityMap.png", libUtility.imageUrlFromBytes(libUtility.F32toI24flipY(densityMap.data, [densityMap.minimum, densityMap.maximum], densityMap.width, densityMap.height), densityMap.width, densityMap.height));

        // Create texture if it wasn't already created
        if (!densityMap.texture) densityMap.texture = libGraphics.LoadTextureFromFloatArray(gl, densityMap.data, densityMap.width, densityMap.height);

        sdrDensityMap.bind();
        meshQuad.bind(sdrDensityMap, [densityMap.texture] /*colormap*/);

        var mattrans = libGlMatrix.mat4.create();
        if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        tf.datasetCoordToDeviceCoord(pos, d0 > d1 ? [densityMap.invTransformY(0), densityMap.invTransformX(0)] : [densityMap.invTransformX(0), densityMap.invTransformY(0)]);
        libGlMatrix.mat4.translate(mattrans, mattrans, [pos[0], pos[1], 0.0]);
        tf.datasetDistToDeviceDist(pos, d0 > d1 ? [densityMap.height / densityMap.transform[2], densityMap.width / densityMap.transform[0]] : [densityMap.width / densityMap.transform[0], densityMap.height / densityMap.transform[2]]);
        libGlMatrix.mat4.scale(mattrans, mattrans, [pos[0], pos[1], 1.0]);
        sdrDensityMap.matWorldViewProj(mattrans);

        sdrDensityMap.matTexCoordTransform(new Float32Array(d0 > d1 ? [0, 1, 1, 0] : [1, 0, 0, 1]));
        sdrDensityMap.scale(1 / densityMap.maximum);
        //sdrDensityMap.scale(0.5);
        sdrDensityMap.color(gl.foreColor[0], gl.foreColor[1], gl.foreColor[2]);
        meshQuad.draw();
      } else // If densityMap isn't ready yet
        dataset.requestDensityMap(d0, d1, undefined, undefined, function () {
          globalView.invalidate();
        }); // Request densityMap and redraw once it's computed
    }
  };

  this.setDataset = function (_dataset, options) {
    dataset = _dataset;
  };
  this.onInputChanged = function (activeInputs, animatedInputs, options) {};
  this.onOptionsChanged = function (options) {};
  this.onPlotBoundsChanged = function (plotBounds) {};

  this.updateImages = function (images, d0, d1) {
    var densityMap = dataset.requestDensityMap(d0, d1, undefined, undefined);
    if (densityMap.texture === null || d0 === d1) return;

    var width = densityMap.width,
        height = densityMap.height,
        densityScale = densityMap.scale,
        densityOffset = -densityMap.offset;

    var xMin = 0,
        xMax = width;
    var yMin = 0,
        yMax = height;

    var bodies = images.map(function (image) {
      var x = densityMap.transformX(image.imagePos[d0]);
      var y = densityMap.transformY(image.imagePos[d1]);
      var rx = densityMap.transformX(image.refPos[d0]);
      var ry = densityMap.transformY(image.refPos[d1]);
      return { x: x, y: y, rx: rx, ry: ry, vx: 0, vy: 0, fx: 0, fy: 0 };
    });

    var repellPoint = function repellPoint(body, point_x, point_y, minDist, minDistMagnitude, maxDist, maxDistMagnitude) {
      var dx = body.x - point_x,
          dy = body.y - point_y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDist) {
        dist -= minDist;
        var F = -minDistMagnitude * dist;
        //if (dx < 1e-4 && dy < 1e-4) dx += 1e-4;
        body.fx += F * dx;
        body.fy += F * dy;
      } else if (dist > maxDist) {
        dist -= maxDist;
        var F = -maxDistMagnitude * dist;
        body.fx += F * dx;
        body.fy += F * dy;
      }
    };

    for (var i = 0; i < bodies.length; ++i) {
      var sample_x = Math.floor(bodies[i].x),
          sample_y = Math.floor(bodies[i].y);
      var density = densityMap[sample_x * width + sample_y];
      var bestDir = null,
          lowestDensity = density;
      [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].forEach(function (dir) {
        var x = sample_x + dir[0];
        var y = sample_y + dir[1];
        if (x >= xMin && x < xMax && y >= yMin && y < yMax) {
          var density = densityMap[y * width + x];
          if (density < lowestDensity) {
            lowestDensity = density;
            bestDir = dir;
          }
        }
      });
      if (bestDir !== null) {
        repellPoint(bodies[i], bodies[i].x + bestDir[0], bodies[i].y + bestDir[1], Number.MIN_VALUE, 0, 0.0, density);
        console.log(density);
      }
    }

    for (var i = 0; i < bodies.length; ++i) {
      bodies[i].x += bodies[i].fx;
      bodies[i].y += bodies[i].fy;

      images[i].imagePos[d0] = densityMap.invTransformX(bodies[i].x);
      images[i].imagePos[d1] = densityMap.invTransformY(bodies[i].y);
    }
  };
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["HistogramViewer"] = HistogramViewer;
var libGraphics = __webpack_require__(2);
var libShaders = __webpack_require__(4);
var libAlgorithm = __webpack_require__(5);
var libColormap = __webpack_require__(6);
var libGlMatrix = __webpack_require__(3);

/**
 * A class drawing histograms for x-, y- and color axes to the left-, bottom- and right of the scatter plot.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */
function HistogramViewer(gl, globalView) {
  var sdrLine = new libGraphics.Shader(gl, libShaders.Shaders.vsSimple, libShaders.Shaders.fsLine);
  sdrLine.color = sdrLine.u4f('color');
  sdrLine.color.apply(sdrLine, gl.foreColor);
  sdrLine.matWorldViewProj = sdrLine.u4x4f('matWorldViewProj');

  /*this.updateColorSchema = function() {
    sdrLine.color.apply(sdrLine, gl.foreColor);
  }*/

  // Create a 2D line mesh
  var meshLine = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 0, 0, 1, 0, 0]), null, null, null, null, null, gl.LINES);

  var dataset = null,
      activeInputs = null,
      options = {};
  var axes = [{ histogram: null, d: -1, meshHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.TRIANGLES), meshLineHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP) }, { histogram: null, d: -1, meshHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.TRIANGLES), meshLineHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP) }, { histogram: null, d: -1, meshHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.TRIANGLES), meshLineHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP) }];

  this.render = function (flipY, tf, plotBounds) {
    var mattrans = libGlMatrix.mat4.create();

    var pos = libGlMatrix.vec3.create(),
        scl = libGlMatrix.vec3.create();
    tf.datasetCoordToDeviceCoord(pos, [axes[0].histogram ? axes[0].histogram.invTransformX(0) : 0.0, axes[1].histogram ? axes[1].histogram.invTransformX(0) : 0.0, axes[2].histogram ? axes[2].histogram.invTransformX(0) : 0.0]);
    tf.datasetDistToDeviceDist(scl, [axes[0].histogram ? axes[0].histogram.width / axes[0].histogram.transform[0] : 1.0, axes[1].histogram ? axes[1].histogram.width / axes[1].histogram.transform[0] : 1.0, axes[2].histogram ? axes[2].histogram.width / axes[2].histogram.transform[0] : 1.0]);

    // Transform color-dimension from [0 ... 1] to [plotBounds.y .. plotBounds.y + plotBounds.height] in device y-space -> pos[2], scl[2]
    pos[2] = (plotBounds.y + plotBounds.height * pos[2]) * 2 / gl.height - 1;
    scl[2] = plotBounds.height * scl[2] * 2 / gl.height;

    // Draw x-axis histogram
    if (options['showXAxisHistogram'] && axes[0].histogram) {
      var axis = axes[0];
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(plotBounds.x, 0.0, plotBounds.width, gl.height);

      sdrLine.bind();
      meshLine.bind(sdrLine, null);
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + 0.5) / gl.width - 1, 2 * (plotBounds.y + 0.5 - 64) / gl.height - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.scale(mattrans, mattrans, [2 * plotBounds.width / gl.width, 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();

      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [pos[0] + 0.5 * 2 / gl.width, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0.0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.scale(mattrans, mattrans, [scl[0], -64 * 2 / gl.height, 1.0]);

      sdrLine.bind();
      sdrLine.matWorldViewProj(mattrans);
      sdrLine.color.apply(sdrLine, [gl.foreColor[0], gl.foreColor[1], gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(sdrLine, null);
      axis.meshHistogram.draw();

      sdrLine.color.apply(sdrLine, gl.foreColor);
      axis.meshLineHistogram.bind(sdrLine, null);
      axis.meshLineHistogram.draw();

      gl.disable(gl.SCISSOR_TEST);
    }

    // Draw y-axis histogram
    if (options['showYAxisHistogram'] && axes[1].histogram) {
      var axis = axes[1];
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(0.0, flipY ? gl.height - plotBounds.y - plotBounds.height : plotBounds.y, gl.width, plotBounds.height);

      sdrLine.bind();
      meshLine.bind(sdrLine, null);
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + 0.5 - 64) / gl.width - 1, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [2 * plotBounds.height / gl.height, 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();

      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + 0.5) / gl.width - 1, pos[1] + 0.5 * 2 / gl.height, 0.0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [scl[1], 64 * 2 / gl.width, 1.0]);

      sdrLine.bind();
      sdrLine.matWorldViewProj(mattrans);
      sdrLine.color.apply(sdrLine, [gl.foreColor[0], gl.foreColor[1], gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(sdrLine, null);
      axis.meshHistogram.draw();

      sdrLine.color.apply(sdrLine, gl.foreColor);
      axis.meshLineHistogram.bind(sdrLine, null);
      axis.meshLineHistogram.draw();

      gl.disable(gl.SCISSOR_TEST);
    }

    // Draw color-axis histogram
    if (options['showColormapHistogram'] && axes[2].histogram) {
      var axis = axes[2];
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(0.0, flipY ? gl.height - plotBounds.y - plotBounds.height : plotBounds.y, gl.width, plotBounds.height);

      sdrLine.bind();
      meshLine.bind(sdrLine, null);
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + plotBounds.width + libColormap.COLORMAP_WIDTH + 0.5 + 64) / gl.width - 1, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [2 * plotBounds.height / gl.height, 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();

      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + plotBounds.width + libColormap.COLORMAP_WIDTH + 0.5) / gl.width - 1, pos[2] + 0.5 * 2 / gl.height, 0.0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [scl[2], -64 * 2 / gl.width, 1.0]);

      sdrLine.bind();
      sdrLine.matWorldViewProj(mattrans);
      sdrLine.color.apply(sdrLine, [gl.foreColor[0], gl.foreColor[1], gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(sdrLine, null);
      axis.meshHistogram.draw();

      sdrLine.color.apply(sdrLine, gl.foreColor);
      axis.meshLineHistogram.bind(sdrLine, null);
      axis.meshLineHistogram.draw();

      gl.disable(gl.SCISSOR_TEST);
    }
  };

  this.setDataset = function (_dataset, options) {
    dataset = _dataset;
    recreateHistograms();
  };

  this.onOptionsChanged = function (_options, recompileShader) {
    options = _options;
    recreateHistograms();
  };

  this.onInputChanged = function (_activeInputs, animatedInputs, options) {
    activeInputs = _activeInputs;
    recreateHistograms();
  };

  this.onPlotBoundsChanged = function (plotBounds) {};

  function recreateHistograms() {
    if (dataset && options['histogramHeight'] > 0) {
      var numBins = options['numHistogramBins'];
      if (options['showXAxisHistogram']) createHistogram(axes[0], dataset, activeInputs[0], numBins);
      if (options['showYAxisHistogram']) createHistogram(axes[1], dataset, activeInputs[1], numBins);
      if (options['showColormapHistogram']) createHistogram(axes[2], dataset, activeInputs[2], numBins);
    }
  }
  function createHistogram(axis, dataset, d, numBins) {
    if (d < 0 || d >= dataset.dataVectors.length) return; // Validate inputs
    if (axis.histogram && axis.histogram.width === numBins && axis.d === d) return; // Requested histogram already exists

    axis.histogram = libAlgorithm.computeHistogram(dataset, axis.d = d, numBins);
    libAlgorithm.addTransformFunctions(axis.histogram);
    //console.log(axis.histogram);

    var positions = new Float32Array(6 * numBins * 3);
    var v3_set = function v3_set(i, x, y) {
      i *= 3;positions[i++] = x;positions[i++] = y;positions[i++] = 0.0;
    };
    for (var b = 0, i = -1, x_scale = 1 / numBins; b < numBins; ++b) {
      var y = axis.histogram.data[b] / axis.histogram.maximum;

      v3_set(++i, (b + 0) * x_scale, 0);
      v3_set(++i, (b + 1) * x_scale, 0);
      v3_set(++i, (b + 1) * x_scale, y);

      v3_set(++i, (b + 1) * x_scale, y);
      v3_set(++i, (b + 0) * x_scale, y);
      v3_set(++i, (b + 0) * x_scale, 0);
    }
    axis.meshHistogram.reset(positions, null, null, null, null, null, gl.TRIANGLES);

    positions = new Float32Array((3 * numBins + 1) * 3);
    v3_set(0, 0, 0);
    for (var b = 0, i = 0, x_scale = 1 / numBins; b < numBins;) {
      var y = axis.histogram.data[b] / axis.histogram.maximum;

      v3_set(++i, b * x_scale, y);
      v3_set(++i, ++b * x_scale, y);
      v3_set(++i, b * x_scale, 0);
    }
    axis.meshLineHistogram.reset(positions, null, null, null, null, null, gl.LINE_STRIP);
  }
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["CoordinateSystem"] = CoordinateSystem;
var libGraphics = __webpack_require__(2);
var libShaders = __webpack_require__(4);
var libGlMatrix = __webpack_require__(3);

/**
 * A class drawing x- and y axes to the left- and bottom of the scatter plot.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */
function CoordinateSystem(gl, globalView) {
  var TICK_LENGTH = 6; // [pixel]
  var NUM_TICKS = 10;

  var sdrLine = new libGraphics.Shader(gl, libShaders.Shaders.vsSimple, libShaders.Shaders.fsLine);
  sdrLine.color = sdrLine.u4f('color');
  sdrLine.color.apply(sdrLine, gl.foreColor);
  sdrLine.matWorldViewProj = sdrLine.u4x4f('matWorldViewProj');
  this.updateColorSchema = function () {
    sdrLine.color.apply(sdrLine, gl.foreColor);
  };

  // Create a 2D line mesh
  var meshLine = new libGraphics.Mesh(gl, new Float32Array([
  // Positions
  0, 0, 0, 1, 0, 0]), null, null, null, null, null, gl.LINES);

  var axes = [{ minimum: 0, maximum: 100, values: null, tickOffset: 0, tickDistance: 10, tickCount: 11, tickLength: TICK_LENGTH }, { minimum: 0, maximum: 100, values: null, tickOffset: 0, tickDistance: 10, tickCount: 11, tickLength: TICK_LENGTH }];

  /** @type {number} */var xTickLabel_top = 0;
  /** @type {number} */var yTickLabel_left = 0;

  this.visible = [true, true];
  this.render = function (flipY, plotBounds) {
    var mattrans = libGlMatrix.mat4.create();

    // >>> Draw axes

    sdrLine.bind();
    meshLine.bind(sdrLine, null);
    // Draw x-axis
    if (this.visible[0]) {
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + 0.5) / gl.width - 1, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.scale(mattrans, mattrans, [2 * plotBounds.width / gl.width, 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
    }
    // Draw y-axis
    if (this.visible[1]) {
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + 0.5) / gl.width - 1, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [2 * plotBounds.height / gl.height, 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
    }

    // >>> Draw ticks and tick labels

    // Draw x-axis ticks and tick labels
    xTickLabel_top = 0;
    if (this.visible[0]) {
      var axis = axes[0];
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + 0.5) / gl.width - 1, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, -Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [2 * axis.tickLength / gl.height, 2 * plotBounds.width / gl.width, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, 1.0, 0.0]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -1.0, 0.0]);
      for (var i = 0; i < axis.tickCount; ++i) {
        var x = axis.tickOffset + i * axis.tickDistance;
        var tickPos = (x - axis.minimum) / (axis.maximum - axis.minimum);

        libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, tickPos, 0.0]);
        sdrLine.matWorldViewProj(mattrans);
        meshLine.draw();
        libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -tickPos, 0.0]);

        var tickLabel = axis.values ? axis.values[x] : x.toPrecision(6) / 1;
        gl.drawText(tickLabel, plotBounds.x + plotBounds.width * tickPos, gl.height - plotBounds.y + axis.tickLength + 2, 'topcenter');
      }
      xTickLabel_top = gl.height - plotBounds.y + axis.tickLength + 10 + gl.measureTextHeight();
    }
    // Draw y-axis ticks and tick labels
    yTickLabel_left = 0;
    if (this.visible[1]) {
      var axis = axes[1];
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      libGlMatrix.mat4.translate(mattrans, mattrans, [2 * (plotBounds.x + 0.5) / gl.width - 1, 2 * (plotBounds.y + 0.5) / gl.height - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.scale(mattrans, mattrans, [-2 * axis.tickLength / gl.width, 2 * plotBounds.height / gl.height, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, 1.0, 0.0]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -1.0, 0.0]);
      for (var i = 0; i < axis.tickCount; ++i) {
        var y = axis.tickOffset + i * axis.tickDistance;
        var tickPos = (y - axis.minimum) / (axis.maximum - axis.minimum);

        libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, tickPos, 0.0]);
        sdrLine.matWorldViewProj(mattrans);
        meshLine.draw();
        libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -tickPos, 0.0]);

        var tickLabel = axis.values ? axis.values[y] : y.toPrecision(6) / 1;
        yTickLabel_left = Math.max(yTickLabel_left, gl.measureTextWidth(tickLabel));
        gl.drawText(tickLabel, plotBounds.x - axis.tickLength - 2, gl.height - plotBounds.y - plotBounds.height * tickPos, 'middleright');
      }
      yTickLabel_left = Math.ceil(plotBounds.x - axis.tickLength - 10 - yTickLabel_left);
    }

    // >>> Draw axis labels

    // Draw x-axis label
    if (this.visible[0] && axes[0].label) gl.drawText(axes[0].label, plotBounds.x + plotBounds.width / 2, xTickLabel_top, 'topcenter');
    if (this.visible[1] && axes[1].label) gl.drawText(axes[1].label, yTickLabel_left, gl.height - plotBounds.y - plotBounds.height / 2, 'bottomcenter', -Math.PI / 2);
  };

  function checkOverlap(d) {
    var MIN_TICK_LABEL_DISTANCE = gl.measureTextWidth('  '); // Minimum distance between tick labels in pixel
    switch (d) {
      case 0:
        var axis = axes[0],
            overlap = Number.MIN_VALUE,
            plotBounds = globalView.getPlotBounds();
        for (var i = 0; i < axis.tickCount; ++i) {
          var x = axis.tickOffset + i * axis.tickDistance;
          var tickPos = (x - axis.minimum) / (axis.maximum - axis.minimum);

          var tickLabel = axis.values ? axis.values[x] : x.toPrecision(6) / 1;

          var labelWidth = gl.measureTextWidth(tickLabel);
          var leftLabelBound = plotBounds.x + plotBounds.width * tickPos - labelWidth / 2;
          if (leftLabelBound < overlap + MIN_TICK_LABEL_DISTANCE) return false;

          overlap = leftLabelBound + labelWidth;
        }
        return true;

      case 1:
        var axis = axes[1],
            plotBounds = globalView.getPlotBounds();
        return plotBounds.height * axis.tickDistance / (axis.maximum - axis.minimum) >= gl.measureTextHeight() + MIN_TICK_LABEL_DISTANCE;

      default:
        return true;
    }
  }

  /**
   * @param  {number} d
   * @param  {number} minimum
   * @param  {number} maximum
   * @param  {boolean=} changeTickDistance=true
   */
  this.setNumericRange = function (d, minimum, maximum, changeTickDistance) {
    var axis = axes[d];
    axis.minimum = minimum;
    axis.maximum = maximum;
    axis.values = null;

    for (var numTicks = NUM_TICKS; numTicks >= 0; --numTicks) {
      if (changeTickDistance === false) {
        axis.tickOffset = Math.ceil(minimum / axis.tickDistance) * axis.tickDistance;
        axis.tickCount = Math.floor((maximum - axis.tickOffset) / axis.tickDistance) + 1;
      } else {
        axis.tickDistance = (maximum - minimum) / numTicks;
        var exp = Math.ceil(Math.log(axis.tickDistance) / Math.log(10)); // Compute power-of-10 just above tickDistance -> pow(10, exp)

        // Try less aggressive rounding in each iteration until break condition is met
        for (var i = 0; i < 10; ++i) {
          // Maximum 10 iterations
          axis.tickDistance = (maximum - minimum) / numTicks;
          var base = Math.pow(10, exp--);
          axis.tickDistance = Math.round(axis.tickDistance / base) * base; // Round tickDistance to base
          axis.tickOffset = Math.ceil(minimum / axis.tickDistance) * axis.tickDistance;
          axis.tickCount = Math.floor((maximum - axis.tickOffset) / axis.tickDistance) + 1;
          if (axis.tickCount >= numTicks - 2 && axis.tickCount <= numTicks + 2) // Condition: numTicks - 2 <= tickCount <= numTicks + 2
            break;
        }
      }

      if (checkOverlap(d)) break;
    }
  };
  this.setEnumRange = function (d, minimum, maximum, values) {
    var axis = axes[d];
    axis.minimum = minimum -= 0.5; // 0.5 ... Move to center of value-bin
    axis.maximum = maximum -= 0.5; // 0.5 ... Move to center of value-bin
    axis.values = values;

    axis.tickDistance = 1;
    axis.tickOffset = Math.max(0, Math.ceil(minimum / axis.tickDistance) * axis.tickDistance);
    axis.tickCount = Math.min(values.length - axis.tickOffset, Math.floor((maximum - axis.tickOffset + 1) / axis.tickDistance));
  };
  this.setLabel = function (d, label) {
    axes[d].label = label;
  };

  this.setDataset = function (dataset, options) {};
  this.onInputChanged = function (activeInputs, animatedInputs, options) {};
  this.onOptionsChanged = function (options) {
    axes[0].tickLength = TICK_LENGTH + (options['showXAxisHistogram'] ? options['histogramHeight'] : 0);
    axes[1].tickLength = TICK_LENGTH + (options['showYAxisHistogram'] ? options['histogramHeight'] : 0);
  };
  this.onPlotBoundsChanged = function (plotBounds) {
    for (var i = 0; i < 2; ++i) {
      axes[i].values === null ? this.setNumericRange(i, axes[i].minimum, axes[i].maximum, true) : this.setEnumRange(i, axes[i].minimum + 0.5, axes[i].maximum + 0.5, axes[i].values);
    }
  };

  this.labelFromPoint = function (plotBounds, p) {
    if (this.visible[0]) {
      var halfTextWidth = gl.measureTextWidth(axes[0].label) / 2;
      var plotCenter = plotBounds.x + plotBounds.width / 2;
      if (p[0] >= plotCenter - halfTextWidth && p[0] < plotCenter + halfTextWidth && p[1] >= xTickLabel_top && p[1] <= xTickLabel_top + gl.measureTextHeight() + 2) return 0;
    }
    if (this.visible[1]) {
      var halfTextWidth = gl.measureTextWidth(axes[1].label) / 2;
      var plotCenter = gl.height - plotBounds.y - plotBounds.height / 2;
      if (p[0] >= yTickLabel_left - gl.measureTextHeight() && p[0] <= yTickLabel_left + 2 && p[1] >= plotCenter - halfTextWidth && p[1] < plotCenter + halfTextWidth) return 1;
    }
    return null;
  };
  this.getLabelBounds = function (plotBounds, d) {
    switch (d) {
      case 0:
        if (!this.visible[0]) return null;
        var halfTextWidth = gl.measureTextWidth(axes[0].label) / 2;
        var plotCenter = plotBounds.x + plotBounds.width / 2;
        return { 'l': plotCenter - halfTextWidth, 'r': plotCenter + halfTextWidth, 't': xTickLabel_top, 'b': xTickLabel_top + gl.measureTextHeight() + 2 };

      case 1:
        if (!this.visible[1]) return null;
        var halfTextWidth = gl.measureTextWidth(axes[1].label) / 2;
        var plotCenter = gl.height - plotBounds.y - plotBounds.height / 2;
        return { 'l': yTickLabel_left - gl.measureTextHeight(), 'r': yTickLabel_left + 2, 't': plotCenter - halfTextWidth, 'b': plotCenter + halfTextWidth };
    }
    return null;
  };

  this.free = function () {
    meshLine.free();
  };
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = DataVector;
/* harmony export (immutable) */ __webpack_exports__["c"] = Dataset;
/* harmony export (immutable) */ __webpack_exports__["d"] = RandomDataset;
/* harmony export (immutable) */ __webpack_exports__["a"] = CsvDataset;
var libUtility = __webpack_require__(0);
var libAlgorithm = __webpack_require__(5);
var libFormulaCompiler = __webpack_require__(26);
//import * as Parallel from '../src_lib/parallel.js';
//import * as Parallel from '../node_modules/paralleljs/lib/parallel';
var Parallel = __webpack_require__(27);
//const Parallel = require('../node_modules/paralleljs/lib/parallel'); // doesn't work: Module not found: Error: Can't resolve 'child_process' in Worker.js

var $ = __webpack_require__(32); // alternative: a
window.jQuery = $;
__webpack_require__(33);
/* alternative: add the following to webpack.config.js (https://github.com/fronteed/icheck/issues/322):
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
]
*/

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

  if (libUtility.isNumber(source)) {
    var c = Math.round(source);
    this['getValue'] = this.getValue = function (i) {
      //return Math.log(dataset.fdata[i * nc + c]);
      return dataset.fdata[i * nc + c];
    };

    //this.getValueCode = "log(c{0})".format(c);
    this.getValueCode = 'c' + c; //"{" + c + "}";

    var column = dataset.columns[c];
    this['minimum'] = this.minimum = column.minimum;
    this['maximum'] = this.maximum = column.maximum;
    this.offset = -column.minimum * (this.scale = 1 / (column.maximum - column.minimum));
    this['values'] = this.values = column.values;
    this['label'] = this.label = column.label;
  } else {
    var stack = new Array(16);
    var globalTypes = {
      'n': libFormulaCompiler.FormulaCompiler.types.float,
      'PI': libFormulaCompiler.FormulaCompiler.types.float,
      'i': libFormulaCompiler.FormulaCompiler.types.float
    };
    for (var c = 0; c < nc; ++c) {
      globalTypes['c' + c] = libFormulaCompiler.FormulaCompiler.types.float;
    }var globals = {
      'n': dataset.length,
      'PI': Math.PI
    };

    var code = libFormulaCompiler.FormulaCompiler.compile(source + ';', globalTypes);
    if (libUtility.isString(code)) {
      console.error("GlobalView error: Error while parsing data vector formula '{0}'".format(source));
      console.error('                  ' + code);
      return;
    }
    var formula = source;
    this.getValueCode = formula;

    this['getValue'] = this.getValue = function (i) {
      globals['i'] = i;
      for (var c = 0; c < nc; ++c) {
        globals['c' + c] = dataset.fdata[i * nc + c];
      }return libFormulaCompiler.FormulaCompiler.run(code, stack, globals);
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

    return _densityMaps.length > d0 && _densityMaps[d0].length > d1 && _densityMaps[d0][d1] && (libUtility.isUndefined(_densityMaps[d0][d1].pending) || _densityMaps[d0][d1].old);
  };

  this['iterateDensityMaps'] =
  /**
   * Calls the given function for each computed density map
   * @param  {function(DensityMap!)!} callback
   */
  this.iterateDensityMaps = function (callback) {
    _densityMaps.forEach(function (_densityMaps) {
      return _densityMaps.forEach(function (densityMap) {
        return densityMap && (libUtility.isUndefined(densityMap.pending) || densityMap.old) ? callback(densityMap.old || densityMap) : null;
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
      console.warn('GlobalView warning: Requesting density map for dimensions {0}, {1} on a dataset with only {2} data vectors'.format(d0, d1, this.dataVectors.length));
      return null;
    }
    var isAsync = libUtility.isFunction(ondone); //&& !/Firefox/i.test(navigator.userAgent);// Firefox tends to crash with Parallel.js

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

    if (densityMap && options && densityMap.options && !libAlgorithm.DensityMapOptions.equals(options, densityMap.options)) // If options changed
      densityMap = null; // Recompute density map

    if (isAsync) {
      // If async
      if (!densityMap) {
        // If _densityMaps[d0][d1] isn't computed or being computed yet
        // While we compute _densityMaps[d0][d1], replace it with an array of functions to execute when it is ready
        _densityMaps[d0][d1] = { pending: [ondone], old: _densityMaps[d0][d1] };

        // Compute histogram synchronously
        var histogram = libAlgorithm.computeHistogram2D(this, d0, d1, size, size);

        // Execute an asynchronous worker that computes _densityMaps[d0][d1]
        var p = new Parallel([libUtility.makeCloneable(histogram), new libAlgorithm.DensityMapOptions(options)], { evalPath: 'eval.js' });
        p.require(libAlgorithm.DensityMap);
        p.require(libAlgorithm.computeDensityMap);
        p.spawn(function (params) {
          // the following code will be evaled from a blob in Parallel. so no need for libAlgorithm.
          return computeDensityMap.apply(null, params);
        }).then(function (densityMap) {
          densityMap = new libAlgorithm.DensityMap(densityMap);
          // Free histogram
          histogram = null;

          // Set _densityMaps[d0][d1]
          _densityMaps[d0][d1].old = null;
          var pending = _densityMaps[d0][d1].pending;
          _densityMaps[d0][d1] = densityMap;

          if (_clusterMaps.length > d0 && _clusterMaps[d0].length > d1 && _clusterMaps[d0][d1] && libUtility.isUndefined(_clusterMaps[d0][d1].pending)) _clusterMaps[d0][d1] = null;

          // Execute queued 'ondone' functions
          pending.forEach(function (ondone) {
            ondone(densityMap);
          });
        });
      } else if (!libUtility.isUndefined(densityMap.pending)) {
        // If _densityMaps[d0][d1] is currently being computed asynchronously
        if (densityMap.old && (!options || libAlgorithm.DensityMapOptions.equals(densityMap.old.options, options))) // If the deprecated densityMap satisfies our requested options
          ondone( /** @type {DensityMap} */densityMap.old);else densityMap.pending.push(ondone);
      } else // If _densityMaps[d0][d1] is available
        ondone( /** @type {DensityMap} */densityMap);
      return null;
    } else {
      if (!densityMap) {
        // If _densityMaps[d0][d1] isn't computed or being computed yet
        //var tStart = performance.now();
        var histogram = libAlgorithm.computeHistogram2D(this, d0, d1, size, size);
        _densityMaps[d0][d1] = densityMap = new libAlgorithm.DensityMap(libAlgorithm.computeDensityMap(histogram, new libAlgorithm.DensityMapOptions(options)));
        histogram = null; // Free histogram
        //console.log(performance.now() - tStart + "ms");
      } else if (densityMap.old && (!options || libAlgorithm.DensityMapOptions.equals(densityMap.old.options, options))) // If the deprecated densityMap satisfies our requested options
        densityMap = densityMap.old;else while (!libUtility.isUndefined(_densityMaps[d0][d1].pending)) {} // Wait while _densityMaps[d0][d1] is being computed asynchronously

      if (libUtility.isFunction(ondone)) ondone( /** @type {DensityMap} */densityMap);
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

    return _clusterMaps.length > d0 && _clusterMaps[d0].length > d1 && _clusterMaps[d0][d1] && (libUtility.isUndefined(_clusterMaps[d0][d1].pending) || _clusterMaps[d0][d1].old);
  };
  this['requestClusterMap'] = this.requestClusterMap = function (d0, d1, options, ondone) {
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      console.warn('GlobalView warning: Requesting cluster map for dimensions {0}, {1} on a dataset with only {2} data vectors'.format(d0, d1, this.dataVectors.length));
      return null;
    }
    var isAsync = libUtility.isFunction(ondone); //&& !/Firefox/i.test(navigator.userAgent);// Firefox tends to crash with Parallel.js

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

    if (clusterMap && options && clusterMap.options && !libAlgorithm.ClusterMapOptions.equals(options, clusterMap.options)) // If options changed
      clusterMap = null; // Recompute density map

    if (isAsync) {
      // If async
      if (!clusterMap) {
        // If _clusterMaps[d0][d1] isn't computed or being computed yet
        // While we compute _clusterMaps[d0][d1], replace it with an array of functions to execute when it is ready
        _clusterMaps[d0][d1] = { pending: [ondone] };

        this.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
          // Execute an asynchronous worker that computes _clusterMaps[d0][d1]
          var p = new Parallel([libUtility.makeCloneable(densityMap), d0, d1, new libAlgorithm.ClusterMapOptions(options)], { evalPath: 'eval.js' });
          p.require(libAlgorithm.computeClusterMap_method3);
          p.require(libUtility.ForwardList);
          p.require(libUtility.PriorityQueue);
          p.spawn(function (params) {
            // the following code will be evaled from a blob in Parallel. so no need for libAlgorithm.
            return computeClusterMap_method3.apply(null, params);
          }).then(function (clusterMap) {
            clusterMap = new libAlgorithm.ClusterMap(clusterMap);
            // Set _clusterMaps[d0][d1]
            var pending = _clusterMaps[d0][d1].pending;
            _clusterMaps[d0][d1] = clusterMap;

            // Execute queued 'ondone' functions
            pending.forEach(function (ondone) {
              ondone(clusterMap);
            });
          });
        });
      } else if (!libUtility.isUndefined(clusterMap.pending)) {
        // If _clusterMaps[d0][d1] is currently being computed asynchronously
        if (clusterMap.old && (!options || libAlgorithm.ClusterMapOptions.equals(clusterMap.old.options, options))) // If the deprecated clusterMap satisfies our requested options
          ondone( /** @type {ClusterMap} */clusterMap.old);else clusterMap.pending.push(ondone);
      } else // If _clusterMaps[d0][d1] is available
        ondone(clusterMap);
    } else {
      if (!clusterMap) {
        // If _clusterMaps[d0][d1] isn't computed or being computed yet
        var densityMap = this.requestDensityMap(d0, d1, undefined, undefined);
        if (densityMap) {
          //var tStart = performance.now();
          _clusterMaps[d0][d1] = clusterMap = new libAlgorithm.ClusterMap(libAlgorithm.computeClusterMap_method3(densityMap, d0, d1, new libAlgorithm.ClusterMapOptions(options)));
          //console.log(performance.now() - tStart + "ms");
        } else _clusterMaps[d0][d1] = clusterMap = null;
      } else if (clusterMap.old && (!options || libAlgorithm.ClusterMapOptions.equals(clusterMap.old.options, options))) // If the deprecated clusterMap satisfies our requested options
        clusterMap = clusterMap.old;else while (!libUtility.isUndefined(clusterMap.pending)) {} // Wait while _clusterMaps[d0][d1] is being computed asynchronously

      if (libUtility.isFunction(ondone)) ondone(clusterMap);
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

      samples = libAlgorithm.sampleDensityMapChain(densityMapChain);
      for (var c = 0; c < nc; ++c) {
        column = this.columns[c];
        sample = column.minimum + (column.maximum - column.minimum) * samples[c] * sampleScale;

        if (column.values) {
          // If column is qualitative
          fdata_inflated[i_inflated * nc + c] = sample = Math.max(0, Math.min(column.values.length - 1, Math.round(sample)));
          data_inflated[i_inflated * nc + c] = column.values[sample];
        } else {
          // If column is numeric
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
        names_inflated[i_inflated] = 'generated datapoint ' + ++index;
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
    if (this.names && !libUtility.isUndefined(nameColumn) && !libUtility.isUndefined(nameColumnLabel)) csv_nc = nc + 1;else {
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

    libUtility.download(filename, 'data:text/csv;charset=utf-8,' + encodeURIComponent($.csv.fromArrays(csv)));
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
    description: 'When true, tries to infer other options based on the structure of the dataset (slow).',
    default: false,
    valid: [true, false]
  },

  /** When true, interprets the first row of the dataset as column labels. */
  'hasHeader': {
    description: 'When true, interprets the first row of the dataset as column labels.',
    default: false,
    valid: [true, false]
  },

  /** Index of a column of the dataset that contains data point names. */
  'nameColumn': {
    description: 'Index of a column of the dataset that contains data point names.',
    default: null,
    valid: null
  },

  /** An array of column labels, or a function that takes the column index as input and returns the column label. */
  'columnLabels': {
    description: 'An array of column labels, or a function that takes the column index as input and returns the column label.',
    default: null,
    valid: null
  },

  /** An array of image URLs, or a function that takes a row of data and the row index as input and returns a URL to an image of the data point. */
  'imageFilenames': {
    description: 'An array of image URLs, or a function that takes a row of data and the row index as input and returns a URL to an image of the data point.',
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
      console.warn('CsvDataset warning: Unsupported option: ' + option);
      continue;
    }
    var optionDefinition = CSV_DATASET_OPTIONS[option];

    // Validate value
    var value = options[option];
    if (optionDefinition.valid && optionDefinition.valid.indexOf(value) === -1 || optionDefinition.validRange && (value < optionDefinition.validRange[0] || value > optionDefinition.validRange[1])) {
      console.warn('CsvDataset warning: Invalid value for option ' + option + ': ' + value);
      delete options[option];
      continue;
    }
  }

  // Load csv file
  var dataset = this;
  var parseCsv = function parseCsv(csv) {
    var data = $.csv.toArrays(csv);

    if (options['autoDetect']) {
      if (libUtility.isUndefined(options['hasHeader'])) {
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
        console.log('Assuming hasHeader = ' + options['hasHeader']);
      }
      if (libUtility.isUndefined(options['nameColumn'])) {
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
        console.log('Assuming nameColumn = ' + options['nameColumn']);
      }
    }

    var n = data.length,
        nc = data[0].length - (options['nameColumn'] ? 1 : 0),
        firstRow = options['hasHeader'] ? 1 : 0;
    dataset['numColumns'] = dataset.numColumns = nc;

    // Generate column labels
    var columnLabels;
    if (libUtility.isFunction(options['columnLabels'])) {
      columnLabels = new Array(n);
      for (var c = 0, ci = 0; c < data[0].length; ++c, ++ci) {
        if (c == options['nameColumn']) {
          --ci;
          continue;
        }

        columnLabels[ci] = options['columnLabels'](c);
      }
    } else if (libUtility.isArray(options['columnLabels'])) {
      if (options['columnLabels'].length !== nc) {
        console.warn('CsvDataset warning: Number of provided column labels (' + options['columnLabels'].length + ') differs from number of data columns in the dataset (' + nc + ')');
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
        if (data[i].length === 1 && data[i][0] === '') {
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
          if (data[i].length === 1 && data[i][0] === '') {
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

    if (di !== n) {
      // If some line were blank
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
        if (data[i].length === 1 && data[i][0] === '') {
          --di;
          continue;
        }

        names[di] = data[i][nameColumn];
      }
    } else dataset['names'] = dataset.names = null;

    // Generate image filenames
    if (libUtility.isFunction(options['imageFilenames'])) {
      dataset['imageFilenames'] = dataset.imageFilenames = new Array(n);
      for (i = firstRow, di = 0; i < data.length; ++i, ++di) {
        // Skip blank lines
        if (data[i].length === 1 && data[i][0] === '') {
          --di;
          continue;
        }

        dataset.imageFilenames[di] = options['imageFilenames'](data[i], i);
      }
    } else if (libUtility.isArray(options['imageFilenames'])) {
      if (options['imageFilenames'].length !== n) {
        console.warn('CsvDataset warning: Number of provided image filenames (' + options['imageFilenames'].length + ') differs from number of data points (' + n + ')');
        dataset['imageFilenames'] = dataset.imageFilenames = null;
      } else dataset['imageFilenames'] = dataset.imageFilenames = options['imageFilenames'];
    } else dataset['imageFilenames'] = dataset.imageFilenames = null;

    // Notify success
    if (onload) onload(dataset);
  };

  if (libUtility.isString(file)) {
    //$.get(file, parseCsv, "text");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) parseCsv(this.responseText);
    };
    request.open('GET', /** @type {string} */file, true);
    request.overrideMimeType('text/csv; charset=utf8');
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

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormulaCompiler", function() { return FormulaCompiler; });
var libUtility = __webpack_require__(0);

var FormulaCompiler = {
  compile: function compile(formula, symbolTypes) {
    /*// Parse case-insensitive
    formula = formula.toLowerCase();*/

    // Error handler
    var err = null;
    function error(msg) {
      err = msg;
      return null;
    }

    // >>> Types

    FormulaCompiler.types.vec3.memberTypes = {
      x: FormulaCompiler.types.float,
      y: FormulaCompiler.types.float,
      z: FormulaCompiler.types.float
      /**
       * An enum, mapping function signatures to return types
       * @enum {Object}
       */
    };var functionsReturnTypes = {
      'float = float': FormulaCompiler.types.float,
      'float += float': FormulaCompiler.types.float,
      'float -= float': FormulaCompiler.types.float,
      'float *= float': FormulaCompiler.types.float,
      'float /= float': FormulaCompiler.types.float,
      'float + float': FormulaCompiler.types.float,
      'float - float': FormulaCompiler.types.float,
      'float * float': FormulaCompiler.types.float,
      'float / float': FormulaCompiler.types.float,

      'vec3(float, float, float)': FormulaCompiler.types.vec3,
      'vec3 = vec3': FormulaCompiler.types.vec3,
      'vec3 + vec3': FormulaCompiler.types.vec3,
      'vec3 * float': FormulaCompiler.types.vec3,

      'sin(float)': FormulaCompiler.types.float,
      'cos(float)': FormulaCompiler.types.float,
      'tan(float)': FormulaCompiler.types.float,
      'asin(float)': FormulaCompiler.types.float,
      'acos(float)': FormulaCompiler.types.float,
      'atan(float)': FormulaCompiler.types.float,
      /*'pow': FormulaCompiler.types.float,
      'exp': FormulaCompiler.types.float,
      'log': FormulaCompiler.types.float,
      'exp2': FormulaCompiler.types.float,
      'log2': FormulaCompiler.types.float,
      'sqrt': FormulaCompiler.types.float,
      'inversesqrt': FormulaCompiler.types.float,
      'abs': FormulaCompiler.types.float,
      'sign': FormulaCompiler.types.float,
      'floor': FormulaCompiler.types.float,
      'ceil': FormulaCompiler.types.float,
      'fract': FormulaCompiler.types.float,
      'mod': FormulaCompiler.types.float,*/
      'min(float, float)': FormulaCompiler.types.float,
      'max(float, float)': FormulaCompiler.types.float
      /*'clamp': FormulaCompiler.types.float,
      'mix': FormulaCompiler.types.float,
      'step': FormulaCompiler.types.float,
      'smoothstep': FormulaCompiler.types.float,
      'length': FormulaCompiler.types.float,
      'distance': FormulaCompiler.types.float,
      'dot': FormulaCompiler.types.float,
      'cross': FormulaCompiler.types.float,
      'normalize': FormulaCompiler.types.float,*/


      // >>> Tokenizer

    };var chrPos = 0,
        chr = formula.charAt(0),
        curTok = null,
        curVal;
    function getch() {
      return chr = formula.charAt(++chrPos);
    }
    function getTok() {
      var sign = 1,
          repeat = false;
      do {
        repeat = false;
        switch (chr) {
          case '':
            curTok = null; // End
            return true;
          case '+':
            switch (getch()) {
              case '+':
                getch();curTok = '++';return true;
              case '=':
                getch();curTok = '+=';return true;
              default:
                curTok = '+';return true;
            }
          case '-':
            switch (getch()) {
              case '-':
                getch();curTok = '--';return true;
              case '=':
                getch();curTok = '-=';return true;
              default:
                if (chr >= '0' && chr <= '9') {
                  sign = -1;break;
                } else {
                  curTok = '-';return true;
                }
            }
          case '*':
            switch (getch()) {
              case '=':
                getch();curTok = '*=';return true;
              default:
                curTok = '*';return true;
            }
          case '/':
            switch (getch()) {
              case '=':
                getch();curTok = '/=';return true;
              default:
                curTok = '/';return true;
            }
          case '(':case ')':case ',':case '=':case ';':case '.':
            // Misc. recognized characters
            curTok = chr;
            getch();
            return true;
          case ' ':case '\t':case '\r':case '\n':
            // Ignored characters
            getch();
            repeat = true;
        }
      } while (repeat);

      if (chr >= '0' && chr <= '9') {
        var numberString = chr,
            hasDot = false;
        while (getch() !== '') {
          if (chr >= '0' && chr <= '9') numberString += chr;else if (chr !== '.') break;else if (hasDot) return error('Unexpected character: ' + chr); // More than one '.' inside number string
          else {
              hasDot = true;
              numberString += chr;
            }
        }
        if (hasDot) {
          curTok = 'float';
          curVal = sign * Number.parseFloat(numberString);
        } else {
          curTok = 'int';
          curVal = sign * Number.parseInt(numberString, 10);
        }
        return true;
      }

      if (chr >= 'a' && chr <= 'z' || chr >= 'A' && chr <= 'Z') {
        var str = chr;
        while (getch() !== '') {
          if (chr >= 'a' && chr <= 'z' || chr >= 'A' && chr <= 'Z' || chr >= '0' && chr <= '9' || chr === '_') str += chr;else break;
        }
        curTok = 'identifier';
        curVal = str;
        return true;
      }

      return error('Unexpected character: ' + chr);
    }
    function getOperatorPrecedence(tok) {
      switch (tok) {
        case '=':
          return 10; // lowest
        case '+=':
          return 10;
        case '-=':
          return 10;
        case '*=':
          return 10;
        case '/=':
          return 10;
        case '?':
          return 20;
        case '||':
          return 30;
        case '&&':
          return 40;
        case '==':
          return 50;
        case '<':
          return 60;
        case '>':
          return 60;
        case '+':
          return 70;
        case '-':
          return 70;
        case '*':
          return 80;
        case '/':
          return 80;
        case '%':
          return 80; // highest.
        default:
          return -1; // Not an operator
      }
    }

    // >>> Abstract Syntax Tree builder

    function buildAST() {
      var scope = symbolTypes ? symbolTypes : {};

      function prefixOpAST(op) {
        if (!libUtility.isString(curTok)) return error("Expected variable after prefix operator '" + op + "'");

        return [op, curTok];
      }
      function bineryOpAST(exprPrec, lhs) {
        // If this is a binop, find its precedence.
        while (true) {
          var tokPrec = getOperatorPrecedence(curTok);

          // If this is an operator that binds at least as tightly as the current binop, consume it, otherwise return lhs
          if (tokPrec < exprPrec) return lhs;
          // curTok is an operator

          var binOp = curTok;
          if (!getTok()) return null; // eat binop

          if (binOp != '?') {
            // Parse the expression after the binary operator.
            var rhs = exprAST(tokPrec);
            if (rhs == null) return null;

            // If binOp binds less tightly with rhs than the operator after rhs, let the pending operator take rhs as its lhs.
            var nextPrec = getOperatorPrecedence(curTok);
            if (tokPrec < nextPrec) {
              rhs = bineryOpAST(tokPrec + 1, rhs);
              if (rhs == null) return null;
            }

            // Create operator function signature from operator name and argument FormulaCompiler.types
            var funcSignature = lhs.type.name + ' ' + binOp + ' ' + rhs.type.name;

            // Lookup operator function and return type
            var returnType = functionsReturnTypes[funcSignature];
            if (libUtility.isUndefined(returnType)) return error('Undefined operator ' + binOp + ' on FormulaCompiler.types ' + lhs.type.name + ' and ' + rhs.type.name);

            // Merge lhs/rhs.
            if (tokPrec === 10) {
              // If binOp is '=', '+=' or '-='
              var lastOp = lhs.code.pop();
              if (lastOp !== '@' && lastOp !== '@[]') return error('Cannot assign to non-variable');

              // Store as rhs, lhs, funcSignature
              lhs.type = returnType;
              lhs.code = rhs.code.concat(lhs.code);
              lhs.code.push(funcSignature);
            } else {
              // Store as lhs, rhs, funcSignature
              lhs.type = returnType;
              lhs.code = lhs.code.concat(rhs.code);
              lhs.code.push(funcSignature);
            }
          }
        }
      }
      function identifierAST() {
        var identifier = curVal;
        var variable = [identifier];
        if (!getTok()) return null; // eat identifier

        // Query variable type from scope
        var type = scope[identifier];

        while (curTok === '.') {
          if (!getTok()) return null; // eat '.'

          if (libUtility.isUndefined(type)) return error('Undefined variable: ' + identifier);
          var parentType = type;
          var member = type.members[curVal];
          if (libUtility.isUndefined(member)) return error(parentType.name + ' does not contain a member: ' + curVal);
          type = member.type;

          variable.push('.');
          variable.push(member.index);

          if (!getTok()) return null; // eat identifier
        }

        if (curTok === '(') {
          if (variable.length !== 1) return error('Member functions not suported');
          return functionAST(identifier); // Function call
        }

        if (curTok === 'identifier') {
          if (variable.length !== 1) return error('Hierarchical FormulaCompiler.types not suported');
          return varDeclAST(variable, identifier); // Variable declaration
        }

        if (libUtility.isUndefined(type)) return error('Undefined variable: ' + identifier);

        variable.push(type === FormulaCompiler.types.float ? '@' : '@[]');
        return { code: variable, type: type }; // Variable reference
      }
      function identifierAndPostAST() {
        var identifier = identifierAST();
        if (!identifier) return null;

        return identifier;
      }
      function numberAST() {
        var number = curVal;
        if (!getTok()) return null; // Eat number
        return { code: [number], type: FormulaCompiler.types.float };
      }
      function varDeclAST(type, typeName) {
        type = FormulaCompiler.types[typeName];
        if (libUtility.isUndefined(type)) return error('Unsupported type: ' + typeName);

        // Update scope
        var prev = scope[curVal];
        if (!libUtility.isUndefined(prev)) return error('Redefinition of variable: ' + curVal);
        scope[curVal] = type; // Store variable type in scope

        var variable = [curVal];
        if (!getTok()) return null; // eat identifier

        /*var decl = [type].concat(variable);
        decl.push('#');
        return { code: decl, type: type };*/
        variable.push(type === FormulaCompiler.types.float ? '@' : '@[]');
        return { code: variable, type: type };
      }
      function functionAST(funcName) {
        if (!getTok()) return null; // Eat '('

        var args = listAST(')');
        if (!args) return null;
        var numArgs = args.type.length;

        // Create function signature from function name and argument FormulaCompiler.types
        var argTypeNames = args.type.map(function (type) {
          return type.name;
        }).join(', ');
        var funcSignature = funcName + '(' + argTypeNames + ')';

        // Lookup function and return type
        var returnType = functionsReturnTypes[funcSignature];
        if (libUtility.isUndefined(returnType)) return error('Undefined function ' + funcSignature);

        // Store as args, funcSignature
        var funcCode = args.code;
        funcCode.push(funcSignature);
        return { code: funcCode, type: returnType };
      }
      function listAST(termTok) {
        if (curTok === termTok) {
          if (!getTok()) return null; // Eat termTok
          return [0]; // List of length 0
        }

        var code = [],
            typeList = [],
            len = 1;
        while (true) {
          var expr = exprAST();
          if (!expr) return null;
          code = code.concat(expr.code);
          typeList.push(expr.type);

          if (curTok === termTok) break;else if (curTok !== ',') return error("Expected ',' or '" + termTok + "' after list element");
          if (!getTok()) return null; // Eat ','
          ++len;
        }
        if (!getTok()) return null; // Eat termTok
        return { code: code, type: typeList };
      }
      function primaryAST() {
        switch (curTok) {
          case 'identifier':
            return identifierAndPostAST();
          case 'float':case 'int':
            return numberAST();
          default:
            return error("unknown token '{0}' when expecting an expression".format(curTok));
          /*case (int)Lexer.Token.tok_int: return ParseIntExpr();
          case (int)Lexer.Token.tok_float: return ParseFloatExpr();
          case (int)Lexer.Token.tok_string: return ParseStringExpr();
          case (int)Lexer.Token.tok_bool: return ParseBooleanExpr();
          case '(': return ParseParenExpr();
          case '[': return ParseArrayExpr('[', ']');
          case (int)Lexer.Token.tok_return: return ParseReturnExpr();
          case (int)Lexer.Token.tok_new: return ParseNewExpr();
          case (int)Lexer.Token.tok_pp:
            Position ppBegin = getTokenStartPosition();
            if (!getTok()) return null; // eat '++'
            VAR = ParseIdentifierExpr();
            if (VAR == null) return null;
            if (!(VAR is VariableExprAST || VAR is IndexExprAST)) return Error("Expected variable after prefix increment operator");
            return new PrefixIncrementExprAST(new Segment(ppBegin, VAR.source.end), VAR);
          case (int)Lexer.Token.tok_mm:
            Position mmBegin = getTokenStartPosition();
            if (!getTok()) return null; // eat '--'
            VAR = ParseIdentifierExpr();
            if (VAR == null) return null;
            if (!(VAR is VariableExprAST || VAR is IndexExprAST)) return Error("Expected variable after prefix decrement operator");
            return new PrefixDecrementExprAST(new Segment(mmBegin, VAR.source.end), VAR);*/
        }
      }
      /**
       * @param  {number=} exprPrec=0
       */
      function exprAST(exprPrec) {
        if (libUtility.isUndefined(exprPrec)) exprPrec = 0;

        var lhs = primaryAST();
        if (!lhs) return null;
        return bineryOpAST(exprPrec, lhs);
      }
      function topLevelAST() {
        var code = [];
        if (!getTok()) return null; // Get first token
        while (curTok !== null) {
          var lhs = primaryAST();
          if (!lhs) return null;

          var binOp = bineryOpAST(0, lhs);
          if (!binOp) return null;

          if (curTok !== ';') return error("Missing ';' after expression");
          if (!getTok()) return null; // Eat ';'

          code = code.concat(binOp.code);
          code.push(';'); // Clear operation
        }

        if (code.length !== 0) code.pop(); // Don't clear after last operation. Result of last operation is return value

        return code;
      }

      var expr = topLevelAST();
      return expr ? expr : err;
    }

    return buildAST();
  },
  run: function run(code, stack, global) {
    var IP = -1; // Instruction pointer
    var SP = 0; // Stack pointer
    var scope = global;

    var postOpScope;
    while (++IP < code.length) {
      postOpScope = global; // By default, reset scope after operation
      switch (code[IP]) {
        case 'float = float':
          scope[stack[--SP]] = stack[SP - 1];break;
        case 'float += float':
          scope[stack[--SP]] += stack[--SP];break;
        case 'float -= float':
          scope[stack[--SP]] -= stack[--SP];break;
        case 'float *= float':
          scope[stack[--SP]] *= stack[--SP];break;
        case 'float /= float':
          scope[stack[--SP]] /= stack[--SP];break;
        case 'float + float':
          stack[SP - 2] += stack[--SP];break;
        case 'float * float':
          stack[SP - 2] *= stack[--SP];break;
        case 'float / float':
          stack[SP - 2] /= stack[--SP];break;

        case 'sin(float)':
          stack[SP - 1] = Math.sin(stack[SP - 1]);break;
        case 'cos(float)':
          stack[SP - 1] = Math.cos(stack[SP - 1]);break;
        case 'tan(float)':
          stack[SP - 1] = Math.tan(stack[SP - 1]);break;
        case 'asin(float)':
          stack[SP - 1] = Math.asin(stack[SP - 1]);break;
        case 'acos(float)':
          stack[SP - 1] = Math.acos(stack[SP - 1]);break;
        case 'atan(float)':
          stack[SP - 1] = Math.atan(stack[SP - 1]);break;
        /*case 'pow': FormulaCompiler.types.float,
        case 'exp': FormulaCompiler.types.float,
        case 'log': FormulaCompiler.types.float,
        case 'exp2': FormulaCompiler.types.float,
        case 'log2': FormulaCompiler.types.float,
        case 'sqrt': FormulaCompiler.types.float,
        case 'inversesqrt': FormulaCompiler.types.float,
        case 'abs': FormulaCompiler.types.float,
        case 'sign': FormulaCompiler.types.float,
        case 'floor': FormulaCompiler.types.float,
        case 'ceil': FormulaCompiler.types.float,
        case 'fract': FormulaCompiler.types.float,
        case 'mod': FormulaCompiler.types.float,*/
        case 'min(float, float)':
          stack[SP - 2] = Math.min(stack[SP - 2], stack[--SP]);break;
        case 'max(float, float)':
          stack[SP - 2] = Math.max(stack[SP - 2], stack[--SP]);break;
        /*case 'clamp': FormulaCompiler.types.float,
        case 'mix': FormulaCompiler.types.float,
        case 'step': FormulaCompiler.types.float,
        case 'smoothstep': FormulaCompiler.types.float,
        case 'length': FormulaCompiler.types.float,
        case 'distance': FormulaCompiler.types.float,
        case 'dot': FormulaCompiler.types.float,
        case 'cross': FormulaCompiler.types.float,
        case 'normalize': FormulaCompiler.types.float,*/

        case 'vec3(float, float, float)':
          /*Nothing to do*/break;
        case 'vec3 = vec3':
          scope[stack[--SP]] = [stack[SP - 3], stack[SP - 2], stack[SP - 1]];break;
        case 'vec3 + vec3':
          stack[SP - 6] += stack[SP - 3];stack[SP - 5] += stack[SP - 2];stack[SP - 4] += stack[SP - 1];SP -= 3;break;
        case 'vec3 * float':
          var f = stack[--SP];stack[SP - 3] *= f;stack[SP - 2] *= f;stack[SP - 1] *= f;break;

        case '@':
          stack[SP - 1] = scope[stack[SP - 1]];break; // Load scalar from scope
        case '@[]':
          // Load array from scope
          var variable = scope[stack[--SP]];
          for (var i = 0; i < variable.length; ++i) {
            stack[SP++] = variable[i];
          }break;
        case '.':
          scope = scope[stack[--SP]]; // Dereference member
          postOpScope = scope; // Don't reset scope after operation
          break;
        case ';':
          SP = 0;break;

        default:
          stack[SP++] = code[IP];
          postOpScope = scope; // Don't reset scope after operation
      }
      scope = postOpScope;
    }
    return SP === 0 ? null : SP === 1 ? stack[0] : stack.slice(0, SP);
  }
};
FormulaCompiler.types = {
  float: { name: 'float' },
  vec3: { name: 'vec3' }
};
FormulaCompiler.types.vec3.members = {
  x: { index: 0, type: FormulaCompiler.types.float },
  y: { index: 1, type: FormulaCompiler.types.float },
  z: { index: 2, type: FormulaCompiler.types.float }
};

function verboseTest(formula, symbols, symbolTypes) {
  var code = FormulaCompiler.compile(formula, symbolTypes ? symbolTypes : {});

  console.log('formula: ' + formula);
  if (libUtility.isString(code)) console.log('err: ' + code);else {
    var globalScope = symbols ? symbols : {};
    console.log('code: ' + code.map(function (c) {
      return libUtility.isString(c) ? '"' + c + '"' : c;
    }).join(' '));
    console.log('result: ' + FormulaCompiler.run(code, new Array(16), globalScope));
    console.log('locals: ' + JSON.stringify(globalScope));
  }
}

function verify(formula, result) {
  var code = FormulaCompiler.compile(formula);
  if (libUtility.isString(code)) console.log("Formula '{0}' failed with error '{1}'".format(formula, code));else {
    var computedResult = FormulaCompiler.run(code, new Array(16), {});

    var match;
    if (libUtility.isArray(result) && libUtility.isArray(computedResult) && result.length === computedResult.length) {
      match = true;
      for (var i = 0; i < result.length; ++i) {
        if (computedResult[i] !== result[i]) {
          match = false;
          break;
        }
      }
    } else match = computedResult === result;

    if (!match) console.log("Formula '{0}' returned '{1}', instead of '{2}'".format(formula, computedResult, result));
  }
  return true;
}

function benchmark(nIter, javascriptCode, formulaCode, evalCode) {
  var sum, tStart;

  sum = 0.0;
  tStart = performance.now();
  for (var i = 0; i < nIter; ++i) {
    sum += javascriptCode();
  }console.log(sum);
  console.log(performance.now() - tStart + 'ms');

  sum = 0.0;
  tStart = performance.now();
  var code = FormulaCompiler.compile(formulaCode);
  var stack = new Array(16);
  for (var i = 0; i < nIter; ++i) {
    sum += FormulaCompiler.run(code, stack, {});
  }console.log(sum);
  console.log(performance.now() - tStart + 'ms');

  sum = 0.0;
  tStart = performance.now();
  for (var i = 0; i < nIter; ++i) {
    sum += eval(evalCode);
  }console.log(sum);
  console.log(performance.now() - tStart + 'ms');
}

/*benchmark(1000000, function() {
  var a = 3;
  var b = 4;
  return a * b / 2;
}, `
  float a = 3;
  float b = 4;
  a * b / 2;
`, `
  var a = 3;
  var b = 4;
  a * b / 2;
`);*/

/*benchmark(10000, function() {
  var v = [4, 5, 6];
  return v[1];
}, `
  vec3 v = vec3(4, 5, 6);
  v.y;
`, `
  var v = [4, 5, 6];
  v[1];
`);*/

//verboseTest("vec3 a = vec3(1, 2, 3);");

/*verify("1 + 6 * 2;", 13);
verify("max(1, 2);", 2);
verify("max(1 + 6, 2 * 3);", 7);
verify("float a = 123; a += 5; a;", 128);
verify("float a = max(3 + 3, 5); a;", 6);
verify("vec3 a = vec3(1, 2, 3); a.y;", 2);
verify("vec3 a = vec3(1, 2, 3); a.y *= 3; a;", [1, 6, 3]);
verify("vec3 a = vec3(1, 2, 3); a = a * 3; a;", [3, 6, 9]);
verify(`
  vec3 a = vec3(5, 5, 5);
  vec3 b = vec3(1, 2, 3);
  vec3 c = a + b;
  c;
`, [6, 7, 8]);
verify(`
  vec3 a = vec3(0, 1, 2);
  a.x = a.y;
  a;
`, [1, 1, 2]);
verify(`
  float a = 3;
  float b = 4;
  a * b / 2;
`, 6);

verboseTest("i;", {i: 123.5}, {i: FormulaCompiler.types.float});*/

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, __dirname) {﻿(function () {
	var isCommonJS = typeof module !== 'undefined' && module.exports;
	var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';
	var setImmediate = setImmediate || function (cb) {
		setTimeout(cb, 0);
	};
	var Worker = isNode ? __webpack_require__(29) : self.Worker;
	var URL = typeof self !== 'undefined' ? (self.URL ? self.URL : self.webkitURL) : null;
	var _supports = (isNode || self.Worker) ? true : false; // node always supports parallel

	function extend(from, to) {
		if (!to) to = {};
		for (var i in from) {
			if (to[i] === undefined) to[i] = from[i];
		}
		return to;
	}

	function Operation() {
		this._callbacks = [];
		this._errCallbacks = [];

		this._resolved = 0;
		this._result = null;
	}

	Operation.prototype.resolve = function (err, res) {
		if (!err) {
			this._resolved = 1;
			this._result = res;

			for (var i = 0; i < this._callbacks.length; ++i) {
				this._callbacks[i](res);
			}
		} else {
			this._resolved = 2;
			this._result = err;

			for (var iE = 0; iE < this._errCallbacks.length; ++iE) {
				this._errCallbacks[iE](res);
			}
		}

		this._callbacks = [];
		this._errCallbacks = [];
	};

	Operation.prototype.then = function (cb, errCb) {
		if (this._resolved === 1) { // result
			if (cb) {
				cb(this._result);
			}

			return;
		} else if (this._resolved === 2) { // error
			if (errCb) {
				errCb(this._result);
			}
			return;
		}

		if (cb) {
			this._callbacks[this._callbacks.length] = cb;
		}

		if (errCb) {
			this._errCallbacks[this._errCallbacks.length] = errCb;
		}
		return this;
	};

	var defaults = {
		evalPath: isNode ? __dirname + '/eval.js' : null,
		maxWorkers: isNode ? __webpack_require__(31).cpus().length : 4,
		synchronous: true
	};

	function Parallel(data, options) {
		this.data = data;
		this.options = extend(defaults, options);
		this.operation = new Operation();
		this.operation.resolve(null, this.data);
		this.requiredScripts = [];
		this.requiredFunctions = [];
	}

	// static method
	Parallel.isSupported=function(){ return _supports; }
	
	Parallel.prototype.getWorkerSource = function (cb) {
		var preStr = '';
		var i = 0;
		if (!isNode && this.requiredScripts.length !== 0) {
			preStr += 'importScripts("' + this.requiredScripts.join('","') + '");\r\n';
		}

		for (i = 0; i < this.requiredFunctions.length; ++i) {
			if (this.requiredFunctions[i].name) {
				preStr += 'var ' + this.requiredFunctions[i].name + ' = ' + this.requiredFunctions[i].fn.toString() + ';';
			} else {
				preStr += this.requiredFunctions[i].fn.toString();
			}
		}

		if (isNode) {
			return preStr + 'process.on("message", function(e) {process.send(JSON.stringify((' + cb.toString() + ')(JSON.parse(e).data)))})';
		} else {
			return preStr + 'self.onmessage = function(e) {self.postMessage((' + cb.toString() + ')(e.data))}';
		}
	};

	Parallel.prototype.require = function () {
		var args = Array.prototype.slice.call(arguments, 0),
			func;

		for (var i = 0; i < args.length; i++) {
			func = args[i];

			if (typeof func === 'string') {
				this.requiredScripts.push(func);
			} else if (typeof func === 'function') {
				this.requiredFunctions.push({ fn: func });
			} else if (typeof func === 'object') {
				this.requiredFunctions.push(func);
			}
		}

		return this;
	};

	Parallel.prototype._spawnWorker = function (cb) {
		var wrk;
		var src = this.getWorkerSource(cb);
		if (isNode) {
			wrk = new Worker(this.options.evalPath);
			wrk.postMessage(src);
		} else {
			if (Worker === undefined) {
				return undefined;
			}

			try {
				if (this.requiredScripts.length !== 0) {
					if (this.options.evalPath !== null) {
						wrk = new Worker(this.options.evalPath);
						wrk.postMessage(src);
					} else {
						throw new Error('Can\'t use required scripts without eval.js!');
					}
				} else if (!URL) {
					throw new Error('Can\'t create a blob URL in this browser!');
				} else {
					var blob = new Blob([src], { type: 'text/javascript' });
					var url = URL.createObjectURL(blob);

					wrk = new Worker(url);
				}
			} catch (e) {
				if (this.options.evalPath !== null) { // blob/url unsupported, cross-origin error
					wrk = new Worker(this.options.evalPath);
					wrk.postMessage(src);
				} else {
					throw e;
				}
			}
		}

		return wrk;
	};

	Parallel.prototype.spawn = function (cb) {
		var that = this;
		var newOp = new Operation();
		this.operation.then(function () {
			var wrk = that._spawnWorker(cb);
			if (wrk !== undefined) {
				wrk.onmessage = function (msg) {
					wrk.terminate();
					that.data = msg.data;
					newOp.resolve(null, that.data);
				};
				wrk.postMessage(that.data);
			} else if (that.options.synchronous) {
				setImmediate(function () {
					that.data = cb(that.data);
					newOp.resolve(null, that.data);
				});
			} else {
				throw new Error('Workers do not exist and synchronous operation not allowed!');
			}
		});
		this.operation = newOp;
		return this;
	};

	Parallel.prototype._spawnMapWorker = function (i, cb, done) {
		var that = this;
		var wrk = that._spawnWorker(cb);
		if (wrk !== undefined) {
			wrk.onmessage = function (msg) {
				wrk.terminate();
				that.data[i] = msg.data;
				done();
			};
			wrk.postMessage(that.data[i]);
		} else if (that.options.synchronous) {
			setImmediate(function () {
				that.data[i] = cb(that.data[i]);
				done();
			});
		} else {
			throw new Error('Workers do not exist and synchronous operation not allowed!');
		}
	};

	Parallel.prototype.map = function (cb) {
		if (!this.data.length) {
			return this.spawn(cb);
		}

		var that = this;
		var startedOps = 0;
		var doneOps = 0;
		function done() {
			if (++doneOps === that.data.length) {
				newOp.resolve(null, that.data);
			} else if (startedOps < that.data.length) {
				that._spawnMapWorker(startedOps++, cb, done);
			}
		}

		var newOp = new Operation();
		this.operation.then(function () {
			for (; startedOps - doneOps < that.options.maxWorkers && startedOps < that.data.length; ++startedOps) {
				that._spawnMapWorker(startedOps, cb, done);
			}
		});
		this.operation = newOp;
		return this;
	};

	Parallel.prototype._spawnReduceWorker = function (data, cb, done) {
		var that = this;
		var wrk = that._spawnWorker(cb);
		if (wrk !== undefined) {
			wrk.onmessage = function (msg) {
				wrk.terminate();
				that.data[that.data.length] = msg.data;
				done();
			};
			wrk.postMessage(data);
		} else if (that.options.synchronous) {
			setImmediate(function () {
				that.data[that.data.length] = cb(data);
				done();
			});
		} else {
			throw new Error('Workers do not exist and synchronous operation not allowed!');
		}
	};

	Parallel.prototype.reduce = function (cb) {
		if (!this.data.length) {
			throw new Error('Can\'t reduce non-array data');
		}

		var runningWorkers = 0;
		var that = this;
		function done(data) {
			--runningWorkers;
			if (that.data.length === 1 && runningWorkers === 0) {
				that.data = that.data[0];
				newOp.resolve(null, that.data);
			} else if (that.data.length > 1) {
				++runningWorkers;
				that._spawnReduceWorker([that.data[0], that.data[1]], cb, done);
				that.data.splice(0, 2);
			}
		}

		var newOp = new Operation();
		this.operation.then(function () {
			if (that.data.length === 1) {
				newOp.resolve(null, that.data[0]);
			} else {
				for (var i = 0; i < that.options.maxWorkers && i < Math.floor(that.data.length / 2); ++i) {
					++runningWorkers;
					that._spawnReduceWorker([that.data[i * 2], that.data[i * 2 + 1]], cb, done);
				}

				that.data.splice(0, i * 2);
			}
		});
		this.operation = newOp;
		return this;
	};

	Parallel.prototype.then = function (cb, errCb) {
		var that = this;
		var newOp = new Operation();
		this.operation.then(function () {
			var retData = cb(that.data);
			if (retData !== undefined) {
				that.data = retData;
			}
			newOp.resolve(null, that.data);
		}, errCb);
		this.operation = newOp;
		return this;
	};

	if (isCommonJS) {
		module.exports = Parallel;
	} else {
		self.Parallel = Parallel;
	}
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28), "/"))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

﻿var ps = __webpack_require__(30);

function Worker(url) {
	var that = this;
	this.process = ps.fork(url);
	this.process.on('message', function (msg) {
		if (that.onmessage) {
			that.onmessage({ data: JSON.parse(msg) });
		}
	});
	this.process.on('error', function (err) {
		if (that.onerror) {
			that.onerror(err);
		}
	});
}

Worker.prototype.onmessage = null;
Worker.prototype.onerror = null;

Worker.prototype.postMessage = function (obj) {
	this.process.send(JSON.stringify({ data: obj }));
};

Worker.prototype.terminate = function () {
	this.process.kill();
};

module.exports = Worker;

/***/ }),
/* 30 */
/***/ (function(module, exports) {



/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * jQuery-csv (jQuery Plugin)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Acknowledgements:
 * The original design and influence to implement this library as a jquery
 * plugin is influenced by jquery-json (http://code.google.com/p/jquery-json/).
 * If you're looking to use native JSON.Stringify but want additional backwards
 * compatibility for browsers that don't support it, I highly recommend you
 * check it out.
 *
 * A special thanks goes out to rwk@acm.org for providing a lot of valuable
 * feedback to the project including the core for the new FSM
 * (Finite State Machine) parsers. If you're looking for a stable TSV parser
 * be sure to take a look at jquery-tsv (http://code.google.com/p/jquery-tsv/).

 * For legal purposes I'll include the "NO WARRANTY EXPRESSED OR IMPLIED.
 * USE AT YOUR OWN RISK.". Which, in 'layman's terms' means, by using this
 * library you are accepting responsibility if it breaks your code.
 *
 * Legal jargon aside, I will do my best to provide a useful and stable core
 * that can effectively be built on.
 *
 * Copyrighted 2012 by Evan Plaice.
 */

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

(function (undefined) {
  'use strict';

  var $;

  // to keep backwards compatibility
  if (typeof jQuery !== 'undefined' && jQuery) {
    $ = jQuery;
  } else {
    $ = {};
  }


  /**
   * jQuery.csv.defaults
   * Encapsulates the method paramater defaults for the CSV plugin module.
   */

  $.csv = {
    defaults: {
      separator:',',
      delimiter:'"',
      headers:true
    },

    hooks: {
      castToScalar: function(value, state) {
        var hasDot = /\./;
        if (isNaN(value)) {
          return value;
        } else {
          if (hasDot.test(value)) {
            return parseFloat(value);
          } else {
            var integer = parseInt(value);
            if(isNaN(integer)) {
              return null;
            } else {
              return integer;
            }
          }
        }
      }
    },

    parsers: {
      parse: function(csv, options) {
        // cache settings
        var separator = options.separator;
        var delimiter = options.delimiter;

        // set initial state if it's missing
        if(!options.state.rowNum) {
          options.state.rowNum = 1;
        }
        if(!options.state.colNum) {
          options.state.colNum = 1;
        }

        // clear initial state
        var data = [];
        var entry = [];
        var state = 0;
        var value = '';
        var exit = false;

        function endOfEntry() {
          // reset the state
          state = 0;
          value = '';

          // if 'start' hasn't been met, don't output
          if(options.start && options.state.rowNum < options.start) {
            // update global state
            entry = [];
            options.state.rowNum++;
            options.state.colNum = 1;
            return;
          }
          
          if(options.onParseEntry === undefined) {
            // onParseEntry hook not set
            data.push(entry);
          } else {
            var hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
            // false skips the row, configurable through a hook
            if(hookVal !== false) {
              data.push(hookVal);
            }
          }
          //console.log('entry:' + entry);
          
          // cleanup
          entry = [];

          // if 'end' is met, stop parsing
          if(options.end && options.state.rowNum >= options.end) {
            exit = true;
          }
          
          // update global state
          options.state.rowNum++;
          options.state.colNum = 1;
        }

        function endOfValue() {
          if(options.onParseValue === undefined) {
            // onParseValue hook not set
            entry.push(value);
          } else {
            var hook = options.onParseValue(value, options.state); // onParseValue Hook
            // false skips the row, configurable through a hook
            if(hook !== false) {
              entry.push(hook);
            }
          }
          //console.log('value:' + value);
          // reset the state
          value = '';
          state = 0;
          // update global state
          options.state.colNum++;
        }

        // escape regex-specific control chars
        var escSeparator = RegExp.escape(separator);
        var escDelimiter = RegExp.escape(delimiter);

        // compile the regEx str using the custom delimiter/separator
        var match = /(D|S|\r\n|\n|\r|[^DS\r\n]+)/;
        var matchSrc = match.source;
        matchSrc = matchSrc.replace(/S/g, escSeparator);
        matchSrc = matchSrc.replace(/D/g, escDelimiter);
        match = new RegExp(matchSrc, 'gm');

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(match, function (m0) {
          if(exit) {
            return;
          }
          switch (state) {
            // the start of a value
            case 0:
              // null last value
              if (m0 === separator) {
                value += '';
                endOfValue();
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                state = 1;
                break;
              }
              // null last value
              if (/^(\r\n|\n|\r)$/.test(m0)) {
                endOfValue();
                endOfEntry();
                break;
              }
              // un-delimited value
              value += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                state = 2;
                break;
              }
              // delimited data
              value += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              if (m0 === delimiter) {
                value += m0;
                state = 1;
                break;
              }
              // null value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // end of entry
              if (/^(\r\n|\n|\r)$/.test(m0)) {
                endOfValue();
                endOfEntry();
                break;
              }
              // broken paser?
              throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');

            // un-delimited input
            case 3:
              // null last value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // end of entry
              if (/^(\r\n|\n|\r)$/.test(m0)) {
                endOfValue();
                endOfEntry();
                break;
              }
              if (m0 === delimiter) {
              // non-compliant data
                throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              }
              // broken parser?
              throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
            default:
              // shenanigans
              throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
          }
          //console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last entry
        // ignore null last line
        if(entry.length !== 0) {
          endOfValue();
          endOfEntry();
        }

        return data;
      },

      // a csv-specific line splitter
      splitLines: function(csv, options) {
        // cache settings
        var separator = options.separator;
        var delimiter = options.delimiter;

        // set initial state if it's missing
        if(!options.state.rowNum) {
          options.state.rowNum = 1;
        }

        // clear initial state
        var entries = [];
        var state = 0;
        var entry = '';
        var exit = false;

        function endOfLine() {          
          // reset the state
          state = 0;
          
          // if 'start' hasn't been met, don't output
          if(options.start && options.state.rowNum < options.start) {
            // update global state
            entry = '';
            options.state.rowNum++;
            return;
          }
          
          if(options.onParseEntry === undefined) {
            // onParseEntry hook not set
            entries.push(entry);
          } else {
            var hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
            // false skips the row, configurable through a hook
            if(hookVal !== false) {
              entries.push(hookVal);
            }
          }

          // cleanup
          entry = '';

          // if 'end' is met, stop parsing
          if(options.end && options.state.rowNum >= options.end) {
            exit = true;
          }
          
          // update global state
          options.state.rowNum++;
        }

        // escape regex-specific control chars
        var escSeparator = RegExp.escape(separator);
        var escDelimiter = RegExp.escape(delimiter);

        // compile the regEx str using the custom delimiter/separator
        var match = /(D|S|\n|\r|[^DS\r\n]+)/;
        var matchSrc = match.source;
        matchSrc = matchSrc.replace(/S/g, escSeparator);
        matchSrc = matchSrc.replace(/D/g, escDelimiter);
        match = new RegExp(matchSrc, 'gm');

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(match, function (m0) {
          if(exit) {
            return;
          }
          switch (state) {
            // the start of a value/entry
            case 0:
              // null value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                entry += m0;
                state = 1;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (/^\r$/.test(m0)) {
                break;
              }
              // un-delimit value
              entry += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                entry += m0;
                state = 2;
                break;
              }
              // delimited data
              entry += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              var prevChar = entry.substr(entry.length - 1);
              if (m0 === delimiter && prevChar === delimiter) {
                entry += m0;
                state = 1;
                break;
              }
              // end of value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (m0 === '\r') {
                break;
              }
              // broken paser?
              throw new Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');

            // un-delimited input
            case 3:
              // null value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (m0 === '\r') {
                break;
              }
              // non-compliant data
              if (m0 === delimiter) {
                throw new Error('CSVDataError: Illegal quote [Row:' + options.state.rowNum + ']');
              }
              // broken parser?
              throw new Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');
            default:
              // shenanigans
              throw new Error('CSVDataError: Unknown state [Row:' + options.state.rowNum + ']');
          }
          //console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last entry
        // ignore null last line
        if(entry !== '') {
          endOfLine();
        }

        return entries;
      },

      // a csv entry parser
      parseEntry: function(csv, options) {
        // cache settings
        var separator = options.separator;
        var delimiter = options.delimiter;
        
        // set initial state if it's missing
        if(!options.state.rowNum) {
          options.state.rowNum = 1;
        }
        if(!options.state.colNum) {
          options.state.colNum = 1;
        }

        // clear initial state
        var entry = [];
        var state = 0;
        var value = '';

        function endOfValue() {
          if(options.onParseValue === undefined) {
            // onParseValue hook not set
            entry.push(value);
          } else {
            var hook = options.onParseValue(value, options.state); // onParseValue Hook
            // false skips the value, configurable through a hook
            if(hook !== false) {
              entry.push(hook);
            }
          }
          // reset the state
          value = '';
          state = 0;
          // update global state
          options.state.colNum++;
        }

        // checked for a cached regEx first
        if(!options.match) {
          // escape regex-specific control chars
          var escSeparator = RegExp.escape(separator);
          var escDelimiter = RegExp.escape(delimiter);
          
          // compile the regEx str using the custom delimiter/separator
          var match = /(D|S|\n|\r|[^DS\r\n]+)/;
          var matchSrc = match.source;
          matchSrc = matchSrc.replace(/S/g, escSeparator);
          matchSrc = matchSrc.replace(/D/g, escDelimiter);
          options.match = new RegExp(matchSrc, 'gm');
        }

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(options.match, function (m0) {
          switch (state) {
            // the start of a value
            case 0:
              // null last value
              if (m0 === separator) {
                value += '';
                endOfValue();
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                state = 1;
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // un-delimited value
              value += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                state = 2;
                break;
              }
              // delimited data
              value += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              if (m0 === delimiter) {
                value += m0;
                state = 1;
                break;
              }
              // null value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // broken paser?
              throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');

            // un-delimited input
            case 3:
              // null last value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // non-compliant data
              if (m0 === delimiter) {
                throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              }
              // broken parser?
              throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
            default:
              // shenanigans
              throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
          }
          //console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last value
        endOfValue();

        return entry;
      }
    },

    helpers: {

      /**
       * $.csv.helpers.collectPropertyNames(objectsArray)
       * Collects all unique property names from all passed objects.
       *
       * @param {Array} objects Objects to collect properties from.
       *
       * Returns an array of property names (array will be empty,
       * if objects have no own properties).
       */
      collectPropertyNames: function (objects) {

        var o, propName, props = [];
        for (o in objects) {
          for (propName in objects[o]) {
            if ((objects[o].hasOwnProperty(propName)) &&
                (props.indexOf(propName) < 0) && 
                (typeof objects[o][propName] !== 'function')) {

              props.push(propName);
            }
          }
        }
        return props;
      }
    },

    /**
     * $.csv.toArray(csv)
     * Converts a CSV entry string to a javascript array.
     *
     * @param {Array} csv The string containing the CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method deals with simple CSV strings only. It's useful if you only
     * need to parse a single entry. If you need to parse more than one line,
     * use $.csv2Array instead.
     */
    toArray: function(csv, options, callback) {
      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      var state = (options.state !== undefined ? options.state : {});

      // setup
      options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        state: state
      };

      var entry = $.csv.parsers.parseEntry(csv, options);

      // push the value to a callback if one is defined
      if(!config.callback) {
        return entry;
      } else {
        config.callback('', entry);
      }
    },

    /**
     * $.csv.toArrays(csv)
     * Converts a CSV string to a javascript array.
     *
     * @param {String} csv The string containing the raw CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method deals with multi-line CSV. The breakdown is simple. The first
     * dimension of the array represents the line (or entry/row) while the second
     * dimension contains the values (or values/columns).
     */
    toArrays: function(csv, options, callback) {
      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;

      // setup
      var data = [];
      options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onPreParse: options.onPreParse,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        onPostParse: options.onPostParse,
        start: options.start,
        end: options.end,
        state: {
          rowNum: 1,
          colNum: 1
        }
      };

      // onPreParse hook
      if(options.onPreParse !== undefined) {
        options.onPreParse(csv, options.state);
      }

      // parse the data
      data = $.csv.parsers.parse(csv, options);

      // onPostParse hook
      if(options.onPostParse !== undefined) {
        options.onPostParse(data, options.state);
      }

      // push the value to a callback if one is defined
      if(!config.callback) {
        return data;
      } else {
        config.callback('', data);
      }
    },

    /**
     * $.csv.toObjects(csv)
     * Converts a CSV string to a javascript object.
     * @param {String} csv The string containing the raw CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Boolean} [headers] Indicates whether the data contains a header line. Defaults to true.
     *
     * This method deals with multi-line CSV strings. Where the headers line is
     * used as the key for each value per entry.
     */
    toObjects: function(csv, options, callback) {
      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
      options.start = 'start' in options ? options.start : 1;
      
      // account for headers
      if(config.headers) {
        options.start++;
      }
      if(options.end && config.headers) {
        options.end++;
      }

      // setup
      var lines = [];
      var data = [];

      options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onPreParse: options.onPreParse,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        onPostParse: options.onPostParse,
        start: options.start,
        end: options.end,
        state: {
          rowNum: 1,
          colNum: 1
        },
        match: false,
        transform: options.transform
      };

      // fetch the headers
      var headerOptions = {
        delimiter: config.delimiter,
        separator: config.separator,
        start: 1,
        end: 1,
        state: {
          rowNum:1,
          colNum:1
        }
      };

      // onPreParse hook
      if(options.onPreParse !== undefined) {
        options.onPreParse(csv, options.state);
      }

      // parse the csv
      var headerLine = $.csv.parsers.splitLines(csv, headerOptions);
      var headers = $.csv.toArray(headerLine[0], options);

      // fetch the data
      lines = $.csv.parsers.splitLines(csv, options);

      // reset the state for re-use
      options.state.colNum = 1;
      if(headers){
        options.state.rowNum = 2;
      } else {
        options.state.rowNum = 1;
      }
      
      // convert data to objects
      for(var i=0, len=lines.length; i<len; i++) {
        var entry = $.csv.toArray(lines[i], options);
        var object = {};
        for(var j=0; j <headers.length; j++) {
          object[headers[j]] = entry[j];
        }
        if (options.transform !== undefined) {
          data.push(options.transform.call(undefined, object));
        } else {
          data.push(object);
        }
        
        // update row state
        options.state.rowNum++;
      }

      // onPostParse hook
      if(options.onPostParse !== undefined) {
        options.onPostParse(data, options.state);
      }

      // push the value to a callback if one is defined
      if(!config.callback) {
        return data;
      } else {
        config.callback('', data);
      }
    },

     /**
     * $.csv.fromArrays(arrays)
     * Converts a javascript array to a CSV String.
     *
     * @param {Array} arrays An array containing an array of CSV entries.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method generates a CSV file from an array of arrays (representing entries).
     */
    fromArrays: function(arrays, options, callback) {
      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;

      var output = '',
          line,
          lineValues,
          i, j;

      for (i = 0; i < arrays.length; i++) {
        line = arrays[i];
        lineValues = [];
        for (j = 0; j < line.length; j++) {
          var strValue = (line[j] === undefined || line[j] === null) ? '' : line[j].toString();
          if (strValue.indexOf(config.delimiter) > -1) {
            strValue = strValue.replace(new RegExp(config.delimiter, 'g'), config.delimiter + config.delimiter);
          }

          var escMatcher = '\n|\r|S|D';
          escMatcher = escMatcher.replace('S', config.separator);
          escMatcher = escMatcher.replace('D', config.delimiter);

          if (strValue.search(escMatcher) > -1) {
            strValue = config.delimiter + strValue + config.delimiter;
          }
          lineValues.push(strValue);
        }
        output += lineValues.join(config.separator) + '\r\n';
      }

      // push the value to a callback if one is defined
      if(!config.callback) {
        return output;
      } else {
        config.callback('', output);
      }
    },

    /**
     * $.csv.fromObjects(objects)
     * Converts a javascript dictionary to a CSV string.
     *
     * @param {Object} objects An array of objects containing the data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Character} [sortOrder] Sort order of columns (named after
     *   object properties). Use 'alpha' for alphabetic. Default is 'declare',
     *   which means, that properties will _probably_ appear in order they were
     *   declared for the object. But without any guarantee.
     * @param {Character or Array} [manualOrder] Manually order columns. May be
     * a strin in a same csv format as an output or an array of header names
     * (array items won't be parsed). All the properties, not present in
     * `manualOrder` will be appended to the end in accordance with `sortOrder`
     * option. So the `manualOrder` always takes preference, if present.
     *
     * This method generates a CSV file from an array of objects (name:value pairs).
     * It starts by detecting the headers and adding them as the first line of
     * the CSV file, followed by a structured dump of the data.
     */
    fromObjects: function(objects, options, callback) {
      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
      config.sortOrder = 'sortOrder' in options ? options.sortOrder : 'declare';
      config.manualOrder = 'manualOrder' in options ? options.manualOrder : [];
      config.transform = options.transform;

      if (typeof config.manualOrder === 'string') {
        config.manualOrder = $.csv.toArray(config.manualOrder, config);
      }

      if (config.transform !== undefined) {
        var origObjects = objects;
        objects = [];

        var i;
        for (i = 0; i < origObjects.length; i++) {
          objects.push(config.transform.call(undefined, origObjects[i]));
        }
      }

      var props = $.csv.helpers.collectPropertyNames(objects);

      if (config.sortOrder === 'alpha') {
        props.sort();
      } // else {} - nothing to do for 'declare' order

      if (config.manualOrder.length > 0) {

        var propsManual = [].concat(config.manualOrder);
        var p;
        for (p = 0; p < props.length; p++) {
          if (propsManual.indexOf( props[p] ) < 0) {
            propsManual.push( props[p] );
          }
        }
        props = propsManual;
      }

      var o, p, line, output = [], propName;
      if (config.headers) {
        output.push(props);
      }

      for (o = 0; o < objects.length; o++) {
        line = [];
        for (p = 0; p < props.length; p++) {
          propName = props[p];
          if (propName in objects[o] && typeof objects[o][propName] !== 'function') {
            line.push(objects[o][propName]);
          } else {
            line.push('');
          }
        }
        output.push(line);
      }

      // push the value to a callback if one is defined
      return $.csv.fromArrays(output, options, config.callback);
    }
  };

  // Maintenance code to maintain backward-compatibility
  // Will be removed in release 1.0
  $.csvEntry2Array = $.csv.toArray;
  $.csv2Array = $.csv.toArrays;
  $.csv2Dictionary = $.csv.toObjects;

  // CommonJS module is defined
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = $.csv;
  }

}).call( this );


/***/ })
/******/ ]);
});