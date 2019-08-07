"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import mole from './mole'
// export class Template {
// 	constructor(name, callback) {
// 		this.name = name
// 		this.string = callback(mole.model, mole.theme)
// 		this.result = this.render()
// 	}
// 	render() {
// 		if (this.string) {
// 			return this.string
// 		}
// 	}
// }
var Template = function Template(name, callback) {
  _classCallCheck(this, Template);

  this.name = name;
  this.func = callback();
};

exports["default"] = Template;
module.exports = exports.default;