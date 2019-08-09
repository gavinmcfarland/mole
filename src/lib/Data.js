import Theme from './Theme'

/**
 * A clone of the `theme` data which has been manipulated and structured by `models`.
 * @memberof Mole
 */

class Data {
	constructor() {
		return new Theme().clone()
	}
}

export default Data
