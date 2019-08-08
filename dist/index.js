"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mole = _interopRequireDefault(require("./lib/mole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { Mole } from './lib/mole'
// const env = nunjucks.configure()
// import nunjucks from 'nunjucks'
// mole.add(
// 	new Mole.Model('model-name', model => {
// 		return (model.color.red = 'value')
// 	})
// )
// mole.model('model-name', model => {
// 	return (model.color.red = 'value')
// })
// mole.template('template-name', () => {
// 	return "I'm a {{color.red}}"
// })
console.log(_mole["default"]);
var _default = _mole["default"];
exports["default"] = _default;
module.exports = exports.default;