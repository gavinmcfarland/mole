import data from './Data'
import Theme from './Theme'

/**
 * Creates a new user defined template
 * @memberof Mole.Peripherals
 * @param {string} name Name of the template
 * @param {Mole.Peripherals.Template~function|string} func A callback that returns a string for the template
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 * @example
 * // Example while exporting as module
 * import Template from 'mole'
 *
 * export default new Template('template-name', function(model) {
 * 		return // The string you'd like to return to be parsed
 * 	})
 * )
 */
class Template {
	constructor(name, func, configuration) {
		const theme = new Theme(configuration).parsed
		/**
		 * Callback for returning a template string
		 * @callback Mole.Peripherals.Template~function
		 * @param {Object} data - Access to the data model
		 * @param {Object} theme - Access the original theme data
		 * @return {String} Returns a string which is rendered using a templating engine
		 */
		this.name = name
		this.string = func({ data: data.result, theme })
	}
}

export default Template
