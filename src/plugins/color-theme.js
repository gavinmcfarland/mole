import _ from 'lodash'
import v from 'voca'
import dataMap from '../util/create-data-map.js'

export default function({ config, output, property }) {
	// // property('padding')

	let data2 = dataMap(config.theme.color.theme, {
		type: ['class', 'var', 'value'],
		something: 'test'
	})

	data2

	// console.log(data2)

	console.log(JSON.stringify(data2, null, 4))

	var data = _.reduce(
		config.theme.color.theme,
		function(acc, value, key) {
			value = _.reduce(
				value,
				function(acc, value, key) {
					return {
						...acc,
						[v.kebabCase(key)]: value
					}
				},
				{}
			)
			return {
				...acc,
				[v.kebabCase(key)]: value
			}
		},
		{}
	)

	var baseRule = `\
[class*="ct"] {
	color: var(--color);
	background-color: var(--background-color);
}`
	var themeRules = `\
{{#each data}}
.ct-{{@key}} {
{{#each this}}
	{{@key}}: {{this}};
{{/each}}
}
{{/each}}`

	output(baseRule)
	output(themeRules, {
		data: data
	})
}
