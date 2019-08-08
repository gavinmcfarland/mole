import dataModel from './data-model'

export default class Template {
	constructor(name, pluginFunction) {
		this.name = name
		this.template = pluginFunction()
	}
}
