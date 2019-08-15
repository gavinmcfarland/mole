import fs from 'fs-extra'
import Outputs from './Outputs'
import Peripherals from './Peripherals'
import Config from './Config'
import Model from './Model'
import Template from './Template'
let env = process.env.NODE_ENV || 'dev';
import data from './Data'

// Todo: Update data when referenced by an output

import nunjucks from 'nunjucks'

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
		this.data = data.result
		this.peripherals = new Peripherals()
		this.outputs = new Outputs(this.peripherals)
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
		this.outputs = new Outputs(this.peripherals)
		this.files = this.render(this.outputs)

		for (let file of this.files) {
			fs.outputFile(file.path, file.content, function(err) {
				if (err) console.log(err) // => null

				if (env === 'dev') {
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
	 * // Adding a template dynamically to a named output of `css`
	 * mole.add(
	 * 	new Template('template-name', ({data, theme}) => {
	 * 		return '// return string'
	 * 	}
	 * )
	 */
	add(...args) {
		if (args[0] === 'model') {
			this.peripherals.model.push(new Model(args[1], args[2]))
			data.update(new Model(args[1], args[2]).data)
		}

		if (args[0] === 'template') {
			this.peripherals.template.push(new Template(args[1], args[2]))
		}

		this.outputs = new Outputs(this.peripherals)

	}
}

export default Mole
