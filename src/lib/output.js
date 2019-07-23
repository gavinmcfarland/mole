import fs from 'fs'
import Handlebars from 'handlebars'
// Takes a template, data and converts using Handlebars which then writes to a file

// Make data optional?
// Make template = string?
export default function output(string, data) {
	let str = ''
	if (arguments.length === 1) {
		str += string + '\n'
	} else if (arguments.length >= 2) {
		str += Handlebars.compile(string)(data) + '\n'
	}
	return str
}
