"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model =
/*#__PURE__*/
function () {
  function Model(name, callback) {
    _classCallCheck(this, Model);

    this.name = name;
    this.string = callback();
    this.result = this.render();
  }

  _createClass(Model, [{
    key: "render",
    value: function render() {
      if (this.string) {
        return this.string;
      }
    }
  }]);

  return Model;
}();

exports.Model = Model;