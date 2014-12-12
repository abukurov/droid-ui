'use strict';

var router = require('express').Router();
var requireAll = require('require-all');
var join = require('path').join;
var controllers = requireAll(join(__dirname, '../controllers'));

var draw = require('../routes/routes');

draw.call(router, controllers);

module.exports = router;
