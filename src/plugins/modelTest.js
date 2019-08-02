import mole from '../lib/mole'

export default new mole.Model('modelTest', function(model) {
	return (model.color.red = '#FF0000')
})

// console.log(mole)
