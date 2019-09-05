"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _Output=_interopRequireDefault(require("./Output")),_Config=_interopRequireDefault(require("./Config"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}/**
 * Creates a array of outputs which contain contents of `models` and `templates`
 *
 * ```js
 * outputs: [
 *   Output {
 *	  name: 'css',
 *	  model: {
 *				token: {
 *					name: 'colorRed',
 *					value: '#FF0000'
 *				}
 *			}
 *	  template: 'The color red is {{color.red}}',
 *    path: 'styles.css'
 *   } //...
 * ]
 *```
 */var Outputs=function a(b,c){var d=this;_classCallCheck(this,a),this.config=new _Config["default"](c);var e=normaliseOutputs(this.config);return e.map(function(a){return new _Output["default"](a,b,d.config)})};/**
 * Flattens the structure of user defined output so it's easier to work with
 * ```js
 * {
 *	output: [
 *		{
 *			template: ['template-name'],
 *			model: ['tokens', 'mixins'].
 *			dir: 'templates/',
 *			file: 'style.css',
 *			path: 'templates/style.css'
 *		}
 *	]
 * }
 * ```
 * @param {Object} outputs A config with property called output which contains an array
 */function normaliseOutputs(a){var b=a.output;return b.map(function(b){if("undefined"==typeof b)throw new Error("No outputs specified in config");// Check for name
var c="undefined"==typeof b.file?Object.keys(b)[0]:null;// Check for model
var d=b.model?b.model:a.model?a.model:null;// Check for template
var e=b.template?b.template:a.template?a.template:null;// Check for directory
var f=b.dir?a.dir?"."+a.root+a.dir+b.dir:"."+a.root+b.dir:a.dir?"."+a.root+a.dir:"."+a.root+"";// Check for file
var g;return g="undefined"==typeof b.file?b[c].file:b.file,Object.assign({},{name:c,model:d,template:e,dir:f,file:g})})}var _default=Outputs;exports["default"]=_default,module.exports=exports.default;