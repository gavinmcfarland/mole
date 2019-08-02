"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "theme", {
  enumerable: true,
  get: function get() {
    return _parseTheme.theme;
  }
});
exports.model = void 0;

var _parseTheme = require("./parse-theme");

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create a clone of the theme object which can be modified by the user
var model = (0, _lodash["default"])(_parseTheme.theme); // console.log(theme)

exports.model = model;