import { mat4, vec3 } from 'gl-matrix';
import { Shader, Mesh } from './graphics';
import Shaders from './shaders';
import { computeHistogram } from './algorithm';
import Colormap from './colormap';

/**
 * A class drawing histograms for x-, y- and color axes to
 * the left-, bottom- and right of the scatter plot.
 */
export default class HistogramViewer {
  /**
   * @constructor
   * @package
   * @implements {Viewer}
   * @param {Object} gl // {WebGLRenderingContext}
   */
  constructor(gl) {
    this.gl = gl;
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

    this.dataset = null;
    this.activeInputs = null;
    this.options = {};
    this.axes = [
      {
        histogram: null,
        d: -1,
        meshHistogram: new Mesh(
          gl,
          new Float32Array(0), null, null, null, null, null, gl.TRIANGLES,
        ),
        meshLineHistogram: new Mesh(
          gl,
          new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP,
        ),
      },
      {
        histogram: null,
        d: -1,
        meshHistogram: new Mesh(
          gl,
          new Float32Array(0), null, null, null, null, null, gl.TRIANGLES,
        ),
        meshLineHistogram: new Mesh(
          gl,
          new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP,
        ),
      },
      {
        histogram: null,
        d: -1,
        meshHistogram: new Mesh(
          gl,
          new Float32Array(0), null, null, null, null, null, gl.TRIANGLES,
        ),
        meshLineHistogram: new Mesh(
          gl,
          new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP,
        ),
      },
    ];
  }

  render(flipY, tf, plotBounds) {
    const mattrans = mat4.create();

    const pos = vec3.create();
    const scl = vec3.create();
    tf.datasetCoordToDeviceCoord(pos, [
      this.axes[0].histogram ? this.axes[0].histogram.invTransformX(0) : 0.0,
      this.axes[1].histogram ? this.axes[1].histogram.invTransformX(0) : 0.0,
      this.axes[2].histogram ? this.axes[2].histogram.invTransformX(0) : 0.0]);
    tf.datasetDistToDeviceDist(scl, [
      this.axes[0].histogram ?
        this.axes[0].histogram.width / this.axes[0].histogram.transform[0] : 1.0,
      this.axes[1].histogram ?
        this.axes[1].histogram.width / this.axes[1].histogram.transform[0] : 1.0,
      this.axes[2].histogram ?
        this.axes[2].histogram.width / this.axes[2].histogram.transform[0] : 1.0]);

    // Transform color-dimension from [0 ... 1] to
    // [plotBounds.y .. plotBounds.y + plotBounds.height] in device y-space -> pos[2], scl[2]
    pos[2] = (((plotBounds.y + (plotBounds.height * pos[2])) * 2) / this.gl.height) - 1;
    scl[2] = ((plotBounds.height * scl[2]) * 2) / this.gl.height;

    // Draw x-axis histogram
    if (this.options.showXAxisHistogram && this.axes[0].histogram) {
      const axis = this.axes[0];
      this.gl.enable(this.gl.SCISSOR_TEST);
      this.gl.scissor(plotBounds.x, 0.0, plotBounds.width, this.gl.height);

      this.sdrLine.bind();
      this.meshLine.bind(this.sdrLine, null);
      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(
        mattrans,
        mattrans,
        [((2 * (plotBounds.x + 0.5)) / this.gl.width) - 1,
          ((2 * ((plotBounds.y + 0.5) - 64)) / this.gl.height) - 1, 0],
      ); // 0.5 ... center inside pixel
      mat4.scale(mattrans, mattrans, [(2 * plotBounds.width) / this.gl.width, 1, 1]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();

      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(
        mattrans, mattrans,
        [pos[0] + ((0.5 * 2) / this.gl.width),
          ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0.0],
      ); // 0.5 ... center inside pixel
      mat4.scale(mattrans, mattrans, [scl[0], (-64 * 2) / this.gl.height, 1.0]);

      this.sdrLine.bind();
      this.sdrLine.matWorldViewProj(mattrans);
      this.sdrLine.color.apply(this.sdrLine, [
        this.gl.foreColor[0], this.gl.foreColor[1], this.gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(this.sdrLine, null);
      axis.meshHistogram.draw();

      this.sdrLine.color(...this.gl.foreColor);
      axis.meshLineHistogram.bind(this.sdrLine, null);
      axis.meshLineHistogram.draw();

      this.gl.disable(this.gl.SCISSOR_TEST);
    }

    // Draw y-axis histogram
    if (this.options.showYAxisHistogram && this.axes[1].histogram) {
      const axis = this.axes[1];
      this.gl.enable(this.gl.SCISSOR_TEST);
      this.gl.scissor(0.0, flipY ?
        this.gl.height - plotBounds.y - plotBounds.height :
        plotBounds.y, this.gl.width, plotBounds.height);

      this.sdrLine.bind();
      this.meshLine.bind(this.sdrLine, null);
      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(
        mattrans,
        mattrans, [((2 * ((plotBounds.x + 0.5) - 64)) / this.gl.width) - 1,
          ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0],
      ); // 0.5 ... center inside pixel
      mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      mat4.scale(mattrans, mattrans, [(2 * plotBounds.height) / this.gl.height, 1, 1]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();

      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(
        mattrans, mattrans,
        [((2 * (plotBounds.x + 0.5)) / this.gl.width) - 1,
          pos[1] + ((0.5 * 2) / this.gl.height), 0.0],
      ); // 0.5 ... center inside pixel
      mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      mat4.scale(mattrans, mattrans, [scl[1], (64 * 2) / this.gl.width, 1.0]);

      this.sdrLine.bind();
      this.sdrLine.matWorldViewProj(mattrans);
      this.sdrLine.color.apply(this.sdrLine, [
        this.gl.foreColor[0], this.gl.foreColor[1], this.gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(this.sdrLine, null);
      axis.meshHistogram.draw();

      this.sdrLine.color(...this.gl.foreColor);
      axis.meshLineHistogram.bind(this.sdrLine, null);
      axis.meshLineHistogram.draw();

      this.gl.disable(this.gl.SCISSOR_TEST);
    }

    // Draw color-axis histogram
    if (this.options.showColormapHistogram && this.axes[2].histogram) {
      const axis = this.axes[2];
      this.gl.enable(this.gl.SCISSOR_TEST);
      this.gl.scissor(0.0, flipY ?
        this.gl.height - plotBounds.y - plotBounds.height :
        plotBounds.y, this.gl.width, plotBounds.height);

      this.sdrLine.bind();
      this.meshLine.bind(this.sdrLine, null);
      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(
        mattrans, mattrans,
        [((2 * (plotBounds.x + plotBounds.width + Colormap.getWidth() + 0.5 + 64)) /
          this.gl.width) - 1,
        ((2 * (plotBounds.y + 0.5)) / this.gl.height) - 1, 0],
      ); // 0.5 ... center inside pixel
      mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      mat4.scale(mattrans, mattrans, [(2 * plotBounds.height) / this.gl.height, 1, 1]);
      this.sdrLine.matWorldViewProj(mattrans);
      this.meshLine.draw();

      mat4.identity(mattrans);
      if (flipY === true) {
        mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      mat4.translate(
        mattrans, mattrans,
        [((2 * (plotBounds.x + plotBounds.width + Colormap.getWidth() + 0.5)) /
          this.gl.width) - 1,
        pos[2] + ((0.5 * 2) / this.gl.height), 0.0],
      ); // 0.5 ... center inside pixel
      mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      mat4.scale(mattrans, mattrans, [scl[2], (-64 * 2) / this.gl.width, 1.0]);

      this.sdrLine.bind();
      this.sdrLine.matWorldViewProj(mattrans);
      this.sdrLine.color.apply(this.sdrLine, [
        this.gl.foreColor[0], this.gl.foreColor[1], this.gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(this.sdrLine, null);
      axis.meshHistogram.draw();

      this.sdrLine.color(...this.gl.foreColor);
      axis.meshLineHistogram.bind(this.sdrLine, null);
      axis.meshLineHistogram.draw();

      this.gl.disable(this.gl.SCISSOR_TEST);
    }
  }

  setDataset(dataset /* , options */) {
    this.dataset = dataset;
    this.recreateHistograms();
  }

  onOptionsChanged(options /* , recompileShader */) {
    this.options = options;
    this.recreateHistograms();
  }

  onInputChanged(activeInputs /* , animatedInputs, options */) {
    this.activeInputs = activeInputs;
    this.recreateHistograms();
  }

  onPlotBoundsChanged(/* plotBounds */) {} // eslint-disable-line class-methods-use-this

  recreateHistograms() {
    if (this.dataset && this.options.histogramHeight > 0) {
      const numBins = this.options.numHistogramBins;
      if (this.options.showXAxisHistogram) {
        this.createHistogram(this.axes[0], this.dataset, this.activeInputs[0], numBins);
      }
      if (this.options.showYAxisHistogram) {
        this.createHistogram(this.axes[1], this.dataset, this.activeInputs[1], numBins);
      }
      if (this.options.showColormapHistogram) {
        this.createHistogram(this.axes[2], this.dataset, this.activeInputs[2], numBins);
      }
    }
  }

  createHistogram(pAxis, pDataset, d, numBins) {
    const axis = pAxis;
    if (d < 0 || d >= pDataset.dataVectors.length) {
      return;
    } // Validate inputs
    if (axis.histogram && axis.histogram.width === numBins && axis.d === d) {
      return;
    } // Requested histogram already exists

    axis.histogram = computeHistogram(pDataset, axis.d = d, numBins);
    // Add 2D transformation functions
    axis.histogram.transformX = function (x) {
      return (axis.histogram.transform[0] * x) + axis.histogram.transform[1];
    };
    axis.histogram.transformY = function (y) {
      return (axis.histogram.transform[2] * y) + axis.histogram.transform[3];
    };
    axis.histogram.invTransformX = function (x) {
      return (x - axis.histogram.transform[1]) / axis.histogram.transform[0];
    };
    axis.histogram.invTransformY = function (y) {
      return (y - axis.histogram.transform[3]) / axis.histogram.transform[2];
    };

    let positions = new Float32Array((6 * numBins) * 3);
    const v3Set = function (pi, x, y) {
      let i = pi * 3;
      positions[i] = x; i += 1;
      positions[i] = y; i += 1;
      positions[i] = 0.0; i += 1;
    };
    for (let b = 0, i = -1, xScale = 1 / numBins; b < numBins; b += 1) {
      const y = axis.histogram.data[b] / axis.histogram.maximum;

      v3Set(i += 1, (b + 0) * xScale, 0);
      v3Set(i += 1, (b + 1) * xScale, 0);
      v3Set(i += 1, (b + 1) * xScale, y);

      v3Set(i += 1, (b + 1) * xScale, y);
      v3Set(i += 1, (b + 0) * xScale, y);
      v3Set(i += 1, (b + 0) * xScale, 0);
    }
    axis.meshHistogram.reset(positions, null, null, null, null, null, this.gl.TRIANGLES);

    positions = new Float32Array(((3 * numBins) + 1) * 3);
    v3Set(0, 0, 0);
    for (let b = 0, i = 0, xScale = 1 / numBins; b < numBins;) {
      const y = axis.histogram.data[b] / axis.histogram.maximum;

      v3Set(i += 1, b * xScale, y);
      v3Set(i += 1, (b += 1) * xScale, y);
      v3Set(i += 1, b * xScale, 0);
    }
    axis.meshLineHistogram.reset(positions, null, null, null, null, null, this.gl.LINE_STRIP);
  }
}
