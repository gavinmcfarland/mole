"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generateContents = _interopRequireDefault(require("./lib/generate-contents"));

var _outputs = _interopRequireDefault(require("./lib/outputs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_generateContents["default"].write();

console.log(_generateContents["default"]);
var _default = _generateContents["default"];
exports["default"] = _default;
module.exports = exports.default;