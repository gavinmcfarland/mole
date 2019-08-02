import mole from '../lib/mole.js'

export default new mole.Model('tokens', function(model) {
	return (model.color.red = '#FF0000')
})
