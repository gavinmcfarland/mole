import fs from 'fs-extra'
import Outputs from './Outputs'
import Peripherals from './Peripherals'
import Model from './Model'
import Template from './Template'
import env from './env'
import data from './Data'

// Todo: Update data when referenced by an output

import nunjucks from 'nunjucks'
import Theme from './Theme';

// var env = new nunjucks.Environment()
const nunjucksEnv = nunjucks.configure()

/**
 * Create a new instance of the main application
 *
 * ```js
 * import * from 'mole'
 *
 * mole.add(
 *	new Model('model-name', ({data}) => {
 *		data.hello = "hello"
 *		return data
 *	})
 * )
 *
 * mole.build()
 * ```
 */
class Mole {
	constructor() {
		// this.outputs = new Outputs()
		// this.files = parse()
		this.theme = new Theme().parsed
		this.data = data.result
		this.peripherals = new Peripherals()
		this.configuration = {}
		// this.outputs = new Outputs(this.peripherals, this.configuration)
	}

	config(value) {
		this.configuration = value
	}

	/**
	 * Renders the `templates` and `models` of the outputs
	 * @param {Object} outputs Outputs with string and data to render
	 * @return {Mole#files} Returns an array of objects with contents and paths
	 */
	render(outputs) {
		let files = []
		for (let output of outputs) {
			let file = {
				content: nunjucksEnv.renderString(output.template, output.model),
				path: output.path
			}
			files.push(file)
		}
		return files
	}

	/**
	 * Builds the files from the outputs
	 * @param {Object}
	 * @return {Mole#outputs}
	 * @tutorial Outputting build files
	 * @example
	 * // Example output
	 * build/
	 * 	css/
	 * 		styles.css
	 * 	ios/
	 * 		styles.h
	 * 	android/
	 * 		styles.xml
	 */
	build() {
		console.log(this.configuration)
		this.outputs = new Outputs(this.peripherals, this.configuration)
		this.files = this.render(this.outputs)

		for (let file of this.files) {
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

	/**
	 * Adds a new `model` or `template` to list of peripherals
	 * @param {Mole.Model|Mole.Template} peripheral Either an instance of a `Model` or a `Template`
	 * @return {Mole#peripherals}
	 * @example
	 * // Adding a model dynamically
	 * mole.add('model', 'model-name', ({data}) => {
	 * 	data.color.red = "#FF00000"
	 * 	return data
	 * })
	 */
	add(...args) {
		if (args[0] === 'model') {
			this.peripherals.model.push(new Model(args[1], args[2]))
			data.update(new Model(args[1], args[2]).data)
		}

		if (args[0] === 'template') {
			this.peripherals.template.push(new Template(args[1], args[2]))
		}

		this.outputs = new Outputs(this.peripherals, this.configuration)

	}
}

export default Mole
