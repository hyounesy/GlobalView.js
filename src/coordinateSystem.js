import { mat4 } from 'gl-matrix';
import { Shader, Mesh } from './graphics';
import Shaders from './shaders';

/**
 * A class drawing x- and y axes to the left- and bottom of the scatter plot.
 */
export default class CoordinateSystem {
  /**
  * @constructor
  * @package
  * @implements {Viewer}
  * @param {WebGLRenderingContext} gl - webgl render context
  * @param {GlobalView} plot - GlobalView plot
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

    // Create a 2D line mesh
    this.meshLine = new Mesh(gl, new Float32Array([
      // Positions
      0, 0, 0,
      1, 0, 0,
    ]), null, null, null, null, null, gl.LINES);

    this.axes = [
      {
        minimum: 0,
        maximum: 100,
        values: null,
        tickOffset: 0,
        tickDistance: 10,
        tickCount: 11,
        tickLength: this.TICK_LENGTH,
      },
      {
        minimum: 0,
        maximum: 100,
        values: null,
        tickOffset: 0,
        tickDistance: 10,
        tickCount: 11,
        tickLength: this.TICK_LENGTH,
      },
    ];

    /** @type {number} */
    this.xTickLabelTop = 0;

    /** @type {number} */
    this.yTickLabelLeft = 0;

    this.visible = [true, true];

    this.setDataset = (/* dataset, options */) => {};
    this.onInputChanged = (/* activeInputs, animatedInputs, options */) => {};
  }

  /**
   * updates the axis color schema
   */
  updateColorSchema() {
    this.sdrLine.color(...this.gl.foreColor);
  }

  /**
   * Draw the axis
   * @param {boolean} flipY
   * @param {Object} plotBounds -
   * @param {number} plotBounds.x -
   * @param {number} plotBounds.y -
   * @param {number} plotBounds.width -
   * @param {number} plotBounds.height -
   */
  render(flipY, plotBounds) {
    const mattrans = mat4.create();

    // >>> Draw axes

    this.sdrLine.bind();
    this.meshLine.bind(this.sdrLine, null);
    // Draw x-axis
    if (this.visible[0]) {
      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(mattrans, mattrans, [
        ((2 * (plotBounds.x + 0.5)) / this.gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0,
      ]); // 0.5 ... center inside pixel
      mat4.scale(mattrans, mattrans, [
        ((2 * plotBounds.width) / this.gl.width), 1, 1]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();
    }
    // Draw y-axis
    if (this.visible[1]) {
      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(mattrans, mattrans, [
        ((2 * (plotBounds.x + 0.5)) / this.gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0]); // 0.5 ... center inside pixel
      mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      mat4.scale(mattrans, mattrans, [
        ((2 * plotBounds.height) / this.gl.height), 1, 1]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();
    }

    // >>> Draw ticks and tick labels

    // Draw x-axis ticks and tick labels
    this.xTickLabelTop = 0;
    if (this.visible[0]) {
      const axis = this.axes[0];
      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(mattrans, mattrans, [
        ((2 * (plotBounds.x + 0.5)) / this.gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0]); // 0.5 ... center inside pixel
      mat4.rotateZ(mattrans, mattrans, -Math.PI / 2.0);
      mat4.scale(mattrans, mattrans, [
        (2 * axis.tickLength) / this.gl.height, (2 * plotBounds.width) / this.gl.width, 1]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();
      mat4.translate(mattrans, mattrans, [0.0, 1.0, 0.0]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();
      mat4.translate(mattrans, mattrans, [0.0, -1.0, 0.0]);
      for (let i = 0; i < axis.tickCount; i += 1) {
        const x = axis.tickOffset + (i * axis.tickDistance);
        const tickPos = (x - axis.minimum) / (axis.maximum - axis.minimum);

        mat4.translate(mattrans, mattrans, [0.0, tickPos, 0.0]);
        this.sdrLine.matWorldViewProj(mattrans);
        this.meshLine.draw();
        mat4.translate(mattrans, mattrans, [0.0, -tickPos, 0.0]);

        const tickLabel = axis.values ? axis.values[x] : x.toPrecision(6) / 1;
        this.gl.drawText(
          tickLabel, plotBounds.x + (plotBounds.width * tickPos),
          (this.gl.height - plotBounds.y) + axis.tickLength + 2, 'topcenter',
        );
      }
      this.xTickLabelTop = (this.gl.height - plotBounds.y) + axis.tickLength + 10 +
        this.gl.measureTextHeight();
    }
    // Draw y-axis ticks and tick labels
    this.yTickLabelLeft = 0;
    if (this.visible[1]) {
      const axis = this.axes[1];
      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(mattrans, mattrans, [
        ((2 * (plotBounds.x + 0.5)) / this.gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0]); // 0.5 ... center inside pixel
      mat4.scale(mattrans, mattrans, [
        (-2 * axis.tickLength) / this.gl.width,
        (2 * plotBounds.height) / this.gl.height, 1]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();
      mat4.translate(mattrans, mattrans, [0.0, 1.0, 0.0]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();
      mat4.translate(mattrans, mattrans, [0.0, -1.0, 0.0]);
      for (let i = 0; i < axis.tickCount; i += 1) {
        const y = axis.tickOffset + (i * axis.tickDistance);
        const tickPos = (y - axis.minimum) / (axis.maximum - axis.minimum);

        mat4.translate(mattrans, mattrans, [0.0, tickPos, 0.0]);
        this.sdrLine.matWorldViewProj(mattrans);
        this.meshLine.draw();
        mat4.translate(mattrans, mattrans, [0.0, -tickPos, 0.0]);

        const tickLabel = axis.values ? axis.values[y] : y.toPrecision(6) / 1;
        this.yTickLabelLeft = Math.max(this.yTickLabelLeft, this.gl.measureTextWidth(tickLabel));
        this.gl.drawText(
          tickLabel, plotBounds.x - axis.tickLength - 2,
          this.gl.height - plotBounds.y - (plotBounds.height * tickPos), 'middleright',
        );
      }
      this.yTickLabelLeft = Math.ceil(plotBounds.x - axis.tickLength - 10 - this.yTickLabelLeft);
    }

    // >>> Draw axis labels

    // Draw x-axis label
    if (this.visible[0] && this.axes[0].label) {
      this.gl.drawText(
        this.axes[0].label,
        plotBounds.x + (plotBounds.width / 2),
        this.xTickLabelTop, 'topcenter',
      );
    }
    if (this.visible[1] && this.axes[1].label) {
      this.gl.drawText(
        this.axes[1].label,
        this.yTickLabelLeft,
        this.gl.height - plotBounds.y - (plotBounds.height / 2),
        'bottomcenter',
        -Math.PI / 2,
      );
    }
  }

  checkOverlap(d) {
    // Minimum distance between tick labels in pixel
    const MIN_TICK_LABEL_DISTANCE = this.gl.measureTextWidth('  ');
    let axis;
    let plotBounds;
    let overlap;
    switch (d) {
      case 0:
        axis = this.axes[0];
        overlap = Number.MIN_VALUE;
        plotBounds = this.plot.getPlotBounds();
        for (let i = 0; i < axis.tickCount; i += 1) {
          const x = axis.tickOffset + (i * axis.tickDistance);
          const tickPos = (x - axis.minimum) / (axis.maximum - axis.minimum);

          const tickLabel = axis.values ? axis.values[x] : x.toPrecision(6) / 1;

          const labelWidth = this.gl.measureTextWidth(tickLabel);
          const leftLabelBound = (plotBounds.x + (plotBounds.width * tickPos)) - (labelWidth / 2);
          if (leftLabelBound < overlap + MIN_TICK_LABEL_DISTANCE) {
            return false;
          }

          overlap = leftLabelBound + labelWidth;
        }
        return true;

      case 1:
        axis = this.axes[1];
        plotBounds = this.plot.getPlotBounds();
        return (plotBounds.height * axis.tickDistance) / (axis.maximum - axis.minimum) >=
          this.gl.measureTextHeight() + MIN_TICK_LABEL_DISTANCE;

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
  setNumericRange(dim, rangeMin, rangeMax, changeTickDistance) {
    const axis = this.axes[dim];
    axis.minimum = rangeMin;
    axis.maximum = rangeMax;
    axis.values = null;

    for (let numTicks = this.NUM_TICKS; numTicks >= 0; numTicks -= 1) {
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

      if (this.checkOverlap(dim)) {
        break;
      }
    }
  }

  /**
   * Sets the numerical axis range for a dimension
   * @param  {number} dim dimension index
   * @param  {number} rangeMin axis range minimum
   * @param  {number} rangeMax axis range maximum
   * @param {Object.<number, string>} values tick labels
   */
  setEnumRange(dim, rangeMin, rangeMax, values) {
    const axis = this.axes[dim];
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
  }

  setLabel(d, label) {
    this.axes[d].label = label;
  }

  onOptionsChanged(options) {
    this.axes[0].tickLength = this.TICK_LENGTH +
      (options.showXAxisHistogram ? options.histogramHeight : 0);
    this.axes[1].tickLength = this.TICK_LENGTH +
      (options.showYAxisHistogram ? options.histogramHeight : 0);
  }

  onPlotBoundsChanged(/* plotBounds */) {
    for (let i = 0; i < 2; i += 1) {
      if (this.axes[i].values === null) {
        this.setNumericRange(i, this.axes[i].minimum, this.axes[i].maximum, true);
      } else {
        this.setEnumRange(
          i, this.axes[i].minimum + 0.5,
          this.axes[i].maximum + 0.5, this.axes[i].values,
        );
      }
    }
  }

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
  labelFromPoint(plotBounds, point) {
    if (this.visible[0]) {
      const halfTextWidth = this.gl.measureTextWidth(this.axes[0].label) / 2;
      const plotCenter = plotBounds.x + (plotBounds.width / 2);
      if (point[0] >= plotCenter - halfTextWidth &&
        point[0] < plotCenter + halfTextWidth &&
        point[1] >= this.xTickLabelTop &&
        point[1] <= this.xTickLabelTop + this.gl.measureTextHeight() + 2) {
        return 0;
      }
    }
    if (this.visible[1]) {
      const halfTextWidth = this.gl.measureTextWidth(this.axes[1].label) / 2;
      const plotCenter = this.gl.height - plotBounds.y - (plotBounds.height / 2);
      if (point[0] >= this.yTickLabelLeft - this.gl.measureTextHeight() &&
        point[0] <= this.yTickLabelLeft + 2 &&
        point[1] >= plotCenter - halfTextWidth &&
        point[1] < plotCenter + halfTextWidth) {
        return 1;
      }
    }
    return null;
  }

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
  getLabelBounds(plotBounds, axis) {
    switch (axis) {
      case 0: {
        if (!this.visible[0]) {
          return null;
        }
        const halfTextWidth = this.gl.measureTextWidth(this.axes[0].label) / 2;
        const plotCenter = plotBounds.x + (plotBounds.width / 2);
        return {
          l: plotCenter - halfTextWidth,
          r: plotCenter + halfTextWidth,
          t: this.xTickLabelTop,
          b: this.xTickLabelTop + this.gl.measureTextHeight() + 2,
        };
      }

      case 1: {
        if (!this.visible[1]) {
          return null;
        }
        const halfTextWidth = this.gl.measureTextWidth(this.axes[1].label) / 2;
        const plotCenter = this.gl.height - plotBounds.y - (plotBounds.height / 2);
        return {
          l: this.yTickLabelLeft - this.gl.measureTextHeight(),
          r: this.yTickLabelLeft + 2,
          t: plotCenter - halfTextWidth,
          b: plotCenter + halfTextWidth,
        };
      }
      default:
        break;
    }
    return null;
  }

  free() {
    this.meshLine.free();
  }
}
