import config from './default-config.js'
import cloneDeep from 'lodash.clonedeep'

// Import the theme which it's path is specified in the config
export const theme = require(__dirname + '/../' + config.theme).default
// Create a clone of the theme object which can be modified by the user
export const model = cloneDeep(theme)
