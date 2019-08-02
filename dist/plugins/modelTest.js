"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = _interopRequireDefault(require("../lib/mole.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _mole["default"].Model('modelTest', function (model) {
  return model.color.red = '#FF0000';
}); // console.log(mole)


exports["default"] = _default;