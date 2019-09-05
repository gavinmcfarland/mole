// import theme from './Theme'
import clone from 'lodash.clonedeep'

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
	constructor(name, func, theme, data) {
		/**
		 * Callback for returning a template string
		 * @callback Mole.Peripherals.Template~function
		 * @param {Object} data - Access to the data model
		 * @param {Object} theme - Access the original theme data
		 * @return {String} Returns a string which is rendered using a templating engine
		 */

		theme = clone(theme)

		deepFreeze(theme)
		this.name = name
		this.string = func(theme, data)
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

export default Template
