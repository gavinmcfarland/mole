import _ from "lodash";
import v from 'voca';

export default function({config, output}) {

	var data = _.reduce(config.theme.color.theme, function (acc, value, key) {
		value = _.reduce(value, function (acc, value, key) {
			return {
				...acc,
				[v.kebabCase(key)]: value,
			}
		}, {})
		return {
			...acc,
			[v.kebabCase(key)]: value,
		}
	}, {})

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
{{/each}}`;

	output(baseRule);
	output(themeRules, {data: data});
}
