"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Config = _interopRequireDefault(require("./Config"));

var _Theme = _interopRequireDefault(require("./Theme"));

var _Peripherals = _interopRequireDefault(require("./Peripherals"));

var _Model = _interopRequireDefault(require("./Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import Template from './Template'
var outputs = _Config["default"].output; // console.log(data)

var peripherals = new _Peripherals["default"]();

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
  }, {
    key: "create",
    value: function create() {
      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'model') {
        // console.log(theme)
        peripherals.model.push(new _Model["default"](arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], _Theme["default"], _Theme["default"])); // data.update(new Model(args[1], args[2]).data)
      }

      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'template') {
        peripherals.template.push(new Template(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]));
      } // outputs.map(output => {
      // 	console.log(output)
      // 	return new Output(output, peripherals, config)
      // })

    }
  }]);

  return Mole;
}();

var mole = new Mole();

_Theme["default"].set({
  number: 0
}); // mole.theme({ number: 0 })
// console.log(config)


mole.create('model', 'redModel', function (_ref) {
  var theme = _ref.theme,
      data = _ref.data;
  // console.log(theme)
  console.log(data);
  return data;
}); // console.log(data)
// console.log(peripherals)
// console.log(mole)

var _default = mole;
exports["default"] = _default;
module.exports = exports.default;