import fs from 'fs'
import glob from 'glob'
import is from '../util/is.js'
import data from './Data.js'
import merge from 'lodash.merge'

let jsonnet;

try {
	jsonnet = await import('@unboundedsystems/jsonnet');
} catch (err) {
	// console.log('Optional library not installed. Some features may not be available.');
}

const RE_JS = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/im
const RE_JSONNET = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/im



class Theme {
	constructor() {
		return this
	}
	async set(value, config) {

		// Parses the theme
		let result

		if (is.what(value) === 'path' || is.what(value) === 'file' || is.what(value) === 'dir') {

			let path = getThemePath(config, value)

			if (RE_JS.test(path)) {
				result = (await import(file)).default
			}
			if (jsonnet && RE_JSONNET.test(path)) {

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

		merge(this, result)

		data.clone(theme)
	}
}

function getThemePath(config, value) {

	let path = ''
	let files

	// If theme is specified as a dir
	if (is.what(value) === 'dir') {
		files = glob.sync(process.cwd() + '/' + value + '**/*')
	}

	// If theme is specified as a file
	if (is.what(value) === 'file') {

		files = glob.sync(process.cwd() + '/' + value)

	}

	// Check if file is one of supported extensions
	files.map(function (file) {
		if (RE_JS.test(file) || RE_JSONNET.test(file)) {
			path = file
		}
	})

	return path
}

const theme = new Theme()

export { data }

export default theme
