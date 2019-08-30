import fs from 'fs'
import jsonnet from '@unboundedsystems/jsonnet'
import cloneDeep from 'lodash.clonedeep'
import glob from 'glob'
import is from '../util/is'

// let theme = {
// 	result: {}
// }

// theme.set = function(value, config) {

// 	let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
// 	let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim
// 	let result
// 	if (is.what(value) === 'path' || is.what(value) === 'file') {

// 		let path = getThemePath(config)

// 		if (jsRegex.test(path)) {
// 			result = require(file)

// 		}
// 		if (jsonnetRegex.test(path)) {

// 			const getFile = fs.readFileSync(path).toString()

// 			const jsonnetVm = new jsonnet.Jsonnet()

// 			result = jsonnetVm.eval(getFile)

// 			jsonnetVm.destroy()
// 		}
// 	} else if (is.what(value) === 'object') {
// 		result = value
// 	} else {
// 		result = {}
// 	}

// 	// If theme already set then merge with new settings
// 	if (theme.result) {
// 		result = Object.assign(theme.result, result)
// 	}

// 	return result
// }

class Theme {
	constructor() {
		return this
	}
	set(value, config) {
		let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
		let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim
		let result
		if (is.what(value) === 'path' || is.what(value) === 'file') {

			let path = getThemePath(config)

			if (jsRegex.test(path)) {
				result = require(file)

			}
			if (jsonnetRegex.test(path)) {

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
	}
}

const theme = new Theme()

function getThemePath(config) {

	let path = ''
	let files

	if (is.what(config.theme) === 'dir') {
		files = glob.sync(config.root + config.theme + '**/*')
	} else if (is.what(config.theme) === 'file') {
		files = glob.sync(config.root + config.theme)
	}

	for (let file of files) {

		let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
		let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim
		if (jsRegex.test(file)) {
			path = file
		} else if (jsonnetRegex.test(file)) {
			path = file
		}
	}

	return path
}

export default theme
