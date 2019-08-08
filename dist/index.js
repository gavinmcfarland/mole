"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = _interopRequireWildcard(require("./lib/mole"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var env = _nunjucks["default"].configure();

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(name, callback) {
    _classCallCheck(this, Plugin);

    this.name = name;
    if (callback(_mole["default"].model, _mole["default"].theme)) this.string = callback(_mole["default"].model, _mole["default"].theme);
    if (this.render()) this.rendered = this.render();
    this.model = _mole["default"].model;
  }

  _createClass(Plugin, [{
    key: "render",
    value: function render() {
      if (this.string) {
        return env.renderString(this.string, _mole["default"].model);
      }
    }
  }]);

  return Plugin;
}(); // console.log(
// 	new Mole.Plugin('plugin-name', () => {
// 		return model => {
// 			model.color.red = 'value'
// 		}
// 	})
// )
// console.log(
// 	// new Mole.Model('plugin-name', () => {
// 	// 	return model => {
// 	// 		model.color.red = 'value'
// 	// 	}
// 	// })
// 	new Mole.Model('model-name', model => {
// 		return (model.color.red = 'value')
// 	})
// )


_mole["default"].add(new _mole.Mole.Model('model-name', function (model) {
  return model.color.red = 'value';
}));

console.log(_mole["default"].models[0]); // mole.setPlugin(
// 	new Plugin('modelTest', function(model) {
// 		model.color.red = 'FF0000'
// 	})
// )
// mole.setPlugin(
// 	new Plugin('templateTest', function() {
// 		return "I'm {{color.red}}"
// 	})
// )

console.log(_mole["default"]);
var _default = _mole["default"];
exports["default"] = _default;
module.exports = exports.default;