const globalView = require('../dist/global-view.js');
const domready = require('domready');

let plot;

domready(function () {
  plot = new globalView.GlobalView(document.getElementById('divGlobalView'), {
    pointShape: 'Custom',
    pointSize: 15,

    pointColor: ['#F25', 'green', [40, 60, 230, 255]],

    // Other valid color-values are:
    // pointColor: [100, 100, 255, 255]
    // pointColor: [255, 255, 255, 80]
    // pointColor: "#38F"
    // pointColor: "#123456"
    // pointColor: "violet"
  });

  // eslint-disable-next-line no-new
  new globalView.CsvDataset('datasets/iris.data', {
    columnLabels: ['Sepal Length [cm]', 'Sepal Width [cm]', 'Petal Length [cm]', 'Petal Width [cm]', 'Class'],
  }, function (dataset) {
    plot.load(dataset, 0, 1, 4, 1);
  });

  const rangeNumLeafs = document.getElementById('rangeNumLeafs');
  rangeNumLeafs.addEventListener('input', function () {
    rangeNumLeafsOninput(rangeNumLeafs);
  }, false);
  rangeNumLeafsOninput(rangeNumLeafs);
});

function rangeNumLeafsOninput(sender) {
  const numLeafs = Number.parseInt(sender.value, 10);
  document.getElementById('spanNumLeafs').innerText = `Number of leafs: ${numLeafs}`;
  plot.setOption('customPointShape', `{ float r = length(p), f = sin(0.5 * ${numLeafs}.0 * atan(p.x, p.y)); return pow(clamp(abs(f) - r, 0.0, 1.0), 0.5); }`);
}
