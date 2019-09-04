import config from './Config'
import theme from './Theme'
import data from './Theme'
import fs from 'fs-extra'
import peripherals from './Peripherals'
import env from './env'

import Output from './Output'
import Model from './Model'
import Template from './Template'

import nunjucks from 'nunjucks'
const nunjucksEnv = nunjucks.configure()

let files = []

let things = []

class Mole {
	constructor() {}
	config(value) {
		config.set(value)
	}
	theme(value) {
		theme.set(value, config)
		console.log('theme ->', theme)
	}
	create(...args) {
		if (args[0] === 'model') {
			peripherals.model.push(new Model(args[1], args[2], theme, data))

		}

		if (args[0] === 'template') {
			peripherals.template.push(new Template(args[1], args[2], theme, data))
		}
		this._outputs()
	}
	_outputs() {

		things = config.output.map(output => {

			return new Output(output, peripherals, config, theme, data)
		})
	}
	render() {
		for (let output of things) {
			let file = {
				content: nunjucksEnv.renderString(output.template, output.model),
				path: output.path
			}
			files.push(file)
		}
	}
	build() {
		this._outputs()
		this.render()

		for (let file of files) {
			fs.outputFile(file.path, file.content, function(err) {
				if (err) console.log(err) // => null

				if (env === 'test') {
					fs.readFile(file.path, 'utf8', function(err, data) {
						console.log(data) // => hello!
					})
				}
			})
		}
	}
}

const mole = new Mole()

// console.log(config)

// mole.create('model', 'redModel', ({ data }) => {
// 	data.color.red = 'red'
// 	return data
// })

// console.log(config)
// console.log(things)

// mole.build()

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

// console.log(mole.debug)

export default mole
