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

// class Model {
// 	constructor(name, callback) {
// 		this.name = name
// 		// This updates mole.model with changes from plugin
// 		Object.assign(mole.model, Object.getPrototypeOf(callback(mole.model)))
// 		// console.log(mole.model)
// 	}
// }

// class Template {
// 	constructor(name, callback) {
// 		this.name = name
// 		this.string = callback(mole.model, mole.theme)
// 		this.result = this.render()
// 	}
// 	render() {
// 		if (this.string) {
// 			return env.renderString(this.string, mole.model)
// 		}
// 	}
// }

class Mole {
	constructor() {
		this.theme = new Theme().parse()
		this.model = new Theme().model
		this.outputs = this.getOutputs()
		this.plugins = []
		// this.models = []
		// this.templates = []
		this.files = ''
	}
	model() {
		return this.model
	}
	getOutputs() {
		let result = []

		for (let i in config.output) {
			// Check if output is stored in array or not. Makes assumption that if had file property then not in array
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
		// this.parsePlugins()
	}

	// setModel(value) {
	// 	this.models.push(value)
	// }

	// setTemplate(value) {
	// 	this.templates.push(value)

	// 	this.files = this.generateFiles()
	// }

	// parseModels() {
	// 	let models = this.models
	// 	for (let output of this.outputs) {
	// 		switch (is.what(output.model)[0]) {
	// 			case 'path':
	// 				console.log('value is a path')
	// 				break
	// 			case 'string':
	// 				for (let model of models) {
	// 					if (output.model === model.name) {
	// 						console.log('value is a named model')
	// 					}
	// 				}
	// 				break
	// 			default:
	// 			// do something
	// 		}
	// 	}
	// }

	// parseTemplates() {
	// 	let templates = this.templates
	// 	for (let output of this.outputs) {
	// 		switch (is.what(output.template)[0]) {
	// 			case 'path':
	// 				console.log('value is a path')
	// 				break
	// 			case 'string':
	// 				for (let template of templates) {
	// 					if (output.template === template.name) {
	// 						console.log('value is a named plugin')
	// 					}
	// 				}
	// 				break
	// 			default:
	// 			// do something
	// 		}
	// 	}
	// }

	parsePlugins() {
		let plugins = this.plugins
		for (let output of this.outputs) {
			// Need to check if templates is an array or not
			if (is.arr(output.template)) {
				for (let template in output.template) {
					switch (is.what(template)[0]) {
						case 'path':
							console.log('value is a path')
							break
						case 'string':
							for (let plugin of plugins) {
								if (template === plugin.name) {
									console.log('value is a named plugin')
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
				this.parsePlugins()
			}
		}
	}

	generateFiles() {
		let files = []
		for (let output of this.outputs) {
			files.push(this.plugins)
		}
		return files
	}

	writeFiles() {
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

// mole.setModel(
// 	new Model('modelTest', function(model) {
// 		return (model.color.red = '#FF0000')
// 	})
// )

// mole.setTemplate(
// 	new Template('templateTest', function() {
// 		return "I'm {{color.red}}"
// 	})
// )

// mole.parsePlugins()

// mole.parseModels()
// mole.parseTemplates()

// console.log(mole.outputs)
console.log(mole)

// function renderTemplate(string, data) {
// 	return env.renderString(string, data)
// }

// function getContentFromDirs(path, output) {
// 	let files = glob.sync(path + output.name + '/*')
// 	let strings = []

// 	for (let i = 0; i < files.length; i++) {
// 		// console.log(fs.readFileSync(files[i], 'utf8'))
// 		strings.push(fs.readFileSync(files[i], 'utf8'))
// 	}
// 	// TODO: needs to parse the string using template renderer with associated model
// 	return strings.join('\n')
// }

// function parseTemplates(template, output) {
// 	if (Array.isArray(template)) {
// 		for (let i in template) {
// 			template = template[i]
// 			let DIRREG = /.+\/.?/im

// 			let isFunction = typeof template === 'function'
// 			let isObject = typeof template === 'object'
// 			let isDir = DIRREG.test(template)
// 			let isNamedOutput = output && output.name

// 			if (isFunction) {
// 				console.log('template is function')
// 				return 'should be function'
// 			} else if (isObject) {
// 				console.log('template is object')
// 				return {
// 					content: output.template.result,
// 					path: output.file
// 				}
// 			} else if (isDir && isNamedOutput) {
// 				console.log('template is directory')
// 				return {
// 					content: getContentFromDirs(template, output),
// 					path: output.file
// 				}
// 			} else {
// 				for (let registeredTemplate of mole.plugins.templates) {
// 					if (template === registeredTemplate.name) {
// 						return {
// 							// TODO: needs to parse the string using template renderer with associated model
// 							content: renderTemplate(
// 								registeredTemplate.string,
// 								mole.model
// 							),
// 							// content: registeredTemplate.string,
// 							path: output.file
// 						}
// 					} else {
// 						return {
// 							content: 'not sure',
// 							path: output.file
// 						}
// 					}
// 				}
// 			}
// 		}
// 	} else {
// 		return parseTemplates([template], output)
// 	}
// }

// function processModels(model, output) {
// 	if (Array.isArray(model)) {
// 		for (let i in model) {
// 			model = model[i]
// 			let DIRREG = /.+\/.?/im

// 			let isFunction = typeof model === 'function'
// 			let isObject = typeof model === 'object'
// 			let isDir = DIRREG.test(model)
// 			let isNamedOutput = output && output.name

// 			if (isFunction) {
// 				console.log('model is function')
// 				return 'should be function'
// 			} else if (isObject) {
// 				console.log('model is object')
// 				return {
// 					model: output.model.result,
// 					path: output.file
// 				}
// 			} else if (isDir && isNamedOutput) {
// 				console.log('model is directory')
// 				return {
// 					model: getContentFromDirs(model, output),
// 					path: output.file
// 				}
// 			} else {
// 				for (let registeredModel of mole.plugins.models) {
// 					if (model === registeredModel.name) {
// 						return {
// 							model: registeredModel.string,
// 							path: output.file
// 						}
// 					} else {
// 						return {
// 							model: 'not sure',
// 							path: output.file
// 						}
// 					}
// 				}
// 			}
// 		}
// 	} else {
// 		return processModels([model], output)
// 	}
// }

// function generateContents(outputs) {
// 	let files = []
// 	for (let output of outputs) {
// 		// This only mutates an object. It does not return anything
// 		processModels(output.model, output)
// 		files.push(parseTemplates(output.template, output))
// 	}

// 	return files
// }

// Plugins require the instance of mole exported above ^ before then can be registered to instance

// mole.files = generateContents(mole.outputs)
