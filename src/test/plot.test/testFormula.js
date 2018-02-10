const globalView = require('../../../dist/global-view.js');

function EmptyDataset(n) {
  globalView.Dataset.call(this);
  this.length = n;
}

export default function testFormula(div, ondone) {
  const plot = new globalView.GlobalView(div, {
    pointSize: 1.5,
    pointColor: 'gray',
    showColormap: false,
  });
  this.getPlot = () => plot;
  const dataset = new EmptyDataset(10000);
  dataset.dataVectors.push(new globalView.DataVector(dataset, 'i'));
  dataset.dataVectors.push(new globalView.DataVector(dataset, 'sin(i * 8.0 * PI / n)'));
  dataset.dataVectors.push(new globalView.DataVector(dataset, '0.0'));
  plot.load(dataset, 0, 1, 2, 2);
  setTimeout(() => {
    ondone();
  }, 500);
}
