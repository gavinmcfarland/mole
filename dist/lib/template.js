"use strict";

var _dataModel = _interopRequireDefault(require("./data-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a new user defined template
 * @memberof Mole
 * @param {string} name Name of the template
 * @param {Mole.Template~function|string} template Provide either a function or a string for the template
 * @param {string} [output] Provide a named output the template should attach to
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 * @example
 * // Example using `add()` method
 * mole.add(
 * 	new Template('template-name', function(model) {
 * 		return // The string you'd like to return to be parsed
 * 	})
 * )
 */
var Template = function Template(name, pluginFunction) {
  _classCallCheck(this, Template);

  /**
   * Callback for returning a data model
   * @callback Mole.Template~function
   * @param {object} data - Access to the data model
   * @param {object} theme - Access the original theme data
   * @return {string} Returns a string which is rendered using a templating engine
   */
  this.name = name;
  this.template = pluginFunction();
};