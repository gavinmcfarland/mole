import mole from '../lib/mole.js'

export default new mole.Model('chars', function(model) {
	return (model.color.red = '#FF0000')
})

// console.log(mole)
