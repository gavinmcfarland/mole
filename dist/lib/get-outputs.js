"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _moleConfig = _interopRequireDefault(require("../../../mole.config.js"));

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
  var result = []; // Check for array if not, create array

  if (typeof _moleConfig["default"].output !== 'undefined') {
    if (!Array.isArray(_moleConfig["default"].output)) {
      _moleConfig["default"].output = [_moleConfig["default"].output];
    }
  } // For item in config.output


  for (var i in _moleConfig["default"].output) {
    var object = {};
    var output = void 0;
    var name = void 0; // Get output
    // If there is no named output

    if (typeof _moleConfig["default"].output[i].file !== 'undefined') {
      output = _moleConfig["default"].output[i];
    } // If there is a named output
    else {
        output = _moleConfig["default"].output[i][Object.keys(_moleConfig["default"].output[i])];
        name = Object.keys(_moleConfig["default"].output[i])[0];
      }

    if (typeof name !== 'undefined') {
      object.name = name;
    } // Get template


    var template = void 0;

    if (output.template) {
      template = output.template;
    } else if (_moleConfig["default"].template) {
      template = _moleConfig["default"].template;
    } // Get template


    var model = void 0;

    if (output.model) {
      model = output.model;
    } else if (_moleConfig["default"].model) {
      model = _moleConfig["default"].model;
    } // Get dir


    var dir = void 0;

    if (output.dir) {
      if (_moleConfig["default"].dir) {
        dir = _moleConfig["default"].dir + output.dir;
      } else {
        dir = output.dir;
      }
    } else if (_moleConfig["default"].dir) {
      dir = _moleConfig["default"].dir;
    } else {
      dir = '';
    }

    var file = dir + output.file;
    object.model = model;
    object.template = template;
    object.file = file;
    result.push(object);
  }

  return result;
}