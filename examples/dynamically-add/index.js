const mole = require('mole')

// Dynamically add a model
mole.add('model', 'redModel', ({ data }) => {
	data.red = "#FF00000"
	return data
})

// Dynamically add a template
mole.add('template', 'redTemplate', () => {
	return `The color red is {{red}}`
})

mole.build()
