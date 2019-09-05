"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=_default;var _lodash=_interopRequireDefault(require("lodash")),_regeneratorRuntime=_interopRequireDefault(require("regenerator-runtime"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}// This function will get property at desired level
function _default(a,b){function c(a,b){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;// console.log(arr)
if(e++,_lodash["default"].each(a,function(f,g){for(;e<b;)return"object"===_typeof(a[g])&&c(a[g],b,e);return e===b&&d.push(_defineProperty({},g,f)),a}),e===b)return d}var d=[];return c(a,b),d}// function* foo() {
// 	yield getNestedObjects(example, 1)
// 	yield getNestedObjects(example, 2)
// 	yield getNestedObjects(example, 3)
// }
// const iter = foo()
// for (var v of iter) {
// 	console.log(v) // 1 2 3
// }
// // console.log(getNestedObjects(example, 1))
// // console.log(getArrayOfObjects(example, 2))
// // depth(test)
// // console.log('---------------------')
// const stuff = {
// 	[Symbol.iterator](test) {
// 		let step = 0
// 		const iterator = {
// 			next() {
// 				step++
// 				if (step === 1) {
// 					return getArrayOfObjects(test, 1)
// 				} else if (step === 2) {
// 					return getArrayOfObjects(test, 2)
// 				} else if (step === 3) {
// 					return {
// 						value: 'Iterator',
// 						done: 'false'
// 					}
// 				}
// 				return {
// 					value: undefined,
// 					done: 'true'
// 				}
// 			}
// 		}
// 		return iterator
// 	}
// }
// var iterator = stuff[Symbol.iterator](example)
// console.log(iterator.next()) // {value: 'Example', done: 'false'}
// console.log(iterator.next()) // {value: 'for', done: 'false'}
// console.log(iterator.next()) // {value: 'iterator', done: 'false'}
// console.log(iterator.next()) // {value: undefined, done: 'false'}
// Use below to create an iterator
// function* foo(obj, i = 1) {
// 	// let result = {}
// 	while (i <= objectDepth(obj)) {
// 		yield getNestedObjects(obj, i)
// 		i++
// 	}
// }
// const iter = foo(config.theme.color.theme)
// This creates a method which allows you to get the end result of all iterations
// iter.result = function() {
// 	let obj = []
// 	for (var v of iter) {
// 		// console.log(v)
// 		obj.push(v)
// 	}
// 	return obj
// }
// console.log(iter.result())
// Output each iteration one at a tie
// // for (var v of iter) {
// // 	console.log(v) // 1 2 3
// // }
module.exports=exports.default;