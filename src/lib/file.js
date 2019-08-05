import is from '../util/is'

export default class File {
	constructor(output, plugins) {
		this.content = ''
		this.path = ''
		this.parseTemplates(output, plugins)
	}

	parseTemplates(output, plugins) {
		// Need to check if templates is an array or not
		if (is.arr(output.template)) {
			for (let template of output.template) {
				switch (is.what(template)[0]) {
					case 'path':
						console.log('value is a path')
						break
					case 'string':
						for (let plugin of plugins) {
							if (template === plugin.name) {
								// console.log('value is a named plugin')
								this.content = plugin.rendered
								this.path = output.path
							}
						}
						break
					default:
					// do something
				}
			}
		} else {
			// If not an array then put into array and process again
			output.template = [output.template]
			this.parseTemplates(output, plugins)
		}
	}
}
