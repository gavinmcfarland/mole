export class Model {
	constructor(name, callback) {
		this.name = name
		this.string = callback()
		this.result = this.render()
	}
	render() {
		if (this.string) {
			return this.string
		}
	}
}
