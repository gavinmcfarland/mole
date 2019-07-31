"use strict";

var _function = _interopRequireDefault(require("./function"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('adds 1 + 2 to equal 3', function () {
  expect((0, _function["default"])(1, 2)).toBe(3);
});