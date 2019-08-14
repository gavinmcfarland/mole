let env = process.env.NODE_ENV || 'dev';

import Mole from './lib/Mole'

const mole = new Mole()

// console.log(mole)

if (env === 'dev') {
	mole.add('model', 'model-name', ({ data }) => {
		data.color.red = "#FF00000"
		return data
	})

	mole.add('template', 'template-name', () => {
		return `The color red is {{color.red}}`
	})

	// mole.build()
	console.log(mole)
}

export default mole
