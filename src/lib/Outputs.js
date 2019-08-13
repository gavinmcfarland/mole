import Output from './Output'
import Config from './Config'

const config = new Config()

/**
 * Creates a array of outputs which contain contents of `models` and `templates`
 *
 * ```js
 * outputs: [
    Output {
	  name: 'css',
	  model: {
				token: {
					name: 'colorRed',
					value: '#FF0000'
				}
			}
	  template: 'The color red is {{color.red}}',
      path: 'styles.css'
    } //...
  ]
 */
class Outputs {
	constructor(peripherals) {
		const outputs = normaliseOutputs(config)

		return outputs.map(output => {
			return new Output(output, peripherals)
		})

	}
}

/**
 * Flattens the structure of user defined output so it's easier to work with
 * ```js
 * {
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
 * @param {Object} outputs A config with property called output which contains an array
 */

function normaliseOutputs(config) {
	let outputs = config.output
	return outputs.map(function(output) {
		if (typeof output === 'undefined') {
			throw new Error('No outputs specified in config')
		}

		// Check for name
		let name
		if (Object.keys(output).length === 1 && Array.isArray(output)) {
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
		if (Object.keys(output).length === 1 && Array.isArray(output)) {
			file = output[name].file
		} else {
			file = output.file
		}
		return Object.assign({}, { name, model, template, dir, file })
	})
}

export default Outputs
