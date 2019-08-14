const mole = require('mole')

mole.add('model', 'model-name', ({ data }) => {
	data.red = "#FF00000"
	return data
})

mole.add('template', 'template-name', () => {
	return `The color red is {{red}}`
})

mole.build()

console.log(mole)
