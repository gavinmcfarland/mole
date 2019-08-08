class Config {
	constructor() {
		return normaliseConfig(config)
	}
}

const config = require(process.cwd() + '/mole.config')

function normaliseConfig(config) {
	/*
	1. Normalise the config:
		1. Put outputs into an array
		2. Put models and templates into arrays
		3. Add names to outputs
		4. Add templates to outputs
	*/

	;['model', 'template', 'output'].forEach(function(current) {
		config[current] = putValuesInArray(config[current])
	})
	return config
}

function putValuesInArray(value) {
	return Array.isArray(value) ? value : [value]
}

export default Config
