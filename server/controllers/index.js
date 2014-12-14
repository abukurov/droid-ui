'use strict';

var jade = require('jade');
var util = require('util');
var path = require('path');
var fs = require('fs');

function getBasePath (name) {
  return path.resolve(util.format('./widgets/%s', name));
}

module.exports.index = function (req, res) {
  res.render('index');
};

module.exports.templates = function (req, res) {
  var basePath = getBasePath(req.params.name);
  var pathToTemplate = util.format('%s/template.jade', basePath);

  jade.renderFile(pathToTemplate, function (err, html) {
    if (err) {
      return res.status(404).end();
    }

    res.send(html);
  });
};

module.exports.config = function (req, res) {
  var basePath = getBasePath(req.params.name);
  var pathToConfig = util.format('%s/config.json', basePath);

  if (fs.existsSync(pathToConfig)) {
    res.send({
      type: req.params.name,
      config: JSON.parse(fs.readFileSync(pathToConfig, { encoding: 'utf8' }))
    });
    return;
  }

  res.status(404).end();
};

module.exports.configs = function (req, res) {
  //TODO: implement this method
};
