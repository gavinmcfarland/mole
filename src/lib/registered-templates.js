import { Template } from './template-class.js'

let thing1 = new Template('thing1', function() {
	return "I'm {{color.red}}"
})

let thing2 = new Template('thing2', function() {
	return 'oooooh2'
})

export const registeredTemplates = [thing1, thing2]
