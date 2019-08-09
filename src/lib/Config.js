/**
 * Provides config settings for main application to use
 *
 * ```js
 * // mole.config.js
 * export default {
 * 	theme: 'theme/',
 * 	model: ['chars', 'tokens'],
 * 	template: 'templates/',
 * 	output: [
 * 		{ css: { file: 'styles.css' } },
 * 		{ ios: { file: 'styles.h' } },
 * 		{ android: { file: 'styles.xml' } }
 * 	]
 * }
 * ```
 * @memberof Mole
 * @example
 * {
	theme: 'theme/',
	model: [ 'model-name' ],
	template: [ 'templates/' ],
	output: [
		{ css: { file: 'styles.css' } },
		{ ios: { file: 'styles.h' } },
		{ android: { file: 'styles.xml' } }
	]
}
 */

/**
 * Path to config file
 * @member
 * @default path './mole.config.js'
 */
const config = require(process.cwd() + '/mole.config')

class Config {
	constructor() {
		return normaliseConfig(config)
	}
}

/**
 * Normalises user's config for easier use.
 * @param {Object} config The properties for the config
 */
function normaliseConfig(config) {
	/*
	1. Normalise the config:
		1. Put outputs into an array
		2. Put models and templates into arrays
	*/

	;
	['model', 'template', 'output'].forEach(function(current) {
		config[current] = putValuesIntoArray(config[current])
	})
	return config
}

/**
 * Checks if value is an array and if not creates an array
 * @param {String|Array} value The value to check if an array
 */
function putValuesIntoArray(value) {
	return Array.isArray(value) ? value : [value]
}

export default Config
