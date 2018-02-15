const globalView = require('../../dist/global-view.js');
const domready = require('domready'); // eslint-disable-line import/no-extraneous-dependencies

domready(() => {
  const plot = new globalView.GlobalView(document.getElementById('divGlobalView'), {
    pointSize: 1.5,
    pointColor: 'white',
  });

  class EmptyDataset extends globalView.Dataset {
    constructor(n) {
      super();
      this.length = n;
    }
  }

  const dataset = new EmptyDataset(10000);
  dataset.dataVectors.push(new globalView.DataVector(dataset, 'i'));
  dataset.dataVectors.push(new globalView.DataVector(dataset, 'sin(i * 8.0 * PI / n)'));
  dataset.dataVectors.push(new globalView.DataVector(dataset, '0.0'));
  plot.load(dataset, 0, 1, 2, 2);
});