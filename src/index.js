import fs from 'fs'
import _ from 'lodash'
import config from './default-config.js'
import plugins from './plugins.js'

// Loop through object of plugins and for each one take the ouput of their function and store in string
var data = "";
_.mapKeys(plugins, function(value, key) {
	data += plugins[key](config) + '\n';
})

// Write output of string to file
fs.writeFile('./test/test.css', data, err => {
	if (err) console.log(err);
	console.log('Successfully Written to File.');
})

