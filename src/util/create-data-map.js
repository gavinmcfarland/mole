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
		value: key,
		...children
	}

	return obj
}

/**
 * Create a data structure
 * @memberof Mole.Peripherals
 * @param {String} data The nameThe name of the property you want to look up, or create
 * @example
 * {
 * 	value: 'headingColor',
 * 	type: 'var',
 * 	children: [{
 * 		value: 'blue',
 * 		type: 'value'
 * 	}]
 * }
 */
function struct(data, ...args) {
	function newObject(data, i = 0, ...args) {
		// let biggerResult = {}
		// biggerResult.classes = result

		let result = {}

		let parent = ''

		if (args[0]) {
			parent = args[0][i]
			result[parent] = []
		} else {
			parent = 'items'
			result[parent] = []
		}
		// Provide a counter so can tell what iteration
		i++
		if (typeof data === 'object') {
			_.each(data, function(value, key) {
				result[parent].push(
					createObject(key, newObject(value, i, ...args), i, ...args)
				)
			})
		} else {
			result[parent].push(createObject(data, null, i, ...args))
		}

		return result
	}

	return newObject(data, 0, ...args)
}
