const globalView = require('../dist/global-view.js');
const domready = require('domready');

const COLUMN_NAMES = [
  'Tagged Protein',
  'Nuclear volume (fL)',
  'Cellular volume (fL)',
  'Nuclear surface area (µm²)',
  'Cellular surface area (µm²)',
  'Radial proximity (unitless)',
  'Apical proximity (unitless)'
];

var plots = null;

domready(function () {
  const PLOT_SIZE = 400;
  const FONT_SIZE = 8;
  const PLOT_PADDING = [8, 8, 40, 40];
  var OPTIONS = {
    padding: PLOT_PADDING,
    showColormap: false,
    pointSize: 3,
    pointOpacity: 0.6,
    pointColor: ['#A6CEE3', '#B2DF8A', '#33A02C', '#FB9A99', '#FDBF6F', '#FF7F00', '#CAB2D6', '#6A3D9A', '#FFFF99', '#4D61BF'],
    thumbnailSize: 16
  };
  const NUM_THUMBNAILS = 16;
  const DENSITY_RATIO = 0.5;

  var divPlots = document.createElement('div');
  divPlots.style.position = 'fixed';
  divPlots.style.left = divPlots.style.top = '0px';
  divPlots.style.width = divPlots.style.height = PLOT_SIZE + 'px';
  divPlots.style.fontSize = FONT_SIZE;
  document.body.appendChild(divPlots);

  const csvPath = 'datasets/AICS_Cell-feature-analysis_v1.5.csv'; // 'http://homepage.univie.ac.at/a0929188/GlobalView/AICS_Cell-feature-analysis_v1.5.csv"
  const imagesPath = 'datasets/AICS_Cell-feature-analysis_v1.5_images/'; // 'http://homepage.univie.ac.at/a0929188/GlobalView/images/"

  new globalView.CsvDataset(csvPath, {
    hasHeader: true,
    nameColumn: 1,
    columnLabels: COLUMN_NAMES,
    imageFilenames: data => imagesPath + data[1] + '.png'
  }, function (dataset) {
    const ndim = Math.min(2, dataset.dataVectors.length - 1); // -1 ... Adjust number of dataVectors, since we don't plot dataVectors[0] (tagged protein)
    var subPlotWidth = PLOT_SIZE / ndim,
      subPlotHeight = subPlotWidth;
    plots = Array.create(ndim * ndim, function (d) {
      var x = d % ndim,
        y = Math.floor(d / ndim);

      OPTIONS.padding = [y * subPlotHeight, (ndim - x - 1) * subPlotWidth, (ndim - y - 1) * subPlotHeight, x * subPlotWidth];

      // Adjust indices, since we don't plot dataVectors[0] (tagged protein)
      ++x;
      ++y;

      var thumbnailWidth = OPTIONS.thumbnailSize * (dataset.dataVectors[x].maximum - dataset.dataVectors[x].minimum) / (PLOT_SIZE - OPTIONS.padding[1] - OPTIONS.padding[3]);
      var thumbnailHeight = OPTIONS.thumbnailSize * (dataset.dataVectors[y].maximum - dataset.dataVectors[y].minimum) / (PLOT_SIZE - OPTIONS.padding[0] - OPTIONS.padding[2]);
      console.log(thumbnailWidth, thumbnailHeight);

      var plot = new globalView.GlobalView(divPlots, OPTIONS);
      plot.load(dataset, x, y, 0, 0);
      plot.zoomRect({
        l: dataset.dataVectors[x].minimum - thumbnailWidth,
        r: dataset.dataVectors[x].maximum + thumbnailWidth,
        t: dataset.dataVectors[y].minimum - thumbnailHeight,
        b: dataset.dataVectors[y].maximum + thumbnailHeight
      });
      plot.selectedPoints = plot.createPointSet('red', 1);

      plot.getCharacteristicPoints(NUM_THUMBNAILS, DENSITY_RATIO, function (characteristicPoints) {
        plot.selectedPoints.assign(characteristicPoints);
        plot.showImages_lowDensity(plot.selectedPoints);
      });

      return plot;
    });
  });
});