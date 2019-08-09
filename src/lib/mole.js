// import Theme from './Theme'
import Outputs from './Outputs'
import Peripherals from './Peripherals'
// import Model from './Model'
// import Template from './Template'
import Config from './Config'
import Model from './Model'
import Template from './Template'

/**
 * Create a new instance of the main application
 *
 * ```js
 * const mole = Mole()
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
		this.peripherals = new Peripherals()
	}

	// model(name, func) {
	// 	this.models = []
	// 	this.models.push(new Model(name, func))
	// }

	// template(name, func) {
	// 	this.templates.push(new Template(name, func))
	// 	this.files = this.genFiles()
	// }

	/**
	 * Renders the `templates` and `models` of the outputs
	 */
	render() {
		// for (let output of this.outputs) {
		// 	// render()
		// }
	}

	/**
	 * Builds the files from the outputs
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
	 * Adds a new `model` or `template`
	 * @param {Mole.Model|Mole.Template} instance Either an instance of a `Model` or a `Template`
	 * @param {String} [output] A named output the model or template should attach to
	 * @example
	 * // Adding a template dynamically to a named output of `css`
	 * mole.add(
	 * 	new Template('template-name', (data, theme) => {
	 * 		return '// return string'
	 * 	}
	 * )
	 */
	add(peripheral) {
		console.log(peripheral)
		if (peripheral instanceof Model) {
			this.peripherals.models.push(peripheral)
		}
		if (peripheral instanceof Template) {
			this.peripherals.templates.push(peripheral)
		}
	}
	/**
	 * An shortcut for adding a model using {@link Mole#add}
	 * @param {String} name Name of the model
	 * @param {Mole.Model~function} callback A callback that returns an object for the model
	 */
	model(name, callback) {}

	/**
	 * An shortcut for adding a template using {@link Mole#add}
	 * @param {String} name Name of the template
	 * @param {Mole.Template~function} callback A callback that returns a string for the template
	 */
	template(name, callback) {}
}

// function render() {}

export default Mole
