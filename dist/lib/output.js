"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cwd = process.cwd();

var config = require(cwd + '/mole.config'); // Check for array if not, create array


if (typeof config.output !== 'undefined') {
  if (!Array.isArray(config.output)) {
    config.output = [config.output];
  }
}

var Output = function Output(output, i) {
  _classCallCheck(this, Output);

  if (output.file !== 'undefined') {
    this.name = Object.keys(config.output[i])[0];
  }

  var model = output.model ? output.model : config.model;
  var template = output.template ? output.template : config.template;
  var dir;

  if (output.dir) {
    if (config.dir) {
      dir = config.dir + output.dir;
    } else {
      dir = output.dir;
    }
  } else if (config.dir) {
    dir = config.dir;
  } else {
    dir = '';
  }

  var path = dir + output.file;
  this.model = model;
  this.template = template;
  this.path = path;
};

exports["default"] = Output;
module.exports = exports.default;