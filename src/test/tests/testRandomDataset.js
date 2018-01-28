const globalView = require('../../../dist/global-view.js');
const seedrandom = require('seedrandom');

export default function testRandomDataSet(div, ondone) {
  // replaces Math.random(). only required as the test needs the same random dataset.
  seedrandom('1337', { global: true });
  const plot = new globalView.GlobalView(div, null);
  this.getPlot = () => plot;
  const data = new globalView.RandomDataset(1000, 3, (dataset) => {
    plot.load(dataset, 0, 1, 2, 2);

    setTimeout(() => { ondone(); }, 500);
  });
}