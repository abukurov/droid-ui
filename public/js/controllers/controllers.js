'use strict';

var angular = require('angular');
var _ = require('lodash');

module.exports = angular.module('controllers', [])
  .controller('mockup', ['$scope', '$http', function ($scope, $http) {
    $http.get('/configs')
      .success(function (widgets) {
          $scope.allWidgets = _.map(widgets, function (widget) {
            return _.extend(
              _.pick(widget, 'type'),
              _.mapValues(widget.config, _.property("defaultValue"))
            );
          });
      });

    $scope.widgets = [];
    $scope.onWidgetMoved = function (index) {
      $scope.widgets.splice(index, 1);
    };

    $scope.onWidgetSelect = function (index) {
      var widget = $scope.widgets[index];

      $http.get('/configs/' + widget.type)
        .success(function (data) {
          $scope.selectedWidget = {
            config: data.config,
            model: widget
          };
        });
    }
  }]);
