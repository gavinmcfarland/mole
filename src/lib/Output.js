import is from '../util/is'
import fs from 'fs-extra'
import merge from 'lodash.merge'
import glob from 'glob'
import Template from './Template'
import Model from './Model'

class Output {
	constructor(output, peripherals, config, theme, data) {
		Object.assign(this, {
			name: output.name,
			...getContent(output, peripherals, config, theme, data),
			path: output.dir + output.file
		})
	}
}

function getContent(output, peripherals, config, theme, data) {

	let object = {}

	for (let type in peripherals) {

		if (output[type] === null) {
			output[type] = data
		}

		if (output[type]) {
			let result = []

			for (let value in output[type]) {

				switch (is.what(output[type][value])) {
					case 'dir':
						// eg "templates/"
						result.push(getContentFromDirs(output[type][value], output, peripherals, type, config, theme, data))
						break
					case 'file':
						// eg "templates/files.njk"
						result.push(getFileContent(output[type][value], type, config, theme, data))
						break
					case 'string':
						if (peripherals[type]) {

							// Check if any peripherals have been added
							if (peripherals[type].length > 0) {
								for (let peripheral of peripherals[type]) {

									if (output[type][value] === peripheral.name) {
										// eg "plugin-name"
										result.push(peripheral.data || peripheral.string)
									} else {
										console.log(`Does not match a named ${type}, please check`)
									}

								}
							} else {
								// When model is added using config, but doesn't exist then set model to data. Needs improving
								result.push(data)
								// console.log(`No ${type}s added yet`)
							}

						} else {
							console.log(`No ${type}s named '${output[type][value]}', please check`)
						}

						break
					default:
						result.push(output[type])
				}

			}

			if (type === 'model') {
				object[type] = merge(...result)
			}
			if (type === 'template') {
				object[type] = result.join('\n')
			}
		}

	}
	// console.log('object -> ', object)
	return object
}

function getContentFromDirs(dir, output, peripherals, type, config, theme, data) {
	let keys = []
	keys = Object.keys(data)
	keys.push('index')
	keys = keys.join('|')
	// console.log(keys)

	let result = []

	// If has subdirectory that matches named output eg "templates/ios/"
	if (fs.existsSync(config.root + dir + output.name + '/')) {
		// console.log('has matching directories')
		// Get files that match model eg "templates/ios/class.njk" or "templates/ios/index.njk"
		let files = glob.sync(config.root + dir + output.name + '/@(' + keys + ')*')

		for (let file of files) {

			// console.log(fs.readFileSync(file, 'utf8'))
			if (/\.js$/gmi.test(file)) {
				if (type === 'model') result.push(new Model('name', require(file), theme, data).data)
				if (type === 'template') result.push(new Template('name', require(file), theme, data).string)

			} else {
				result.push(fs.readFileSync(file, 'utf8'))
			}

		}

	} else {
		// If main directory has file that matches named output eg "templates/ios.njk"
		// TODO: Could possibly also check if filename matches model eg. "ios.class.njk"
		let files = glob.sync(config.root + dir + output.name + '*')

		for (let file of files) {

			if (/\.js$/gmi.test(file)) {
				if (type === 'model') result.push(new Model('name', require(file), theme, data).data)
				if (type === 'template') result.push(new Template('name', require(file), theme, data).string)

			} else {
				result.push(fs.readFileSync(file, 'utf8'))
			}
		}
	}

	if (type === 'model') {
		return merge(...result)
	}
	if (type === 'template') {
		return result.join('\n')
	}

}

function getFileContent(file, type, config, theme, data) {

	if (/\.js$/gmi.test(file)) {
		if (type === 'model') {
			return new Model('name', require(config.root + file), theme, data).data
		}
		if (type === 'template') {
			return new Template('name', require(config.root + file), theme, data).string
		}
	} else {
		return fs.readFileSync(config.root + file, 'utf8')
	}
}

// Todo: Add functionality to get template or model from user defined model of template
function getPluginContent(value, type) {
	for (let plugin of type) {
		if (value === plugin.name) {
			return plugin.string || plugin.data
		}
	}
}

export default Output
