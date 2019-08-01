"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var _cloneModel = require("./clone-model.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function Model(name, callback) {
  _classCallCheck(this, Model);

  this.name = name;
  this.string = callback(_cloneModel.model, _cloneModel.theme);
};

exports.Model = Model;