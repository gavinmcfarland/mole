"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registeredTemplates = void 0;

var _templateClass = require("./template-class.js");

var thing1 = new _templateClass.Template('thing1', function () {
  return 'oooooh1';
});
var thing2 = new _templateClass.Template('thing2', function () {
  return 'oooooh2';
});
var registeredTemplates = [thing1, thing2];
exports.registeredTemplates = registeredTemplates;