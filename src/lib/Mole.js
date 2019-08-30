import config from './Config'
import theme from './Theme'
import data from './Theme'

// import Output from './Output'
import Peripherals from './Peripherals'
import Model from './Model'
// import Template from './Template'

const outputs = config.output

// console.log(data)
const peripherals = new Peripherals()

class Mole {
	constructor() {

	}
	config(value) {
		config.set(value)
	}
	theme(value) {
		theme.set(value)
	}
	create(...args) {
		if (args[0] === 'model') {
			// console.log(theme)
			peripherals.model.push(new Model(args[1], args[2], theme, data))
			// data.update(new Model(args[1], args[2]).data)
		}

		if (args[0] === 'template') {
			peripherals.template.push(new Template(args[1], args[2]))
		}

		// outputs.map(output => {
		// 	console.log(output)
		// 	return new Output(output, peripherals, config)
		// })

	}
}

const mole = new Mole()

theme.set({ number: 0 })

// mole.theme({ number: 0 })

// console.log(config)

mole.create('model', 'redModel', ({ theme, data }) => {
	// console.log(theme)
	console.log(data)
	return data
})

// console.log(data)

// console.log(peripherals)

// console.log(mole)

export default mole
