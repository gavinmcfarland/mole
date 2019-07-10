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
function output(template, data) {
  var content = _handlebars["default"].compile(template)(data);

  _fs["default"].writeFile('./test/test.css', content, function (err) {
    if (err) console.log(err);
    console.log('Successfully Written to File.');
  });
}