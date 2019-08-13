let env = process.env.NODE_ENV || 'dev';

import { Mole, Model, Template } from './lib/Mole'

const mole = new Mole()

if (env === 'dev') {
	mole.add(
		new Model('model-name', ({ data }) => {
			data.red = "#FF000"
			return data
		})
	)

	mole.add(
		new Template('template-name', () => {
			return 'I am {{red}}'
		})
	)
	mole.build()
	console.log(mole)
}

export { mole, Model, Template }
