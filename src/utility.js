const enableConsole = true;
const enableAlert = true;

export function consoleLog(message) {
  if (enableConsole) {
    console.log(message); // eslint-disable-line no-console
  }
}

export function consoleWarn(message) {
  if (enableConsole) {
    console.warn(message); // eslint-disable-line no-console
  }
}

export function consoleError(message) {
  if (enableConsole) {
    console.error(message); // eslint-disable-line no-console
  }
}

export function showAlert(message) {
  if (enableAlert) {
    alert(message); // eslint-disable-line no-alert
  }
}

export function linspace(first, second, last) {
  const offset = second - first;
  const halfOffset = 0.5 * offset;
  const values = [first];
  let i = 0;
  while (values[i] + halfOffset < last) {
    i += 1;
    values.push(first + (i * offset));
  }
  values[i] = last;
  consoleLog(values);
  return new Float32Array(values);
}
// linspace(1, 1.1, 10);

export function isUndefined(x) {
  return typeof x === 'undefined';
}

export function isFunction(x) {
  return typeof x === 'function';
}

export function isArray(x) {
  return Object.prototype.toString.call(x) === '[object Array]';
}

export function isString(x) {
  return typeof x === 'string';
}

export function isNumber(x) {
  return typeof x === 'number';
}

export function isObject(x) {
  const t = typeof x;
  return t !== 'undefined' &&
    t !== 'function' &&
    t !== 'string' &&
    t !== 'number' &&
    Object.prototype.toString.call(x) !== '[object Array]';
}
export function isCloneable(x) {
  return !(isFunction(x) || x instanceof WebGLTexture); // TODO: Add more
}

const enableDebugLog = true;
export function debugLog(x) {
  // TODO: disable for release
  if (enableDebugLog) {
    consoleLog(x);
  }
}

Array.create = function (n, func) {
  const array = new Array(n);
  if (isFunction(func)) {
    for (let i = 0; i < n; i += 1) {
      array[i] = func(i);
    }
  } else {
    array.fill(func);
  }
  return array;
};
Array.prototype.minIndex = function () { // eslint-disable-line no-extend-native
  return this.reduce((smallestIndex, currentValue, currentIndex, arr) =>
    (currentValue < arr[smallestIndex] ? currentIndex : smallestIndex), 0);
};
Array.prototype.maxIndex = function () { // eslint-disable-line no-extend-native
  return this.reduce((smallestIndex, currentValue, currentIndex, arr) =>
    (currentValue > arr[smallestIndex] ? currentIndex : smallestIndex), 0);
};

if (!String.prototype.format) {
  /**
   * Source: http://stackoverflow.com/a/4673436
   * @param {...*} args
   */
  // eslint-disable-next-line no-extend-native, no-unused-vars
  String.prototype.format = function (args) {
    const varArgs = arguments; // eslint-disable-line prefer-rest-params
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof varArgs[number] !== 'undefined' ? varArgs[number] : match;
    });
  };
}
/**
   * Source: http://stackoverflow.com/a/4673436
   * @param {RegExp} pattern
   * @param {string} mismatch
   * @param {...*} args
   */
// eslint-disable-next-line no-extend-native, no-unused-vars
String.prototype.format2 = function (pattern, mismatch, args) {
  const varArgs = arguments; // eslint-disable-line prefer-rest-params
  return this.replace(pattern, function (match, strNumber) {
    const number = Number.parseInt(strNumber, 10) + 2;
    return typeof varArgs[number] !== 'undefined' ? varArgs[number] : mismatch;
  });
};


export function makeCloneable(obj) {
  if (!isObject(obj)) { // If obj isn't an object
    return obj;
  } // Return obj as is

  // Check all properties of obj
  for (let prop in obj) {
    if (!isCloneable(obj[prop])) {
    // If obj has at least on non-cloneable property
    // Create a new object and clone all cloneable properties into that new object
      const objSubset = {};
      for (prop in obj) {
        if (isCloneable(obj[prop])) {
          objSubset[prop] = obj[prop];
        }
      }
      return objSubset;
    }
  }

  // If obj doesn't have type functions
  return obj; // Return obj as is
}


export function getScript(id) {
  const shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  let str = '';
  let k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType === 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  return str;
}

export function colorNameToHex(color) {
// Source: https://stackoverflow.com/a/1573141
  const colors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
  };
  return colors[color.toLowerCase()];
}

export function hexToRgb(pHex) {
  // Source: https://stackoverflow.com/a/5624139
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = pHex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

export function rgbStringToFloatArray(rgbstr) {
  const rgb = rgbstr.match(/\d+/g);
  for (let i = 0; i < 4; i += 1) {
    rgb[i] = i < rgb.length ? Math.max(0x00, Math.min(0xFF, rgb[i] / 0xFF)) : 1.0;
  }
  return rgb;
}


/* eslint-disable no-bitwise */

export function i24ToFloatArray(clr) {
  return [
    ((clr >> 16) & 0xFF) / 255.0,
    ((clr >> 8) & 0xFF) / 255.0,
    ((clr >> 0) & 0xFF) / 255.0,
    1.0];
}

export function F32toI24(floats, bounds) {
  const bytes = new Uint8Array(4 * floats.length);
  let i = 0;
  const voffset = -bounds[0];
  const vscale = 0xFFFFFE / (bounds[1] - bounds[0]);
  floats.forEach(function (pValue) {
    let value = pValue;
    value += voffset;
    value *= vscale;
    value = Math.floor(value);
    value = Math.max(0, value);
    value = Math.min(0xFFFFFE, value);
    value += 1;
    bytes[i + 0] = (value >> 16) & 0xFF;
    bytes[i + 1] = (value >> 8) & 0xFF;
    bytes[i + 2] = (value >> 0) & 0xFF;
    bytes[i + 3] = 255;
    i += 4;
  });
  return bytes;
}

export function F32toI24flipY(floats, bounds, width, height) {
  const bytes = new Uint8Array(4 * floats.length);
  let i = 0;
  const voffset = -bounds[0];
  const vscale = 0xFFFFFE / (bounds[1] - bounds[0]);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
    // var value = Math.floor((floats[(height - y - 1) * width + x] - bounds[0]) * vscale) + 1;
      let value = floats[((height - y - 1) * width) + x];
      value += voffset;
      value *= vscale;
      value = Math.floor(value);
      value = Math.max(0, value);
      value = Math.min(0xFFFFFE, value);
      value += 1;
      bytes[i + 0] = (value >> 16) & 0xFF;
      bytes[i + 1] = (value >> 8) & 0xFF;
      bytes[i + 2] = (value >> 0) & 0xFF;
      bytes[i + 3] = 255;
      i += 4;
    }
  }
  return bytes;
}

/* eslint-enable no-bitwise */

export function hsv2rgb(hsv) {
  // Source: https://stackoverflow.com/a/6930407
  if (hsv[1] <= 0.000001) {
    return [hsv[2], hsv[2], hsv[2]];
  }
  let hh;
  // let out;

  hh = hsv[0];
  if (hh >= 1.0) {
    hh = 0.0;
  }
  hh *= 6.0;
  const i = Math.floor(hh);
  const ff = hh - i;
  const p = hsv[2] * (1.0 - hsv[1]);
  const q = hsv[2] * (1.0 - (hsv[1] * ff));
  const t = hsv[2] * (1.0 - (hsv[1] * (1.0 - ff)));

  switch (i) {
    case 0: return [hsv[2], t, p];
    case 1: return [q, hsv[2], p];
    case 2: return [p, hsv[2], t];
    case 3: return [p, q, hsv[2]];
    case 4: return [t, p, hsv[2]];
    default: return [hsv[2], p, q];
  }
}


export function urlExists(url, onTrue, onFalse, isAsync) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 404 && onFalse) {
      onFalse();
    }
    if (this.readyState === 4 && this.status !== 404 && onTrue) {
      onTrue();
    }
  };
  request.open('HEAD', url, !(isAsync === false));
  request.overrideMimeType('text/csv; charset=utf8');
  request.send();
  return request.status !== 404;
}


let varDownloader;
export function download(filename, contentUrl) {
  if (!varDownloader) {
    document.body.appendChild(varDownloader = document.createElement('a'));
  }

  varDownloader.href = contentUrl;
  varDownloader.download = filename;
  varDownloader.click();
}

export function imageUrlFromBytes(bytes, width, height) {
  // Create a temporary 2D canvas to store the result -> tempCanvas
  let tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;

  // Copy the pixels to the 2D canvas
  const imageData = tempCanvas.getContext('2d').createImageData(width, height);
  imageData.data.set(bytes);
  tempCanvas.getContext('2d').putImageData(imageData, 0, 0);
  const dataURL = tempCanvas.toDataURL();

  // Free tempCanvas
  tempCanvas = null;

  return dataURL;
}


let varSeededRandomSeed = 1;
Math.seededRandom = function () { // Source: https://stackoverflow.com/a/19303725
  const x = Math.sin(varSeededRandomSeed) * 10000;
  varSeededRandomSeed += 1;
  return x - Math.floor(x);
};

Math.clamp = function (f, minimum, maximum) {
  return Math.min(Math.max(f, minimum), maximum);
};


export function createCookie(name, value, days) {
  // Source: http://www.quirksmode.org/js/cookies.html
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}
export function readCookie(name) {
  // Source: http://www.quirksmode.org/js/cookies.html
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}
export function readFloatCookie(name) {
  let cookie = readCookie(name);
  cookie = Number.parseFloat(cookie);
  return isNaN(cookie) ? null : cookie;
}
export function readIntCookie(name) {
  let cookie = readCookie(name);
  cookie = Number.parseInt(cookie, 10);
  return isNaN(cookie) ? null : cookie;
}
export function eraseCookie(name) {
  // Source: http://www.quirksmode.org/js/cookies.html
  createCookie(name, '', -1);
}

export function getParameterByName(pName, pUrl) {
  // Source: https://stackoverflow.com/a/901144
  let url = pUrl;
  if (!url) {
    url = window.location.href;
  }
  const name = pName.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line no-useless-escape
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


export function addMouseWheelHandler(onmousewheel) {
  // Source: http://www.javascriptkit.com/javatutors/onmousewheel.shtml
  const mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
  if (document.attachEvent) {
    document.attachEvent(`on${mousewheelevt}`, onmousewheel);
  } else if (document.addEventListener) {
    document.addEventListener(mousewheelevt, onmousewheel, false);
  }
}
export function addMouseMoveHandler(onmousemove) {
  if (document.attachEvent) {
    document.attachEvent('onmousemove', onmousemove);
  } else if (document.addEventListener) {
    document.addEventListener('mousemove', onmousemove, false);
  }
}
export function addMouseUpHandler(onmouseup) {
  if (document.attachEvent) {
    document.attachEvent('onmouseup', onmouseup);
  } else if (document.addEventListener) {
    document.addEventListener('mouseup', onmouseup, false);
  }
}
export function addKeyDownHandler(onkeydown) {
  if (document.attachEvent) {
    document.attachEvent('onkeydown', onkeydown);
  } else if (document.addEventListener) {
    document.addEventListener('keydown', onkeydown, false);
  }
}
export function addKeyUpHandler(onkeyup) {
  if (document.attachEvent) {
    document.attachEvent('onkeyup', onkeyup);
  } else if (document.addEventListener) {
    document.addEventListener('keyup', onkeyup, false);
  }
}

/**
 * Simple forward-list
 * The first node of the list is the list itself
 * @constructor
 * @package
 */
export function ForwardList(value) {
  this.value = value;
  this.next = null;

  this.push = function (val) {
    // Pushes to front
    const newnode = new ForwardList(this.value);
    newnode.next = this.next;
    this.next = newnode;
    this.value = val;
  };
  this.pushBack = function (val) {
    let back = this;
    while (back.next !== null) {
      back = back.next;
    }
    const newnode = new ForwardList(val);
    back.next = newnode;
  };
  this.sortedPush = function (val) {
    if (val <= this.value) {
      this.push(val);
    } else {
      let node = this;
      while (node.next !== null && node.next.value < val) {
        node = node.next;
      }
      const newnode = new ForwardList(val);
      newnode.next = node.next;
      node.next = newnode;
    }
  };
  this.toArray = function () {
    const array = [];
    for (let node = this; node; node = node.next) {
      array.push(node.value);
    }
    return array;
  };
  this.print = function () {
    const array = [];
    for (let node = this; node; node = node.next) {
      array.push(node.value);
    }
    consoleLog(array.join(', '));
  };
  this.size = function () {
    let size = 0;
    for (let node = this; node; node = node.next) {
      size += 1;
    }
    return size;
  };
  this.forEach = function (callback) {
    for (let node = this; node; node = node.next) {
      callback(node.value);
    }
  };
  ForwardList.sortedMerge = function (pa, pb) {
    // Source: http://www.geeksforgeeks.org/merge-two-sorted-linked-lists/
    const dummy = new ForwardList(null);
    let tail = dummy;
    let a = pa;
    let b = pb;
    while (a !== null && b != null) {
      // While neither a nor b run out
      if (a.value <= b.value) {
        const newNode = a;
        a = newNode.next;
        newNode.next = tail.next;
        tail.next = newNode;
      } else {
        const newNode = b;
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
export function PriorityQueue(priorityProperty) {
  const data = [];
  this.length = 0;
  this.push = function (element) {
    this.length += 1;
    let i;
    const p = element[priorityProperty];
    for (i = 0; i < data.length && data[i][priorityProperty] >= p; i += 1) {
      /* empty */
    }
    data.splice(i, 0, element);
  };
  this.pop = function () {
    this.length -= 1;
    return data.pop();
  };
  this.shift = function () {
    this.length -= 1;
    return data.shift();
  };
}
/*
var queue = new PriorityQueue('p');
queue.push({str: 'high', p: 9});
queue.push({str: 'low', p: 1});
queue.push({str: 'medium-low', p: 3});
queue.push({str: 'medium', p: 5});
queue.push({str: 'medium-low-2', p: 3});
queue.push({str: 'medium-high', p: 7});
queue.push({str: 'very-high', p: 15});
while (queue.length)
  consoleLog(queue.shift());
*/


/**
 * A set container that raises on-changed events whenever the collection is altered
 * @constructor
 * @export
 */
export function HashSet(onchanged) {
  /** A dictionary of all values in the hash set @type {!Object<number, boolean>} */
  let hash = {};
  /** The number of values in this hash set @type {number} */
  this.length = 0;
  /** callback to be raised whenever values have been added or deleted @public @type {function()} */
  this.onchanged = isFunction(onchanged) ? onchanged : function () {};

  /**
   * Add a single value into the hash set
   * @param  {number} value
   */
  this.push = function (value) {
    if (hash[value] !== true) {
      hash[value] = true;
      this.length += 1;
      this.onchanged();
    }
  };

  /**
   * Add an iterable list of values into the hash set
   * @param  {Object} values
   */
  this.append = function (values) {
    // var t = performance.now();
    let invalidate = false;
    const self = this;
    values.forEach(function (value) {
      if (hash[value] !== true) {
        hash[value] = true;
        self.length += 1;
        invalidate = true;
      }
    });
    // consoleLog('append ' + values.length + ': ' + (performance.now() - t));
    if (invalidate) {
      this.onchanged();
    }
  };

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

  /**
   * Reset the hash set to only contain the given iterable list of values
   * @param  {Object} values
   */
  this.assign = function (values) {
    if (values.length === 0) {
      this.clear();
      return;
    }

    // var t = performance.now();
    const newHash = {};
    let identical = (values.length === this.length);
    values.forEach(function (value) {
      if (identical && hash[value] !== true) {
        identical = false;
      }
      newHash[value] = true;
    });

    hash = newHash;
    this.length = values.length;
    // consoleLog('assign ' + values.length + ': ' + (performance.now() - t));

    if (identical === false) {
      this.onchanged();
    }
  };

  /**
   * Reset the hash set to only contain numbers 0 through n - 1
   * @param  {number} n The number of values to set
   */
  this.assignRange = function (n) {
    if (n <= 0) {
      return;
    }
    // var t = performance.now();
    hash = new Array(n);
    hash.fill(true);
    this.length = n;
    // consoleLog('assignRange ' + n + ': ' + (performance.now() - t));
    this.onchanged();
  };

  /**
   * Remove the given value from the hash set
   * @param  {number} value The value to remove
   */
  this.erase = function (value) {
    if (hash[value] === true) {
      delete hash[value];
      this.length -= 1;
      this.onchanged();
    }
  };

  /**
   * Remove the given iterable list of values from the hash set
   * @param  {Object} values The values to remove
   */
  this.remove = function fRemove(values) {
    // var t = performance.now();
    let invalidate = false;
    const self = this;
    values.forEach((value) => {
      if (hash[value] === true) {
        delete hash[value];
        self.length -= 1;
        invalidate = true;
      }
    });
    // consoleLog('remove ' + values.length + ': ' + (performance.now() - t));
    if (invalidate) {
      this.onchanged();
    }
  };

  /**
   * @return {boolean} True, if the hash set doesn't contain any values
   */
  this.isempty = function fIsEmpty() {
    return this.length === 0;
  };

  /**
   * Resets the hash set to an empty set
   */
  this.clear = function fClear() {
    if (this.length !== 0) {
      hash = {};
      this.length = 0;
      this.onchanged();
    }
  };

  /**
   * Calls the given function once for each value in the hash set
   * @param  {function(number)} callback
   */
  this.forEach = function (callback) {
    // var last = Number.MIN_SAFE_INTEGER, badOrder = 0;
    for (let value in hash) {
      if (Object.prototype.hasOwnProperty.call(hash, value)) {
        value = Number.parseInt(value, 10);
        // if (value < last) {badOrder += 1; last = value;}
        callback(value);
      }
    }
    // if (badOrder !== 0) consoleLog('bad order: ' + badOrder + ' times');
  };

  /**
   * @return  {Uint32Array} A sorted array of all values in the hash set
   */
  this.get = function fGet() {
    return new Uint32Array(Object.keys(hash).map(Number));
  };

  /**
   * @return  {number} The number of values in the hash set
   */
  this.size = function fSize() {
    return this.length;
  };

  /**
   * @param  {number} value
   * @return  {boolean} True, if the given value is part of the hash set
   */
  this.contains = function fContains(value) {
    return hash[value] === true;
  };
}
