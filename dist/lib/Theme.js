"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _jsonnet = _interopRequireDefault(require("@unboundedsystems/jsonnet"));

var _glob = _interopRequireDefault(require("glob"));

var _is = _interopRequireDefault(require("../util/is"));

var _Data = _interopRequireWildcard(require("./Data"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
        // If theme not specified in config use value set by user
        if (!config.theme) {
          config.theme = value;
        }

        var path = getThemePath(config);

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

      console.log('theme ->', result);
      Object.assign(this, result);

      _Data.Data.update(this);
    }
  }]);

  return Theme;
}();

function getThemePath(config) {
  var path = '';
  var files; // If theme is specified as a dir

  if (_is["default"].what(config.theme) === 'dir') {
    files = _glob["default"].sync(config.root + config.theme + '**/*');
  } // If theme is specified as a file


  if (_is["default"].what(config.theme) === 'file') {
    console.log('theme path ->', config.root + config.theme);
    files = _glob["default"].sync(config.root + config.theme);
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
module.exports = exports.default;