"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  var obj = {
    value: key
  };

  if (arguments.length <= 3 ? undefined : arguments[3]) {
    for (var _i = 0, _Object$entries = Object.entries(arguments.length <= 3 ? undefined : arguments[3]); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          _key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (Array.isArray(value)) {
        obj[_key] = value[i];
      } else {
        obj[_key] = value;
      }
    }
  }

  if (children) {
    obj.children = children;
  }

  return obj;
}

function _default(data) {
  function newObject(data) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key3 = 2; _key3 < _len2; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    var result = []; // Provide a counter so can tell what iteration

    i++;

    if (_typeof(data) === 'object') {
      _lodash["default"].each(data, function (value, key) {
        result.push(createObject.apply(void 0, [key, newObject.apply(void 0, [value, i].concat(args)), i].concat(args)));
      });
    } else {
      result.push(createObject.apply(void 0, [data, null, i].concat(args)));
    }

    return result;
  }

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return newObject.apply(void 0, [data, -1].concat(args));
}