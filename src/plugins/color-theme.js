import _ from "lodash";
import v from 'voca';

export default function(config) {
	var str = `.ct {`;

	_.each(config.theme.color, function(value, key) {
		key = v.kebabCase(key)
		str += `\n\t--${key}: ${value};`
	});

	str += `\n}`;

	str += `\n.ct {`

	_.each(config.theme.color, function(value, key) {
		key = v.kebabCase(key)
		str += `\n\t--${key}: ${value};`
	});

	str += `\n}`;

	return str;
}
