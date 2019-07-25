import Handlebars from 'handlebars'
import fs from 'fs'

// for (let [i, v] of config.platforms.entries()) {
// 	console.log(v)
// }

var templateDir = config.platforms[0].css.output.template

var template1 = fs
	.readFileSync(__dirname + '/../templates/' + templateDir + '/var.hbars')
	.toString()

var template2 = fs
	.readFileSync(__dirname + '/../templates/' + templateDir + '/value.hbars')
	.toString()

function templates() {
	Handlebars.registerPartial('vars', template1)
	Handlebars.registerPartial('values', template2)
	return Handlebars
}

export default templates()
