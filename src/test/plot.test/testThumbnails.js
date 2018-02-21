import { CsvDataset } from '../../../dist/global-view';
import SnapshotTest from './snapshotTest';

export default class TestThumbnails extends SnapshotTest {
  run() {
    // eslint-disable-next-line no-new
    new CsvDataset(SnapshotTest.getDatasetName(), {
      columnLabels: SnapshotTest.getDatasetColumnNames(),
      imageFilenames: point => `datasets/${point[4]}.png`,
    }, (dataset) => {
      const columnX = 0;
      const columnY = 1;
      const columnColor = 4;
      const columnS = 1;
      this.getPlot().load(dataset, columnX, columnY, columnColor, columnS);
      // create reference points for which the images should be shown
      this.getPlot().referencePoints = this.getPlot().createPointSet('red', 1);
      this.getPlot().referencePoints.push(20);
      this.getPlot().referencePoints.push(80);
      this.getPlot().referencePoints.push(120);
      this.getPlot().showImages(this.getPlot().referencePoints, 'lowDensity');

      this.getPlot().setOptions({ // set this afterwards
        thumbnailSize: 32,
        thumbnailBorderWidth: 2,
        thumbnailBorderColor: 'green',
        thumbnailLineColor: 'red',
        thumbnailLabelColor: 'yellow',
        labelThumbnails: true,
      });
      this.callOnDone();
    });
  }
}
