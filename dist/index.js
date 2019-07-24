"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _plugins = _interopRequireDefault(require("./lib/plugins.js"));

var _config = _interopRequireDefault(require("./lib/config.js"));

var _parseTheme = _interopRequireDefault(require("./lib/parse-theme.js"));

var _writeFiles = _interopRequireDefault(require("./lib/write-files.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var outputs = [];

function output(template, data, path) {
  // // If path specified in plugin use that, otherwise look in config
  if (path) {
    var object = {
      template: template || null,
      data: data || null,
      path: path || null
    };
    outputs.push(object);
  } else {
    if (typeof _config["default"].platforms !== 'undefined') {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _config["default"].platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var platform = _step.value;
          platform = platform[Object.keys(platform)]; // console.log(template || platform.output.template)

          var _object = {
            template: template || platform.output.template || null,
            data: data || platform.output.data || null,
            path: path || platform.output.path || null
          };
          outputs.push(_object);
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
    }
  }
}

for (var _i = 0, _Object$entries = Object.entries(_plugins["default"]); _i < _Object$entries.length; _i++) {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];

  // Call each of the plugins
  _plugins["default"][key]({
    theme: _parseTheme["default"],
    output: output,
    property: 'property'
  });
}

console.log('-----------------');
(0, _writeFiles["default"])(outputs);