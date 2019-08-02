"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _theme = _interopRequireDefault(require("./theme"));

var _getOutputs2 = _interopRequireDefault(require("./get-outputs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    this.theme = new _theme["default"]().parse();
    this.model = new _theme["default"]().model;
    this.plugins = {};
    this.Template = Template;
    this.Model = Model;
    this.outputs = this.getOutputs();
    this.files = null;
  }

  _createClass(Mole, [{
    key: "getOutputs",
    value: function getOutputs() {
      return (0, _getOutputs2["default"])();
    }
  }, {
    key: "model",
    value: function model() {
      return this.model;
    }
  }]);

  return Mole;
}();

var Template =
/*#__PURE__*/
function () {
  function Template(name, callback) {
    _classCallCheck(this, Template);

    this.name = name;
    this.string = callback(mole.model, mole.theme);
    this.result = this.render();
  }

  _createClass(Template, [{
    key: "render",
    value: function render() {
      if (this.string) {
        return this.string;
      }
    }
  }]);

  return Template;
}();

var Model = function Model(name, callback) {
  _classCallCheck(this, Model);

  this.name = name; // Use this to get new modified version of model from plugin
  // TODO: find a way to update original mole.model class with new model from plugin

  this.value = Object.assign(Object.create({}, Object.getPrototypeOf(callback(mole.model))), mole.model);
};

var mole = new Mole();
var _default = mole;
exports["default"] = _default;
module.exports = exports.default;