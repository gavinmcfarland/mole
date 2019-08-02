"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = require("../lib/template");

var _default = new _template.Template('templateTest', function () {
  return "I'm {{color.red}}";
});

exports["default"] = _default;
module.exports = exports.default;