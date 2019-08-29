"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _jsonnet = _interopRequireDefault(require("@unboundedsystems/jsonnet"));

var _glob = _interopRequireDefault(require("glob"));

var _env = _interopRequireDefault(require("./env"));

var _types = require("@babel/types");

var _Config = _interopRequireDefault(require("./Config"));

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

///////////////////// Type Checker
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


function inte(value) {
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
    fn: 'inte',
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
  return what[0];
}

var is = {
  arr: arr,
  bad: bad,
  bool: bool,
  date: date,
  empty: empty,
  err: err,
  fn: fn,
  inte: inte,
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
  what: what ///////////////////// Config functions
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

};

var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    this.settings = {
      config: this.config('/src/stub/config.js'),
      theme: _Theme["default"].result
    };
  }

  _createClass(Mole, [{
    key: "config",
    value: function config(value) {
      if (value) {
        _Config["default"].result = _Config["default"].setConfig(value);
        return _Config["default"].setConfig(value);
      } else {
        this.settings.config = _Config["default"].result;
        this.settings.theme = _Theme["default"].result;
        return this;
      }
    }
  }, {
    key: "theme",
    value: function theme(value) {
      if (value) {
        return _Theme["default"].setTheme(value);
      } else {
        this.settings.theme = _Theme["default"].result;
        return this;
      }
    }
  }]);

  return Mole;
}();

var mole = new Mole();
mole.theme({
  number: 0
});
console.log(mole);
var _default = mole;
exports["default"] = _default;
module.exports = exports.default;