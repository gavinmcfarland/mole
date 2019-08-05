"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Mole = void 0;

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
}();

var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    this.theme = new _theme["default"]().parse();
    this.model = new _theme["default"]().model;
    this.outputs = this.getOutputs();
    this.plugins = [];
    this.files = [];
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
        // Check if output is stored in array or not. Makes assumption that if has file property then not in array
        var output = typeof _mole["default"].output[i].file !== 'undefined' ? _mole["default"].output[i] : _mole["default"].output[i][Object.keys(_mole["default"].output[i])];
        result.push(new _output["default"](output));
      }

      return result;
    }
  }, {
    key: "setPlugin",
    value: function setPlugin(value) {
      this.plugins.push(value);
      this.files = this.generateFiles();
    }
  }, {
    key: "parseTemplates",
    value: function parseTemplates() {
      var plugins = this.plugins;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.outputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var output = _step.value;

          // Need to check if templates is an array or not
          if (_is["default"].arr(output.template)) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = output.template[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var template = _step2.value;

                switch (_is["default"].what(template)[0]) {
                  case 'path':
                    console.log('value is a path');
                    break;

                  case 'string':
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = plugins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var plugin = _step3.value;

                        if (template === plugin.name) {
                          // console.log('value is a named plugin')
                          this.files.push({
                            content: plugin.rendered,
                            path: output.path
                          });
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

                    break;

                  default: // do something

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
          } else {
            // If not an array then put into array and process again
            output.template = [output.template];
            this.parseTemplates();
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
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.outputs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var output = _step4.value;

          if (output.template) {
            this.parseTemplates();
          }
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

      return this.files;
    }
  }, {
    key: "write",
    value: function write() {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        var _loop = function _loop() {
          var file = _step5.value;

          _fsExtra["default"].outputFile(file.path, file.content, function (err) {
            if (err) console.log(err); // => null

            _fsExtra["default"].readFile(file.path, 'utf8', function (err, data) {
              console.log(data); // => hello!
            });
          });
        };

        for (var _iterator5 = this.files[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }]);

  return Mole;
}();

exports.Mole = Mole;
var mole = new Mole();
mole.setPlugin(new Plugin('modelTest', function (model) {
  model.color.red = '#FF0000';
}));
mole.setPlugin(new Plugin('templateTest', function () {
  return "I'm {{color.red}}";
}));
var _default = mole;
exports["default"] = _default;