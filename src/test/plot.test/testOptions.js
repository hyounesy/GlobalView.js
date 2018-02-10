const globalView = require('../../../dist/global-view.js');

function testCustomOptions(div, options, ondone, timeout = 500) {
  const plot = new globalView.GlobalView(div, options);

  // eslint-disable-next-line no-new
  new globalView.CsvDataset('datasets/iris.data', {}, (dataset) => {
    plot.load(dataset, 0, 1, 4, 1);

    setTimeout(() => {
      ondone();
    }, timeout); // boiler-plate code
  });
  return plot;
}

export function testOptionPointSize(div, ondone) {
  const plot = testCustomOptions(div, { pointSize: 15 }, ondone);
  this.getPlot = () => plot;
}

export function testOptionPointColor(div, ondone) {
  const plot = testCustomOptions(
    div, { pointColor: ['#F25', 'green', [40, 60, 230, 255]] },
    ondone,
  );
  this.getPlot = () => plot;
}

export function testOptionColormapVisibility(div, ondone) {
  const plot = testCustomOptions(div, { showColormap: false }, ondone);
  this.getPlot = () => plot;
}

export function testOptionTransparency(div, ondone) {
  const plot = testCustomOptions(div, { enableTransparency: false }, ondone);
  this.getPlot = () => plot;
}

export function testOptionPointDensity(div, ondone) {
  const plot = testCustomOptions(div, { showPointDensity: true }, ondone, 5000);
  this.getPlot = () => plot;
}

export function testOptionPointClusters(div, ondone) {
  const plot = testCustomOptions(
    div,
    { showPointClusters: true, pointClusterThreshold: 0.2 },
    ondone, 5000,
  );
  this.getPlot = () => plot;
}

export function testOptionPadding(div, ondone) {
  const plot = testCustomOptions(div, { padding: [100, 110, 120, 130] }, ondone);
  this.getPlot = () => plot;
}

export function testOptionPointShape(div, ondone) {
  const plot = testCustomOptions(div, { pointShape: 'Cross' }, ondone);
  this.getPlot = () => plot;
}

export function testOptionPointOpacity(div, ondone) {
  const plot = testCustomOptions(div, { pointOpacity: 0.3 }, ondone);
  this.getPlot = () => plot;
}

