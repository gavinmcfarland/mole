"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function Template(callback) {
  _classCallCheck(this, Template);

  this.output = callback().Output(template, data);
};

console.log(new mole.Template(function () {
  return 'template';
}));