"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.model = exports.theme = void 0;

var _moleConfig = _interopRequireDefault(require("../../mole.config.js"));

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _jsonnet = _interopRequireDefault(require("@unboundedsystems/jsonnet"));

var _glob = _interopRequireDefault(require("glob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// // Import the theme which it's path is specified in the config
// const theme = require(__dirname + '/../' + config.theme).default
var themePath;
var theme;
exports.theme = theme;

var files = _glob["default"].sync(__dirname + '/../../' + _moleConfig["default"].theme + '**/*');

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var file = _step.value;
    var jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim;
    var jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim;

    if (jsRegex.test(file)) {
      themePath = file;
      exports.theme = theme = require(file);
    } else if (jsonnetRegex.test(file)) {
      themePath = file;

      var getFile = _fs["default"].readFileSync(themePath).toString();

      var jsonnetVm = new _jsonnet["default"].Jsonnet();
      exports.theme = theme = jsonnetVm.eval(getFile);
      jsonnetVm.destroy();
    }
  } // Create a clone of the theme object which can be modified by the user

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

var model = (0, _lodash["default"])(theme);
exports.model = model;
console.log(theme);