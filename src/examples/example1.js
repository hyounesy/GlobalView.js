const globalView = require('../../dist/global-view.js');

const plot = new globalView.GlobalView(document.querySelector('#divGlobalView'), null);
// const data =
// eslint-disable-next-line no-new
new globalView.RandomDataset(1000, 3, (dataset) => {
  plot.load(dataset, 0, 1, 2, 2);
});
