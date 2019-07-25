export default function({ theme, output }) {
	let data = {
		classes: [
			{
				value: 'hello',
				vars: [{ value: 'var1' }]
			},
			{ value: 'hello2' }
		]
	}
	output(data)
}
