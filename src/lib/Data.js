import Theme from './Theme'

/**
 * Creates a clone of the `theme` data which can be manipulated and structured by `models`.
 * @memberof Mole
 */

class Data {
	constructor() {
		return new Theme().clone()
	}
}

export default Data
