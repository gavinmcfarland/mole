import theme from './Theme'
import clone from 'lodash.clonedeep'

class Data {
	update() {
		Object.assign(this, this.clone())
	}
	clone(theme) {
		Object.assign(this, clone(theme))
		return clone(theme)
	}
}

const data = new Data()

export default data
