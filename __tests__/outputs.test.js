import file from '../src/lib/Outputs.js'
const normaliseOutputs = file.__get__('normaliseOutputs')

test('should normalise outputs', () => {
	const normalisedConfig = {
		theme: 'theme/',
		model: ['modelTest'],
		template: ['templates/'],
		root: '/',
		output: [
			{ css: { file: 'styles.css' } },
			{ ios: { file: 'styles.css' } },
			{ android: { file: 'styles.css' } }
		]
	}

	expect(normaliseOutputs(normalisedConfig)).toEqual([{
		name: 'css',
		model: ['modelTest'],
		template: ['templates/'],
		dir: './',
		file: 'styles.css'
	},
	{
		name: 'ios',
		model: ['modelTest'],
		template: ['templates/'],
		dir: './',
		file: 'styles.css'
	},
	{
		name: 'android',
		model: ['modelTest'],
		template: ['templates/'],
		dir: './',
		file: 'styles.css'
	}
	])
})
