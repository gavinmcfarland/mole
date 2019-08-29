import Theme from './Theme'

/**
 * Creates a clone of the `theme` data which can be manipulated and structured by `models`.
 * @memberof Mole
 */

let configuration = ''

class Data {
	constructor(configuration) {
		configuration = configuration
		this.result = new Theme(configuration).clone()
	}
	update(data) {
		this.result = data
	}
}

const data = new Data(configuration)

export default data
