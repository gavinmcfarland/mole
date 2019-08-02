"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = require("../lib/mole.js");

var _default = new _mole.Template('thing1', function () {
  return "I'm {{color.red}}";
});

exports["default"] = _default;