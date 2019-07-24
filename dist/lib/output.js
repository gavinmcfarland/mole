"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = output;
exports.outputs = void 0;

var _config = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var outputs = []; // Takes a template, data and converts using Handlebars which then writes to a file
// Make data optional?
// Make template = string?

exports.outputs = outputs;

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