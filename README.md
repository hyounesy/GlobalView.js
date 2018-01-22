# global-view
WebGL based scatterplot visualization of large, high dimensional datasets. This is an npm compatible port of the [original GlobalView.js](https://github.com/RcSepp/GlobalView.js)

## Why another JavaScript plotting library?
There are a plethora of plotting libraries available. Many of them are free to use. Most of them provide more options and chart types than GlobalView.js. But GlobalView.js is different, __it is _fast_!__

### How fast?
Try it for yourself and see how fast your browser can draw a million points [here](http://homepage.univie.ac.at/a0929188/GlobalView/example4.html).
A modern desktop computer will report something like this:
* Initialization: 250 milliseconds
* Random dataset generation: 500 milliseconds
* Render time: 10 milliseconds

10 milliseconds means 100 frames per second, meaning that this plot renders in realtime. If you don't believe it, try scrolling with the mouse wheel or panning the view by either holding down the middle mouse button or CTRL + left mouse button.

### Why is it so fast?
GlobalView.js uses WebGL to render points with the GPU. It keeps the full dataset in video RAM as one continuous block of memory to avoid costly copies between host RAM and video RAM and it is optimized to keep communication between JavaScript and OpenGL to a minimum.
