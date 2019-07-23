"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

var _config = _interopRequireDefault(require("./../config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var templateDir = _config["default"].platforms.css.output.template;

var template = _fs["default"].readFileSync(__dirname + '/../templates/' + templateDir + '/var.hbars').toString();

function templates() {
  return _handlebars["default"].registerPartial('vars', template);
}

var _default = templates();

exports["default"] = _default;