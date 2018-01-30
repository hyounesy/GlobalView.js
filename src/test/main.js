const $ = require('jquery');
const domready = require('domready');
const JSZip = require('jszip');
const FileSaver = require('file-saver');
const allTests = require('./allTests').default;
// const PNGImage = require('pngjs-image');
const pixelmatch = require('pixelmatch');
const base64js = require('base64-js');

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
        result = ctx.getImageData(0, 0, canvas.width, canvas.height)
      } catch (error) {
        console.error(error);
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
    console.error(error);
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

  const table = $('<table style="width:100%"></table>');
  const progress = $('<p></p>');
  table.append($('<tr></tr>')
    .append('$(<td>Interactive</td>)')
    .append('$(<td>Current</td>)')
    .append('$(<td>Expected</td>)')
    .append('$(<td>Diff</td>)'));
  $('#divMain').append(progress).append(table);

  function downloadAll() {
    const zip = new JSZip();
    const expected = zip.folder('expected');
    testResults.forEach((testInfo) => {
      if (testInfo.image) {
        expected.file(`${testInfo.name}.png`, urlToBase64(testInfo.image), { base64: true });
      }
    });
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        FileSaver.saveAs(content, 'tests.zip');
      });
  }

  function testsDone() {
    const failedTests = [];
    testResults.forEach((testInfo) => {
      if (!testInfo.success) {
        failedTests.push(testInfo.name);
      }
    });

    if (failedTests.length === 0) {
      progress.text('All Passed!');
    } else {
      progress.text(`${failedTests.length} tests failed: ${failedTests.join()}`);
    }
    progress.append($('<br><br>'));
    progress.append($('<button>Download Generated Images</button>').click(() => { downloadAll(); }));
  }

  function runTest(i) {
    if (i >= allTests.length) {
      setTimeout(() => { testsDone(); }, 2000); // wait two seconds for the results
      return;
    }

    const testInfo = {};
    testResults.push(testInfo);
    testInfo.name = allTests[i].name;
    const logText = `Running test (${i + 1} of ${allTests.length}): ${testInfo.name} ...`;
    console.log(logText);
    progress.text(logText);

    const imageWidth = 300;
    const imageHeight = 300;

    const divPlot = $('<div></div>');
    const divCurrent = $('<div></div>');
    const divExpected = $('<div></div>');
    const divDiff = $('<div></div>');

    table.append($(`<tr><td>${testInfo.name}</td></tr>`));
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
        testInfo.image = testImageUrl;

        divCurrent.append($('<img></img>').attr('src', testImageUrl));
        test.getPlot().disableOffscreenRendering();

        const expectedImageUrl = `tests/expected/${testInfo.name}.png`;
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
              testInfo.success = true;
              console.log(`[Ok] Output of ${testInfo.name} matches the expected output.`);
            } else {
              console.error(`[Fail] Output of ${testInfo.name} does not match the expected output.`);
            }
            const canvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = imageWidth;
            canvas.height = imageHeight;

            canvas.getContext('2d').putImageData(getImageDataFromBytes(diffData, imageWidth, imageHeight), 0, 0);
            divDiff.append(canvas);
          });
        });
      } catch (error) {
        console.error(error);
      }
      runTest(i + 1);
    });
  }
  runTest(0);
});
