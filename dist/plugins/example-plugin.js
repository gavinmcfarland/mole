"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(_ref) {
  var theme = _ref.theme,
      output = _ref.output;
  var data = {
    classes: [{
      value: 'hello',
      vars: [{
        value: 'var1'
      }]
    }, {
      value: 'hello2'
    }]
  };
  output(data);
}