import { mat4 } from 'gl-matrix';
import { isString, isArray, isNumber, isUndefined } from './utility';
import { Shader, LoadTexture, LoadTextureFromByteArray, Mesh } from './graphics';
import Shaders from './shaders';

const COLORMAP_WIDTH = 10; // (pixels) static, accessed through Colormap.getWidth()
let availableColorMaps = {}; // static, accessed through Colormap.getAvailableColorMaps()

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

/**
 * A class holding the active colormap for the global view.
 * This class also draws a color axis to the right of the scatter plot.
 */
class Colormap {
  /**
   * @constructor
   * @package
   * @implements {Viewer}
   * @param {WebGLRenderingContext} gl webgl render context
   * @param {GlobalView} plot  GlobalView plot
   */
  constructor(gl, plot) {
    this.gl = gl;
    this.plot = plot;

    this.TICK_LENGTH = 6; // [pixel]
    this.NUM_TICKS = 10;

    this.sdrLine =
      new Shader(gl, Shaders.vsSimple, Shaders.fsLine);
    this.sdrLine.color = this.sdrLine.u4f('color');
    this.sdrLine.color(...gl.foreColor);
    this.sdrLine.matWorldViewProj = this.sdrLine.u4x4f('matWorldViewProj');

    this.sdrColormap = new Shader(
      gl, Shaders.vsTextured,
      Shaders.fsTextured1D,
    );
    this.sdrColormap.matWorldViewProj = this.sdrColormap.u4x4f('matWorldViewProj');
    availableColorMaps = {
      exhue: LoadTexture(gl, imageExhue, () => {
        this.plot.invalidate();
      }),
      rainbow: LoadTexture(gl, imageRainbow, () => {
        this.plot.invalidate();
      }),
      2: LoadTextureFromByteArray(
        gl,
        new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255]),
        2, 1,
      ),
    };

    this.texColormap = availableColorMaps.exhue;

    // Create a 2D line mesh
    this.meshLine = new Mesh(gl, new Float32Array([
      // Positions
      0, 0, 0,
      1, 0, 0,
    ]), null, null, null, null, null, gl.LINES);

    // Create a 2D line quad mesh
    this.meshLineQuad = new Mesh(gl, new Float32Array([
      // Positions
      0, 0, 0,
      1, 0, 0,
      1, 1, 0,
      0, 1, 0,
    ]), null, null, null, null, null, gl.LINE_LOOP);

    // Create a 2D quad mesh
    this.meshQuad = new Mesh(gl, new Float32Array([
      // Positions
      0, 1, 0,
      0, 0, 0,
      1, 1, 0,
      1, 0, 0,
    ]), null, null, null, new Float32Array([
      // Texture coordinates
      0, 1,
      0, 0,
      1, 1,
      1, 0,
    ]));

    this.axis = {
      minimum: 0,
      maximum: 100,
      values: null,
      tickOffset: 0,
      tickDistance: 10,
      tickCount: 11,
      tickLength: this.TICK_LENGTH,
    };

    this.visible = true;

    this.pointColor = null;

    this.setDataset = (/* dataset, options */) => {};
    this.onInputChanged = (/* activeInputs, animatedInputs, options */) => {};
  }

  static getAvailableColorMaps() {
    return availableColorMaps;
  }
  updateColorSchema() {
    this.sdrLine.color(...this.gl.foreColor);
  }

  /**
   * Draws the colormap
   * @param {boolean} flipY
   * @param {Object} plotBounds -
   * @param {Object} plotBounds.x -
   * @param {Object} plotBounds.y -
   * @param {Object} plotBounds.width -
   * @param {Object} plotBounds.height -
   */
  render(flipY, plotBounds) {
    if (!this.visible) {
      return;
    }

    // >>> Draw colormap

    this.sdrColormap.bind();
    this.meshQuad.bind(this.sdrColormap, this.texColormap);

    const mattrans = mat4.create();
    mat4.identity(mattrans);
    if (flipY === true) {
      mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
    }
    mat4.translate(
      mattrans, mattrans,
      [((2 * (plotBounds.x + plotBounds.width + 0.5)) / this.gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0],
    ); // 0.5 ... center inside pixel
    mat4.scale(
      mattrans, mattrans,
      [(2 * Colormap.getWidth()) / this.gl.width, (2 * plotBounds.height) / this.gl.height, 1],
    );
    this.sdrColormap.matWorldViewProj(mattrans);
    this.meshQuad.draw();

    // >>> Draw borders

    this.sdrLine.bind();
    this.meshLineQuad.bind(this.sdrLine, null);

    this.sdrLine.matWorldViewProj(mattrans);
    this.meshLineQuad.draw();

    // >>> Draw ticks and tick labels

    // Draw y-axis ticks and tick labels
    let tickLabelLeft = 0.0;
    mat4.identity(mattrans);
    if (flipY === true) {
      mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
    }
    mat4.translate(
      mattrans, mattrans,
      [((2 * (plotBounds.x + plotBounds.width + Colormap.getWidth() + 0.5)) / this.gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0],
    ); // 0.5 ... center inside pixel
    mat4.scale(
      mattrans, mattrans,
      [(2 * this.axis.tickLength) / this.gl.width, (2 * plotBounds.height) / this.gl.height, 1],
    );
    this.sdrLine.matWorldViewProj(mattrans);
    this.meshLine.draw();
    mat4.translate(mattrans, mattrans, [0.0, 1.0, 0.0]);
    this.sdrLine.matWorldViewProj(mattrans);
    this.meshLine.draw();
    mat4.translate(mattrans, mattrans, [0.0, -1.0, 0.0]);

    for (let i = 0; i < this.axis.tickCount; i += 1) {
      const y = this.axis.tickOffset + (i * this.axis.tickDistance);
      const tickPos = (y - this.axis.minimum) / (this.axis.maximum - this.axis.minimum);

      mat4.translate(mattrans, mattrans, [0.0, tickPos, 0.0]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();
      mat4.translate(mattrans, mattrans, [0.0, -tickPos, 0.0]);

      const tickLabel = this.axis.values ? this.axis.values[y] : y.toPrecision(6) / 1;
      tickLabelLeft = Math.max(tickLabelLeft, this.gl.measureTextWidth(tickLabel));
      this.gl.drawText(
        tickLabel,
        plotBounds.x + plotBounds.width + Colormap.getWidth() + this.axis.tickLength + 2,
        this.gl.height - plotBounds.y - (plotBounds.height * tickPos),
        'middleleft',
      );
    }
    tickLabelLeft = Math.ceil(plotBounds.x +
      plotBounds.width + Colormap.getWidth() +
      this.axis.tickLength + 10 + tickLabelLeft);

    // >>> Draw axis label

    if (this.axis.label) {
      this.gl.drawText(
        this.axis.label, tickLabelLeft, this.gl.height - plotBounds.y - (plotBounds.height / 2),
        'topcenter', -Math.PI / 2,
      );
    }
  }

  checkOverlap() {
    // Minimum distance between tick labels in pixel
    const MIN_TICK_LABEL_DISTANCE = this.gl.measureTextWidth('  ');
    const plotBounds = this.plot.getPlotBounds();
    return (plotBounds.height * this.axis.tickDistance) / (this.axis.maximum - this.axis.minimum) >=
      this.gl.measureTextHeight() + MIN_TICK_LABEL_DISTANCE;
  }

  /**
   * Sets the color map axis by specifying a numeric range
   * @param  {number} minimum
   * @param  {number} maximum
   * @param  {boolean=} changeTickDistance=true
   */
  setNumericRange(minimum, maximum, changeTickDistance) {
    this.axis.minimum = minimum;
    this.axis.maximum = maximum;
    this.axis.values = null;

    for (let numTicks = this.NUM_TICKS; numTicks >= 0; numTicks -= 1) {
      if (changeTickDistance === false) {
        this.axis.tickOffset = Math.ceil(minimum / this.axis.tickDistance) *
          this.axis.tickDistance;
        this.axis.tickCount = Math.floor((maximum - this.axis.tickOffset) /
          this.axis.tickDistance) + 1;
      } else {
        this.axis.tickDistance = (maximum - minimum) / numTicks;
        // Compute power-of-10 just above tickDistance -> pow(10, exp)
        let exp = Math.ceil(Math.log(this.axis.tickDistance) / Math.log(10));

        // Try less aggressive rounding in each iteration until break condition is met
        for (let i = 0; i < 10; i += 1) {
          // Maximum 10 iterations
          this.axis.tickDistance = (maximum - minimum) / numTicks;
          const base = (10 ** exp);
          exp -= 1;
          // Round tickDistance to base
          this.axis.tickDistance = Math.round(this.axis.tickDistance / base) * base;
          this.axis.tickOffset = Math.ceil(minimum / this.axis.tickDistance) *
            this.axis.tickDistance;
          this.axis.tickCount = Math.floor((maximum - this.axis.tickOffset) /
            this.axis.tickDistance) + 1;
          if (this.axis.tickCount >= numTicks - 2 && this.axis.tickCount <= numTicks + 2) {
            // Condition: numTicks - 2 <= tickCount <= numTicks + 2
            break;
          }
        }
      }

      if (this.checkOverlap()) {
        break;
      }
    }
  }

  /**
   * Returns the colormap width in pixels
   */
  static getWidth() {
    return COLORMAP_WIDTH;
  }

  /**
   * Sets color map axis by specifying an enumerated labels for tick values
   * @param {number} rangeMin  axis range minimum
   * @param {number} rangeMax  axis range maximum
   * @param {Object.<number, string>} values tick labels
   */
  setEnumRange(rangeMin, rangeMax, values) {
    const minimum = rangeMin - 0.5; // 0.5 ... Move to center of value-bin
    const maximum = rangeMax - 0.5; // 0.5 ... Move to center of value-bin
    this.axis.minimum = minimum;
    this.axis.maximum = maximum;
    this.axis.values = values;

    this.axis.tickDistance = 1;
    this.axis.tickOffset = Math.max(0, Math.ceil(minimum / this.axis.tickDistance)
      * this.axis.tickDistance);
    this.axis.tickCount = Math.min(
      values.length - this.axis.tickOffset,
      Math.floor(((maximum - this.axis.tickOffset) + 1) / this.axis.tickDistance),
    );
  }

  /**
   * Sets the axis label
   * @param {string} label
   */
  setLabel(label) {
    this.axis.label = label;
  }

  onOptionsChanged(options) {
    this.axis.tickLength = this.TICK_LENGTH +
      (options.showColormapHistogram ? options.histogramHeight : 0);
    if (options.pointColor !== this.pointColor) {
      this.pointColor = options.pointColor;
      if (this.pointColor === null) {
        this.texColormap = Colormap.getAvailableColorMaps().exhue;
      } else if (Colormap.getAvailableColorMaps()[this.pointColor]) {
        this.texColormap = Colormap.getAvailableColorMaps()[this.pointColor];
      } else {
        const c = Colormap.parseColormap(this.pointColor);
        if (c) {
          this.texColormap = LoadTextureFromByteArray(this.gl, c, c.length / 4, 1);
        }
      }
    }
  }

  /** Eventhandler: recompute the axis ranges */
  onPlotBoundsChanged(/* plotBounds */) {
    if (this.axis.values === null) {
      this.setNumericRange(this.axis.minimum, this.axis.maximum, true);
    } else {
      this.setEnumRange(this.axis.minimum + 0.5, this.axis.maximum + 0.5, this.axis.values);
    }
  }

  /** Returns the texture used for the colormap */
  getTexture() {
    return this.texColormap;
  }

  free() {
    this.meshLine.free();
  }

  /**
   * Parses the colormap and returns an array of Uint8Array
   * @param {(string|number[])} colormap either the color map name or an array.
   * Colormap array length must be multiple of 4 and contain numbers between 0 and 255.
   * @returns {Uint8Array} Colormap colors as an array of size [colormapLength * 4]
   */
  static parseColormap(colormap) {
    if (isString(colormap)) {
      return Colormap.parseColor(colormap);
    }

    if (isArray(colormap)) {
      if (colormap.length === 0) {
        return null;
      }
      if (isString(colormap[0])) {
        const array = [];
        for (let i = 0; i < colormap.length; i += 1) {
          const color = Colormap.parseColor(colormap[i]);
          if (color) {
            Array.prototype.push.apply(array, color);
          } else {
            return null;
          }
        }
        return new Uint8Array(array);
      } else if (isNumber(colormap[0])) {
        return new Uint8Array(colormap);
      }
    }

    return null;
  }

  /**
   * Checks if the specified parameter is a valid color
   * @param {(string|number[])} color
   * @returns {(boolean|string)} true of a valid color, otherwise the string error message
   */
  static validateColor(color) {
    if (isString(color)) {
      if (!isUndefined(Colormap.colorNameToHex(color))) {
        return true;
      } // color is known color name
      const rgb = Colormap.hexToRgb(color);
      if (rgb !== null &&
        rgb.r >= 0x00 && rgb.r <= 0xFF &&
        rgb.g >= 0x00 && rgb.g <= 0xFF &&
        rgb.b >= 0x00 && rgb.b <= 0xFF) {
        return true;
      } // color is hex color
      return `Unknown color ${color}`;
    }

    if (isArray(color)) {
      if (color.length !== 4) {
        return 'Color array needs to have 4 components (RGBA).';
      }
      return true;
    }

    return `Unknown color ${color}`;
  }

  /**
   * Converts color parameter to a Uint8Array [r, g, b, a]
   * @param {(string|number[])} color
   * @returns {Uint8Array} Unit8Array of length 4: [r, g, b, a]
   */
  static parseColor(color) {
    if (isString(color)) {
      const hex = Colormap.colorNameToHex(color);
      const rgb = Colormap.hexToRgb(hex || color);
      return rgb ? new Uint8Array([rgb.r, rgb.g, rgb.b, 255]) : null;
    }

    if (isArray(color)) {
      return color.length >= 4 ? new Uint8Array([color[0], color[1], color[2], color[3]]) : null;
    }

    return null;
  }

  /**
   * validates the colormap parameters
   * @param {(string|number[])} colormap either the color map name or an array.
   * Colormap array length must be multiple of 4 and contain numbers between 0 and 255.
   * @returns {(boolean|string)} true of a valid color map, otherwise the string error message
   */
  static validateColormap(colormap) {
    if (colormap === null) {
      return true;
    }
    if (isString(colormap)) {
      if (Colormap.getAvailableColorMaps()[colormap]) {
        return true;
      }
      return Colormap.validateColor(colormap);
    }

    if (isArray(colormap)) {
      if (colormap.length === 0) {
        return 'Colormap array cannot be empty.';
      }
      if (isString(colormap[0])) {
        for (let i = 0; i < colormap.length; i += 1) {
          const err = Colormap.validateColor(colormap[i]);
          if (err !== true) {
            return err;
          }
        }
        return true;
      }
      if (colormap.length % 4 !== 0) {
        return 'Colormap array length must be multiple of 4.';
      }
      for (let i = 0; i < colormap.length; i += 1) {
        if (!isNumber(colormap[i]) || colormap[i] < 0x00 || colormap[i] > 0xFF) {
          return 'Colormap array must contain numbers between 0 and 255.';
        }
      }
      return true;
    }

    return `Unknown colormap ${colormap}`;
  }

  /**
   * Converts string color name (case insensitive) to the hex string.
   * @param {string} colorName - color name (e.g. 'red' or 'Red')
   * @returns {string} - color value in hex format string (e.g. '#ff0000')
   */
  static colorNameToHex(colorName) {
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
    return colors[colorName.toLowerCase()];
  }

  /**
   * Converts color specified in hex format to {r, g, b} values
   * @param {string} hexstr color in hex string format (e.g. "#03F" or "0033FF")
   * @return {Object.<string, number>} rgb values
   */
  static hexToRgb(hexstr) {
    // Source: https://stackoverflow.com/a/5624139
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const varHex = hexstr.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(varHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }

  /**
   * Converts rgb color specified in string format to an array of float values
   * @param {string} rgbstr color in "r, g, b" string format (e.g. "0,0,255")
   * @return {number[]} array of rgb values between 0.0 and 1.0
   */
  static rgbStringToFloatArray(rgbstr) {
    const rgb = rgbstr.match(/\d+/g);
    for (let i = 0; i < 4; i += 1) {
      rgb[i] = i < rgb.length ? Math.max(0x00, Math.min(0xFF, rgb[i] / 0xFF)) : 1.0;
    }
    return rgb;
  }

  /**
   * Converts color specified in hsv color space to rgb color space
   * @param {number[]} hsv array of [h, s, v] numerical values between 0.0 and 1.0
   * @returns {number[]} array of [r, g, b] numerical values between 0.0 and 1.0
   */
  static hsv2rgb(hsv) {
    // Source: https://stackoverflow.com/a/6930407
    if (hsv[1] <= 0.000001) {
      return [hsv[2], hsv[2], hsv[2]];
    }

    let hh = hsv[0];
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
}

export default Colormap;
