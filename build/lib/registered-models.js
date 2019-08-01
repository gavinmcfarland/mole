"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registeredModels = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _modelClass = require("./model-class.js");

var _defaultConfig = _interopRequireDefault(require("./default-config.js"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import the theme which it's path is specified in the config
var theme = require(__dirname + '/../' + _defaultConfig["default"].theme)["default"]; // Create a clone of the theme object which can be modified by the user


var model = (0, _lodash["default"])(theme); // const model = {
// 	prop: 'hi'
// }

var chars = new _modelClass.Model('chars', function () {
  return model.color.red = '#FF0000';
});
var tokens = new _modelClass.Model('tokens', function () {
  return 'modellllll2';
});
var registeredModels = [chars, tokens];
exports.registeredModels = registeredModels;
console.log(model);