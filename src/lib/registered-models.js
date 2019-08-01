import { Model } from './model-class.js'

const model = {
	prop: 'hi'
}

let chars = new Model('chars', function() {
	return (model.chicken = 'yes')
})

let tokens = new Model('tokens', function() {
	return 'modellllll2'
})

export const registeredModels = [chars, tokens]
