import _ from 'lodash'
import v from 'voca'
import fs from 'fs'
import process from '../util/create-data-map.js'

export default function({ output, property, theme }) {
	// // property('padding')

	let data = process(theme.color.theme, ['classes', 'vars', 'values'])

	output(data)
}
