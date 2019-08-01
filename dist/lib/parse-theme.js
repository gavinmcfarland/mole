"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defaultConfig = _interopRequireDefault(require("./default-config.js"));

var _index = _interopRequireDefault(require("../theme/index.js"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import jsonnet from '@unboundedsystems/jsonnet'
// const myTemplate = fs
// 	.readFileSync(__dirname + '/../default-config.jsonnet')
// 	.toString()
// const imports = fs.readFileSync(__dirname + '/../cocktail.jsonnet').toString()
// // You only need to create one Jsonnet object and can then call eval()
// // repeatedly.
// const jsonnetVm = new jsonnet.Jsonnet()
// const output2 = jsonnetVm.eval(imports)
// console.log(output2)
var output = _index["default"]; // const output = jsonnetVm.eval(myTemplate)
// jsonnetVm.destroy()

var _default = output;
exports["default"] = _default;