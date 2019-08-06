"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = _interopRequireDefault(require("./lib/mole"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
}(); // mole.setPlugin(
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