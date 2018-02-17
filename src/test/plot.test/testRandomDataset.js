// eslint-disable-next-line import/no-extraneous-dependencies
import seedrandom from 'seedrandom';
import { GlobalView, RandomDataset } from '../../../dist/global-view';

export default function testRandomDataSet(div, ondone) {
  // replaces Math.random(). only required as the test needs the same random dataset.
  seedrandom('1337', { global: true });
  const plot = new GlobalView(div, null);
  this.getPlot = () => plot;

  // eslint-disable-next-line no-new
  new RandomDataset(1000, 3, (dataset) => {
    plot.load(dataset, 0, 1, 2, 2);

    setTimeout(() => {
      ondone();
    }, 500);
  });
}
