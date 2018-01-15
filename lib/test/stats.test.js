'use strict';

var _chai = require('chai');

var _stats = require('../stats');

describe('stats', function () {
  describe('mean', function () {
    it('finds the average of a list of numbers', function () {
      (0, _chai.expect)((0, _stats.mean)(4, 5, 6)).to.equal(5);
    });
  });

  describe('range', function () {
    it('finds the range of a spread of numbers', function () {
      (0, _chai.expect)((0, _stats.range)(4, 5, 6)).to.equal(2);
    });
  });
});