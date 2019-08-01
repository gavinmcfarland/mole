"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registeredModels = void 0;

var _modelClass = require("./model-class.js");

var model = {
  prop: 'hi'
};
var chars = new _modelClass.Model('chars', function () {
  return model.chicken = 'yes';
});
var tokens = new _modelClass.Model('tokens', function () {
  return 'modellllll2';
});
var registeredModels = [chars, tokens];
exports.registeredModels = registeredModels;
console.log(model);