"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _defaultConfig = _interopRequireDefault(require("./default-config.js"));

var _plugins = _interopRequireDefault(require("./plugins.js"));

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = _defaultConfig["default"].theme;

function output(template, data) {
  return _handlebars["default"].compile(template)(data);
} // Loop through object of plugins and for each one take the ouput of their function and store in string


var data = "";

_lodash["default"].mapKeys(_plugins["default"], function (value, key) {
  data += _plugins["default"][key]({
    config: _defaultConfig["default"],
    output: output
  }) + '\n';
}); // Write output of string to file


_fs["default"].writeFile('./test/test.css', data, function (err) {
  if (err) console.log(err);
  console.log('Successfully Written to File.');
});