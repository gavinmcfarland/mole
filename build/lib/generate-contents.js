"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _getOutputs = _interopRequireDefault(require("./get-outputs.js"));

var _registeredTemplates = require("./registered-templates.js");

var _registeredModels = require("./registered-models.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var outputs = (0, _getOutputs["default"])();

function getContentFromDirs(path, output) {
  var files = _glob["default"].sync(path + output.name + '/*');

  var strings = [];

  for (var i = 0; i < files.length; i++) {
    // console.log(fs.readFileSync(files[i], 'utf8'))
    strings.push(_fsExtra["default"].readFileSync(files[i], 'utf8'));
  } // TODO: needs to parse the string using template renderer with associated model


  return strings.join('\n');
} // New function


function parseTemplates(template, output) {
  if (Array.isArray(template)) {
    for (var i in template) {
      template = template[i];
      var DIRREG = /.+\/.?/im;
      var isFunction = typeof template === 'function';
      var isObject = _typeof(template) === 'object';
      var isDir = DIRREG.test(template);
      var isNamedOutput = output && output.name;

      if (isFunction) {
        console.log('template is function');
        return 'should be function';
      } else if (isObject) {
        console.log('template is object');
        return {
          content: output.template.result,
          file: output.file
        };
      } else if (isDir && isNamedOutput) {
        console.log('template is directory');
        return {
          content: getContentFromDirs(template, output),
          file: output.file
        };
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _registeredTemplates.registeredTemplates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var registeredTemplate = _step.value;

            if (template === registeredTemplate.name) {
              return {
                content: registeredTemplate.string,
                file: output.file
              };
            } else {
              return template;
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
      }
    }
  } else {
    return parseTemplates([template], output);
  }
}

function processModels(model, output) {
  if (Array.isArray(model)) {
    for (var i in model) {
      model = model[i];
      var DIRREG = /.+\/.?/im;
      var isFunction = typeof model === 'function';
      var isObject = _typeof(model) === 'object';
      var isDir = DIRREG.test(model);
      var isNamedOutput = output && output.name;

      if (isFunction) {
        console.log('model is function');
        return 'should be function';
      } else if (isObject) {
        console.log('model is object');
        return {
          model: output.model.result,
          file: output.file
        };
      } else if (isDir && isNamedOutput) {
        console.log('model is directory');
        return {
          model: getContentFromDirs(model, output),
          file: output.file
        };
      } else {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _registeredModels.registeredModels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var registeredModel = _step2.value;

            if (model === registeredModel.name) {
              return {
                model: registeredModel.string,
                file: output.file
              };
            } else {
              return model;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  } else {
    return parseModels([model], output);
  }
}

function generateContents(outputs) {
  var files = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = outputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var output = _step3.value;
      files.push(parseTemplates(output.template, output)); // This only mutates an object. It does not return anything

      processModels(output.model, output);
      console.log(output);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return files;
}

var _default = generateContents(outputs);

exports["default"] = _default;