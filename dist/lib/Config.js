"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireDefault(require("./env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function requireConfig(path, value) {
  try {
    var m = require(path);

    return m;
  } catch (ex) {
    return value;
  }
}

var Config =
/*#__PURE__*/
function () {
  function Config(value) {
    _classCallCheck(this, Config);

    return this.set(value);
  }

  _createClass(Config, [{
    key: "set",
    value: function set(value) {
      if (!value) {
        value = {};
      }

      var config;
      var root = '/';

      if (typeof value === 'string') {
        var dirname = value.match(/(.*)[\/\\]/)[1] || '';
        root = dirname + '/';
        config = requireConfig(process.cwd() + value);
      } else if (_typeof(value) === 'object') {
        if (Object.entries(value).length === 0 && value.constructor === Object) {
          if (_env["default"] === 'test') {
            root = '/src/stub/';
            config = requireConfig(process.cwd() + root + 'dev-config.js', value);
          } else {
            root = '/';
            config = requireConfig(process.cwd() + root + 'mole.config', value);
          }
        } else {
          if (_env["default"] === 'test') {
            root = '/src/stub/';
          } else {
            root = '/';
          }

          config = value;
        }
      }

      config.root = root;
      config.path = process.cwd() + root;
      return normaliseConfig(config);
    }
  }]);

  return Config;
}();

function normaliseConfig(config) {
  /*
  1. Normalise the config:
  	1. Put outputs into an array
  	2. Put models and templates into arrays
  */
  ;
  ['model', 'template', 'output'].forEach(function (current) {
    if (config[current]) config[current] = putValuesIntoArray(config[current]);
  });
  return config;
}
/**
 * Checks if value is an array and if not creates an array
 * @memberof Mole.Config
 * @param {String|Array} value The value to check if an array
 */


function putValuesIntoArray(value) {
  return Array.isArray(value) ? value : [value];
}

var config = new Config();
var _default = config;
exports["default"] = _default;
module.exports = exports.default;