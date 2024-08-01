module.exports = {
	theme: 'theme/theme.jsonnet',
	model: 'models/modelTest.js',
	template: 'templates/',
	output: [
		{ css: { file: 'styles.css' } },
		{ ios: { file: 'styles.h' } },
		{ android: { file: 'styles.t' } }
	]
}
