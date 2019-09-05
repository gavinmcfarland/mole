"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _demo = _interopRequireDefault(require("./demo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Output =
/*#__PURE__*/
function () {
  function Output() {
    _classCallCheck(this, Output);
  }

  _createClass(Output, [{
    key: "data",
    value: function data() {
      this.data = _demo["default"].value; // return config.value
    }
  }]);

  return Output;
}();

var output = new Output();
var _default = output;
exports["default"] = _default;
module.exports = exports.default;