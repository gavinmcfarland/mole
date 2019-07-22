"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// export default function(data, ...args) {
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
function createObject(key, children, i) {
  var obj = _objectSpread({
    value: key
  }, children);

  return obj;
}

function _default(data) {
  function newObject(data) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    // let biggerResult = {}
    // biggerResult.classes = result
    var result = {};
    var parent = '';

    if (args[0]) {
      parent = args[0][i];
      result[parent] = [];
    } else {
      parent = 'items';
      result[parent] = [];
    } // Provide a counter so can tell what iteration


    i++;

    if (_typeof(data) === 'object') {
      _lodash["default"].each(data, function (value, key) {
        result[parent].push(createObject.apply(void 0, [key, newObject.apply(void 0, [value, i].concat(args)), i].concat(args)));
      });
    } else {
      result[parent].push(createObject.apply(void 0, [data, null, i].concat(args)));
    }

    return result;
  }

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return newObject.apply(void 0, [data, 0].concat(args));
}