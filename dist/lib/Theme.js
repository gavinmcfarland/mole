"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "data", {
  enumerable: true,
  get: function get() {
    return _Data["default"];
  }
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _jsonnet = _interopRequireDefault(require("@unboundedsystems/jsonnet"));

var _glob = _interopRequireDefault(require("glob"));

var _is = _interopRequireDefault(require("../util/is"));

var _Data = _interopRequireDefault(require("./Data"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RE_JS = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/im;
var RE_JSONNET = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/im;

var Theme =
/*#__PURE__*/
function () {
  function Theme() {
    _classCallCheck(this, Theme);

    return this;
  }

  _createClass(Theme, [{
    key: "set",
    value: function set(value, config) {
      // Parses the theme
      var result;

      if (_is["default"].what(value) === 'path' || _is["default"].what(value) === 'file' || _is["default"].what(value) === 'dir') {
        var path = getThemePath(config, value);

        if (RE_JS.test(path)) {
          result = require(file);
        }

        if (RE_JSONNET.test(path)) {
          var getFile = _fs["default"].readFileSync(path).toString();

          var jsonnetVm = new _jsonnet["default"].Jsonnet();
          result = jsonnetVm.eval(getFile);
          jsonnetVm.destroy();
        }
      } else if (_is["default"].what(value) === 'object') {
        result = value;
      } else {
        result = {};
      } // If theme already set then merge with new settings


      if (theme.result) {
        result = Object.assign(theme.result, result);
      }

      (0, _lodash["default"])(this, result);

      _Data["default"].clone(theme);
    }
  }]);

  return Theme;
}();

function getThemePath(config, value) {
  // console.log(config.theme)
  var path = '';
  var files; // If theme is specified as a dir

  if (_is["default"].what(value) === 'dir') {
    files = _glob["default"].sync(process.cwd() + '/' + value + '**/*');
  } // If theme is specified as a file


  if (_is["default"].what(value) === 'file') {
    files = _glob["default"].sync(process.cwd() + '/' + value);
  } // Check if file is one of supported extensions


  files.map(function (file) {
    if (RE_JS.test(file) || RE_JSONNET.test(file)) {
      path = file;
    }
  });
  return path;
}

var theme = new Theme();
var _default = theme;
exports["default"] = _default;