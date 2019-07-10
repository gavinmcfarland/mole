import fs from 'fs'
import _ from 'lodash'
import config from './default-config.js'
import plugins from './plugins.js'
import Handlebars from 'handlebars'

const theme = config.theme

// Takes an array like list of plugins and outputs a string
function processPlugins(plugins) {
	var str = ""

	function output(string, data) {
		if (arguments.length === 1) {
			str += string + '\n'
		}
		else if (arguments.length >= 2) {
			str += Handlebars.compile(string)(data) + '\n';
		}
	}

	_.mapKeys(plugins, function (value, key) {
		plugins[key]({config: config, output: output})
	})

	return str;
}

const content = processPlugins(plugins)

// Write output of string to file
fs.writeFile('./test/test.css', content, err => {
	if (err) console.log(err);
	console.log('Successfully Written to File.');
})
