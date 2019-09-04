import env from './lib/env'

import mole from './lib/Mole'

if (env === 'test') {
	mole.build()
}

export default mole
