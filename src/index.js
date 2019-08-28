import env from './lib/env'

import Mole from './lib/Mole'

const mole = new Mole()

// console.log(mole)

if (env === 'test') {
	mole.config({
		theme: 'theme/theme.jsonnet',
		model: 'models/modelTest.js',
		template: 'templates/',
		output: [
			{ css: { file: 'styles.h' } },
			{ ios: { file: 'styles.g' } },
			{ android: { file: 'styles.t' } }
		]
	})

	mole.add('model', 'model-name', ({ data }) => {
		data.color.red = "#FF00000"
		return data
	})

	mole.add('template', 'template-name', ({ data }) => {
		return `The color red is ${data.color.red}`
	})

	mole.build()

	console.log(mole)
}

export default mole
