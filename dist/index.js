"use strict";

var _generateContents = _interopRequireDefault(require("./lib/generate-contents"));

var _writeFiles = _interopRequireDefault(require("./lib/write-files"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _writeFiles["default"])(_generateContents["default"].files);
console.log(_generateContents["default"]);