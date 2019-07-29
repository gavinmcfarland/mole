"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _plugins = _interopRequireDefault(require("./lib/plugins.js"));

var _defaultConfig = _interopRequireDefault(require("./lib/default-config.js"));

var _parseTheme = _interopRequireDefault(require("./lib/parse-theme.js"));

var _output = _interopRequireWildcard(require("./lib/output.js"));

var _propertyDefinition = _interopRequireDefault(require("./lib/property-definition.js"));

var _writeFiles = _interopRequireDefault(require("./lib/write-files.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var data = {};

for (var _i = 0, _Object$entries = Object.entries(_plugins["default"]); _i < _Object$entries.length; _i++) {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];

  // Call each of the plugins
  _plugins["default"][key]({
    theme: _parseTheme["default"],
    output: _output["default"],
    property: _propertyDefinition["default"],
    data: data
  });
}

(0, _writeFiles["default"])(_output.outputs);