import fs from 'fs'
import jsonnet from '@unboundedsystems/jsonnet'
import glob from 'glob'
import is from '../util/is'
import data from './Data'

const RE_JS = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/im
const RE_JSONNET = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/im

class Theme {
	constructor() {
		return this
	}
	set(value, config) {

		// Parses the theme
		let result
		if (is.what(value) === 'path' || is.what(value) === 'file' || is.what(value) === 'dir') {

			let path = getThemePath(config, value)

			if (RE_JS.test(path)) {
				result = require(file)

			}
			if (RE_JSONNET.test(path)) {

				const getFile = fs.readFileSync(path).toString()

				const jsonnetVm = new jsonnet.Jsonnet()

				result = jsonnetVm.eval(getFile)

				jsonnetVm.destroy()
			}
		} else if (is.what(value) === 'object') {
			result = value
		} else {
			result = {}
		}

		// If theme already set then merge with new settings
		if (theme.result) {
			result = Object.assign(theme.result, result)
		}

		Object.assign(this, result)
		data.clone(theme)
	}
}

function getThemePath(config, value) {

	let path = ''
	let files

	// If theme is specified as a dir
	if (is.what(config.theme) === 'dir') {
		files = glob.sync(process.cwd() + '/' + value + '**/*')
	}

	// If theme is specified as a file
	if (is.what(config.theme) === 'file') {

		files = glob.sync(process.cwd() + '/' + value)

	}

	// Check if file is one of supported extensions
	files.map(function(file) {
		if (RE_JS.test(file) || RE_JSONNET.test(file)) {
			path = file
		}
	})

	return path
}

const theme = new Theme()

export { data }

export default theme
