const globalView = require('../../../dist/global-view.js');

export default function testCsvDataSet(div, ondone) {
  const plot = new globalView.GlobalView(div, null);
  this.getPlot = () => plot;

  // eslint-disable-next-line no-new
  new globalView.CsvDataset('datasets/iris.data', {
    columnLabels: ['Sepal Length [cm]', 'Sepal Width [cm]', 'Petal Length [cm]', 'Petal Width [cm]', 'Class'],
  }, (dataset) => {
    const columnX = 0;
    const columnY = 1;
    const columnColor = 4;
    const columnS = 1;
    plot.load(dataset, columnX, columnY, columnColor, columnS);

    setTimeout(() => {
      ondone();
    }, 500);
  });
}
