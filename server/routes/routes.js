'use strict';

module.exports = function (controllers) {

  this.get('/', controllers.index.index);

  this.get('/templates/:name', controllers.index.templates);

  this.get('/configs/:name', controllers.index.config);
  this.get('/configs', controllers.index.configs);

};
