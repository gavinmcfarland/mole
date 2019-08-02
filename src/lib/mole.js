import cloneDeep from 'lodash.clonedeep'
import parseTheme from './parse-theme.js'
import getOutputs from './get-outputs'

const Template = class Template {
	constructor(name, callback) {
		this.name = name
		this.string = callback(mole.model, mole.theme)
		this.result = this.render()
	}
	render() {
		if (this.string) {
			return this.string
		}
	}
}

const Model = class Model {
	constructor(name, callback) {
		this.name = name
		this.string = callback(mole.model, mole.theme)
	}
}

class Mole {
	constructor() {
		this.theme = this.parseTheme()
		this.model = this.cloneTheme()
		this.outputs = this.getOutputs()
		this.files = null
	}
	parseTheme() {
		return parseTheme()
	}
	cloneTheme() {
		return cloneDeep(this.theme)
	}
	getOutputs() {
		return getOutputs()
	}
}

const mole = new Mole()

export { Template, Model }

export default mole
