"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Template = void 0;

var _defaultConfig = _interopRequireDefault(require("./default-config.js"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Import the theme which it's path is specified in the config
var theme = require(__dirname + '/../' + _defaultConfig["default"].theme)["default"]; // Create a clone of the theme object which can be modified by the user


var model = (0, _lodash["default"])(theme);

var Template =
/*#__PURE__*/
function () {
  function Template(name, callback) {
    _classCallCheck(this, Template);

    this.name = name;
    this.string = callback(model, theme);
    this.result = this.render();
  }

  _createClass(Template, [{
    key: "render",
    value: function render() {
      if (this.string) {
        return this.string;
      }
    }
  }]);

  return Template;
}();

exports.Template = Template;