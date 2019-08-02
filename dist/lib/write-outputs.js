"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = output;
exports.outputs = void 0;

var _defaultConfig = _interopRequireDefault(require("./default-config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var outputs = []; // Takes a template, data and converts using Handlebars which then writes to a file
// Make data optional?
// Make template = string?

exports.outputs = outputs;

function output(template, data, path) {
  if (arguments.length === 1 && _typeof(arguments[0]) === 'object') {
    // probably data
    data = template;
    template = null;
  } // // If path specified in plugin use that, otherwise look in config


  if (path) {
    var object = {
      template: template || null,
      data: data || null,
      path: path || null
    };
    outputs.push(object);
  } else {
    if (typeof _defaultConfig["default"].platforms !== 'undefined') {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _defaultConfig["default"].platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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