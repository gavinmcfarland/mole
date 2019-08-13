const { mole, Model, Template } = require('mole')

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
