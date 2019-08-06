import fs from 'fs'
import glob from 'glob'
import jsonnet from '@unboundedsystems/jsonnet'
import cloneDeep from 'lodash.clonedeep'

let cwd = process.cwd()
let config = require(cwd + '/mole.config')

export default class Theme {
	constructor() {
		let path = ''
		let files = glob.sync(cwd + '/' + config.theme + '**/*')

		for (let file of files) {
			let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
			let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim
			if (jsRegex.test(file)) {
				path = file
			} else if (jsonnetRegex.test(file)) {
				path = file
			}
		}

		this.path = path
		this.model = this.clone()
	}
	parse() {
		let path = this.path
		let theme

		let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
		let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim

		if (jsRegex.test(path)) {
			theme = require(file)
		}

		if (jsonnetRegex.test(path)) {
			const getFile = fs.readFileSync(path).toString()

			const jsonnetVm = new jsonnet.Jsonnet()

			theme = jsonnetVm.eval(getFile)

			jsonnetVm.destroy()
		}

		return theme
	}
	clone() {
		return cloneDeep(this.parse())
	}
}
