"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _createDataMap = _interopRequireDefault(require("../util/create-data-map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(_ref) {
  var theme = _ref.theme,
      output = _ref.output,
      property = _ref.property;
  property('padding');
  var data = (0, _createDataMap["default"])(theme.color.theme, ['classes', 'vars', 'values']);
  output(data);
}