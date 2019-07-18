"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _voca = _interopRequireDefault(require("voca"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _default(_ref) {
  var config = _ref.config,
      output = _ref.output;
  var example = {
    light: {
      color: 'red',
      backgroundColor: 'blue',
      headingColor: 'blue',
      linkColor: 'blue'
    },
    dark: {
      color: 'green',
      backgroundColor: 'pink',
      headingColor: 'blue',
      linkColor: 'blue'
    } // console.log(Object.keys(test.levelOne).length)
    // This function will get property at desired level

  };

  function getArrayOfObjects(obj, depth) {
    function iterObj(obj, depth) {
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      i++;

      _lodash["default"].each(obj, function (value, property) {
        while (i < depth) {
          if (_typeof(obj[property]) === 'object') {
            return iterObj(obj[property], depth, i);
          } else {
            return false;
          }
        } // console.log(value)
        // if (i === depth) {


        arr.push(_defineProperty({}, property, value)); // }

        return obj;
      });

      if (i === depth) {
        return arr;
      }
    }

    var arr = [];
    iterObj(obj, depth);
    return arr;
  } // iterObj(example, 2)
  // console.log(iterObj(example, 1))
  // console.log(arr)


  console.log(getArrayOfObjects(example, 2)); // depth(test)
  // console.log('---------------------')
  // const Iterable = {
  // 	example,
  // 	[Symbol.iterator]() {
  // 		let step = 0
  // 		const iterator = {
  // 			next() {
  // 				step++
  // 				if (step === 1) {
  // 					return {
  // 						value: 'Example',
  // 						done: 'false'
  // 					}
  // 				} else if (step === 2) {
  // 					return {
  // 						value: 'for',
  // 						done: 'false'
  // 					}
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
  // var iterator = Iterable[Symbol.iterator]()
  // console.log(iterator.next()) // {value: 'Example', done: 'false'}
  // console.log(iterator.next()) // {value: 'for', done: 'false'}
  // console.log(iterator.next()) // {value: 'iterator', done: 'false'}
  // console.log(iterator.next()) // {value: undefined, done: 'false'}
}