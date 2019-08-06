module.exports = {
	theme: 'theme/',
	model: ['chars', 'tokens'],
	template: 'templates/',
	output: [
		{ css: { file: 'file.css' } },
		{ ios: { file: 'file.xml' } },
		{ android: { file: 'file.ios' } }
	]
}
