"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// array
function arr(value) {
  return value && _typeof(value) === 'object' && value.constructor === Array;
} // bad


function bad(value) {
  return nll(value) || undef(value) || empty(value) || err(value);
} // boolean


function bool(value) {
  return typeof value === 'boolean';
} // empty


function empty(value) {
  return str(value) && value === '' || arr(value) && value.length === 0 || obj(value) && Object.keys(value).length === 0;
} // date


function date(value) {
  return value instanceof Date;
} // error


function err(value) {
  return value instanceof Error && typeof value.message !== 'undefined';
} // json


function json(value) {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
} // function


function fn(value) {
  return typeof value === 'function';
} // integer


function _int(value) {
  return typeof value === 'number' && isFinite(value) && Number.isInteger(value);
} // null


function nll(value) {
  return value == null;
} // null or undefined


function noru(value) {
  return value == null || typeof value === 'undefined';
} // number


function num(value) {
  return typeof value === 'number' && isFinite(value);
} // object


function obj(value) {
  return value && _typeof(value) === 'object' && value.constructor === Object;
} // promise


function prom(value) {
  return !!value && (_typeof(value) === 'object' || typeof value === 'function') && typeof value.then === 'function';
} // regex


function regex(value) {
  return value && _typeof(value) === 'object' && value.constructor === RegExp;
} // string


function str(value) {
  return typeof value === 'string' || value instanceof String;
} // symbol


function sym(value) {
  return _typeof(value) === 'symbol';
} // undefined


function undef(value) {
  return value === undefined || typeof value === 'undefined';
}

function path(value) {
  return /\/|\./im.test(value);
}

function dir(value) {
  return /^\.?\/?(\w+\/)+/im.test(value);
}

function file(value) {
  return /\/\w+$|\w+\.\w+$/im.test(value);
} // if type of $value is true, $fn1() else $fn2()


function typa(check, value, fn1, fn2) {
  if (!noru(check) && !noru(value) && !noru(fn1) && !noru(fn2)) {
    return is[check](value) ? fn1 : fn2;
  } else {
    throw new Error('Invalid parameters.');
  }
} // return type(s) of $value


function what(value) {
  var what = [];
  var checks = [{
    fn: 'arr',
    name: 'array'
  }, {
    fn: 'bool',
    name: 'boolean'
  }, {
    fn: 'date',
    name: 'date'
  }, {
    fn: 'err',
    name: 'error'
  }, {
    fn: 'fn',
    name: 'function'
  }, {
    fn: 'int',
    name: 'integer'
  }, {
    fn: 'json',
    name: 'json'
  }, {
    fn: 'nll',
    name: 'null'
  }, {
    fn: 'num',
    name: 'number'
  }, {
    fn: 'obj',
    name: 'object'
  }, {
    fn: 'file',
    name: 'file'
  }, {
    fn: 'dir',
    name: 'dir'
  }, {
    fn: 'path',
    name: 'path'
  }, {
    fn: 'prom',
    name: 'promise'
  }, {
    fn: 'regex',
    name: 'regexp'
  }, {
    fn: 'str',
    name: 'string'
  }, {
    fn: 'sym',
    name: 'symbol'
  }, {
    fn: 'undef',
    name: 'undefined'
  }];
  checks.forEach(function (check) {
    if (is[check.fn](value)) what.push(check.name);
  });
  if (is.noru(value)) throw new Error('Missing value to test.');
  return what;
}

var is = {
  arr: arr,
  bad: bad,
  bool: bool,
  date: date,
  empty: empty,
  err: err,
  fn: fn,
  "int": _int,
  json: json,
  nll: nll,
  noru: noru,
  num: num,
  obj: obj,
  file: file,
  dir: dir,
  path: path,
  prom: prom,
  regex: regex,
  str: str,
  sym: sym,
  typa: typa,
  undef: undef,
  what: what
};
var _default = is;
exports["default"] = _default;
module.exports = exports.default;