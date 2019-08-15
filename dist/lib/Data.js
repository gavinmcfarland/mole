"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Creates a clone of the `theme` data which can be manipulated and structured by `models`.
 * @memberof Mole
 */
var Data =
/*#__PURE__*/
function () {
  function Data(data) {
    _classCallCheck(this, Data);

    this.result = new _Theme["default"]().clone();
  }

  _createClass(Data, [{
    key: "update",
    value: function update(data) {
      this.result = data;
    }
  }]);

  return Data;
}();

var data = new Data();
var _default = data;
exports["default"] = _default;
module.exports = exports.default;