"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _Outputs = _interopRequireDefault(require("./Outputs"));

var _Peripherals = _interopRequireDefault(require("./Peripherals"));

var _Model = _interopRequireDefault(require("./Model"));

var _Template = _interopRequireDefault(require("./Template"));

var _env = _interopRequireDefault(require("./env"));

var _Data = _interopRequireDefault(require("./Data"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// var env = new nunjucks.Environment()
var nunjucksEnv = _nunjucks["default"].configure();
/**
 * Create a new instance of the main application
 *
 * ```js
 * import * from 'mole'
 *
 * mole.add(
 *	new Model('model-name', ({data}) => {
 *		data.hello = "hello"
 *		return data
 *	})
 * )
 *
 * mole.build()
 * ```
 */


var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    // this.outputs = new Outputs()
    // this.files = parse()
    this.theme = new _Theme["default"]().parsed;
    this.data = _Data["default"].result;
    this.peripherals = new _Peripherals["default"]();
    this.configuration = {}; // this.outputs = new Outputs(this.peripherals, this.configuration)
  }

  _createClass(Mole, [{
    key: "config",
    value: function config(value) {
      this.configuration = value;
    }
    /**
     * Renders the `templates` and `models` of the outputs
     * @param {Object} outputs Outputs with string and data to render
     * @return {Mole#files} Returns an array of objects with contents and paths
     */

  }, {
    key: "render",
    value: function render(outputs) {
      var files = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = outputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

      return files;
    }
    /**
     * Builds the files from the outputs
     * @param {Object}
     * @return {Mole#outputs}
     * @tutorial Outputting build files
     * @example
     * // Example output
     * build/
     * 	css/
     * 		styles.css
     * 	ios/
     * 		styles.h
     * 	android/
     * 		styles.xml
     */

  }, {
    key: "build",
    value: function build() {
      console.log(this.configuration);
      this.outputs = new _Outputs["default"](this.peripherals, this.configuration);
      this.files = this.render(this.outputs);
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
    /**
     * Adds a new `model` or `template` to list of peripherals
     * @param {Mole.Model|Mole.Template} peripheral Either an instance of a `Model` or a `Template`
     * @return {Mole#peripherals}
     * @example
     * // Adding a model dynamically
     * mole.add('model', 'model-name', ({data}) => {
     * 	data.color.red = "#FF00000"
     * 	return data
     * })
     */

  }, {
    key: "add",
    value: function add() {
      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'model') {
        this.peripherals.model.push(new _Model["default"](arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]));

        _Data["default"].update(new _Model["default"](arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]).data);
      }

      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'template') {
        this.peripherals.template.push(new _Template["default"](arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]));
      }

      this.outputs = new _Outputs["default"](this.peripherals, this.configuration);
    }
  }]);

  return Mole;
}();

var _default = Mole;
exports["default"] = _default;
module.exports = exports.default;