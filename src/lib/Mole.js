import fs from 'fs'
import jsonnet from '@unboundedsystems/jsonnet'
import glob from 'glob'
import env from './env'
import { tsObjectKeyword } from '@babel/types';

///////////////////// Type Checker

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
		JSON.parse(value)
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

function file(value) {
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
	let what = []
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
	]
	checks.forEach(check => {
		if (is[check.fn](value)) what.push(check.name)
	})
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
	file,
	dir,
	path,
	prom,
	regex,
	str,
	sym,
	typa,
	undef,
	what
}

///////////////////// Config functions

let config
let theme

///////////////////// Theme functions

// function Theme(value) {
// 	this.settings = {}

// 	if (value) {
// 		theme = setTheme(value)

// 		return setTheme(value)
// 	} else {
// 		this.settings.theme = theme
// 		return this
// 	}

// }

// function Config(value) {
// 	this.settings = {}
// 	if (value) {
// 		config = setConfig(value)
// 		return setConfig(value)
// 	} else {
// 		this.settings.config = config
// 		this.settings.theme = theme
// 		return this
// 	}
// }

// var test = new Thing()

///////////////////// Mole class

class Config {
	constructor() {
		this.settings = {}
	}
	config(value) {

		if (value) {
			config = setConfig(value)

			return setConfig(value)
		} else {
			this.settings.config = config
			this.settings.theme = theme
			return this
		}
	}
}

function setConfig(value) {
	let config = {}
	let result = {}

	config.root = process.cwd() + value.match(/(.*)[\/\\]/)[1] + '/' || ''
	config.path = process.cwd() + value

	if (typeof value === 'string') {
		result = require(config.path)
	}
	if (typeof value === 'object') {
		result = value
	}
	config = Object.assign(config, result)

	;
	['model', 'template', 'output'].forEach(function(current) {
		if (config[current]) config[current] = putValuesIntoArray(config[current])
	})

	config = normaliseOutputs(config)

	// If theme is specified in config then set the theme
	if (config.theme) {
		theme = setTheme(config.theme, config)
	}
	return config
}

function normaliseOutputs(config) {
	config.output.map(function(output) {
		if (typeof output === 'undefined') {
			throw new Error('No outputs specified in config')
		}

		// Check for name
		let name
		if (typeof output.file === 'undefined') {
			name = Object.keys(output)[0]
		} else {
			name = null
		}

		// Check for model
		let model
		if (output.model) {
			model = output.model
		} else if (config.model) {
			model = config.model
		} else {
			model = null
		}

		// Check for template
		let template
		if (output.template) {
			template = output.template
		} else if (config.template) {
			template = config.template
		} else {
			template = null
		}

		// Check for directory
		let dir
		if (output.dir) {
			if (config.dir) {
				dir = '.' + config.root + config.dir + output.dir
			} else {
				dir = '.' + config.root + output.dir
			}
		} else if (config.dir) {
			dir = '.' + config.root + config.dir
		} else {
			dir = '.' + config.root + ''
		}

		// Check for file
		let file
		if (typeof output.file === 'undefined') {
			file = output[name].file

		} else {
			file = output.file

		}

		return Object.assign({}, { name, model, template, dir, file })
	})

	return config
}

function putValuesIntoArray(value) {
	return Array.isArray(value) ? value : [value]
}

// if (env === 'test') {
// 	config = setConfig('/src/stub/config.js')

// } else {
// 	config = setConfig('mole.config.js')
// }

class Theme extends Config {
	theme(value) {
		if (value) {
			theme = setTheme(value)
			return setTheme(value)
		} else {
			this.settings.theme = theme
			return this
		}

	}

}

function setTheme(value, config) {

	let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
	let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim
	let result
	if (is.what(value) === 'path' || is.what(value) === 'file') {

		let path = getThemePath(config)

		if (jsRegex.test(path)) {
			result = require(file)

		}
		if (jsonnetRegex.test(path)) {

			const getFile = fs.readFileSync(path).toString()

			const jsonnetVm = new jsonnet.Jsonnet()

			result = jsonnetVm.eval(getFile)

			jsonnetVm.destroy()
		}
	} else if (is.what(value) === 'object') {
		result = value
	} else {
		result = {}
	}

	// If theme already set then merge with new settings
	if (theme) {
		result = Object.assign(theme, result)
	}

	return result
}

function getThemePath(config) {

	let path = ''
	let files

	if (is.what(config.theme) === 'dir') {
		files = glob.sync(config.root + config.theme + '**/*')
	} else if (is.what(config.theme) === 'file') {
		files = glob.sync(config.root + config.theme)
	}

	for (let file of files) {

		let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
		let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim
		if (jsRegex.test(file)) {
			path = file
		} else if (jsonnetRegex.test(file)) {
			path = file
		}
	}

	return path
}

class Mole extends Theme {
	constructor() {
		super()
		this.settings = {
			config: this.config('/src/stub/config.js'),
			theme: theme
		}
	}
}

// Mole.prototype.theme = function(value) {

// 	if (value) {
// 		theme = setTheme(value)
// 		return setTheme(value)
// 	} else {
// 		this.settings.theme = theme
// 		return this
// 	}

// }

// Mole.prototype.config = function(value) {
// 	if (value) {
// 		config = setConfig(value)
// 		return setConfig(value)
// 	} else {
// 		this.settings.config = config
// 		this.settings.theme = theme
// 		return this
// 	}
// }

const mole = new Mole()

console.log(mole)

export default mole
