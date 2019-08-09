import dataModel from './data-model'

/**
 * Creates a new user defined template
 * @memberof Mole
 * @param {string} name Name of the template
 * @param {function|string} template Provide either a function or a string for the template
 * @param {string} [output] Provide a named output the template should attach to
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
		this.name = name
		this.template = pluginFunction()
	}
}
