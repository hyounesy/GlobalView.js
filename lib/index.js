'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stats = require('./stats');

Object.defineProperty(exports, 'mean', {
  enumerable: true,
  get: function get() {
    return _stats.mean;
  }
});
Object.defineProperty(exports, 'range', {
  enumerable: true,
  get: function get() {
    return _stats.range;
  }
});

var _globalView = require('./globalView');

Object.defineProperty(exports, 'initCanvas', {
  enumerable: true,
  get: function get() {
    return _globalView.initCanvas;
  }
});
Object.defineProperty(exports, 'GlobalView', {
  enumerable: true,
  get: function get() {
    return _globalView.GlobalView;
  }
});