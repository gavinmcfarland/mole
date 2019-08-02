import { Template } from '../lib/mole.js'

export default new Template('thing1', function() {
	return "I'm {{color.red}}"
})
