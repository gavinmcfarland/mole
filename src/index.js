import fs from 'fs'
import _ from 'lodash'
import config from './default-config.js'
import plugins from './plugins.js'
import Handlebars from 'handlebars'

const theme = config.theme

function output(template, data) {
	return Handlebars.compile(template)(data);
}


// Loop through object of plugins and for each one take the ouput of their function and store in string
var data = "";
_.mapKeys(plugins, function(value, key) {
	data += plugins[key]({config: config, output: output}) + '\n';
})

// Write output of string to file
fs.writeFile('./test/test.css', data, err => {
	if (err) console.log(err);
	console.log('Successfully Written to File.');
})
