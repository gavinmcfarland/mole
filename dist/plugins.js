"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _colorTheme = _interopRequireDefault(require("./plugins/color-theme.js"));

var _fontStyle = _interopRequireDefault(require("./plugins/font-style.js"));

var _testPlugin = _interopRequireDefault(require("./plugins/test-plugin.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  colorTheme: _colorTheme["default"],
  testPlugin: _testPlugin["default"]
};
exports["default"] = _default;