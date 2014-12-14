'use strict';

var transferDataKey = 'data-transfer';
var angular = require('angular');

module.exports = angular.module('drag-and-drop', [])
  .directive('listItemDnd', ['$parse', '$timeout', 'listDndDragHelper',
    function ($parse, $timeout, listDndDragHelper) {
      return function (scope, element, attr) {
        var hideOnMove = element.attr('list-item-dnd-hide');
        element.attr('draggable', 'true');

        element.on('dragstart', function (event) {
          event = event.originalEvent || event;

          var json = scope.$eval(attr.listItemDnd);
          event.dataTransfer.setData(transferDataKey, angular.toJson(json));
          event.dataTransfer.effectAllowed = 'move';

          if (hideOnMove) {
            $timeout(function () {
              this.hidden = true;
            }.bind(this), 0);
          }
          event.stopPropagation();
        });

        element.on('dragend', function (event) {
          event = event.originalEvent || event;

          scope.$apply(function () {
            if (listDndDragHelper.isDropped) {
              return $parse(attr.listItemDndMoved)(scope, {event: event});
            }
          }.bind(this));

          this.hidden = false;
          event.stopPropagation();
        });
      };
    }])

  .directive('listDnd', ['$timeout', 'listDndDragHelper',
    function ($timeout, listDndDragHelper) {
      return function (scope, element, attr) {
        var placeholder = angular.element('<li class="widget-placeholder"></li>');
        var placeholderNode = placeholder[0];
        var listNode = element[0];

        element.on('dragover', function (event) {
          event = event.originalEvent || event;

          listDndDragHelper.isDropped = true;

          if (placeholderNode.parentNode !== listNode) {
            element.append(placeholder);
          }

          var listItemNode = event.target;
          while (listItemNode.parentNode !== listNode && listItemNode.parentNode) {
            listItemNode = listItemNode.parentNode;
          }

          if (listItemNode.parentNode === listNode && listItemNode) {
            listNode.insertBefore(placeholderNode, listItemNode);
          } else {
            listNode.appendChild(placeholderNode);
          }

          element.addClass('drag-over');
          event.preventDefault();
          event.stopPropagation();
          return false;
        });

        element.on('drop', function (event) {
          event = event.originalEvent || event;

          var data = event.dataTransfer.getData(transferDataKey);
          var transferredObject = JSON.parse(data);

          var targetArray = scope.$eval(attr.listDnd);
          scope.$apply(function () {
            targetArray.splice(getPlaceholderIndex(), 0, transferredObject);
          });

          event.preventDefault();
          event.stopPropagation();

          placeholder.remove();
          return false;
        });

        element.on('dragleave', function (event) {
          event = event.originalEvent || event;

          listDndDragHelper.isDropped = false;
          element.removeClass('drag-over');

          $timeout(function () {
            if (!element.hasClass('drag-over')) {
              placeholder.remove();
            }
          }, 250);

          event.preventDefault();
          event.stopPropagation();
        });

        function getPlaceholderIndex() {
          return Array.prototype.indexOf.call(listNode.children, placeholderNode);
        }

      };
    }])

  .factory('listDndDragHelper', function () {
    return {};
  });