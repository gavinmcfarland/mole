import fs from 'fs'
import _ from 'lodash'
import v from 'voca'
import theme from './lib/parse-theme.js'
import config from './config.js'
import plugins from './plugins.js'
import Handlebars from 'handlebars'
import templates from './lib/register-templates.js'
import output from './lib/output.js'
import property from './lib/property-definition.js'

var templateDir = config.platforms[0].css.output.template

var Transforms = {}

Transforms.kebabcase = function(object) {
	let newObject = JSON.parse(JSON.stringify(object))

	function x(object) {
		if (typeof object === 'object') {
			_.each(object, function(value, key) {
				if (key === 'value') {
					object.value = v.kebabCase(value)
				} else if (Array.isArray(value)) {
					_.each(value, function(item, index) {
						x(item)
					})
				}
			})
		}
	}

	x(newObject)

	return newObject
}

// Takes an array like list of plugins and outputs an array of objects with keys string and data
function processPlugins(plugins) {
	var array = []

	function output(string, data) {
		if (arguments.length === 1 && typeof arguments[0] === 'object') {
			// probably data
			data = string
		}

		// console.log(transforms.kebabcase)

		for (let platform of config.platforms) {
			let name = Object.keys(platform)[0]
			let templateDir = platform[name].output.template
			let dir = platform[name].output.dir
			let file = platform[name].output.file
			let template = fs
				.readFileSync(
					__dirname + '/templates/' + templateDir + '/class.hbars'
				)
				.toString()

			let newData = false
			if (platform[name].output.hasOwnProperty('data')) {
				if (platform[name].output.data.hasOwnProperty('transform')) {
					newData = Transforms[platform[name].output.data.transform](
						data
					)

					if (arguments.length === 1) {
						if (typeof arguments[0] === 'object') {
							array.push({
								template: template,
								path: './test/' + dir + file,
								data: newData
							})
						} else {
							array.push({
								template: string + '\n',
								path: './test/' + dir + file
							})
						}
					}

					// For each data transform check if it is defined in config

					if (arguments.length >= 2) {
						array.push({
							template: string,
							path: './test/' + dir + file,
							data: newData
						})
					}
				}
			} else {
				if (arguments.length === 1) {
					if (typeof arguments[0] === 'object') {
						array.push({
							template: template,
							path: './test/' + dir + file,
							data: data
						})
					} else {
						array.push({
							template: string + '\n',
							path: './test/' + dir + file
						})
					}
				}

				// For each data transform check if it is defined in config

				if (arguments.length >= 2) {
					array.push({
						template: string,
						path: './test/' + dir + file,
						data: data
					})
				}
			}
		}
	}

	_.mapKeys(plugins, function(value, key) {
		plugins[key]({
			theme: theme,
			output: output,
			property: property
		})
	})

	return array
}

const files = processPlugins(plugins)

// console.log(JSON.stringify(files, null, 4))

for (let file of files) {
	let string = ''
	if (file.data) {
		string = Handlebars.compile(file.template)(file.data)
	} else {
		string = file.template
	}
	fs.writeFile(file.path, string, err => {
		if (err) console.log(err)
		console.log('Successfully Written to File.')
	})
}
