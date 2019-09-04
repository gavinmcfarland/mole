const mole = require('mole')

mole.config('/src/config.js')

// // Dynamically add a model
// mole.create('model', 'redModel', ({ data }) => {
// 	data.red = "#FF00000"
// 	return data
// })

// Dynamically add a template
mole.create('template', 'redTemplate', () => {
	return `The color red is {{color.red}}`
})

mole.build()

console.log(mole.debug)
