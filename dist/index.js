'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var glob = _interopDefault(require('glob'));
var clone = _interopDefault(require('lodash.clonedeep'));
var merge = _interopDefault(require('lodash.merge'));
var fs$1 = _interopDefault(require('fs-extra'));
var nunjucks = _interopDefault(require('nunjucks'));

let env = process.env.NODE_ENV;

// array
function arr(value) {
	return value && typeof value === 'object' && value.constructor === Array
}

// bad
function bad(value) {
	return nll(value) || undef(value) || empty(value) || err(value)
}

// boolean
function bool(value) {
	return typeof value === 'boolean'
}

// empty
function empty(value) {
	return (
		(str(value) && value === '') ||
		(arr(value) && value.length === 0) ||
		(obj(value) && Object.keys(value).length === 0)
	)
}

// date
function date(value) {
	return value instanceof Date
}

// error
function err(value) {
	return value instanceof Error && typeof value.message !== 'undefined'
}

// json
function json(value) {
	try {
		JSON.parse(value);
		return true
	} catch (e) {
		return false
	}
}

// function
function fn(value) {
	return typeof value === 'function'
}

// integer
function inte(value) {
	return (
		typeof value === 'number' && isFinite(value) && Number.isInteger(value)
	)
}

// null
function nll(value) {
	return value == null
}

// null or undefined
function noru(value) {
	return value == null || typeof value === 'undefined'
}

// number
function num(value) {
	return typeof value === 'number' && isFinite(value)
}

// object
function obj(value) {
	return value && typeof value === 'object' && value.constructor === Object
}

// promise
function prom(value) {
	return (
		!!value &&
		(typeof value === 'object' || typeof value === 'function') &&
		typeof value.then === 'function'
	)
}

// regex
function regex(value) {
	return value && typeof value === 'object' && value.constructor === RegExp
}

// string
function str(value) {
	return typeof value === 'string' || value instanceof String
}

// symbol
function sym(value) {
	return typeof value === 'symbol'
}

// undefined
function undef(value) {
	return value === undefined || typeof value === 'undefined'
}

function path(value) {
	return /\/|\./im.test(value)
}

function dir(value) {
	return /^\.?\/?(\w+\/)+/im.test(value)
}

function file$1(value) {
	return /\/\w+$|\w+\.\w+$/im.test(value)
}

// if type of $value is true, $fn1() else $fn2()
function typa(check, value, fn1, fn2) {
	if (!noru(check) && !noru(value) && !noru(fn1) && !noru(fn2)) {
		return is[check](value) ? fn1 : fn2
	} else {
		throw new Error('Invalid parameters.')
	}
}

// return type(s) of $value
function what(value) {
	let what = [];
	const checks = [
		{ fn: 'arr', name: 'array' },
		{ fn: 'bool', name: 'boolean' },
		{ fn: 'date', name: 'date' },
		{ fn: 'err', name: 'error' },
		{ fn: 'fn', name: 'function' },
		{ fn: 'inte', name: 'integer' },
		{ fn: 'json', name: 'json' },
		{ fn: 'nll', name: 'null' },
		{ fn: 'num', name: 'number' },
		{ fn: 'obj', name: 'object' },
		{ fn: 'file', name: 'file' },
		{ fn: 'dir', name: 'dir' },
		{ fn: 'path', name: 'path' },
		{ fn: 'prom', name: 'promise' },
		{ fn: 'regex', name: 'regexp' },
		{ fn: 'str', name: 'string' },
		{ fn: 'sym', name: 'symbol' },
		{ fn: 'undef', name: 'undefined' }
	];
	checks.forEach(check => {
		if (is[check.fn](value)) what.push(check.name);
	});
	if (is.noru(value)) throw new Error('Missing value to test.')

	return what[0]
}

const is = {
	arr,
	bad,
	bool,
	date,
	empty,
	err,
	fn,
	inte,
	json,
	nll,
	noru,
	num,
	obj,
	file: file$1,
	dir,
	path,
	prom,
	regex,
	str,
	sym,
	typa,
	undef,
	what
};

class Data {
	clone(theme) {
		Object.assign(this, clone(theme));
	}
	update(data) {
		Object.assign(this, data);
	}
}

const data = new Data();

const jsonnet = require('@unboundedsystems/jsonnet');

const RE_JS = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/im;
const RE_JSONNET = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/im;



class Theme {
	constructor() {
		return this
	}
	set(value, config) {

		// Parses the theme
		let result;

		if (is.what(value) === 'path' || is.what(value) === 'file' || is.what(value) === 'dir') {

			let path = getThemePath(config, value);

			if (RE_JS.test(path)) {
				result = require(file);

			}
			if (RE_JSONNET.test(path)) {

				const getFile = fs.readFileSync(path).toString();


				const jsonnetVm = new jsonnet.Jsonnet();

				result = jsonnetVm.eval(getFile);

				jsonnetVm.destroy();
			}
		} else if (is.what(value) === 'object') {
			result = value;
		} else {
			result = {};
		}

		// If theme already set then merge with new settings
		if (theme.result) {
			result = Object.assign(theme.result, result);
		}

		merge(this, result);
		data.clone(theme);
	}
}

function getThemePath(config, value) {

	let path = '';
	let files;

	// If theme is specified as a dir
	if (is.what(value) === 'dir') {
		files = glob.sync(process.cwd() + '/' + value + '**/*');
	}

	// If theme is specified as a file
	if (is.what(value) === 'file') {

		files = glob.sync(process.cwd() + '/' + value);

	}

	// Check if file is one of supported extensions
	files.map(function (file) {
		if (RE_JS.test(file) || RE_JSONNET.test(file)) {
			path = file;
		}
	});

	return path
}

const theme = new Theme();

class Config {
	constructor() {
		return this
	}
	set(value) {
		// console.log(value)
		// Get the input value for the config
		let input;
		// Check if value is a path to a file or an object
		if (typeof value === 'string') {
			if (fs$1.existsSync(process.cwd() + '/' + value)) {

				input = require(process.cwd() + '/' + value);
				// console.log(input)

			}
		}

		if (typeof value === 'object') {
			input = value;
		}

		if (input) {
			let result = {};

			// Record the root of where the file is stored
			let dir = '';

			// If path is matches a directory
			if (value.match(/(.*)[\/\\]/)) {
				dir = value.match(/(.*)[\/\\]/)[1] + '/';
			}

			result.root = process.cwd() + '/' + dir || '';
			result.rootOnly = dir;
			// Record the absolute path to the file
			result.path = process.cwd() + '/' + value;

			// Assign the properties of the input to the object we created
			result = Object.assign(result, input)

			// For model, template and output we must put them into arrays
			;
			['model', 'template', 'output'].forEach(function(current) {
				if (result[current]) result[current] = putValuesIntoArray(result[current]);
			});

			// Then we normalise the outputs
			result = normaliseOutputs(result);

			// If a theme is specified in the config input then we set the theme
			if (result.theme) {
				theme.set(result.rootOnly + result.theme, result);
			}
			// We assign the new properties to the Config object
			Object.assign(this, result);
		}
	}
}

function normaliseOutputs(config) {

	let result = config.output.map(function(output) {
		if (typeof output === 'undefined') {
			throw new Error('No outputs specified in config')
		}

		// Check for name
		let name;
		if (typeof output.file === 'undefined') {
			name = Object.keys(output)[0];
		} else {
			name = null;
		}

		// Check for model
		let model;
		if (output.model) {
			model = output.model;
		} else if (config.model) {
			model = config.model;
		} else {
			model = null;
		}

		// Check for template
		let template;
		if (output.template) {
			template = output.template;
		} else if (config.template) {
			template = config.template;
		} else {
			template = null;
		}

		// Check for directory
		let dir;
		if (output.dir) {
			if (config.dir) {
				dir = config.root + config.dir + output.dir;
			} else {
				dir = config.root + output.dir;
			}
		} else if (config.dir) {
			dir = config.root + config.dir;
		} else {
			dir = config.root + '';
		}

		// Check for file
		let file;
		if (typeof output.file === 'undefined') {
			file = output[name].file;

		} else {
			file = output.file;

		}

		return Object.assign({}, { name, model, template, dir, file })
	});

	config.output = result;

	return config
}

function putValuesIntoArray(value) {
	return Array.isArray(value) ? value : [value]
}

const config = new Config();

if (env === 'test') {
	config.set('src/stub/config.js');
} else {
	config.set('mole.config.js');
}

/**
 * Creates a list of Peripherals which contain `models` and/or `templates`
 * ```js
 * {
 *	models: [
 *		{ name: 'model-name', data: '' }
 *	],
 *	templates: [
 *		{ name: 'template-name', string: '' }
 *	]
 * }
 * ```
 * @memberof Mole
 * @property {Array} models A list of models
 * @property {Array} templates A list of templates
 */

class Peripherals {
	constructor() {
		this.model = [];
		this.template = [];
	}
}

const peripherals = new Peripherals();

// import theme from './Theme'

/**
 * Creates a new user defined template
 * @memberof Mole.Peripherals
 * @param {string} name Name of the template
 * @param {Mole.Peripherals.Template~function|string} func A callback that returns a string for the template
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 * @example
 * // Example while exporting as module
 * import Template from 'mole'
 *
 * export default new Template('template-name', function(model) {
 * 		return // The string you'd like to return to be parsed
 * 	})
 * )
 */
class Template {
	constructor(name, func, theme, data) {
		/**
		 * Callback for returning a template string
		 * @callback Mole.Peripherals.Template~function
		 * @param {Object} data - Access to the data model
		 * @param {Object} theme - Access the original theme data
		 * @return {String} Returns a string which is rendered using a templating engine
		 */

		theme = clone(theme);

		deepFreeze(theme);
		this.name = name;
		this.string = func(theme, data);
	}
}

function deepFreeze(object) {

	// Retrieve the property names defined on object
	var propNames = Object.getOwnPropertyNames(object);

	// Freeze properties before freezing self

	for (let name of propNames) {
		let value = object[name];

		object[name] = value && typeof value === "object" ?
			deepFreeze(value) : value;
	}

	return Object.freeze(object);
}

// console.log(theme)

// export class Model {
// 	constructor(name, callback) {
// 		this.name = name
// 		// This updates mole.model with changes from plugin
// 		Object.assign(mole.model, Object.getPrototypeOf(callback(mole.model)))
// 		// console.log(mole.model)
// 	}
// }

/**
 * Creates a new user defined model
 * @memberof Mole.Peripherals
 * @param {string} name Name of the model
 * @param {Mole.Peripherals.Model~function|object} func A callback that returns an object for the model
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 *
 * @example
 * // Example using `add()` method
 * mole.add(
 * 	new Model('model-name', function(data) {
 * 		return // The object you'd like to return which sets the data model
 * 	})
 * )
 */

class Model {
	constructor(name, func, theme, data) {
		this.name = name;
		data = clone(data);
		this.data = func(theme, data);
	}
}

class Output {
	constructor(output, peripherals, config, theme, data) {
		Object.assign(this, {
			name: output.name,
			...getContent(output, peripherals, config, theme, data),
			path: output.dir + output.file
		});
	}
}

function getContent(output, peripherals, config, theme, data) {

	let object = {};

	for (let type in peripherals) {

		if (output[type] === null) {
			output[type] = data;
		}

		if (output[type]) {
			let result = [];

			for (let value in output[type]) {

				switch (is.what(output[type][value])) {
					case 'dir':
						// eg "templates/"
						result.push(getContentFromDirs(output[type][value], output, peripherals, type, config, theme, data));
						break
					case 'file':
						// eg "templates/files.njk"
						result.push(getFileContent(output[type][value], type, config, theme, data));
						break
					case 'string':
						if (peripherals[type]) {

							// Check if any peripherals have been added
							if (peripherals[type].length > 0) {
								for (let peripheral of peripherals[type]) {

									if (output[type][value] === peripheral.name) {
										// eg "plugin-name"
										result.push(peripheral.data || peripheral.string);
									}

								}
							} else {
								// When model is added using config, but doesn't exist then set model to data. Needs improving
								result.push(data);
								// console.log(`No ${type}s added yet`)
							}

						} else {
							console.log(`No ${type}s named '${output[type][value]}', please check`);
						}

						break
					default:
						result.push(output[type]);
				}

			}

			if (type === 'model') {
				object[type] = merge(...result);
			}
			if (type === 'template') {
				object[type] = result.join('\n');
			}
		}

	}
	// console.log('object -> ', object)
	return object
}

function getContentFromDirs(dir, output, peripherals, type, config, theme, data) {
	let keys = [];
	keys = Object.keys(data);
	keys.push('index');
	keys = keys.join('|');
	// console.log(keys)

	let result = [];

	// If has subdirectory that matches named output eg "templates/ios/"
	if (fs$1.existsSync(config.root + dir + output.name + '/')) {
		// console.log('has matching directories')
		// Get files that match model eg "templates/ios/class.njk" or "templates/ios/index.njk"
		let files = glob.sync(config.root + dir + output.name + '/@(' + keys + ')*');

		for (let file of files) {

			// console.log(fs.readFileSync(file, 'utf8'))
			if (/\.js$/gmi.test(file)) {
				if (type === 'model') {
					let model = new Model('name', require(file), theme, data);
					result.push(model.data);
					data.update(model.data);

				}

				if (type === 'template') {
					result.push(new Template('name', require(file), theme, data).string);
				}

			} else {
				result.push(fs$1.readFileSync(file, 'utf8'));
			}

		}

	} else {
		// If main directory has file that matches named output eg "templates/ios.njk"
		// TODO: Could possibly also check if filename matches model eg. "ios.class.njk"
		let files = glob.sync(config.root + dir + output.name + '*');

		for (let file of files) {

			if (/\.js$/gmi.test(file)) {
				if (type === 'model') {
					let model = new Model('name', require(file), theme, data);
					result.push(model.data);
					data.update(model.data);

				}
				if (type === 'template') {
					result.push(new Template('name', require(file), theme, data).string);
				}

			} else {
				result.push(fs$1.readFileSync(file, 'utf8'));
			}
		}
	}

	if (type === 'model') {
		return merge(...result)
	}
	if (type === 'template') {
		return result.join('\n')
	}

}

function getFileContent(file, type, config, theme, data) {

	if (/\.js$/gmi.test(file)) {
		if (type === 'model') {
			let model = new Model('name', require(config.root + file), theme, data);
			data.update(model.data);

			return model.data
		}
		if (type === 'template') {
			return new Template('name', require(config.root + file), theme, data).string
		}
	} else {
		return fs$1.readFileSync(config.root + file, 'utf8')
	}
}

const nunjucksEnv = nunjucks.configure();

let files = [];

let things = [];

class Mole {
	constructor() {}
	config(value) {
		config.set(value);
	}
	theme(value) {
		theme.set(value, config);
	}
	create(...args) {
		if (args[0] === 'model') {
			let model = new Model(args[1], args[2], theme, data);
			peripherals.model.push(model);
			data.update(model.data);
		}

		if (args[0] === 'template') {
			peripherals.template.push(new Template(args[1], args[2], theme, data));
		}
		this._outputs();
	}
	// An alias for create, add() is depreciated */
	add(...args) {
		this.create(...args);
	}
	_outputs() {

		things = config.output.map(output => {

			return new Output(output, peripherals, config, theme, data)
		});
	}
	render() {
		let files = [];
		for (let output of things) {
			// console.log(output)
			let file = {
				content: nunjucksEnv.renderString(output.template, output.model),
				path: output.path
			};
			files.push(file);
		}
		return files
	}
	build() {
		this._outputs();

		for (let file of this.render()) {

			fs$1.outputFile(file.path, file.content, function(err) {
				if (err) console.log(err); // => null
				if (env === 'test') {
					fs$1.readFile(file.path, 'utf8', function(err, data) {
						console.log(data); // => hello!
					});
				}
			});
		}
	}
}

const mole = new Mole();

// console.log(config)

// mole.create('model', 'redModel', (theme, model) => {
// 	model.color.red = "#FF00000"
// 	return model
// })

// console.log(config)
// console.log(things)

// mole.build()

// mole.theme('src/stub/theme/override-theme.jsonnet')

// console.log(data)

// console.log(peripherals)

// console.log(mole)

if (env === 'test') {
	mole.build();
}

mole.debug = {
	config,
	theme,
	data,
	outputs: config.output,
	files,
	things
};

module.exports = mole;
//# sourceMappingURL=index.js.map
