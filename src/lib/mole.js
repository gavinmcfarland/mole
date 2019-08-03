import fs from 'fs-extra'
import glob from 'glob'
import nunjucks from 'nunjucks'
import v from 'voca'
import config from '../../../mole.config'
import Theme from './theme'
import Output from './output'

// var env = new nunjucks.Environment()
const env = nunjucks.configure()

class Mole {
	constructor() {
		this.theme = new Theme().parse()
		this.model = new Theme().model
		this.plugins = {}
		this.outputs = this.getOutputs()
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

function renderTemplate(string, data) {
	return env.renderString(string, data)
}

function getContentFromDirs(path, output) {
	let files = glob.sync(path + output.name + '/*')
	let strings = []

	for (let i = 0; i < files.length; i++) {
		// console.log(fs.readFileSync(files[i], 'utf8'))
		strings.push(fs.readFileSync(files[i], 'utf8'))
	}
	// TODO: needs to parse the string using template renderer with associated model
	return strings.join('\n')
}

function parseTemplates(template, output) {
	if (Array.isArray(template)) {
		for (let i in template) {
			template = template[i]
			let DIRREG = /.+\/.?/im

			let isFunction = typeof template === 'function'
			let isObject = typeof template === 'object'
			let isDir = DIRREG.test(template)
			let isNamedOutput = output && output.name

			if (isFunction) {
				console.log('template is function')
				return 'should be function'
			} else if (isObject) {
				console.log('template is object')
				return {
					content: output.template.result,
					path: output.file
				}
			} else if (isDir && isNamedOutput) {
				console.log('template is directory')
				return {
					content: getContentFromDirs(template, output),
					path: output.file
				}
			} else {
				for (let registeredTemplate of mole.plugins.templates) {
					if (template === registeredTemplate.name) {
						return {
							// TODO: needs to parse the string using template renderer with associated model
							content: renderTemplate(
								registeredTemplate.string,
								mole.model
							),
							// content: registeredTemplate.string,
							path: output.file
						}
					} else {
						return {
							content: 'not sure',
							path: output.file
						}
					}
				}
			}
		}
	} else {
		return parseTemplates([template], output)
	}
}

function processModels(model, output) {
	if (Array.isArray(model)) {
		for (let i in model) {
			model = model[i]
			let DIRREG = /.+\/.?/im

			let isFunction = typeof model === 'function'
			let isObject = typeof model === 'object'
			let isDir = DIRREG.test(model)
			let isNamedOutput = output && output.name

			if (isFunction) {
				console.log('model is function')
				return 'should be function'
			} else if (isObject) {
				console.log('model is object')
				return {
					model: output.model.result,
					path: output.file
				}
			} else if (isDir && isNamedOutput) {
				console.log('model is directory')
				return {
					model: getContentFromDirs(model, output),
					path: output.file
				}
			} else {
				for (let registeredModel of mole.plugins.models) {
					if (model === registeredModel.name) {
						return {
							model: registeredModel.string,
							path: output.file
						}
					} else {
						return {
							model: 'not sure',
							path: output.file
						}
					}
				}
			}
		}
	} else {
		return processModels([model], output)
	}
}

function generateContents(outputs) {
	let files = []
	for (let output of outputs) {
		// This only mutates an object. It does not return anything
		processModels(output.model, output)
		files.push(parseTemplates(output.template, output))
	}

	return files
}

export default mole

// Plugins require the instance of mole exported above ^ before then can be registered to instance
function registerPlugins() {
	mole.plugins.templates = [require('../plugins/templateTest')]
	mole.plugins.models = [require('../plugins/modelTest')]
}

registerPlugins()

mole.files = generateContents(mole.outputs)
