import config from './Config.js'
import theme from './Theme.js'
import fs from 'fs-extra'
import peripherals from './Peripherals.js'
import env from './env.js'
import { data } from './Theme.js'
import Output from './Output.js'
import Model from './Model.js'
import Template from './Template.js'

import nunjucks from 'nunjucks'
const nunjucksEnv = nunjucks.configure()

let files = []

let things = []

function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

async function getConfig() {
	if (env === 'test') {
		await config.set('src/stub/config.cjs')
		return config
	} else {
		await config.set('mole.config.js')
		return config
	}
}

class Mole {
	constructor() { }
	config(value) {
		config.set(value)
	}
	theme(value) {

		getConfig().then((config) => {
			theme.set(value, config)
		})
	}
	register(...args) {
		// If values provided as an array then use the array as args
		if (args[0]) {
			args = args[0]
		}

		if (args[0] === 'model') {
			let model = new Model(args[1], args[2], theme, data)
			peripherals.model.push(model)
			data.update(model.data)
		}

		if (args[0] === 'template') {
			peripherals.template.push(new Template(args[1], args[2], theme, data))
		}
		this._outputs()
	}
	use(...args) {

		// If values provided as an array then use the array as args
		if (Array.isArray(args[0])) {
			args = args[0]
		}

		if (isFunction(args[0])) {
			args = args[0]()
		}

		if (args[0] === 'model') {
			let model = new Model(args[1], args[2], theme, data, true)
			peripherals.model.push(model)
			data.update(model.data)
		}

		if (args[0] === 'template') {
			peripherals.template.push(new Template(args[1], args[2], theme, true, true))
		}
		this._outputs()
	}
	// An alias for register, create() is depreciated */
	create(...args) {
		this.register(...args)
	}
	// An alias for create, add() is depreciated */
	add(...args) {
		this.create(...args)
	}
	async _outputs() {



		things = (await getConfig()).output.map(async output => {

			return await Output.createInstance(output, peripherals, config, theme, data)
		})


	}
	async render() {
		let files = []
		for (let output of things) {

			output = await output

			let file = {
				content: nunjucksEnv.renderString(output.template, output.model),
				path: output.path
			}
			files.push(file)
		}
		return files
	}
	async build() {
		await this._outputs()

		for (let file of await this.render()) {

			fs.outputFile(file.path, file.content, function (err) {
				if (err) console.log(err) // => null
				if (env === 'test') {
					fs.readFile(file.path, 'utf8', function (err, data) {
						console.log(data) // => hello!
					})
				}
			})
		}
	}
}

const mole = new Mole()

// console.log(config)

// mole.create('model', 'redModel', (theme, model) => {
// 	model.color.red = "#FF00000"
// 	return model
// })

// console.log(config)
// console.log(things)

// mole.build()

// mole.theme('src/stub/theme/override-theme.jsonnet')

// console.log(data)

// console.log(peripherals)

// console.log(mole)

if (env === 'test') {
	mole.build()
}

// mole.debug = {
// 	config,
// 	theme,
// 	data,
// 	outputs: config.output,
// 	files,
// 	things
// }

// console.log(mole.render())

// console.log(mole.debug)

export default mole
