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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _default(_ref) {
  var output = _ref.output,
      property = _ref.property,
      theme = _ref.theme;
  // // property('padding')
  var data = (0, _createDataMap["default"])(theme.color.theme, ['classes', 'vars', 'values']);

  function convertCase(object) {
    if (_typeof(object) === 'object') {
      _lodash["default"].each(object, function (value, key) {
        if (key === 'value') {
          object.value = _voca["default"].kebabCase(value);
        } else if (Array.isArray(value)) {
          _lodash["default"].each(value, function (item, index) {
            convertCase(item);
          });
        }
      });
    }

    return object;
  }

  convertCase(data);
  output(data);
}