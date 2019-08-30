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

_Config["default"].set('/src/stub/config.js');

var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);
  }

  _createClass(Mole, [{
    key: "config",
    value: function config(value) {
      _Config["default"].set(value);
    }
  }, {
    key: "theme",
    value: function theme(value) {
      _Theme["default"].set(value);
    }
  }]);

  return Mole;
}();

var mole = new Mole();
mole.theme({
  number: 0
});
console.log(_Config["default"]);
console.log(_Theme["default"]); // console.log(mole)

var _default = mole;
exports["default"] = _default;
module.exports = exports.default;