import Config from './Config'

/**
 * Theme data used by templates with outputs
 * @memberof Mole
 * @return {Object} Returns an object which is used by {@link Mole.Data}
 * ```js
 * // theme/index.js
 * export default {
 * 	font: {
 * 		size: [ 16, 19, 22, 26, 30, 35 ]
 * 	}
 * }
 */

class Theme {
	constructor() {}
	/**
	 * Keeps an original copy of the theme data in case it needs to be referenced by the user
	 */
	clone() {
		/*
		1. Clone parse theme for use by models and templates */
	}
	/**
	 * Parses the given theme data so it's usable by the rest of the app
	 */
	parse() {
		/*
		1. Find location of theme files
		2. Determine what type of file they are
		3. Convert to js object or json */
	}
}
