/**
 * A helper class for globalview containing variables and functions for
 * transforming data vectors into device space
 */
class Transform {
  /**
   * @constructor
   * @package
   * @param {GlobalView} plot GlobalView plot
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

  /**
   * Updates the transformation for the coordinate systems based on the spacified min and max values
   * @param {number} dim - dataset dimension index
   * @param {number} minimum - minimum value
   * @param {number} maximum - maximum value
   */
  setFromMinMax(dim, minimum, maximum) {
    this.dataset.dataVectors[dim].scale = maximum - minimum;
    if (this.dataset.dataVectors[dim].scale > -1e-5 && this.dataset.dataVectors[dim].scale < 1e-5) {
      this.dataset.dataVectors[dim].offset =
        0.5 - (0.5 * (minimum + maximum) * (this.dataset.dataVectors[dim].scale = 0.5));
    } else {
      this.dataset.dataVectors[dim].offset =
        -minimum * (this.dataset.dataVectors[dim].scale = 1 / this.dataset.dataVectors[dim].scale);
    }
    this.invalid = true;

    if (dim === this.activeInputs[0]) {
      this.plot.updateCoorinateSystem(0, this.activeInputs[0]);
    }
    if (dim === this.activeInputs[1]) {
      this.plot.updateCoorinateSystem(1, this.activeInputs[1]);
    }
    if (dim === this.activeInputs[2]) {
      this.plot.updateColormap(this.activeInputs[2]);
    }
    if (dim === this.activeInputs[0] ||
        dim === this.activeInputs[1] ||
        dim === this.activeInputs[2]) {
      this.plot.invalidate();
    }
  }

  /**
   * Translates the coordinate system for the specified dimension by the specified distance
   * @param {number} dim - dataset dimension index
   * @param {number} distance - translation distance
   */
  translate(dim, distance) {
    this.dataset.dataVectors[dim].offset += distance * this.dataset.dataVectors[dim].scale;
    this.invalid = true;

    if (dim === this.activeInputs[0]) {
      this.plot.updateCoorinateSystem(0, this.activeInputs[0], false);
    }
    if (dim === this.activeInputs[1]) {
      this.plot.updateCoorinateSystem(1, this.activeInputs[1], false);
    }
    if (dim === this.activeInputs[2]) {
      this.plot.updateColormap(this.activeInputs[2], false);
    }
    if (dim === this.activeInputs[0] ||
        dim === this.activeInputs[1] ||
        dim === this.activeInputs[2]) {
      this.plot.invalidate();
    }
  }

  /**
   * Scales the coordinate system for the specified dimension by the specified factor
   * @param {number} dim - dataset dimension index
   * @param {number} factor - scale distance
   */
  scale(dim, factor) {
    this.dataset.dataVectors[dim].scale *= factor;
    this.invalid = true;

    if (dim === this.activeInputs[0]) {
      this.plot.updateCoorinateSystem(0, this.activeInputs[0]);
    }
    if (dim === this.activeInputs[1]) {
      this.plot.updateCoorinateSystem(1, this.activeInputs[1]);
    }
    if (dim === this.activeInputs[2]) {
      this.plot.updateColormap(this.activeInputs[2]);
    }
    if (dim === this.activeInputs[0] ||
        dim === this.activeInputs[1] ||
        dim === this.activeInputs[2]) {
      this.plot.invalidate();
    }
  }

  // called by GlobalView when input data (or dimensions) change
  onInputChanged() {
    this.invalid = true;
    return true;
  }

  // Getter methods

  /**
   * Get view offset for a given dataset dimension
   * @param {number} dim dataset dimension index
   * @returns {number} offset for the given dimension
   */
  getOffset(dim) {
    return this.dataset.dataVectors[this.activeInputs[dim]].offset;
  }

  /**
   * Get scale for a given dataset dimension
   * @param {number} dim dataset dimension index
   * @returns {number} scale for the given dimension
   */
  getScale(dim) {
    return this.dataset.dataVectors[this.activeInputs[dim]].scale;
  }

  /**
   * Gets the minimum dataset (or user specified) value for a given dataset dimension
   * @param {number} dim dataset dimension index
   * @returns {number} minimum value for the given dimension
   */
  getMinimum(dim) {
    return this.dataset.dataVectors[this.activeInputs[dim]].minimum;
  }

  /**
   * Gets the maximum dataset (or user specified) value for a given dataset dimension
   * @param {number} dim dataset dimension index
   * @returns {number} maximum value for the given dimension
   */
  getMaximum(dim) {
    return this.dataset.dataVectors[this.activeInputs[dim]].maximum;
  }

  /**
   * Gets the visible minimum value (considering data and offset) for a given dataset dimension
   * @param {number} dim dataset dimension index
   * @returns {number} minimum visible value for the given dimension
   */
  getVisibleMinimum(dim) {
    return (0 - this.dataset.dataVectors[this.activeInputs[dim]].offset) /
      this.dataset.dataVectors[this.activeInputs[dim]].scale;
  }

  /**
   * Gets the visible maximum value (considering data and offset) for a given dataset dimension
   * @param {number} dim dataset dimension index
   * @returns {number} maximum visible value for the given dimension
   */
  getVisibleMaximum(dim) {
    return (1 - this.dataset.dataVectors[this.activeInputs[dim]].offset) /
      this.dataset.dataVectors[this.activeInputs[dim]].scale;
  }

  /**
   * Returns offset values of all dataset dimensions.
   * @returns {number[]} offset values for all dataset dimensions
   */
  getOffsets() {
    if (this.invalid === true) {
      this.recompute();
    }
    return this.offsets;
  }

  /**
   * Returns scale values of all dataset dimensions.
   * @returns {number[]} scale values for all dataset dimensions
   */
  getScales() {
    if (this.invalid === true) {
      this.recompute();
    }
    return this.scales;
  }

  /**
   * Returns currently animating scale values of all dataset dimensions.
   * @returns {number[]} current scale values for all dataset dimensions at this frame.
   */
  getAnimatedScales() {
    if (this.invalid === true) {
      this.recompute();
    }
    return this.animatedScales;
  }

  // Transformation methods

  /**
   * Transforms device coordinates to coordinates in the dataset
   * @param {number[]} vOutCoord output vector in dataset coordinate system
   * @param {number[]} vInCoord input vector in device coordinate system
   * @returns output vector in dataset coordiante system
   */
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

  /**
   * Transforms distance in device coordinate system to dataset coordinate system
   * @param {number[]} vOutCoord output distance vector in dataset coordinate system
   * @param {number[]} vInCoord input distance vector in device coordinate system
   * @returns output distance vector in dataset coordinate system
   */
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

  /**
   * Transforms dataset coordinates to device coordinates
   * @param {number[]} vOutCoord output vector in device coordinate system
   * @param {number[]} vInCoord input vector in dataset coordinate system
   * @returns output vector in device coordinate system
   */
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

  /**
   * Transforms distance in dataset coordinate system to device coordinate system
   * @param {number[]} vOutCoord output distance vector in device coordinate system
   * @param {number[]} vInCoord input distance vector in dataset coordinate system
   * @returns output distance vector in device coordinate system
   */
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

  /**
   * Transforms position in dataset coordinate system to device coordinate system
   * @param {number[]} vOutCoord output position vector in device coordinate system
   * @param {number[]} vInCoord input position vector in dataset coordinate system
   * @returns output position vector in device coordinate system
   */
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

  /**
   * Transforms normal in dataset coordinate system to device coordinate system
   * @param {number[]} vOutCoord output normal vector in device coordinate system
   * @param {number[]} vInCoord input normal vector in dataset coordinate system
   * @returns output position vector in device coordinate system
   */
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

export default Transform;
