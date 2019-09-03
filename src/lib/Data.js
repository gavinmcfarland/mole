import clone from 'lodash.clonedeep'

export class Data {
	static update() {
		Object.assign(this, clone())
	}
	update() {
		Object.assign(this, this.clone())
		return this.clone()
	}
	clone(theme) {
		Object.assign(this, clone(theme))
		return clone(theme)
	}
}

export const data = new Data()

export default data
