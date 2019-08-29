import config from './Config'
import theme from './Theme'

config.result = config.setConfig('/src/stub/config.js')


class Mole {
	constructor() {

	}
	config(value) {
		config.result = config.setConfig(value)
	}
	theme(value) {
		theme.result = theme.setTheme(value)
	}
}

const mole = new Mole()

mole.theme({ number: 0 })


// console.log(mole)

export default mole
