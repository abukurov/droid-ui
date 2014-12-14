'use strict';

var _ = require('lodash');
var angular = require('angular');

var requirements = [];

requirements.push(require('./controllers/controllers'));
requirements.push(require('./directives/drang-and-drop'));
requirements.push(require('./directives/widget'));
requirements.push(require('./filters/range'));

angular.module('droid-ui', _.map(requirements, _.property('name')));
