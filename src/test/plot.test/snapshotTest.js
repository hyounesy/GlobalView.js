import { GlobalView } from '../../../dist/global-view';

export default class SnapshotTest {
  constructor(div, ondone) {
    this.div = div;
    this.ondone = ondone;
    this.plot = this.createPlot();
    this.timeOutMS = 500;
    this.run();
  }

  // creates the GlobalView plot
  createPlot() {
    return new GlobalView(this.div, this.getPlotOptions());
  }

  // returns the GlobalView plot
  getPlot() {
    return this.plot;
  }

  // calls the callback function after a default timeout
  callOnDone() {
    setTimeout(() => {
      this.ondone();
    }, this.getTimeOutMS());
  }

  // default dataset to be used with the tests
  static getDatasetName() {
    return 'datasets/iris.data';
  }

  // default dataset column names (if not specified in the dataset itself)
  static getDatasetColumnNames() {
    return ['Sepal Length [cm]', 'Sepal Width [cm]', 'Petal Length [cm]', 'Petal Width [cm]', 'Class'];
  }

  // Override to specify any specific plot options
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return null;
  }

  // Override with with the code to run the specific test
  // Make sure to either run the default this.callOnDone, or the callback this.ondone()
  // manually (e.g. if the call back should be called after a conditions is passed)
  run() {
    this.callOnDone();
  }

  // the timeout to wait before calling the callback. Override to modify the wait time.
  getTimeOutMS() {
    return this.timeOutMS;
  }
}
