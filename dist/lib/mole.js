"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Outputs = _interopRequireDefault(require("./Outputs"));

var _Config = _interopRequireDefault(require("./Config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mole = function Mole() {
  _classCallCheck(this, Mole);
} // this.outputs = new Outputs()
// this.files = parse()
// model(name, func) {
// 	this.models = []
// 	this.models.push(new Model(name, func))
// }
// template(name, func) {
// 	this.templates.push(new Template(name, func))
// 	this.files = this.genFiles()
// }
// parse() {
// 	for (let output of this.outputs) {
// 		// render()
// 	}
// }
// build() {
// 	for (let file of this.files) {
// 		fs.outputFile(file.path, file.content, function(err) {
// 			if (err) console.log(err) // => null
// 			fs.readFile(file.path, 'utf8', function(err, data) {
// 				console.log(data) // => hello!
// 			})
// 		})
// 	}
// }
; // function render() {}


var _default = Mole;
exports["default"] = _default;
module.exports = exports.default;