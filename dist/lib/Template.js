"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Data = _interopRequireDefault(require("./Data"));

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a new user defined template
 * @memberof Mole.Peripherals
 * @param {string} name Name of the template
 * @param {Mole.Peripherals.Template~function|string} func A callback that returns a string for the template
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 * @example
 * // Example while exporting as module
 * import Template from 'mole'
 *
 * export default new Template('template-name', function(model) {
 * 		return // The string you'd like to return to be parsed
 * 	})
 * )
 */
var Template = function Template(name, func) {
  _classCallCheck(this, Template);

  /**
   * Callback for returning a template string
   * @callback Mole.Peripherals.Template~function
   * @param {Object} data - Access to the data model
   * @param {Object} theme - Access the original theme data
   * @return {String} Returns a string which is rendered using a templating engine
   */
  this.name = name;
  this.string = func({
    data: _Data["default"].result,
    theme: _Theme["default"]
  });
};

var _default = Template;
exports["default"] = _default;
module.exports = exports.default;