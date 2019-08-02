export default new mole.Plugin({ theme, data }, function() {
	const data = {
		// do something
	}
	output(
		['../templates/css/function.njk', data, '/build/css/'],
		['../templates/css/function.njk', data, '/build/ios/'],
		['../templates/css/function.njk', data, '/build/android/']
	)
})
