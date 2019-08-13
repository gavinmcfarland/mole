// import dataModel from './data-model'

/**
 * Creates a new user defined template
 * @memberof Mole.Peripherals
 * @param {string} name Name of the template
 * @param {Mole.Peripherals.Template~function|string} template A callback that returns a string for the template
 * @param {string} [output] A named output the template should attach to
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 * @example
 * // Example using `add()` method
 * mole.add(
 * 	new Template('template-name', function(model) {
 * 		return // The string you'd like to return to be parsed
 * 	})
 * )
 */
class Template {
	constructor(name, pluginFunction) {
		/**
		 * Callback for returning a template string
		 * @callback Mole.Peripherals.Template~function
		 * @param {Object} data - Access to the data model
		 * @param {Object} theme - Access the original theme data
		 * @return {String} Returns a string which is rendered using a templating engine
		 */
		this.name = name
		this.string = pluginFunction()
	}
}

export default Template
