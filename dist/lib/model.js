"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dataModel = _interopRequireDefault(require("./data-model"));

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
var Model = function Model(name, pluginFunction) {
  _classCallCheck(this, Model);

  pluginFunction(_dataModel["default"]);
  this.name = name;
  this.model = _dataModel["default"]; // this.func = Object.assign(
  // 	dataModel,
  // 	Object.getPrototypeOf(pluginFunction()(dataModel))
  // )
}; // export default dataModel


exports["default"] = Model;
module.exports = exports.default;