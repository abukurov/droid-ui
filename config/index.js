'use strict';

var env = process.env.NODE_ENV;
var nconf = require('nconf');

nconf.use('memory');

nconf.defaults({
  port: 8082
});

module.exports = nconf;
