import fs from 'fs'
import { Model } from './model-class.js'

let chars = new Model('chars', function(model, theme) {
	model.color.red = '#FF0000'
})

let tokens = new Model('tokens', function(model) {
	return 'modellllll2'
})

export const registeredModels = [chars, tokens]
