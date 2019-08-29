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

// if (env === 'test') {
// 	config = setConfig('/src/stub/config.js')

// } else {
// 	config = setConfig('mole.config.js')
// }

// class Theme extends Config {
// 	theme(value) {
// 		if (value) {
// 			theme = setTheme(value)
// 			return setTheme(value)
// 		} else {
// 			this.settings.theme = theme
// 			return this
// 		}

// 	}

// }

import config from './Config'
import theme from './Theme'

class Mole {
	constructor() {

		this.settings = {
			config: this.config('/src/stub/config.js'),
			theme: theme.result
		}

	}
	config(value) {
		if (value) {
			config.result = config.setConfig(value)
			return config.setConfig(value)
		} else {
			this.settings.config = config.result
			this.settings.theme = theme.result
			return this
		}
	}
	theme(value) {

		if (value) {
			return theme.setTheme(value)
		} else {
			this.settings.theme = theme.result
			return this
		}

	}
}

const mole = new Mole()

mole.theme({ number: 0 })

console.log(mole)

export default mole
