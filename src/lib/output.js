/*
{
	output: [
		{
			name: 'css',
			template: 'The color red is {{color.red}}',
			model: [Object],
			path: 'output/file.css'
		}
	]
}
*/

class Output {
	constructor(output) {
		this.name = output.name
		this.template = getContent(output, 'template')
		this.model = getContent(output, 'model')
		this.path = output.dir + output.file
	}
	getContent(output, type) {
		if (output[type]) {
			for (let value of output[type]) {
				switch (type(value)) {
					case 'dir':
						// eg "templates/"
						return getDirContent(value, type)
					case 'file':
						// eg "templates/files.njk"
						return getFileContent(value, type)
					case 'string':
						// eg "plugin-name"
						return getPluginContent(value, type)
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
