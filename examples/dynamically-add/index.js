const mole = require('mole')

// Dynamically add a model
mole.create('model', 'redModel', ({ data }) => {
	data.red = "#FF00000"
	return data
})

// Dynamically add a template
mole.create('template', 'redTemplate', () => {
	return `The color red is {{red}}`
})

mole.build()
