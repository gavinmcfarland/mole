import fs from 'fs-extra'

export default function(files) {
	for (let file of files) {
		fs.outputFile(file.path, file.content, function(err) {
			if (err) console.log(err) // => null

			fs.readFile(file.path, 'utf8', function(err, data) {
				console.log(data) // => hello!
			})
		})
	}
}
