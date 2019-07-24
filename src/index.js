import fs from 'fs'
import plugins from './lib/plugins.js'
import config from './lib/config.js'
import theme from './lib/parse-theme.js'

import writeFiles from './lib/write-files.js'

let outputs = []

function output(template, data, path) {
	// // If path specified in plugin use that, otherwise look in config
	if (path) {
		let object = {
			template: template || null,
			data: data || null,
			path: path || null
		}
		outputs.push(object)
	} else {
		if (typeof config.platforms !== 'undefined') {
			for (let platform of config.platforms) {
				platform = platform[Object.keys(platform)]

				// console.log(template || platform.output.template)

				let object = {
					template: template || platform.output.template || null,
					data: data || platform.output.data || null,
					path: path || platform.output.path || null
				}

				outputs.push(object)
			}
		}
	}
}

for (let [key, value] of Object.entries(plugins)) {
	// Call each of the plugins
	plugins[key]({
		theme: theme,
		output: output,
		property: 'property'
	})
}

console.log('-----------------')

writeFiles(outputs)
