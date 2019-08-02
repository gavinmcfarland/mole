"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _voca = _interopRequireDefault(require("voca"));

var _mole = _interopRequireDefault(require("./mole"));

var _templateTest = _interopRequireDefault(require("../plugins/templateTest"));

var _modelTest = _interopRequireDefault(require("../plugins/modelTest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_mole["default"].plugins.templates = [_templateTest["default"]];
_mole["default"].plugins.models = [_modelTest["default"]]; // var env = new nunjucks.Environment()

var env = _nunjucks["default"].configure();

function renderTemplate(string, data) {
  return env.renderString(string, data);
}

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
          path: output.file
        };
      } else if (isDir && isNamedOutput) {
        console.log('template is directory');
        return {
          content: getContentFromDirs(template, output),
          path: output.file
        };
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _mole["default"].plugins.templates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var registeredTemplate = _step.value;

            if (template === registeredTemplate.name) {
              return {
                // TODO: needs to parse the string using template renderer with associated model
                content: renderTemplate(registeredTemplate.string, _mole["default"].model),
                // content: registeredTemplate.string,
                path: output.file
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
          path: output.file
        };
      } else if (isDir && isNamedOutput) {
        console.log('model is directory');
        return {
          model: getContentFromDirs(model, output),
          path: output.file
        };
      } else {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _mole["default"].plugins.models[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var registeredModel = _step2.value;

            if (model === registeredModel.name) {
              return {
                model: registeredModel.string,
                path: output.file
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
    return processModels([model], output);
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
      // TODO: needs swap round the order of templates and models being processed
      processModels(output.model, output);
      files.push(parseTemplates(output.template, output)); // This only mutates an object. It does not return anything
      // console.log(output)
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

_mole["default"].files = generateContents(_mole["default"].outputs);
var _default = _mole["default"];
exports["default"] = _default;
module.exports = exports.default;