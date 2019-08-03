"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _voca = _interopRequireDefault(require("voca"));

var _mole = _interopRequireDefault(require("../../../mole.config"));

var _theme = _interopRequireDefault(require("./theme"));

var _output = _interopRequireDefault(require("./output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// var env = new nunjucks.Environment()
var env = _nunjucks["default"].configure();

var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    this.theme = new _theme["default"]().parse();
    this.model = new _theme["default"]().model;
    this.plugins = {};
    this.outputs = this.getOutputs();
    this.files = '';
  }

  _createClass(Mole, [{
    key: "model",
    value: function model() {
      return this.model;
    }
  }, {
    key: "getOutputs",
    value: function getOutputs() {
      var result = [];

      for (var i in _mole["default"].output) {
        // Check if output is stored in array or not. Makes assumption that if had file property then not in array
        var output = typeof _mole["default"].output[i].file !== 'undefined' ? _mole["default"].output[i] : _mole["default"].output[i][Object.keys(_mole["default"].output[i])];
        result.push(new _output["default"](output));
      }

      return result;
    }
  }, {
    key: "write",
    value: function write() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var file = _step.value;

          _fsExtra["default"].outputFile(file.path, file.content, function (err) {
            if (err) console.log(err); // => null

            _fsExtra["default"].readFile(file.path, 'utf8', function (err, data) {
              console.log(data); // => hello!
            });
          });
        };

        for (var _iterator = this.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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
  }]);

  return Mole;
}();

var mole = new Mole();
console.log(mole);

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
}

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
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = mole.plugins.templates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var registeredTemplate = _step2.value;

            if (template === registeredTemplate.name) {
              return {
                // TODO: needs to parse the string using template renderer with associated model
                content: renderTemplate(registeredTemplate.string, mole.model),
                // content: registeredTemplate.string,
                path: output.file
              };
            } else {
              return {
                content: 'not sure',
                path: output.file
              };
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
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = mole.plugins.models[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var registeredModel = _step3.value;

            if (model === registeredModel.name) {
              return {
                model: registeredModel.string,
                path: output.file
              };
            } else {
              return {
                model: 'not sure',
                path: output.file
              };
            }
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
      }
    }
  } else {
    return processModels([model], output);
  }
}

function generateContents(outputs) {
  var files = [];
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = outputs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var output = _step4.value;
      // This only mutates an object. It does not return anything
      processModels(output.model, output);
      files.push(parseTemplates(output.template, output));
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return files;
}

var _default = mole; // Plugins require the instance of mole exported above ^ before then can be registered to instance

exports["default"] = _default;

function registerPlugins() {
  mole.plugins.templates = [require('../plugins/templateTest')];
  mole.plugins.models = [require('../plugins/modelTest')];
}

registerPlugins();
mole.files = generateContents(mole.outputs);
module.exports = exports.default;