import file from '../src/lib/Outputs'
const normaliseOutputs = file.__get__('normaliseOutputs')

test('should normalise outputs', () => {
	const normalisedConfig = {
		theme: 'theme/',
		model: ['modelTest'],
		template: ['templates/'],
		output: [
			{ css: { file: 'styles.css' } },
			{ ios: { file: 'styles.css' } },
			{ android: { file: 'styles.css' } }
		]
	}
	console.log(normaliseOutputs(normalisedConfig))
	expect(normaliseOutputs(normalisedConfig)).toEqual([{
			name: 'css',
			model: ['modelTest'],
			template: ['templates/'],
			dir: '',
			file: 'styles.css'
		},
		{
			name: 'ios',
			model: ['modelTest'],
			template: ['templates/'],
			dir: '',
			file: 'styles.css'
		},
		{
			name: 'android',
			model: ['modelTest'],
			template: ['templates/'],
			dir: '',
			file: 'styles.css'
		}
	])
})
