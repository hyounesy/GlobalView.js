const globalView = require('../../../dist/global-view.js');

export default function testCustomOptions(div, ondone) {
  const plot = new globalView.GlobalView(div, {
    pointSize: 15,
    pointColor: ['#F25', 'green', [40, 60, 230, 255]],
  });

  const data = new globalView.CsvDataset('tests/datasets/iris.data', {}, (dataset) => {
    plot.load(dataset, 0, 1, 4, 1);

    setTimeout(() => { ondone(); }, 500); // boiler-plate code
  });
  this.getPlot = () => plot; // boiler-plate code
}
