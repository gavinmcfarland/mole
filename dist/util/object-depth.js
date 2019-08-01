"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = objectDepth;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function objectDepth(obj) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var property in obj) {
    i++;

    if (_typeof(obj[property]) === 'object') {
      return objectDepth(obj[property], i);
    } else {// return i
    }

    return i;
  }

  return i;
}