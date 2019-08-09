import is from '../util/is'

/**
 * Creates an output which is then consumable by `mole.build()`
 * @memberof Mole
 * @see {@link mole.build()}
 * @class
 * @example
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
 */

class Output {
	constructor(output) {
		// Object.assign(this, {
		// 	name: output.name,
		// 	template: getContent(output, 'template'),
		// 	model: getContent(output, 'model'),
		// 	path: output.dir + output.file
		// })
	}
}

const plugins = {
	models: [{ name: 'model-name', data: '' }],
	templates: [{ name: 'template-name', string: '' }]
}

const output = {
	name: 'css',
	model: ['model-name'],
	template: ['template-name'],
	dir: '',
	file: 'styles.css'
}

/**
 * Gets the content from plugin, directory or file
 * @param {Object} Output An individual output
 * @param {String} Type   Either a `model` or a `template`
 */

function getContent(output, plugins) {
	for (let type in plugins) {
		for (let plugin of plugins[type]) {
			/**
			 * Gets the singular part of a word
			 */
			const SINGULAR = /\w+(?=(?<![is])s\b)|\b\w+\b|\w+/

			type = type.match(SINGULAR)[0]

			if (output[type]) {
				for (let value in output[type]) {
					console.log(output[type][value])
					switch (is.what(output[type][value])) {
						case 'dir':
							console.log(
								'eg "templates/" =>',
								output[type][value]
							)
							// eg "templates/"
							// return getDirContent(value, type)
							break
						case 'file':
							console.log(
								'eg "templates/files.njk" =>',
								output[type][value]
							)
							// eg "templates/files.njk"
							// return getFileContent(value, type)
							break
						case 'string':
							if (output[type][value] === plugin.name) {
								console.log(
									'eg "plugin-name" =>',
									output[type][value]
								)
								// eg "plugin-name"
							}

							// return getPluginContent(value, type)
							break
						default:
						// Backup plan?
					}
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

getContent(output, plugins)

export default Output
