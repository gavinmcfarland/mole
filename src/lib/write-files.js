import fs from 'fs-extra'
import groupBy from '../util/group-by.js'
import ejs from 'ejs'

// Takes an array of ouputs like `[{ template: {string}, data: {object}, path: {string} }]`
// and writes them to file by converting to uniques

export default function(outputs) {
	// 1. Look for unique path names and add to array
	var unique = [...new Set(outputs.map(a => a.path))]

	// 2. for each unique path name group outputs by path name and create new array of objects
	const grouped = groupBy(outputs, output => output.path)

	// 3. for each object in array create a new object grouped by path name
	let files = []
	for (let thing of unique) {
		let object = {
			[thing]: grouped.get(thing)
		}

		files.push(object)
	}

	// 4. For each group of paths create a new string for content (will have template parses in here eventually)
	let contents = []
	for (let file of files) {
		let name = Object.keys(file)[0]
		file = file[Object.keys(file)]
		// console.log(file)

		let string = ''

		for (let output of file) {
			// let templatePath = `${__dirname}/../templates/${output.template}/class.ejs`
			// let template = fs.readFileSync(templatePath).toString()

			string += output.template
		}
		contents.push({
			string: string,
			path: name
		})
	}

	// 5. For each bit of content write it to file
	for (let content of contents) {
		fs.outputFile(content.path, content.string, function(err) {
			if (err) console.log(err) // => null

			fs.readFile(content.path, 'utf8', function(err, data) {
				console.log(data) // => hello!
			})
		})
	}
}
