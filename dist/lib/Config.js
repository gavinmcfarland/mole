"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireDefault(require("./env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function requireConfig(path) {
  try {
    var m = require(path);

    return m;
  } catch (ex) {
    throw new Error('No mole.config.js file found');
  }
}
/**
 * Path to config file
 * @member
 * @default path './mole.config.js'
 */


var config;
var root;

if (_env["default"] === 'dev') {
  root = '/src/stub/';
  config = requireConfig(process.cwd() + root + 'dev-config.js');
} else {
  root = '/';
  config = requireConfig(process.cwd() + root + 'mole.config');
}
/**
 * Provides config settings for main application to use
 *
 * ```js
 * // mole.config.js
 * export default {
 * 	theme: 'theme/',
 * 	model: ['chars', 'tokens'],
 * 	template: 'templates/',
 * 	output: [
 * 		{ css: { file: 'styles.css' } },
 * 		{ ios: { file: 'styles.h' } },
 * 		{ android: { file: 'styles.xml' } }
 * 	]
 * }
 * ```
 * @memberof Mole
 * @example
 * {
	theme: 'theme/',
	model: [ 'model-name' ],
	template: [ 'templates/' ],
	output: [
		{ css: { file: 'styles.css' } },
		{ ios: { file: 'styles.h' } },
		{ android: { file: 'styles.xml' } }
	]
}
 */


var Config = function Config() {
  _classCallCheck(this, Config);

  config.root = root;
  config.path = process.cwd() + root;
  return normaliseConfig(config);
};
/**
 * Normalises user's config for easier use.
 * @memberof Mole.Config
 * @param {Object} config The properties for the config
 */


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

var _default = Config;
exports["default"] = _default;
module.exports = exports.default;