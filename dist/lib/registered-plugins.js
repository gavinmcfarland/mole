"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _thing = _interopRequireDefault(require("../plugins/thing1"));

var _chars = _interopRequireDefault(require("../plugins/chars"));

var _tokens = _interopRequireDefault(require("../plugins/tokens"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var plugins = {};
plugins.templates = [_thing["default"]];
plugins.models = [_chars["default"], _tokens["default"]];
var _default = plugins;
exports["default"] = _default;