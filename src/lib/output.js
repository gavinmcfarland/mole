import is from '../util/is'

/**
 * Creates an output which is then consumable by `mole.build()`
 * ```js
 * {
	output: [
		{
			name: 'css',
			template: 'The color red is {{color.red}}',
			model: {
				token: {
					name: 'colorRed',
					value: '#FF0000'
				}
			},
			path: 'output/file.css'
		}
	]
}
 * @memberof Mole
 * @see {@link mole.build()}
 * @property {String} name The name of the output
 * @property {String} template A template which is available to render with a model
 * @property {Object} model The model used to provide the context for the template
 *
 */

class Output {
	constructor(output, peripherals) {
		Object.assign(this, {
			name: output.name,
			template: getContent(output, peripherals),
			// model: getContent(output, 'model'),
			path: output.dir + output.file
		})
	}
}

/**
 * Gets the content from plugin, directory or file
 * @memberof Mole.Output
 * @private
 * @param {Object} output An individual output
 * @param {Object} peripherals  A List of peripherals which contain `models` and/or `templates`
 * @returns {String|Object} Returns either an object for a `model` or an string for a `template`
 */

function getContent(output, peripherals) {

	for (let type in peripherals) {
		console.log(peripherals[type])
		/**
		 * Gets the singular part of a word
		 */
		const SINGULAR = /\w+(?=(?<![is])s\b)|\b\w+\b|\w+/

		type = type.match(SINGULAR)[0]

		if (output[type]) {
			for (let value in output[type]) {

				switch (is.what(output[type][value])) {
					case 'dir':
						// eg "templates/"
						return 'should get contents from director eg templates/'
					case 'file':
						// eg "templates/files.njk"
						return 'should get contents from file eg templates/file.njk'
					case 'string':
						for (let peripheral of peripherals[type]) {
							if (output[type][value] === peripheral.name) {
								// eg "plugin-name"
								return 'should get contents from plugin eg one defined by user'
							}
						}

						default:
							// Backup plan?
				}
			}
		}

	}
}

function getDirContent() {}

function getFileContent() {}

function getPluginContent(value, type) {
	for (let plugin of type) {
		if (value === plugin.name) {
			return plugin.string || plugin.data
		}
	}
}

export default Output
