import { mat4, vec2 } from 'gl-matrix';
import { Shader, Mesh, LoadTextureFromByteArray, LoadTextureFromFloatArray } from './graphics';
import Shaders from './shaders';
import { ClusterMapOptions } from './algorithm';
import { hsv2rgb, consoleLog } from './utility';

/**
 * A viewer that renders point density to the global view.
 */
export default class DensityViewer {
  /**
   * @constructor
   * @package
   * @implements {Viewer}
   * @param {WebGLRenderingContext} gl webgl render context
   * @param {GlobalView} plot GlobalView plot
   */
  constructor(gl, plot) {
    this.gl = gl;
    this.plot = plot;

    this.sdrDensityMap = new Shader(
      gl, Shaders.vsTextured2,
      Shaders.fsViewDensityMap,
    );
    this.sdrDensityMap.matWorldViewProj = this.sdrDensityMap.u4x4f('matWorldViewProj');
    this.sdrDensityMap.matTexCoordTransform = this.sdrDensityMap.u2x2f('matTexCoordTransform');
    this.sdrDensityMap.scale = this.sdrDensityMap.u1f('scale');
    this.sdrDensityMap.color = this.sdrDensityMap.u3f('color');

    this.sdrClusterMap =
      new Shader(gl, Shaders.vsTextured2, Shaders.fsTextured);
    this.sdrClusterMap.matWorldViewProj = this.sdrClusterMap.u4x4f('matWorldViewProj');
    this.sdrClusterMap.matTexCoordTransform = this.sdrClusterMap.u2x2f('matTexCoordTransform');

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

    this.dataset = null;

    this.clusterMapOptions = new ClusterMapOptions();

    this.showDensityMap = false;
    this.showClusterMap = false;

    this.onInputChanged = (/* activeInputs, animatedInputs, options */) => {};
    this.onOptionsChanged = (/* options */) => {};
    this.onPlotBoundsChanged = (/* plotBounds */) => {};
  }

  /**
   * Sets the current threshold.
   * @param {number} threshold new threshold value.
   */
  setClusterMapThreshold(threshold) {
    if (this.showDensityMap && this.clusterMapOptions.threshold !== threshold) {
      this.clusterMapOptions.threshold = threshold;
      this.dataset.requestClusterMap(
        this.plot.getActiveColumn(0),
        this.plot.getActiveColumn(1),
        this.clusterMapOptions, () => {
          this.plot.invalidate();
        },
      ); // Request clusterMap and redraw once it's computed
    } else {
      this.clusterMapOptions.threshold = threshold;
    }
  }

  /**
   * Returns current threshold value
   * @returns {number} current threshold value
   */
  getClusterMapThreshold() {
    return this.clusterMapOptions.threshold;
  }

  /**
   * Renders the density map
   * @param {boolean} flipY whether to flip the density map horizontally.
   * @param {Transform} transform the Transform object from the plot
   * @param {number} dim0 first dimension index
   * @param {number} dim1 second dimension index
   */
  render(flipY, transform, dim0, dim1) {
    const pos = vec2.create();

    if (this.showClusterMap) {
      if (this.dataset && this.dataset.isClusterMapReady(dim0, dim1)) {
        // If clusterMap is ready Retrieve clusterMap synchronously
        // (since we already know it's ready)
        const clusterMap = this.dataset.requestClusterMap(dim0, dim1, this.clusterMapOptions);
        if (clusterMap.width === 0 || clusterMap.height === 0) {
          return;
        }

        // Create texture if it wasn't already created
        let texture = this.showDensityMap ? clusterMap.dtex : clusterMap.tex;
        if (!texture) {
          // Retrieve densityMap synchronously (since we already know it's ready)
          const densityMap = this.showDensityMap ?
            this.dataset.requestDensityMap(dim0, dim1, undefined, undefined) : null;
          const rgba = new Uint8Array(4 * clusterMap.data.length);
          for (let i = 0; i < clusterMap.data.length; i += 1) {
            let c = clusterMap.data[i];

            if (c === 0) {
              rgba[(4 * i) + 0] = 0;
              rgba[(4 * i) + 1] = 0;
              rgba[(4 * i) + 2] = 0;
              rgba[(4 * i) + 3] = 0;
            } else {
              // Use evenly spaced hues
              c -= 1; // c -= 1 ... ID to index
              let d = densityMap ?
                (densityMap.data[i] - clusterMap.minDensities[c]) /
                  (clusterMap.densities[c] - clusterMap.minDensities[c]) :
                0.75;
              if (d < 0.0) {
                d = 0.0;
              }
              c = (c + 0.5) / clusterMap.numClusters; // +0.5 ... Use off-hues
              if (c > 1) {
                c -= 1;
              }

              let clr = [c, 0.5, 1]; // 0.5 ... Use 50% saturated colors
              clr = hsv2rgb(clr);

              rgba[(4 * i) + 0] = Math.floor(clr[0] * 255);
              rgba[(4 * i) + 1] = Math.floor(clr[1] * 255);
              rgba[(4 * i) + 2] = Math.floor(clr[2] * 255);
              rgba[(4 * i) + 3] = Math.floor(d * 255);
            }
          }
          texture = LoadTextureFromByteArray(
            this.gl, rgba,
            clusterMap.width, clusterMap.height,
          );
          if (this.showDensityMap) {
            clusterMap.dtex = texture;
          } else {
            clusterMap.tex = texture;
          }
        }

        this.sdrClusterMap.bind();
        this.meshQuad.bind(this.sdrClusterMap, texture);

        const mattrans = mat4.create();
        if (flipY === true) {
          mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        }
        transform.datasetCoordToDeviceCoord(pos, dim0 > dim1 ?
          [clusterMap.invTransformY(0), clusterMap.invTransformX(0)] :
          [clusterMap.invTransformX(0), clusterMap.invTransformY(0)]);
        mat4.translate(mattrans, mattrans, [pos[0], pos[1], 0.0]);
        transform.datasetDistToDeviceDist(pos, dim0 > dim1 ?
          [clusterMap.height / clusterMap.transform[2],
            clusterMap.width / clusterMap.transform[0]] :
          [clusterMap.width / clusterMap.transform[0],
            clusterMap.height / clusterMap.transform[2]]);
        mat4.scale(mattrans, mattrans, [pos[0], pos[1], 1.0]);
        this.sdrClusterMap.matWorldViewProj(mattrans);

        this.sdrClusterMap.matTexCoordTransform(new Float32Array(dim0 > dim1 ?
          [0, 1, 1, 0] : [1, 0, 0, 1]));
        this.meshQuad.draw();
      } else { // If clusterMap isn't ready yet
        this.dataset.requestClusterMap(dim0, dim1, this.clusterMapOptions, () => {
          this.plot.invalidate();
        });
      } // Request clusterMap and redraw once it's computed
    } else if (this.showDensityMap) {
      if (this.dataset && this.dataset.isDensityMapReady(dim0, dim1)) {
        // If densityMap is ready retrieve densityMap synchronously
        // (since we already know it's ready)
        const densityMap =
        /** @type {DensityMap} */(this.dataset.requestDensityMap(dim0, dim1, undefined, undefined));
        if (densityMap.width === 0 || densityMap.height === 0) {
          return;
        }

        // Create texture if it wasn't already created
        if (!densityMap.texture) {
          densityMap.texture = LoadTextureFromFloatArray(
            this.gl, densityMap.data, densityMap.width,
            densityMap.height,
          );
        }

        this.sdrDensityMap.bind();
        this.meshQuad.bind(this.sdrDensityMap, [densityMap.texture]);

        const mattrans = mat4.create();
        if (flipY === true) {
          mat4.scale(mattrans, mattrans, [1.0, -1.0, 1.0]);
        }
        transform.datasetCoordToDeviceCoord(pos, dim0 > dim1 ?
          [densityMap.invTransformY(0), densityMap.invTransformX(0)] :
          [densityMap.invTransformX(0), densityMap.invTransformY(0)]);
        mat4.translate(mattrans, mattrans, [pos[0], pos[1], 0.0]);
        transform.datasetDistToDeviceDist(pos, dim0 > dim1 ?
          [densityMap.height / densityMap.transform[2],
            densityMap.width / densityMap.transform[0]] :
          [densityMap.width / densityMap.transform[0],
            densityMap.height / densityMap.transform[2]]);
        mat4.scale(mattrans, mattrans, [pos[0], pos[1], 1.0]);
        this.sdrDensityMap.matWorldViewProj(mattrans);

        this.sdrDensityMap.matTexCoordTransform(new Float32Array(dim0 > dim1 ?
          [0, 1, 1, 0] : [1, 0, 0, 1]));
        this.sdrDensityMap.scale(1 / densityMap.maximum);
        this.sdrDensityMap.color(this.gl.foreColor[0], this.gl.foreColor[1], this.gl.foreColor[2]);
        this.meshQuad.draw();
      } else { // If densityMap isn't ready yet
        this.dataset.requestDensityMap(dim0, dim1, undefined, undefined, () => {
          this.plot.invalidate();
        });
      } // Request densityMap and redraw once it's computed
    }
  }

  /**
   * sets the dataset
   * @param {Dataset} dataset
   */
  setDataset(dataset /* , options */) {
    this.dataset = dataset;
  }

  /**
   * Updates the thumbnail images.
   * @param {Array<Thumbnail>} images array of thumbnails
   * @param {number} dim0 first dimension index
   * @param {number} dim1 second dimension index
   */
  updateImages(images, dim0, dim1) {
    const densityMap = this.dataset.requestDensityMap(dim0, dim1, undefined, undefined);
    if (densityMap.texture === null || dim0 === dim1) {
      return;
    }

    const width = densityMap.width;
    const height = densityMap.height;
    const xMin = 0;
    const xMax = width;
    const yMin = 0;
    const yMax = height;

    const bodies = images.map((image) => {
      const x = densityMap.transformX(image.imagePos[dim0]);
      const y = densityMap.transformY(image.imagePos[dim1]);
      const rx = densityMap.transformX(image.refPos[dim0]);
      const ry = densityMap.transformY(image.refPos[dim1]);
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
        .forEach((dir) => {
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
        consoleLog(density);
      }
    }
    const varImages = images;
    for (let i = 0; i < bodies.length; i += 1) {
      bodies[i].x += bodies[i].fx;
      bodies[i].y += bodies[i].fy;

      varImages[i].imagePos[dim0] = densityMap.invTransformX(bodies[i].x);
      varImages[i].imagePos[dim1] = densityMap.invTransformY(bodies[i].y);
    }
  }
}
