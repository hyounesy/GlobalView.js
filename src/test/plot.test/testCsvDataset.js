import { CsvDataset } from '../../../dist/global-view';
import SnapshotTest from './snapshotTest';

export default class TestCsvDataSet extends SnapshotTest {
  run() {
    // eslint-disable-next-line no-new
    new CsvDataset(SnapshotTest.getDatasetName(), {
      columnLabels: SnapshotTest.getDatasetColumnNames(),
    }, (dataset) => {
      const columnX = 0;
      const columnY = 1;
      const columnColor = 4;
      const columnS = 1;
      this.getPlot().load(dataset, columnX, columnY, columnColor, columnS);
      this.callOnDone();
    });
  }
}
