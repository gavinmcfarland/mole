import fs from 'fs'
import plugins from './plugins.js'

// let config = {
// 	theme: 'index.js',
// 	platforms: [
// 		{
// 			css: {
// 				process: {
// 					data: ''
// 				},
// 				output: {
// 					dir: 'src/css/',
// 					file: 'index.css',
// 					template: 'css',
// 					data: ''
// 				}
// 			}
// 		},
// 		{
// 			ios: {
// 				output: {
// 					dir: 'src/ios/',
// 					file: 'index.css',
// 					template: 'css'
// 				}
// 			}
// 		}
// 	],
// 	plugins: []
// }

// let array = []

// let platforms = []

// for (let platform of config) {
// 	for (let platform of platforms) {
// 		let object = {
// 			template: platform.output.template,
// 			path: template: platform.output.data,
// 			data: ''
// 		}
// 		platforms.push(object)
// 	}

// }

for (let plugin of plugins) {
	// Call each of the plugins
	for (let [key, value] of Object.entries(plugins)) {
		plugins[key]({
			theme: theme,
			output: output,
			property: property
		})
	}
}

// function output(template, data, path) {

// 	let array = []

// 	// Should update values of platforms array
// 	// If entries present in array then update them
// 	// If entries empty then add new ones

// 	path = path || config.path
// 	data = data || config.data
// 	template = template || config.template

// 	// TODO: Edgecase? If a path is specified then a new file will be created in addition to what is in config
// 	if (config.path) {
// 		let object = {
// 			template: platform.output.template,
// 			path: template: platform.output.data,
// 			data: ''
// 		}

// 		array.push(object)
// 	}

// 	platforms.push(array)

// }

// for (let platform of platforms) {
// 	fs.writeFile()
// }
