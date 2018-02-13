const libUtility = require('./utility.js');
const libPathFinding = require('./pathFinding.js');

export function addTransformFunctions(cls) {
  const varCls = cls;
  varCls.transformX = function (x) {
    return (varCls.transform[0] * x) + varCls.transform[1];
  };
  varCls.transformY = function (y) {
    return (varCls.transform[2] * y) + varCls.transform[3];
  };
  varCls.invTransformX = function (x) {
    return (x - varCls.transform[1]) / varCls.transform[0];
  };
  varCls.invTransformY = function (y) {
    return (y - varCls.transform[3]) / varCls.transform[2];
  };
}

/**
 * @constructor
 * @package
 * @param {Object} obj A density map object
 */
export function DensityMap(obj) {
  this.data = obj.data;
  this.width = obj.width;
  this.height = obj.height;
  this.minimum = obj.minimum;
  this.maximum = obj.maximum;
  this.scale = obj.scale;
  this.offset = obj.offset;
  this.transform = obj.transform;
  this.options = obj.options;
  this.transformX = function (x) {
    return (this.transform[0] * x) + this.transform[1];
  };
  this.transformY = function (y) {
    return (this.transform[2] * y) + this.transform[3];
  };
  this.invTransformX = function (x) {
    return (x - this.transform[1]) / this.transform[0];
  };
  this.invTransformY = function (y) {
    return (y - this.transform[3]) / this.transform[2];
  };
}

/**
 * @summary Options to the {@link algorithm#computeDensityMap|computeDensityMap()} function
 * @constructor
 * @export
 * @param {DensityMapOptions=} source If not null, creates a copy of source
 */
export function DensityMapOptions(source) {
  if (source) {
    // Copy constructor
    this.maxExpectedRuntime = source.maxExpectedRuntime;
    this.cutoffIntensity = source.cutoffIntensity;
    this.gaussScale = source.gaussScale;
    this.logScale = source.logScale;
    this.inflateToFit = source.inflateToFit;
    this.shrinkToFit = source.shrinkToFit;
  } else {
    // Default constructor
    // Initial density map size (affected by maxExpectedRuntime, inflateToFit and shrinkToFit)
    /**
     * @alias maxExpectedRuntime
     * @memberof DensityMapOptions
     * @summary If the estimated runtime for computing the density map (in seconds)
     *          is higher than maxExpectedRuntime, the density map size is reduced
     * @type {number}
     * @default
     */
    this.maxExpectedRuntime = 1.0;
    /**
     * @alias cutoffIntensity
     * @memberof DensityMapOptions
     * @summary Densities below cutoffIntensity aren't computed
     * @type {number}
     * @default
     */
    this.cutoffIntensity = 0.001;
    /**
     * @alias gaussScale
     * @memberof DensityMapOptions
     * @summary Relative variance (variance normalized by density map size)
     * @type {number}
     * @default
     */
    this.gaussScale = 1000;
    /**
     * @alias logScale
     * @memberof DensityMapOptions
     * @summary When true, computes log-densities
     * @type {boolean}
     * @default
     */
    this.logScale = true;
    /**
     * @alias inflateToFit
     * @memberof DensityMapOptions
     * @summary When true, increases density map size to fit the full density map
     * @type {boolean}
     * @default
     */
    this.inflateToFit = true;
    /**
     * @alias shrinkToFit
     * @memberof DensityMapOptions
     * @summary When true, decreases density map size to the area of non-zero densities
     *          plus a zero-density border of 1 pixel thickness
     * @type {boolean}
     * @default
     */
    this.shrinkToFit = true;
  }
}

DensityMapOptions.equals = (optionsA, optionsB) =>
  optionsA.maxExpectedRuntime === optionsB.maxExpectedRuntime &&
  optionsA.cutoffIntensity === optionsB.cutoffIntensity &&
  optionsA.gaussScale === optionsB.gaussScale &&
  optionsA.logScale === optionsB.logScale &&
  optionsA.inflateToFit === optionsB.inflateToFit &&
  optionsA.shrinkToFit === optionsB.shrinkToFit;

/**
 * @constructor
 * @package
 * @param {Object} obj A cluster map object
 */
export function ClusterMap(obj) {
  this.data = obj.data;
  this.densities = obj.densities;
  this.minDensities = obj.minDensities;
  this.threshold = obj.threshold;
  this.numClusters = obj.numClusters;
  this.width = obj.width;
  this.height = obj.height;
  this.transform = obj.transform;
  this.transformX = function (x) {
    return (this.transform[0] * x) + this.transform[1];
  };
  this.transformY = function (y) {
    return (this.transform[2] * y) + this.transform[3];
  };
  this.invTransformX = function (x) {
    return (x - this.transform[1]) / this.transform[0];
  };
  this.invTransformY = function (y) {
    return (y - this.transform[3]) / this.transform[2];
  };
}

/**
 * @summary Options to the {@link algorithm#computeClusterMap|computeClusterMap()} function
 * @constructor
 * @export
 * @param {ClusterMapOptions=} source If not null, creates a copy of source
 */
export function ClusterMapOptions(source) {
  if (source) {
    this.densityMap = source.densityMap;
    this.threshold = source.threshold;
  } else {
    this.densityMap = null;
    /**
     * @alias threshold
     * @memberof ClusterMapOptions
     * @summary Densities below threshold * maximum-density are considered outliers
     * @type {number}
     * @default
     */
    this.threshold = 0.1;
  }
}

ClusterMapOptions.equals = (a, b) =>
  DensityMapOptions.equals(a.densityMap.options, b.densityMap.options) &&
  a.threshold === b.threshold;

/**
 * Compute a histogram of all points in the dataset over dimension d
 * @package
 * @param  {Dataset} dataset
 * @param  {number} dimIndex Index of the dataset dimension to use for binning
 * @param  {number} width The number of histogram bins
 * @return {Object} A 1D histogram
 */
export function computeHistogram(dataset, dimIndex, width) {
  const n = dataset.length;
  const v = dataset.dataVectors[dimIndex];
  const s = width / (v.maximum - v.minimum);
  const o = -v.minimum * s;
  const transform = [s, o, 1, 0];

  // Computed number of datapoints per histogram bin -> histogram, maximum
  let histogram = new Float32Array(width);
  // Start with 1, because as long as n > 0, there will be at least one bin with magnitude >= 1
  let maximum = 1;
  for (let i = 0; i < n; i += 1) {
    const p = Math.floor((v.getValue(i) * s) + o);
    histogram[Math.min(width - 1, p)] += 1;
    if (histogram[Math.min(width - 1, p)] > maximum) {
      maximum += 1;
    } // maximum can only grow by 1, so we know histogram[...] == maximum + 1
  }

  histogram = {
    data: histogram,
    maximum,
    width,
    height: 1,
    transform,
  };
  return histogram;
}

/**
 * Compute a histogram of all points in the dataset over dimensions d0 and d1
 * @package
 * @param  {Dataset} dataset
 * @param  {number} dim0 Index of the first dataset dimension to use for binning
 * @param  {number} dim1 Index of the second dataset dimension to use for binning
 * @param  {number} width The number of histogram bins in the first dimension
 * @param  {number} height The number of histogram bins in the first second
 * @return {Object} A 2D histogram
 */
export function computeHistogram2D(dataset, dim0, dim1, width, height) {
  const n = dataset.length;
  const v0 = dataset.dataVectors[dim0];
  const v1 = dataset.dataVectors[dim1];
  const s0 = width / (v0.maximum - v0.minimum);
  const o0 = -v0.minimum * s0;
  const s1 = height / (v1.maximum - v1.minimum);
  const o1 = -v1.minimum * s1;
  const transform = [s0, o0, s1, o1];

  // Computed number of datapoints per histogram bin -> histogram, maximum
  let histogram = new Float32Array(width * height);
  // Start with 1, because as long as n > 0, there will be at least one bin with magnitude >= 1
  let maximum = 1;
  for (let i = 0; i < n; i += 1) {
    const p0 = Math.floor((v0.getValue(i) * s0) + o0);
    const p1 = Math.floor((v1.getValue(i) * s1) + o1);
    const b = (Math.min(height - 1, p1) * width) + Math.min(width - 1, p0);
    histogram[b] += 1;
    if (histogram[b] > maximum) {
      maximum += 1;
    } // maximum can only grow by 1, so we know histogram[...] == maximum + 1
  }

  histogram = {
    data: histogram,
    maximum,
    width,
    height,
    transform,
  };
  return histogram;
}
/**
 * This function can be computed by an asynchronous worker.
 * It inputs and outputs plain JavaScript objects,
 * because data passed between the main thread and an asynchronous worker has to be primitive
 * (e.g. it cannot contain function objects).
 * @summary Compute a 2D density map from a 2D histogram computed by {@link computeHistogram2D}
 * @package
 * @param  {Object} histogram To create a histogram object from a 2D histogram,
 *          call `makeCloneable(histogram)`
 * @param  {DensityMapOptions} options
 * @return {Object} A density map object
 *
 * To get a {@link DensityMap} from the output object, call `new DensityMap(output)`.
 */
export function computeDensityMap(histogram, options) {
  let tiktokStart;
  const tik = function () {
    tiktokStart = performance.now();
  };
  const tok = function () {
    return (performance.now() - tiktokStart) / 1000;
  };

  // Get required information from histogram
  let width = histogram.width;
  let height = histogram.height;
  const transform = histogram.transform.slice();
  let initialDensities = histogram.data;
  let minDensity;
  let maxDensity = histogram.maximum;

  // Set parameters
  const cutoffIntensity = options.cutoffIntensity;
  const gaussScale = options.gaussScale;
  let normalizedGaussScale = -gaussScale / (width * height);
  const logScale = options.logScale;
  const inflateToFit = options.inflateToFit;
  let maxExtend = Math.max(width, height);

  // Compute a measure of expected runtime
  let expectedRuntime = 0;
  let newBoundsL = Number.MAX_VALUE;
  let newBoundsR = Number.MIN_VALUE;
  let newBoundsT = Number.MAX_VALUE;
  let newBoundsB = Number.MIN_VALUE;
  tik();
  if (inflateToFit) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (initialDensities[(y * width) + x] !== 0.0) {
          let r = Math.floor(Math.sqrt(Math.log(cutoffIntensity / initialDensities[(y * width) + x])
            / normalizedGaussScale)) - 1;
          r = Math.max(1, Math.min(maxExtend, r));

          expectedRuntime += r * r * Math.PI;
          newBoundsL = Math.min(newBoundsL, x - r);
          newBoundsR = Math.max(newBoundsR, x + r);
          newBoundsT = Math.min(newBoundsT, y - r);
          newBoundsB = Math.max(newBoundsB, y + r);
        }
      }
    }
  } else {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (initialDensities[(y * width) + x] !== 0.0) {
          let r = Math.floor(Math.sqrt(Math.log(cutoffIntensity / initialDensities[(y * width) + x])
            / normalizedGaussScale)) - 1;
          r = Math.max(1, Math.min(maxExtend, r));

          let trimX = Math.min(r, Math.min(x, width - x)) / r;
          let trimY = Math.min(r, Math.min(y, height - y)) / r;
          trimX = 0.5 + (0.5 * trimX * trimX);
          trimY = 0.5 + (0.5 * trimY * trimY);
          expectedRuntime += r * r * Math.PI * trimX * trimY;
        }
      }
    }
  }
  let t1 = tok(); // t1 = Runtime of runtime estimation

  expectedRuntime = inflateToFit ?
    0.011447356659209 * (expectedRuntime ** 0.508796587646921) :
    0.017471566555264 * (expectedRuntime ** 0.466050299746328);
  expectedRuntime *= t1;
  // libUtility.consoleLog("Expected runtime: " + expectedRuntime + "s");

  while (expectedRuntime > options.maxExpectedRuntime && width >= 2 && height >= 2) {
    // Downscale density map size by a factor of 2
    const downScaledWidth = Math.floor(width / 2);
    const downScaledHeight = Math.floor(height / 2);

    // Expected runtime too high. Down-scaling to: downScaledWidth x downScaledHeight
    transform[0] *= downScaledWidth / width;
    transform[1] *= downScaledWidth / width;
    transform[2] *= downScaledHeight / height;
    transform[3] *= downScaledHeight / height;

    // Recompute number of datapoints per density map pixel
    const downScaledInitialDensities = new Float32Array(downScaledWidth * downScaledHeight);
    maxDensity = 1;
    for (let y = 0; y < downScaledHeight; y += 1) {
      for (let x = 0; x < downScaledWidth; x += 1) {
        maxDensity = Math.max(maxDensity, downScaledInitialDensities[(y * downScaledWidth) + x] =
          initialDensities[(((2 * y) + 0) * width) + ((2 * x) + 0)] +
          initialDensities[(((2 * y) + 0) * width) + ((2 * x) + 1)] +
          initialDensities[(((2 * y) + 1) * width) + ((2 * x) + 0)] +
          initialDensities[(((2 * y) + 1) * width) + ((2 * x) + 1)]);
      }
    }
    initialDensities = downScaledInitialDensities;
    width = downScaledWidth;
    height = downScaledHeight;
    maxExtend = Math.max(width, height);
    normalizedGaussScale = -gaussScale / (width * height);

    // Recompute expected runtime
    expectedRuntime = 0;
    newBoundsL = Number.MAX_VALUE;
    newBoundsR = Number.MIN_VALUE;
    newBoundsT = Number.MAX_VALUE;
    newBoundsB = Number.MIN_VALUE;
    tik();
    if (inflateToFit) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          if (initialDensities[(y * width) + x] !== 0.0) {
            let r = Math.floor(Math.sqrt(Math.log(cutoffIntensity /
              initialDensities[(y * width) + x]) /
              normalizedGaussScale)) - 1;
            r = Math.max(1, Math.min(maxExtend, r));

            expectedRuntime += r * r * Math.PI;
            newBoundsL = Math.min(newBoundsL, x - r);
            newBoundsR = Math.max(newBoundsR, x + r);
            newBoundsT = Math.min(newBoundsT, y - r);
            newBoundsB = Math.max(newBoundsB, y + r);
          }
        }
      }
    } else {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          if (initialDensities[(y * width) + x] !== 0.0) {
            let r = Math.floor(Math.sqrt(Math.log(cutoffIntensity /
              initialDensities[(y * width) + x]) / normalizedGaussScale)) - 1;
            r = Math.max(1, Math.min(maxExtend, r));

            let trimX = Math.min(r, Math.min(x, width - x)) / r;
            let trimY = Math.min(r, Math.min(y, height - y)) / r;
            trimX = 0.5 + (0.5 * trimX * trimX);
            trimY = 0.5 + (0.5 * trimY * trimY);
            expectedRuntime += r * r * Math.PI * trimX * trimY;
          }
        }
      }
    }
    t1 = tok(); // t1 = Runtime of runtime estimation

    expectedRuntime = inflateToFit ?
      0.011447356659209 * (expectedRuntime ** 0.508796587646921) :
      0.017471566555264 * (expectedRuntime ** 0.466050299746328);
    expectedRuntime *= t1;
  }
  // Expected runtime acceptable

  let densitMapWidth;
  let densitMapHeight;
  if (inflateToFit) {
    if (options.shrinkToFit) {
      // Inflate output size to keep a 1-pixel-wide frame of zeros around the density map
      // This allows algorithms that march through densities to stay
      // within density map bounds without explictly checking
      newBoundsL -= 1;
      newBoundsR += 1;
      newBoundsT -= 1;
      newBoundsB += 1;
    }

    densitMapWidth = (newBoundsR - newBoundsL) + 1;
    densitMapHeight = (newBoundsB - newBoundsT) + 1;

    transform[1] -= newBoundsL;
    transform[3] -= newBoundsT;
  } else {
    densitMapWidth = width;
    densitMapHeight = height;
  }
  let densities = new Float32Array(densitMapWidth * densitMapHeight);

  // Set upper bound for maxExtend: Precomputed map of gaussian scales
  // shouldn't be larger than densityMap (size*size)
  maxExtend = Math.min(Math.floor(Math.sqrt(Math.log(cutoffIntensity /
    maxDensity) / normalizedGaussScale)), maxExtend);

  // Precompute 2D map array of gaussian scales within maxExtend*maxExtend -> gauss[]
  let gauss = new Float32Array(maxExtend * maxExtend);
  for (let y = 0; y < maxExtend; y += 1) {
    for (let x = 0; x < maxExtend; x += 1) {
      gauss[(y * maxExtend) + x] = Math.exp(normalizedGaussScale * ((x * x) + (y * y)));
    }
  }

  // Draw gaussians -> densities[]
  tik();
  if (inflateToFit) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (initialDensities[(y * width) + x] !== 0.0) {
          const initialDensitiesXY = initialDensities[(y * width) + x];

          // Compute extend of gaussian with value initialDensities_xy -> yExtend
          let yExtend = Math.sqrt(Math.log(cutoffIntensity /
            initialDensitiesXY) / normalizedGaussScale);
          yExtend = Math.min(Math.floor(yExtend), maxExtend) - 1;
          if (yExtend <= 0) {
            densities[(y * densitMapWidth) + x] += initialDensitiesXY;
            continue; // eslint-disable-line no-continue
          }
          const sqYExtend = yExtend * yExtend;

          for (let yy = y - yExtend, yend = y + yExtend; yy <= yend; yy += 1) {
          // Compute horizontal extend of gaussian at height yy - y => xExtend
            const xExtend = Math.floor(Math.sqrt(sqYExtend - ((yy - y) * (yy - y))));

            for (let xx = x - xExtend, xend = x + xExtend; xx <= xend; xx += 1) {
              densities[(((yy - newBoundsT) * densitMapWidth) + xx) - newBoundsL] +=
                initialDensitiesXY * gauss[(Math.abs(y - yy) * maxExtend) + Math.abs(x - xx)];
            }
          }
        }
      }
    }
  } else {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (initialDensities[(y * width) + x] !== 0.0) {
          const initialDensitiesXY = initialDensities[(y * width) + x];

          // Compute extend of gaussian with value initialDensities_xy -> yExtend
          let yExtend = Math.sqrt(Math.log(cutoffIntensity /
            initialDensitiesXY) / normalizedGaussScale);
          yExtend = Math.min(Math.floor(yExtend), maxExtend) - 1;
          if (yExtend <= 0) {
            densities[(y * densitMapWidth) + x] += initialDensitiesXY;
            continue; // eslint-disable-line no-continue
          }

          const sqYExtend = yExtend * yExtend;
          for (let yy = Math.max(0, y - yExtend),
            yend = Math.min(densitMapHeight - 1, y + yExtend);
            yy <= yend; yy += 1) {
            // Compute horizontal extend of gaussian at height yy - y => xExtend
            const xExtend = Math.floor(Math.sqrt(sqYExtend - ((yy - y) * (yy - y))));

            for (let xx = Math.max(0, x - xExtend),
              xend = Math.min(densitMapWidth - 1, x + xExtend);
              xx <= xend; xx += 1) {
              densities[(yy * densitMapWidth) + xx] +=
                initialDensitiesXY * gauss[(Math.abs(y - yy) * maxExtend) + Math.abs(x - xx)];
            }
          }
        }
      }
    }
  }

  // Free precomputed gaussian scales
  gauss = null;

  // Compute overall bounds of density map
  minDensity = Number.MAX_VALUE; maxDensity = Number.MIN_VALUE;
  newBoundsL = densitMapWidth - 1;
  newBoundsR = 0;
  newBoundsT = densitMapHeight - 1;
  newBoundsB = 0;
  for (let y = 0, i = 0; y < densitMapHeight; y += 1) {
    for (let x = 0; x < densitMapWidth; x += 1, i += 1) {
      const density = logScale ? Math.log(densities[i]) : densities[i];
      if (density > 0.0) {
        densities[i] = density;
        minDensity = Math.min(minDensity, density);
        maxDensity = Math.max(maxDensity, density);
        newBoundsL = Math.min(newBoundsL, x);
        newBoundsR = Math.max(newBoundsR, x);
        newBoundsT = Math.min(newBoundsT, y);
        newBoundsB = Math.max(newBoundsB, y);
      } else {
        densities[i] = 0.0;
      }
    }
  }

  if (options.shrinkToFit) {
    if (inflateToFit) {
      // Inflate output size to keep a 1-pixel-wide frame of zeros around the density map
      // This allows algorithms that march through densities to stay
      // within density map bounds without explictly checking
      newBoundsL -= 1;
      newBoundsR += 1;
      newBoundsT -= 1;
      newBoundsB += 1;
    }

    transform[1] -= newBoundsL;
    transform[3] -= newBoundsT;

    // Shrink density map to exclude non-empty area
    const resizedDensitMapWidth = Math.max(0, (newBoundsR - newBoundsL) + 1);
    const resizedDensitMapHeight = Math.max(0, (newBoundsB - newBoundsT) + 1);
    const resizedDensityMapLength = resizedDensitMapWidth * resizedDensitMapHeight;
    const resizedDensities = new Float32Array(resizedDensityMapLength);
    if (resizedDensities.length !== 0) {
      for (let y = 0, i = 0, j = newBoundsL + (newBoundsT * densitMapWidth);
        y < resizedDensitMapHeight; y += 1, j += densitMapWidth - resizedDensitMapWidth) {
        for (let x = 0; x < resizedDensitMapWidth; x += 1, i += 1, j += 1) {
          resizedDensities[i] = densities[j];
        }
      }
    }
    densities = resizedDensities;
    densitMapWidth = resizedDensitMapWidth;
    densitMapHeight = resizedDensitMapHeight;
  }

  const densityMap = {
    data: densities,
    minimum: minDensity,
    maximum: maxDensity,
    scale: 1.0 / (maxDensity - minDensity),
    offset: -minDensity / (maxDensity - minDensity),
    width: densitMapWidth,
    height: densitMapHeight,
    transform,
    options,
  };
  return densityMap;
}
/**
 * @summary Create a triangular matrix (d0 < d1) of density maps for each combination of dimensions
 * @package
 * @param  {Dataset} dataset
 * @param  {number} width
 * @param  {number} height
 * @param  {DensityMapOptions} options
 * @return {Array<Array<DensityMap>>} 2D array of density maps
 *
 * The density map of dimensions d0 and d1 can be accessed using `densityMapArray[d0][d1 - d0 - 1]`.
 */
export function computeDensityMapND(dataset, width, height, options) {
  const nc = dataset.numColumns;
  const densityMap = new Array(nc - 1);
  for (let d0 = 0; d0 < nc; d0 += 1) {
    densityMap[d0] = new Array(nc - d0 - 1);
    for (let d1 = d0 + 1; d1 < nc; d1 += 1) {
      densityMap[d0][d1 - d0 - 1] =
        new DensityMap(computeDensityMap(
          computeHistogram2D(
            dataset,
            d0, d1, width, height,
          ),
          options,
        ));
    }
  }
  return densityMap;
}

/**
 * This function computes point densities for each point in the dataset.
 * It returns the first `Math.floor(k * (1 - targetRatio))` lowest density points (outliers) and
 * the first `Math.floor(k * targetRatio)` highest density points (cluster centers),
 * given that all returned points are at least 'dist' apart.
 * @summary Choose k characteristic points from the given dataset based on the given density map
 * @package
 * @param  {Dataset} dataset
 * @param  {number} dim0 The first input dimension
 *                     (This value must match the one used to compute the histogram)
 * @param  {number} dim1 The second input dimension
 *                     (This value must match the one used to compute the histogram)
 * @param  {DensityMap} densityMap
 * @param  {number} numPointsToReturn Maximum number of points to return
 * @param  {number} dist Minimum Euclidean distance between returned points in normalized space
 *                      (in percentage of overall data space bounds)
 * @param  {number} targetRatio A ratio between 0 (only outliers) and 1 (only cluster centers)
 * @return {Array<number>} An array of up to k point indices of characteristic points
 */
export function findRepresentativePoints(
  dataset, dim0, dim1, densityMap,
  numPointsToReturn, dist, targetRatio,
) {
  if (numPointsToReturn <= 0) {
    return [];
  } // No representative points

  const n = dataset.length;
  const densities = densityMap.data;
  const width = densityMap.width;
  const height = densityMap.height;
  const v0 = dataset.dataVectors[dim0];
  const v1 = dataset.dataVectors[dim1];

  // Compute density at each datapoint
  const pointDensities = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    const p0 = Math.floor(densityMap.transformX(v0.getValue(i)));
    const p1 = Math.floor(densityMap.transformY(v1.getValue(i)));

    pointDensities[i] = densities[(Math.min(height - 1, p1) * width) + Math.min(width - 1, p0)];
  }

  // Create indices sorted by density
  const indices = Array.from(pointDensities.keys());
  indices.sort((idxA, idxB) => pointDensities[idxA] - pointDensities[idxB]);

  // Find k representative points
  const sqDist = dist * dist;
  let dHigh = indices.length - 1;
  let dLow = 0;
  let pointIsHigh;
  let numHighRepresentativePoints = 0;
  let ratio = 0.5; // Initial ratio is "fifty-fifty"
  const next = function () {
    if (ratio < targetRatio || (ratio === targetRatio && targetRatio >= 0.5)) {
      // If ratio is too low or ratio is perfect and targetRatio is high
      pointIsHigh = 1;
      dHigh -= 1;
      return dHigh + 1; // Retrieve next high density data point
    }
    // If ratio is too high or ratio is perfect and targetRatioChoose k characteristic
    // points from the given dataset based on the given density map is low
    pointIsHigh = 0;
    dLow += 1;
    return dLow - 1; // Retrieve next low density data point
  };
  const representativePoints = [indices[next()]]; // Set first represenatative point
  numHighRepresentativePoints += pointIsHigh;
  ratio = numHighRepresentativePoints / representativePoints.length;
  while (dHigh >= dLow && representativePoints.length < numPointsToReturn) {
    const di = indices[next()];
    const di0 = densityMap.transformX(v0.getValue(di)) / densityMap.width;
    const di1 = densityMap.transformY(v1.getValue(di)) / densityMap.height;

    if (representativePoints.every((p) => {
      const p0 = densityMap.transformX(v0.getValue(p)) / densityMap.width;
      const p1 = densityMap.transformY(v1.getValue(p)) / densityMap.height;
      return ((p0 - di0) ** 2) + ((p1 - di1) ** 2) > sqDist;
    })) {
      representativePoints.push(di);
      numHighRepresentativePoints += pointIsHigh;
      ratio = numHighRepresentativePoints / representativePoints.length;
    }
  }
  return representativePoints;
}

/**
 * This function calls {@link findRepresentativePoints} first with a point distance of 0.1 and
 * then iteratively shrinks the distance by half until the full k number of points are returned.
 * @summary Call {@link findRepresentativePoints},
 *  choosing the maximum point distance that yields k points
 * @package
 * @param  {Dataset} dataset
 * @param  {number} dim0 The first input dimension (This value must match the
 *                     one used to compute the histogram)
 * @param  {number} dim1 The second input dimension (This value must match the
 *                     one used to compute the histogram)
 * @param  {DensityMap} densityMap
 * @param  {number} numPointsToReturn Maximum number of points to return
 * @param  {number} targetRatio A ratio between 0 (only outliers) and 1 (only cluster centers)
 * @return {Array<number>} An array of up to k point indices of characteristic points
 */
export function findRepresentativePoints2(
  dataset, dim0, dim1,
  densityMap, numPointsToReturn, targetRatio,
) {
  let varK = numPointsToReturn;
  let varTargetRatio = targetRatio;
  if (libUtility.isUndefined(varTargetRatio)) {
    varTargetRatio = 0.5;
  } // Default ratio is "fifty-fifty"

  varK = Math.min(varK, dataset.length);
  let dist = 0.1;
  let representativePoints;
  // eslint-disable-next-line no-cond-assign
  while ((representativePoints =
    findRepresentativePoints(
      dataset, dim0, dim1, densityMap,
      varK, dist, varTargetRatio,
    )).length < varK) {
    dist /= 2.0;
  }
  return representativePoints;
}

/**
 * @summary N-dimensional version of {@link findRepresentativePoints}
 * @package
 * @param  {Dataset} dataset
 * @param  {Array<Array<DensityMap>>} densityMap
 * @param  {number} numPointsToReturn Maximum number of points to return
 * @param  {number} dist Minimum Euclidean distance between returned points in
 *                       normalized space (in percentage of overall data space bounds)
 * @return {Array<number>} An array of up to k point indices of characteristic points
 */
export function findRepresentativePointsND(dataset, densityMap, numPointsToReturn, dist) {
  if (numPointsToReturn <= 0) {
    return [];
  } // No representative points

  const data = dataset.fdata;
  const n = dataset.length;
  const nc = dataset.numColumns;
  const size = densityMap[0][0].width;
  const offsets = new Float32Array(nc);
  const scales = new Float32Array(nc);
  const p = new Float32Array(nc);
  for (let c = 0; c < nc; c += 1) {
    scales[c] = 1 / (dataset.columns[c].maximum - dataset.columns[c].minimum);
    offsets[c] = -dataset.columns[c].minimum * scales[c];
  }

  // Compute density at each datapoint
  const pointDensities = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    for (let c = 0; c < nc; c += 1) {
      p[c] = (data[(i * nc) + c] * scales[c]) + offsets[c];
    }

    pointDensities[i] = 0.0;
    for (let d0 = 0; d0 < nc; d0 += 1) {
      for (let d1 = d0 + 1; d1 < nc; d1 += 1) {
        const idx =
          (Math.min(Math.floor(p[d1] * size), size - 1) * size) +
          (Math.min(Math.floor(p[d0] * size), size - 1));
        pointDensities[i] += densityMap[d0][d1 - d0 - 1].data[idx];
      }
    }
  }

  // Create indices sorted by density
  const indices = Array.from(pointDensities.keys());
  indices.sort((idxA, idxB) => pointDensities[idxA] - pointDensities[idxB]);

  // Find k representative points
  const sqDist = dist * dist;
  const dpsq = new Float32Array(nc);
  let dHigh = indices.length - 1;
  let dLow = 0;
  // First represenatative point is point with highest density
  const representativePoints = [indices[dHigh]];
  dHigh -= 1;
  while (dHigh >= dLow && representativePoints.length < numPointsToReturn) {
    let di;
    if (representativePoints.length % 2 === 1) {
      di = indices[dLow];
      dLow += 1;
    } else {
      di = indices[dHigh];
      dHigh -= 1;
    }
    for (let c = 0; c < nc; c += 1) {
      p[c] = data[(di * nc) + c] * scales[c];
    }

    if (representativePoints.every((r) => {
      for (let c = 0; c < nc; c += 1) {
        dpsq[c] = ((data[(r * nc) + c] * scales[c]) - p[c]) ** 2;
      }

      for (let d0 = 0; d0 < nc; d0 += 1) {
        for (let d1 = d0 + 1; d1 < nc; d1 += 1) {
          if (dpsq[d0] + dpsq[d1] <= sqDist) {
            return false;
          }
        }
      }
      return true;
    })) {
      representativePoints.push(di);
    }
  }
  return representativePoints;
}
/**
 * @summary N-dimensional version of {@link findRepresentativePoints2}
 * @package
 * @param  {Dataset} dataset
 * @param  {Array<Array<DensityMap>>} densityMap
 * @param  {number} numPointsToReturn Maximum number of points to return
 * @return {Array<number>} An array of up to k point indices of characteristic points
 */
export function findRepresentativePointsND2(dataset, densityMap, numPointsToReturn) {
  const k = Math.min(numPointsToReturn, dataset.length);
  let dist = 0.2;
  let representativePoints;
  // eslint-disable-next-line no-cond-assign
  while ((representativePoints =
    findRepresentativePointsND(dataset, densityMap, k, dist)).length < k) {
    dist /= 2.0;
  }
  return representativePoints;
}

/**
 * @summary Find a low density point close to the p-th point of the dataset
 * @package
 * @param  {Dataset} dataset
 * @param  {number} dim0 The first input dimension
 *                     (This value must match the one used to compute the histogram)
 * @param  {number} dim1 The second input dimension
 *                     (This value must match the one used to compute the histogram)
 * @param  {number} refIndex Index of the reference point
 * @param  {DensityMap} densityMap
 * @param  {Object} stencilMap A binary matrix of same size as the density map that
 *                             records low-density points to avoid overlap
 * @param  {number} minDistX Minimum distance to reserve around the returned point in x-direction
 *                           of normalized space (in percentage of overall data space width)
 * @param  {number} minDistY Minimum distance to reserve around the returned point in y-direction
 *                           of normalized space (in percentage of overall data space height)
 * @return {Array<number>} 2D coordinates of the found point in data space
 */
export function findClosePointOfLowDensity(
  dataset, dim0, dim1,
  refIndex, densityMap, stencilMap,
  minDistX, minDistY,
) {
  const densities = densityMap.data;
  const width = densityMap.width;
  const height = densityMap.height;
  let densityScale = densityMap.scale;
  let densityOffset = -densityMap.offset;
  const v0 = dataset.dataVectors[dim0];
  const v1 = dataset.dataVectors[dim1];

  // Transform density, minDistX, minDistY from [0 ... 1] space to density map space
  densityOffset *= (width + height) / 2;
  densityScale *= (width + height) / 2;
  const minDMDistX = Math.ceil(minDistX * width);
  const minDMDistY = Math.ceil(minDistY * height);

  // Transform data point and data space bounds from data space to density map space
  const p0 = densityMap.transformX(v0.getValue(refIndex));
  const p1 = densityMap.transformY(v1.getValue(refIndex));
  const xmin = Math.min(0, Math.floor(densityMap.transformX(v0.minimum)) - minDMDistX - 1);
  const xmax = Math.max(width, Math.ceil(densityMap.transformX(v0.maximum)) + minDMDistX + 2);
  const ymin = Math.min(0, Math.floor(densityMap.transformY(v1.minimum)) - minDMDistY - 1);
  const ymax = Math.max(height, Math.ceil(densityMap.transformY(v1.maximum)) + minDMDistY + 2);
  const stencilStride = xmax - xmin;

  // Create stencilMap if it doesn't exist
  const varStencilMap = stencilMap;
  if (!varStencilMap.data) {
    varStencilMap.data =
      new Uint8Array((varStencilMap.width = xmax - xmin) * (varStencilMap.height = ymax - ymin));
  }
  const stencil = varStencilMap.data;

  // Mark p in stencil map
  let imgxmin = Math.max(xmin, Math.floor(p0) - minDMDistX);
  let imgxmax = Math.min(xmax, Math.floor(p0) + minDMDistX);
  let imgymin = Math.max(ymin, Math.floor(p1) - minDMDistY);
  let imgymax = Math.min(ymax, Math.floor(p1) + minDMDistY);
  for (let y = imgymin; y < imgymax; y += 1) {
    for (let x = imgxmin; x < imgxmax; x += 1) {
      stencil[((y - ymin) * stencilStride) + (x - xmin)] = 1;
    }
  }

  // Square minimum distances
  const sqMinDistX = minDMDistX * minDMDistX;
  const sqMinDistY = minDMDistY * minDMDistY;
  const sqDensityOffset = densityOffset * densityOffset;

  let closestPoint = null;
  let closestPointPenalty = Number.MAX_VALUE;
  let sqdx;
  let sqdy;
  for (let y = ymin; y < ymax; y += 1) {
    for (let x = xmin; x < xmax; x += 1) {
      if (stencil[((y - ymin) * stencilStride) + (x - xmin)] === 0) {
        sqdx = (x - p0) ** 2;
        sqdy = (y - p1) ** 2;
        if (sqdx > sqMinDistX && sqdy > sqMinDistY) {
          const sqDensity =
            x >= 0 && x < width && y >= 0 && y < height ?
              (densityOffset + (densities[(y * width) + x] * densityScale)) ** 2 :
              sqDensityOffset;
          const sqDist = sqdx + sqdy;
          const penalty = (1e10 * sqDensity) + sqDist;
          if (penalty < closestPointPenalty) {
            closestPointPenalty = penalty;
            closestPoint = [x, y];
          }
        }
      }
    }
  }
  if (closestPoint === null) {
    return closestPoint;
  }

  // Mark image in stencil map
  imgxmin = Math.max(xmin, closestPoint[0] - (2 * minDMDistX));
  imgxmax = Math.min(xmax, closestPoint[0] + (2 * minDMDistX));
  imgymin = Math.max(ymin, closestPoint[1] - (2 * minDMDistY));
  imgymax = Math.min(ymax, closestPoint[1] + (2 * minDMDistY));
  for (let y = imgymin; y < imgymax; y += 1) {
    for (let x = imgxmin; x < imgxmax; x += 1) {
      stencil[((y - ymin) * stencilStride) + (x - xmin)] = 1;
    }
  }

  // Transform closestPoint back from density map space to data space
  // (closestPoint[0] / width - o0) / s0;
  closestPoint[0] = densityMap.invTransformX(closestPoint[0]);
  // (closestPoint[1] / height - o1) / s1;
  closestPoint[1] = densityMap.invTransformY(closestPoint[1]);

  return closestPoint;
}

/**
 * This function marks regions of minDistX/minDistY around each point in points in the stencil map.
 * These regions are ignored when looking for points of low density
 * using {@link findClosePointOfLowDensity}.
 * @package
 * @summary Mark the given points in the stencil map
 * @param  {Dataset} dataset
 * @param  {number} dim0 The first input dimension
 *                    (This value must match the one used to compute the histogram)
 * @param  {number} dim1 The second input dimension
 *                    (This value must match the one used to compute the histogram)
 * @param  {Array<number>} points Indices to points to mark
 * @param  {DensityMap} densityMap
 * @param  {Object} stencilMap A binary matrix of same size as the density map
 *                            that records low-density points to avoid overlap
 * @param  {number} minDistX Minimum distance to reserve around the marked points in x-direction of
 *                            normalized space (in percentage of overall data space width)
 * @param  {number} minDistY Minimum distance to reserve around the marked points in y-direction of
 *                            normalized space (in percentage of overall data space height)
 */
export function markPointsInStencilMap(
  dataset, dim0, dim1, points,
  densityMap, stencilMap, minDistX, minDistY,
) {
  const width = densityMap.width;
  const height = densityMap.height;
  const v0 = dataset.dataVectors[dim0];
  const v1 = dataset.dataVectors[dim1];

  // Transform minDistX, minDistY from [0 ... 1] space to density map space
  const minDMDistX = Math.ceil(minDistX * width);
  const minDMDistY = Math.ceil(minDistY * height);

  // Transform data space bounds from data space to density map space
  const xmin = Math.min(0, Math.floor(densityMap.transformX(v0.minimum)) - minDMDistX - 1);
  const xmax = Math.max(width, Math.ceil(densityMap.transformX(v0.maximum)) + minDMDistX + 2);
  const ymin = Math.min(0, Math.floor(densityMap.transformY(v1.minimum)) - minDMDistY - 1);
  const ymax = Math.max(height, Math.ceil(densityMap.transformY(v1.maximum)) + minDMDistY + 2);
  const stencilStride = xmax - xmin;

  // Create stencilMap if it doesn't exist
  const varStencilMap = stencilMap;
  if (!varStencilMap.data) {
    varStencilMap.data =
      new Uint8Array((varStencilMap.width = xmax - xmin) * (varStencilMap.height = ymax - ymin));
  }
  const stencil = varStencilMap.data;

  points.forEach((p) => {
    const p0 = Math.floor(densityMap.transformX(v0.getValue(p)));
    const p1 = Math.floor(densityMap.transformY(v1.getValue(p)));
    const imgxmin = Math.max(xmin, p0 - minDMDistX);
    const imgxmax = Math.min(xmax, p0 + minDMDistX);
    const imgymin = Math.max(ymin, p1 - minDMDistY);
    const imgymax = Math.min(ymax, p1 + minDMDistY);
    for (let y = imgymin; y < imgymax; y += 1) {
      for (let x = imgxmin; x < imgxmax; x += 1) {
        stencil[((y - ymin) * stencilStride) + (x - xmin)] = 1;
      }
    }
  });
}

/**
 * @summary Download the given stencil map as black-and-white image
 * @package
 * @param  {Object} stencilMap
 * @param  {string=} outputFileName=stencilMap.png The file name of the downloaded image.
 */
export function downloadStencilMap(stencilMap, outputFileName) {
  let fileName = outputFileName;
  if (!fileName) {
    fileName = 'stencilMap.png';
  }

  const bytes = new Uint8Array(4 * stencilMap.width * stencilMap.height);
  for (let i = 0; i < stencilMap.data.length; i += 1) {
    bytes[(i * 4) + 0] = stencilMap.data[i] !== 0 ? 255 : 0;
    bytes[(i * 4) + 1] = bytes[(i * 4) + 0];
    bytes[(i * 4) + 2] = bytes[(i * 4) + 0];
    bytes[(i * 4) + 3] = 255;
  }
  libUtility.download(
    fileName,
    libUtility.imageUrlFromBytes(bytes, stencilMap.width, stencilMap.height),
  );
}

/**
 * This function uses uniform cost search to explore regions beyond local minima.
 * @summary Find a low density point close to the p-th point of the dataset
 *          by following the gradient of the density map
 * @package
 * @param  {Dataset} dataset
 * @param  {number} dim0 The first input dimension
 *                    (This value must match the one used to compute the histogram)
 * @param  {number} dim1 The second input dimension
 *                    (This value must match the one used to compute the histogram)
 * @param  {number} refIndex Index of the reference point
 * @param  {DensityMap} densityMap
 * @param  {number} minDistX Minimum distance to reserve around the returned point in x-direction of
 *                           normalized space (in percentage of overall data space width)
 * @param  {number} minDistY Minimum distance to reserve around the returned point in y-direction of
 *                           normalized space (in percentage of overall data space height)
 * @return {Array<number>} 2D coordinates of the found point in data space
 * @deprecated Use {@link findClosePointOfLowDensity} instead
 */
export function findClosePointOfLowDensityDescend(
  dataset, dim0, dim1, refIndex,
  densityMap, minDistX, minDistY,
) {
  const data = dataset.fdata;
  const nc = dataset.numColumns;
  const s0 = 1 / (dataset.columns[dim0].maximum - dataset.columns[dim0].minimum);
  const o0 = -dataset.columns[dim0].minimum * s0;
  const s1 = 1 / (dataset.columns[dim1].maximum - dataset.columns[dim1].minimum);
  const o1 = -dataset.columns[dim1].minimum * s1;
  const densities = densityMap.data;
  const width = densityMap.width;
  const height = densityMap.height;
  let densityScale = densityMap.scale;
  let densityOffset = -densityMap.offset;

  // Transform data point from data space to density map space
  const p0 = ((data[(refIndex * nc) + dim0] * s0) + o0) * width;
  const p1 = ((data[(refIndex * nc) + dim1] * s1) + o1) * height;

  // Transform density, minDistX, minDistY from [0 ... 1] space to density map space
  densityOffset *= (width + height) / 2;
  densityScale *= (width + height) / 2;
  const minDMDistX = Math.ceil(minDistX * width);
  const minDMDistY = Math.ceil(minDistY * height);

  // Define overall bounds
  const xMin = minDMDistX;
  const xMax = width - minDMDistX;
  const yMin = minDMDistY;
  const yMax = height - minDMDistY;

  const computePenalty = function (x, y) {
    const sqDensity = (densityOffset + (densities[(y * width) + x] * densityScale)) ** 2;
    const sqDist = ((x - p0) ** 2) + ((y - p1) ** 2);
    return (1e5 * sqDensity) + sqDist;
  };

  let bestState = { penalty: Number.MAX_VALUE };
  let maxIterations = 5000;
  const searchProblem = {
    getStartState() {
      return {
        x: Math.max(xMin, Math.min(xMax - 1, Math.floor(p0))),
        y: Math.max(yMin, Math.min(yMax - 1, Math.floor(p1))),
      };
    },
    isGoalState(/* state */) {
      maxIterations -= 1;
      return maxIterations === 0;
    },
    forEachSuccessor(state, onSuccessor) {
      [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
        .forEach((action) => {
          const x = state.x + action[0];
          const y = state.y + action[1];
          if (x >= xMin && x < xMax && y >= yMin && y < yMax) {
            const newState = { x, y, penalty: computePenalty(x, y) };
            if (newState.penalty < bestState.penalty &&
            (x < p0 - minDMDistX || x > p0 + minDMDistX) &&
            (y < p0 - minDMDistY || y > p0 + minDMDistY)) {
              bestState = newState;
            }
            onSuccessor(newState, newState.penalty);
          }
        });
    },
    computeHash(state) {
      return (state.y * width) + state.x;
    },
    heuristic(state) {
      return (densityOffset + (densities[(state.y * width) + state.x] * densityScale)) ** 2;
    },
  };
  libPathFinding.SimpleUniformCostSearch(searchProblem);
  const closestPoint = [bestState.x, bestState.y];

  // Transform closestPoint back from density map space to data space
  closestPoint[0] = ((closestPoint[0] / width) - o0) / s0;
  closestPoint[1] = ((closestPoint[1] / height) - o1) / s1;

  return closestPoint;
}

/**
 * @summary N-dimensional version of {@link findClosePointOfLowDensityDescend}
 * @package
 * @param  {Dataset} dataset
 * @param  {number} refIndex Index of the reference point
 * @param  {Array<Array<DensityMap>>} densityMap
 * @param  {number} minDist Minimum distance to reserve around the returned point in
 *                          normalized space (in percentage of overall data space bounds)
 * @return {Array<number>} {@link Dataset#numColumns}-diemnsional coordinates of
 *                          the found point in data space
 * @deprecated This function is slow and yields unsatisfying results.
 *             Consider using 2D algorithms instead.
 */
export function findClosePointOfLowDensityNDDescend(dataset, refIndex, densityMap, minDist) {
  const data = dataset.fdata;
  const nc = dataset.numColumns;
  const size = densityMap[0][0].width;
  let densityScale = densityMap[0][0].scale;
  let densityOffset = -densityMap[0][0].offset; // EDIT: Take offset/scale over all density maps

  // Transform data point from data space to [0 ... size] space
  const start = new Float32Array(nc);
  for (let c = 0; c < nc; c += 1) {
    start[c] = ((data[(refIndex * nc) + c] - dataset.columns[c].minimum) * size) /
      (dataset.columns[c].maximum - dataset.columns[c].minimum);
  }

  // Transform density and minDist from [0 ... 1] space to [0 ... size] space
  densityOffset *= size;
  densityScale *= size;
  const minDistSize = Math.ceil(minDist * size);

  // Define overall bounds
  const min = minDistSize;
  const max = size - minDistSize;

  const actions = [];
  const a = new Float32Array(nc);
  let i;
  for (let c = 0; c < nc; c += 1) {
    a[c] = -1;
  }
  do {
    if (!a.every(aa => aa === 0)) {
      actions.push(a.slice());
    }
    i = 0;
    // eslint-disable-next-line no-cond-assign
    while (i !== a.length && (a[i] += 1) === 2) {
      a[i] = 0;
      i += 1;
    }
  } while (i !== a.length);

  const computePenalty = function (pty) {
    let sqDensity = 0.0;
    for (let d0 = 0; d0 < nc; d0 += 1) {
      for (let d1 = d0 + 1; d1 < nc; d1 += 1) {
        sqDensity += (densityOffset +
          (densityMap[d0][d1 - d0 - 1].data[(pty[d1] * size) + pty[d0]] * densityScale)) ** 2;
      }
    }
    const sqDist = pty.reduce((ax, pt, pi) => {
      const dp = Math.abs(pt - start[pi]);
      return ax + (dp > minDistSize ?
        (dp - minDistSize) ** 2 :
        (minDistSize - dp) ** 2);
    });
    return sqDensity + sqDist;
  };

  let bestState = { penalty: Number.MAX_VALUE };
  let maxIterations = 100;// 5000;
  const searchProblem = {
    getStartState() {
      const startArray = new Float32Array(nc);
      for (let c = 0; c < nc; c += 1) {
        startArray[c] = Math.max(min, Math.min(max - 1, Math.floor(start[c])));
      }
      return { p: startArray };
    },
    isGoalState(/* state */) {
      maxIterations -= 1;
      return maxIterations === 0;
    },
    forEachSuccessor(state, onSuccessor) {
      actions.forEach((action) => {
        const pa = new Float32Array(nc);
        for (let c = 0; c < nc; c += 1) {
          pa[c] = state.p[c] + action[c];
          if (pa[c] < min || pa[c] >= max) {
            return;
          }
        }
        const newState = { pa, penalty: computePenalty(pa) };
        if (newState.penalty < bestState.penalty) {
          bestState = newState;
        }
        onSuccessor(newState, newState.penalty);
      });
    },
    computeHash(state) {
      let factor = 1.0;
      let hash = 0.0;
      for (let c = 0; c < nc; c += 1) {
        hash += state.p[c] * factor;
        factor *= size;
      }
      return hash;
    },
    heuristic(state) {
      let sqDensity = 0.0;
      for (let d0 = 0; d0 < nc; d0 += 1) {
        for (let d1 = d0 + 1; d1 < nc; d1 += 1) {
          sqDensity += (densityOffset +
            (densityMap[d0][d1 - d0 - 1].data[(state.p[d1] * size) + state.p[d0]]
              * densityScale)) ** 2;
        }
      }
      return sqDensity;
    },
  };

  libPathFinding.SimpleUniformCostSearch(searchProblem);
  // Other options for search algorithms:
  //  libPathFinding.BreadthFirstSearch
  //  libPathFinding.DepthFirstSearch
  //  libPathFinding.SimpleAStarSearch
  //  libPathFinding.SimpleGreedySearch
  const closestPoint = bestState.p;

  // Transform closestPoint back from [0 ... size] space to data space
  for (let c = 0; c < nc; c += 1) {
    closestPoint[c] = dataset.columns[c].minimum +
      ((closestPoint[c] * (dataset.columns[c].maximum - dataset.columns[c].minimum)) / size);
  }

  return closestPoint;
}
/**
 * This function uses rejection sampling
 * @summary Find a point within the density map by sampling densities
 * @package
 * @param  {DensityMap} densityMap
 * @return {Array<number>} 2D coordinates of the sampled point in density map coordinates
 */
export function sampleDensityMap(densityMap) {
  const width = densityMap.width;
  const height = densityMap.height;
  const scale = densityMap.maximum;

  let sampleX;
  let sampleY;
  let sampleD;
  // var nAttempts = 0;
  do {
    sampleX = Math.random() * width;
    sampleY = Math.random() * height;
    sampleD = Math.random() * scale;
    // nAttempts += 1;
  } while (densityMap.data[(Math.floor(sampleY) * width) + Math.floor(sampleX)] < sampleD);

  return [sampleX, sampleY];
}
/**
 * This function uses rejection sampling
 * @summary Find a point within a fixed column of the density map by sampling densities
 * @package
 * @param  {DensityMap} densityMap
 * @param  {number} sampleCol The column of the density map to sample
 * @param  {number} maxIterations The maximum number of attempts, before `NaN` is returned
 * @return {number} The y-coordinate (row) of the sampled point or
 *                  `NaN` if maxIterations attempts were unsuccessful
 */
export function sampleDensityMapRow(densityMap, sampleCol, maxIterations) {
  let varMaxIterations = maxIterations;
  if (libUtility.isUndefined(varMaxIterations)) {
    varMaxIterations = Number.MAX_SAFE_INTEGER;
  }

  const width = densityMap.width;
  const height = densityMap.height;
  const scale = densityMap.maximum;
  const sampleY = Math.floor(sampleCol) * height;

  let sampleX;
  let sampleD;
  do {
    sampleX = Math.random() * width;
    sampleD = Math.random() * scale;
    varMaxIterations -= 1;
  } while (varMaxIterations && densityMap.data[sampleY + Math.floor(sampleX)] < sampleD);

  return densityMap.data[sampleY + Math.floor(sampleX)] >= sampleD ? sampleX : NaN;
}
/**
 * This function uses rejection sampling
 * @summary Find a point within a fixed row of the density map by sampling densities
 * @package
 * @param  {DensityMap} densityMap
 * @param  {number} sampleRow The row of the density map to sample
 * @param  {number} maxIterations The maximum number of attempts, before `NaN` is returned
 * @return {number} The x-coordinate (column) of the sampled point
 *                  or `NaN` if maxIterations attempts were unsuccessful
 */
export function sampleDensityMapColumn(densityMap, sampleRow, maxIterations) {
  let varMaxIterations = maxIterations;
  if (libUtility.isUndefined(varMaxIterations)) {
    varMaxIterations = Number.MAX_SAFE_INTEGER;
  }

  const width = densityMap.width;
  const height = densityMap.height;
  const scale = densityMap.maximum;
  const sampleX = Math.floor(sampleRow);
  let sampleY;
  let sampleD;

  do {
    sampleY = Math.random() * height;
    sampleD = Math.random() * scale;
    varMaxIterations -= 1;
  } while (varMaxIterations &&
      densityMap.data[(Math.floor(sampleY) * width) + sampleX] < sampleD);

  return densityMap.data[(Math.floor(sampleY) * width) + sampleX] >= sampleD ? sampleY : NaN;
}

/**
 * This function uses rejection sampling
 * @summary Find a point in n-dimensional space by sampling a chain of (n-1) 2D density maps
 * @package
 * @param  {Array<DensityMap>} densityMapChain An array of density maps of the form
 * `[DensityMap(dim0=0, dim1=1), DensityMap(dim0=1, dim1=2) ... DensityMap(dim0=n-2, dim1=n-1)]`
 * @return {Array<number>} n-dimensional coordinates of the sampled point
 *                         in density map coordinates
 */
export function sampleDensityMapChain(densityMapChain) {
  const chainLength = densityMapChain.length;
  const sample = new Array(chainLength + 1);

  // Pick an initial densityMap from the chain
  const sampleM = Math.floor(Math.random() * chainLength);

  let i;
  let lastSample;
  do {
    // Sample the initial map
    const initialSamples = sampleDensityMap(densityMapChain[sampleM]);
    sample[sampleM] = initialSamples[0];
    sample[sampleM + 1] = initialSamples[1];

    // Sample below initialSamples
    lastSample = initialSamples[0];
    for (i = sampleM - 1; i >= 0 && !Number.isNaN(lastSample); i -= 1) {
      lastSample = sampleDensityMapRow(densityMapChain[i], lastSample, sampleM - i);
      sample[i] = lastSample;
    }
    if (Number.isNaN(lastSample)) {
      continue; // eslint-disable-line no-continue
    }

    // Sample above initialSamples
    lastSample = initialSamples[1];
    for (i = sampleM + 1; i < chainLength && !Number.isNaN(lastSample); i += 1) {
      lastSample = sampleDensityMapColumn(densityMapChain[i], lastSample, i - sampleM);
      sample[i + 1] = lastSample;
    }
  } while (Number.isNaN(lastSample));

  return sample;
}

const ForwardList = libUtility.ForwardList;
const PriorityQueue = libUtility.PriorityQueue;

/**
 * This function can be computed by an asynchronous worker.
 * It inputs and outputs plain JavaScript objects, because data passed between
 * the main thread and an asynchronous worker has to be primitive
 * (e.g. it cannot contain function objects).
 * @summary Compute a {@link ClusterMap} from a {@link DensityMap}
 *          computed by {@link computeDensityMap}
 * @package
 * @param  {Object} densityMap To create a densityMap object
 *                  from a {@link DensityMap}, call `makeCloneable(densityMap)`
 * @param  {number} dim0 The first input dimension
 *         (This value must match the one used to compute the histogram)
 * @param  {number} dim1 The second input dimension
 *         (This value must match the one used to compute the histogram)
 * @param  {ClusterMapOptions} options
 * @return {Object} A cluster map object
 *
 * To get a {@link ClusterMap} from the output object, call `new ClusterMap(clusterMap)`
 */
export function computeClusterMap(densityMap, dim0, dim1, options) {
  const densities = densityMap.data;
  const width = densityMap.width;
  const height = densityMap.height;
  const len = width * height;
  const densityThreshold = options.threshold * densityMap.maximum;

  // Allocate cluster map
  const clustermap = new Uint32Array(len);

  // Walk through density map and combine regions of
  // density >= densityThreshold into clusters -> clusters, clustermap
  let leftClusterId;
  let topClusterId;
  const clusters = [];
  for (let y = 0; y < height; y += 1) {
    leftClusterId = 0;
    for (let x = 0; x < width; x += 1) {
      const d = densities[(y * width) + x];
      if (d >= densityThreshold) {
        if (leftClusterId !== 0) {
          // eslint-disable-next-line no-cond-assign
          if (y !== 0 &&
            (topClusterId = clustermap[((y - 1) * width) + x]) !== 0 &&
            topClusterId !== leftClusterId) {
            // Link clusters
            const leftCluster = clusters[leftClusterId - 1];
            const topCluster = clusters[topClusterId - 1];
            clusters[leftClusterId - 1] = ForwardList.sortedMerge(leftCluster, topCluster);
            clusters[topClusterId - 1] = clusters[leftClusterId - 1];
            topClusterId = leftClusterId;
          }
          clustermap[(y * width) + x] = leftClusterId;
          // eslint-disable-next-line no-cond-assign
        } else if (y !== 0 && (topClusterId = clustermap[((y - 1) * width) + x]) !== 0) {
          leftClusterId = topClusterId;
          clustermap[(y * width) + x] = leftClusterId;
        } else {
          leftClusterId = clusters.length + 1;
          clustermap[(y * width) + x] = leftClusterId;
          clusters.push(new ForwardList(leftClusterId));
        }
      } else {
        // For languages that don't initialize arrays
        //  clustermap[(y * width) + x] = leftClusterId = 0;
        leftClusterId = 0;
      }
    }
  }

  // Combine lists of merged cluster IDs to cluster IDs -> clusters
  let clusterId = 1;
  for (let i = 0; i < clusters.length; i += 1) {
    if (clusters[i] === null) {
      clusters[i] = 0;
    } else if (clusters[i] instanceof ForwardList) {
      clusters[i].forEach((id) => { // eslint-disable-line no-loop-func
        clusters[id - 1] = clusterId;
      });
      clusterId += 1;
    }
  }
  clusterId -= 1;
  const numClusters = clusterId;

  // Assign cluster IDs to clustermap -> clustermap
  for (let i = 0; i < len; i += 1) {
    clustermap[i] = clustermap[i] ? clusters[clustermap[i] - 1] : 0;
  }

  // Compute cluster densities (= maximum densities per cluster) -> clusterDensities
  // eslint-disable-next-line prefer-spread
  const clusterDensities = Array.apply(null, Array(numClusters))
    .map(Number.prototype.valueOf, Number.MIN_VALUE);
  for (let i = 0; i < len; i += 1) {
    clusterId = clustermap[i];
    if (clusterId) {
      clusterDensities[clusterId - 1] =
        Math.max(clusterDensities[clusterId - 1], densityMap.data[i]);
    }
  }

  // eslint-disable-next-line prefer-spread
  const clusterMinDensities = Array.apply(null, Array(numClusters))
    .map(Number.prototype.valueOf, densityThreshold);

  const enableExtensionToZeroDensity = false;
  if (enableExtensionToZeroDensity) {
    // Extend clusters to fill entire density != 0 area

    // Queue of all neighbors of clusters (candidates ro be included in the cluster)
    const neighborQueue = new PriorityQueue('d');

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (clustermap[(y * width) + x] !== 0 &&
          (
            (x < width - 1 && clustermap[((y * width) + x) - 1] === 0) ||
            (x > 0 && clustermap[(y * width) + x + 1] === 0) ||
            (y > 0 && clustermap[((y - 1) * width) + x] === 0) ||
            (y < height - 1 && clustermap[((y + 1) * width) + x] === 0)
          )) {
          neighborQueue.push({
            c: clustermap[(y * width) + x], x, y, d: densities[(y * width) + x],
          });
        }
      }
    }

    while (neighborQueue.length) {
      const neighbor = neighborQueue.shift();
      let x = neighbor.x;
      let y = neighbor.y;
      const id = neighbor.c;
      x -= 1;
      if (x !== -1) {
        let nd = densities[(y * width) + x];
        if (nd !== 0 && clustermap[(y * width) + x] === 0) {
          neighborQueue.push({
            c: clustermap[(y * width) + x] = id, x, y, d: nd = densities[(y * width) + x],
          });
          clusterMinDensities[id - 1] = Math.min(clusterMinDensities[id - 1], nd);
        }
      }

      x += 2;
      if (x !== width) {
        let nd = densities[(y * width) + x];
        if (nd !== 0 && clustermap[(y * width) + x] === 0) {
          neighborQueue.push({
            c: clustermap[(y * width) + x] = id, x, y, d: nd = densities[(y * width) + x],
          });
          clusterMinDensities[id - 1] = Math.min(clusterMinDensities[id - 1], nd);
        }
      }

      x -= 1;
      y -= 1;
      if (y !== -1) {
        let nd = densities[(y * width) + x];
        if (nd !== 0 && clustermap[(y * width) + x] === 0) {
          neighborQueue.push({
            c: clustermap[(y * width) + x] = id, x, y, d: nd = densities[(y * width) + x],
          });
          clusterMinDensities[id - 1] = Math.min(clusterMinDensities[id - 1], nd);
        }
      }

      y += 2;
      if (y !== height) {
        let nd = densities[(y * width) + x];
        if (nd !== 0 && clustermap[(y * width) + x] === 0) {
          neighborQueue.push({
            c: clustermap[(y * width) + x] = id, x, y, d: nd = densities[(y * width) + x],
          });
          clusterMinDensities[id - 1] = Math.min(clusterMinDensities[id - 1], nd);
        }
      }
    }
  }

  const clusterMap = {
    data: clustermap,
    densities: clusterDensities,
    minDensities: clusterMinDensities,
    threshold: densityThreshold,
    numClusters,
    width,
    height,
    transform: densityMap.transform,
    /* transformX: densityMap.transformX,
    transformY: densityMap.transformY,
    invTransformX: densityMap.invTransformX,
    invTransformY: densityMap.invTransformY */
  };
  return clusterMap;
}

/**
 * @summary Download the given density map as floating point image
 * @package
 * @param  {DensityMap} densityMap
 * @param  {string=} outputFileName=densityMap.png The file name of the downloaded image.
 */
export function downloadDensityMap(densityMap, outputFileName) {
  let fileName = outputFileName;
  if (!fileName) {
    fileName = 'densityMap.png';
  }

  libUtility.download(fileName, libUtility.imageUrlFromBytes(
    libUtility.F32toI24flipY(
      densityMap.data,
      [densityMap.minimum, densityMap.maximum],
      densityMap.width, densityMap.height,
    ),
    densityMap.width, densityMap.height,
  ));
}

/**
 * @summary 2D vector-line intersection test
 * @package
 * @param  {Array<number>} vecPos Origin of the vector
 * @param  {Array<number>} vecDir Direction of the vector
 * @param  {Array<number>} lineP1 Start point of the line
 * @param  {Array<number>} lineP2 End point of the line
 * @return {Array<number>} Point of intersection or null if no intersection occured
 */
export function vectorLineIntersection2D(vecPos, vecDir, lineP1, lineP2) {
  const x1 = vecPos[0];
  const y1 = vecPos[1];
  const x2 = vecPos[0] + vecDir[0];
  const y2 = vecPos[1] + vecDir[1];
  const x3 = lineP1[0];
  const y3 = lineP1[1];
  const x4 = lineP2[0];
  const y4 = lineP2[1];

  const denom = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
  if (denom > -1e-5 && denom < 1e-5) {
    return null;
  } // Line and vector are parallel or coincident

  // libUtility.consoleLog([(x1 * y2 - y1 * x2) / denom, (x3 * y4 - y3 * x4) / denom]);

  const xi = ((((x1 * y2) - (y1 * x2)) * (x3 - x4)) -
               ((x1 - x2) * ((x3 * y4) - (y3 * x4)))) / denom;
  const yi = ((((x1 * y2) - (y1 * x2)) * (y3 - y4)) -
               ((y1 - y2) * ((x3 * y4) - (y3 * x4)))) / denom;


  const u = Math.abs(x4 - x3) > Math.abs(y4 - y3) ? (xi - x3) / (x4 - x3) : (yi - y3) / (y4 - y3);
  // libUtility.consoleLog(u);
  if (u < 0.0 || u > 1.0) {
    return null;
  } // Intersection lies outside the range a...b


  return [xi, yi];
}

/**
 * Source: http://ideone.com/PnPJgb
 * @summary 2D line-line intersection test
 * @package
 * @param  {Array<number>} line1P1 Start point of line 1
 * @param  {Array<number>} line1P2 End point of line 1
 * @param  {Array<number>} line2P1 Start point of line 2
 * @param  {Array<number>} line2P2 End point of line 2
 * @return {boolean} True if the two lines intersect
 */
export function linesIntersect(line1P1, line1P2, line2P1, line2P2) {
  const CmP = [line2P1[0] - line1P1[0], line2P1[1] - line1P1[1]];
  const r = [line1P2[0] - line1P1[0], line1P2[1] - line1P1[1]];
  const s = [line2P2[0] - line2P1[0], line2P2[1] - line2P1[1]];

  const CmPxr = (CmP[0] * r[1]) - (CmP[1] * r[0]);
  const CmPxs = (CmP[0] * s[1]) - (CmP[1] * s[0]);
  const rxs = (r[0] * s[1]) - (r[1] * s[0]);

  if (CmPxr === 0) {
    // Lines are collinear, and therefore intersect if they have any overlap
    return ((line2P1[0] - line1P1[0] < 0) !== (line2P1[0] - line1P2[0] < 0)) ||
           ((line2P1[1] - line1P1[1] < 0) !== (line2P1[1] - line1P2[1] < 0));
  }

  if (rxs === 0) {
    // Lines are parallel
    return false;
  }

  const rxsr = 1 / rxs;
  const t = CmPxs * rxsr;
  const u = CmPxr * rxsr;

  return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
}


/**
 * Tests if point P lies within polygon V.
 * <pre>
 * // Copyright 2000 softSurfer, 2012 Dan Sunday
 * // This code may be freely used and modified for any purpose
 * // providing that this copyright notice is included with it.
 * // SoftSurfer makes no warranty for this code, and cannot be held
 * // liable for any real or imagined damage resulting from its use.
 * // Users of this code must verify correctness for their application.
 * </pre>
 * @summary 2D winding number test by Dan Sunday
 * @package
 * @param  {Array<number>} point The point to be tested
 * @param  {Array<Array<number>>} polygon A closed (first point == last point) polygon of points
 * @return {boolean} True if point P is included by polygon V
 */
export function pointInsidePolygon(point, polygon) {
  const n = polygon.length - 1;
  let wn = 0; // wn: The winding number counter

  const isLeft = function (P0, P1, P2) {
    return (((P1[0] - P0[0]) * (P2[1] - P0[1])) - ((P2[0] - P0[0]) * (P1[1] - P0[1])));
  };

  // loop through all edges of the polygon
  for (let i = 0; i < n; i += 1) {
    // Test edge from V[i] to V[i + 1]
    if (polygon[i][1] <= point[1]) {
      // If edge-start is on or below P
      if (polygon[i + 1][1] > point[1]) {
        // If edge is upward crossing
        if (isLeft(polygon[i], polygon[i + 1], point) > 0) {
          // If P is to the left of edge
          wn += 1;
        }
      } // We have a valid up intersect
    } else if (polygon[i + 1][1] <= point[1]) { // If edge-start is above P
      // If edge is downward crossing
      if (isLeft(polygon[i], polygon[i + 1], point) < 0) {
        // If P is to the right of edge
        wn -= 1;
      }
    }
    // We have a valid down intersect
  }
  return wn !== 0;
}
