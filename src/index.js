import Mole from './lib/Mole'
import Model from './lib/Model'
import Template from './lib/Template'

const mole = new Mole()

/**
 * This is a test
 */

// import { Mole } from './lib/mole'
// const env = nunjucks.configure()
// import nunjucks from 'nunjucks'

// mole.add(
// 	new Mole.Model('model-name', model => {
// 		return (model.color.red = 'value')
// 	})
// )

// mole.model('model-name', model => {
// 	return (model.color.red = 'value')
// })

// mole.template('template-name', () => {
// 	return "I'm a {{color.red}}"
// })

mole.add(
	new Model('model-name', ({ data }) => {
		data.test = "hello to you"
		return data
	})
)

mole.add(
	new Template('template-name', () => {
		return '// return string'
	})
)

console.log(mole)

export default mole
