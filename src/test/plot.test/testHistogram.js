import { CsvDataset } from '../../../dist/global-view';
import SnapshotTest from './snapshotTest';

class TestHistogramOptions extends SnapshotTest {
  run() {
    // eslint-disable-next-line no-new
    new CsvDataset(SnapshotTest.getDatasetName(), {}, (dataset) => {
      this.getPlot().load(dataset, 0, 1, 4, 1);
      // has to enable histogram options after dataset is loaded
      this.getPlot().setOptions(this.getHistogramOptions());
      this.callOnDone();
    });
  }
}

export class TestXAxisHistogram extends TestHistogramOptions {
  getHistogramOptions() { // eslint-disable-line class-methods-use-this
    return { showXAxisHistogram: true };
  }
}

export class TestYAxisHistogram extends TestHistogramOptions {
  getHistogramOptions() { // eslint-disable-line class-methods-use-this
    return { showYAxisHistogram: true };
  }
}

export class TestColormapHistogram extends TestHistogramOptions {
  getHistogramOptions() { // eslint-disable-line class-methods-use-this
    return { showColormapHistogram: true };
  }
}

export class TestNumHistogramBins extends TestHistogramOptions {
  getHistogramOptions() { // eslint-disable-line class-methods-use-this
    return {
      showXAxisHistogram: true,
      showYAxisHistogram: true,
      showColormapHistogram: true,
      numHistogramBins: 42,
    };
  }
}

export class TestHistogramHeight extends TestHistogramOptions {
  getHistogramOptions() { // eslint-disable-line class-methods-use-this
    return {
      showXAxisHistogram: true,
      showYAxisHistogram: true,
      showColormapHistogram: true,
      histogramHeight: 20,
    };
  }
}
