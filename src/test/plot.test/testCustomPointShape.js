const globalView = require('../../../dist/global-view.js');

export default function testCustomPointShape(div, ondone) {
  const plot = new globalView.GlobalView(div, {
    pointShape: 'Custom',
    pointSize: 15,
  });
  this.getPlot = () => plot;

  // eslint-disable-next-line no-new
  new globalView.CsvDataset('datasets/iris.data', {}, (dataset) => {
    plot.load(dataset, 0, 1, 4, 1);
    const numLeafs = 5;
    plot.setOption('customPointShape', `{ float r = length(p), f = sin(0.5 * ${numLeafs}.0 * atan(p.x, p.y)); return pow(clamp(abs(f) - r, 0.0, 1.0), 0.5); }`);
    setTimeout(() => {
      ondone();
    }, 500);
  });
}
