import Mole from './lib/Mole'
import Model from './lib/Model'
import Template from './lib/Template'

const mole = new Mole()

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

mole.build()

console.log(mole)

export default mole
