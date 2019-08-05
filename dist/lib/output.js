"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = _interopRequireDefault(require("../../../mole.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Check for array if not, create array
if (typeof _mole["default"].output !== 'undefined') {
  if (!Array.isArray(_mole["default"].output)) {
    _mole["default"].output = [_mole["default"].output];
  }
}

var Output = function Output(output) {
  _classCallCheck(this, Output);

  if (output.file === 'undefined') {
    this.name = Object.keys(_mole["default"].output[i])[0];
  }

  var model = output.model ? output.model : _mole["default"].model;
  var template = output.template ? output.template : _mole["default"].template;
  var dir;

  if (output.dir) {
    if (_mole["default"].dir) {
      dir = _mole["default"].dir + output.dir;
    } else {
      dir = output.dir;
    }
  } else if (_mole["default"].dir) {
    dir = _mole["default"].dir;
  } else {
    dir = '';
  }

  var path = dir + output.file;
  this.model = model;
  this.template = template;
  this.path = path;
};

exports["default"] = Output;
module.exports = exports.default;