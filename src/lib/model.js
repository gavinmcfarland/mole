import Data from './Data'

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
 * @param {Mole.Model~function|object} model Provide either a function or a object for the data model
 * @param {string} [output] Provide a named output the model should attach to
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

const data = new Data()

class Model {
	constructor(name, func) {
		/**
		 * Callback for returning a data model
		 * @callback Mole.Model~function
		 * @param {object} data - Access to the data model
		 * @param {object} theme - Access the original theme data
		 * @return {object} An object which replaces or adds to the existing `data` model
		 */
		this.name = name
		this.data = func(data)
		// this.model = dataModel
		// this.func = Object.assign(
		// 	dataModel,
		// 	Object.getPrototypeOf(pluginFunction()(dataModel))
		// )
	}
}

export default Model
