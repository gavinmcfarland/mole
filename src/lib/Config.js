import theme from './Theme'

let config = {
	result: {}
}

config.setConfig = function(value) {
	let config = {}
	let result = {}

	config.root = process.cwd() + value.match(/(.*)[\/\\]/)[1] + '/' || ''
	config.path = process.cwd() + value

	if (typeof value === 'string') {
		result = require(config.path)
	}
	if (typeof value === 'object') {
		result = value
	}
	config = Object.assign(config, result)

	;
	['model', 'template', 'output'].forEach(function(current) {
		if (config[current]) config[current] = putValuesIntoArray(config[current])
	})

	config = normaliseOutputs(config)

	// If theme is specified in config then set the theme
	if (config.theme) {

		theme.result = theme.setTheme(config.theme, config)

	}
	return config
}

function normaliseOutputs(config) {
	config.output.map(function(output) {
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
				dir = '.' + config.root + config.dir + output.dir
			} else {
				dir = '.' + config.root + output.dir
			}
		} else if (config.dir) {
			dir = '.' + config.root + config.dir
		} else {
			dir = '.' + config.root + ''
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

	return config
}

function putValuesIntoArray(value) {
	return Array.isArray(value) ? value : [value]
}

export default config
