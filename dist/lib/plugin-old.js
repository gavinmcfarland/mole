"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = require("./mole");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log(_mole.Mole);

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(name, callback) {
    _classCallCheck(this, Plugin);

    this.name = name;
    if (callback(mole.model, mole.theme)) this.string = callback(mole.model, mole.theme);
    if (this.render()) this.rendered = this.render();
    this.model = mole.model;
  }

  _createClass(Plugin, [{
    key: "render",
    value: function render() {
      if (this.string) {
        return env.renderString(this.string, mole.model);
      }
    }
  }]);

  return Plugin;
}();

exports["default"] = Plugin;
module.exports = exports.default;