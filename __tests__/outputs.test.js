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
	expect(normaliseOutputs(normalisedConfig.output)).toEqual([
		{
			name: 'css',
			model: ['templates/'],
			template: ['templates/'],
			dir: '',
			file: 'styles.css'
		},
		{
			name: 'ios',
			model: ['templates/'],
			template: ['templates/'],
			dir: '',
			file: 'styles.css'
		},
		{
			name: 'android',
			model: ['templates/'],
			template: ['templates/'],
			dir: '',
			file: 'styles.css'
		}
	])
})
