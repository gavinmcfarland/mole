import env from './env'

function requireConfig(path) {
	try {
		var m = require(path);
		return m
	} catch (ex) {
		throw new Error('No mole.config.js file found')
	}
}

/**
 * Path to config file
 * @member
 * @default path './mole.config.js'
 */

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

class Config {
	constructor(value) {
		if (!value) {
			value = {}
		}

		let config
		let root = '/'
		if (typeof value === 'string') {
			var dirname = value.match(/(.*)[\/\\]/)[1] || ''
			root = dirname + '/'
			config = requireConfig(process.cwd() + value)

		} else if (typeof value === 'object') {

			if (Object.entries(value).length === 0 && value.constructor === Object) {
				if (env === 'test') {
					root = '/src/stub/'
					config = requireConfig(process.cwd() + root + 'dev-config.js')

				} else {
					root = '/'
					config = requireConfig(process.cwd() + root + 'mole.config')
				}
			} else {
				root = '/'
				config = value
			}

		}

		config.root = root
		config.path = process.cwd() + root
		return normaliseConfig(config)
	}
}

/**
 * Normalises user's config for easier use.
 * @memberof Mole.Config
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
		if (config[current]) config[current] = putValuesIntoArray(config[current])
	})
	return config
}

/**
 * Checks if value is an array and if not creates an array
 * @memberof Mole.Config
 * @param {String|Array} value The value to check if an array
 */
function putValuesIntoArray(value) {
	return Array.isArray(value) ? value : [value]
}

export default Config
