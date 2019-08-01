"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.model = exports.theme = void 0;

var _defaultConfig = _interopRequireDefault(require("./default-config.js"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import the theme which it's path is specified in the config
var theme = require(__dirname + '/../' + _defaultConfig["default"].theme)["default"]; // Create a clone of the theme object which can be modified by the user


exports.theme = theme;
var model = (0, _lodash["default"])(theme);
exports.model = model;