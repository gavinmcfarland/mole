"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _getOutputs = _interopRequireDefault(require("./get-outputs.js"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _voca = _interopRequireDefault(require("voca"));

var _cloneModel = require("./clone-model.js");

var _thing = _interopRequireDefault(require("../plugins/thing1.js"));

var _chars = _interopRequireDefault(require("../plugins/chars.js"));

var _tokens = _interopRequireDefault(require("../plugins/tokens.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var registeredTemplates = [_thing["default"]];
var registeredModels = [_chars["default"], _tokens["default"]]; // var env = new nunjucks.Environment()

var env = _nunjucks["default"].configure();

var outputs = (0, _getOutputs["default"])();

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
          file: output.file
        };
      } else if (isDir && isNamedOutput) {
        console.log('template is directory');
        return {
          content: getContentFromDirs(template, output),
          file: output.file
        };
      } else {
        for (var _i = 0, _registeredTemplates = registeredTemplates; _i < _registeredTemplates.length; _i++) {
          var registeredTemplate = _registeredTemplates[_i];

          if (template === registeredTemplate.name) {
            return {
              // TODO: needs to parse the string using template renderer with associated model
              content: renderTemplate(registeredTemplate.string, _cloneModel.model),
              // content: registeredTemplate.string,
              file: output.file
            };
          } else {
            return template;
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
        for (var _i2 = 0, _registeredModels = registeredModels; _i2 < _registeredModels.length; _i2++) {
          var registeredModel = _registeredModels[_i2];

          if (model === registeredModel.name) {
            return {
              model: registeredModel.string,
              file: output.file
            };
          } else {
            return model;
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
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = outputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var output = _step.value;
      // TODO: needs swap round the order of templates and models being processed
      files.push(parseTemplates(output.template, output)); // This only mutates an object. It does not return anything

      processModels(output.model, output); // console.log(output)
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

  return files;
}

var _default = generateContents(outputs);

exports["default"] = _default;
console.log(_cloneModel.model);