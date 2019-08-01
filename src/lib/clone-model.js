import config from './default-config.js'
import fs from 'fs'
import cloneDeep from 'lodash.clonedeep'
import jsonnet from '@unboundedsystems/jsonnet'
import glob from 'glob'

// // Import the theme which it's path is specified in the config
// const theme = require(__dirname + '/../' + config.theme).default

let themePath
let theme

let files = glob.sync(__dirname + '/../' + config.theme + '**/*')

for (let file of files) {
	let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
	let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim
	if (jsRegex.test(file)) {
		themePath = file
		theme = require(file)
	} else if (jsonnetRegex.test(file)) {
		themePath = file

		const getFile = fs.readFileSync(themePath).toString()

		const jsonnetVm = new jsonnet.Jsonnet()

		theme = jsonnetVm.eval(getFile)

		jsonnetVm.destroy()
	}
}

// Create a clone of the theme object which can be modified by the user
const model = cloneDeep(theme)

console.log(theme)

export { theme, model }
