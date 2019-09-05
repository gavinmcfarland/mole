"use strict";var _lodash=_interopRequireDefault(require("lodash"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function ownKeys(a,b){var c=Object.keys(a);return Object.getOwnPropertySymbols&&c.push.apply(c,Object.getOwnPropertySymbols(a)),b&&(c=c.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}// export default function(data, ...args) {
// 	args = args.reverse()
// 	function generateData(data, i = 0, ...args) {
// 		i++
// 		let result = []
// 		let type
// 		for (let x = 0; x < args.length; x++) {
// 			type = args[x]
// 		}
// 		if (typeof data === 'object') {
// 			_.reduce(
// 				data,
// 				function(acc, value, key) {
// 					let obj = {
// 						...acc,
// 						value: key,
// 						type: type,
// 						children: generateData(value, i, ...args)
// 					}
// 					result.push(obj)
// 					return obj
// 				},
// 				{}
// 			)
// 		} else {
// 			result.push({
// 				value: data,
// 				type: type
// 			})
// 		}
// 		return result
// 	}
// 	return generateData(data, 0, ...args)
// }
// export default function(data, ...args) {
// 	args = args.reverse()
// 	let children
// 	let object = {}
// 	function generateData(data, i = 0, ...args) {
// 		i++
// 		let result = []
// 		for (let x = 0; x < args.length; x++) {
// 			object.type = args[x]
// 		}
// 		if (children !== undefined) {
// 			object.children = children
// 		}
// 		if (typeof data === 'object') {
// 			_.reduce(
// 				data,
// 				function(acc, thing, key) {
// 					object.value = key
// 					object.children = generateData(thing, i, ...args)
// 					// console.log(object)
// 					return result.push(object)
// 				},
// 				{}
// 			)
// 		} else {
// 			result.push(object)
// 		}
// 		return result
// 	}
// 	return generateData(data, 0, ...args)
// }
function createObject(a,b){var c=_objectSpread({value:a},b);return c}/**
 * Create a data structure
 * @memberof Mole.Peripherals
 * @param {String} data The nameThe name of the property you want to look up, or create
 * @example
 * {
 * 	value: 'headingColor',
 * 	type: 'var',
 * 	children: [{
 * 		value: 'blue',
 * 		type: 'value'
 * 	}]
 * }
 */function struct(a){function b(a){for(var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,d=arguments.length,e=Array(2<d?d-2:0),f=2;f<d;f++)e[f-2]=arguments[f];// let biggerResult = {}
// biggerResult.classes = result
var g={},h="";return e[0]?(h=e[0][c],g[h]=[]):(h="items",g[h]=[]),c++,"object"===_typeof(a)?_lodash["default"].each(a,function(a,d){g[h].push(createObject.apply(void 0,[d,b.apply(void 0,[a,c].concat(e)),c].concat(e)))}):g[h].push(createObject.apply(void 0,[a,null,c].concat(e))),g}for(var c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];return b.apply(void 0,[a,0].concat(d))}