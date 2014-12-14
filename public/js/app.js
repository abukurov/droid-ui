'use strict';

var _ = require('lodash');
var angular = require('angular');

var requirements = [];

requirements.push(require('./controllers/controllers'));
requirements.push(require('./directives/drang-and-drop'));

angular.module('droid-ui', _.map(requirements, _.property('name')));
