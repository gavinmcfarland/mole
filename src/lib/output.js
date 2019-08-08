import is from '../util/is'

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
		// Object.assign(this, {
		// 	name: output.name,
		// 	template: getContent(output, 'template'),
		// 	model: getContent(output, 'model'),
		// 	path: output.dir + output.file
		// })
	}
}

const output = {
	name: 'css',
	model: ['templates/'],
	template: ['templates/'],
	dir: '',
	file: 'styles.css'
}

function getContent(output, type) {
	if (output[type]) {
		for (let value of output[type]) {
			switch (is.what(value)) {
				case 'dir':
					console.log('eg "templates/" =>', value)
					// eg "templates/"
					// return getDirContent(value, type)
					break
				case 'file':
					console.log('eg "templates/files.njk" =>', value)
					// eg "templates/files.njk"
					// return getFileContent(value, type)
					break
				case 'string':
					console.log('eg "plugin-name" =>', value)
					// eg "plugin-name"
					// return getPluginContent(value, type)
					break
				default:
				// Backup plan?
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

getContent(output, 'template')

export default Output
