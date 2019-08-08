"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _theme = _interopRequireDefault(require("./theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dataModel = new _theme["default"]().model;
var _default = dataModel;
exports["default"] = _default;
module.exports = exports.default;