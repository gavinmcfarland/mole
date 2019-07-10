import _ from "lodash";
import v from 'voca';

export default function({config, output}) {

	// Using template literals
// 	var str = `[class*="ct"] {
// 	color: var(--color);
// 	background-color: var(--background-color);
// }\n`

// 	str += `.ct {`;

// 	_.each(config.theme.color, function(value, key) {
// 		key = v.kebabCase(key)
// 		str += `\n\t--${key}: ${value};`
// 	});

// 	str += `\n}`;

// 	str += `\n.ct {`

// 	_.each(config.theme.color, function(value, key) {
// 		key = v.kebabCase(key)
// 		str += `\n\t--${key}: ${value};`
// 	});

// 	str += `\n}`;

	// Using Handlebars

	var template = `[class*="ct"] {
	color: var(--color);
	background-color: var(--background-color);
}
.ct {
{\{#each color}}
	{{@key}}: {{this}};
{\{/each}}
}`;

	const colors = _.reduce(config.theme.color, function (acc, value, key) {
		return {
			...acc,
			[v.kebabCase(key)]: value,
		}
	}, {})

	return output(template, {color: colors});
}
