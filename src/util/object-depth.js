import _ from 'lodash'

export default function objectDepth(obj, i = 0) {
	for (var property in obj) {
		i++
		if (typeof obj[property] === 'object') {
			return objectDepth(obj[property], i)
		} else {
			// return i
		}
		return i
	}
	return i
}
