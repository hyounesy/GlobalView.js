# GlobalView.js
WebGL based scatterplot visualization of large, high dimensional datasets.

## Why another Javascript plotting library?
There are a plethora of plotting libraries available. Many of them are free to use. Most of them provide more options and chart types than GlobalView.js. But what makes GlobalView.js different is that __it is _fast_!__

### How fast?
Try it for yourself and see how fast your browser can draw a million points [here](http://homepage.univie.ac.at/a0929188/GlobalView/example4.html).

A modern desktop computer will report something like this:
* Initialization: 250 milliseconds
* Random dataset generation: 500 milliseconds
* Render time: 10 milliseconds

10 milliseconds means 100 frames per second, meaning that this plot renders in realtime. If you don't believe it, try scrolling with the mouse wheel or panning the view by either holding down the middle mouse button or CTRL + left mouse button.

### Why is it so fast?
GlobalView.js uses WebGL to render points with the GPU. It keeps the full dataset in video RAM as one continuous block of memory to avoid costly copies between host RAM and video RAM and it is optimized to keep communication between JavaScript and OpenGL to a minimum.


## Installation
* With npm: `npm install global-view`
* Manually: download [GlobalView](todo_link) and include the file `dist/global-view.js`.


If you are using webpack for your development, you need to modify the `module.exports` in your `webpack.config.js` as follows:

```javascript
module.exports = {

  // ... existing options
  
  node: {
    child_process: 'empty'
  }
}
```

### Building from Source
To build the library from source run the following:

```
git clone https://github.com/hyounesy/GlobalView.js.git
cd GlobalView.js
npm install
npm run build
```

## Example Usage

```javascript
// example.js
import { GlobalView, CsvDataset } from 'global-view';

const plot = new GlobalView(document.querySelector('#div1'), null);
new CsvDataset('datasets/iris.data', {}, ((dataset) => {
    plot.load(dataset, 0, 1, 4, 1);
}));
```

For more examples, refer to the [src/examples](src/examples).

You can also checkout the project and run all examples using webpack dev server:

```
npm run examples
```
Some examples require the full dataset and images to work. The dataset is not included in the github repository, but can be downloaded by running the `download_data.py` script:

```
cd src/examples/datasets
python download_data.py
```

## Testing
For now, we have decided to use snapshot testing in place of conventional unit testing. This is mostly due to the fact that most functions require  webgl context and canvas elements, and depend on WebGL Shaders. In addition there are several async functions managed with Parallel library (spawn). These make the functions difficult (if not currently impossible) to properly work on CLI. 
Thus, since the main purpose for the tests is to help with future development, we believe the snapshot tests are currently better suited for the purpose.

Each snapshot test compares the new plot output with the [expected output](src/test/plot.test/expected) that was captured on a previous successful run. To run the snapshot tests:

```
npm run test:snapshot
```


### Adding new tests
To add new tests, you need to:

1. Create a new Test class which extends from the [SnapshotTest](src/test/plot.test/snapshotTest.js) class. You may also use the provided [boiler plate](src/test/plot.test/testBoilerPlate.js) class.
1. Implement the run() function (and optionally the getPlotOptions()).
1. Include the new test in [all.js](src/test/plot.test/all.js)

Results may be slightly different on different browsers on different operating systems and that may cause the tests not to pass. Once you have verified that the differences are acceptable, click on the `[Download Generated Images]` button and copy the contents over the expected output directory ([src/test/plot.test/expected](src/test/plot.test/expected))

Note that due to the async nature of the test, sometimes sometests may fail if they are not finished in the expected time. If this happens too often, you may increase the default timeOutMS value (currently 500 milliseconds) in [SnapshotTest](src/test/plot.test/snapshotTest.js) class.

## Suggestions for future development
* Currently there are only two color palletes avaialble to be specified for `pointColor` option: `"exhue"` and `"rainbow"`. These should be extended to include ColorBrewer palettes.
* Currently the middle mouse button is used for panning the plot. This can be limitting when the user doesn't have a middle mouse key (Apple mouse or track pad). The left button is used to create lasso selections. Perhaps a better approach would be to use a key combination to specify lasso selection or panning.
* The use of Parallel library has been quite trouble some during the development, porting to npm, webpack support and minification. However the library is currently used only in two places to compute cluster map and the density map. It might be worth looking at alternative solutions that are more stable.


## License
GlobalView is licensed under the MIT license. See [license.js](src/license.js).

This project is an npm compatible port of the [original GlobalView.js](https://github.com/RcSepp/GlobalView.js) project.
