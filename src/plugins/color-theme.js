import _ from 'lodash'
import v from 'voca'
import process from '../util/create-data-map.js'

export default function({ config, output, property }) {
	// // property('padding')

	let rules = process(config.theme.color.theme, {
		type: ['class', 'var', 'value'],
		something: 'test'
	})

	console.log(JSON.stringify(rules, null, 4))

	// var rules = _.reduce(
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

	var themeRules = `\
	{{#each this}}
	.text-{{value}} {
		{{#children}}
		{{value}}: {{#children}}{{value}}{{/children}}
		{{/children}}
	}
	{{/each}}`

	// var themeRules = `\
	// {{#each class}}
	// .text-{{value}} {
	// 	{{#var}}
	// 	{{value}}: {{#value}}{{value}}{{/value}}
	// 	{{/var}}
	// }
	// {{/each}}`

	// output(baseRule)

	output(themeRules, rules)
}
