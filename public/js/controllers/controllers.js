'use strict';

var angular = require('angular');
var _ = require('lodash');

module.exports = angular.module('controllers', [])
  .controller('mockup', ['$scope', '$http', '$document', function ($scope, $http, $document) {
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
    $scope.deviceColor = 'silver';
    $scope.landscape = false;

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
    };

    $document.bind('keydown', function onKeyDown($event) {

      if ($scope.selectedWidget && $event.which === 46) {
        var index = $scope.widgets.indexOf($scope.selectedWidget.model);

        $scope.$apply(function () {
          $scope.widgets.splice(index, 1);
          $scope.selectedWidget = null;
        });
      }

    });

  }]);
