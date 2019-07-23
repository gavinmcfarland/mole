export default {
	theme: 'index.js',
	platforms: [
		{
			css: {
				data: {
					transform: 'kebabcase'
				},
				output: {
					dir: 'src/css/',
					file: 'index.css',
					template: 'css'
				}
			}
		},
		{
			ios: {
				output: {
					dir: 'src/ios/',
					file: 'index.css',
					template: 'css'
				}
			}
		}
	],
	plugins: []
}
