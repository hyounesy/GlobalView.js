const globalView = require('../dist/global-view.js');
const $ = require('jquery');
const domready = require('domready');
const JSZip = require('jszip');
const FileSaver = require('file-saver');

const numTests = 5;

domready(() => {
  const newImages = [];

  const table = $('<table style="width:100%"></table>');
  const progress = $('<p></p>');
  $('#divMain').append(progress).append(table);

  function downloadAll() {
    const zip = new JSZip();
    newImages.forEach((img, index) => {
      const urlHeader = 'data:image/png;base64,';
      zip.file(`test${index}.png`, img.substring(urlHeader.length), { base64: true });
    });
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        FileSaver.saveAs(content, 'tests.zip');
      });
  }

  function testsDone() {
    progress.text('Done!');
    progress.append($('<button>Download</button>').click(() => { downloadAll(); }));
  }

  function runTest(i) {
    if (i >= numTests) {
      testsDone();
      return;
    }

    console.log(`Running test ${i}`);
    progress.text(`Running test ${i}`);

    const width = 400 + (i * 80);
    const height = 300 + (i * 60);

    const div1 = $('<div></div>')
      .css({
        width: `${width}px`,
        height: `${height}px`,
      })
      .append('<p>Current</p>');

    const div2 = $('<div></div>')
      .append('<p>Expected</p>');

    table.append($('<tr></tr>')
      .append($('<td></td>')
        .append(div1))
      .append($('<td></td>')
        .append(div2)));

    const plot1 = new globalView.GlobalView(div1[0], null);
    globalView.RandomDataset(1000, 3, ((dataset) => {
      setTimeout(() => {
        plot1.load(dataset, 0, 1, 2, 2);
        plot1.enableOffscreenRendering(width, height);
        plot1.renderOffscreenBuffer();
        const newImage = plot1.saveOffscreenBuffer();
        newImages.push(newImage);
        div2.append($('<img></img>').attr('src', newImage));
        plot1.disableOffscreenRendering();
        runTest(i + 1);
      }, 500);
    }));
  }
  runTest(0);
});
