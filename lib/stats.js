"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mean = mean;
exports.range = range;
function mean() {
  for (var _len = arguments.length, numbers = Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }

  return numbers.reduce(function (accum, next) {
    return accum + next;
  }) / numbers.length;
}

function range() {
  var largest = Math.max.apply(Math, arguments);
  var smallest = Math.min.apply(Math, arguments);
  return largest - smallest;
}