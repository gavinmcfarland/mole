module.exports = {
	tags: {
		allowUnknownTags: true,
		dictionaries: ['jsdoc']
	},
	source: {
		include: ['./src', './README.md'],
		includePattern: '.js$',
		excludePattern: '(node_modules/|docs)'
	},
	plugins: ['plugins/markdown'],
	templates: {
		cleverLinks: false,
		monospaceLinks: true,
		useLongnameInNav: false,
		showInheritedInNav: true
	},
	opts: {
		destination: './jsdocs/',
		encoding: 'utf8',
		private: true,
		recurse: true,
		template: './node_modules/minami'
	}
}
