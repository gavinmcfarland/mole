"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Template = void 0;

var _cloneModel = require("./clone-model.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Template =
/*#__PURE__*/
function () {
  function Template(name, callback) {
    _classCallCheck(this, Template);

    this.name = name;
    this.string = callback(_cloneModel.model, _cloneModel.theme);
    this.result = this.render();
  }

  _createClass(Template, [{
    key: "render",
    value: function render() {
      if (this.string) {
        return this.string;
      }
    }
  }]);

  return Template;
}();

exports.Template = Template;