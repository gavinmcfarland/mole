import testPlugin from '../test-plugin.js'

// TODO: Need to allow user to register templates

export default {
	theme: 'index.js',
	model: ['chars', 'tokens'],
	template: testPlugin(),
	output: [{ file: 'styles.css' }]
}
