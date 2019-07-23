import _ from 'lodash'
import v from 'voca'
import fs from 'fs'
import process from '../util/create-data-map.js'

export default function({ output, property, theme }) {
	// // property('padding')

	let data = process(theme.color.theme, ['classes', 'vars', 'values'])

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

	output(data)
}
