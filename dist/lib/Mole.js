"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Config = _interopRequireDefault(require("./Config"));

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_Config["default"].result = _Config["default"].setConfig('/src/stub/config.js');
console.log(_Theme["default"]);

var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);
  }

  _createClass(Mole, [{
    key: "config",
    value: function config(value) {
      _Config["default"].result = _Config["default"].setConfig(value);
    }
  }, {
    key: "theme",
    value: function theme(value) {
      _Theme["default"].result = _Theme["default"].setTheme(value);
    }
  }]);

  return Mole;
}();

var mole = new Mole();
mole.theme({
  number: 0
});
console.log(_Theme["default"]); // console.log(mole)

var _default = mole;
exports["default"] = _default;
module.exports = exports.default;