const libUtility = require('./utility.js')
const libAlgorithm = require('./algorithm.js');
const libFormulaCompiler = require('./formulaCompiler.js')
// import * as Parallel from '../src_lib/parallel.js';
// import * as Parallel from '../node_modules/paralleljs/lib/parallel';
const Parallel = require('paralleljs');
// const Parallel = require('../node_modules/paralleljs/lib/parallel'); // doesn't work: Module not found: Error: Can't resolve 'child_process' in Worker.js

const $ = require('jquery'); // alternative: a
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
 * The DataVector class doesn't store actual values, it only defines functions to read from the dataset.
 * @constructor
 * @export
 * @param {Dataset} dataset The underlying dataset
 * @param {number|string} source Either a column index into the dataset, or a formula
 */
export function DataVector(dataset, source) {
  const nc = dataset.numColumns;

  if (libUtility.isNumber(source)) {
    const c = Math.round(source);
    this.getValue = function (i) {
      // return Math.log(dataset.fdata[i * nc + c]);
      return dataset.fdata[(i * nc) + c];
    }

    // this.getValueCode = "log(c{0})".format(c);
    this.getValueCode = 'c' + c;// "{" + c + "}";

    const column = dataset.columns[c];
    this.minimum = column.minimum;
    this.maximum = column.maximum;
    this.offset = -column.minimum * (this.scale = 1 / (column.maximum - column.minimum));
    this.values = column.values;
    this.label = column.label;
  } else {
    const stack = new Array(16);
    const globalTypes = {
      'n': libFormulaCompiler.FormulaCompiler.types.float,
      'PI': libFormulaCompiler.FormulaCompiler.types.float,
      'i': libFormulaCompiler.FormulaCompiler.types.float
    };
    for (let c = 0; c < nc; c += 1) {
      globalTypes['c' + c] = libFormulaCompiler.FormulaCompiler.types.float;
    }
    const globals = {
      'n': dataset.length,
      'PI': Math.PI
    };

    const code = libFormulaCompiler.FormulaCompiler.compile(source + ';', globalTypes);
    if (libUtility.isString(code)) {
      console.error("GlobalView error: Error while parsing data vector formula '{0}'".format(source));
      console.error('                  ' + code);
      return;
    }
    const formula = source;
    this.getValueCode = formula;

    this.getValue = function (i) {
      globals.i = i; // ?! debug?
      for (let c = 0; c < nc; c += 1) {
        globals['c' + c] = dataset.fdata[(i * nc) + c];
      }

      return libFormulaCompiler.FormulaCompiler.run(code, stack, globals);
    }

    this.minimum = Number.MAX_VALUE;
    this.maximum = Number.MIN_VALUE;
    for (let i = 0, n = dataset.length; i < n; i += 1) {
      const value = this.getValue(i);
      this.minimum = Math.min(this.minimum, value);
      this.maximum = Math.max(this.maximum, value);
    }
    // console.log([this.minimum, this.maximum]);
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
   * Instead it holds meta data and a transfer function that produces data based on zero or more columns from the {@link Dataset#fdata} table
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
  const _densityMaps = [];
  /**
   * @type {Array<Array<Object>>}
  */
  const _clusterMaps = [];

  /**
   * Checks if a density map on dimensions d0 and d1 is available.
   * Hint: d0 and d1 can't be identical. The order of d0 and d1 is ignored.
   * @param  {number!} d0
   * @param  {number!} d1
   * @return {boolean!} True, if a densitymap for dimensions d0, d1 has been computed
   */
  this.isDensityMapReady = function (d0, d1) {
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

    return _densityMaps.length > d0 && _densityMaps[d0].length > d1 && _densityMaps[d0][d1] &&
      (libUtility.isUndefined(_densityMaps[d0][d1].pending) || _densityMaps[d0][d1].old);
  }

  /**
   * Calls the given function for each computed density map
   * @param  {function(DensityMap!)!} callback
   */
  this.iterateDensityMaps = function (callback) {
    _densityMaps.forEach(_densityMaps => _densityMaps.forEach(densityMap => densityMap && (libUtility.isUndefined(densityMap.pending) || densityMap.old) ? callback(densityMap.old || densityMap) : null));
  }

  /**
   * This function returns a density map for the given dimensions. If the density map doesn't exist it is computed.
   * When a function is passed to ondone, the density map is computed by a background worker, otherwise it is computed on the current thread.
   * After the worker has finished all ondone events for calls to this function are fired.
   * Hint: d0 and d1 can't be identical. The order of d0 and d1 is ignored.
   * @summary Returns a density map for dimensions d0 and d1.
   * @param  {!number} d0
   * @param  {!number} d1
   * @param  {number=} size=1024 The width and height of the density map
   * @param  {DensityMapOptions=} options
   * @param  {function(DensityMap)=} ondone A function to be called when the density map is ready
   * @return {DensityMap}
   */
  this.requestDensityMap = function (d0, d1, size, options, ondone) {
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      console.warn('GlobalView warning: Requesting density map for dimensions {0}, {1} on a dataset with only {2} data vectors'.format(d0, d1, this.dataVectors.length));
      return null;
    }
    const isAsync = libUtility.isFunction(ondone) ;// && !/Firefox/i.test(navigator.userAgent);// Firefox tends to crash with Parallel.js

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

    while (_densityMaps.length <= d0) {
      _densityMaps.push([]);
    }
    while (_densityMaps[d0].length <= d1) {
      _densityMaps[d0].push(null);
    }
    let densityMap = _densityMaps[d0][d1];

    if (!size) {
      size = 1024;
    }

    if (densityMap && options && densityMap.options && !libAlgorithm.DensityMapOptions.equals(options, densityMap.options)) {
      // If options changed
      densityMap = null;
    } // Recompute density map

    if (isAsync) {
      // If async
      if (!densityMap) {
        // If _densityMaps[d0][d1] isn't computed or being computed yet
        // While we compute _densityMaps[d0][d1], replace it with an array of functions to execute when it is ready
        _densityMaps[d0][d1] = {pending: [ondone], old: _densityMaps[d0][d1]};

        // Compute histogram synchronously
        let histogram = libAlgorithm.computeHistogram2D(this, d0, d1, size, size);

        // Execute an asynchronous worker that computes _densityMaps[d0][d1]
        const p = new Parallel([libUtility.makeCloneable(histogram), new libAlgorithm.DensityMapOptions(options)], { evalPath: 'eval.js' });
        p.require(libAlgorithm.DensityMap);
        p.require(libAlgorithm.computeDensityMap);
        p.spawn(params =>
          // the following code will be evaled from a blob in Parallel. so no need for libAlgorithm.
          computeDensityMap.apply(null, params)
        ).then((densityMap) => {
          densityMap = new libAlgorithm.DensityMap(densityMap);
          // Free histogram
          histogram = null;

          // Set _densityMaps[d0][d1]
          _densityMaps[d0][d1].old = null;
          const pending = _densityMaps[d0][d1].pending;
          _densityMaps[d0][d1] = densityMap;

          if (_clusterMaps.length > d0 && _clusterMaps[d0].length > d1 && _clusterMaps[d0][d1] && libUtility.isUndefined(_clusterMaps[d0][d1].pending)) {
            _clusterMaps[d0][d1] = null;
          }

          // Execute queued 'ondone' functions
          pending.forEach((ondone) => {
            ondone(densityMap);
          });
        });
      } else if (!libUtility.isUndefined(densityMap.pending)) {
        // If _densityMaps[d0][d1] is currently being computed asynchronously
        if (densityMap.old && (!options || libAlgorithm.DensityMapOptions.equals(densityMap.old.options, options))) {
          // If the deprecated densityMap satisfies our requested options
          ondone(/** @type {DensityMap} */(densityMap.old));
        } else {
          densityMap.pending.push(ondone);
        }
      } else {
        // If _densityMaps[d0][d1] is available
        ondone(/** @type {DensityMap} */(densityMap));
      }
      return null;
    } else {
      if (!densityMap) {
        // If _densityMaps[d0][d1] isn't computed or being computed yet
        // var tStart = performance.now();
        let histogram = libAlgorithm.computeHistogram2D(this, d0, d1, size, size);
        _densityMaps[d0][d1] = densityMap = new libAlgorithm.DensityMap(libAlgorithm.computeDensityMap(histogram, new libAlgorithm.DensityMapOptions(options)));
        histogram = null; // Free histogram
        // console.log(performance.now() - tStart + "ms");
      } else if (densityMap.old && (!options || libAlgorithm.DensityMapOptions.equals(densityMap.old.options, options))) {
        // If the deprecated densityMap satisfies our requested options
        densityMap = densityMap.old;
      } else {
        while (!libUtility.isUndefined(_densityMaps[d0][d1].pending)) {}
      } // Wait while _densityMaps[d0][d1] is being computed asynchronously

      if (libUtility.isFunction(ondone)) {
        ondone(/** @type {DensityMap} */(densityMap));
      }
      return /** @type {DensityMap} */(densityMap);
    }
  }

  this.isClusterMapReady = function (d0, d1) {
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

    return _clusterMaps.length > d0 && _clusterMaps[d0].length > d1 && _clusterMaps[d0][d1] &&
      (libUtility.isUndefined(_clusterMaps[d0][d1].pending) || _clusterMaps[d0][d1].old);
  }
  this.requestClusterMap = function (d0, d1, options, ondone) {
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      console.warn('GlobalView warning: Requesting cluster map for dimensions {0}, {1} on a dataset with only {2} data vectors'.format(d0, d1, this.dataVectors.length));
      return null;
    }
    const isAsync = libUtility.isFunction(ondone) ;// && !/Firefox/i.test(navigator.userAgent);// Firefox tends to crash with Parallel.js

    // Assure d0 < d1
    if (d0 === d1) {
      return;
    }
    if (d1 < d0) {
      // Swap d0 <-> d1
      const temp = d0;
      d0 = d1;
      d1 = temp;
    }

    while (_clusterMaps.length <= d0) {
      _clusterMaps.push([]);
    }
    while (_clusterMaps[d0].length <= d1) {
      _clusterMaps[d0].push(null);
    }
    let clusterMap = _clusterMaps[d0][d1];

    if (clusterMap && options && clusterMap.options && !libAlgorithm.ClusterMapOptions.equals(options, clusterMap.options)) {
      // If options changed
      clusterMap = null;
    } // Recompute density map

    if (isAsync) {
      // If async
      if (!clusterMap) {
        // If _clusterMaps[d0][d1] isn't computed or being computed yet
        // While we compute _clusterMaps[d0][d1], replace it with an array of functions to execute when it is ready
        _clusterMaps[d0][d1] = {pending: [ondone]};

        this.requestDensityMap(d0, d1, undefined, undefined, function (densityMap) {
          // Execute an asynchronous worker that computes _clusterMaps[d0][d1]
          const p = new Parallel([libUtility.makeCloneable(densityMap), d0, d1, new libAlgorithm.ClusterMapOptions(options)], { evalPath: 'eval.js' });
          p.require(libAlgorithm.computeClusterMap);
          p.require(libUtility.ForwardList);
          p.require(libUtility.PriorityQueue);
          p.spawn(params =>
            // the following code will be evaled from a blob in Parallel. so no need for libAlgorithm.
            computeClusterMap.apply(null, params)
          ).then((clusterMap) => {
            clusterMap = new libAlgorithm.ClusterMap(clusterMap);
            // Set _clusterMaps[d0][d1]
            const pending = _clusterMaps[d0][d1].pending;
            _clusterMaps[d0][d1] = clusterMap;

            // Execute queued 'ondone' functions
            pending.forEach((ondone) => {
              ondone(clusterMap);
            });
          });
        });
      } else if (!libUtility.isUndefined(clusterMap.pending)) {
        // If _clusterMaps[d0][d1] is currently being computed asynchronously
        if (clusterMap.old && (!options || libAlgorithm.ClusterMapOptions.equals(clusterMap.old.options, options))) {
          // If the deprecated clusterMap satisfies our requested options
          ondone(/** @type {ClusterMap} */(clusterMap.old));
        } else {
          clusterMap.pending.push(ondone);
        }
      } else {
        // If _clusterMaps[d0][d1] is available
        ondone(clusterMap);
      }
    } else {
      if (!clusterMap) {
        // If _clusterMaps[d0][d1] isn't computed or being computed yet
        const densityMap = this.requestDensityMap(d0, d1, undefined, undefined);
        if (densityMap) {
          // var tStart = performance.now();
          _clusterMaps[d0][d1] = clusterMap = new libAlgorithm.ClusterMap(libAlgorithm.computeClusterMap(densityMap, d0, d1, new libAlgorithm.ClusterMapOptions(options)));
          // console.log(performance.now() - tStart + "ms");
        } else {
          _clusterMaps[d0][d1] = clusterMap = null;
        }
      } else if (clusterMap.old && (!options || libAlgorithm.ClusterMapOptions.equals(clusterMap.old.options, options))) {
        // If the deprecated clusterMap satisfies our requested options
        clusterMap = clusterMap.old;
      } else {
        while (!libUtility.isUndefined(clusterMap.pending)) {}
      } // Wait while _clusterMaps[d0][d1] is being computed asynchronously

      if (libUtility.isFunction(ondone)) {
        ondone(clusterMap);
      }
      return clusterMap;
    }
  }

  this.inflate = function (factor, densityMapChain) {
    const n = this.length;
    const n_inflated = Math.floor(factor * n);
    const nc = this.numColumns;
    if (isNaN(n_inflated) || n_inflated <= n) {
      return;
    }
    const fdata = this.fdata;
    const fdata_inflated = new Float32Array(n_inflated * nc);
    const data = this.data;
    const data_inflated = new Array(n_inflated * nc);

    for (let i = 0, len = n * nc; i < len; i += 1) {
      fdata_inflated[i] = fdata[i];
    }
    for (let i = 0, len = n * nc; i < len; i += 1) {
      data_inflated[i] = data[i];
    }

    let column;
    let samples;
    let sample;
    const sampleScale = 1 / densityMapChain[0].size;
    for (let i, i_inflated = n, len = n * nc; i_inflated < n_inflated; i_inflated += 1) {
      i = i_inflated % n;

      samples = libAlgorithm.sampleDensityMapChain(densityMapChain);
      for (let c = 0; c < nc; c += 1) {
        column = this.columns[c];
        sample = column.minimum + ((column.maximum - column.minimum) * samples[c] * sampleScale);

        if (column.values) {
          // If column is qualitative
          fdata_inflated[(i_inflated * nc) + c] = sample = Math.max(0, Math.min(column.values.length - 1, Math.round(sample)));
          data_inflated[(i_inflated * nc) + c] = column.values[sample];
        } else {
          // If column is numeric
          fdata_inflated[(i_inflated * nc) + c] = sample;
          data_inflated[(i_inflated * nc) + c] = sample;
        }
      }
    }
    this.fdata = fdata_inflated;
    this.data = data_inflated;

    if (this.names !== null) {
      const names = /** @type {Array<string>} */ (this.names);
      const names_inflated = new Array(n_inflated);
      for (let i = 0, len = n; i < len; i += 1) {
        names_inflated[i] = names[i];
      }
      for (let index = 0, i_inflated = n, len = n * nc; i_inflated < n_inflated; i_inflated += 1) {
        names_inflated[i_inflated] = 'generated datapoint ' + (index += 1);
      }
      this.names = names_inflated;
    }

    if (this.imageFilenames !== null) {
      const imageFilenames = /** @type {Array<string>} */ (this.imageFilenames),
        imageFilenames_inflated = new Array(n_inflated);
      for (let i = 0, len = n; i < len; i += 1) {
        imageFilenames_inflated[i] = imageFilenames[i];
      }
      for (let i_inflated = n, len = n * nc; i_inflated < n_inflated; i_inflated += 1) {
        imageFilenames_inflated[i_inflated] = imageFilenames[i_inflated % n];
      }
      this.imageFilenames = imageFilenames_inflated;
    }

    this.length = n_inflated;
  }

  this.save = function (filename, nameColumn, nameColumnLabel) {
    const nc = this.numColumns;
    let csv_nc;
    if (this.names && !libUtility.isUndefined(nameColumn) && !libUtility.isUndefined(nameColumnLabel)) {
      csv_nc = nc + 1;
    } else {
      nameColumn = -1;
      csv_nc = nc;
    }

    const csv = new Array(this.length + 1); // +1 ... Header row

    // Create csv header array
    const header = new Array(csv_nc);
    for (let c = 0, ci = 0; c < csv_nc; c += 1, ci += 1) {
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
      const row = new Array(csv_nc);
      for (let c = 0, ci = 0; c < csv_nc; c += 1, ci += 1) {
        if (c === nameColumn) {
          row[c] = this.names[i];
          ci -= 1;
        } else {
          row[c] = this.data[(i * nc) + ci];
        }
      }
      csv[i + 1] = row; // +1 ... Header row
    }

    libUtility.download(filename, 'data:text/csv;charset=utf-8,' + encodeURIComponent($.csv.fromArrays(csv)));
  }
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
    this.columns.push({minimum: 0, maximum: 1, label: generateColumnName(i, nc)});
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
  'autoDetect': {
    description: 'When true, tries to infer other options based on the structure of the dataset (slow).',
    default: false,
    valid: [true, false]
  },

  /** When true, interprets the first row of the dataset as column labels. */
  'hasHeader': {
    description: 'When true, interprets the first row of the dataset as column labels.',
    default: false,
    valid: [true, false]
  },

  /** Index of a column of the dataset that contains data point names. */
  'nameColumn': {
    description: 'Index of a column of the dataset that contains data point names.',
    default: null,
    valid: null
  },

  /** An array of column labels, or a function that takes the column index as input and returns the column label. */
  'columnLabels': {
    description: 'An array of column labels, or a function that takes the column index as input and returns the column label.',
    default: null,
    valid: null
  },

  /** An array of image URLs, or a function that takes a row of data and the row index as input and returns a URL to an image of the data point. */
  'imageFilenames': {
    description: 'An array of image URLs, or a function that takes a row of data and the row index as input and returns a URL to an image of the data point.',
    default: null,
    valid: null
  }
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

  // Validate options
  for (const option in options) {
    if (!options.hasOwnProperty(option)) {
      continue;
    }

    // Validate option
    if (!CSV_DATASET_OPTIONS.hasOwnProperty(option)) {
      console.warn('CsvDataset warning: Unsupported option: ' + option);
      continue;
    }
    const optionDefinition = CSV_DATASET_OPTIONS[option];

    // Validate value
    const value = options[option];
    if ((optionDefinition.valid && optionDefinition.valid.indexOf(value) === -1) ||
      (optionDefinition.validRange && (value < optionDefinition.validRange[0] || value > optionDefinition.validRange[1]))) {
      console.warn('CsvDataset warning: Invalid value for option ' + option + ': ' + value);
      delete options[option];
      continue;
    }
  }

  // Load csv file
  const dataset = this;
  const parseCsv = function (csv) {
    const data = $.csv.toArrays(csv);


    if (options.autoDetect) {
      if (libUtility.isUndefined(options.hasHeader)) {
        // Assume no-header by default
        options.hasHeader = false;

        const firstRowOnlyStrings = data[0].every(value => isNaN(parseData(value)));
        const secondRowHasNumbers = data[1].some(value => !isNaN(parseData(value)));

        // If the first row consists of only string values, but the second row has at least one numeric value, we can assume the first row is a header
        if (firstRowOnlyStrings && secondRowHasNumbers) {
          options.hasHeader = true;
        }
        console.log('Assuming hasHeader = ' + options.hasHeader);
      }
      if (libUtility.isUndefined(options.nameColumn)) {
        // Assume no name column by default
        options.nameColumn = null;

        // If any row consists of only unique strings, we can assume it contains data point names
        for (let c = 0; c < data[0].length; c += 1) {
          const valueMap = {};
          if (data.every(row => (row.length > c && isNaN(parseData(row[c])) && !(row[c] in valueMap)) ? valueMap[row[c]] = true : false)) {
            options.nameColumn = c;
            break;
          }
        }
        console.log('Assuming nameColumn = ' + options.nameColumn);
      }
    }


    let n = data.length;
    const nc = data[0].length - (options.nameColumn ? 1 : 0);
    const firstRow = (options.hasHeader ? 1 : 0);
    dataset.numColumns = nc;

    // Generate column labels
    let columnLabels;
    if (libUtility.isFunction(options.columnLabels)) {
      columnLabels = new Array(n);
      for (let c = 0, ci = 0; c < data[0].length; c += 1, ci += 1) {
        if (c === options.nameColumn) {
          ci -= 1;
          continue;
        }

        columnLabels[ci] = options.columnLabels(c);
      }
    } else if (libUtility.isArray(options.columnLabels)) {
      if (options.columnLabels.length !== nc) {
        console.warn('CsvDataset warning: Number of provided column labels (' + options.columnLabels.length + ') differs from number of data columns in the dataset (' + nc + ')');
        columnLabels = null;
      } else {
        columnLabels = options.columnLabels;
      }
    } else {
      columnLabels = null;
    }

    dataset.data = new Array(nc * n);
    dataset.fdata = new Float32Array(nc * n);
    let i,
      di;
    for (let c = 0, ci = 0; c < data[0].length; c += 1, ci += 1) {
      if (c === options.nameColumn) {
        ci -= 1;
        continue;
      }

      // Loop through all values of column c -> value, fvalue, min, max
      let min = Number.MAX_VALUE;
      let max = Number.MIN_VALUE;
      let isNumeric = true;
      for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
        // Skip blank lines
        if (data[i].length === 1 && data[i][0] === '') {
          di -= 1;
          continue;
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
        // Loop through all values of column c again, generating a value map -> value, fvalue, min, max
        valueList = [];
        const valueMap = {};
        let valueIdx = 0;
        for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
          // Skip blank lines
          if (data[i].length === 1 && data[i][0] === '') {
            di -= 1;
            continue;
          }

          const value = data[i][c];
          const cls = valueMap[value];
          let fvalue;
          if (typeof cls === 'undefined') {
            valueList.push(value);
            fvalue = valueMap[value] = valueIdx;
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

      // Save column meta data
      dataset.columns.push({minimum: min, maximum: max, label: columnLabels ? columnLabels[ci] : (options.hasHeader ? data[0][c] : generateColumnName(ci, nc)), values: valueList});
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
    if (options.nameColumn) {
      const names = dataset.names = new Array(n);
      const nameColumn = options.nameColumn;
      for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
        // Skip blank lines
        if (data[i].length === 1 && data[i][0] === '') {
          di -= 1;
          continue;
        }

        names[di] = data[i][nameColumn];
      }
    } else {
      dataset.names = null;
    }

    // Generate image filenames
    if (libUtility.isFunction(options.imageFilenames)) {
      dataset.imageFilenames = new Array(n);
      for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
        // Skip blank lines
        if (data[i].length === 1 && data[i][0] === '') {
          di -= 1;
          continue;
        }

        dataset.imageFilenames[di] = options.imageFilenames(data[i], i);
      }
    } else if (libUtility.isArray(options.imageFilenames)) {
      if (options.imageFilenames.length !== n) {
        console.warn('CsvDataset warning: Number of provided image filenames (' + options.imageFilenames.length + ') differs from number of data points (' + n + ')');
        dataset.imageFilenames = null;
      } else {
        dataset.imageFilenames = options.imageFilenames;
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
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        parseCsv(this.responseText)
      }
    };
    request.open('GET', /** @type {string} */(file), true);
    request.overrideMimeType('text/csv; charset=utf8');
    request.send();
  } else {
    const reader = new FileReader();
    reader.onload = event => parseCsv(reader.result);
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
  } else {
    return 'c' + (i + 1); // c1, c2, c3, ...
  }
};

function parseData(input) {
  return parseFloat(input);
}