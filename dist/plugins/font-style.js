"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _voca = _interopRequireDefault(require("voca"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(config) {
  var str = "";

  _lodash["default"].each(config.theme.font.style, function (value, modifier) {
    str += ".font-".concat(modifier, " {\n");

    _lodash["default"].each(value, function (value, key) {
      key = _voca["default"].kebabCase(key);
      str += "\t".concat(key, ": ").concat(value, ";\n");
    });

    str += "}\n";
  });

  return str;
}