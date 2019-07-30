"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = new mole.Plugin({
  theme: theme,
  data: data
}, function () {
  var data = {// do something
  };
  output(['../templates/css/function.njk', data, '/build/css/'], ['../templates/css/function.njk', data, '/build/ios/'], ['../templates/css/function.njk', data, '/build/android/']);
});

exports["default"] = _default;