"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _processConfig = _interopRequireDefault(require("./lib/process-config.js"));

var _plugins = _interopRequireDefault(require("./plugins.js"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _properties = _interopRequireDefault(require("./lib/properties.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = _processConfig["default"].theme; // Takes an array like list of plugins and outputs a string

function processPlugins(plugins) {
  var str = '';

  function output(string, data) {
    if (arguments.length === 1) {
      str += string + '\n';
    } else if (arguments.length >= 2) {
      str += _handlebars["default"].compile(string)(data) + '\n';
    }
  }

  _lodash["default"].mapKeys(plugins, function (value, key) {
    plugins[key]({
      config: _processConfig["default"],
      output: output,
      property: _properties["default"]
    });
  });

  return str;
}

var content = processPlugins(_plugins["default"]); // Write output of string to file

_fs["default"].writeFile('./test/test.css', content, function (err) {
  if (err) console.log(err);
  console.log('Successfully Written to File.');
});