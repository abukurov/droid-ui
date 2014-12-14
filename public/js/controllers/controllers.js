'use strict';

var angular = require('angular');

module.exports = angular.module('controllers', [])
  .controller('mockup', ['$scope', function ($scope) {
      $scope.name = 'Igor';
      $scope.widgets = [1, 2, 3, 4];

      $scope.onWidgetMoved = function (index) {
        $scope.widgets.splice(index, 1)
      };
  }]);
