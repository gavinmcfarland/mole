"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _voca = _interopRequireDefault(require("voca"));

var _fs = _interopRequireDefault(require("fs"));

var _createDataMap = _interopRequireDefault(require("../util/create-data-map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(_ref) {
  var output = _ref.output,
      property = _ref.property,
      theme = _ref.theme;
  // // property('padding')
  var data = (0, _createDataMap["default"])(theme.color.theme, ['classes', 'vars', 'values']);
  output(data);
}