"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Mole = _interopRequireDefault(require("./lib/Mole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var env = process.env.NODE_ENV || 'dev';
var mole = new _Mole["default"](); // console.log(mole)

if (env === 'dev') {
  mole.add('model', 'model-name', function (_ref) {
    var data = _ref.data;
    data.color.red = "#FF00000";
    return data;
  });
  mole.add('template', 'template-name', function () {
    return "The color red is {{color.red}}";
  });
  mole.build();
  console.log(mole);
}

var _default = mole;
exports["default"] = _default;
module.exports = exports.default;