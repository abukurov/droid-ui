'use strict';

var angular = require('angular');

module.exports = angular.module('controllers', [])
  .controller('mockup', ['$scope', function ($scope) {
      $scope.name = 'Igor';
      $scope.widgets = [{
        type: 'type1',
        value: '1'
      }, {
        type: 'type2',
        value: '2'
      }, {
        type: 'type3',
        value: '3'
      }];

      $scope.onWidgetMoved = function (index) {
        $scope.widgets.splice(index, 1)
      };
  }]);
