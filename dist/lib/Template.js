"use strict";var _lodash=_interopRequireDefault(require("lodash.clonedeep"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}/**
 * Creates a new user defined template
 * @memberof Mole.Peripherals
 * @param {string} name Name of the template
 * @param {Mole.Peripherals.Template~function|string} func A callback that returns a string for the template
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 * @example
 * // Example while exporting as module
 * import Template from 'mole'
 *
 * export default new Template('template-name', function(model) {
 * 		return // The string you'd like to return to be parsed
 * 	})
 * )
 */var Template=function a(b,c,d,e){/**
		 * Callback for returning a template string
		 * @callback Mole.Peripherals.Template~function
		 * @param {Object} data - Access to the data model
		 * @param {Object} theme - Access the original theme data
		 * @return {String} Returns a string which is rendered using a templating engine
		 */_classCallCheck(this,a),d=(0,_lodash["default"])(d),deepFreeze(d),this.name=b,this.string=c(d,e)};function deepFreeze(a){// Retrieve the property names defined on object
var b=Object.getOwnPropertyNames(a),c=!0,d=!1,e=void 0;// Freeze properties before freezing self
try{for(var f,g=b[Symbol.iterator]();!(c=(f=g.next()).done);c=!0){var h=f.value,i=a[h];a[h]=i&&"object"===_typeof(i)?deepFreeze(i):i}}catch(a){d=!0,e=a}finally{try{c||null==g["return"]||g["return"]()}finally{if(d)throw e}}return Object.freeze(a)}var _default=Template;exports["default"]=_default,module.exports=exports.default;