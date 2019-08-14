"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Data = _interopRequireDefault(require("./Data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// export class Model {
// 	constructor(name, callback) {
// 		this.name = name
// 		// This updates mole.model with changes from plugin
// 		Object.assign(mole.model, Object.getPrototypeOf(callback(mole.model)))
// 		// console.log(mole.model)
// 	}
// }

/**
 * Creates a new user defined model
 * @memberof Mole.Peripherals
 * @param {string} name Name of the model
 * @param {Mole.Peripherals.Model~function|object} func A callback that returns an object for the model
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 *
 * @example
 * // Example using `add()` method
 * mole.add(
 * 	new Model('model-name', function(data) {
 * 		return // The object you'd like to return which sets the data model
 * 	})
 * )
 */
var Model = function Model(name, func) {
  _classCallCheck(this, Model);

  var data = new _Data["default"]();
  /**
   * Callback for returning a data model
   * @callback Mole.Peripherals.Model~function
   * @param {object} data - Access to the data model
   * @param {object} theme - Access the original theme data
   * @return {object} An object which replaces or adds to the existing `data` model
   */

  this.name = name;
  this.data = func({
    data: data
  }); // this.model = dataModel
  // this.func = Object.assign(
  // 	dataModel,
  // 	Object.getPrototypeOf(pluginFunction()(dataModel))
  // )
};

var _default = Model;
exports["default"] = _default;
module.exports = exports.default;