import cloneDeep from 'lodash.clonedeep'
import parseTheme from './parse-theme.js'
import getOutputs from './get-outputs'

class Mole {
	constructor() {
		this.theme = this.parseTheme()
		this.model = this.cloneTheme()
		this.plugins = {}
		this.plugins.templates = []
		this.Template = Template
		this.Model = Model
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

class Template {
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

class Model {
	constructor(name, callback) {
		this.name = name
		this.data = callback(mole.model, mole.theme)
	}
}

const mole = new Mole()

export default mole
