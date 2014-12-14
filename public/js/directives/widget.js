'use strict';

var angular = require('angular');

module.exports = angular.module('widgets', [])
  .directive('widget', function () {
    return {
      restrict: 'A',
      scope: {
        ngModel: '=model'
      },
      templateUrl: function (element, attrs) {
        return '/templates/' + attrs.type;
      }
    }
  })
  .directive('dynamicWidget', function ($compile) {
    return {
      restrict: 'A',
      replace: false,
      terminal: true,
      priority: 1000,
      link:function(scope, element, attrs){
        element.attr('widget', '');
        element.attr('type', scope.$eval(attrs.dynamicWidget));

        element.removeAttr('dynamic-widget');
        element.removeAttr("data-dynamic-widget");

        $compile(element)(scope);
      }
    };
  });