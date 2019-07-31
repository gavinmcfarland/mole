"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _defaultConfig = _interopRequireDefault(require("./default-config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
Returns object like

[
	{ name: 'css', template: 'templates/', file: '' },
	{ name: 'ios', template: 'templates/', file: '' },
	{ name: 'android', template: 'templates/', file: '' }
]

*/
function _default() {
  console.log('-hello');
  var result = []; // Check for array if not, create array

  if (typeof _defaultConfig["default"].output !== 'undefined') {
    if (!Array.isArray(_defaultConfig["default"].output)) {
      _defaultConfig["default"].output = [_defaultConfig["default"].output];
    }
  } // For item in config.output


  for (var i in _defaultConfig["default"].output) {
    var object = {};
    var output = void 0;
    var name = void 0; // Get output
    // If there is no named output

    if (typeof _defaultConfig["default"].output[i].file !== 'undefined') {
      output = _defaultConfig["default"].output[i];
    } // If there is a named output
    else {
        output = _defaultConfig["default"].output[i][Object.keys(_defaultConfig["default"].output[i])];
        name = Object.keys(_defaultConfig["default"].output[i])[0];
      }

    if (typeof name !== 'undefined') {
      object.name = name;
    } // Get template


    var template = void 0;

    if (output.template) {
      template = output.template;
    } else if (_defaultConfig["default"].template) {
      template = _defaultConfig["default"].template;
    } // Get dir


    var dir = void 0;

    if (output.dir) {
      if (_defaultConfig["default"].dir) {
        dir = _defaultConfig["default"].dir + output.dir;
      } else {
        dir = output.dir;
      }
    } else if (_defaultConfig["default"].dir) {
      dir = _defaultConfig["default"].dir;
    } else {
      dir = '';
    }

    var file = dir + output.file;
    object.template = template;
    object.file = file;
    result.push(object);
  }

  return result;
}