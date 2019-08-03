"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = _interopRequireDefault(require("./lib/mole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mole["default"].write();

console.log(_mole["default"]);
var _default = _mole["default"];
exports["default"] = _default;
module.exports = exports.default;