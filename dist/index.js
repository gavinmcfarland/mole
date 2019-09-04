"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireDefault(require("./lib/env"));

var _Mole = _interopRequireDefault(require("./lib/Mole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (_env["default"] === 'test') {
  _Mole["default"].build();
}

var _default = _Mole["default"];
exports["default"] = _default;
module.exports = exports.default;