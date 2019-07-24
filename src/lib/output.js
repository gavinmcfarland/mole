import config from './config.js'

let outputs = []

// Takes a template, data and converts using Handlebars which then writes to a file

// Make data optional?
// Make template = string?
export default function output(template, data, path) {
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

export { outputs }
