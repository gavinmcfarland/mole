/**
 * Creates a list of Peripherals which contain `models` and/or `templates`
 * ```js
 * {
 *	models: [
 *		{ name: 'model-name', data: '' }
 *	],
 *	templates: [
 *		{ name: 'template-name', string: '' }
 *	]
 * }
 * ```
 * @memberof Mole
 * @property {Array} models A list of models
 * @property {Array} templates A list of templates
 */

class Peripherals {
	constructor() {
		this.model = []
		this.template = []
	}
}

const peripherals = new Peripherals()

export default peripherals
