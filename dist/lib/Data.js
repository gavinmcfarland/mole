"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a clone of the `theme` data which can be manipulated and structured by `models`.
 * @memberof Mole
 */
var Data = function Data() {
  _classCallCheck(this, Data);

  return new _Theme["default"]().clone();
};

var _default = Data;
exports["default"] = _default;
module.exports = exports.default;