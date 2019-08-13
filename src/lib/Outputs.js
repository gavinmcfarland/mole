import Output from './Output'
import Config from './Config'

const config = new Config()

class Outputs {
	constructor(peripherals) {
		const outputs = normaliseOutputs(config.output)

		return outputs.map(output => {
			return new Output(output, peripherals)
		})

	}
}

function normaliseOutputs(outputs) {
	/*
	{
		output: [
			{
				template: ['template-name'],
				model: ['tokens', 'mixins'].
				dir: 'templates/',
				file: 'style.css',
				path: 'templates/style.css'
			}
		]
	}
	*/

	return outputs.map(function(output) {
		// Check for name
		let name
		if (Object.keys(output).length === 1) {
			name = Object.keys(output)[0]
		} else {
			name = null
		}

		// Check for model
		let model
		if (output.model) {
			model = output.model
		} else if (config.template) {
			model = config.template
		}

		// Check for template
		let template
		if (output.template) {
			template = output.template
		} else if (config.template) {
			template = config.template
		}

		// Check for directory
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

		// Check for file
		let file
		if (Object.keys(output).length === 1) {
			file = output[name].file
		} else {
			file = output.file
		}

		return Object.assign({}, { name, model, template, dir, file })
	})
}

export default Outputs
