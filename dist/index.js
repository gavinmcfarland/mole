"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireDefault(require("./lib/env"));

var _Mole = _interopRequireDefault(require("./lib/Mole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mole = new _Mole["default"](); // console.log(mole)

if (_env["default"] === 'dev') {
  mole.add('model', 'model-name', function (_ref) {
    var data = _ref.data;
    data.color.red = "#FF00000";
    return data;
  });
  mole.add('template', 'template-name', function (_ref2) {
    var data = _ref2.data;
    return "The color red is ".concat(data.color.red);
  });
  mole.build();
  console.log(mole);
}

var _default = mole;
exports["default"] = _default;
module.exports = exports.default;