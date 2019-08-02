"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _glob = _interopRequireDefault(require("glob"));

var _jsonnet = _interopRequireDefault(require("@unboundedsystems/jsonnet"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _mole = _interopRequireDefault(require("../../../mole.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Theme =
/*#__PURE__*/
function () {
  function Theme() {
    _classCallCheck(this, Theme);

    var path = '';

    var files = _glob["default"].sync(__dirname + '/../../../' + _mole["default"].theme + '**/*');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _file = _step.value;
        var jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim;
        var jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim;

        if (jsRegex.test(_file)) {
          path = _file;
        } else if (jsonnetRegex.test(_file)) {
          path = _file;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.path = path;
    this.model = this.clone();
  }

  _createClass(Theme, [{
    key: "parse",
    value: function parse() {
      var path = this.path;
      var theme;
      var jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim;
      var jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim;

      if (jsRegex.test(path)) {
        theme = require(file);
      }

      if (jsonnetRegex.test(path)) {
        var getFile = _fs["default"].readFileSync(path).toString();

        var jsonnetVm = new _jsonnet["default"].Jsonnet();
        theme = jsonnetVm.eval(getFile);
        jsonnetVm.destroy();
      }

      return theme;
    }
  }, {
    key: "clone",
    value: function clone() {
      return (0, _lodash["default"])(this.parse());
    }
  }]);

  return Theme;
}();

exports["default"] = Theme;
module.exports = exports.default;