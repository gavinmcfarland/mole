import cloneDeep from 'lodash.clonedeep'
import Theme from './theme'
import getOutputs from './get-outputs'
import writeFiles from './write-files'

class Mole {
	constructor() {
		this.theme = new Theme().parse()
		this.model = new Theme().model
		this.plugins = {}
		this.Template = Template
		this.Model = Model
		this.outputs = this.getOutputs()
		this.files = null
	}
	getOutputs() {
		return getOutputs()
	}
	model() {
		return this.model
	}
	write() {
		return writeFiles(this.files)
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
		// Use this to get new modified version of model from plugin
		// TODO: find a way to update original mole.model class with new model from plugin
		this.value = Object.assign(
			Object.create({}, Object.getPrototypeOf(callback(mole.model))),
			mole.model
		)
	}
}

const mole = new Mole()

export default mole
