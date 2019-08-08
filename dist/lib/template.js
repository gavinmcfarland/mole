"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dataModel = _interopRequireDefault(require("./data-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function Template(name, pluginFunction) {
  _classCallCheck(this, Template);

  this.name = name;
  this.template = pluginFunction();
};

exports["default"] = Template;
module.exports = exports.default;