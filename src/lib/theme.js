import fs from 'fs'
import jsonnet from '@unboundedsystems/jsonnet'
import cloneDeep from 'lodash.clonedeep'
import glob from 'glob'
import is from '../util/is'

import Config from './Config'

const config = new Config()

/**
 * Theme data used by templates with outputs
 * ```js
 * // theme/index.js
 * export default {
 * 	font: {
 * 		size: [ 16, 19, 22, 26, 30, 35 ]
 * 	}
 * }
 * ```
 * @memberof Mole
 * @return {Object} Returns an object which is used by {@link Mole.Data}
 */

class Theme {
	constructor() {
		this.parsed = this.parse()
	}
	/**
	 * Keeps an original copy of the theme data in case it needs to be referenced by the user
	 */
	clone() {
		/*
		1. Clone parse theme for use by models and templates */

		return cloneDeep(this.parsed)
	}
	/**
	 * Parses the given theme data so it's usable by the rest of the app
	 */
	parse() {
		// console.log(config)
		/*
		1. Find location of theme files
		2. Determine what type of file they are
		3. Convert to js object or json */
		let path = getThemePath(config)
		let theme

		let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
		let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim

		if (jsRegex.test(path)) {
			theme = require(file)
		} else if (jsonnetRegex.test(path)) {
			const getFile = fs.readFileSync(path).toString()

			const jsonnetVm = new jsonnet.Jsonnet()

			theme = jsonnetVm.eval(getFile)

			jsonnetVm.destroy()
		} else {
			console.error(new Error('No theme provided'))
			theme = {}
		}

		return theme
	}
}

function getThemePath(config) {

	let path = ''
	let files

	if (is.what(config.theme) === 'dir') {
		files = glob.sync(config.path + config.theme + '**/*')
	} else if (is.what(config.theme) === 'file') {
		files = glob.sync(config.path + config.theme)
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

export default Theme
