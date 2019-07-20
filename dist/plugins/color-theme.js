"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _voca = _interopRequireDefault(require("voca"));

var _createDataMap = _interopRequireDefault(require("../util/create-data-map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(_ref) {
  var config = _ref.config,
      output = _ref.output,
      property = _ref.property;
  // // property('padding')
  var rules = (0, _createDataMap["default"])(config.theme.color.theme, {
    type: ['class', 'var', 'value'],
    something: 'test'
  });
  console.log(JSON.stringify(rules, null, 4)); // var rules = _.reduce(
  // 	config.theme.color.theme,
  // 	function(acc, value, key) {
  // 		value = _.reduce(
  // 			value,
  // 			function(acc, value, key) {
  // 				return {
  // 					...acc,
  // 					[v.kebabCase(key)]: value
  // 				}
  // 			},
  // 			{}
  // 		)
  // 		return {
  // 			...acc,
  // 			[v.kebabCase(key)]: value
  // 		}
  // 	},
  // 	{}
  // )
  // 	var baseRule = `\
  // [class*="ct"] {
  // 	color: var(--color);
  // 	background-color: var(--background-color);
  // }`
  // var themeRules = `\
  // {{#each data}}
  // .cts-{{@key}} {
  // {{#each this}}
  // 	{{@key}}: {{this}};
  // {{/each}}
  // }
  // {{/each}}`

  var themeRules = "\t{{#each this}}\n\t.text-{{value}} {\n\t\t{{#children}}\n\t\t{{value}}: {{#children}}{{value}}{{/children}}\n\t\t{{/children}}\n\t}\n\t{{/each}}"; // var themeRules = `\
  // {{#each class}}
  // .text-{{value}} {
  // 	{{#var}}
  // 	{{value}}: {{#value}}{{value}}{{/value}}
  // 	{{/var}}
  // }
  // {{/each}}`
  // output(baseRule)

  output(themeRules, rules);
}