import Theme from './Theme'

/**
 * Creates a clone of the `theme` data which can be manipulated and structured by `models`.
 * @memberof Mole
 */

class Data {
	constructor(data) {
		this.result = new Theme().clone()
	}
	update(data) {
		this.result = data
	}
}

const data = new Data()

export default data
