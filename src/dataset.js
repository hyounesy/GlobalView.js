const libUtility = require('./utility.js');
const libAlgorithm = require('./algorithm.js');
const libFormulaCompiler = require('./formulaCompiler.js');
const Parallel = require('paralleljs');
const $ = require('jquery');

window.jQuery = $;
require('jquery-csv');

/* alternative: add the following to webpack.config.js (https://github.com/fronteed/icheck/issues/322):
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
]
*/

/**
 * A vector of data values inside the dataset.
 * The source of a data vector can be either a column in the dataset's data table or a formula.
 * The length of the vector is fixed by the dataset.
 * The DataVector class doesn't store actual values, it only defines
 * functions to read from the dataset.
 * @constructor
 * @export
 * @param {Dataset} dataset The underlying dataset
 * @param {number|string} source Either a column index into the dataset, or a formula
 */
export function DataVector(dataset, source) {
  const nc = dataset.numColumns;

  if (libUtility.isNumber(source)) {
    const c = Math.round(source);
    this.getValue = function fGetValue(i) {
      // return Math.log(dataset.fdata[i * nc + c]);
      return dataset.fdata[(i * nc) + c];
    };

    // this.getValueCode = "log(c{0})".format(c);
    this.getValueCode = `c${c}`;// "{" + c + "}";

    const column = dataset.columns[c];
    this.minimum = column.minimum;
    this.maximum = column.maximum;
    this.offset = -column.minimum * (this.scale = 1 / (column.maximum - column.minimum));
    this.values = column.values;
    this.label = column.label;
  } else {
    const stack = new Array(16);
    const globalTypes = {
      n: libFormulaCompiler.FormulaCompiler.types.float,
      PI: libFormulaCompiler.FormulaCompiler.types.float,
      i: libFormulaCompiler.FormulaCompiler.types.float,
    };
    for (let c = 0; c < nc; c += 1) {
      globalTypes[`c${c}`] = libFormulaCompiler.FormulaCompiler.types.float;
    }
    const globals = {
      n: dataset.length,
      PI: Math.PI,
    };

    const code = libFormulaCompiler.FormulaCompiler.compile(`${source};`, globalTypes);
    if (libUtility.isString(code)) {
      libUtility.consoleError("GlobalView error: Error while parsing data vector formula '{0}'".format(source));
      libUtility.consoleError(`                  ${code}`);
      return;
    }
    const formula = source;
    this.getValueCode = formula;

    this.getValue = function fGetValue(i) {
      globals.i = i; // ?! debug?
      for (let c = 0; c < nc; c += 1) {
        globals[`c${c}`] = dataset.fdata[(i * nc) + c];
      }

      return libFormulaCompiler.FormulaCompiler.run(code, stack, globals);
    };

    this.minimum = Number.MAX_VALUE;
    this.maximum = Number.MIN_VALUE;
    for (let i = 0, n = dataset.length; i < n; i += 1) {
      const value = this.getValue(i);
      this.minimum = Math.min(this.minimum, value);
      this.maximum = Math.max(this.maximum, value);
    }
    // libUtility.consoleLog([this.minimum, this.maximum]);
    this.scale = this.maximum - this.minimum;
    if (this.scale > -1e-5 && this.scale < 1e-5) {
      this.offset = 0.5 - (0.5 * (this.minimum + this.maximum) * (this.scale = 0.5));
    } else {
      this.offset = -this.minimum * (this.scale = 1 / this.scale);
    }
    this.values = null;
    this.label = formula;
  }
}

/**
 * A dataset template for the GlobalView scatter plot framework
 * @abstract
 * @constructor
 * @export
 */
export function Dataset() {
  /**
   * @summary Number of columns in the {@link Dataset#data} table
   * @type {number}
   */
  this.numColumns = 0;
  /**
   * Note: Each dataVector has exactly 'length' elements
   * @summary Number of rows in the {@link Dataset#data} table
   * @type {number}
   */
  this.length = 0;
  /**
   * @summary Metadata about one column of data in the {@link Dataset#data} table
   * @type {Object}
   * @deprecated Use {@link Dataset#dataVectors} for access to metadata instead
   */
  this.columns = [];
  /**
   * An input dimension to the plot.
   * A data vector doesn't physically contain data.
   * Instead it holds meta data and a transfer function that produces data based on
   * zero or more columns from the {@link Dataset#fdata} table
   * @summary A logical vector of data
   * @type {Array<DataVector>}
   */
  this.dataVectors = [];
  /**
   * The data matrix isn't limited to numeric data.
   * Categorical columns are stored as strings.
   * {@link Dataset#dataVectors} access the numeric version of this matrix ({@link Dataset#fdata}).
   * It is of size {@link Dataset#numColumns} by {@link Dataset#length}.
   * @summary A matrix of data
   * @type {Float32Array|Array}
   */
  this.data = [];
  /**
   * This matrix is the numeric version of {@link Dataset#data}.
   * Categorical columns are stored as 0-based indices.
   * @summary A matrix of numeric data for the {@link Dataset#dataVectors}
   * @type {Float32Array}
   */
  this.fdata = new Float32Array(0);
  /**
   * This vector is of length {@link Dataset#length}.
   * @summary A vector of data point names
   * @type {Array<string>}
   */
  this.names = null;
  /**
   * This vector is of length {@link Dataset#length}.
   * @summary A vector of data point image URLs.
   * @type {Array<string>}
   */
  this.imageFilenames = null;

  /**
   * @type {Array<Array<Object>>}
   */
  const densityMapsArray = [];
  /**
   * @type {Array<Array<Object>>}
  */
  const clusterMapsArray = [];

  /**
   * Checks if a density map on dimensions d0 and d1 is available.
   * Hint: d0 and d1 can't be identical. The order of d0 and d1 is ignored.
   * @param  {number!} dim0
   * @param  {number!} dim1
   * @return {boolean!} True, if a densitymap for dimensions d0, d1 has been computed
   */
  this.isDensityMapReady = function fIsDensityMapReady(dim0, dim1) {
    let d0 = dim0;
    let d1 = dim1;
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      return false;
    }

    // Assure d0 < d1
    if (d0 === d1) {
      return false;
    }
    if (d1 < d0) {
      // Swap d0 <-> d1
      const temp = d0;
      d0 = d1;
      d1 = temp;
    }

    return densityMapsArray.length > d0 &&
      densityMapsArray[d0].length > d1 && densityMapsArray[d0][d1] &&
      (libUtility.isUndefined(densityMapsArray[d0][d1].pending) || densityMapsArray[d0][d1].old);
  };

  /**
   * Calls the given function for each computed density map
   * @param  {function(DensityMap!)!} callback
   */
  this.iterateDensityMaps = function fIterateDensityMaps(callback) {
    densityMapsArray.forEach((densityMaps) => {
      densityMaps.forEach((densityMap) => {
        if (densityMap && (libUtility.isUndefined(densityMap.pending) || densityMap.old)) {
          callback(densityMap.old || densityMap);
        }
      });
    });
  };

  /**
   * This function returns a density map for the given dimensions.
   * If the density map doesn't exist it is computed.
   * When a function is passed to ondone, the density map is computed by a background worker,
   * otherwise it is computed on the current thread.
   * After the worker has finished all ondone events for calls to this function are fired.
   * Hint: d0 and d1 can't be identical. The order of d0 and d1 is ignored.
   * @summary Returns a density map for dimensions d0 and d1.
   * @param  {!number} dim0
   * @param  {!number} dim1
   * @param  {number=} size=1024 The width and height of the density map
   * @param  {DensityMapOptions=} options
   * @param  {function(DensityMap)=} ondone A function to be called when the density map is ready
   * @return {DensityMap}
   */
  this.requestDensityMap = function fRequestDensityMap(dim0, dim1, mapSize, options, ondone) {
    let d0 = dim0;
    let d1 = dim1;
    let size = mapSize;
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      libUtility.consoleWarn('GlobalView warning: Requesting density map for dimensions {0}, {1} on a dataset with only {2} data vectors'.format(d0, d1, this.dataVectors.length));
      return null;
    }
    // Firefox tends to crash with Parallel.js
    const isAsync = libUtility.isFunction(ondone);// && !/Firefox/i.test(navigator.userAgent);

    // Assure d0 < d1
    if (d0 === d1) {
      return null;
    }
    if (d1 < d0) {
      // Swap d0 <-> d1
      const temp = d0;
      d0 = d1;
      d1 = temp;
    }

    while (densityMapsArray.length <= d0) {
      densityMapsArray.push([]);
    }
    while (densityMapsArray[d0].length <= d1) {
      densityMapsArray[d0].push(null);
    }
    let densityMap = densityMapsArray[d0][d1];

    if (!size) {
      size = 1024;
    }

    if (densityMap && options && densityMap.options &&
      !libAlgorithm.DensityMapOptions.equals(options, densityMap.options)) {
      // If options changed
      densityMap = null;
    } // Recompute density map

    if (isAsync) {
      // If async
      if (!densityMap) {
        // If densityMapsArray[d0][d1] isn't computed or being computed yet
        // While we compute densityMapsArray[d0][d1], replace it with an array
        // of functions to execute when it is ready
        densityMapsArray[d0][d1] = { pending: [ondone], old: densityMapsArray[d0][d1] };

        // Compute histogram synchronously
        let histogram = libAlgorithm.computeHistogram2D(this, d0, d1, size, size);

        // Execute an asynchronous worker that computes densityMapsArray[d0][d1]
        const p = new Parallel([libUtility.makeCloneable(histogram),
          new libAlgorithm.DensityMapOptions(options)], { evalPath: 'eval.js' });
        p.require(libAlgorithm.DensityMap);
        p.require(libAlgorithm.computeDensityMap);
        // the following code will be evaled from a blob in Parallel. so no need for libAlgorithm.
        // eslint-disable-next-line prefer-spread
        p.spawn(params => computeDensityMap.apply(null, params)).then((pDensityMap) => {
          const densityMap = new libAlgorithm.DensityMap(pDensityMap);
          // Free histogram
          histogram = null;

          // Set densityMapsArray[d0][d1]
          densityMapsArray[d0][d1].old = null;
          const pending = densityMapsArray[d0][d1].pending;
          densityMapsArray[d0][d1] = densityMap;

          if (clusterMapsArray.length > d0 && clusterMapsArray[d0].length > d1 &&
            clusterMapsArray[d0][d1] && libUtility.isUndefined(clusterMapsArray[d0][d1].pending)) {
            clusterMapsArray[d0][d1] = null;
          }

          // Execute queued 'ondone' functions
          pending.forEach((ondoneFunction) => {
            ondoneFunction(densityMap);
          });
        });
      } else if (!libUtility.isUndefined(densityMap.pending)) {
        // If densityMapsArray[d0][d1] is currently being computed asynchronously
        if (densityMap.old &&
          (!options || libAlgorithm.DensityMapOptions.equals(densityMap.old.options, options))) {
          // If the deprecated densityMap satisfies our requested options
          ondone(/** @type {DensityMap} */(densityMap.old));
        } else {
          densityMap.pending.push(ondone);
        }
      } else {
        // If densityMapsArray[d0][d1] is available
        ondone(/** @type {DensityMap} */(densityMap));
      }
      return null;
    }
    if (!densityMap) {
      // If densityMapsArray[d0][d1] isn't computed or being computed yet
      // var tStart = performance.now();
      let histogram = libAlgorithm.computeHistogram2D(this, d0, d1, size, size);
      densityMap = new libAlgorithm.DensityMap(libAlgorithm.computeDensityMap(
        histogram,
        new libAlgorithm.DensityMapOptions(options),
      ));
      densityMapsArray[d0][d1] = densityMap;
      histogram = null; // Free histogram
      // libUtility.consoleLog(performance.now() - tStart + "ms");
    } else if (densityMap.old &&
        (!options || libAlgorithm.DensityMapOptions.equals(densityMap.old.options, options))) {
      // If the deprecated densityMap satisfies our requested options
      densityMap = densityMap.old;
    } else {
      while (!libUtility.isUndefined(densityMapsArray[d0][d1].pending)) { /* empty */ }
    } // Wait while densityMapsArray[d0][d1] is being computed asynchronously

    if (libUtility.isFunction(ondone)) {
      ondone(/** @type {DensityMap} */(densityMap));
    }
    return /** @type {DensityMap} */(densityMap);
  };

  this.isClusterMapReady = function fIsClusterMapReady(dim0, dim1) {
    let d0 = dim0;
    let d1 = dim1;
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      return false;
    }

    // Assure d0 < d1
    if (d0 === d1) {
      return false;
    }
    if (d1 < d0) {
      // Swap d0 <-> d1
      const temp = d0;
      d0 = d1;
      d1 = temp;
    }

    return clusterMapsArray.length > d0 && clusterMapsArray[d0].length > d1 &&
      clusterMapsArray[d0][d1] &&
      (libUtility.isUndefined(clusterMapsArray[d0][d1].pending) || clusterMapsArray[d0][d1].old);
  };

  this.requestClusterMap = function fRequestClusterMap(dim0, dim1, options, ondone) {
    let d0 = dim0;
    let d1 = dim1;
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      libUtility.consoleWarn('GlobalView warning: Requesting cluster map for dimensions {0}, {1} on a dataset with only {2} data vectors'.format(d0, d1, this.dataVectors.length));
      return null;
    }
    // Firefox tends to crash with Parallel.js
    const isAsync = libUtility.isFunction(ondone);// && !/Firefox/i.test(navigator.userAgent);

    // Assure d0 < d1
    if (d0 === d1) {
      return null;
    }
    if (d1 < d0) {
      // Swap d0 <-> d1
      const temp = d0;
      d0 = d1;
      d1 = temp;
    }

    while (clusterMapsArray.length <= d0) {
      clusterMapsArray.push([]);
    }
    while (clusterMapsArray[d0].length <= d1) {
      clusterMapsArray[d0].push(null);
    }
    let clusterMap = clusterMapsArray[d0][d1];

    if (clusterMap && options && clusterMap.options &&
      !libAlgorithm.ClusterMapOptions.equals(options, clusterMap.options)) {
      // If options changed
      clusterMap = null;
    } // Recompute density map

    if (isAsync) {
      // If async
      if (!clusterMap) {
        // If clusterMapsArray[d0][d1] isn't computed or being computed yet
        // While we compute clusterMapsArray[d0][d1], replace it with an array
        // of functions to execute when it is ready
        clusterMapsArray[d0][d1] = { pending: [ondone] };

        this.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
          // Execute an asynchronous worker that computes clusterMapsArray[d0][d1]
          const p = new Parallel([libUtility.makeCloneable(densityMap), d0, d1,
            new libAlgorithm.ClusterMapOptions(options)], { evalPath: 'eval.js' });
          p.require(libAlgorithm.computeClusterMap);
          p.require(libUtility.ForwardList);
          p.require(libUtility.PriorityQueue);
          // the following code will be evaled from a blob in Parallel. so no need for libAlgorithm.
          // eslint-disable-next-line prefer-spread
          p.spawn(params => computeClusterMap.apply(null, params)).then((pClusterMap) => {
            const clusterMap = new libAlgorithm.ClusterMap(pClusterMap);
            // Set clusterMapsArray[d0][d1]
            const pending = clusterMapsArray[d0][d1].pending;
            clusterMapsArray[d0][d1] = clusterMap;

            // Execute queued 'ondone' functions
            pending.forEach((ondone) => {
              ondone(clusterMap);
            });
          });
        });
      } else if (!libUtility.isUndefined(clusterMap.pending)) {
        // If clusterMapsArray[d0][d1] is currently being computed asynchronously
        if (clusterMap.old &&
          (!options || libAlgorithm.ClusterMapOptions.equals(clusterMap.old.options, options))) {
          // If the deprecated clusterMap satisfies our requested options
          ondone(/** @type {ClusterMap} */(clusterMap.old));
        } else {
          clusterMap.pending.push(ondone);
        }
      } else {
        // If clusterMapsArray[d0][d1] is available
        ondone(clusterMap);
      }
    } else {
      if (!clusterMap) {
        // If clusterMapsArray[d0][d1] isn't computed or being computed yet
        const densityMap = this.requestDensityMap(d0, d1, undefined, undefined);
        if (densityMap) {
          // var tStart = performance.now();
          clusterMap = new libAlgorithm.ClusterMap(libAlgorithm.computeClusterMap(
            densityMap, d0, d1,
            new libAlgorithm.ClusterMapOptions(options),
          ));
          clusterMapsArray[d0][d1] = clusterMap;
          // libUtility.consoleLog(performance.now() - tStart + "ms");
        } else {
          clusterMapsArray[d0][d1] = null;
          clusterMap = null;
        }
      } else if (clusterMap.old &&
        (!options || libAlgorithm.ClusterMapOptions.equals(clusterMap.old.options, options))) {
        // If the deprecated clusterMap satisfies our requested options
        clusterMap = clusterMap.old;
      } else {
        while (!libUtility.isUndefined(clusterMap.pending)) { /* empty */ }
      } // Wait while clusterMapsArray[d0][d1] is being computed asynchronously

      if (libUtility.isFunction(ondone)) {
        ondone(clusterMap);
      }
      return clusterMap;
    }
    return null;
  };

  this.inflate = function fInflate(factor, densityMapChain) {
    const n = this.length;
    const nInflated = Math.floor(factor * n);
    const nc = this.numColumns;
    if (isNaN(nInflated) || nInflated <= n) {
      return;
    }
    const fdata = this.fdata;
    const fdataInflated = new Float32Array(nInflated * nc);
    const data = this.data;
    const dataInflated = new Array(nInflated * nc);

    for (let i = 0, len = n * nc; i < len; i += 1) {
      fdataInflated[i] = fdata[i];
    }
    for (let i = 0, len = n * nc; i < len; i += 1) {
      dataInflated[i] = data[i];
    }

    let column;
    let samples;
    let sample;
    const sampleScale = 1 / densityMapChain[0].size;
    for (let i, iInflated = n, len = n * nc; iInflated < nInflated; iInflated += 1) {
      i = iInflated % n;

      samples = libAlgorithm.sampleDensityMapChain(densityMapChain);
      for (let c = 0; c < nc; c += 1) {
        column = this.columns[c];
        sample = column.minimum + ((column.maximum - column.minimum) * samples[c] * sampleScale);

        if (column.values) {
          // If column is qualitative
          fdataInflated[(iInflated * nc) + c] =
          sample =
            Math.max(0, Math.min(column.values.length - 1, Math.round(sample)));
          dataInflated[(iInflated * nc) + c] = column.values[sample];
        } else {
          // If column is numeric
          fdataInflated[(iInflated * nc) + c] = sample;
          dataInflated[(iInflated * nc) + c] = sample;
        }
      }
    }
    this.fdata = fdataInflated;
    this.data = dataInflated;

    if (this.names !== null) {
      const names = /** @type {Array<string>} */ (this.names);
      const namesInflated = new Array(nInflated);
      for (let i = 0, len = n; i < len; i += 1) {
        namesInflated[i] = names[i];
      }
      for (let index = 0, iInflated = n, len = n * nc; iInflated < nInflated; iInflated += 1) {
        namesInflated[iInflated] = `generated datapoint ${index += 1}`;
      }
      this.names = namesInflated;
    }

    if (this.imageFilenames !== null) {
      const imageFilenames = /** @type {Array<string>} */ (this.imageFilenames);
      const imageFilenamesInflated = new Array(nInflated);
      for (let i = 0, len = n; i < len; i += 1) {
        imageFilenamesInflated[i] = imageFilenames[i];
      }
      for (let iInflated = n, len = n * nc; iInflated < nInflated; iInflated += 1) {
        imageFilenamesInflated[iInflated] = imageFilenames[iInflated % n];
      }
      this.imageFilenames = imageFilenamesInflated;
    }

    this.length = nInflated;
  };

  this.save = function fSave(filename, nameColumnIndex, nameColumnLabel) {
    let nameColumn = nameColumnIndex;
    const nc = this.numColumns;
    let csvNumCols;
    if (this.names &&
      !libUtility.isUndefined(nameColumn) && !libUtility.isUndefined(nameColumnLabel)) {
      csvNumCols = nc + 1;
    } else {
      nameColumn = -1;
      csvNumCols = nc;
    }

    const csv = new Array(this.length + 1); // +1 ... Header row

    // Create csv header array
    const header = new Array(csvNumCols);
    for (let c = 0, ci = 0; c < csvNumCols; c += 1, ci += 1) {
      if (c === nameColumn) {
        header[c] = nameColumnLabel;
        ci -= 1;
      } else {
        header[c] = this.columns[ci].label;
      }
    }
    csv[0] = header;

    // Create csv body arrays
    for (let i = 0; i < this.length; i += 1) {
      const row = new Array(csvNumCols);
      for (let c = 0, ci = 0; c < csvNumCols; c += 1, ci += 1) {
        if (c === nameColumn) {
          row[c] = this.names[i];
          ci -= 1;
        } else {
          row[c] = this.data[(i * nc) + ci];
        }
      }
      csv[i + 1] = row; // +1 ... Header row
    }

    libUtility.download(filename, `data:text/csv;charset=utf-8,${encodeURIComponent($.csv.fromArrays(csv))}`);
  };
}


// >>> Random dataset

/**
 * A randomly generated dataset
 * @extends {Dataset}
 * @constructor
 * @export
 * @param {number} n Number of rows (points) of the dataset
 * @param {number} nc Number of columns (dimensions) of the dataset
 * @param {function(Dataset)} onload Event handler, called after the dataset was created
 */
export function RandomDataset(n, nc, onload) {
  Dataset.call(this);

  this.numColumns = nc;
  this.length = n;
  for (let i = 0; i < nc; i += 1) {
    this.columns.push({ minimum: 0, maximum: 1, label: generateColumnName(i, nc) });
    this.dataVectors.push(new DataVector(this, i));
  }

  const nnc = n * nc;
  this.fdata = new Float32Array(nnc);
  for (let i = 0; i < nnc; i += 1) {
    this.fdata[i] = Math.random();
  }
  this.data = this.fdata;

  if (onload) {
    onload(this);
  }
}

// >>> CSV dataset

/**
 * A map of valid options for CSV datasets with option descriptions and validation functions
 * @const
 * @enum {{
 * description: string,
 * default: *,
 * valid: Array
 * }}
*/
const CSV_DATASET_OPTIONS = {
  /** When true, tries to infer other options based on the structure of the dataset (slow). */
  autoDetect: {
    description: 'When true, tries to infer other options ' +
                 'based on the structure of the dataset (slow).',
    default: false,
    valid: [true, false],
  },

  /** When true, interprets the first row of the dataset as column labels. */
  hasHeader: {
    description: 'When true, interprets the first row of the dataset as column labels.',
    default: false,
    valid: [true, false],
  },

  /** Index of a column of the dataset that contains data point names. */
  nameColumn: {
    description: 'Index of a column of the dataset that contains data point names.',
    default: null,
    valid: null,
  },

  /** An array of column labels, or a function that takes the column index
   *  as input and returns the column label. */
  columnLabels: {
    description: 'An array of column labels, or a function that takes the ' +
                 'column index as input and returns the column label.',
    default: null,
    valid: null,
  },

  /** An array of image URLs, or a function that takes a row of data and the row index as
   *  input and returns a URL to an image of the data point. */
  imageFilenames: {
    description: 'An array of image URLs, or a function that takes a row of data ' +
                 'and the row index as input and returns a URL to an image of the data point.',
    default: null,
    valid: null,
  },
};

/**
 * A dataset constructed from a CSV table
 * @extends {Dataset}
 * @constructor
 * @export
 * @param {string|Blob} file File or URL of file, containing the CSV-formatted dataset
 * @param {Object} options
 * @param {function(Dataset)} onload Event handler, called after the dataset was created
 */
export function CsvDataset(file, options, onload) {
  Dataset.call(this);
  const varOptions = options;

  // Validate options
  for (const option in varOptions) {
    if (!varOptions.hasOwnProperty(option)) {
      continue; // eslint-disable-line no-continue
    }

    // Validate option
    if (!CSV_DATASET_OPTIONS.hasOwnProperty(option)) {
      libUtility.consoleWarn(`CsvDataset warning: Unsupported option: ${option}`);
      continue; // eslint-disable-line no-continue
    }
    const optionDefinition = CSV_DATASET_OPTIONS[option];

    // Validate value
    const value = varOptions[option];
    if ((optionDefinition.valid && optionDefinition.valid.indexOf(value) === -1) ||
      (optionDefinition.validRange &&
        (value < optionDefinition.validRange[0] || value > optionDefinition.validRange[1]))) {
      libUtility.consoleWarn(`CsvDataset warning: Invalid value for option ${option}: ${value}`);
      delete varOptions[option];
      continue; // eslint-disable-line no-continue
    }
  }

  // Load csv file
  const dataset = this;
  const parseCsv = function fParseCsv(csv) {
    const data = $.csv.toArrays(csv);

    if (varOptions.autoDetect) {
      if (libUtility.isUndefined(varOptions.hasHeader)) {
        // Assume no-header by default
        varOptions.hasHeader = false;

        const firstRowOnlyStrings = data[0].every(value => isNaN(parseData(value)));
        const secondRowHasNumbers = data[1].some(value => !isNaN(parseData(value)));

        // If the first row consists of only string values, but the second row
        // has at least one numeric value, we can assume the first row is a header
        if (firstRowOnlyStrings && secondRowHasNumbers) {
          varOptions.hasHeader = true;
        }
        libUtility.consoleLog(`Assuming hasHeader = ${varOptions.hasHeader}`);
      }
      if (libUtility.isUndefined(varOptions.nameColumn)) {
        // Assume no name column by default
        varOptions.nameColumn = null;

        // If any row consists of only unique strings, we can assume it contains data point names
        for (let c = 0; c < data[0].length; c += 1) {
          const valueMap = {};
          if (data.every((row) => {
            if (row.length > c && isNaN(parseData(row[c])) && !(row[c] in valueMap)) {
              valueMap[row[c]] = true;
              return true;
            }
            return false;
          })) {
            varOptions.nameColumn = c;
            break;
          }
        }
        libUtility.consoleLog(`Assuming nameColumn = ${varOptions.nameColumn}`);
      }
    }


    let n = data.length;
    const nc = data[0].length - (varOptions.nameColumn ? 1 : 0);
    const firstRow = (varOptions.hasHeader ? 1 : 0);
    dataset.numColumns = nc;

    // Generate column labels
    let columnLabels;
    if (libUtility.isFunction(varOptions.columnLabels)) {
      columnLabels = new Array(n);
      for (let c = 0, ci = 0; c < data[0].length; c += 1, ci += 1) {
        if (c === varOptions.nameColumn) {
          ci -= 1;
          continue; // eslint-disable-line no-continue
        }

        columnLabels[ci] = varOptions.columnLabels(c);
      }
    } else if (libUtility.isArray(varOptions.columnLabels)) {
      if (varOptions.columnLabels.length !== nc) {
        libUtility.consoleWarn(`CsvDataset warning: Number of provided column labels (${
          varOptions.columnLabels.length
        }) differs from number of data columns in the dataset (${nc})`);
        columnLabels = null;
      } else {
        columnLabels = varOptions.columnLabels;
      }
    } else {
      columnLabels = null;
    }

    dataset.data = new Array(nc * n);
    dataset.fdata = new Float32Array(nc * n);
    let i;
    let di;
    for (let c = 0, ci = 0; c < data[0].length; c += 1, ci += 1) {
      if (c === varOptions.nameColumn) {
        ci -= 1;
        continue; // eslint-disable-line no-continue
      }

      // Loop through all values of column c -> value, fvalue, min, max
      let min = Number.MAX_VALUE;
      let max = Number.MIN_VALUE;
      let isNumeric = true;
      for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
        // Skip blank lines
        if (data[i].length === 1 && data[i][0] === '') {
          di -= 1;
          continue; // eslint-disable-line no-continue
        }

        const value = data[i][c];
        const fvalue = parseData(value);
        if (isNaN(fvalue)) {
          isNumeric = false;
          break;
        }

        dataset.data[(di * nc) + ci] = value;
        dataset.fdata[(di * nc) + ci] = fvalue;
        min = Math.min(min, fvalue);
        max = Math.max(max, fvalue);
      }

      let valueList = null;
      if (!isNumeric) {
        // Loop through all values of column c again,
        // generating a value map -> value, fvalue, min, max
        valueList = [];
        const valueMap = {};
        let valueIdx = 0;
        for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
          // Skip blank lines
          if (data[i].length === 1 && data[i][0] === '') {
            di -= 1;
            continue; // eslint-disable-line no-continue
          }

          const value = data[i][c];
          const cls = valueMap[value];
          let fvalue;
          if (typeof cls === 'undefined') {
            valueList.push(value);
            fvalue = valueIdx;
            valueMap[value] = fvalue;
            valueIdx += 1;
          } else {
            fvalue = cls;
          }

          fvalue += 0.5;

          dataset.data[(di * nc) + ci] = value;
          dataset.fdata[(di * nc) + ci] = fvalue;
        }
        min = 0;
        max = valueList.length;
      }

      let theLabel;
      if (columnLabels) {
        theLabel = columnLabels[ci];
      } else if (varOptions.hasHeader) {
        theLabel = data[0][c];
      } else {
        theLabel = generateColumnName(ci, nc);
      }
      // Save column meta data
      dataset.columns.push({
        minimum: min,
        maximum: max,
        label: theLabel,
        values: valueList,
      });
      dataset.dataVectors.push(new DataVector(dataset, ci));
    }

    if (di !== n) {
      // If some line were blank
      di = n - di; // Set di to the number of skipped lines
      n -= di; // Shrink n
      di *= nc; // Set di to the number of skipped values

      // Shrink dataset.data and dataset.fdata
      dataset.data.splice(-di);
      if (Float32Array.prototype.splice) {
        /** @type {{splice: Function}} */
        (dataset.fdata).splice(-di);
      } else if (Float32Array.prototype.slice) {
        dataset.fdata = dataset.fdata.slice(0, -di);
      } else {
        const trimedFdata = new Float32Array(nc * n);
        let len;
        for (i = 0, len = trimedFdata.length; i < len; i += 1) {
          trimedFdata[i] = dataset.fdata[i];
        }
        dataset.fdata = trimedFdata;
      }
    }

    // Set number of data points
    dataset.length = n;

    // Extract data point names
    if (varOptions.nameColumn) {
      const names = dataset.names = new Array(n);
      const nameColumn = varOptions.nameColumn;
      for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
        // Skip blank lines
        if (data[i].length === 1 && data[i][0] === '') {
          di -= 1;
          continue; // eslint-disable-line no-continue
        }

        names[di] = data[i][nameColumn];
      }
    } else {
      dataset.names = null;
    }

    // Generate image filenames
    if (libUtility.isFunction(varOptions.imageFilenames)) {
      dataset.imageFilenames = new Array(n);
      for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
        // Skip blank lines
        if (data[i].length === 1 && data[i][0] === '') {
          di -= 1;
          continue; // eslint-disable-line no-continue
        }

        dataset.imageFilenames[di] = varOptions.imageFilenames(data[i], i);
      }
    } else if (libUtility.isArray(varOptions.imageFilenames)) {
      if (varOptions.imageFilenames.length !== n) {
        libUtility.consoleWarn(`CsvDataset warning: Number of provided image filenames (${varOptions.imageFilenames.length}) differs from number of data points (${n})`);
        dataset.imageFilenames = null;
      } else {
        dataset.imageFilenames = varOptions.imageFilenames;
      }
    } else {
      dataset.imageFilenames = null;
    }

    // Notify success
    if (onload) {
      onload(dataset);
    }
  };


  if (libUtility.isString(file)) {
    // $.get(file, parseCsv, "text");
    const request = new XMLHttpRequest();
    request.onreadystatechange = function fOnReadyStateChange() {
      if (this.readyState === 4 && this.status === 200) {
        parseCsv(this.responseText);
      }
    };
    request.open('GET', /** @type {string} */(file), true);
    request.overrideMimeType('text/csv; charset=utf8');
    request.send();
  } else {
    const reader = new FileReader();
    reader.onload = (event) => {
      parseCsv(reader.result);
    };
    reader.readAsText(/** @type {!Blob} */(file));
  }
}

// >>> Helper functions

function generateColumnName(i, nc) {
  const XYZW = ['x', 'y', 'z', 'w'];
  if (nc <= XYZW.length) {
    return XYZW[i]; // x, y, z, w
  } else if (nc <= 26) {
    return String.fromCharCode(65 + i); // A, B, C, ...
  }
  return `c${i + 1}`; // c1, c2, c3, ...
}

function parseData(input) {
  return parseFloat(input);
}
