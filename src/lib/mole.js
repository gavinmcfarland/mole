// import Theme from './Theme'
import Outputs from './Outputs'
import Peripherals from './Peripherals'
// import Model from './Model'
// import Template from './Template'
import Config from './Config'
import Model from './Model'
import Template from './Template'
import mole from '..';

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
		this.files = []
		this.peripherals = new Peripherals()
		this.outputs = new Outputs(this.peripherals)
	}

	/**
	 * Renders the `templates` and `models` of the outputs
	 * @param {Object} outputs Outputs with string and data to render
	 * @return {Mole#files} Returns an array of objects with contents and paths
	 */
	render(outputs) {
		// for (let output of this.outputs) {
		// 	// render()
		// }
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
	build(outputs) {
		for (let file of this.files) {
			fs.outputFile(file.path, file.content, function(err) {
				if (err) console.log(err) // => null

				fs.readFile(file.path, 'utf8', function(err, data) {
					console.log(data) // => hello!
				})
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
	 * 	new Template('template-name', (data, theme) => {
	 * 		return '// return string'
	 * 	}
	 * )
	 */
	add(peripheral) {
		if (peripheral instanceof Model) {
			this.peripherals.models.push(peripheral)
		}
		if (peripheral instanceof Template) {
			this.peripherals.templates.push(peripheral)
		}
	}
}

// function render() {}

export default Mole
