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

function createObject(key, children, i, ...args) {
	let obj = {
		value: key
	}
	if (args[0]) {
		for (const [key, value] of Object.entries(args[0])) {
			if (Array.isArray(value)) {
				obj[key] = value[i]
			} else {
				obj[key] = value
			}
		}
	}
	if (children) {
		obj.children = children
	}

	return obj
}

export default function(data, ...args) {
	function newObject(data, i = -1, ...args) {
		let result = []

		// Provide a counter so can tell what iteration
		i++
		if (typeof data === 'object') {
			_.each(data, function(value, key) {
				result.push(
					createObject(key, newObject(value, i, ...args), i, ...args)
				)
			})
		} else {
			result.push(createObject(data, null, i, ...args))
		}

		return result
	}

	return newObject(data, -1, ...args)
}
