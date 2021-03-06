import domready from 'domready'; // eslint-disable-line import/no-extraneous-dependencies
import { GlobalView, RandomDataset } from '../../dist/global-view';

domready(() => {
  let tStart;
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

  tStart = performance.now();
  const plot = new GlobalView(document.getElementById('divGlobalView'), {
    pointSize: 1,
    pointOpacity: 1,
    enableTransparency: false,
    pointShape: 'Rectangle',
  });
  measureTime('Initialization', 1);

  new RandomDataset(1e6, 2, ((dataset) => { // eslint-disable-line no-new
    plot.load(dataset, 0, 1, 1, 1);
  }));
  measureTime('Random dataset generation', 1);

  let frames = 0;
  for (frames = 0; performance.now() - tStart < 1000; frames += 1) {
    plot.renderOffscreenBuffer();
  }
  measureTime('Render time', frames);
});
