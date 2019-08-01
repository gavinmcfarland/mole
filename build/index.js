"use strict";

var _getOutputs = _interopRequireDefault(require("./lib/get-outputs.js"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _generateContents = _interopRequireDefault(require("./lib/generate-contents.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_generateContents["default"]);