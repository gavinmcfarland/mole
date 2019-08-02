import { Template } from '../lib/template'

export default new Template('templateTest', function() {
	return "I'm {{color.red}}"
})
