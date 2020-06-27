"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Data = void 0;

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Data = /*#__PURE__*/function () {
  function Data() {
    _classCallCheck(this, Data);
  }

  _createClass(Data, [{
    key: "clone",
    value: function clone(theme) {
      Object.assign(this, (0, _lodash["default"])(theme));
    }
  }, {
    key: "update",
    value: function update(data) {
      Object.assign(this, data);
    }
  }]);

  return Data;
}();

exports.Data = Data;
var data = new Data();
var _default = data;
exports["default"] = _default;