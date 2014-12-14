'use strict';

var angular = require('angular');
var _ = require('lodash');

module.exports = angular.module('filter-range', [])
  .filter('range', function() {
    return function(input, total) {
      return _.range((+total) + 1);
    };
  });
