import { model, theme } from './clone-model.js'

export class Model {
	constructor(name, callback) {
		this.name = name
		this.string = callback(model, theme)
	}
}
