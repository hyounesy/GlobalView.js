const libGraphics = require('./graphics.js');
const libShaders = require('./shaders.js');
const libAlgorithm = require('./algorithm.js');
const libGlMatrix = require('gl-matrix');
const libUtility = require('./utility.js');

/**
 * A viewer that renders point density to the global view.
 * @constructor
 * @package
 * @implements {Viewer}
 * @param {Object} gl // {WebGLRenderingContext}
 * @param {Object} globalView // {GlobalView}
 */
export function DensityViewer(gl, globalView) {
  const sdrDensityMap =
    new libGraphics.Shader(gl, libShaders.Shaders.vsTextured2, libShaders.Shaders.fsViewDensityMap);
  sdrDensityMap.matWorldViewProj = sdrDensityMap.u4x4f('matWorldViewProj');
  sdrDensityMap.matTexCoordTransform = sdrDensityMap.u2x2f('matTexCoordTransform');
  sdrDensityMap.scale = sdrDensityMap.u1f('scale');
  sdrDensityMap.color = sdrDensityMap.u3f('color');
  // var colormap =
  //  libGraphics.LoadTexture(gl, "cmDensityMap.png", function() { globalView.invalidate(); });

  const sdrClusterMap =
    new libGraphics.Shader(gl, libShaders.Shaders.vsTextured2, libShaders.Shaders.fsTextured);
  sdrClusterMap.matWorldViewProj = sdrClusterMap.u4x4f('matWorldViewProj');
  sdrClusterMap.matTexCoordTransform = sdrClusterMap.u2x2f('matTexCoordTransform');

  // Create a 2D quad mesh
  const meshQuad = new libGraphics.Mesh(gl, new Float32Array([
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

  let dataset = null;

  const clusterMapOptions = new libAlgorithm.ClusterMapOptions();
  this.setClusterMapThreshold = function (threshold) {
    if (this.showDensityMap && clusterMapOptions.threshold !== threshold) {
      clusterMapOptions.threshold = threshold;
      dataset.requestClusterMap(
        globalView.getActiveColumn(0),
        globalView.getActiveColumn(1),
        clusterMapOptions, function () {
          globalView.invalidate();
        },
      ); // Request clusterMap and redraw once it's computed
    } else {
      clusterMapOptions.threshold = threshold;
    }
  };
  this.getClusterMapThreshold = () => clusterMapOptions.threshold;

  this.showDensityMap = false;
  this.showClusterMap = false;
  this.render = function (flipY, tf, d0, d1) {
    const pos = libGlMatrix.vec2.create();

    if (this.showClusterMap) {
      if (dataset && dataset.isClusterMapReady(d0, d1)) {
        // If clusterMap is ready
        // Retrieve clusterMap synchronously (since we already know it's ready)
        const clusterMap = dataset.requestClusterMap(d0, d1, clusterMapOptions);
        if (clusterMap.width === 0 || clusterMap.height === 0) {
          return;
        }

        // Create texture if it wasn't already created
        let texture = this.showDensityMap ? clusterMap.dtex : clusterMap.tex;
        if (!texture) {
          // Retrieve densityMap synchronously (since we already know it's ready)
          const densityMap = this.showDensityMap ?
            dataset.requestDensityMap(d0, d1, undefined, undefined) : null;
          const rgba = new Uint8Array(4 * clusterMap.data.length);
          for (let i = 0; i < clusterMap.data.length; i += 1) {
            let c = clusterMap.data[i];

            if (c === 0) {
              rgba[(4 * i) + 0] = 0;
              rgba[(4 * i) + 1] = 0;
              rgba[(4 * i) + 2] = 0;
              rgba[(4 * i) + 3] = 0;
            } else {
              // Use random RGB color (deprecated)
              /* var clr = [Math.sin(c += 1) * 10000,
                            Math.sin(c += 1) * 10000,
                            Math.sin(c += 1) * 10000];
              clr[0] -= Math.floor(clr[0]);
              clr[1] -= Math.floor(clr[1]);
              clr[2] -= Math.floor(clr[2]); */

              // Use evenly spaced hues
              c -= 1; // c -= 1 ... ID to index
              let d = densityMap ?
                (densityMap.data[i] - clusterMap.minDensities[c]) /
                  (clusterMap.densities[c] - clusterMap.minDensities[c]) :
                0.75;
              if (d < 0.0) {
                d = 0.0;
              }
              c = (c + 0.5) / clusterMap.n; // +0.5 ... Use off-hues
              if (c > 1) {
                c -= 1;
              }

              let clr = [c, 0.5, 1]; // 0.5 ... Use 50% saturated colors
              clr = libUtility.hsv2rgb(clr);

              rgba[(4 * i) + 0] = Math.floor(clr[0] * 255);
              rgba[(4 * i) + 1] = Math.floor(clr[1] * 255);
              rgba[(4 * i) + 2] = Math.floor(clr[2] * 255);
              rgba[(4 * i) + 3] = Math.floor(d * 255);
            }
          }
          // libUtility.download("clustermap.png",
          //    libUtility.imageUrlFromBytes(rgba, clusterMap.width, clusterMap.height));
          texture =
            libGraphics.LoadTextureFromByteArray(gl, rgba, clusterMap.width, clusterMap.height);
          if (this.showDensityMap) {
            clusterMap.dtex = texture;
          } else {
            clusterMap.tex = texture;
          }
        }

        sdrClusterMap.bind();
        meshQuad.bind(sdrClusterMap, texture);

        const mattrans = libGlMatrix.mat4.create();
        if (flipY === true) {
          libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        }
        tf.datasetCoordToDeviceCoord(pos, d0 > d1 ?
          [clusterMap.invTransformY(0), clusterMap.invTransformX(0)] :
          [clusterMap.invTransformX(0), clusterMap.invTransformY(0)]);
        libGlMatrix.mat4.translate(mattrans, mattrans, [pos[0], pos[1], 0.0]);
        tf.datasetDistToDeviceDist(pos, d0 > d1 ?
          [clusterMap.height / clusterMap.transform[2],
            clusterMap.width / clusterMap.transform[0]] :
          [clusterMap.width / clusterMap.transform[0],
            clusterMap.height / clusterMap.transform[2]]);
        libGlMatrix.mat4.scale(mattrans, mattrans, [pos[0], pos[1], 1.0]);
        sdrClusterMap.matWorldViewProj(mattrans);

        sdrClusterMap.matTexCoordTransform(new Float32Array(d0 > d1 ? [0, 1, 1, 0] : [1, 0, 0, 1]));
        meshQuad.draw();
      } else { // If clusterMap isn't ready yet
        dataset.requestClusterMap(d0, d1, clusterMapOptions, function () {
          globalView.invalidate();
        });
      } // Request clusterMap and redraw once it's computed
    } else if (this.showDensityMap) {
      if (dataset && dataset.isDensityMapReady(d0, d1)) {
        // If densityMap is ready
        // Retrieve densityMap synchronously (since we already know it's ready)
        const densityMap =
        /** @type {DensityMap} */(dataset.requestDensityMap(d0, d1, undefined, undefined));
        if (densityMap.width === 0 || densityMap.height === 0) {
          return;
        }

        /*
        libUtility.download(
          'densityMap.png',
          libUtility.imageUrlFromBytes(
            libUtility.F32toI24flipY(
              densityMap.data,
              [densityMap.minimum, densityMap.maximum], densityMap.width, densityMap.height,
            ),
            densityMap.width, densityMap.height,
          ),
        );
        */

        // Create texture if it wasn't already created
        if (!densityMap.texture) {
          densityMap.texture = libGraphics.LoadTextureFromFloatArray(
            gl, densityMap.data, densityMap.width,
            densityMap.height,
          );
        }

        sdrDensityMap.bind();
        meshQuad.bind(sdrDensityMap, [densityMap.texture]);

        const mattrans = libGlMatrix.mat4.create();
        if (flipY === true) {
          libGlMatrix.mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        }
        tf.datasetCoordToDeviceCoord(pos, d0 > d1 ?
          [densityMap.invTransformY(0), densityMap.invTransformX(0)] :
          [densityMap.invTransformX(0), densityMap.invTransformY(0)]);
        libGlMatrix.mat4.translate(mattrans, mattrans, [pos[0], pos[1], 0.0]);
        tf.datasetDistToDeviceDist(pos, d0 > d1 ?
          [densityMap.height / densityMap.transform[2],
            densityMap.width / densityMap.transform[0]] :
          [densityMap.width / densityMap.transform[0],
            densityMap.height / densityMap.transform[2]]);
        libGlMatrix.mat4.scale(mattrans, mattrans, [pos[0], pos[1], 1.0]);
        sdrDensityMap.matWorldViewProj(mattrans);

        sdrDensityMap.matTexCoordTransform(new Float32Array(d0 > d1 ? [0, 1, 1, 0] : [1, 0, 0, 1]));
        sdrDensityMap.scale(1 / densityMap.maximum);
        // sdrDensityMap.scale(0.5);
        sdrDensityMap.color(gl.foreColor[0], gl.foreColor[1], gl.foreColor[2]);
        meshQuad.draw();
      } else { // If densityMap isn't ready yet
        dataset.requestDensityMap(d0, d1, undefined, undefined, function () {
          globalView.invalidate();
        });
      } // Request densityMap and redraw once it's computed
    }
  };

  this.setDataset = function (_dataset /* , options */) {
    dataset = _dataset;
  };
  this.onInputChanged = function (/* activeInputs, animatedInputs, options */) {};
  this.onOptionsChanged = function (/* options */) {};
  this.onPlotBoundsChanged = function (/* plotBounds */) {};

  this.updateImages = function (images, d0, d1) {
    const densityMap = dataset.requestDensityMap(d0, d1, undefined, undefined);
    if (densityMap.texture === null || d0 === d1) {
      return;
    }

    const width = densityMap.width;
    const height = densityMap.height;
    // const densityScale = densityMap.scale;
    // const densityOffset = -densityMap.offset;

    const xMin = 0;
    const xMax = width;
    const yMin = 0;
    const yMax = height;

    const bodies = images.map(function (image) {
      const x = densityMap.transformX(image.imagePos[d0]);
      const y = densityMap.transformY(image.imagePos[d1]);
      const rx = densityMap.transformX(image.refPos[d0]);
      const ry = densityMap.transformY(image.refPos[d1]);
      return {
        x, y, rx, ry, vx: 0, vy: 0, fx: 0, fy: 0,
      };
    });

    const repellPoint = function (
      pBody,
      pointX, pointY,
      minDist, minDistMagnitude, maxDist, maxDistMagnitude,
    ) {
      const body = pBody;
      const dx = body.x - pointX;
      const dy = body.y - pointY;
      let dist = Math.sqrt((dx * dx) + (dy * dy));

      if (dist < minDist) {
        dist -= minDist;
        const F = -minDistMagnitude * dist;
        // if (dx < 1e-4 && dy < 1e-4) dx += 1e-4;
        body.fx += F * dx;
        body.fy += F * dy;
      } else if (dist > maxDist) {
        dist -= maxDist;
        const F = -maxDistMagnitude * dist;
        body.fx += F * dx;
        body.fy += F * dy;
      }
    };

    for (let i = 0; i < bodies.length; i += 1) {
      const sampleX = Math.floor(bodies[i].x);
      const sampleY = Math.floor(bodies[i].y);
      const density = densityMap[(sampleX * width) + sampleY];
      let bestDir = null;
      let lowestDensity = density;
      [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
        .forEach(function (dir) {
          const x = sampleX + dir[0];
          const y = sampleY + dir[1];
          if (x >= xMin && x < xMax && y >= yMin && y < yMax) {
            const dDensity = densityMap[(y * width) + x];
            if (dDensity < lowestDensity) {
              lowestDensity = dDensity;
              bestDir = dir;
            }
          }
        });
      if (bestDir !== null) {
        repellPoint(
          bodies[i],
          bodies[i].x + bestDir[0], bodies[i].y + bestDir[1],
          Number.MIN_VALUE, 0, 0.0, density,
        );
        libUtility.consoleLog(density);
      }
    }
    const varImages = images;
    for (let i = 0; i < bodies.length; i += 1) {
      bodies[i].x += bodies[i].fx;
      bodies[i].y += bodies[i].fy;

      varImages[i].imagePos[d0] = densityMap.invTransformX(bodies[i].x);
      varImages[i].imagePos[d1] = densityMap.invTransformY(bodies[i].y);
    }
  };
}
