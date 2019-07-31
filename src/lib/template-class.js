export class Template {
	constructor(callback) {
		this.string = callback()
		this.result = this.render()
	}
	render() {
		if (this.string) {
			return this.string
		}
	}
}
