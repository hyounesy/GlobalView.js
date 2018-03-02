import { Dataset, DataVector } from '../../../dist/global-view';
import SnapshotTest from './snapshotTest';

class EmptyDataset extends Dataset {
  constructor(n) {
    super();
    this.length = n;
  }
}

export default class TestFormula extends SnapshotTest {
  getPlotOptions() { // eslint-disable-line class-methods-use-this
    return {
      pointSize: 1.5,
      pointColor: 'gray',
      showColormap: false,
    };
  }

  run() {
    const dataset = new EmptyDataset(10000);
    dataset.dataVectors.push(new DataVector(dataset, 'i'));
    dataset.dataVectors.push(new DataVector(dataset, 'sin(i * 8.0 * PI / n)'));
    dataset.dataVectors.push(new DataVector(dataset, '0.0'));
    this.getPlot().load(dataset, 0, 1, 2, 2);
    this.callOnDone();
  }
}
