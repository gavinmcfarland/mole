import fs from 'fs'
import plugins from './lib/plugins.js'
import config from './lib/default-config.js'
import theme from './lib/parse-theme.js'
import output from './lib/output.js'
import property from './lib/property-definition.js'
import { outputs } from './lib/output.js'
import testing from './testing.js'

// const data = {}

// import writeFiles from './lib/write-files.js'

// for (let [key, value] of Object.entries(plugins)) {
// 	// Call each of the plugins
// 	plugins[key]({
// 		theme: theme,
// 		output: output,
// 		property: property,
// 		data: data
// 	})
// }

// writeFiles(outputs)
