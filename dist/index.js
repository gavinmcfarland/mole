"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generateContents = _interopRequireDefault(require("./lib/generate-contents"));

var _writeFiles = _interopRequireDefault(require("./lib/write-files"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _writeFiles["default"])(_generateContents["default"].files); // console.log(mole)
// For some reason when included

var _default = _generateContents["default"];
exports["default"] = _default;
module.exports = exports.default;