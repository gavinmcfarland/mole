import { theme } from './parse-theme.js'
import cloneDeep from 'lodash.clonedeep'
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
		this.theme = theme
		this.model = this.cloneTheme()
		this.outputs = getOutputs()
		this.files = null
	}
	cloneTheme() {
		return cloneDeep(theme)
	}
}

const mole = new Mole()

export default mole

export { Template, Model }
