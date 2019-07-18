import _ from 'lodash'
// import v from 'voca'
import getNestedObjects from '../util/get-nested-objects.js'
import objectDepth from '../util/object-depth.js'

export default function({ config, output }) {
	function* foo(obj, i = 1) {
		while (i <= objectDepth(obj)) {
			yield getNestedObjects(obj, i)
			i++
		}
	}

	const iter = foo(config.theme.color.theme)

	// console.log(iter.next().value)

	let newThing = []

	_.each(iter.next().value, function(level) {
		_.each(level, function(token, key) {
			newThing.push({
				value: key,
				type: 'class',
				children: []
			})
			_.each(token, function(value, key) {
				// newThing[.children.push({
				// 	value: key,
				// 	type: 'var'
				// })
			})
		})
	})

	// console.log(newThing)

	// const result = (function() {
	// 	let obj = []
	// 	for (var v of iter) {
	// 		obj.push(v)
	// 	}
	// 	return obj
	// })()

	// -------------------------------------------------------------

	// console.log('------')
	// console.log(getNestedObjects(config.theme.color.theme, 1))

	// _.each(result, function(level) {
	// 	console.log('----- start ----')
	// 	_.each(level, function(token) {
	// 		_.each(token, function(value, key) {
	// 			console.log(key)
	// 		})
	// 	})
	// })
}
