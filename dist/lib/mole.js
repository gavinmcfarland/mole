"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Mole = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _voca = _interopRequireDefault(require("voca"));

var _mole = _interopRequireDefault(require("../../../mole.config"));

var _theme = _interopRequireDefault(require("./theme"));

var _output = _interopRequireDefault(require("./output"));

var _file = _interopRequireDefault(require("./file"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    this.outputs = this.outputs();
    this.plugins = [];
    this.files = [];
  }

  _createClass(Mole, [{
    key: "outputs",
    value: function outputs() {
      var result = [];

      for (var i in _mole["default"].output) {
        // Check if output is stored in array or not. Makes assumption that if has file property then not in array
        var output = typeof _mole["default"].output[i].file !== 'undefined' ? _mole["default"].output[i] : _mole["default"].output[i][Object.keys(_mole["default"].output[i])];
        result.push(new _output["default"](output, i));
      }

      return result;
    }
  }, {
    key: "setPlugin",
    value: function setPlugin(value) {
      this.plugins.push(value);
      this.files = this.process();
    }
  }, {
    key: "process",
    value: function process() {
      var files = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.outputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var output = _step.value;
          files.push(new _file["default"](output, this.plugins));
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
  }, {
    key: "write",
    value: function write() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var file = _step2.value;

          _fsExtra["default"].outputFile(file.path, file.content, function (err) {
            if (err) console.log(err); // => null

            _fsExtra["default"].readFile(file.path, 'utf8', function (err, data) {
              console.log(data); // => hello!
            });
          });
        };

        for (var _iterator2 = this.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
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
  }]);

  return Mole;
}();

exports.Mole = Mole;

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

var mole = new Mole();
console.log(Object.getPrototypeOf(mole).model);
mole.setPlugin(new Plugin('modelTest', function (model) {
  model.color.red = '#FF0000';
}));
mole.setPlugin(new Plugin('templateTest', function () {
  return "I'm {{color.red}}";
}));
console.log(mole);
var _default = mole;
exports["default"] = _default;