"use strict";

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _is = _interopRequireDefault(require("../util/is"));

var _glob = _interopRequireDefault(require("glob"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _voca = _interopRequireDefault(require("voca"));

var _mole = _interopRequireDefault(require("../../../mole.config"));

var _theme = _interopRequireDefault(require("./theme"));

var _output = _interopRequireDefault(require("./output"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// var env = new nunjucks.Environment()
var env = _nunjucks["default"].configure();

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(name, callback) {
    _classCallCheck(this, Plugin);

    this.name = name;
    if (callback(mole.model, mole.theme)) this.string = callback(mole.model, mole.theme);
    if (this.render()) this.rendered = this.render();
    this.model = mole.model;
  }

  _createClass(Plugin, [{
    key: "render",
    value: function render() {
      if (this.string) {
        return env.renderString(this.string, mole.model);
      }
    }
  }]);

  return Plugin;
}(); // class Model {
// 	constructor(name, callback) {
// 		this.name = name
// 		// This updates mole.model with changes from plugin
// 		Object.assign(mole.model, Object.getPrototypeOf(callback(mole.model)))
// 		// console.log(mole.model)
// 	}
// }
// class Template {
// 	constructor(name, callback) {
// 		this.name = name
// 		this.string = callback(mole.model, mole.theme)
// 		this.result = this.render()
// 	}
// 	render() {
// 		if (this.string) {
// 			return env.renderString(this.string, mole.model)
// 		}
// 	}
// }


var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    this.theme = new _theme["default"]().parse();
    this.model = new _theme["default"]().model;
    this.outputs = this.getOutputs();
    this.plugins = []; // this.models = []
    // this.templates = []

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
    key: "setPlugin",
    value: function setPlugin(value) {
      this.plugins.push(value);
      this.files = this.generateFiles(); // this.parsePlugins()
    } // setModel(value) {
    // 	this.models.push(value)
    // }
    // setTemplate(value) {
    // 	this.templates.push(value)
    // 	this.files = this.generateFiles()
    // }
    // parseModels() {
    // 	let models = this.models
    // 	for (let output of this.outputs) {
    // 		switch (is.what(output.model)[0]) {
    // 			case 'path':
    // 				console.log('value is a path')
    // 				break
    // 			case 'string':
    // 				for (let model of models) {
    // 					if (output.model === model.name) {
    // 						console.log('value is a named model')
    // 					}
    // 				}
    // 				break
    // 			default:
    // 			// do something
    // 		}
    // 	}
    // }
    // parseTemplates() {
    // 	let templates = this.templates
    // 	for (let output of this.outputs) {
    // 		switch (is.what(output.template)[0]) {
    // 			case 'path':
    // 				console.log('value is a path')
    // 				break
    // 			case 'string':
    // 				for (let template of templates) {
    // 					if (output.template === template.name) {
    // 						console.log('value is a named plugin')
    // 					}
    // 				}
    // 				break
    // 			default:
    // 			// do something
    // 		}
    // 	}
    // }

  }, {
    key: "parsePlugins",
    value: function parsePlugins() {
      var plugins = this.plugins;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.outputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var output = _step.value;

          // Need to check if templates is an array or not
          if (_is["default"].arr(output.template)) {
            for (var template in output.template) {
              switch (_is["default"].what(template)[0]) {
                case 'path':
                  console.log('value is a path');
                  break;

                case 'string':
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var plugin = _step2.value;

                      if (template === plugin.name) {
                        console.log('value is a named plugin');
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

                  break;

                default: // do something

              }
            }
          } else {
            // If not an array then put into array and process again
            output.template = [output.template];
            this.parsePlugins();
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
  }, {
    key: "generateFiles",
    value: function generateFiles() {
      var files = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.outputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var output = _step3.value;
          files.push(this.plugins);
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
  }, {
    key: "writeFiles",
    value: function writeFiles() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        var _loop = function _loop() {
          var file = _step4.value;

          _fsExtra["default"].outputFile(file.path, file.content, function (err) {
            if (err) console.log(err); // => null

            _fsExtra["default"].readFile(file.path, 'utf8', function (err, data) {
              console.log(data); // => hello!
            });
          });
        };

        for (var _iterator4 = this.files[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          _loop();
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
    }
  }]);

  return Mole;
}();

var mole = new Mole();
mole.setPlugin(new Plugin('modelTest', function (model) {
  model.color.red = '#FF0000';
}));
mole.setPlugin(new Plugin('templateTest', function () {
  return "I'm {{color.red}}";
})); // mole.setModel(
// 	new Model('modelTest', function(model) {
// 		return (model.color.red = '#FF0000')
// 	})
// )
// mole.setTemplate(
// 	new Template('templateTest', function() {
// 		return "I'm {{color.red}}"
// 	})
// )
// mole.parsePlugins()
// mole.parseModels()
// mole.parseTemplates()
// console.log(mole.outputs)

console.log(mole); // function renderTemplate(string, data) {
// 	return env.renderString(string, data)
// }
// function getContentFromDirs(path, output) {
// 	let files = glob.sync(path + output.name + '/*')
// 	let strings = []
// 	for (let i = 0; i < files.length; i++) {
// 		// console.log(fs.readFileSync(files[i], 'utf8'))
// 		strings.push(fs.readFileSync(files[i], 'utf8'))
// 	}
// 	// TODO: needs to parse the string using template renderer with associated model
// 	return strings.join('\n')
// }
// function parseTemplates(template, output) {
// 	if (Array.isArray(template)) {
// 		for (let i in template) {
// 			template = template[i]
// 			let DIRREG = /.+\/.?/im
// 			let isFunction = typeof template === 'function'
// 			let isObject = typeof template === 'object'
// 			let isDir = DIRREG.test(template)
// 			let isNamedOutput = output && output.name
// 			if (isFunction) {
// 				console.log('template is function')
// 				return 'should be function'
// 			} else if (isObject) {
// 				console.log('template is object')
// 				return {
// 					content: output.template.result,
// 					path: output.file
// 				}
// 			} else if (isDir && isNamedOutput) {
// 				console.log('template is directory')
// 				return {
// 					content: getContentFromDirs(template, output),
// 					path: output.file
// 				}
// 			} else {
// 				for (let registeredTemplate of mole.plugins.templates) {
// 					if (template === registeredTemplate.name) {
// 						return {
// 							// TODO: needs to parse the string using template renderer with associated model
// 							content: renderTemplate(
// 								registeredTemplate.string,
// 								mole.model
// 							),
// 							// content: registeredTemplate.string,
// 							path: output.file
// 						}
// 					} else {
// 						return {
// 							content: 'not sure',
// 							path: output.file
// 						}
// 					}
// 				}
// 			}
// 		}
// 	} else {
// 		return parseTemplates([template], output)
// 	}
// }
// function processModels(model, output) {
// 	if (Array.isArray(model)) {
// 		for (let i in model) {
// 			model = model[i]
// 			let DIRREG = /.+\/.?/im
// 			let isFunction = typeof model === 'function'
// 			let isObject = typeof model === 'object'
// 			let isDir = DIRREG.test(model)
// 			let isNamedOutput = output && output.name
// 			if (isFunction) {
// 				console.log('model is function')
// 				return 'should be function'
// 			} else if (isObject) {
// 				console.log('model is object')
// 				return {
// 					model: output.model.result,
// 					path: output.file
// 				}
// 			} else if (isDir && isNamedOutput) {
// 				console.log('model is directory')
// 				return {
// 					model: getContentFromDirs(model, output),
// 					path: output.file
// 				}
// 			} else {
// 				for (let registeredModel of mole.plugins.models) {
// 					if (model === registeredModel.name) {
// 						return {
// 							model: registeredModel.string,
// 							path: output.file
// 						}
// 					} else {
// 						return {
// 							model: 'not sure',
// 							path: output.file
// 						}
// 					}
// 				}
// 			}
// 		}
// 	} else {
// 		return processModels([model], output)
// 	}
// }
// function generateContents(outputs) {
// 	let files = []
// 	for (let output of outputs) {
// 		// This only mutates an object. It does not return anything
// 		processModels(output.model, output)
// 		files.push(parseTemplates(output.template, output))
// 	}
// 	return files
// }
// Plugins require the instance of mole exported above ^ before then can be registered to instance
// mole.files = generateContents(mole.outputs)