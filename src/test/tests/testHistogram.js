const globalView = require('../../../dist/global-view.js');

function testHistogramOptions(div, options, ondone, timeout = 500) {
  const plot = new globalView.GlobalView(div);

  const data = new globalView.CsvDataset('tests/datasets/iris.data', {}, (dataset) => {
    plot.load(dataset, 0, 1, 4, 1);
    plot.setOptions(options); // has to enable histogram after dataset is loaded
    setTimeout(() => {
      ondone();
    }, timeout); // boiler-plate code
  });
  return plot;
}

export function testXAxisHistogram(div, ondone) {
  const plot = testHistogramOptions(div, { showXAxisHistogram: true }, ondone);
  this.getPlot = () => plot;
}

export function testYAxisHistogram(div, ondone) {
  const plot = testHistogramOptions(div, { showYAxisHistogram: true }, ondone);
  this.getPlot = () => plot;
}

export function testColormapHistogram(div, ondone) {
  const plot = testHistogramOptions(div, { showColormapHistogram: true }, ondone);
  this.getPlot = () => plot;
}

export function testNumHistogramBins(div, ondone) {
  const plot = testHistogramOptions(div, {
    showXAxisHistogram: true,
    showYAxisHistogram: true,
    showColormapHistogram: true,
    numHistogramBins: 42,
  }, ondone);
  this.getPlot = () => plot;
}

export function testHistogramHeight(div, ondone) {
  const plot = testHistogramOptions(div, {
    showXAxisHistogram: true,
    showYAxisHistogram: true,
    showColormapHistogram: true,
    histogramHeight: 20,
  }, ondone);
  this.getPlot = () => plot;
}
