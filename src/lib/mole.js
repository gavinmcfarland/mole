import fs from 'fs-extra'
import glob from 'glob'
import nunjucks from 'nunjucks'
import v from 'voca'
import Theme from './theme'
import Output from './output'
import File from './file'

let cwd = process.cwd()
let config = require(cwd + '/mole.config')

// var env = new nunjucks.Environment()
const env = nunjucks.configure()

export class Mole {
	constructor() {
		this.config = config
		this.theme = new Theme().parse()
		this.model = new Theme().model
		this.outputs = this.outputs()
		this.plugins = []
		this.files = []
	}
	outputs() {
		let result = []

		for (let i in config.output) {
			// Check if output is stored in array or not. Makes assumption that if has file property then not in array
			let output =
				typeof config.output[i].file !== 'undefined'
					? config.output[i]
					: config.output[i][Object.keys(config.output[i])]

			result.push(new Output(output, i))
		}

		return result
	}

	setPlugin(value) {
		this.plugins.push(value)
		this.files = this.process()
	}

	process() {
		let files = []
		for (let output of this.outputs) {
			files.push(new File(output, this.plugins))
		}
		return files
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

// console.log(config)

export default mole
