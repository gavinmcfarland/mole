"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var _mole = _interopRequireDefault(require("./mole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function Model(name, callback) {
  _classCallCheck(this, Model);

  this.name = name; // This updates mole.model with changes from plugin

  Object.assign(_mole["default"].model, Object.getPrototypeOf(callback(_mole["default"].model))); // console.log(mole.model)
};

exports.Model = Model;