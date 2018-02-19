import { CsvDataset } from '../../../dist/global-view';
import SnapshotTest from './snapshotTest';

export default class TestCustomPointShape extends SnapshotTest {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    const numLeafs = 5;
    return {
      pointShape: 'Custom',
      pointSize: 15,
      customPointShape: `{ float r = length(p), f = sin(0.5 * ${numLeafs}.0 * atan(p.x, p.y)); return pow(clamp(abs(f) - r, 0.0, 1.0), 0.5); }`,
    };
  }

  run() {
    // eslint-disable-next-line no-new
    new CsvDataset('datasets/iris.data', {}, (dataset) => {
      this.getPlot().load(dataset, 0, 1, 4, 1);
      this.getPlot().setOption();
      this.callOnDone();
    });
  }
}
