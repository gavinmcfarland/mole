module.exports = {
	theme: 'theme/',
	model: 'modelTest',
	template: 'templates/test.njk',
	output: [
		{ css: { file: 'styles.css' } },
		{ ios: { file: 'styles.css' } },
		{ android: { file: 'styles.css' } }
	]
}
