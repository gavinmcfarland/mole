"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a list of Peripherals which contain `models` and/or `templates`
 * ```js
 * {
 *	models: [
 *		{ name: 'model-name', data: '' }
 *	],
 *	templates: [
 *		{ name: 'template-name', string: '' }
 *	]
 * }
 * ```
 * @memberof Mole
 * @property {Array} models A list of models
 * @property {Array} templates A list of templates
 */
var Peripherals = function Peripherals() {
  _classCallCheck(this, Peripherals);

  this.model = [];
  this.template = [];
};

var _default = Peripherals;
exports["default"] = _default;
module.exports = exports.default;