import _ from 'lodash'

// export default function(data, ...args) {
// 	args = args.reverse()

// 	function generateData(data, i = 0, ...args) {
// 		i++
// 		let result = []
// 		let type

// 		for (let x = 0; x < args.length; x++) {
// 			type = args[x]
// 		}
// 		if (typeof data === 'object') {
// 			_.reduce(
// 				data,
// 				function(acc, value, key) {
// 					let obj = {
// 						...acc,
// 						value: key,
// 						type: type,
// 						children: generateData(value, i, ...args)
// 					}
// 					result.push(obj)
// 					return obj
// 				},
// 				{}
// 			)
// 		} else {
// 			result.push({
// 				value: data,
// 				type: type
// 			})
// 		}

// 		return result
// 	}

// 	return generateData(data, 0, ...args)
// }

// export default function(data, ...args) {
// 	args = args.reverse()

// 	let children
// 	let object = {}

// 	function generateData(data, i = 0, ...args) {
// 		i++
// 		let result = []

// 		for (let x = 0; x < args.length; x++) {
// 			object.type = args[x]
// 		}

// 		if (children !== undefined) {
// 			object.children = children
// 		}

// 		if (typeof data === 'object') {
// 			_.reduce(
// 				data,
// 				function(acc, thing, key) {
// 					object.value = key
// 					object.children = generateData(thing, i, ...args)
// 					// console.log(object)

// 					return result.push(object)
// 				},
// 				{}
// 			)
// 		} else {
// 			result.push(object)
// 		}

// 		return result
// 	}

// 	return generateData(data, 0, ...args)
// }

export default function(data, ...args) {
	function generateData(data, ...args) {
		// i++
		let result = []
		let object = {}
		let type = ''

		for (let x = 0; x < args.length; x++) {
			type = args[x]
		}

		if (typeof data === 'object') {
			_.each(data, function(value, key) {
				object.value = key
				object.type = type
				result.push(object)
				object.children = generateData(value, ...args)
			})
		} else {
			object.value = data
			object.type = type
			result.push(object)
		}

		return result
	}

	return generateData(data, ...args)
}
