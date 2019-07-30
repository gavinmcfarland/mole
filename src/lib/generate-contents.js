import fs from 'fs-extra'
import glob from 'glob'
import getOutputs from './get-outputs.js'

let outputs = getOutputs()

function getContentFromDirs(path, output) {
	let files = glob.sync(path + output.name + '/*')
	let strings = []

	for (let i = 0; i < files.length; i++) {
		// console.log(fs.readFileSync(files[i], 'utf8'))
		strings.push(fs.readFileSync(files[i], 'utf8'))
	}
	// TODO: needs to parse the string using template renderer with associated model
	return strings.join('\n')
}

// New function
function parseTemplates(template, output) {
	if (Array.isArray(template)) {
		for (let i in template) {
			template = template[i]
			let DIRREG = /.+\/.?/im

			let isFunction = typeof template === 'function'
			let isObject = typeof template === 'object'
			let isDir = DIRREG.test(template)
			let isNamedTemplate = ''
			let isNamedOutput = output && output.name

			if (isFunction) {
				console.log('template is function')
				return 'should be function'
			} else if (isObject) {
				console.log('template is object')
				return 'should be object'
			} else if (isDir && isNamedOutput) {
				console.log('template is directory')
				return {
					content: getContentFromDirs(template, output),
					file: output.file
				}
			} else if (isNamedTemplate) {
				console.log('template is named template')
				// TODO: Needs to check template name against registered template
				return 'should be named template'
			} else {
				return template
			}
		}
	} else {
		return parseTemplates([template], output)
	}
}

function generateContents(outputs) {
	let files = []
	for (let output of outputs) {
		files.push(parseTemplates(output.template, output))
	}
	console.log(files)
}

export default generateContents(outputs)
