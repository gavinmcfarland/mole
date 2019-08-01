"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var _defaultConfig = _interopRequireDefault(require("./default-config.js"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Import the theme which it's path is specified in the config
var theme = require(__dirname + '/../' + _defaultConfig["default"].theme)["default"]; // Create a clone of the theme object which can be modified by the user


var model = (0, _lodash["default"])(theme);

var Model = function Model(name, callback) {
  _classCallCheck(this, Model);

  this.name = name;
  this.string = callback(model, theme);
};

exports.Model = Model;