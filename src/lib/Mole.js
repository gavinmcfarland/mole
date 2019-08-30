import config from './Config'
import theme from './Theme'

config.set('/src/stub/config.js')

class Mole {
	constructor() {

	}
	config(value) {
		config.set(value)
	}
	theme(value) {
		theme.set(value)
	}
}

const mole = new Mole()

mole.theme({ number: 0 })

console.log(config)

console.log(theme)

// console.log(mole)

export default mole
