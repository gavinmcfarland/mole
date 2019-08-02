import mole from './mole'

export class Template {
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
