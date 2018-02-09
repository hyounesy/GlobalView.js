const globalView = require('../dist/global-view.js');
const domready = require('domready');

let plot;
const taOptions = document.getElementById('taOptions');
const preStatus = document.getElementById('preStatus');


domready(function () {
  plot = new globalView.GlobalView(document.getElementById('divGlobalView'), {
    pointShape: 'Cross',
  });

  // eslint-disable-next-line no-new
  new globalView.RandomDataset(1000, 2, function (dataset) {
    plot.load(dataset, 0, 1, 1, 1);
  });

  plot.showData2D();

  taOptions.value = JSON.stringify(plot.getOptions(), null, 4);

  document.getElementById('taOptions').addEventListener('input', function () {
    tOptionsOnChange(document.getElementById('taOptions'));
  });
});

function tOptionsOnChange(/* sender */) {
  let options;

  try {
    options = JSON.parse(taOptions.value);
  } catch (exception) {
    preStatus.innerText = exception.message;
    return;
  }

  const err = plot.validateOptions(options);
  if (err === true) {
    plot.setOptions(options);
    preStatus.innerText = '';
  } else {
    preStatus.innerText = err;
  }
}
