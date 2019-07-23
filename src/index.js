import fs from 'fs'
import _ from 'lodash'
import theme from './lib/parse-theme.js'
import config from './config.js'
import plugins from './plugins.js'
import Handlebars from 'handlebars'
import templates from './lib/register-templates.js'
import output from './lib/output.js'
import property from './lib/property-definition.js'

var templateDir = config.platforms[0].css.output.template

// Takes an array like list of plugins and outputs a string

// console.log(config.platforms.css.output)

function processPlugins(plugins) {
	var array = []

	function output(string, data) {
		let str = ''
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

			if (arguments.length === 1) {
				if (typeof arguments[0] === 'object') {
					// probably data
					data = string
					str = Handlebars.compile(template)(data)
					array.push({
						string: str,
						path: './test/' + dir + file
					})
				} else {
					str = string + '\n'
					array.push({
						string: str,
						path: './test/' + dir + file
					})
				}
			} else if (arguments.length >= 2) {
				str = Handlebars.compile(string)(data) + '\n'
				array.push({ string: str, path: './test/' + dir + file })
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

const content = processPlugins(plugins)

console.log(content)

for (let v of content) {
	fs.writeFile(v.path, v.string, err => {
		if (err) console.log(err)
		console.log('Successfully Written to File.')
	})
}
