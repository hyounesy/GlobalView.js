import { GlobalView, CsvDataset } from '../../../dist/global-view';

export default function testThumbnails(div, ondone) {
  const plot = new GlobalView(div, null);
  this.getPlot = () => plot;

  // eslint-disable-next-line no-new
  new CsvDataset('datasets/iris.data', {
    columnLabels: ['Sepal Length [cm]', 'Sepal Width [cm]', 'Petal Length [cm]', 'Petal Width [cm]', 'Class'],
    imageFilenames: point => `datasets/${point[4]}.png`,
  }, (dataset) => {
    const columnX = 0;
    const columnY = 1;
    const columnColor = 4;
    const columnS = 1;
    plot.load(dataset, columnX, columnY, columnColor, columnS);
    plot.referencePoints = plot.createPointSet('red', 1);
    plot.referencePoints.push(20);
    plot.referencePoints.push(80);
    plot.referencePoints.push(120);
    plot.showImages(plot.referencePoints, 'lowDensity');

    plot.setOptions({
      thumbnailSize: 32,
      thumbnailBorderWidth: 2,
      thumbnailBorderColor: 'green',
      thumbnailLineColor: 'red',
      thumbnailLabelColor: 'yellow',
      labelThumbnails: true,
    });
    setTimeout(() => {
      ondone();
    }, 1000);
  });
}
