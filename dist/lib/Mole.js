"use strict";

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var nunjucksEnv = _nunjucks["default"].configure();

var files = [];
var things = [];

var Mole =
/*#__PURE__*/
function () {
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = things[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var output = _step.value;
          // console.log(output)
          var file = {
            content: nunjucksEnv.renderString(output.template, output.model),
            path: output.path
          };
          files.push(file);
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
    key: "build",
    value: function build() {
      this._outputs();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

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

        for (var _iterator2 = this.render()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
  things: things // console.log(mole.render())
  // console.log(mole.debug)

};
var _default = mole;
exports["default"] = _default;
module.exports = exports.default;