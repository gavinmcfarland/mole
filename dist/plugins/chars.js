"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = require("../lib/mole.js");

var _default = new _mole.Model('chars', function (model) {
  model.color.red = '#FF0000';
}); // console.log(mole)


exports["default"] = _default;