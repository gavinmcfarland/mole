const mole = require('mole')

// Dynamically add a model
mole.create('model', 'redModel', (theme, model) => {
	theme.red = "#FF00000"
	return theme
})

// Dynamically add a template
mole.create('template', 'redTemplate', () => {
	return `The color red is {{red}}`
})

mole.build()
