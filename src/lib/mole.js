import fs from 'fs-extra'
import Theme from './theme'
import Output from './outputs'
import config from '../../../mole.config'

class Mole {
	constructor() {
		this.theme = new Theme().parse()
		this.model = new Theme().model
		this.plugins = {}
		this.outputs = this.getOutputs()
		this.files = null
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

export default mole
