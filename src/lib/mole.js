import fs from 'fs-extra'
import is from '../util/is'
import glob from 'glob'
import nunjucks from 'nunjucks'
import v from 'voca'
import config from '../../../mole.config'
import Theme from './theme'
import Output from './output'

// var env = new nunjucks.Environment()
const env = nunjucks.configure()

class Plugin {
	constructor(name, callback) {
		this.name = name
		if (callback(mole.model, mole.theme))
			this.string = callback(mole.model, mole.theme)
		if (this.render()) this.rendered = this.render()
		this.model = mole.model
	}
	render() {
		if (this.string) {
			return env.renderString(this.string, mole.model)
		}
	}
}

export class Mole {
	constructor() {
		this.theme = new Theme().parse()
		this.model = new Theme().model
		this.outputs = this.getOutputs()
		this.plugins = []
		this.files = []
	}
	model() {
		return this.model
	}
	getOutputs() {
		let result = []

		for (let i in config.output) {
			// Check if output is stored in array or not. Makes assumption that if has file property then not in array
			let output =
				typeof config.output[i].file !== 'undefined'
					? config.output[i]
					: config.output[i][Object.keys(config.output[i])]

			result.push(new Output(output))
		}

		return result
	}

	setPlugin(value) {
		this.plugins.push(value)
		this.files = this.generateFiles()
	}

	parseTemplates() {
		let plugins = this.plugins
		for (let output of this.outputs) {
			// Need to check if templates is an array or not
			if (is.arr(output.template)) {
				for (let template of output.template) {
					switch (is.what(template)[0]) {
						case 'path':
							console.log('value is a path')
							break
						case 'string':
							for (let plugin of plugins) {
								if (template === plugin.name) {
									// console.log('value is a named plugin')

									this.files.push({
										content: plugin.rendered,
										path: output.path
									})
								}
							}
							break
						default:
						// do something
					}
				}
			} else {
				// If not an array then put into array and process again
				output.template = [output.template]
				this.parseTemplates()
			}
		}
	}

	generateFiles() {
		for (let output of this.outputs) {
			if (output.template) {
				this.parseTemplates()
			}
		}
		return this.files
	}

	write() {
		for (let file of this.files) {
			fs.outputFile(file.path, file.content, function(err) {
				if (err) console.log(err) // => null

				fs.readFile(file.path, 'utf8', function(err, data) {
					console.log(data) // => hello!
				})
			})
		}
	}
}

const mole = new Mole()

mole.setPlugin(
	new Plugin('modelTest', function(model) {
		model.color.red = '#FF0000'
	})
)

mole.setPlugin(
	new Plugin('templateTest', function() {
		return "I'm {{color.red}}"
	})
)

export default mole
