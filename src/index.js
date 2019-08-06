import mole from './lib/mole'
const env = nunjucks.configure()
import nunjucks from 'nunjucks'

class Plugin {
	constructor(name, callback) {
		this.name = name
		if (callback(mole.model, mole.theme))
			this.string = callback(mole.model, mole.theme)
		if (this.render()) this.rendered = this.render()
		this.model = mole.model
	}
	render() {
		if (this.string) {
			return env.renderString(this.string, mole.model)
		}
	}
}

// mole.setPlugin(
// 	new Plugin('modelTest', function(model) {
// 		console.log(model)
// 	})
// )

// mole.setPlugin(
// 	new Plugin('templateTest', function() {
// 		return "I'm {{color.red}}"
// 	})
// )

console.log(mole)

export default mole
