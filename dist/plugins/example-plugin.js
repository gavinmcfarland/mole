"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(_ref) {
  var theme = _ref.theme,
      output = _ref.output;
  output('what', 'some data', 'test/another/location/index.css');
  output();
}