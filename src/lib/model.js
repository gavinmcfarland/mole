// import mole from './mole'

// export class Model {
// 	constructor(name, callback) {
// 		this.name = name
// 		// This updates mole.model with changes from plugin
// 		Object.assign(mole.model, Object.getPrototypeOf(callback(mole.model)))
// 		// console.log(mole.model)
// 	}
// }

export default class Model {
	constructor(name, callback) {
		this.name = name
		this.func = callback()
	}
}
