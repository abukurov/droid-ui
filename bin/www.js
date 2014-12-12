'use strict';

var server = require('../server');
var config = require('../config');

server.listen(config.get('port'), function () {
  console.log('server started at: ' + config.get('port'));
});
