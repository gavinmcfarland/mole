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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = {
  result: {}
};

theme.setTheme = function (value, config) {
  var jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim;
  var jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim;
  var result;

  if (_is["default"].what(value) === 'path' || _is["default"].what(value) === 'file') {
    var path = getThemePath(config);

    if (jsRegex.test(path)) {
      result = require(file);
    }

    if (jsonnetRegex.test(path)) {
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


  if (theme) {
    result = Object.assign(theme, result);
  }

  return result;
};

function getThemePath(config) {
  var path = '';
  var files;

  if (_is["default"].what(config.theme) === 'dir') {
    files = _glob["default"].sync(config.root + config.theme + '**/*');
  } else if (_is["default"].what(config.theme) === 'file') {
    files = _glob["default"].sync(config.root + config.theme);
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

var _default = theme;
exports["default"] = _default;
module.exports = exports.default;