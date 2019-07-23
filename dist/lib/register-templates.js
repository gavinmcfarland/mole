"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

var _config = _interopRequireDefault(require("./../config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// for (let [i, v] of config.platforms.entries()) {
// 	console.log(v)
// }
var templateDir = _config["default"].platforms[0].css.output.template;

var template1 = _fs["default"].readFileSync(__dirname + '/../templates/' + templateDir + '/var.hbars').toString();

var template2 = _fs["default"].readFileSync(__dirname + '/../templates/' + templateDir + '/value.hbars').toString();

function templates() {
  _handlebars["default"].registerPartial('vars', template1);

  _handlebars["default"].registerPartial('values', template2);

  return _handlebars["default"];
}

var _default = templates();

exports["default"] = _default;