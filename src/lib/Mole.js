import config from './Config'
import theme from './Theme'
import fs from 'fs-extra'
import peripherals from './Peripherals'
import env from './env'
import { data } from './Theme'
import Output from './Output'
import Model from './Model'
import Template from './Template'

import nunjucks from 'nunjucks'
const nunjucksEnv = nunjucks.configure()

let files = []

let things = []

class Mole {
	constructor() { }
	config(value) {
		config.set(value)
	}
	theme(value) {
		theme.set(value, config)
	}
	register(...args) {
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
	_outputs() {

		things = config.output.map(output => {

			return new Output(output, peripherals, config, theme, data)
		})
	}
	render() {
		let files = []
		for (let output of things) {
			// console.log(output)
			let file = {
				content: nunjucksEnv.renderString(output.template, output.model),
				path: output.path
			}
			files.push(file)
		}
		return files
	}
	build() {
		this._outputs()

		for (let file of this.render()) {

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

mole.debug = {
	config,
	theme,
	data,
	outputs: config.output,
	files,
	things
}

// console.log(mole.render())

// console.log(mole.debug)

export default mole
