import Parallel from 'paralleljs';
import $ from 'jquery';
import { isNumber, isString, consoleError, isUndefined,
  consoleWarn, isFunction, makeCloneable, download, consoleLog, isArray,
  ForwardList as classForwardList, // need this for Parallel to work
} from './utility';
import { DensityMapOptions, computeHistogram2D, DensityMap, ClusterMapOptions, ClusterMap,
  computeDensityMap as funcComputeDensityMap, // need this for Parallel to work
  computeClusterMap as funcComputeClusterMap, // need this for Parallel to work
} from './algorithm';
import FormulaCompiler from './formulaCompiler';

window.jQuery = $;
require('jquery-csv'); // could not get this working using es6 import.


/**
 * A vector of data values inside the dataset.
 * The source of a data vector can be either a column in the dataset's data table or a formula.
 * The length of the vector is fixed by the dataset.
 * The DataVector class doesn't store actual values, it only defines
 * functions to read from the dataset.
 */
export class DataVector {
  /**
   * @constructor
   * @export
   * @param {Dataset} dataset The underlying dataset
   * @param {number|string} source Either a column index into the dataset, or a formula
   */
  constructor(dataset, source) {
    this.dataset = dataset;
    this.isSourceNumeric = false;
    if (isNumber(source)) {
      this.isSourceNumeric = true;
      this.columnIndex = Math.round(source);
      this.getValueCode = `c${this.columnIndex}`;
      const column = dataset.columns[this.columnIndex];
      this.minimum = column.minimum;
      this.maximum = column.maximum;
      this.offset = -column.minimum * (this.scale = 1 / (column.maximum - column.minimum));
      this.values = column.values;
      this.label = column.label;
    } else {
      this.stack = new Array(16);
      const globalTypes = {
        n: FormulaCompiler.types.float,
        PI: FormulaCompiler.types.float,
        i: FormulaCompiler.types.float,
      };
      for (let c = 0; c < this.dataset.numColumns; c += 1) {
        globalTypes[`c${c}`] = FormulaCompiler.types.float;
      }
      this.globals = {
        n: dataset.length,
        PI: Math.PI,
      };

      this.code = FormulaCompiler.compile(`${source};`, globalTypes);
      if (isString(this.code)) {
        consoleError("GlobalView error: Error while parsing data vector formula '{0}'".format(source));
        consoleError(`                  ${this.code}`);
        return;
      }
      const formula = source;
      this.getValueCode = formula;

      this.minimum = Number.MAX_VALUE;
      this.maximum = Number.MIN_VALUE;
      for (let i = 0, n = dataset.length; i < n; i += 1) {
        const value = this.getValue(i);
        this.minimum = Math.min(this.minimum, value);
        this.maximum = Math.max(this.maximum, value);
      }

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

  getValue(i) {
    if (this.isSourceNumeric) {
      return this.dataset.fdata[(i * this.dataset.numColumns) + this.columnIndex];
    }
    this.globals.i = i; // ?! debug?
    for (let c = 0; c < this.dataset.numColumns; c += 1) {
      this.globals[`c${c}`] = this.dataset.fdata[(i * this.dataset.numColumns) + c];
    }

    return FormulaCompiler.run(this.code, this.stack, this.globals);
  }
}
/**
 * A dataset template for the GlobalView scatter plot framework
 */
export class Dataset {
  /**
   * @abstract
   * @constructor
   * @export
   */
  constructor() {
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
     * {@link Dataset#dataVectors} access the numeric version of
     * this matrix ({@link Dataset#fdata}).
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
    this.densityMapsArray = [];
    /**
     * @type {Array<Array<Object>>}
    */
    this.clusterMapsArray = [];
  }

  /**
   * Checks if a density map on dimensions dim0 and dim1 is available.
   * Hint: dim0 and dim1 can't be identical. The order of d0 and d1 is ignored.
   * @param  {!number} dim0 1st dimension index
   * @param  {!number} dim1 2nd dimension index
   * @return {!boolean} True, if a densitymap for dimensions d0, d1 has been computed
   */
  isDensityMapReady(dim0, dim1) {
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

    return this.densityMapsArray.length > d0 &&
    this.densityMapsArray[d0].length > d1 && this.densityMapsArray[d0][d1] &&
      (isUndefined(this.densityMapsArray[d0][d1].pending) ||
                              this.densityMapsArray[d0][d1].old);
  }

  /**
   * Calls the given function for each computed density map
   * @param  {function(DensityMap!)!} callback
   */
  iterateDensityMaps(callback) {
    this.densityMapsArray.forEach((densityMaps) => {
      densityMaps.forEach((densityMap) => {
        if (densityMap && (isUndefined(densityMap.pending) || densityMap.old)) {
          callback(densityMap.old || densityMap);
        }
      });
    });
  }

  /**
   * This function returns a density map for the given dimensions.
   * If the density map doesn't exist it is computed.
   * When a function is passed to ondone, the density map is computed by a background worker,
   * otherwise it is computed on the current thread.
   * After the worker has finished all ondone events for calls to this function are fired.
   * Hint: dim0 and dim1 can't be identical. The order of dim0 and dim1 is ignored.
   * @summary Returns a density map for dimensions dim0 and dim1.
   * @param  {!number} dim0 1st dimension index
   * @param  {!number} dim1 2nd dimension index
   * @param  {number=} size=1024 The width and height of the density map
   * @param  {DensityMapOptions=} options
   * @param  {function(DensityMap)=} ondone A function to be called when the density map is ready
   * @return {DensityMap}
   */
  requestDensityMap(dim0, dim1, mapSize, options, ondone) {
    let d0 = dim0;
    let d1 = dim1;
    let size = mapSize;
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      consoleWarn(('GlobalView warning: Requesting density map for dimensions {0}, {1} on a dataset with only {2} data vectors')
        .format(d0, d1, this.dataVectors.length));
      return null;
    }
    // Firefox tends to crash with Parallel.js
    const isAsync = isFunction(ondone);// && !/Firefox/i.test(navigator.userAgent);

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

    while (this.densityMapsArray.length <= d0) {
      this.densityMapsArray.push([]);
    }
    while (this.densityMapsArray[d0].length <= d1) {
      this.densityMapsArray[d0].push(null);
    }
    let densityMap = this.densityMapsArray[d0][d1];

    if (!size) {
      size = 1024;
    }

    if (densityMap && options && densityMap.options &&
      !DensityMapOptions.equals(options, densityMap.options)) {
      // If options changed
      densityMap = null;
    } // Recompute density map

    if (isAsync) {
      // If async
      if (!densityMap) {
        // If densityMapsArray[d0][d1] isn't computed or being computed yet
        // While we compute densityMapsArray[d0][d1], replace it with an array
        // of functions to execute when it is ready
        this.densityMapsArray[d0][d1] = { pending: [ondone], old: this.densityMapsArray[d0][d1] };

        // Compute histogram synchronously
        let histogram = computeHistogram2D(this, d0, d1, size, size);

        // Execute an asynchronous worker that computes densityMapsArray[d0][d1]
        const parallel = new Parallel([makeCloneable(histogram),
          new DensityMapOptions(options)], { evalPath: 'eval.js' });
        const computeDensityMap = funcComputeDensityMap;
        parallel.require(computeDensityMap);
        // the following code will be evaled from a blob in Parallel.
        // eslint-disable-next-line prefer-spread, no-undef
        parallel.spawn(params => computeDensityMap.apply(null, params))
          .then((pDensityMap) => {
            const computedDensityMap = new DensityMap(pDensityMap);
            // Free histogram
            histogram = null;

            // Set densityMapsArray[d0][d1]
            this.densityMapsArray[d0][d1].old = null;
            const pending = this.densityMapsArray[d0][d1].pending;
            this.densityMapsArray[d0][d1] = computedDensityMap;

            if (this.clusterMapsArray.length > d0 &&
                this.clusterMapsArray[d0].length > d1 &&
                this.clusterMapsArray[d0][d1] &&
                isUndefined(this.clusterMapsArray[d0][d1].pending)) {
              this.clusterMapsArray[d0][d1] = null;
            }

            // Execute queued 'ondone' functions
            pending.forEach((ondoneFunction) => {
              ondoneFunction(computedDensityMap);
            });
          });
      } else if (!isUndefined(densityMap.pending)) {
        // If densityMapsArray[d0][d1] is currently being computed asynchronously
        if (densityMap.old &&
          (!options || DensityMapOptions.equals(densityMap.old.options, options))) {
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
      let histogram = computeHistogram2D(this, d0, d1, size, size);
      densityMap = new DensityMap(funcComputeDensityMap(
        histogram,
        new DensityMapOptions(options),
      ));
      this.densityMapsArray[d0][d1] = densityMap;
      histogram = null; // Free histogram
    } else if (densityMap.old &&
        (!options || DensityMapOptions.equals(densityMap.old.options, options))) {
      // If the deprecated densityMap satisfies our requested options
      densityMap = densityMap.old;
    } else {
      while (!isUndefined(this.densityMapsArray[d0][d1].pending)) { /* empty */ }
    } // Wait while densityMapsArray[d0][d1] is being computed asynchronously

    if (isFunction(ondone)) {
      ondone(/** @type {DensityMap} */(densityMap));
    }
    return /** @type {DensityMap} */(densityMap);
  }

  /**
   * Checks if a cluster map on dimensions dim0 and dim1 is available.
   * Hint: dim0 and dim1 can't be identical. The order of dim0 and dim1 is ignored.
   * @param  {!number} dim0 1st dimension index
   * @param  {!number} dim1 2nd dimension index
   * @return {!boolean} True, if a clustermap for dimensions d0, d1 has been computed
   */
  isClusterMapReady(dim0, dim1) {
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

    return this.clusterMapsArray.length > d0 &&
           this.clusterMapsArray[d0].length > d1 &&
           this.clusterMapsArray[d0][d1] &&
           (isUndefined(this.clusterMapsArray[d0][d1].pending) ||
                        this.clusterMapsArray[d0][d1].old);
  }

  /**
   * This function returns a cluster map for the given dimensions.
   * If the cluster map doesn't exist it is computed.
   * When a function is passed to ondone, the cluster map is computed by a background worker,
   * otherwise it is computed on the current thread.
   * After the worker has finished all ondone events for calls to this function are fired.
   * Hint: dim0 and dim1 can't be identical. The order of dim0 and dim1 is ignored.
   * @param  {!number} dim0 1st dimension index
   * @param  {!number} dim1 2nd dimension index
   * @param  {ClusterMapOptions=} options
   * @param  {function(ClusterMap)=} ondone A function to be called when the cluster map is ready
   */
  requestClusterMap(dim0, dim1, options, ondone) {
    let d0 = dim0;
    let d1 = dim1;
    // Validate inputs
    if (d0 >= this.dataVectors.length || d1 >= this.dataVectors.length) {
      consoleWarn('GlobalView warning: Requesting cluster map for dimensions {0}, {1} on a dataset with only {2} data vectors'.format(d0, d1, this.dataVectors.length));
      return null;
    }
    // Firefox tends to crash with Parallel.js
    const isAsync = isFunction(ondone);// && !/Firefox/i.test(navigator.userAgent);

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

    while (this.clusterMapsArray.length <= d0) {
      this.clusterMapsArray.push([]);
    }
    while (this.clusterMapsArray[d0].length <= d1) {
      this.clusterMapsArray[d0].push(null);
    }
    let clusterMap = this.clusterMapsArray[d0][d1];

    if (clusterMap && options && clusterMap.options &&
      !ClusterMapOptions.equals(options, clusterMap.options)) {
      // If options changed
      clusterMap = null;
    } // Recompute density map

    if (isAsync) {
      // If async
      if (!clusterMap) {
        // If clusterMapsArray[d0][d1] isn't computed or being computed yet
        // While we compute clusterMapsArray[d0][d1], replace it with an array
        // of functions to execute when it is ready
        this.clusterMapsArray[d0][d1] = { pending: [ondone] };

        this.requestDensityMap(d0, d1, undefined, undefined, (densityMap) => {
          // Execute an asynchronous worker that computes clusterMapsArray[d0][d1]
          const parallel = new Parallel([makeCloneable(densityMap), d0, d1,
            new ClusterMapOptions(options)], { evalPath: 'eval.js' });
          const computeClusterMap = funcComputeClusterMap;
          const ForwardList = classForwardList;
          parallel.require(computeClusterMap);
          parallel.require(ForwardList);
          // the following code will be evaled from a blob in Parallel.
          // eslint-disable-next-line prefer-spread, no-undef
          parallel.spawn(params => computeClusterMap.apply(null, params)).then((pClusterMap) => {
            const computedClusterMap = new ClusterMap(pClusterMap);
            // Set clusterMapsArray[d0][d1]
            const pending = this.clusterMapsArray[d0][d1].pending;
            this.clusterMapsArray[d0][d1] = computedClusterMap;

            // Execute queued 'ondone' functions
            pending.forEach((ondoneFunc) => {
              ondoneFunc(computedClusterMap);
            });
          });
        });
      } else if (!isUndefined(clusterMap.pending)) {
        // If clusterMapsArray[d0][d1] is currently being computed asynchronously
        if (clusterMap.old &&
          (!options || ClusterMapOptions.equals(clusterMap.old.options, options))) {
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
          clusterMap = new ClusterMap(funcComputeClusterMap(
            densityMap, d0, d1,
            new ClusterMapOptions(options),
          ));
          this.clusterMapsArray[d0][d1] = clusterMap;
          // consoleLog(performance.now() - tStart + "ms");
        } else {
          this.clusterMapsArray[d0][d1] = null;
          clusterMap = null;
        }
      } else if (clusterMap.old &&
        (!options || ClusterMapOptions.equals(clusterMap.old.options, options))) {
        // If the deprecated clusterMap satisfies our requested options
        clusterMap = clusterMap.old;
      } else {
        while (!isUndefined(clusterMap.pending)) { /* empty */ }
      } // Wait while clusterMapsArray[d0][d1] is being computed asynchronously

      if (isFunction(ondone)) {
        ondone(clusterMap);
      }
      return clusterMap;
    }
    return null;
  }

  /**
   * Saves the dataset to a csv file and triggers downloading the file.
   * When nameColumnIndex and nameColumnLabel are specified, row names are saved as a new column
   * at the specified column index and with the specified label.
   * @param {string} filename filename for the created csv files
   * @param {number} [nameColumnIndex] index for the generated name column
   * @param {string} [nameColumnLabel] label for the generated name column
   */
  save(filename, nameColumnIndex, nameColumnLabel) {
    let nameColumn = nameColumnIndex;
    const nc = this.numColumns;
    let csvNumCols;
    if (this.names &&
      !isUndefined(nameColumn) && !isUndefined(nameColumnLabel)) {
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

    download(filename, `data:text/csv;charset=utf-8,${encodeURIComponent($.csv.fromArrays(csv))}`);
  }
  /**
   * Creates an auto-generated column name.
   * When numColumns is <= 4, the names will be x, y, z, and w.
   * When numColumns is <= 26, the names will be A, B, ... Z.
   * For larger numColumns, the names will be c1, c2, ...
   * @param {number} columnIndex The index of the column to generate the name for.
   *                             Should be less than numColumns
   * @param {number} numColumns Total number of columns.
   */
  static generateColumnName(columnIndex, numColumns) {
    const XYZW = ['x', 'y', 'z', 'w'];
    if (numColumns <= XYZW.length && columnIndex <= XYZW.length) {
      return XYZW[columnIndex]; // x, y, z, w
    } else if (numColumns <= 26 && columnIndex <= 26) {
      return String.fromCharCode(65 + columnIndex); // A, B, C, ...
    }
    return `c${columnIndex + 1}`; // c1, c2, c3, ...
  }

  static parseData(input) {
    return parseFloat(input);
  }
}


// >>> Random dataset

/**
 * Creates a randomly generated dataset
 * @extends {Dataset}
 */
export class RandomDataset extends Dataset {
  /**
   * @constructor
   * @export
   * @param {number} numRows Number of rows (points) of the dataset
   * @param {number} numCols Number of columns (dimensions) of the dataset
   * @param {function(Dataset)} onload Event handler, called after the dataset was created
   */
  constructor(numRows, numCols, onload) {
    super();

    this.numColumns = numCols;
    this.length = numRows;
    for (let i = 0; i < numCols; i += 1) {
      this.columns.push({ minimum: 0, maximum: 1, label: Dataset.generateColumnName(i, numCols) });
      this.dataVectors.push(new DataVector(this, i));
    }

    const nnc = numRows * numCols;
    this.fdata = new Float32Array(nnc);
    for (let i = 0; i < nnc; i += 1) {
      this.fdata[i] = Math.random();
    }
    this.data = this.fdata;

    if (onload) {
      onload(this);
    }
  }
}
// >>> CSV dataset

/**
 * A map of valid options for CSV datasets with option descriptions and validation functions
 * @const
 * @enum {{
 *  description: string,
 *  default: *,
 *  valid: Array
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
 */
export class CsvDataset extends Dataset {
  /**
   * @constructor
   * @export
   * @param {string|Blob} file File or URL of file, containing the CSV-formatted dataset
   * @param {Object} options
   * @param {function(Dataset)} onload Event handler, called after the dataset was created
   */
  constructor(file, options, onload) {
    super();

    this.onloadCallback = onload;
    this.varOptions = options;

    // Validate options
    // eslint-disable-next-line no-restricted-syntax
    for (const option in this.varOptions) {
      if (!Object.prototype.hasOwnProperty.call(this.varOptions, option)) {
        continue; // eslint-disable-line no-continue
      }

      // Validate option
      if (!Object.prototype.hasOwnProperty.call(CSV_DATASET_OPTIONS, option)) {
        consoleWarn(`CsvDataset warning: Unsupported option: ${option}`);
        continue; // eslint-disable-line no-continue
      }
      const optionDefinition = CSV_DATASET_OPTIONS[option];

      // Validate value
      const value = this.varOptions[option];
      if ((optionDefinition.valid && optionDefinition.valid.indexOf(value) === -1) ||
        (optionDefinition.validRange &&
          (value < optionDefinition.validRange[0] || value > optionDefinition.validRange[1]))) {
        consoleWarn(`CsvDataset warning: Invalid value for option ${option}: ${value}`);
        delete this.varOptions[option];
        continue; // eslint-disable-line no-continue
      }
    }

    const dataset = this;
    if (isString(file)) {
      // $.get(file, parseCsv, "text");
      const request = new XMLHttpRequest();
      request.onreadystatechange = function fOnReadyStateChange() {
        if (this.readyState === 4 && this.status === 200) {
          dataset.parseCsv(this.responseText);
        }
      };
      request.open('GET', /** @type {string} */(file), true);
      request.overrideMimeType('text/csv; charset=utf8');
      request.send();
    } else {
      const reader = new FileReader();
      reader.onload = (/* event */) => {
        dataset.parseCsv(reader.result);
      };
      reader.readAsText(/** @type {!Blob} */(file));
    }
  }

  parseCsv(csv) {
    // Load csv file
    const dataset = this;
    const data = $.csv.toArrays(csv);

    if (this.varOptions.autoDetect) {
      if (isUndefined(this.varOptions.hasHeader)) {
        // Assume no-header by default
        this.varOptions.hasHeader = false;

        const firstRowOnlyStrings = data[0].every(value => Number.isNaN(Dataset.parseData(value)));
        const secondRowHasNumbers = data[1].some(value => !Number.isNaN(Dataset.parseData(value)));

        // If the first row consists of only string values, but the second row
        // has at least one numeric value, we can assume the first row is a header
        if (firstRowOnlyStrings && secondRowHasNumbers) {
          this.varOptions.hasHeader = true;
        }
        consoleLog(`Assuming hasHeader = ${this.varOptions.hasHeader}`);
      }
      if (isUndefined(this.varOptions.nameColumn)) {
        // Assume no name column by default
        this.varOptions.nameColumn = null;

        // If any row consists of only unique strings, we can assume it contains data point names
        for (let c = 0; c < data[0].length; c += 1) {
          const valueMap = {};
          if (data.every((row) => {
            if (row.length > c &&
                Number.isNaN(Dataset.parseData(row[c])) &&
                !(row[c] in valueMap)) {
              valueMap[row[c]] = true;
              return true;
            }
            return false;
          })) {
            this.varOptions.nameColumn = c;
            break;
          }
        }
        consoleLog(`Assuming nameColumn = ${this.varOptions.nameColumn}`);
      }
    }


    let n = data.length;
    const nc = data[0].length - (this.varOptions.nameColumn ? 1 : 0);
    const firstRow = (this.varOptions.hasHeader ? 1 : 0);
    dataset.numColumns = nc;

    // Generate column labels
    let columnLabels;
    if (isFunction(this.varOptions.columnLabels)) {
      columnLabels = new Array(n);
      for (let c = 0, ci = 0; c < data[0].length; c += 1, ci += 1) {
        if (c === this.varOptions.nameColumn) {
          ci -= 1;
          continue; // eslint-disable-line no-continue
        }

        columnLabels[ci] = this.varOptions.columnLabels(c);
      }
    } else if (isArray(this.varOptions.columnLabels)) {
      if (this.varOptions.columnLabels.length !== nc) {
        consoleWarn(`CsvDataset warning: Number of provided column labels (${
          this.varOptions.columnLabels.length
        }) differs from number of data columns in the dataset (${nc})`);
        columnLabels = null;
      } else {
        columnLabels = this.varOptions.columnLabels;
      }
    } else {
      columnLabels = null;
    }

    dataset.data = new Array(nc * n);
    dataset.fdata = new Float32Array(nc * n);
    let i;
    let di;
    for (let c = 0, ci = 0; c < data[0].length; c += 1, ci += 1) {
      if (c === this.varOptions.nameColumn) {
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
        const fvalue = Dataset.parseData(value);
        if (Number.isNaN(fvalue)) {
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
      } else if (this.varOptions.hasHeader) {
        theLabel = data[0][c];
      } else {
        theLabel = Dataset.generateColumnName(ci, nc);
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
    if (this.varOptions.nameColumn) {
      dataset.names = new Array(n);
      const names = dataset.names;
      const nameColumn = this.varOptions.nameColumn;
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
    if (isFunction(this.varOptions.imageFilenames)) {
      dataset.imageFilenames = new Array(n);
      for (i = firstRow, di = 0; i < data.length; i += 1, di += 1) {
        // Skip blank lines
        if (data[i].length === 1 && data[i][0] === '') {
          di -= 1;
          continue; // eslint-disable-line no-continue
        }

        dataset.imageFilenames[di] = this.varOptions.imageFilenames(data[i], i);
      }
    } else if (isArray(this.varOptions.imageFilenames)) {
      if (this.varOptions.imageFilenames.length !== n) {
        consoleWarn(`CsvDataset warning: Number of provided image filenames (${this.varOptions.imageFilenames.length}) differs from number of data points (${n})`);
        dataset.imageFilenames = null;
      } else {
        dataset.imageFilenames = this.varOptions.imageFilenames;
      }
    } else {
      dataset.imageFilenames = null;
    }

    // Notify success
    if (this.onloadCallback) {
      this.onloadCallback(dataset);
    }
  }
}
