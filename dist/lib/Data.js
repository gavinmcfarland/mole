"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Theme = _interopRequireDefault(require("./Theme"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Data =
/*#__PURE__*/
function () {
  function Data() {
    _classCallCheck(this, Data);
  }

  _createClass(Data, [{
    key: "update",
    value: function update() {
      Object.assign(this, this.clone());
    }
  }, {
    key: "clone",
    value: function clone(theme) {
      Object.assign(this, (0, _lodash["default"])(theme));
      return (0, _lodash["default"])(theme);
    }
  }]);

  return Data;
}();

var data = new Data();
var _default = data;
exports["default"] = _default;
module.exports = exports.default;