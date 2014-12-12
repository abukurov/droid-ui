'use strict';

var express = require('express');
var server = express();
var bodyParser = require('body-parser');

server.use(express.static(__dirname + '/public'));
server.set('views', './server/views');
server.set('view engine', 'jade');

server.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
server.use(bodyParser.json());

var router = require('./server/components/router');
server.use('/', router);

module.exports = server;
