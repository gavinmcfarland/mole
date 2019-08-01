import config from '../../mole.config.js'

/*
Returns object like

[
	{ name: 'css', template: 'templates/', file: '' },
	{ name: 'ios', template: 'templates/', file: '' },
	{ name: 'android', template: 'templates/', file: '' }
]

*/

export default function() {
	let result = []

	// Check for array if not, create array
	if (typeof config.output !== 'undefined') {
		if (!Array.isArray(config.output)) {
			config.output = [config.output]
		}
	}

	// For item in config.output
	for (let i in config.output) {
		let object = {}
		let output
		let name

		// Get output
		// If there is no named output
		if (typeof config.output[i].file !== 'undefined') {
			output = config.output[i]
		}
		// If there is a named output
		else {
			output = config.output[i][Object.keys(config.output[i])]
			name = Object.keys(config.output[i])[0]
		}

		if (typeof name !== 'undefined') {
			object.name = name
		}

		// Get template
		let template
		if (output.template) {
			template = output.template
		} else if (config.template) {
			template = config.template
		}

		// Get template
		let model
		if (output.model) {
			model = output.model
		} else if (config.model) {
			model = config.model
		}

		// Get dir
		let dir
		if (output.dir) {
			if (config.dir) {
				dir = config.dir + output.dir
			} else {
				dir = output.dir
			}
		} else if (config.dir) {
			dir = config.dir
		} else {
			dir = ''
		}
		let file = dir + output.file

		object.model = model
		object.template = template
		object.file = file

		result.push(object)
	}

	return result
}
