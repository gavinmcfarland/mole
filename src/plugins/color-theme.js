import _ from 'lodash'
import v from 'voca'
import fs from 'fs'
import process from '../util/create-data-map.js'

export default function({ config, output, property }) {
	// // property('padding')

	let data = process(config.theme.color.theme, ['classes', 'vars', 'values'])

	function convertCase(object) {
		if (typeof object === 'object') {
			_.each(object, function(value, key) {
				if (key === 'value') {
					object.value = v.kebabCase(value)
				} else if (Array.isArray(value)) {
					_.each(value, function(item, index) {
						convertCase(item)
					})
				}
			})
		}

		return object
	}

	convertCase(data)

	var themeRules = fs
		.readFileSync(__dirname + '/../templates/css/class.hbars')
		.toString()

	output(themeRules, data)
}
