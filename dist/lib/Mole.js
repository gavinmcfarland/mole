"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Config = _interopRequireDefault(require("./Config"));

var _Theme = _interopRequireDefault(require("./Theme"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _Peripherals = _interopRequireDefault(require("./Peripherals"));

var _env = _interopRequireDefault(require("./env"));

var _Output = _interopRequireDefault(require("./Output"));

var _Model = _interopRequireDefault(require("./Model"));

var _Template = _interopRequireDefault(require("./Template"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var outputs = _Config["default"].output;

var nunjucksEnv = _nunjucks["default"].configure();

var files = [];
var things = [];

var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    this._outputs();
  }

  _createClass(Mole, [{
    key: "config",
    value: function config(value) {
      _Config["default"].set(value);
    }
  }, {
    key: "theme",
    value: function theme(value) {
      _Theme["default"].set(value);
    }
  }, {
    key: "create",
    value: function create() {
      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'model') {
        _Peripherals["default"].model.push(new _Model["default"](arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], _Theme["default"], _Theme["default"]));
      }

      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'template') {
        _Peripherals["default"].template.push(new _Template["default"](arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], _Theme["default"], _Theme["default"]));
      }

      this._outputs();
    }
  }, {
    key: "_outputs",
    value: function _outputs() {
      things = outputs.map(function (output) {
        // console.log(output)
        return new _Output["default"](output, _Peripherals["default"], _Config["default"], _Theme["default"], _Theme["default"]);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = things[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var output = _step.value;
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
    }
  }, {
    key: "build",
    value: function build() {
      this._outputs();

      this.render();

      var _loop = function _loop() {
        var file = _files[_i];

        _fsExtra["default"].outputFile(file.path, file.content, function (err) {
          if (err) console.log(err); // => null

          if (_env["default"] === 'test') {
            _fsExtra["default"].readFile(file.path, 'utf8', function (err, data) {
              console.log(data); // => hello!
            });
          }
        });
      };

      for (var _i = 0, _files = files; _i < _files.length; _i++) {
        _loop();
      }
    }
  }]);

  return Mole;
}();

var mole = new Mole(); // console.log(config)
// mole.create('model', 'redModel', ({ data }) => {
// 	data.color.red = 'red'
// 	return data
// })
// console.log(config)
// console.log(things)
// mole.build()
// console.log(data)
// console.log(peripherals)
// console.log(mole)

if (_env["default"] === 'test') {
  mole.build();
}

mole.debug = {
  config: _Config["default"],
  theme: _Theme["default"],
  data: _Theme["default"],
  outputs: outputs,
  files: files,
  things: things // console.log(mole.debug)

};
var _default = mole;
exports["default"] = _default;
module.exports = exports.default;