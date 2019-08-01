import config from './default-config.js'
import cloneDeep from 'lodash.clonedeep'

// Import the theme which it's path is specified in the config
const theme = require(__dirname + '/../' + config.theme).default
// Create a clone of the theme object which can be modified by the user
const model = cloneDeep(theme)

export class Template {
	constructor(name, callback) {
		this.name = name
		this.string = callback(model, theme)
		this.result = this.render()
	}
	render() {
		if (this.string) {
			return this.string
		}
	}
}
