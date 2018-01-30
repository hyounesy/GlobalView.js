const globalView = require('../../../dist/global-view.js');

function testCustomOptions(div, options, ondone) {
  const plot = new globalView.GlobalView(div, options);

  const data = new globalView.CsvDataset('tests/datasets/iris.data', {}, (dataset) => {
    plot.load(dataset, 0, 1, 4, 1);

    setTimeout(() => { ondone(); }, 500); // boiler-plate code
  });
  return plot;
}

export function testOptionPointSize(div, ondone) {
  const plot = testCustomOptions(div, { pointSize: 15 }, ondone);
  this.getPlot = () => plot;
}

export function testOptionPointColor(div, ondone) {
  const plot = testCustomOptions(div, { pointColor: ['#F25', 'green', [40, 60, 230, 255]] }, ondone);
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
  const plot = testCustomOptions(div, { showPointDensity: true }, ondone);
  this.getPlot = () => plot;
}

export function testOptionPointClusters(div, ondone) {
  const plot = testCustomOptions(div, { showPointClusters: true, pointClusterThreshold: 0.2 }, ondone);
  this.getPlot = () => plot;
}

export function testOptionPadding(div, ondone) {
  const plot = testCustomOptions(div, { padding: [40, 50, 60, 70] }, ondone);
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

/*
{
  "showXAxisHistogram": false,
  "showYAxisHistogram": false,
  "showColormapHistogram": false,
  "numHistogramBins": 50,
  "histogramHeight": 64,

  "thumbnailSize": 64,
  "thumbnailBorderWidth": 1,
  "thumbnailBorderColor": null,
  "thumbnailLineColor": null,
  "thumbnailLabelColor": null,
  "labelThumbnails": false
}
*/
