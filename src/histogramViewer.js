const libGraphics = require('./graphics.js');
const libShaders = require('./shaders.js');
const libAlgorithm = require('./algorithm.js');
const libColormap = require('./colormap.js');
const libGlMatrix = require('gl-matrix');

/**
 * A class drawing histograms for x-, y- and color axes to the left-, bottom- and right of the scatter plot.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */
export function HistogramViewer(gl, globalView) {
  const sdrLine = new libGraphics.Shader(gl, libShaders.Shaders.vsSimple, libShaders.Shaders.fsLine);
  sdrLine.color = sdrLine.u4f('color');
  sdrLine.color(...gl.foreColor);
  sdrLine.matWorldViewProj = sdrLine.u4x4f('matWorldViewProj');

  /* this.updateColorSchema = function() {
    sdrLine.color.apply(sdrLine, gl.foreColor);
  } */

  // Create a 2D line mesh
  const meshLine = new libGraphics.Mesh(gl, new Float32Array([
    // Positions
    0, 0, 0,
    1, 0, 0,
  ]), null, null, null, null, null, gl.LINES);

  let dataset = null,
    activeInputs = null,
    options = {};
  const axes = [
    {histogram: null, d: -1, meshHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.TRIANGLES), meshLineHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP)},
    {histogram: null, d: -1, meshHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.TRIANGLES), meshLineHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP)},
    {histogram: null, d: -1, meshHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.TRIANGLES), meshLineHistogram: new libGraphics.Mesh(gl, new Float32Array(0), null, null, null, null, null, gl.LINE_STRIP)},
  ];

  this.render = function (flipY, tf, plotBounds) {
    const mattrans = libGlMatrix.mat4.create();

    const pos = libGlMatrix.vec3.create();
    const scl = libGlMatrix.vec3.create();
    tf.datasetCoordToDeviceCoord(pos, [
      axes[0].histogram ? axes[0].histogram.invTransformX(0) : 0.0,
      axes[1].histogram ? axes[1].histogram.invTransformX(0) : 0.0,
      axes[2].histogram ? axes[2].histogram.invTransformX(0) : 0.0],
    );
    tf.datasetDistToDeviceDist(scl, [
      axes[0].histogram ? axes[0].histogram.width / axes[0].histogram.transform[0] : 1.0,
      axes[1].histogram ? axes[1].histogram.width / axes[1].histogram.transform[0] : 1.0,
      axes[2].histogram ? axes[2].histogram.width / axes[2].histogram.transform[0] : 1.0],
    );

    // Transform color-dimension from [0 ... 1] to [plotBounds.y .. plotBounds.y + plotBounds.height] in device y-space -> pos[2], scl[2]
    pos[2] = (((plotBounds.y + (plotBounds.height * pos[2])) * 2) / gl.height) - 1;
    scl[2] = ((plotBounds.height * scl[2]) * 2) / gl.height;

    // Draw x-axis histogram
    if (options.showXAxisHistogram && axes[0].histogram) {
      const axis = axes[0];
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(plotBounds.x, 0.0, plotBounds.width, gl.height);

      sdrLine.bind();
      meshLine.bind(sdrLine, null);
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans, [((2 * (plotBounds.x + 0.5)) / gl.width) - 1, ((2 * ((plotBounds.y + 0.5) - 64)) / gl.height) - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.scale(mattrans, mattrans, [(2 * plotBounds.width) / gl.width, 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();

      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans, [pos[0] + ((0.5 * 2) / gl.width), ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0.0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.scale(mattrans, mattrans, [scl[0], (-64 * 2) / gl.height, 1.0]);

      sdrLine.bind();
      sdrLine.matWorldViewProj(mattrans);
      sdrLine.color.apply(sdrLine, [gl.foreColor[0], gl.foreColor[1], gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(sdrLine, null);
      axis.meshHistogram.draw();

      sdrLine.color(...gl.foreColor);
      axis.meshLineHistogram.bind(sdrLine, null);
      axis.meshLineHistogram.draw();

      gl.disable(gl.SCISSOR_TEST);
    }

    // Draw y-axis histogram
    if (options.showYAxisHistogram && axes[1].histogram) {
      const axis = axes[1];
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(0.0, flipY ? gl.height - plotBounds.y - plotBounds.height : plotBounds.y, gl.width, plotBounds.height);

      sdrLine.bind();
      meshLine.bind(sdrLine, null);
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans, [((2 * ((plotBounds.x + 0.5) - 64)) / gl.width) - 1, ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [(2 * plotBounds.height) / gl.height, 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();

      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans, [((2 * (plotBounds.x + 0.5)) / gl.width) - 1, pos[1] + ((0.5 * 2) / gl.height), 0.0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [scl[1], (64 * 2) / gl.width, 1.0]);

      sdrLine.bind();
      sdrLine.matWorldViewProj(mattrans);
      sdrLine.color.apply(sdrLine, [gl.foreColor[0], gl.foreColor[1], gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(sdrLine, null);
      axis.meshHistogram.draw();

      sdrLine.color(...gl.foreColor);
      axis.meshLineHistogram.bind(sdrLine, null);
      axis.meshLineHistogram.draw();

      gl.disable(gl.SCISSOR_TEST);
    }

    // Draw color-axis histogram
    if (options.showColormapHistogram && axes[2].histogram) {
      const axis = axes[2];
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(0.0, flipY ? gl.height - plotBounds.y - plotBounds.height : plotBounds.y, gl.width, plotBounds.height);

      sdrLine.bind();
      meshLine.bind(sdrLine, null);
      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans,
        [((2 * (plotBounds.x + plotBounds.width + libColormap.COLORMAP_WIDTH + 0.5 + 64)) / gl.width) - 1,
          ((2 * (plotBounds.y + 0.5)) / gl.height) - 1, 0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [(2 * plotBounds.height) / gl.height, 1, 1]);
      sdrLine.matWorldViewProj(mattrans);
      meshLine.draw();

      libGlMatrix.mat4.identity(mattrans);
      if (flipY === true) {
        libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
      }
      libGlMatrix.mat4.translate(mattrans, mattrans,
        [((2 * (plotBounds.x + plotBounds.width + libColormap.COLORMAP_WIDTH + 0.5)) / gl.width) - 1,
          pos[2] + ((0.5 * 2) / gl.height), 0.0]); // 0.5 ... center inside pixel
      libGlMatrix.mat4.rotateZ(mattrans, mattrans, Math.PI / 2.0);
      libGlMatrix.mat4.scale(mattrans, mattrans, [scl[2], (-64 * 2) / gl.width, 1.0]);

      sdrLine.bind();
      sdrLine.matWorldViewProj(mattrans);
      sdrLine.color.apply(sdrLine, [gl.foreColor[0], gl.foreColor[1], gl.foreColor[2], 0.5]);
      axis.meshHistogram.bind(sdrLine, null);
      axis.meshHistogram.draw();

      sdrLine.color(...gl.foreColor);
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
    if (dataset && options.histogramHeight > 0) {
      const numBins = options.numHistogramBins;
      if (options.showXAxisHistogram) {
        createHistogram(axes[0], dataset, activeInputs[0], numBins);
      }
      if (options.showYAxisHistogram) {
        createHistogram(axes[1], dataset, activeInputs[1], numBins);
      }
      if (options.showColormapHistogram) {
        createHistogram(axes[2], dataset, activeInputs[2], numBins);
      }
    }
  }
  function createHistogram(axis, dataset, d, numBins) {
    if (d < 0 || d >= dataset.dataVectors.length) {
      return;
    } // Validate inputs
    if (axis.histogram && axis.histogram.width === numBins && axis.d === d) {
      return;
    } // Requested histogram already exists

    axis.histogram = libAlgorithm.computeHistogram(dataset, axis.d = d, numBins);
    libAlgorithm.addTransformFunctions(axis.histogram);
    // console.log(axis.histogram);

    let positions = new Float32Array((6 * numBins) * 3);
    const v3_set = function (i, x, y) {
      i *= 3;
      positions[i] = x; i += 1;
      positions[i] = y; i += 1;
      positions[i] = 0.0; i += 1;
    };
    for (let b = 0, i = -1, x_scale = 1 / numBins; b < numBins; b += 1) {
      const y = axis.histogram.data[b] / axis.histogram.maximum;

      v3_set(i += 1, (b + 0) * x_scale, 0);
      v3_set(i += 1, (b + 1) * x_scale, 0);
      v3_set(i += 1, (b + 1) * x_scale, y);

      v3_set(i += 1, (b + 1) * x_scale, y);
      v3_set(i += 1, (b + 0) * x_scale, y);
      v3_set(i += 1, (b + 0) * x_scale, 0);
    }
    axis.meshHistogram.reset(positions, null, null, null, null, null, gl.TRIANGLES);

    positions = new Float32Array(((3 * numBins) + 1) * 3);
    v3_set(0, 0, 0);
    for (let b = 0, i = 0, x_scale = 1 / numBins; b < numBins;) {
      const y = axis.histogram.data[b] / axis.histogram.maximum;

      v3_set(i += 1, b * x_scale, y);
      v3_set(i += 1, (b += 1) * x_scale, y);
      v3_set(i += 1, b * x_scale, 0);
    }
    axis.meshLineHistogram.reset(positions, null, null, null, null, null, gl.LINE_STRIP);
  }
}