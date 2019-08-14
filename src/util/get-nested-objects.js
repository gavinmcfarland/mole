import _ from 'lodash'
import regeneratorRuntime from 'regenerator-runtime'

// This function will get property at desired level
export default function(obj, depth) {
	function iterObj(obj, depth, i = 0) {
		i++
		_.each(obj, function(value, property) {
			while (i < depth) {
				if (typeof obj[property] === 'object') {
					return iterObj(obj[property], depth, i)
				} else {
					return false
				}
			}
			if (i === depth) {
				arr.push({
					[property]: value
				})
			}
			return obj
		})

		// console.log(arr)

		if (i === depth) {
			return arr
		}
	}

	let arr = []

	iterObj(obj, depth)

	return arr
}

// function* foo() {
// 	yield getNestedObjects(example, 1)
// 	yield getNestedObjects(example, 2)
// 	yield getNestedObjects(example, 3)
// }
// const iter = foo()

// for (var v of iter) {
// 	console.log(v) // 1 2 3
// }

// // console.log(getNestedObjects(example, 1))

// // console.log(getArrayOfObjects(example, 2))

// // depth(test)

// // console.log('---------------------')

// const stuff = {
// 	[Symbol.iterator](test) {
// 		let step = 0
// 		const iterator = {
// 			next() {
// 				step++
// 				if (step === 1) {
// 					return getArrayOfObjects(test, 1)
// 				} else if (step === 2) {
// 					return getArrayOfObjects(test, 2)
// 				} else if (step === 3) {
// 					return {
// 						value: 'Iterator',
// 						done: 'false'
// 					}
// 				}
// 				return {
// 					value: undefined,
// 					done: 'true'
// 				}
// 			}
// 		}
// 		return iterator
// 	}
// }
// var iterator = stuff[Symbol.iterator](example)

// console.log(iterator.next()) // {value: 'Example', done: 'false'}
// console.log(iterator.next()) // {value: 'for', done: 'false'}
// console.log(iterator.next()) // {value: 'iterator', done: 'false'}
// console.log(iterator.next()) // {value: undefined, done: 'false'}

// Use below to create an iterator
// function* foo(obj, i = 1) {
// 	// let result = {}
// 	while (i <= objectDepth(obj)) {
// 		yield getNestedObjects(obj, i)
// 		i++
// 	}
// }
// const iter = foo(config.theme.color.theme)

// This creates a method which allows you to get the end result of all iterations
// iter.result = function() {
// 	let obj = []
// 	for (var v of iter) {
// 		// console.log(v)
// 		obj.push(v)
// 	}
// 	return obj
// }
// console.log(iter.result())

// Output each iteration one at a tie
// // for (var v of iter) {
// // 	console.log(v) // 1 2 3
// // }
