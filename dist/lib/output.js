"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = output;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Takes a template, data and converts using Handlebars which then writes to a file
// Make data optional?
// Make template = string?
function output(string, data) {
  var str = '';

  if (arguments.length === 1) {
    str += string + '\n';
  } else if (arguments.length >= 2) {
    str += _handlebars["default"].compile(string)(data) + '\n';
  }

  return str;
}