const globalView = require('../dist/global-view.js');
const domready = require('domready');

domready(function () {
  const preResults = document.getElementById('preResults');
  const measureTime = function (phase, iterations) {
    const tEnd = performance.now();
    const time = (tEnd - tStart) / iterations;
    if (time >= 1e3) {
      preResults.innerText += `${phase}: ${time * 1e-3} seconds\n`;
    } else if (time >= 1e0) {
      preResults.innerText += `${phase}: ${time * 1e0} milliseconds\n`;
    } else if (time >= 1e-3) {
      preResults.innerText += `${phase}: ${time * 1e3} microseconds\n`;
    } else {
      preResults.innerText += `${phase}: ${time * 1e6} nanoseconds\n`;
    }
    tStart = performance.now();
  };
  let tStart = performance.now();

  const plot = new globalView.GlobalView(document.getElementById('divGlobalView'), {
    pointSize: 1,
    pointOpacity: 1,
    enableTransparency: false,
    pointShape: 'Rectangle',
  });
  measureTime('Initialization', 1);

  new globalView.RandomDataset(1e6, 2, function (dataset) {
    plot.load(dataset, 0, 1, 1, 1);
  });
  measureTime('Random dataset generation', 1);

  let frames = 0;
  for (frames = 0; performance.now() - tStart < 1000; frames += 1) {
    plot.renderOffscreenBuffer();
  }
  measureTime('Render time', frames);
});
