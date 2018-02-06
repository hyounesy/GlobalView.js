const libUtility = require('./utility.js');
const libGraphics = require('./graphics.js');
const libShaders = require('./shaders.js');
const libGlMatrix = require('gl-matrix');

export const COLORMAP_WIDTH = 10; // [pixel]

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
const imageExhue =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAABCAYAAABADtw1AAAABHNCSVQICA' +
  'gIfAhkiAAAAh5JREFUWIWlVu1xxTAIQ92rI3SN7r+B+iM2HwInedfevcYGBJJN7MDM7Of7l2YwoxkNFn' +
  '+XbY+5bWbLjuq7bAwHjCXuyRZ2DnXERqY6yl11JH6RosQPPvZcFH3VL+uhdsz2yDnnm7nmOskOSIzyL9' +
  'jQgswzgZEmhdYx9sqJBJKWOtpaDYmtts79bZ3/2aSuxtCklfu4zUlCInpLrSdjPsawztOYir9aA69qlR' +
  'x3HMmdkbdxc/4briNejodYQ0SnR0x6K+r6V10blfa68LEaV6xShxI7jnJP9Yyel5ox8Y2eGyqqLvO9SX' +
  'VZ/ft0EHtlPvguIGZ/i631NIZn/MDvqEVrTVoO+l3LI0byt52+0WLG5X6npXfRYX2q72Ff0m0it1uN2Y' +
  'PJ7iKQb7MW5/lrL/fjlnV+4gZ/PSL98droWnCos3N+dpVROO4aJ5vc7qolnQqt1smX1zcAhPnJLPjEJf' +
  'NcNojopjFhKwfuTx7Aa8CvJSxCsQ9pjri+djOlOQ0r5+QHSv473xgH50jAcPD1XOn5dfTf45af8DXL65' +
  'Nq3/lm+5XzM8xjfZO4ATNryXrTvPtyPwz7cqivduVvosXe4V2LOd+qKd6BYJd1leeF54YEfmds2S0Brf' +
  '5/xLAjI67EE8UWz4Vjt5Uc9cOP5ru5KyQ/9AP0EJdW79JSukXw9QfzDjz87G28a8H2O/8+LnH2dcLQu7' +
  '1hBh5vfQ+xXHX/AM1S5PNCNCVNAAAAAElFTkSuQmCC';

const imageRainbow =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAABCAYAAABADtw1AAAAt0lEQVRYhe' +
  'WNsQ0CMRAErxOQeJHRwveAXk/sBj6iAKgAioAeoBXIQRBBAOmZCnzy7pvg5GCkDXZ2ZTaZRgAF+8yW9c' +
  'E4Lln3EAr2mS3rg3FcEkX+gRbwUrkaHm2TzbNtFOkzW9YH43jltRmK894OOtZL5Zr43LpsvvdOkT6zZX' +
  '0wjlfCJeRzDQr1mS3rg3GcsjvF4uzPUcd6qVwTi+UB4KhYn9myPhjHJ6t5j6Bgn9myPhjHJSIiP3thWH' +
  'cGKpqFAAAAAElFTkSuQmCC';

let colormaps = {};

export function Colormap(gl, globalView) {
  const TICK_LENGTH = 6; // [pixel]
  const NUM_TICKS = 10;

  const sdrLine = new libGraphics.Shader(gl, libShaders.Shaders.vsSimple, libShaders.Shaders.fsLine);
  sdrLine.color = sdrLine.u4f('color');
  sdrLine.color.apply(sdrLine, gl.foreColor);
  sdrLine.matWorldViewProj = sdrLine.u4x4f('matWorldViewProj');
  this.updateColorSchema = function () {
    sdrLine.color.apply(sdrLine, gl.foreColor);
  }

  const sdrColormap = new libGraphics.Shader(
    gl, libShaders.Shaders.vsTextured,
    libShaders.Shaders.fsTextured1D
  );
  sdrColormap.matWorldViewProj = sdrColormap.u4x4f('matWorldViewProj');
  colormaps = {
    exhue: libGraphics.LoadTexture(gl, imageExhue, () => {
      globalView.invalidate();
    }), // function() { setTimeout(function() { globalView.invalidate(); }, 1000); }),
    rainbow: libGraphics.LoadTexture(gl, imageRainbow, () => {
      globalView.invalidate();
    }), // function() { setTimeout(function() { globalView.invalidate(); }, 1000); }),
    2: libGraphics.LoadTextureFromByteArray(
      gl,
      new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255]),
      2, 1
    )
  };
  // not used:
  // this.builtinColormaps = ['exhue', 'rainbow'];
  let texColormap = colormaps.exhue;

  // Create a 2D line mesh
  const meshLine = new libGraphics.Mesh(gl, new Float32Array([
    // Positions
    0, 0, 0,
    1, 0, 0
  ]), null, null, null, null, null, gl.LINES);

  // Create a 2D line quad mesh
  const meshLineQuad = new libGraphics.Mesh(gl, new Float32Array([
    // Positions
    0, 0, 0,
    1, 0, 0,
    1, 1, 0,
    0, 1, 0
  ]), null, null, null, null, null, gl.LINE_LOOP);

  // Create a 2D quad mesh
  const meshQuad = new libGraphics.Mesh(gl, new Float32Array([
    // Positions
    0, 1, 0,
    0, 0, 0,
    1, 1, 0,
    1, 0, 0
  ]), null, null, null, new Float32Array([
    // Texture coordinates
    0, 1,
    0, 0,
    1, 1,
    1, 0
  ]));

  const axis = {minimum: 0, maximum: 100, values: null, tickOffset: 0, tickDistance: 10, tickCount: 11, tickLength: TICK_LENGTH};

  this.visible = true;
  this.render = function (flipY, plotBounds) {
    if (!this.visible) {
      return;
    }

    // >>> Draw colormap

    sdrColormap.bind();
    meshQuad.bind(sdrColormap, texColormap);

    const mattrans = libGlMatrix.mat4.create();
    libGlMatrix.mat4.identity(mattrans);
    if (flipY === true) {
      libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
    }
    libGlMatrix.mat4.translate(mattrans, mattrans,
      [((2 * (plotBounds.x + plotBounds.width + 0.5)) / gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0]); // 0.5 ... center inside pixel
    libGlMatrix.mat4.scale(mattrans, mattrans, [(2 * COLORMAP_WIDTH) / gl.width, (2 * plotBounds.height) / gl.height, 1]);
    sdrColormap.matWorldViewProj(mattrans);
    meshQuad.draw();

    // >>> Draw borders

    sdrLine.bind();
    meshLineQuad.bind(sdrLine, null);

    sdrLine.matWorldViewProj(mattrans);
    meshLineQuad.draw();

    // >>> Draw ticks and tick labels

    // Draw y-axis ticks and tick labels
    let tickLabel_left = 0.0;
    libGlMatrix.mat4.identity(mattrans);
    if (flipY === true) {
      libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
    }
    libGlMatrix.mat4.translate(mattrans, mattrans,
      [((2 * (plotBounds.x + plotBounds.width + COLORMAP_WIDTH + 0.5)) / gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0]); // 0.5 ... center inside pixel
    libGlMatrix.mat4.scale(mattrans, mattrans, [(2 * axis.tickLength) / gl.width, (2 * plotBounds.height) / gl.height, 1]);
    sdrLine.matWorldViewProj(mattrans);
    meshLine.draw();
    libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, 1.0, 0.0]);
    sdrLine.matWorldViewProj(mattrans);
    meshLine.draw();
    libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -1.0, 0.0]);
    for (let i = 0; i < axis.tickCount; i += 1) {
      const y = axis.tickOffset + (i * axis.tickDistance);
      const tickPos = (y - axis.minimum) / (axis.maximum - axis.minimum);

      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, tickPos, 0.0]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -tickPos, 0.0]);

      const tickLabel = axis.values ? axis.values[y] : y.toPrecision(6) / 1;
      tickLabel_left = Math.max(tickLabel_left, gl.measureTextWidth(tickLabel));
      gl.drawText(tickLabel, plotBounds.x + plotBounds.width + COLORMAP_WIDTH + axis.tickLength + 2, gl.height - plotBounds.y - (plotBounds.height * tickPos), 'middleleft');
    }
    tickLabel_left = Math.ceil(plotBounds.x + plotBounds.width + COLORMAP_WIDTH + axis.tickLength + 10 + tickLabel_left);

    // >>> Draw axis label

    if (axis.label) {
      gl.drawText(axis.label, tickLabel_left, gl.height - plotBounds.y - (plotBounds.height / 2), 'topcenter', -Math.PI / 2);
    }
  }

  function checkOverlap() {
    const MIN_TICK_LABEL_DISTANCE = gl.measureTextWidth('  '); // Minimum distance between tick labels in pixel
    const plotBounds = globalView.getPlotBounds();
    return (plotBounds.height * axis.tickDistance) / (axis.maximum - axis.minimum) >= gl.measureTextHeight() + MIN_TICK_LABEL_DISTANCE;
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

    for (let numTicks = NUM_TICKS; numTicks >= 0; numTicks -= 1) {
      if (changeTickDistance === false) {
        axis.tickOffset = Math.ceil(minimum / axis.tickDistance) * axis.tickDistance;
        axis.tickCount = Math.floor((maximum - axis.tickOffset) / axis.tickDistance) + 1;
      } else {
        axis.tickDistance = (maximum - minimum) / numTicks;
        let exp = Math.ceil(Math.log(axis.tickDistance) / Math.log(10)); // Compute power-of-10 just above tickDistance -> pow(10, exp)

        // Try less aggressive rounding in each iteration until break condition is met
        for (let i = 0; i < 10; i += 1) {
          // Maximum 10 iterations
          axis.tickDistance = (maximum - minimum) / numTicks;
          const base = Math.pow(10, exp);
          exp -= 1;
          axis.tickDistance = Math.round(axis.tickDistance / base) * base; // Round tickDistance to base
          axis.tickOffset = Math.ceil(minimum / axis.tickDistance) * axis.tickDistance;
          axis.tickCount = Math.floor((maximum - axis.tickOffset) / axis.tickDistance) + 1;
          if (axis.tickCount >= numTicks - 2 && axis.tickCount <= numTicks + 2) {
            // Condition: numTicks - 2 <= tickCount <= numTicks + 2
            break;
          }
        }
      }

      if (checkOverlap()) {
        break;
      }
    }
  }
  this.setEnumRange = function (minimum, maximum, values) {
    axis.minimum = minimum -= 0.5; // 0.5 ... Move to center of value-bin
    axis.maximum = maximum -= 0.5; // 0.5 ... Move to center of value-bin
    axis.values = values;

    axis.tickDistance = 1;
    axis.tickOffset = Math.max(0, Math.ceil(minimum / axis.tickDistance) * axis.tickDistance);
    axis.tickCount = Math.min(values.length - axis.tickOffset, Math.floor(((maximum - axis.tickOffset) + 1) / axis.tickDistance));
  }
  this.setLabel = function (label) {
    axis.label = label;
  }

  let pointColor = null;
  this.setDataset = function (dataset, options) {}
  this.onInputChanged = function (activeInputs, animatedInputs, options) {}
  this.onOptionsChanged = function (options) {
    axis.tickLength = TICK_LENGTH + (options.showColormapHistogram ? options.histogramHeight : 0);
    if (options.pointColor !== pointColor) {
      pointColor = options.pointColor;
      if (pointColor === null) {
        texColormap = colormaps.exhue;
      } else if (colormaps[pointColor]) {
        texColormap = colormaps[pointColor];
      } else {
        const c = parseColormap(pointColor);
        if (c) {
          texColormap = libGraphics.LoadTextureFromByteArray(gl, c, c.length / 4, 1);
        }
      }
    }
  }
  this.onPlotBoundsChanged = function (plotBounds) {
    axis.values === null ?
      this.setNumericRange(axis.minimum, axis.maximum, true) :
      this.setEnumRange(axis.minimum + 0.5, axis.maximum + 0.5, axis.values);
  }

  this.getTexture = function () {
    return texColormap;
  }

  this.free = function () {
    meshLine.free();
  }
}

export function validateColor(color) {
  if (libUtility.isString(color)) {
    if (!libUtility.isUndefined(libUtility.colorNameToHex(color))) {
      return true;
    } // color is known color name
    let rgb;
    if ((rgb = libUtility.hexToRgb(color)) !== null &&
      rgb.r >= 0x00 && rgb.r <= 0xFF &&
      rgb.g >= 0x00 && rgb.g <= 0xFF &&
      rgb.b >= 0x00 && rgb.b <= 0xFF) {
      return true;
    } // color is hex color
    return 'Unknown color ' + color;
  }

  if (libUtility.isArray(color)) {
    if (color.length !== 4) {
      return 'Color array needs to have 4 components (RGBA).';
    }
    return true;
  }

  return 'Unknown color ' + color;
}

export function parseColor(color) {
  if (libUtility.isString(color)) {
    const hex = libUtility.colorNameToHex(color);
    const rgb = libUtility.hexToRgb(hex ? hex : color);
    return rgb ? new Uint8Array([rgb.r, rgb.g, rgb.b, 255]) : null;
  }

  if (libUtility.isArray(color)) {
    return color.length >= 4 ? new Uint8Array([color[0], color[1], color[2], color[3]]) : null;
  }

  return null;
}

export function validateColormap(colormap) {
  if (colormap === null) {
    return true;
  }
  if (libUtility.isString(colormap)) {
    if (colormaps[colormap]) {
      return true;
    }
    return validateColor(colormap);
  }

  if (libUtility.isArray(colormap)) {
    if (colormap.length === 0) {
      return 'Colormap array cannot be empty.';
    }
    if (libUtility.isString(colormap[0])) {
      let err;
      for (let i = 0; i < colormap.length; i += 1) {
        if ((err = validateColor(colormap[i])) !== true) {
          return err;
        }
      }
      return true;
    } else {
      if (colormap.length % 4 !== 0) {
        return 'Colormap array length must be multiple of 4.';
      }
      for (let i = 0; i < colormap.length; i += 1) {
        if (!libUtility.isNumber(colormap[i]) || colormap[i] < 0x00 || colormap[i] > 0xFF) {
          return 'Colormap array must contain numbers between 0 and 255.';
        }
      }
      return true;
    }
  }

  return 'Unknown colormap ' + colormap;
}

export function parseColormap(colormap) {
  if (libUtility.isString(colormap)) {
    return parseColor(colormap);
  }

  if (libUtility.isArray(colormap)) {
    if (colormap.length === 0) {
      return null;
    }
    if (libUtility.isString(colormap[0])) {
      const array = [];
      let color;
      for (let i = 0; i < colormap.length; i += 1) {
        if ((color = parseColor(colormap[i]))) {
          Array.prototype.push.apply(array, color);
        } else {
          return null;
        }
      }
      return new Uint8Array(array);
    } else if(libUtility.isNumber(colormap[0])) {
      return new Uint8Array(colormap);
    }
  }

  return null;
}
