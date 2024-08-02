import theme from './Theme.js'
import env from './env.js'
import fs from 'fs-extra'

import { dirname } from 'path';

// Get the entry point script path
const entryPoint = process.argv[1];

// Get the directory of the entry point script
const entryDir = dirname(entryPoint);

class Config {
	constructor() {
		return this
	}
	async set(value) {
		// console.log(value)
		// Get the input value for the config
		let input
		// Check if value is a path to a file or an object
		if (typeof value === 'string') {


			if (fs.existsSync(process.cwd() + '/' + value)) {


				input = await import(process.cwd() + '/' + value)

			}
		}

		if (typeof value === 'object') {
			input = value
		}

		if (input) {
			let result = {}

			// Record the root of where the file is stored
			let dir = ''

			// If path is matches a directory
			if (value.match(/(.*)[\/\\]/)) {
				dir = value.match(/(.*)[\/\\]/)[1] + '/'
			}

			result.root = process.cwd() + '/' + dir || ''
			result.rootOnly = dir
			// Record the absolute path to the file
			result.path = process.cwd() + '/' + value


			// Assign the properties of the input to the object we created
			result = Object.assign(result, input.default)

				// For model, template and output we must put them into arrays
				;
			['model', 'template', 'output'].forEach(function (current) {
				if (result[current]) result[current] = putValuesIntoArray(result[current])
			})

			// Then we normalise the outputs
			result = normaliseOutputs(result)

			// If a theme is specified in the config input then we set the theme
			if (result.theme) {
				theme.set(result.rootOnly + result.theme, result)
			}
			// We assign the new properties to the Config object
			Object.assign(this, result)


		}
	}
}

function normaliseOutputs(config) {

	let result = config.output.map(function (output) {
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

export default config
