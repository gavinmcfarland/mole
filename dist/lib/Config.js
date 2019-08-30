"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Config =
/*#__PURE__*/
function () {
  function Config() {
    _classCallCheck(this, Config);

    return this;
  }

  _createClass(Config, [{
    key: "set",
    value: function set(value) {
      var result = {}; // Record the root of where the file is stored

      result.root = process.cwd() + value.match(/(.*)[\/\\]/)[1] + '/' || ''; // Record the absolute path to the file

      result.path = process.cwd() + value; // Get the input value for the config

      var input = {}; // Check if value is a path to a file or an object

      if (typeof value === 'string') {
        input = require(result.path);
      }

      if (_typeof(value) === 'object') {
        input = value;
      } // Assign the properties of the input to the object we created


      result = Object.assign(result, input) // For model, template and output we must put them into arrays
      ;
      ['model', 'template', 'output'].forEach(function (current) {
        if (result[current]) result[current] = putValuesIntoArray(result[current]);
      }); // Then we normalise the outputs

      result = normaliseOutputs(result); // If a theme is specified in the config input then we set the theme

      if (result.theme) {
        _Theme["default"].set(result.theme, result);
      } // We assign the new properties to the Config object


      Object.assign(this, result);
    }
  }]);

  return Config;
}();

function normaliseOutputs(config) {
  config.output.map(function (output) {
    if (typeof output === 'undefined') {
      throw new Error('No outputs specified in config');
    } // Check for name


    var name;

    if (typeof output.file === 'undefined') {
      name = Object.keys(output)[0];
    } else {
      name = null;
    } // Check for model


    var model;

    if (output.model) {
      model = output.model;
    } else if (config.model) {
      model = config.model;
    } else {
      model = null;
    } // Check for template


    var template;

    if (output.template) {
      template = output.template;
    } else if (config.template) {
      template = config.template;
    } else {
      template = null;
    } // Check for directory


    var dir;

    if (output.dir) {
      if (config.dir) {
        dir = '.' + config.root + config.dir + output.dir;
      } else {
        dir = '.' + config.root + output.dir;
      }
    } else if (config.dir) {
      dir = '.' + config.root + config.dir;
    } else {
      dir = '.' + config.root + '';
    } // Check for file


    var file;

    if (typeof output.file === 'undefined') {
      file = output[name].file;
    } else {
      file = output.file;
    }

    return Object.assign({}, {
      name: name,
      model: model,
      template: template,
      dir: dir,
      file: file
    });
  });
  return config;
}

function putValuesIntoArray(value) {
  return Array.isArray(value) ? value : [value];
}

var config = new Config();
config.set('/src/stub/config.js');
var _default = config;
exports["default"] = _default;
module.exports = exports.default;