"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = require("../lib/model");

var _default = new _model.Model('modelTest', function (model) {
  return model.color.red = '#FF0000';
}); // console.log(mole)


exports["default"] = _default;
module.exports = exports.default;