"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _jsonnet = _interopRequireDefault(require("@unboundedsystems/jsonnet"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _glob = _interopRequireDefault(require("glob"));

var _is = _interopRequireDefault(require("../util/is"));

var _Config = _interopRequireDefault(require("./Config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Theme data used by templates with outputs
 * ```js
 * // theme/index.js
 * export default {
 * 	font: {
 * 		size: [ 16, 19, 22, 26, 30, 35 ]
 * 	}
 * }
 * ```
 * @memberof Mole
 * @return {Object} Returns an object which is used by {@link Mole.Data}
 */
var Theme =
/*#__PURE__*/
function () {
  function Theme(configuration) {
    _classCallCheck(this, Theme);

    _Config["default"] = (new Config(configuration), function () {
      throw new Error('"' + "config" + '" is read-only.');
    }());
    this.parsed = this.parse();
  }
  /**
   * Keeps an original copy of the theme data in case it needs to be referenced by the user
   */


  _createClass(Theme, [{
    key: "clone",
    value: function clone() {
      /*
      1. Clone parse theme for use by models and templates */
      return (0, _lodash["default"])(this.parsed);
    }
    /**
     * Parses the given theme data so it's usable by the rest of the app
     */

  }, {
    key: "parse",
    value: function parse() {
      // console.log(config)

      /*
      1. Find location of theme files
      2. Determine what type of file they are
      3. Convert to js object or json */
      var theme; // If theme is specified

      if (_Config["default"].theme) {
        var path = getThemePath(_Config["default"]);
        var jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim;
        var jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim;

        if (jsRegex.test(path)) {
          theme = require(file);
        } else if (jsonnetRegex.test(path)) {
          var getFile = _fs["default"].readFileSync(path).toString();

          var jsonnetVm = new _jsonnet["default"].Jsonnet();
          theme = jsonnetVm.eval(getFile);
          jsonnetVm.destroy();
        } else {
          console.error(new Error('No theme provided'));
          theme = {};
        }
      } // Else let the user create it using models
      else {
          theme = {};
        }

      return theme;
    }
  }]);

  return Theme;
}();

function getThemePath(config) {
  var path = '';
  var files;

  if (_is["default"].what(config.theme) === 'dir') {
    files = _glob["default"].sync(config.path + config.theme + '**/*');
  } else if (_is["default"].what(config.theme) === 'file') {
    files = _glob["default"].sync(config.path + config.theme);
  }

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

  return path;
}

var _default = Theme;
exports["default"] = _default;
module.exports = exports.default;