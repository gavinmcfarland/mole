"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  theme: 'index.js',
  platforms: [{
    css: {
      data: {
        transform: 'kebabcase'
      },
      output: {
        dir: 'src/css/',
        file: 'index.css',
        template: 'css'
      }
    }
  }, {
    ios: {
      data: {
        transform: 'kebabcase'
      },
      output: {
        dir: 'src/ios/',
        file: 'index.css',
        template: 'css'
      }
    }
  }],
  plugins: []
};
exports["default"] = _default;