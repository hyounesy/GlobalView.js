import domready from 'domready'; // eslint-disable-line import/no-extraneous-dependencies
import { GlobalView, CsvDataset, consoleLog } from '../../dist/global-view';

const COLUMN_NAMES = [
  'Tagged Protein',
  'Nuclear volume (fL)',
  'Cellular volume (fL)',
  'Nuclear surface area (µm²)',
  'Cellular surface area (µm²)',
  'Radial proximity (unitless)',
  'Apical proximity (unitless)',
];

domready(() => {
  const PLOT_SIZE = 400;
  const FONT_SIZE = 8;
  const PLOT_PADDING = [8, 8, 40, 40];
  const OPTIONS = {
    padding: PLOT_PADDING,
    showColormap: false,
    pointSize: 3,
    pointOpacity: 0.6,
    pointColor: ['#A6CEE3', '#B2DF8A', '#33A02C', '#FB9A99', '#FDBF6F',
      '#FF7F00', '#CAB2D6', '#6A3D9A', '#FFFF99', '#4D61BF'],
    thumbnailSize: 16,
  };
  const NUM_THUMBNAILS = 16;
  const DENSITY_RATIO = 0.5;

  const divPlots = document.createElement('div');
  divPlots.style.position = 'fixed';
  divPlots.style.left = '0px';
  divPlots.style.top = '0px';
  divPlots.style.width = `${PLOT_SIZE}px`;
  divPlots.style.height = `${PLOT_SIZE}px`;
  divPlots.style.fontSize = FONT_SIZE;
  document.body.appendChild(divPlots);

  // 'http://homepage.univie.ac.at/a0929188/GlobalView/AICS_Cell-feature-analysis_v1.5.csv"
  const csvPath = 'datasets/AICS_Cell-feature-analysis_v1.5.csv';
  // 'http://homepage.univie.ac.at/a0929188/GlobalView/images/"
  const imagesPath = 'datasets/AICS_Cell-feature-analysis_v1.5_images/';

  new CsvDataset(csvPath, { // eslint-disable-line no-new
    hasHeader: true,
    nameColumn: 1,
    columnLabels: COLUMN_NAMES,
    imageFilenames: data => `${imagesPath + data[1]}.png`,
  }, ((dataset) => {
    // -1 ... Adjust number of dataVectors, since we don't plot dataVectors[0] (tagged protein)
      const ndim = Math.min(2, dataset.dataVectors.length - 1);
      const subPlotWidth = PLOT_SIZE / ndim;
      const subPlotHeight = subPlotWidth;
      // const plots =
      Array.create(ndim * ndim, (d) => {
        let x = d % ndim;
        let y = Math.floor(d / ndim);

        OPTIONS.padding = [y * subPlotHeight,
          (ndim - x - 1) * subPlotWidth,
          (ndim - y - 1) * subPlotHeight,
          x * subPlotWidth];

        // Adjust indices, since we don't plot dataVectors[0] (tagged protein)
        x += 1;
        y += 1;

        const thumbnailWidth = (OPTIONS.thumbnailSize *
        (dataset.dataVectors[x].maximum - dataset.dataVectors[x].minimum)) /
      (PLOT_SIZE - OPTIONS.padding[1] - OPTIONS.padding[3]);
        const thumbnailHeight = (OPTIONS.thumbnailSize *
        (dataset.dataVectors[y].maximum - dataset.dataVectors[y].minimum)) /
      (PLOT_SIZE - OPTIONS.padding[0] - OPTIONS.padding[2]);
        consoleLog(thumbnailWidth, thumbnailHeight);

        const plot = new GlobalView(divPlots, OPTIONS);
        plot.load(dataset, x, y, 0, 0);
        plot.zoomRect({
          l: dataset.dataVectors[x].minimum - thumbnailWidth,
          r: dataset.dataVectors[x].maximum + thumbnailWidth,
          t: dataset.dataVectors[y].minimum - thumbnailHeight,
          b: dataset.dataVectors[y].maximum + thumbnailHeight,
        });
        plot.selectedPoints = plot.createPointSet('red', 1);

        plot.getCharacteristicPoints(NUM_THUMBNAILS, DENSITY_RATIO, (characteristicPoints) => {
          plot.selectedPoints.assign(characteristicPoints);
          plot.showImages_lowDensity(plot.selectedPoints);
        });

        return plot;
      });
    }));
});
