"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registeredModels = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _modelClass = require("./model-class.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chars = new _modelClass.Model('chars', function (model, theme) {
  return model.color.red = '#FF0000';
});
var tokens = new _modelClass.Model('tokens', function (model) {
  console.log(model);
  return 'modellllll2';
});
var registeredModels = [chars, tokens];
exports.registeredModels = registeredModels;