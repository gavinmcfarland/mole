"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
function _default(data) {
  function generateData(data) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    // i++
    var result = [];
    var object = {};
    var type = '';

    var _loop = function _loop(x) {
      if (_typeof(data) === 'object') {
        _lodash["default"].each(data, function (value, key) {
          object.value = key;
          object.type = args[x];
          result.push(object);
          object.children = generateData.apply(void 0, [value].concat(args));
        });
      } else {
        object.value = data;
        object.type = args[x];
        result.push(object);
      }
    };

    for (var x = 0; x < args.length; x++) {
      _loop(x);
    }

    return result;
  }

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return generateData.apply(void 0, [data].concat(args));
}