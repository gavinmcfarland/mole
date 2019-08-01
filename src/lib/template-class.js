import { model, theme } from './clone-model.js'

export class Template {
	constructor(name, callback) {
		this.name = name
		this.string = callback(model, theme)
		this.result = this.render()
	}
	render() {
		if (this.string) {
			return this.string
		}
	}
}
