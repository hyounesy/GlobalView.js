import { GlobalView, RandomDataset } from '../../dist/global-view';

const plot = new GlobalView(document.querySelector('#divGlobalView'), null);
// const data =
// eslint-disable-next-line no-new
new RandomDataset(1000, 3, (dataset) => {
  plot.load(dataset, 0, 1, 2, 2);
});
