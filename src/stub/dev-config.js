module.exports = {
	theme: 'theme/theme.jsonnet',
	model: 'model-name',
	template: 'templates/',
	output: [
		{ css: { file: 'styles.css' } },
		{ ios: { file: 'styles.css' } },
		{ android: { file: 'styles.css' } }
	]
}
