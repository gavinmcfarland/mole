import theme from './Theme'
import env from './env'

class Config {
	constructor() {
		return this
	}
	set(value) {
		let result = {}

		// Record the root of where the file is stored
		result.root = process.cwd() + value.match(/(.*)[\/\\]/)[1] + '/' || ''
		// Record the absolute path to the file
		result.path = process.cwd() + value

		// Get the input value for the config
		let input = {}
		// Check if value is a path to a file or an object
		if (typeof value === 'string') {
			input = require(result.path)
		}
		if (typeof value === 'object') {
			input = value
		}

		// Assign the properties of the input to the object we created
		result = Object.assign(result, input)

		// For model, template and output we must put them into arrays
		;
		['model', 'template', 'output'].forEach(function(current) {
			if (result[current]) result[current] = putValuesIntoArray(result[current])
		})

		// Then we normalise the outputs
		result = normaliseOutputs(result)

		// If a theme is specified in the config input then we set the theme
		if (result.theme) {

			theme.set(result.theme, result)

		}

		// We assign the new properties to the Config object
		Object.assign(this, result)
	}
}

function normaliseOutputs(config) {

	let result = config.output.map(function(output) {
		if (typeof output === 'undefined') {
			throw new Error('No outputs specified in config')
		}

		// Check for name
		let name
		if (typeof output.file === 'undefined') {
			name = Object.keys(output)[0]
		} else {
			name = null
		}

		// Check for model
		let model
		if (output.model) {
			model = output.model
		} else if (config.model) {
			model = config.model
		} else {
			model = null
		}

		// Check for template
		let template
		if (output.template) {
			template = output.template
		} else if (config.template) {
			template = config.template
		} else {
			template = null
		}

		// Check for directory
		let dir
		if (output.dir) {
			if (config.dir) {
				dir = config.root + config.dir + output.dir
			} else {
				dir = config.root + output.dir
			}
		} else if (config.dir) {
			dir = config.root + config.dir
		} else {
			dir = config.root + ''
		}

		// Check for file
		let file
		if (typeof output.file === 'undefined') {
			file = output[name].file

		} else {
			file = output.file

		}

		return Object.assign({}, { name, model, template, dir, file })
	})

	config.output = result

	return config
}

function putValuesIntoArray(value) {
	return Array.isArray(value) ? value : [value]
}

const config = new Config()

if (env === 'test') {
	config.set('/src/stub/config.js')
} else {
	config.set('/mole.config.js')
}

export default config
