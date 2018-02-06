const globalView = require('../dist/global-view.js');
const domready = require('domready');

// Global variables
// var gl;
let plot,
  dataset;

let cbDataset,
  cbColumnX,
  cbColumnY,
  cbColumnC,
  cbColumnS;

domready(function () {
  cbDataset = document.getElementById('cbDataset');
  cbColumnX = document.getElementById('cbColumnX');
  cbColumnY = document.getElementById('cbColumnY');
  cbColumnC = document.getElementById('cbColumnC');
  cbColumnS = document.getElementById('cbColumnS');

  const DATASETS = [
    {name: '10 random points', create: () => new globalView.RandomDataset(10, 3, dataset_onLoad)},
    {name: '100 random points', create: () => new globalView.RandomDataset(100, 3, dataset_onLoad)},
    {name: '1.000 random points', create: () => new globalView.RandomDataset(1000, 3, dataset_onLoad)},
    {name: '10.000 random points', create: () => new globalView.RandomDataset(10000, 3, dataset_onLoad)},
    {name: '100.000 random points', create: () => new globalView.RandomDataset(100000, 3, dataset_onLoad)},
    {name: '1.000.000 random points', create: () => new globalView.RandomDataset(1000000, 3, dataset_onLoad)},
    {name: '10.000.000 random points', create: () => new globalView.RandomDataset(10000000, 3, dataset_onLoad)},
    {name: 'iris', url: 'datasets/iris.data', create: () => new globalView.CsvDataset('datasets/iris.data', {columnLabels: ['Sepal Length [cm]', 'Sepal Width [cm]', 'Petal Length [cm]', 'Petal Width [cm]', 'Class']}, dataset_onLoad)},
    {name: 'allencell', url: 'datasets/AICS_Cell-feature-analysis_v1.5.csv', create: () => new globalView.CsvDataset('datasets/AICS_Cell-feature-analysis_v1.5.csv', {hasHeader: true, nameColumn: 1, imageFilenames: function (data) {
      return `datasets/AICS_Cell-feature-analysis_v1.5_images/${data[1]}.png`;
    }}, dataset_onLoad)},
    // {name: "allencell x2", url: "datasets/AICS_Cell-feature-analysis_v1.5_x2.csv", create: () => new CsvDataset("datasets/AICS_Cell-feature-analysis_v1.5_x2.csv", {hasHeader: true, nameColumn: 1, imageFilenames: function(data) { return "datasets/AICS_Cell-feature-analysis_v1.5_images/" + data[1] + ".png"; }}, dataset_onLoad)},
    // {name: "allencell x10", url: "datasets/AICS_Cell-feature-analysis_v1.5_x10.csv", create: () => new CsvDataset("datasets/AICS_Cell-feature-analysis_v1.5_x10.csv", {hasHeader: true, nameColumn: 1, imageFilenames: function(data) { return "datasets/AICS_Cell-feature-analysis_v1.5_images/" + data[1] + ".png"; }}, dataset_onLoad)},
    // {name: "allencell x100", url: "datasets/AICS_Cell-feature-analysis_v1.5_x100.csv", create: () => new CsvDataset("datasets/AICS_Cell-feature-analysis_v1.5_x100.csv", {hasHeader: true, nameColumn: 1, imageFilenames: function(data) { return "datasets/AICS_Cell-feature-analysis_v1.5_images/" + data[1] + ".png"; }}, dataset_onLoad)},
  ];

  const divGlobalView = document.getElementById('divGlobalView');
  plot = new globalView.GlobalView(divGlobalView, {
    // showXAxisHistogram: true,
    // showYAxisHistogram: true,
    // showColormapHistogram: true,
    // pointColor: "white"//"#AAF"
    padding: [50, 80, 50, 50],
  });
  plot.onMouseDown = function (event) {
    switch (event.button) {
      // On left mouse button: Enable point selection and dragging events.
      //                       If control button is pressed, initiate view dragging, else, enable lasso selection
      case 0:
        event.pointSelection = true;
        event.pointDragging = true;
        if (ctrlPressed) {
          event.viewDragging = true;
        } else {
          event.polygonLassoSelection = true;
        }
        break;

      // On middle mouse button: Initiate view dragging
      case 1:
        event.viewDragging = true;
        break;

      // On right mouse button: Do nothing
      case 2:
        break;
    }
  };
  plot.onMouseOverAxisLabel = onMouseOverAxisLabel;
  plot.onMouseOverDatapoint = onMouseOverDatapoint;
  plot.onLassoSelection = plot.onSelectionChanged = onSelectionChanged;
  const canvas = divGlobalView.childNodes[0];
  canvas.ondragover = divGlobalView.ondragover = ondragover;
  canvas.ondragenter = divGlobalView.ondragenter = ondragenter;
  canvas.ondragleave = divGlobalView.ondragleave = ondragleave;
  canvas.ondrop = divGlobalView.ondrop = ondrop;
  plot.highlightedPoints = plot.createPointSet('yellow', 1);
  plot.selectedPoints = plot.createPointSet('red', 1);
  onResize();

  // Set defaults
  rNumThumbnails_onChange(document.getElementById('rNumThumbnails'));
  rDensityRatio_onChange(document.getElementById('rDensityRatio'));

  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  // Fill cbDataset
  DATASETS.forEach(function (dataset) {
    if (typeof dataset.url === 'undefined') {
      const option = document.createElement('option');
      option.text = dataset.name;
      option.createDataset = dataset.create;
      cbDataset.add(option);
      if (cbDataset.options.length === DATASETS.length) {
        // Load dataset
        const datasetIndex = globalView.readIntCookie('datasetIndex');
        if (datasetIndex !== null) {
          cbDataset.selectedIndex = datasetIndex;
        }
        cbDataset_onChange(); // Load even if cookie isn't set
      }
    } else {
      globalView.urlExists(dataset.url, function () {
        const option = document.createElement('option');
        option.text = dataset.name;
        option.createDataset = dataset.create;
        cbDataset.add(option);
        if (cbDataset.options.length === DATASETS.length) {
          // Load dataset
          const datasetIndex = globalView.readIntCookie('datasetIndex');
          if (datasetIndex !== null) {
            cbDataset.selectedIndex = datasetIndex;
          }
          cbDataset_onChange(); // Load even if cookie isn't set
        }
      });
    }
  });
});

addAllEventListeners();

function addAllEventListeners() {
  window.addEventListener('resize', onResize);

  document.getElementById('cbDataset').addEventListener('change', function () {
    cbDataset_onChange();
  });
  document.getElementById('cbColumnX').addEventListener('change', function () {
    cbColumnX_onChange();
  });
  document.getElementById('cbColumnY').addEventListener('change', function () {
    cbColumnY_onChange();
  });
  document.getElementById('cbColumnC').addEventListener('change', function () {
    cbColumnC_onChange();
  });
  document.getElementById('cbColumnS').addEventListener('change', function () {
    cbColumnS_onChange();
  });
  document.getElementById('cbRenderStyle').addEventListener('change', function () {
    cbRenderStyle_onChange(document.getElementById('cbRenderStyle'));
  });
  document.getElementById('cbTransparency').addEventListener('change', function () {
    cbTransparency_onChange(document.getElementById('cbTransparency'));
  });
  document.getElementById('cbPointShape').addEventListener('change', function () {
    cbPointShape_onChange(document.getElementById('cbPointShape'));
  });
  document.getElementById('rPointSize').addEventListener('input', function () {
    rPointSize_onChange(document.getElementById('rPointSize'));
  });
  document.getElementById('rPointOpacity').addEventListener('input', function () {
    rPointOpacity_onChange(document.getElementById('rPointOpacity'));
  });
  document.getElementById('cbShowDensity').addEventListener('change', function () {
    cbShowDensity_onChange(document.getElementById('cbShowDensity'));
  });
  document.getElementById('cbShowClusters').addEventListener('change', function () {
    cbShowClusters_onChange(document.getElementById('cbShowClusters'));
  });
  document.getElementById('cbShowHistograms').addEventListener('change', function () {
    cbShowHistograms_onChange(document.getElementById('cbShowHistograms'));
  });
  document.getElementById('rVariance').addEventListener('input', function () {
    rVariance_onChange(document.getElementById('rVariance'));
  });
  document.getElementById('rNumBins').addEventListener('input', function () {
    rNumBins_onChange(document.getElementById('rNumBins'));
  });
  document.getElementById('cmdRunBenchmark').addEventListener('click', function () {
    cmdRunBenchmark_onClick(document.getElementById('cmdRunBenchmark'));
  });
  // document.getElementById("cbThumbnailPositioning") // ???
  document.getElementById('rNumThumbnails').addEventListener('input', function () {
    rNumThumbnails_onChange(document.getElementById('rNumThumbnails'));
  });
  document.getElementById('rDensityRatio').addEventListener('input', function () {
    rDensityRatio_onChange(document.getElementById('rDensityRatio'));
  });
  document.getElementById('cmdShowData2D').addEventListener('click', function () {
    cmdShowData2D_onClick(document.getElementById('cmdShowData2D'));
  });
  document.getElementById('cbLabelThumbnails').addEventListener('change', function () {
    cbLabelThumbnails_onChange(document.getElementById('cbLabelThumbnails'));
  });
}

function onResize() {
  const w = window;
  const d = document;
  const e = d.documentElement;
  const b = document.body;
  const x = w.innerWidth || e.clientWidth || b.clientWidth;
  const y = w.innerHeight || e.clientHeight || b.clientHeight;
  // plot.resize(x - 32 - 200, y - 32);
  document.getElementById('divGlobalView').style.width = `${x - 32 - 200}px`;
  document.getElementById('divGlobalView').style.height = `${y - 32}px`;
}

function cbDataset_onChange() {
  globalView.createCookie('datasetIndex', cbDataset.selectedIndex);
  if (cbDataset.selectedIndex >= 0 && cbDataset.options[cbDataset.selectedIndex].createDataset) {
    cbDataset.options[cbDataset.selectedIndex].createDataset();
  }
}

const inflated = false;
function dataset_onLoad(_dataset) {
  dataset = _dataset;
  if (dataset.columns.length < 2) {
    alert(`Invalid dataset\nDataset has ${dataset.columns.length} column(s) (at least 2 required).`);
    return;
  }

  // Update active-column comboboxes
  for(let i = cbColumnX.options.length - 1; i >= 0; i -= 1) {
    cbColumnX.remove(i);
  }
  for(let i = cbColumnY.options.length - 1; i >= 0; i -= 1) {
    cbColumnY.remove(i);
  }
  for(let i = cbColumnC.options.length - 1; i >= 0; i -= 1) {
    cbColumnC.remove(i);
  }
  for(let i = cbColumnS.options.length - 1; i >= 0; i -= 1) {
    cbColumnS.remove(i);
  }
  for(let i = 0; i < dataset.numColumns; i += 1) {
    let option = document.createElement('option');
    option.text = dataset.columns[i].label;
    cbColumnX.add(option);
    option = document.createElement('option');
    option.text = dataset.columns[i].label;
    cbColumnY.add(option);
    option = document.createElement('option');
    option.text = dataset.columns[i].label;
    cbColumnC.add(option);
    option = document.createElement('option');
    option.text = dataset.columns[i].label;
    cbColumnS.add(option);
  }
  if (dataset.numColumns > 3) {
    dataset.dataVectors.push(new globalView.DataVector(dataset, '0.0'/* "0.5 * c1 + 0.5 * c3" */));// "i"));
    let option = document.createElement('option');
    option.text = 'formula';
    cbColumnX.add(option);
    option = document.createElement('option');
    option.text = 'formula';
    cbColumnY.add(option);
    option = document.createElement('option');
    option.text = 'formula';
    cbColumnC.add(option);
    option = document.createElement('option');
    option.text = 'formula';
    cbColumnS.add(option);
  }
  const activeColumnX = globalView.readIntCookie('activeColumnX');
  const activeColumnY = globalView.readIntCookie('activeColumnY');
  const activeColumnC = globalView.readIntCookie('activeColumnC');
  const activeColumnS = globalView.readIntCookie('activeColumnS');
  cbColumnX.selectedIndex = Math.max(0, Math.min(dataset.numColumns - 1, activeColumnX !== null && activeColumnX < dataset.numColumns ? activeColumnX : 0));
  cbColumnY.selectedIndex = Math.max(0, Math.min(dataset.numColumns - 1, activeColumnY !== null && activeColumnY < dataset.numColumns ? activeColumnY : 1));
  cbColumnC.selectedIndex = Math.max(0, Math.min(dataset.numColumns - 1, activeColumnC !== null && activeColumnC < dataset.numColumns ? activeColumnC : 2));
  cbColumnS.selectedIndex = Math.max(0, Math.min(dataset.numColumns - 1, activeColumnS !== null && activeColumnS < dataset.numColumns ? activeColumnS : 3));

  // Show dataset
  plot.load(dataset, cbColumnX.selectedIndex, cbColumnY.selectedIndex, cbColumnC.selectedIndex, cbColumnS.selectedIndex);
}
function cbColumnX_onChange() {
  globalView.createCookie('activeColumnX', cbColumnX.selectedIndex);
  plot.setActiveColumn(0, cbColumnX.selectedIndex);
}
function cbColumnY_onChange() {
  globalView.createCookie('activeColumnY', cbColumnY.selectedIndex);
  plot.setActiveColumn(1, cbColumnY.selectedIndex);
}
function cbColumnC_onChange() {
  globalView.createCookie('activeColumnC', cbColumnC.selectedIndex);
  plot.setActiveColumn(2, cbColumnC.selectedIndex);
}
function cbColumnS_onChange() {
  globalView.createCookie('activeColumnS', cbColumnS.selectedIndex);
  plot.setActiveColumn(3, cbColumnS.selectedIndex);
}

function cbRenderStyle_onChange(sender) {
  plot.setOption('enableContinuousRendering', sender.selectedIndex === 1);
}
function cbTransparency_onChange(sender) {
  plot.setOption('enableTransparency', sender.selectedIndex === 0);
}
function cbPointShape_onChange(sender) {
  plot.setOption('pointShape', sender.value);
}
function rPointOpacity_onChange(sender) {
  pPointOpacity.innerText = `Point opacity: ${sender.value}`;
  plot.setOption('pointOpacity', Number.parseFloat(sender.value));
}
function rPointSize_onChange(sender) {
  pPointSize.innerText = `Point size: ${sender.value}`;
  plot.setOption('pointSize', Number.parseFloat(sender.value));
}

const densityMapOptions = new globalView.DensityMapOptions();
// densityMapOptions.logScale = false;
function cbShowDensity_onChange(sender) {
  if (sender.checked) {
    requestVariance(densityMapOptions.gaussScale, true);
  }
  plot.setOption('showPointDensity', sender.checked);
}
function cbShowClusters_onChange(sender) {
  // plot.setOption("pointClusterThreshold", 0.01);
  plot.setOption('showPointClusters', sender.checked);
}
function cbShowHistograms_onChange(sender) {
  const padding = plot.getOption('padding');
  padding[2] += (sender.checked ? 64 : 0) - (plot.getOption('showXAxisHistogram') ? 64 : 0);
  padding[3] += (sender.checked ? 64 : 0) - (plot.getOption('showYAxisHistogram') ? 64 : 0);
  padding[1] += (sender.checked ? 64 : 0) - (plot.getOption('showColormapHistogram') ? 64 : 0);

  plot.setOptions({
    showXAxisHistogram: sender.checked,
    showYAxisHistogram: sender.checked,
    showColormapHistogram: sender.checked,
    padding: padding,
  });
}
function rVariance_onChange(sender) {
  const variance = Math.round(Math.pow(10, Number.parseFloat(sender.value)));
  pVariance.innerText = `Variance: ${variance}`;
  requestVariance(variance, true);
}
function rNumBins_onChange(sender) {
  const numBins = Number.parseInt(sender.value, 10);
  pNumBins.innerText = `# of histogram bins: ${numBins}`;
  plot.setOption('numHistogramBins', numBins);
}

function requestVariance(variance, fast) {
  if (fast) {
    densityMapOptions.shrinkToFit = false;
  } else {
    densityMapOptions.shrinkToFit = true;
  }

  densityMapOptions.gaussScale = variance;
  dataset.requestDensityMap(plot.getActiveColumn(0), plot.getActiveColumn(1), fast ? 64 : null, densityMapOptions, function (densityMap) {
    if (densityMapOptions.gaussScale === variance) {
      plot.invalidate();
      if (fast) {
        requestVariance(variance, densityMap.options.gaussScale !== variance);
      }
    }
  });
}

String.prototype.replaceAll = function (oldstr, newstr) {
  // Source: http://stackoverflow.com/a/1144788
  return this.split(oldstr).join(newstr);
};

/* function cmdRunBenchmark_onClick() {
  new CsvDataset("AICS_Cell-feature-analysis_v1.5.csv", {}, function(dataset) {
    var wgetstr = "";
    dataset.names.forEach(function(name) {
      var dir = name.split('_')[0];
      wgetstr += "wget http://cellviewer.allencell.org/aics/thumbnails/2017_03_08_Struct_First_Pass_Seg/" + dir + "/" + name + ".png\n";
    });

    var data = new Blob([wgetstr.replace(/\n/g, "\r\n")], {type: 'text/plain'});
    download("wget.sh", window.URL.createObjectURL(data));
  });
} */
function cmdRunBenchmark_onClick(sender) {
  new BenchmarkDialog();
}

let numThumbnails,
  densityRatio;
function rNumThumbnails_onChange(sender) {
  numThumbnails = 2 ** Number.parseInt(sender.value, 10);
  pNumThumbnails.innerText = `# of thumbnails: ${numThumbnails}`;
}
function rDensityRatio_onChange(sender) {
  densityRatio = Number.parseFloat(sender.value);
  pDensityRatio.innerText = 'Density ratio: {0}% outliers,  {1}% clusters'.format(100 - Math.round(densityRatio * 100), Math.round(densityRatio * 100));
}
function cmdShowData2D_onClick(sender) {
  plot.clearThumbnails();
  plot.getCharacteristicPoints(numThumbnails, densityRatio, function (characteristicPoints) {
    plot.selectedPoints.assign(characteristicPoints);
    plot.showImages(plot.selectedPoints, cbThumbnailPositioning.value);
  });
}
function cbLabelThumbnails_onChange(sender) {
  plot.setOption('labelThumbnails', sender.checked);
}

function onMouseOverAxisLabel(dataVector, labelRect) {
  const tooltip = document.getElementsByClassName('tooltip')[0];
  if (dataVector) {
    tooltip.innerText = `tooltip of ${dataVector.label}`;

    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.style.top = `${labelRect.t - (tooltipRect.bottom - tooltipRect.top) - 10}px`;
    tooltip.style.left = `${((labelRect.l + labelRect.r) / 2) - ((tooltipRect.right - tooltipRect.left) * 0.1)}px`;
    tooltip.style.visibility = 'visible';
    tooltip.style.transition = '';
    tooltip.style.opacity = 1;
  } else {
    // tooltip.style.visibility = 'hidden';
    tooltip.style.transition = 'opacity 1s';
    tooltip.style.opacity = 0;
  }
}

function onMouseOverDatapoint(dataset, index) {
  if (index === -1) {
    plot.highlightedPoints.clear();
    imgDataPoint.src = '';
    pDataPoint.innerText =  '';
  } else {
    plot.highlightedPoints.set(index);

    imgDataPoint.src = dataset.imageFilenames && dataset.imageFilenames[index] ? dataset.imageFilenames[index] : '';

    if (dataset.data) {
      const nc = dataset.numColumns;
      pDataPoint.innerText = dataset.dataVectors.map(dataVector =>
        `${dataVector.label}: ${dataVector.values ? dataVector.values[Math.floor(dataVector.getValue(index))] : dataVector.getValue(index)}`,
      ).join('\n');
    } else {
      pDataPoint.innerText = dataset.names ? dataset.names[index] : `datapoint ${index}`;
    }
  }
}
function onSelectionChanged(dataset, selection) {
  if (selection.length === 0) {
    if (!shiftPressed) {
      plot.selectedPoints.clear();
    }
  } else {
    if (shiftPressed) {
      plot.selectedPoints.append(selection);
    } else if (selection.length !== 1 || !plot.selectedPoints.contains(selection[0])) {
      plot.selectedPoints.assign(selection);
    }
  }
}

function ondragover(event) {
  event.preventDefault();
}
let dragOverCanvas = null;
function ondragenter(event) {
  console.log('ondragenter');
  if (!dragOverCanvas) {
    const padding = plot.getOption('padding');

    dragOverCanvas = document.createElement('canvas');
    dragOverCanvas.setAttribute('id', 'dragOverCanvas');
    dragOverCanvas.style.pointerEvents = 'none';
    dragOverCanvas.style.zIndex = 100000;
    dragOverCanvas.style.position = 'static';// "absolute";
    dragOverCanvas.style.width = dragOverCanvas.style.height = '100%';
    dragOverCanvas.style.backgroundColor = 'green';
    dragOverCanvas.style.opacity = 0.1;
    document.getElementById('divGlobalView').appendChild(dragOverCanvas);


    const rect = dragOverCanvas.getBoundingClientRect();
    dragOverCanvas.style.marginTop = `${-(rect.bottom - rect.top - padding[0])}px`;
    dragOverCanvas.style.marginLeft = `${padding[3]}px`;
    dragOverCanvas.style.width = `${rect.right - rect.left - padding[1] - padding[3]}px`;
    dragOverCanvas.style.height = `${rect.bottom - rect.top - padding[0] - padding[2]}px`;
  }
}
function ondragleave(event) {
  console.log('ondragleave');
  if (dragOverCanvas) {
    document.getElementById('divGlobalView').removeChild(dragOverCanvas);
    dragOverCanvas = null;
  }
}
function ondrop(event) {
  console.log('ondrop');
  ondragleave(event);
  event.preventDefault();
  event = event || window.event;
  const files = (event.files || event.dataTransfer.files);
  if(files) {
    /* fileDropIsCopy = fileDropIsCopy || event.ctrlKey || event.metaKey;
    var targetRect = event.target.getBoundingClientRect()
    var eventX = event.clientX - targetRect.left;
    var eventY = event.clientY - targetRect.top;
    var fileExt = files[0].name; */

    new CsvDataset(files[0], {autoDetect: true}, dataset_onLoad);
  }
}

let ctrlPressed = false;
let shiftPressed = false;
const CTRL = navigator.appVersion.indexOf('Mac') === -1 ? 17 : 224;
function handleKeyDown(event) {
  if(event.keyCode === CTRL) {
    ctrlPressed = true;
  } else if(event.keyCode === 16) {
    shiftPressed = true;
  }

  switch(event.keyCode) {
    case 46: // DELETE key
      plot.points.remove(plot.selectedPoints.get());
      plot.selectedPoints.clear();
      break;

    case 36: // HOME key
      plot.enableOffscreenRendering(1024, 1024);
      plot.renderOffscreenBuffer();
      globalView.download('globalView.png', plot.saveOffscreenBuffer());
      plot.disableOffscreenRendering();
  }
}
function handleKeyUp(event) {
  if(event.which === CTRL) {
    ctrlPressed = false;
  } else if(event.keyCode === 16) {
    shiftPressed = false;
  }
}
