import dataModel from './data-model'

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
 * @memberof Mole
 * @param {string} name Name of the model
 * @param {function|object} model Provide either a function or a object for the data model
 * @param {string} [output] Provide a named output the model should attach to
 * @example
 * // Example using `add()` method
 * mole.add(
 * 	new Model('model-name', function(model) {
 * 		return // The object you'd like to return which sets the data model
 * 	})
 * )
 */

class Model {
	constructor(name, pluginFunction) {
		pluginFunction(dataModel)
		this.name = name
		this.model = dataModel
		// this.func = Object.assign(
		// 	dataModel,
		// 	Object.getPrototypeOf(pluginFunction()(dataModel))
		// )
	}
}

// export default dataModel
