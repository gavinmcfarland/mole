"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cwd = process.cwd();

var config = require(cwd + '/mole.config');

var Config = function Config() {
  _classCallCheck(this, Config);

  return normaliseConfig(config);
};

function normaliseConfig(config) {
  /*
  1. Normalise the config:
  	1. Put outputs into an array
  	2. Put models and templates into arrays
  	3. Add names to outputs
  	4. Add templates to outputs
  */
  ;
  ['model', 'template', 'output'].forEach(function (current) {
    config[current] = putValuesInArray(config[current]);
  });
  return config;
}

function putValuesInArray(value) {
  return Array.isArray(value) ? value : [value];
}

console.log(new Config());
var _default = Config;
exports["default"] = _default;
module.exports = exports.default;