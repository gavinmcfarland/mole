import { Model } from '../lib/model'

export default new Model('modelTest', function(model) {
	return (model.color.red = '#FF0000')
})

// console.log(mole)
