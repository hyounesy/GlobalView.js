const globalView = require('../../../dist/global-view.js');
const $ = require('jquery');
const JSZip = require('jszip');
const FileSaver = require('file-saver');
const allTests = require('./all').default;
const pixelmatch = require('pixelmatch'); // eslint-disable-line import/no-extraneous-dependencies
const domready = require('domready'); // eslint-disable-line import/no-extraneous-dependencies

function urlToBase64(dataUrl) {
  // remove the png or jpg header
  return dataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
}

function getImageDataFromUrl(url, callback) {
  try {
    const canvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    const image = new Image();
    image.onload = function onload() {
      let result = null;
      try {
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
        result = ctx.getImageData(0, 0, canvas.width, canvas.height);
      } catch (error) {
        globalView.consoleError(error);
        result = null;
      }
      // Get raw image data
      // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
      // ... or get as Data URI
      // callback(canvas.toDataURL('image/png'));
      callback(result);
    };
    image.src = url;
  } catch (error) {
    globalView.consoleError(error);
    callback(null);
  }
}
/**
 * create an ImageData from a Uint8Array buffer
 * @param {Uint8Array} ubuf Uint8Array input buffer
 * @param {number} width image width
 * @param {number} height image height
 */
function getImageDataFromBytes(ubuf, width, height) {
  const imgData = new ImageData(width, height);
  for (let i = 0; i < ubuf.length; i += 4) {
    imgData.data[i] = ubuf[i]; // red
    imgData.data[i + 1] = ubuf[i + 1]; // green
    imgData.data[i + 2] = ubuf[i + 2]; // blue
    imgData.data[i + 3] = ubuf[i + 3]; // alpha
  }
  return imgData;
}

domready(() => {
  const testResults = [];
  // const failedTests = [];
  // const newImages = [];

  const table = $('<table border=1 frame=hsides rules=rows></table>');
  const progress = $('<p></p>');
  table.append($('<tr></tr>')
    .append('$(<td align="center"><b>Interactive</b></td>)')
    .append('$(<td align="center"><b>Current</b></td>)')
    .append('$(<td align="center"><b>Expected</b></td>)')
    .append('$(<td align="center"><b>Diff</b></td>)'));
  $('#divMain').append(progress).append(table);

  function downloadAll() {
    const zip = new JSZip();
    const expected = zip.folder('expected');
    testResults.forEach((testResult) => {
      if (testResult.image) {
        expected.file(`${testResult.name}.png`, urlToBase64(testResult.image), { base64: true });
      }
    });
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        FileSaver.saveAs(content, 'expected.zip');
      });
  }

  function testsDone() {
    const failedTests = [];
    testResults.forEach((testResult) => {
      if (!testResult.success) {
        failedTests.push(testResult.name);
      }
    });

    if (failedTests.length === 0) {
      progress.text('All Passed!');
    } else {
      progress.text(`${failedTests.length} tests failed: ${failedTests.join(', ')}`);
    }
    progress.append($('<br><br>'));
    progress.append($('<button>Download Generated Images</button>').click(() => {
      downloadAll();
    }));
  }

  function runTest(i) {
    if (i >= allTests.length) {
      progress.text('Waiting for results ...');
      setTimeout(() => {
        testsDone();
      }, 5000); // wait 5 seconds for the results
      return;
    }

    const testResult = {};
    testResults.push(testResult);
    testResult.name = allTests[i].name;
    const logText = `Running test (${i + 1} of ${allTests.length}): ${testResult.name} ...`;
    globalView.consoleLog(logText);
    progress.text(logText);

    const imageWidth = 300;
    const imageHeight = 300;

    const divPlot = $(`<div style="border: 0px; width: ${imageWidth}px; height: ${imageHeight}px;"></div>`);
    const divCurrent = $('<div></div>');
    const divExpected = $('<div></div>');
    const divDiff = $('<div></div>');

    table.append($(`<tr><td>${testResult.name}</td></tr>`));
    table.append($('<tr></tr>')
      .append($('<td nowrap></td>')
        .css({
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
        })
        .append(divPlot))
      .append($('<td nowrap></td>')
        .append(divCurrent))
      .append($('<td nowrap></td>')
        .append(divExpected))
      .append($('<td nowrap></td>')
        .append(divDiff)));

    const test = new allTests[i](divPlot[0], () => {
      try {
        test.getPlot().enableOffscreenRendering(imageWidth, imageHeight);
        test.getPlot().renderOffscreenBuffer();
        const testImageUrl = test.getPlot().saveOffscreenBuffer();
        test.getPlot().disableOffscreenRendering();
        testResult.image = testImageUrl;

        divCurrent.append($('<img></img>').attr('src', testImageUrl));
        test.getPlot().disableOffscreenRendering();

        const expectedImageUrl = `expected/${testResult.name}.png`;
        getImageDataFromUrl(expectedImageUrl, (expectedImageData) => {
          divExpected.append($('<img></img>').attr('src', expectedImageUrl));
          getImageDataFromUrl(testImageUrl, (testImageData) => {
            const diffData = new Uint8Array(imageWidth * imageHeight * 4);
            const errorPixels = pixelmatch(
              expectedImageData.data, testImageData.data, diffData,
              imageWidth, imageHeight, {
                threshold: 0.001,
              },
            );
            if (errorPixels === 0) {
              testResult.success = true;
              globalView.consoleLog(`[Ok] Output of ${testResult.name} matches the expected output.`);
            } else {
              globalView.consoleError(`[Fail] Output of ${testResult.name} does not match the expected output.`);
            }
            const canvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = imageWidth;
            canvas.height = imageHeight;

            canvas.getContext('2d').putImageData(getImageDataFromBytes(diffData, imageWidth, imageHeight), 0, 0);
            divDiff.append(canvas);
          });
        });
      } catch (error) {
        globalView.consoleError(error);
      }
      runTest(i + 1);
    });
  }
  runTest(0);
});
