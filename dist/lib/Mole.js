"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Config = _interopRequireDefault(require("./Config"));

var _Theme = _interopRequireWildcard(require("./Theme"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _Peripherals = _interopRequireDefault(require("./Peripherals"));

var _env = _interopRequireDefault(require("./env"));

var _Output = _interopRequireDefault(require("./Output"));

var _Model = _interopRequireDefault(require("./Model"));

var _Template = _interopRequireDefault(require("./Template"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var nunjucksEnv = _nunjucks["default"].configure();

var files = [];
var things = [];

var Mole = /*#__PURE__*/function () {
  function Mole() {
    _classCallCheck(this, Mole);
  }

  _createClass(Mole, [{
    key: "config",
    value: function config(value) {
      _Config["default"].set(value);
    }
  }, {
    key: "theme",
    value: function theme(value) {
      _Theme["default"].set(value, _Config["default"]);
    }
  }, {
    key: "create",
    value: function create() {
      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'model') {
        var model = new _Model["default"](arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], _Theme["default"], _Theme.data);

        _Peripherals["default"].model.push(model);

        _Theme.data.update(model.data);
      }

      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'template') {
        _Peripherals["default"].template.push(new _Template["default"](arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], _Theme["default"], _Theme.data));
      }

      this._outputs();
    } // An alias for create, add() is depreciated */

  }, {
    key: "add",
    value: function add() {
      this.create.apply(this, arguments);
    }
  }, {
    key: "_outputs",
    value: function _outputs() {
      things = _Config["default"].output.map(function (output) {
        return new _Output["default"](output, _Peripherals["default"], _Config["default"], _Theme["default"], _Theme.data);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var files = [];

      var _iterator = _createForOfIteratorHelper(things),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var output = _step.value;
          // console.log(output)
          var file = {
            content: nunjucksEnv.renderString(output.template, output.model),
            path: output.path
          };
          files.push(file);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return files;
    }
  }, {
    key: "build",
    value: function build() {
      this._outputs();

      var _iterator2 = _createForOfIteratorHelper(this.render()),
          _step2;

      try {
        var _loop = function _loop() {
          var file = _step2.value;

          _fsExtra["default"].outputFile(file.path, file.content, function (err) {
            if (err) console.log(err); // => null

            if (_env["default"] === 'test') {
              _fsExtra["default"].readFile(file.path, 'utf8', function (err, data) {
                console.log(data); // => hello!
              });
            }
          });
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);

  return Mole;
}();

var mole = new Mole(); // console.log(config)
// mole.create('model', 'redModel', (theme, model) => {
// 	model.color.red = "#FF00000"
// 	return model
// })
// console.log(config)
// console.log(things)
// mole.build()
// mole.theme('src/stub/theme/override-theme.jsonnet')
// console.log(data)
// console.log(peripherals)
// console.log(mole)

if (_env["default"] === 'test') {
  mole.build();
}

mole.debug = {
  config: _Config["default"],
  theme: _Theme["default"],
  data: _Theme.data,
  outputs: _Config["default"].output,
  files: files,
  things: things
}; // console.log(mole.render())
// console.log(mole.debug)

var _default = mole;
exports["default"] = _default;
module.exports = exports.default;