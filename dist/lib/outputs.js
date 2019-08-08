"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Outputs = void 0;

var _Output = _interopRequireDefault(require("./Output"));

var _Config = _interopRequireDefault(require("./Config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('outputs');

var Outputs = function Outputs() {
  _classCallCheck(this, Outputs);

  var config = new _Config["default"]();
  return normalise(config.output).map(function (output) {
    output = new _Output["default"](output);
  });
};

exports.Outputs = Outputs;

function normalise(outputs) {
  /*
  {
  	output: [
  		{
  			template: ['template-name'],
  			model: ['tokens', 'mixins'].
  			dir: 'templates/',
  			file: 'style.css',
  			path: 'templates/style.css'
  		}
  	]
  }
  */
  return outputs.map(function (output) {
    // Check for name
    var name;

    if (Object.keys(output).length === 1) {
      name === Object.keys(output)[0];
    } // Check for model


    var model;

    if (output.model) {
      model = output.model;
    } else if (config.template) {
      model = config.template;
    } // Check for template


    var template;

    if (output.template) {
      template = output.template;
    } else if (config.template) {
      template = config.template;
    } // Check for directory


    var dir;

    if (output.dir) {
      if (config.dir) {
        dir = config.dir + output.dir;
      } else {
        dir = output.dir;
      }
    } else if (config.dir) {
      dir = config.dir;
    } else {
      dir = '';
    } // Check for file


    var file = output.file;
    return Object.assign({}, name, model, template, dir, file);
  });
}

var _default = Outputs;
exports["default"] = _default;