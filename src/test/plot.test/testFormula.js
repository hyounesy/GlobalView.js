import { GlobalView, Dataset, DataVector } from '../../../dist/global-view';

export default function testFormula(div, ondone) {
  const plot = new GlobalView(div, {
    pointSize: 1.5,
    pointColor: 'gray',
    showColormap: false,
  });
  this.getPlot = () => plot;

  class EmptyDataset extends Dataset {
    constructor(n) {
      super();
      this.length = n;
    }
  }

  const dataset = new EmptyDataset(10000);
  dataset.dataVectors.push(new DataVector(dataset, 'i'));
  dataset.dataVectors.push(new DataVector(dataset, 'sin(i * 8.0 * PI / n)'));
  dataset.dataVectors.push(new DataVector(dataset, '0.0'));
  plot.load(dataset, 0, 1, 2, 2);
  setTimeout(() => {
    ondone();
  }, 500);
}
