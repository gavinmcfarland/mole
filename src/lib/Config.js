import env from './env'

function requireConfig(path, value) {
	try {
		var m = require(path);
		return m
	} catch (ex) {
		return value
	}
}

class Config {
	constructor(value) {
		return this.set(value)
	}

	set(value) {
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
					config = requireConfig(process.cwd() + root + 'dev-config.js', value)
				} else {
					root = '/'
					config = requireConfig(process.cwd() + root + 'mole.config', value)

				}
			} else {
				if (env === 'test') {
					root = '/src/stub/'
				} else {
					root = '/'
				}
				config = value
			}

		}

		config.root = root
		config.path = process.cwd() + root

		return normaliseConfig(config)
	}
}

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

const config = new Config()

export default config
