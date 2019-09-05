import clone from 'lodash.clonedeep'

export class Data {
	clone(theme) {
		Object.assign(this, clone(theme))
	}
	update(data) {
		Object.assign(this, data)
	}
}

const data = new Data()

export default data
