"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  theme: 'index.js',
  platforms: [{
    css: {
      output: {
        path: 'test/src/css/index.css',
        template: 'css',
        data: ''
      }
    }
  }, {
    ios: {
      output: {
        path: 'test/src/ios/index.css',
        template: 'ios'
      }
    }
  }],
  plugins: []
};
exports["default"] = _default;