"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _voca = _interopRequireDefault(require("voca"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(config) {
  var str = ".ct {";

  _lodash["default"].each(config.theme.color, function (value, key) {
    key = _voca["default"].kebabCase(key);
    str += "\n\t--".concat(key, ": ").concat(value, ";");
  });

  str += "\n}";
  str += "\n.ct {";

  _lodash["default"].each(config.theme.color, function (value, key) {
    key = _voca["default"].kebabCase(key);
    str += "\n\t--".concat(key, ": ").concat(value, ";");
  });

  str += "\n}";
  return str;
}