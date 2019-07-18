import _ from 'lodash'

export default function(object, ...args) {
	args = args.reverse()

	function generateData(object, i = 0, ...args) {
		i++
		let arr = []

		let type

		for (let x = 0; x < args.length; x++) {
			type = args[x]
		}
		if (typeof object === 'object') {
			_.reduce(
				object,
				function(acc, value, key) {
					let obj = {
						...acc,
						value: key,
						type: type,
						children: generateData(value, i, ...args)
					}
					return arr.push(obj)
				},
				{}
			)
		} else {
			arr.push({
				value: object,
				type: type
			})
		}
		return arr
	}

	return generateData(object, 0, ...args)
}
