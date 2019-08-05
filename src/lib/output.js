import config from '../../../mole.config'

// Check for array if not, create array
if (typeof config.output !== 'undefined') {
	if (!Array.isArray(config.output)) {
		config.output = [config.output]
	}
}

export default class Output {
	constructor(output) {
		if (output.file === 'undefined') {
			this.name = Object.keys(config.output[i])[0]
		}

		let model = output.model ? output.model : config.model
		let template = output.template ? output.template : config.template

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

		let path = dir + output.file

		this.model = model
		this.template = template
		this.path = path
	}
}
