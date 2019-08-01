import mole from '../lib/mole.js'

export default new mole.Template('thing1', function() {
	return "I'm {{color.red}}"
})
