"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _templateClass = require("./template-class.js");

// TODO: Need to allow user to register templates
var testTemplate = new _templateClass.Template(function () {
  return "{% for class in classes -%}\n\t.{{ class.value | kebabcase}} {\n\t\t{%- include \"var.njk\" -%}\n\t}\n\t{% endfor %}";
});
console.log(testTemplate);
var _default = {
  theme: 'index.js',
  model: ['chars', 'tokens'],
  template: testTemplate,
  output: {
    file: 'styles.css'
  }
};
exports["default"] = _default;