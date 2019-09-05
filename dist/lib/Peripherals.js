"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}/**
 * Creates a list of Peripherals which contain `models` and/or `templates`
 * ```js
 * {
 *	models: [
 *		{ name: 'model-name', data: '' }
 *	],
 *	templates: [
 *		{ name: 'template-name', string: '' }
 *	]
 * }
 * ```
 * @memberof Mole
 * @property {Array} models A list of models
 * @property {Array} templates A list of templates
 */var Peripherals=function a(){_classCallCheck(this,a),this.model=[],this.template=[]},peripherals=new Peripherals,_default=peripherals;exports["default"]=_default,module.exports=exports.default;