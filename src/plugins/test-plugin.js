import _ from 'lodash'
import v from 'voca'

export default function({ config, output }) {
	let example = {
		light: {
			color: 'red',
			backgroundColor: 'blue',
			headingColor: 'blue',
			linkColor: 'blue'
		},
		dark: {
			color: 'green',
			backgroundColor: 'pink',
			headingColor: 'blue',
			linkColor: 'blue'
		}
	}

	// console.log(Object.keys(test.levelOne).length)

	// This function will get property at desired level
	function getArrayOfObjects(obj, depth) {
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

				arr.push({
					[property]: value
				})

				return obj
			})

			if (i === depth) {
				return arr
			}
		}

		let arr = []

		iterObj(obj, depth)

		return arr
	}

	console.log(getArrayOfObjects(example, 2))

	// depth(test)

	// console.log('---------------------')

	const Iterable = {
		example,
		[Symbol.iterator]() {
			let step = 0
			const iterator = {
				next() {
					step++
					if (step === 1) {
						return {
							value: 'Example',
							done: 'false'
						}
					} else if (step === 2) {
						return {
							value: 'for',
							done: 'false'
						}
					} else if (step === 3) {
						return {
							value: 'Iterator',
							done: 'false'
						}
					}
					return {
						value: undefined,
						done: 'true'
					}
				}
			}
			return iterator
		}
	}
	var iterator = Iterable[Symbol.iterator]()
	console.log(iterator.next()) // {value: 'Example', done: 'false'}
	console.log(iterator.next()) // {value: 'for', done: 'false'}
	console.log(iterator.next()) // {value: 'iterator', done: 'false'}
	console.log(iterator.next()) // {value: undefined, done: 'false'}
}
