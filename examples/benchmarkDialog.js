const globalView = require('../dist/global-view.js');

let plot = null;
export default function BenchmarkDialog(paramPlot) {
  plot = paramPlot;
  let cancel = false;
  const benchmarkDialog = $('#benchmarkDialog').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: false,
    resizable: false,
    buttons: [{
      text: 'Cancel',
      click() {
        cancel = true;
        benchmarkDialog.dialog('close');
      },
    }],
    open: startBenchmark,
    beforeClose() {
      cancel = true;
    },
  });

  const pbOverall = $('#pbOverall');
  const pbPass = $('#pbPass');
  const progressLabel = $('.progress-label');
  const tblResults = $('#tblResults');
  let tblResultsBody;
  pbOverall.progressbar({
    value: false,
    change() {
      progressLabel.text(`Progress: ${Math.floor(pbOverall.progressbar('value') * 100) / 100}%`);
    },
    complete() {
      progressLabel.text('Complete!');
      benchmarkDialog.dialog('option', 'buttons', [{
        text: 'Close',
        click() {
          cancel = true;
          benchmarkDialog.dialog('close');
        },
      }]);
      $('.ui-dialog button').last().trigger('focus');
    },
  });
  pbPass.progressbar({ value: false });

  function reportProgress(percentageOverall, percentagePass) {
    pbOverall.progressbar('value', 100 * percentageOverall);
    pbPass.progressbar('value', 100 * percentagePass);
    return !cancel;
  }
  function reportHeader(header) {
    tblResults.append(`<thead><tr><th>${header.join('</th><th>')}</th></tr></thead>`);
    tblResultsBody = tblResults.append('<tbody></tbody>');
  }
  function reportResult(row) {
    tblResultsBody.append(`<tr><td>${row.join('</td><td>')}</td></tr>`);
  }


  /* var benchmarkOptions = {
    enableTransparency: [true, false],
    pointShape: ['Rectangle'],
    N: [1e5, 1e6, 1e7]
  }; */
  const benchmarkOptions = {
    // pointSize: [1, 5, 10, 25, 50, 100],//[1, 10],//[1, 10, 100],
    // pointShape: ['Rectangle'],
    // N: [1000000]//linspace(100000, 200000, 1000000)
    // N: [1e1, 1e2, 1e3/*, 1e4, 1e5, 1e6*/]
    // N: Array.create(1000, i => 10000 * i)
    // N: Array.create(36, i => 1000 * Math.pow(10, Math.floor(i / 9)) * ((i % 9) + 1))
    N: Array.create(601, i => Math.floor(10 ** (3 + (i / 200)))),
  };

  const SECONDS_PER_BENCHMARK = 2;// 10;
  const SAVE_SCREENSHOTS = false;
  let zip;
  let csv;
  let numBenchmarks;
  let benchmarkCounter;
  let benchmarkOptionIndices;
  let currentOptions;
  let n;
  let time;
  let frames;
  let passStartTime;

  benchmarkDialog.dialog('open');

  function startBenchmark() {
    plot.pushOptions();
    // plot.pushDataset();
    plot.enableOffscreenRendering(1024, 1024);

    // Set default options
    const allElements = document.getElementsByTagName('*');
    Object.keys(allElements).forEach((i) => {
      if (allElements[i].className === 'option') {
        if (allElements[i].onchange) {
          allElements[i].onchange(allElements[i]);
        } else if (allElements[i].oninput) {
          allElements[i].oninput(allElements[i]);
        }
      }
    });

    numBenchmarks = 1;
    benchmarkCounter = 0;

    Object.keys(benchmarkOptions).forEach((option) => {
      numBenchmarks *= benchmarkOptions[option].length;
    });

    if (SAVE_SCREENSHOTS) {
      // JSZip is included from a cdn in the html
      zip = new JSZip(); // eslint-disable-line no-undef
    }

    const csvHeader = ['fps', 'options'];
    Object.keys(benchmarkOptions).forEach((option) => {
      csvHeader.push(`${option}`);
    });
    csv = [csvHeader];

    n = -1;
    benchmarkOptionIndices = {};
    Object.keys(benchmarkOptions).forEach((option) => {
      benchmarkOptionIndices[option] = 0;
    });

    reportHeader(csvHeader);

    if (reportProgress(0, 0)) {
      setTimeout(startBenchmarkPass, 0);
    } else {
      cancelBenchmark();
    }
  }

  function startBenchmarkPass() {
    currentOptions = {};
    Object.keys(benchmarkOptions).forEach((option) => {
      currentOptions[option] = benchmarkOptions[option][benchmarkOptionIndices[option]];
    });


    // <<<<<<<<<< START RUN BENCHMARK >>>>>>>>>>
    if (currentOptions.N !== n) {
      plot.load(new globalView.RandomDataset(n = currentOptions.N, 2), 0, 1, 1, 1);
    }

    // Set options
    plot.setOptions(currentOptions);

    time = 0.0;
    frames = 0;
    passStartTime = performance.now();

    if (reportProgress(0, 0)) {
      setTimeout(renderBenchmark, 0);
    } else {
      cancelBenchmark();
    }
  }

  function renderBenchmark() {
    const tStart = performance.now();
    plot.renderOffscreenBuffer();
    const tEnd = performance.now();

    time += (tEnd - tStart) / 1000.0;
    frames += 1;
    const passTime = (tEnd - passStartTime) / 1000.0;

    if (reportProgress(benchmarkCounter / numBenchmarks, passTime / SECONDS_PER_BENCHMARK)) {
      setTimeout(passTime < SECONDS_PER_BENCHMARK ? renderBenchmark : finishBenchmarkPass, 0);
    } else {
      cancelBenchmark();
    }
  }

  function finishBenchmarkPass() {
    time = (performance.now() - passStartTime) / 1000.0;
    const fps = frames / time;
    let name = JSON.stringify(currentOptions).replaceAll('"', "'");
    const csvRow = [fps, name];
    Object.keys(currentOptions).forEach((option) => {
      csvRow.push(currentOptions[option]);
    });
    csv.push(csvRow);

    if (SAVE_SCREENSHOTS) {
      let image = plot.saveOffscreenBuffer();
      image = image.substr(image.indexOf('base64,') + 'base64,'.length); // Convert base64-dataURL to base64
      name = name.replace('{', '').replace('}', '').replaceAll("'", '').replaceAll(',', ', ')
        .replaceAll(':', '-');
      zip.file(`${name}.png`, image, { base64: true });
    }

    // <<<<<<<<<< END RUN BENCHMARK >>>>>>>>>>

    const getKeyByIndex = function (map, index) {
      let idx = index;
      let key;
      for (key in map) { // eslint-disable-line guard-for-in, no-restricted-syntax
        idx -= 1;
        if (idx === -1) {
          return key;
        }
      }
      return null;
    };

    let o = 0;
    let option = getKeyByIndex(benchmarkOptionIndices, o);
    // eslint-disable-next-line no-cond-assign
    while (option !== null &&
      (benchmarkOptionIndices[option] += 1) === benchmarkOptions[option].length) {
      benchmarkOptionIndices[option] = 0;
      option = getKeyByIndex(benchmarkOptionIndices, (o += 1));
    }

    reportResult(csvRow);

    benchmarkCounter += 1;
    if (reportProgress(benchmarkCounter / numBenchmarks, 1) && option !== null) {
      setTimeout(startBenchmarkPass, 0);
    } else if (option !== null) {
      cancelBenchmark();
    } else {
      finishBenchmark();
    }
  }

  function cancelBenchmark() {
    // plot.disableOffscreenRendering();
    plot.popOptions();
    // plot.popDataset();
    window.cbDatasetOnChange(); // Reload dataset
    plot.disableOffscreenRendering();
    window.onResize();
  }
  function finishBenchmark() {
    cancelBenchmark();

    if (SAVE_SCREENSHOTS) {
      zip.file('benchmark.csv', $.csv.fromArrays(csv));

      zip.generateAsync({ type: 'base64' }).then((base64) => {
        globalView.download('benchmark.zip', `data:application/zip;base64,${base64}`);
      });
    } else {
      globalView.download('benchmark.csv', `data:text/csv;charset=utf-8,${encodeURIComponent($.csv.fromArrays(csv))}`);
    }
  }
}
