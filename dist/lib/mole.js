"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _theme = _interopRequireDefault(require("./theme"));

var _outputs = _interopRequireDefault(require("./outputs"));

var _mole = _interopRequireDefault(require("../../../mole.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    this.theme = new _theme["default"]().parse();
    this.model = new _theme["default"]().model;
    this.plugins = {};
    this.outputs = this.getOutputs();
    this.files = null;
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
        result.push(new _outputs["default"](output));
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
var _default = mole;
exports["default"] = _default;
module.exports = exports.default;