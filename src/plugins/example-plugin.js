import process from '../util/create-data-map.js'

export default function({ theme, output }) {
	let data = process(theme.color.theme, ['classes', 'vars', 'values'])
	output(data)
}
