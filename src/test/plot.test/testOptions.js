import { CsvDataset } from '../../../dist/global-view';
import SnapshotTest from './snapshotTest';

class TestCustomOptions extends SnapshotTest {
  run() {
    // eslint-disable-next-line no-new
    new CsvDataset(SnapshotTest.getDatasetName(), {}, (dataset) => {
      this.getPlot().load(dataset, 0, 1, 4, 1);
      this.callOnDone();
    });
  }
}

export class TestOptionPointSize extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { pointSize: 15 };
  }
}

export class TestOptionPointColor extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { pointColor: ['#F25', 'green', [40, 60, 230, 255]] };
  }
}

export class TestOptionColormapVisibility extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { showColormap: false };
  }
}

export class TestOptionTransparency extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { enableTransparency: false };
  }
}

export class TestOptionPadding extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { padding: [100, 110, 120, 130] };
  }
}

export class TestOptionPointShape extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { pointShape: 'Cross' };
  }
}

export class TestOptionPointOpacity extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { pointOpacity: 0.3 };
  }
}

export class TestOptionPointDensity extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { showPointDensity: true };
  }

  getTimeOutMS() {
    return this.timeOutMS * 10; // need more time to compute the density map
  }
}

export class TestOptionPointClusters extends TestCustomOptions {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return { showPointClusters: true, pointClusterThreshold: 0.2 };
  }

  getTimeOutMS() {
    return this.timeOutMS * 10; // need more time to compute the cluster map
  }
}
