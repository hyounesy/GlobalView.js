const libGraphics = require('./graphics.js');
const libShaders = require('./shaders.js');
const libGlMatrix = require('gl-matrix');

/**
 * A class drawing x- and y axes to the left- and bottom of the scatter plot.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */
// eslint-disable-next-line import/prefer-default-export
export function CoordinateSystem(gl, globalView) {
  const TICK_LENGTH = 6; // [pixel]
  const NUM_TICKS = 10;

  const sdrLine =
    new libGraphics.Shader(gl, libShaders.Shaders.vsSimple, libShaders.Shaders.fsLine);
  sdrLine.color = sdrLine.u4f('color');
  sdrLine.color(...gl.foreColor);
  sdrLine.matWorldViewProj = sdrLine.u4x4f('matWorldViewProj');
  this.updateColorSchema = function () {
    sdrLine.color(...gl.foreColor);
  };

  // Create a 2D line mesh
  const meshLine = new libGraphics.Mesh(gl, new Float32Array([
    // Positions
    0, 0, 0,
    1, 0, 0,
  ]), null, null, null, null, null, gl.LINES);

  const axes = [
    {
      minimum: 0,
      maximum: 100,
      values: null,
      tickOffset: 0,
      tickDistance: 10,
      tickCount: 11,
      tickLength: TICK_LENGTH,
    },
    {
      minimum: 0,
      maximum: 100,
      values: null,
      tickOffset: 0,
      tickDistance: 10,
      tickCount: 11,
      tickLength: TICK_LENGTH,
    },
  ];

  /** @type {number} */ let xTickLabelTop = 0;
  /** @type {number} */ let yTickLabelLeft = 0;

  this.visible = [true, true];

  /**
   * Draw the axis
   * @param {boolean} flipY
   * @param {Object} plotBounds -
   * @param {number} plotBounds.x -
   * @param {number} plotBounds.y -
   * @param {number} plotBounds.width -
   * @param {number} plotBounds.height -
   */
  this.render = function (flipY, plotBounds) {
    const mattrans = libGlMatrix.mat4.create();

    // >>> Draw axes

    sdrLine.bind();
    meshLine.bind(sdrLine, null);
    // Draw x-axis
    if (this.visible[0]) {
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans, [
        ((2 * (plotBounds.x + 0.5)) / gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0,
      ]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.scale(mattrans, mattrans, [
        ((2 * plotBounds.width) / gl.width), 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
    }
    // Draw y-axis
    if (this.visible[1]) {
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans, [
        ((2 * (plotBounds.x + 0.5)) / gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [
        ((2 * plotBounds.height) / gl.height), 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
    }

    // >>> Draw ticks and tick labels

    // Draw x-axis ticks and tick labels
    xTickLabelTop = 0;
    if (this.visible[0]) {
      const axis = axes[0];
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans, [
        ((2 * (plotBounds.x + 0.5)) / gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, -Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [
        (2 * axis.tickLength) / gl.height, (2 * plotBounds.width) / gl.width, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, 1.0, 0.0]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();
      libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -1.0, 0.0]);
      for (let i = 0; i < axis.tickCount; i += 1) {
        const x = axis.tickOffset + (i * axis.tickDistance);
        const tickPos = (x - axis.minimum) / (axis.maximum - axis.minimum);

        libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, tickPos, 0.0]);
        sdrLine.matWorldViewProj(mattrans);
        meshLine.draw();
        libGlMatrix.mat4.translate(mattrans, mattrans, [0.0, -tickPos, 0.0]);

        const tickLabel = axis.values ? axis.values[x] : x.toPrecision(6) / 1;
        gl.drawText(
          tickLabel, plotBounds.x + (plotBounds.width * tickPos),
          (gl.height - plotBounds.y) + axis.tickLength + 2, 'topcenter',
        );
      }
      xTickLabelTop = (gl.height - plotBounds.y) + axis.tickLength + 10 + gl.measureTextHeight();
    }
    // Draw y-axis ticks and tick labels
    yTickLabelLeft = 0;
    if (this.visible[1]) {
      const axis = axes[1];
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans, [
        ((2 * (plotBounds.x + 0.5)) / gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.scale(mattrans, mattrans, [
        (-2 * axis.tickLength) / gl.width,
        (2 * plotBounds.height) / gl.height, 1]);
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
        yTickLabelLeft = Math.max(yTickLabelLeft, gl.measureTextWidth(tickLabel));
        gl.drawText(
          tickLabel, plotBounds.x - axis.tickLength - 2,
          gl.height - plotBounds.y - (plotBounds.height * tickPos), 'middleright',
        );
      }
      yTickLabelLeft = Math.ceil(plotBounds.x - axis.tickLength - 10 - yTickLabelLeft);
    }

    // >>> Draw axis labels

    // Draw x-axis label
    if (this.visible[0] && axes[0].label) {
      gl.drawText(axes[0].label, plotBounds.x + (plotBounds.width / 2), xTickLabelTop, 'topcenter');
    }
    if (this.visible[1] && axes[1].label) {
      gl.drawText(
        axes[1].label, yTickLabelLeft,
        gl.height - plotBounds.y - (plotBounds.height / 2), 'bottomcenter', -Math.PI / 2,
      );
    }
  };

  function checkOverlap(d) {
    // Minimum distance between tick labels in pixel
    const MIN_TICK_LABEL_DISTANCE = gl.measureTextWidth('  ');
    let axis;
    let plotBounds;
    let overlap;
    switch (d) {
      case 0:
        axis = axes[0];
        overlap = Number.MIN_VALUE;
        plotBounds = globalView.getPlotBounds();
        for (let i = 0; i < axis.tickCount; i += 1) {
          const x = axis.tickOffset + (i * axis.tickDistance);
          const tickPos = (x - axis.minimum) / (axis.maximum - axis.minimum);

          const tickLabel = axis.values ? axis.values[x] : x.toPrecision(6) / 1;

          const labelWidth = gl.measureTextWidth(tickLabel);
          const leftLabelBound = (plotBounds.x + (plotBounds.width * tickPos)) - (labelWidth / 2);
          if (leftLabelBound < overlap + MIN_TICK_LABEL_DISTANCE) {
            return false;
          }

          overlap = leftLabelBound + labelWidth;
        }
        return true;

      case 1:
        axis = axes[1];
        plotBounds = globalView.getPlotBounds();
        return (plotBounds.height * axis.tickDistance) / (axis.maximum - axis.minimum) >=
          gl.measureTextHeight() + MIN_TICK_LABEL_DISTANCE;

      default: return true;
    }
  }

  /**
   * Sets the numerical axis range for a dimension
   * @param  {number} dim dimension index
   * @param  {number} rangeMin axis range minimum
   * @param  {number} rangeMax axis range maximum
   * @param  {boolean=} changeTickDistance=true
   */
  this.setNumericRange = function (dim, rangeMin, rangeMax, changeTickDistance) {
    const axis = axes[dim];
    axis.minimum = rangeMin;
    axis.maximum = rangeMax;
    axis.values = null;

    for (let numTicks = NUM_TICKS; numTicks >= 0; numTicks -= 1) {
      if (changeTickDistance === false) {
        axis.tickOffset = Math.ceil(rangeMin / axis.tickDistance) * axis.tickDistance;
        axis.tickCount = Math.floor((rangeMax - axis.tickOffset) / axis.tickDistance) + 1;
      } else {
        axis.tickDistance = (rangeMax - rangeMin) / numTicks;
        // Compute power-of-10 just above tickDistance -> pow(10, exp)
        let exp = Math.ceil(Math.log(axis.tickDistance) / Math.log(10));

        // Try less aggressive rounding in each iteration until break condition is met
        for (let i = 0; i < 10; i += 1) {
          // Maximum 10 iterations
          axis.tickDistance = (rangeMax - rangeMin) / numTicks;
          const base = (10 ** exp);
          exp -= 1;
          // Round tickDistance to base
          axis.tickDistance = Math.round(axis.tickDistance / base) * base;
          axis.tickOffset = Math.ceil(rangeMin / axis.tickDistance) * axis.tickDistance;
          axis.tickCount = Math.floor((rangeMax - axis.tickOffset) / axis.tickDistance) + 1;
          if (axis.tickCount >= numTicks - 2 && axis.tickCount <= numTicks + 2) {
            // Condition: numTicks - 2 <= tickCount <= numTicks + 2
            break;
          }
        }
      }

      if (checkOverlap(dim)) {
        break;
      }
    }
  };

  /**
   * Sets the numerical axis range for a dimension
   * @param  {number} dim dimension index
   * @param  {number} rangeMin axis range minimum
   * @param  {number} rangeMax axis range maximum
   * @param {Object.<number, string>} values tick labels
   */
  this.setEnumRange = function (dim, rangeMin, rangeMax, values) {
    const axis = axes[dim];
    const minimum = rangeMin - 0.5; // 0.5 ... Move to center of value-bin
    const maximum = rangeMax - 0.5; // 0.5 ... Move to center of value-bin
    axis.minimum = minimum;
    axis.maximum = maximum;
    axis.values = values;

    axis.tickDistance = 1;
    axis.tickOffset = Math.max(0, Math.ceil(minimum / axis.tickDistance) * axis.tickDistance);
    axis.tickCount = Math.min(
      values.length - axis.tickOffset,
      Math.floor(((maximum - axis.tickOffset) + 1) / axis.tickDistance),
    );
  };
  this.setLabel = function (d, label) {
    axes[d].label = label;
  };

  this.setDataset = function (/* dataset, options */) {};
  this.onInputChanged = function (/* activeInputs, animatedInputs, options */) {};
  this.onOptionsChanged = function (options) {
    axes[0].tickLength = TICK_LENGTH + (options.showXAxisHistogram ? options.histogramHeight : 0);
    axes[1].tickLength = TICK_LENGTH + (options.showYAxisHistogram ? options.histogramHeight : 0);
  };
  this.onPlotBoundsChanged = function (/* plotBounds */) {
    for (let i = 0; i < 2; i += 1) {
      if (axes[i].values === null) {
        this.setNumericRange(i, axes[i].minimum, axes[i].maximum, true);
      } else {
        this.setEnumRange(i, axes[i].minimum + 0.5, axes[i].maximum + 0.5, axes[i].values);
      }
    }
  };

  /**
   * Checks if a point in inside one of the axis labels and returns the axis
   * @param {Object} plotBounds
   * @param {number} plotBounds.x
   * @param {number} plotBounds.y
   * @param {number} plotBounds.width
   * @param {number} plotBounds.height
   * @param {number[]} point point to check: [px, py]
   * @returns 0 for x-axis, 1 for y axis, null if the point was not inside any of the axis labels,
   *          or if the axis was invisible.
   */
  this.labelFromPoint = function (plotBounds, point) {
    if (this.visible[0]) {
      const halfTextWidth = gl.measureTextWidth(axes[0].label) / 2;
      const plotCenter = plotBounds.x + (plotBounds.width / 2);
      if (point[0] >= plotCenter - halfTextWidth &&
        point[0] < plotCenter + halfTextWidth &&
        point[1] >= xTickLabelTop &&
        point[1] <= xTickLabelTop + gl.measureTextHeight() + 2) {
        return 0;
      }
    }
    if (this.visible[1]) {
      const halfTextWidth = gl.measureTextWidth(axes[1].label) / 2;
      const plotCenter = gl.height - plotBounds.y - (plotBounds.height / 2);
      if (point[0] >= yTickLabelLeft - gl.measureTextHeight() &&
        point[0] <= yTickLabelLeft + 2 &&
        point[1] >= plotCenter - halfTextWidth &&
        point[1] < plotCenter + halfTextWidth) {
        return 1;
      }
    }
    return null;
  };

  /**
   * Returns the rectangular bounds of one of the axis
   * @param {Object} plotBounds -
   * @param {number} plotBounds.x -
   * @param {number} plotBounds.y -
   * @param {number} plotBounds.width -
   * @param {number} plotBounds.height -
   * @param {number} axis - 0 for x-axis and 1 for y-axis
   * @return {Object<string, number>} label bounds {l: left, r: right, t: top, b: bottom}.
   * null if the axis is invisible or an incorrect axis was specified.
   */
  this.getLabelBounds = function (plotBounds, axis) {
    switch (axis) {
      case 0: {
        if (!this.visible[0]) {
          return null;
        }
        const halfTextWidth = gl.measureTextWidth(axes[0].label) / 2;
        const plotCenter = plotBounds.x + (plotBounds.width / 2);
        return {
          l: plotCenter - halfTextWidth,
          r: plotCenter + halfTextWidth,
          t: xTickLabelTop,
          b: xTickLabelTop + gl.measureTextHeight() + 2,
        };
      }

      case 1: {
        if (!this.visible[1]) {
          return null;
        }
        const halfTextWidth = gl.measureTextWidth(axes[1].label) / 2;
        const plotCenter = gl.height - plotBounds.y - (plotBounds.height / 2);
        return {
          l: yTickLabelLeft - gl.measureTextHeight(),
          r: yTickLabelLeft + 2,
          t: plotCenter - halfTextWidth,
          b: plotCenter + halfTextWidth,
        };
      }
      default:
        break;
    }
    return null;
  };

  this.free = function () {
    meshLine.free();
  };
}
