// const globalView = require('../lib/globalView.js');
const domready = require('domready');
// const libDataset = require("../lib/dataset.js");

const globalView = require('../dist/global-view.js');

const COLUMN_NAMES = [
  'Tagged Protein',
  'Nuclear volume (fL)',
  'Cellular volume (fL)',
  'Nuclear surface area (µm²)',
  'Cellular surface area (µm²)',
  'Radial proximity (unitless)',
  'Apical proximity (unitless)',
];
const COLUMN_HINTS = [
  '',
  '<b>Nuclear volume:</b> the volume of a nucleus of a given cell, as measured by segmented voxels and associated edge length, in units of femtoliter (fL).',
  '<b>Cell volume:</b> the volume of a cell, as measured by segmented voxels and associated edge length, in units of femtoliter (fL).',
  '<b>Nuclear surface area:</b> the surface area of a nucleus of a given cell as measured by segmented pixels and associated edge length, in units of µm².',
  '<b>Cell surface area:</b> the surface area of a cell, as measured by segmented pixels and associated edge length, in units of µm².',
  '<b>Radial proximity:</b> an intensity-derived image feature, defined as the optical intensity of a structure found in the more external shell of a roughly columnar cell (closer to the cell exterior) as compared to the more internal columnar core of the same cell (closer to the cell center), scaled from -1 to 1. A cell in which all of the fluorescence intensity was at the center of the cell would have a radial proximity of -1; whereas a structure that was at cell boundary would have a radial proximity of 1.',
  '<b>Apical proximity:</b> an intensity-derived image feature, defined as the optical intensity of a structure found in the top (apical) half of a roughly columnar cell as compared to the basal (bottom) half of this cell, scaled from -1 to 1. A cell in which all of the fluorescent intensity was in the top half would have an apical proximity of 1; whereas a structure that was evenly distributed between the apical and basal halves would have an apical proximity of 0.',
];
let plot;
const pointsByProtein = {};

domready(function () {
  plot = new globalView.GlobalView(document.getElementById('divPlot'), {
    pointShape: 'Circle',
    pointSize: 8,
    pointOpacity: 0.3,
    pointColor: ['#A6CEE3', '#B2DF8A', '#33A02C', '#FB9A99', '#FDBF6F', '#FF7F00', '#CAB2D6', '#6A3D9A', '#FFFF99', '#4D61BF'],
    padding: [8, 152, 50, 50],
  });
  plot.onMouseDown = plot_onMouseDown;
  plot.onMouseOverDatapoint = plot_onMouseOverDatapoint;
  plot.onMouseOverAxisLabel = plot_onMouseOverAxisLabel;
  plot.onSelectionChanged = plot_onSelectionChanged;
  plot.onLassoSelection = plot_onLassoSelection;
  plot.referencePoints = plot.createPointSet('red', 1);
  plot.highlightedPoints = plot.createPointSet('red', 1);
  const csvPath = 'datasets/AICS_Cell-feature-analysis_v1.5.csv'; // 'http://homepage.univie.ac.at/a0929188/GlobalView/AICS_Cell-feature-analysis_v1.5.csv"
  const imagesPath = 'datasets/AICS_Cell-feature-analysis_v1.5_images/'; // 'http://homepage.univie.ac.at/a0929188/GlobalView/images/"
  new globalView.CsvDataset(csvPath, { // eslint-disable-line no-new
    hasHeader: true,
    nameColumn: 1,
    columnLabels: COLUMN_NAMES,
    imageFilenames: data => `${imagesPath + data[1]}.png`,
  }, function (dataset) {
    plot.load(dataset, 2, 4, 0, 3);
    plot.getCharacteristicPoints(8, 1, function (characteristicPoints) {
      plot.referencePoints.assign(characteristicPoints);
      plot.showImages(plot.referencePoints, 'lowDensity');
    });

    for (let i = 0, nc = dataset.numColumns; i < dataset.length; i += 1) {
      const protein = dataset.data[(i * nc) + 0];
      let proteinPoints = pointsByProtein[protein];
      if (!proteinPoints) {
        pointsByProtein[protein] = proteinPoints = new globalView.HashSet();
      }
      proteinPoints.push(i);
    }

    for (let i = 0; i < COLUMN_HINTS.length; i += 1) {
      dataset.dataVectors[i].hint = COLUMN_HINTS[i];
    }
  });
  addAllEventListeners();
});

function addAllEventListeners() {
  document.getElementById('cmdSelectAll').addEventListener('click', function () {
    cmdSelectAll_onClick(document.getElementById('cmdSelectAll'));
  });
  document.getElementById('cmdDeselectAll').addEventListener('click', function () {
    cmdDeselectAll_onClick(document.getElementById('cmdDeselectAll'));
  });
  document.getElementById('Tom20').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Tom20'));
  });
  document.getElementById('Alpha tubulin').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Alpha tubulin'));
  });
  document.getElementById('Sec61 beta').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Sec61 beta'));
  });
  document.getElementById('Alpha actinin').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Alpha actinin'));
  });
  document.getElementById('Desmoplakin').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Desmoplakin'));
  });
  document.getElementById('Lamin B1').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Lamin B1'));
  });
  document.getElementById('Fibrillarin').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Fibrillarin'));
  });
  document.getElementById('Beta actin').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Beta actin'));
  });
  document.getElementById('ZO1').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('ZO1'));
  });
  document.getElementById('Myosin IIB').addEventListener('change', function () {
    cbProtein_onChange(document.getElementById('Myosin IIB'));
  });
  document.getElementById('cbXAxis').addEventListener('change', function () {
    cbXAxis_onChange(document.getElementById('cbXAxis'));
  });
  document.getElementById('cbYAxis').addEventListener('change', function () {
    cbYAxis_onChange(document.getElementById('cbYAxis'));
  });
}

function cmdSelectAll_onClick(sender) {
  const elements = document.querySelectorAll("input[type='checkbox']");
  for (let i = 0; i < elements.length; i += 1) {
    if (elements[i].checked === false) {
      elements[i].checked = true;
      cbProtein_onChange(elements[i]);
    }
  }
}

function cmdDeselectAll_onClick(sender) {
  const elements = document.querySelectorAll("input[type='checkbox']");
  for (let i = 0; i < elements.length; i += 1) {
    if (elements[i].checked === true) {
      elements[i].checked = false;
      cbProtein_onChange(elements[i]);
    }
  }
}

function cbProtein_onChange(sender) {
  const protein = sender.id;
  const proteinPoints = pointsByProtein[protein];
  if (sender.checked) {
    plot.points.append(proteinPoints);
  } else {
    plot.points.remove(proteinPoints);
  }
}

function cbXAxis_onChange(sender) {
  const columnIndex = COLUMN_NAMES.indexOf(sender.options[sender.selectedIndex].innerText);
  plot.setActiveColumn(0, columnIndex);
}

function cbYAxis_onChange(sender) {
  const columnIndex = COLUMN_NAMES.indexOf(sender.options[sender.selectedIndex].innerText);
  plot.setActiveColumn(1, columnIndex);
}

function plot_onMouseDown(event) {
  switch (event.button) {
    // On left mouse button: Enable point and lasso selection
    case 0: event.pointSelection = true; event.lassoSelection = true; break;

    // On middle mouse button: Initiate view dragging
    case 1: event.viewDragging = true; break;

    // On right mouse button: Reset zoom
    case 2: plot.zoomFit2D(); break;
  }
}

function plot_onMouseOverDatapoint(dataset, index) {
  if (index === -1) {
    plot.highlightedPoints.clear();
  } else {
    plot.highlightedPoints.set(index);
    document.getElementById('imgCell').src = dataset.imageFilenames[index];

    const nc = dataset.numColumns;
    const xAxisColumn = plot.getActiveColumn(0);
    const yAxisColumn = plot.getActiveColumn(1);
    document.getElementById('pCellDesc').innerText = `Cell Name: {0}
Tagged Protein: {1}
{2}: {3}
{4}: {5}`.format(
        dataset.names[index],
        dataset.data[(index * nc) + 0],
        COLUMN_NAMES[xAxisColumn],
        dataset.data[(index * nc) + xAxisColumn],
        COLUMN_NAMES[yAxisColumn],
        dataset.data[(index * nc) + yAxisColumn],
      );
  }
}

function plot_onMouseOverAxisLabel(dataVector, labelRect) {
  const tooltip = document.getElementsByClassName('tooltip')[0];
  if (dataVector) {
    tooltip.innerHTML = dataVector.hint;

    const plotRect = document.getElementById('divPlot').getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.style.top = `${(plotRect.top + labelRect.t) - (tooltipRect.bottom - tooltipRect.top) - 20}px`;
    tooltip.style.left = `${(plotRect.left + ((labelRect.l + labelRect.r) / 2)) - ((tooltipRect.right - tooltipRect.left) * 0.1)}px`;
    tooltip.style.visibility = 'visible';
    tooltip.style.transition = '';
    tooltip.style.opacity = 1;
  } else {
    // tooltip.style.visibility = 'hidden';
    tooltip.style.transition = 'opacity 1s';
    tooltip.style.opacity = 0;
  }
}

function plot_onSelectionChanged(dataset, selection) {
  if (selection.length !== 0) {
    plot.referencePoints.append(selection);
    plot.showImages(selection, 'lowDensity');
  }
}

function plot_onLassoSelection(dataset, selection, mouseRect) {
  plot.zoomRect(mouseRect);
}

