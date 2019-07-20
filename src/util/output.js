import fs from 'fs'
import Handlebars from 'handlebars'
// Takes a template, data and converts using Handlebars which then writes to a file

// Make data optional?
// Make template = string?
export default function output(template, data) {
	var content = Handlebars.compile(template)(data)
	fs.writeFile('./test/test.css', content, err => {
		if (err) console.log(err)
		console.log('Successfully Written to File.')
	})
}
