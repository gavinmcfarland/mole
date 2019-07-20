"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonnet = _interopRequireDefault(require("@unboundedsystems/jsonnet"));

var _defaultConfig = _interopRequireDefault(require("../default-config.js"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var myTemplate = _fs["default"].readFileSync(__dirname + '/../default-config.jsonnet').toString();

var imports = _fs["default"].readFileSync(__dirname + '/../cocktail.jsonnet').toString(); // You only need to create one Jsonnet object and can then call eval()
// repeatedly.


var jsonnetVm = new _jsonnet["default"].Jsonnet();
var output2 = jsonnetVm.eval(imports);
console.log(output2);
var output = jsonnetVm.eval(myTemplate);
jsonnetVm.destroy();
var _default = output;
exports["default"] = _default;