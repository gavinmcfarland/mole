import fs from 'fs'
import { Model } from './model-class.js'
import config from './default-config.js'
import cloneDeep from 'lodash.clonedeep'

// Import the theme which it's path is specified in the config
const theme = require(__dirname + '/../' + config.theme).default
// Create a clone of the theme object which can be modified by the user
const model = cloneDeep(theme)

// const model = {
// 	prop: 'hi'
// }

let chars = new Model('chars', function() {
	return (model.color.red = '#FF0000')
})

let tokens = new Model('tokens', function() {
	return 'modellllll2'
})

export const registeredModels = [chars, tokens]

console.log(model)
