import _ from 'lodash'
import v from 'voca'

export default function({ config, output, property }) {
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
