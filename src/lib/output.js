import is from '../util/is'

/**
 * Creates an output which is then consumable by `mole.build()`
 * ```js
 * {
 *	output: [
 *		{
 *			name: 'css',
 *			template: 'The color red is {{color.red}}',
 *			model: {
 *				token: {
 *					name: 'colorRed',
 *					value: '#FF0000'
 *				}
 *			},
 *			path: 'output/file.css'
 *		}
 *	]
 * }
 * ```
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
			...getContent(output, peripherals),
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
	let object = {}

	for (let type in peripherals) {

		if (output[type]) {

			for (let value in output[type]) {

				switch (is.what(output[type][value])) {
					case 'dir':
						// eg "templates/"
						object[type] = 'should get contents from directory eg templates/'
						break
					case 'file':
						// eg "templates/files.njk"
						object[type] = 'should get contents from file eg templates/file.njk'
						break
					case 'string':
						if (peripherals[type]) {

							for (let peripheral of peripherals[type]) {

								if (output[type][value] === peripheral.name) {
									// eg "plugin-name"
									object[type] = peripheral.data || peripheral.string
								} else {
									console.log(`Does not match a named ${type}, please check`)
								}
							}
						} else {
							console.log(`No ${type}s named '${output[type][value]}', please check`)
						}

						break
					default:
						// Backup plan?
				}
			}
		}

	}
	return object
}

// Todo: Add functionality to get template or model from files in dirs
function getDirContent() {}

// Todo: Add functionality to get template or model from files
function getFileContent() {}

// Todo: Add functionality to get template or model from user defined model of template
function getPluginContent(value, type) {
	for (let plugin of type) {
		if (value === plugin.name) {
			return plugin.string || plugin.data
		}
	}
}

export default Output
