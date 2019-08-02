import mole from '../lib/mole'

export default new mole.Template('templateTest', function() {
	return "I'm {{color.red}}"
})
