import _ from "lodash";
import v from 'voca';

export default function({config}) {
	var str = ``;

	_.each(config.theme.font.style, function(value, modifier) {

		str += `.font-${modifier} {\n`

		_.each(value, function(value, key) {
			key = v.kebabCase(key)
			str += `\t${key}: ${value};\n`;
		})

		str += `}\n`;

	});

	return str;
}
