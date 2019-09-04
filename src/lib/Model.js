// import theme from './Theme'
import clone from 'lodash.clonedeep'

// console.log(theme)

// export class Model {
// 	constructor(name, callback) {
// 		this.name = name
// 		// This updates mole.model with changes from plugin
// 		Object.assign(mole.model, Object.getPrototypeOf(callback(mole.model)))
// 		// console.log(mole.model)
// 	}
// }

/**
 * Creates a new user defined model
 * @memberof Mole.Peripherals
 * @param {string} name Name of the model
 * @param {Mole.Peripherals.Model~function|object} func A callback that returns an object for the model
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 *
 * @example
 * // Example using `add()` method
 * mole.add(
 * 	new Model('model-name', function(data) {
 * 		return // The object you'd like to return which sets the data model
 * 	})
 * )
 */

class Model {
	constructor(name, func, theme, data) {
		theme = clone(theme)

		deepFreeze(theme)

		this.name = name
		this.data = func({ data, theme })
	}
}

function deepFreeze(object) {

	// Retrieve the property names defined on object
	var propNames = Object.getOwnPropertyNames(object);

	// Freeze properties before freezing self

	for (let name of propNames) {
		let value = object[name];

		object[name] = value && typeof value === "object" ?
			deepFreeze(value) : value;
	}

	return Object.freeze(object);
}

export default Model
