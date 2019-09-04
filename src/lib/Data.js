import clone from 'lodash.clonedeep'

export class Data {
	clone(theme) {
		Object.assign(this, clone(theme))
	}
}

const data = new Data()

export default data
