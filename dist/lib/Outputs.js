"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Output = _interopRequireDefault(require("./Output"));

var _Config = _interopRequireDefault(require("./Config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a array of outputs which contain contents of `models` and `templates`
 *
 * ```js
 * outputs: [
 *   Output {
 *	  name: 'css',
 *	  model: {
 *				token: {
 *					name: 'colorRed',
 *					value: '#FF0000'
 *				}
 *			}
 *	  template: 'The color red is {{color.red}}',
 *    path: 'styles.css'
 *   } //...
 * ]
 *```
 */
var Outputs = function Outputs(peripherals, configuration) {
  var _this = this;

  _classCallCheck(this, Outputs);

  this.config = new _Config["default"](configuration);
  var outputs = normaliseOutputs(this.config);
  return outputs.map(function (output) {
    return new _Output["default"](output, peripherals, _this.config);
  });
};
/**
 * Flattens the structure of user defined output so it's easier to work with
 * ```js
 * {
 *	output: [
 *		{
 *			template: ['template-name'],
 *			model: ['tokens', 'mixins'].
 *			dir: 'templates/',
 *			file: 'style.css',
 *			path: 'templates/style.css'
 *		}
 *	]
 * }
 * ```
 * @param {Object} outputs A config with property called output which contains an array
 */


function normaliseOutputs(config) {
  var outputs = config.output;
  return outputs.map(function (output) {
    if (typeof output === 'undefined') {
      throw new Error('No outputs specified in config');
    } // Check for name


    var name;

    if (typeof output.file === 'undefined') {
      name = Object.keys(output)[0];
    } else {
      name = null;
    } // Check for model


    var model;

    if (output.model) {
      model = output.model;
    } else if (config.model) {
      model = config.model;
    } else {
      model = null;
    } // Check for template


    var template;

    if (output.template) {
      template = output.template;
    } else if (config.template) {
      template = config.template;
    } else {
      template = null;
    } // Check for directory


    var dir;

    if (output.dir) {
      if (config.dir) {
        dir = '.' + config.root + config.dir + output.dir;
      } else {
        dir = '.' + config.root + output.dir;
      }
    } else if (config.dir) {
      dir = '.' + config.root + config.dir;
    } else {
      dir = '.' + config.root + '';
    } // Check for file


    var file;

    if (typeof output.file === 'undefined') {
      file = output[name].file;
    } else {
      file = output.file;
    }

    return Object.assign({}, {
      name: name,
      model: model,
      template: template,
      dir: dir,
      file: file
    });
  });
}

var _default = Outputs;
exports["default"] = _default;
module.exports = exports.default;