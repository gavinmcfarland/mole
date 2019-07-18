"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _voca = _interopRequireDefault(require("voca"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(_ref) {
  var config = _ref.config,
      output = _ref.output,
      property = _ref.property;

  // // property('padding')
  // let token = config.theme.color.theme
  // function addValue(str) {
  // 	return [
  // 		{
  // 			value: str,
  // 			type: 'value'
  // 		}
  // 	]
  // }
  // function addVar(object) {
  // 	let arr = []
  // 	_.reduce(
  // 		object,
  // 		function(acc, value, key) {
  // 			let obj = {
  // 				...acc,
  // 				value: key,
  // 				type: 'var',
  // 				children: addValue(value)
  // 			}
  // 			return arr.push(obj)
  // 		},
  // 		{}
  // 	)
  // 	return arr
  // }
  // function addProp(object) {
  // 	if (typeof object === 'object') {
  // 		let arr = []
  // 		_.reduce(
  // 			object,
  // 			function(acc, value, key) {
  // 				let obj = {
  // 					...acc,
  // 					value: key,
  // 					type: 'class',
  // 					children: addVar(value)
  // 				}
  // 				return arr.push(obj)
  // 			},
  // 			{}
  // 		)
  // 		return arr
  // 	}
  // }
  // console.log('---------')
  // console.log(JSON.stringify(addProp(token), null, 4))
  var data = _lodash["default"].reduce(config.theme.color.theme, function (acc, value, key) {
    value = _lodash["default"].reduce(value, function (acc, value, key) {
      return _objectSpread({}, acc, _defineProperty({}, _voca["default"].kebabCase(key), value));
    }, {});
    return _objectSpread({}, acc, _defineProperty({}, _voca["default"].kebabCase(key), value));
  }, {});

  var baseRule = "[class*=\"ct\"] {\n\tcolor: var(--color);\n\tbackground-color: var(--background-color);\n}";
  var themeRules = "{{#each data}}\n.ct-{{@key}} {\n{{#each this}}\n\t{{@key}}: {{this}};\n{{/each}}\n}\n{{/each}}";
  output(baseRule);
  output(themeRules, {
    data: data
  });
}