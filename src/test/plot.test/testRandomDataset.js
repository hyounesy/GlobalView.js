// eslint-disable-next-line import/no-extraneous-dependencies
import seedrandom from 'seedrandom';
import { RandomDataset } from '../../../dist/global-view';
import SnapshotTest from './snapshotTest';

export default class TestRandomDataSet extends SnapshotTest {
  run() {
    // replaces Math.random(). only required as the test needs a consistent random dataset.
    seedrandom('1337', { global: true });
    // eslint-disable-next-line no-new
    new RandomDataset(1000, 3, (dataset) => {
      this.getPlot().load(dataset, 0, 1, 2, 2);
      this.callOnDone();
    });
  }
}
