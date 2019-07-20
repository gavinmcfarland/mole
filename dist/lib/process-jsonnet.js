"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonnet = _interopRequireDefault(require("@unboundedsystems/jsonnet"));

var _defaultConfig = _interopRequireDefault(require("../default-config.js"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// console.log(thing)
var newThing = _defaultConfig["default"].toString();

console.log(_defaultConfig["default"]);

var myTemplate = _fs["default"].readFileSync(__dirname + '/../simple.jsonnet').toString();

console.log(myTemplate); // You only need to create one Jsonnet object and can then call eval()
// repeatedly.

var jsonnetVm = new _jsonnet["default"].Jsonnet();
var output = jsonnetVm.eval(myTemplate); // console.log(JSON.stringify(output, null, 2))
// The jsonnetVm object needs to be destroyed manually.

jsonnetVm.destroy();
var _default = output;
exports["default"] = _default;