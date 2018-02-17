/**
 * A helper class for globalview containing variables and functions for
 * transforming data vectors into device space
 */
export default class Transform {
  /**
   * @constructor
   * @package
   * @param {*} plot GlobalView plot
   */
  constructor(plot) {
    this.plot = plot;
    this.dataset = plot.dataset;
    this.activeInputs = plot.activeInputs;
    this.animatedInputs = plot.animatedInputs;
    this.plotBounds = plot.plotBounds;
    this.gl = plot.gl;

    this.offsets = new Float32Array(Transform.NumDim);
    this.scales = new Float32Array(Transform.NumDim);
    this.animatedScales = new Float32Array(Transform.NumDim);
    this.invalid = false;
  }

  static get NumDim() {
    return 4;
  }

  // Setter methods

  setFromMinMax(d, minimum, maximum) {
    this.dataset.dataVectors[d].scale = maximum - minimum;
    if (this.dataset.dataVectors[d].scale > -1e-5 && this.dataset.dataVectors[d].scale < 1e-5) {
      this.dataset.dataVectors[d].offset =
        0.5 - (0.5 * (minimum + maximum) * (this.dataset.dataVectors[d].scale = 0.5));
    } else {
      this.dataset.dataVectors[d].offset =
        -minimum * (this.dataset.dataVectors[d].scale = 1 / this.dataset.dataVectors[d].scale);
    }
    this.invalid = true;

    if (d === this.activeInputs[0]) {
      this.plot.updateCoorinateSystem(0, this.activeInputs[0]);
    }
    if (d === this.activeInputs[1]) {
      this.plot.updateCoorinateSystem(1, this.activeInputs[1]);
    }
    if (d === this.activeInputs[2]) {
      this.plot.updateColormap(this.activeInputs[2]);
    }
    if (d === this.activeInputs[0] || d === this.activeInputs[1] || d === this.activeInputs[2]) {
      this.plot.invalidate();
    }
  }

  translate(d, distance) {
    this.dataset.dataVectors[d].offset += distance * this.dataset.dataVectors[d].scale;
    this.invalid = true;

    if (d === this.activeInputs[0]) {
      this.plot.updateCoorinateSystem(0, this.activeInputs[0], false);
    }
    if (d === this.activeInputs[1]) {
      this.plot.updateCoorinateSystem(1, this.activeInputs[1], false);
    }
    if (d === this.activeInputs[2]) {
      this.plot.updateColormap(this.activeInputs[2], false);
    }
    if (d === this.activeInputs[0] || d === this.activeInputs[1] || d === this.activeInputs[2]) {
      this.plot.invalidate();
    }
  }

  scale(d, factor) {
    this.dataset.dataVectors[d].scale *= factor;
    this.invalid = true;

    if (d === this.activeInputs[0]) {
      this.plot.updateCoorinateSystem(0, this.activeInputs[0]);
    }
    if (d === this.activeInputs[1]) {
      this.plot.updateCoorinateSystem(1, this.activeInputs[1]);
    }
    if (d === this.activeInputs[2]) {
      this.plot.updateColormap(this.activeInputs[2]);
    }
    if (d === this.activeInputs[0] || d === this.activeInputs[1] || d === this.activeInputs[2]) {
      this.plot.invalidate();
    }
  }

  onInputChanged() {
    this.invalid = true;
    return true;
  }

  // Getter methods
  getOffset(d) {
    return this.dataset.dataVectors[this.activeInputs[d]].offset;
  }

  getScale(d) {
    return this.dataset.dataVectors[this.activeInputs[d]].scale;
  }

  getMinimum(d) {
    return this.dataset.dataVectors[this.activeInputs[d]].minimum;
  }

  getMaximum(d) {
    return this.dataset.dataVectors[this.activeInputs[d]].maximum;
  }

  getVisibleMinimum(d) {
    return (0 - this.dataset.dataVectors[this.activeInputs[d]].offset) /
    this.dataset.dataVectors[this.activeInputs[d]].scale;
  }

  getVisibleMaximum(d) {
    return (1 - this.dataset.dataVectors[this.activeInputs[d]].offset) /
      this.dataset.dataVectors[this.activeInputs[d]].scale;
  }

  getOffsets() {
    if (this.invalid === true) {
      this.recompute();
    }
    return this.offsets;
  }

  getScales() {
    if (this.invalid === true) {
      this.recompute();
    }
    return this.scales;
  }

  getAnimatedScales() {
    if (this.invalid === true) {
      this.recompute();
    }
    return this.animatedScales;
  }

  // Transformation methods
  deviceCoordToDatasetCoord(vOutCoord, vInCoord) {
    const vOut = vOutCoord;
    const vIn = vInCoord;
    if (this.invalid === true) {
      this.invalid = false;
      this.recompute();
    }
    for (let d = 0, nd = Math.min(vIn.length, vOut.length, Transform.NumDim); d < nd; d += 1) {
      vOut[d] = (vIn[d] - this.offsets[d]) / this.scales[d];
    }
    return vOut;
  }

  deviceDistToDatasetDist(vOutCoord, vInCoord) {
    const vOut = vOutCoord;
    const vIn = vInCoord;
    if (this.invalid === true) {
      this.invalid = false;
      this.recompute();
    }
    for (let d = 0, nd = Math.min(vIn.length, vOut.length, Transform.NumDim); d < nd; d += 1) {
      vOut[d] = vIn[d] / this.scales[d];
    }
    return vOut;
  }

  datasetCoordToDeviceCoord(vOutCoord, vInCoord) {
    const vOut = vOutCoord;
    const vIn = vInCoord;
    if (this.invalid === true) {
      this.invalid = false;
      this.recompute();
    }
    for (let d = 0, nd = Math.min(vIn.length, vOut.length, Transform.NumDim); d < nd; d += 1) {
      vOut[d] = this.offsets[d] + (vIn[d] * this.scales[d]);
    }
    return vOut;
  }

  datasetDistToDeviceDist(vOutCoord, vInCoord) {
    const vOut = vOutCoord;
    const vIn = vInCoord;
    if (this.invalid === true) {
      this.invalid = false;
      this.recompute();
    }
    for (let d = 0, nd = Math.min(vIn.length, vOut.length, Transform.NumDim); d < nd; d += 1) {
      vOut[d] = vIn[d] * this.scales[d];
    }
    return vOut;
  }

  transformPos(vOutCoord, vInCoord) {
    const vOut = vOutCoord;
    const vIn = vInCoord;
    if (this.invalid === true) {
      this.invalid = false;
      this.recompute();
    }
    for (let d = 0, nd = vOut.length; d < nd; d += 1) {
      vOut[d] = this.offsets[d] + (vIn[this.activeInputs[d]] * this.scales[d]);
    }
    return vOut;
  }

  transformNml(vOutCoord, vInCoord) {
    const vOut = vOutCoord;
    const vIn = vInCoord;
    if (this.invalid === true) {
      this.invalid = false;
      this.recompute();
    }
    for (let d = 0, nd = vOut.length; d < nd; d += 1) {
      vOut[d] = vIn[this.activeInputs[d]] * this.scales[d];
    }
    return vOut;
  }

  transformNml2(vOutCoord, vInCoord) {
    const vOut = vOutCoord;
    const vIn = vInCoord;
    if (this.invalid === true) {
      this.invalid = false;
      this.recompute();
    }
    for (let d = 0, nd = vOut.length; d < nd; d += 1) {
      vOut[d] = vIn[this.activeInputs[d]] * this.dataset.dataVectors[this.activeInputs[d]].scale;
    }
    return vOut;
  }

  // Methods modifying offsets, scales and animatedScales
  recompute() {
    this.invalid = false;

    // Compute offsets and scales for active inputs
    for (let d = 0; d < Transform.NumDim; d += 1) {
      this.offsets[d] = this.dataset.dataVectors[this.activeInputs[d]].offset;
      this.scales[d] = this.dataset.dataVectors[this.activeInputs[d]].scale;
      this.animatedScales[d] = 0;
    }

    // Transform first two dimensions offsets and scales into device coordinates
    this.offsets[0] *= (2 * this.plotBounds.width) / this.gl.width;
    this.offsets[0] += ((2 * this.plotBounds.x) / this.gl.width) - 1;
    this.offsets[1] *= (2 * this.plotBounds.height) / this.gl.height;
    this.offsets[1] += ((2 * this.plotBounds.y) / this.gl.height) - 1;
    this.scales[0] *= (2 * this.plotBounds.width) / this.gl.width;
    this.scales[1] *= (2 * this.plotBounds.height) / this.gl.height;
    this.animatedScales[0] *= (2 * this.plotBounds.width) / this.gl.width;
    this.animatedScales[1] *= (2 * this.plotBounds.height) / this.gl.height;

    return this.offsets;
  }

  animate() {
    this.invalid = false;

    let isAnimating = false;

    // Compute offsets and scales, either static based on activeInputs,
    // or animated between activeInputs and animatedInputs
    const oi = this.animatedInputs.map(anim => anim.origin);
    const di = this.activeInputs;
    for (let d = 0; d < Transform.NumDim; d += 1) {
      const ts = this.dataset.dataVectors[di[d]].scale;
      const tt = this.dataset.dataVectors[di[d]].offset;

      if (this.animatedInputs[d].origin === this.activeInputs[d]) {
        this.scales[d] = ts;
        this.offsets[d] = tt;
        this.animatedScales[d] = 0;
      } else {
        const os = this.dataset.dataVectors[oi[d]].scale;
        const ot = this.dataset.dataVectors[oi[d]].offset;

        let alpha = this.animatedInputs[d].f;
        this.offsets[d] = (alpha * tt) + ((1 - alpha) * ot);
        alpha *= Math.PI / 2.0;
        this.scales[d] = Math.sin(alpha) * ts;
        this.animatedScales[d] = Math.cos(alpha) * os;

        this.animatedInputs[d].f += this.plot.deltaTime * 0.001;
        if (this.animatedInputs[d].f >= 1.0) {
          this.animatedInputs[d].origin = this.activeInputs[d];
        }

        isAnimating = true;
      }
    }

    // Transform first two dimensions offsets and scales into device coordinates
    this.offsets[0] *= (2 * this.plotBounds.width) / this.gl.width;
    this.offsets[0] += ((2 * this.plotBounds.x) / this.gl.width) - 1;
    this.offsets[1] *= (2 * this.plotBounds.height) / this.gl.height;
    this.offsets[1] += ((2 * this.plotBounds.y) / this.gl.height) - 1;
    this.scales[0] *= (2 * this.plotBounds.width) / this.gl.width;
    this.scales[1] *= (2 * this.plotBounds.height) / this.gl.height;
    this.animatedScales[0] *= (2 * this.plotBounds.width) / this.gl.width;
    this.animatedScales[1] *= (2 * this.plotBounds.height) / this.gl.height;

    return isAnimating;
  }
}
