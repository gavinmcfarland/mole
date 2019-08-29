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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

};

var _config;

var _theme;

function setConfig(value) {
  var config = {};
  var result = {};
  config.root = process.cwd() + value.match(/(.*)[\/\\]/)[1] + '/' || '';
  config.path = process.cwd() + value;

  if (typeof value === 'string') {
    result = require(config.path);
  }

  if (_typeof(value) === 'object') {
    result = value;
  }

  config = Object.assign(config, result);
  ['model', 'template', 'output'].forEach(function (current) {
    if (config[current]) config[current] = putValuesIntoArray(config[current]);
  });
  config = normaliseOutputs(config); // If theme is specified in config then set the theme

  if (config.theme) {
    _theme = setTheme(config.theme, config);
  }

  return config;
}

function normaliseOutputs(config) {
  config.output.map(function (output) {
    if (typeof output === 'undefined') {
      throw new Error('No outputs specified in config');
    } // Check for name


    var name;

    if (typeof output.file === 'undefined') {
      name = Object.keys(output)[0];
    } else {
      name = null;
    } // Check for model


    var model;

    if (output.model) {
      model = output.model;
    } else if (config.model) {
      model = config.model;
    } else {
      model = null;
    } // Check for template


    var template;

    if (output.template) {
      template = output.template;
    } else if (config.template) {
      template = config.template;
    } else {
      template = null;
    } // Check for directory


    var dir;

    if (output.dir) {
      if (config.dir) {
        dir = '.' + config.root + config.dir + output.dir;
      } else {
        dir = '.' + config.root + output.dir;
      }
    } else if (config.dir) {
      dir = '.' + config.root + config.dir;
    } else {
      dir = '.' + config.root + '';
    } // Check for file


    var file;

    if (typeof output.file === 'undefined') {
      file = output[name].file;
    } else {
      file = output.file;
    }

    return Object.assign({}, {
      name: name,
      model: model,
      template: template,
      dir: dir,
      file: file
    });
  });
  return config;
}

function putValuesIntoArray(value) {
  return Array.isArray(value) ? value : [value];
} // if (env === 'test') {
// 	config = setConfig('/src/stub/config.js')
// } else {
// 	config = setConfig('mole.config.js')
// }
///////////////////// Theme functions


function setTheme(value, config) {
  var jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim;
  var jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim;
  var result;

  if (is.what(value) === 'path' || is.what(value) === 'file') {
    var _path = getThemePath(config);

    if (jsRegex.test(_path)) {
      result = require(file);
    }

    if (jsonnetRegex.test(_path)) {
      var getFile = _fs["default"].readFileSync(_path).toString();

      var jsonnetVm = new _jsonnet["default"].Jsonnet();
      result = jsonnetVm.eval(getFile);
      jsonnetVm.destroy();
    }
  } else if (is.what(value) === 'object') {
    result = value;
  } else {
    result = {};
  } // If theme already set then merge with new settings


  if (_theme) {
    result = Object.assign(_theme, result);
  }

  return result;
}

function getThemePath(config) {
  var path = '';
  var files;

  if (is.what(config.theme) === 'dir') {
    files = _glob["default"].sync(config.root + config.theme + '**/*');
  } else if (is.what(config.theme) === 'file') {
    files = _glob["default"].sync(config.root + config.theme);
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _file = _step.value;
      var jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim;
      var jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim;

      if (jsRegex.test(_file)) {
        path = _file;
      } else if (jsonnetRegex.test(_file)) {
        path = _file;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return path;
} // function Theme(value) {
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


var Config =
/*#__PURE__*/
function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, [{
    key: "config",
    value: function config(value) {
      this.settings = {};

      if (value) {
        _config = setConfig(value);
        return setConfig(value);
      } else {
        this.settings.config = _config;
        this.settings.theme = _theme;
        return this;
      }
    }
  }]);

  return Config;
}();

var Theme =
/*#__PURE__*/
function (_Config) {
  _inherits(Theme, _Config);

  function Theme() {
    _classCallCheck(this, Theme);

    return _possibleConstructorReturn(this, _getPrototypeOf(Theme).apply(this, arguments));
  }

  _createClass(Theme, [{
    key: "theme",
    value: function theme(value) {
      this.settings = {};

      if (value) {
        _theme = setTheme(value);
        return setTheme(value);
      } else {
        this.settings.theme = _theme;
        return this;
      }
    }
  }]);

  return Theme;
}(Config);

var Mole =
/*#__PURE__*/
function (_Theme) {
  _inherits(Mole, _Theme);

  function Mole() {
    var _this;

    _classCallCheck(this, Mole);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mole).call(this));
    _this.settings = {
      config: _this.config('/src/stub/config.js')
    };
    return _this;
  }

  return Mole;
}(Theme); // Mole.prototype.theme = function(value) {
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


var mole = new Mole();
console.log(mole.config());
var _default = mole;
exports["default"] = _default;
module.exports = exports.default;