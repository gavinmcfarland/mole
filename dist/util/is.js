"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__GetDependency__ = exports.__get__ = _get__;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// array
function arr(value) {
  return value && _typeof(value) === 'object' && value.constructor === Array;
} // bad


function bad(value) {
  return _get__("nll")(value) || _get__("undef")(value) || _get__("empty")(value) || _get__("err")(value);
} // boolean


function bool(value) {
  return typeof value === 'boolean';
} // empty


function empty(value) {
  return _get__("str")(value) && value === '' || _get__("arr")(value) && value.length === 0 || _get__("obj")(value) && Object.keys(value).length === 0;
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
  if (!_get__("noru")(check) && !_get__("noru")(value) && !_get__("noru")(fn1) && !_get__("noru")(fn2)) {
    return _get__("is")[check](value) ? fn1 : fn2;
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
    if (_get__("is")[check.fn](value)) what.push(check.name);
  });
  if (_get__("is").noru(value)) throw new Error('Missing value to test.');
  return what[0];
}

var is = {
  arr: _get__("arr"),
  bad: _get__("bad"),
  bool: _get__("bool"),
  date: _get__("date"),
  empty: _get__("empty"),
  err: _get__("err"),
  fn: _get__("fn"),
  inte: _get__("inte"),
  json: _get__("json"),
  nll: _get__("nll"),
  noru: _get__("noru"),
  num: _get__("num"),
  obj: _get__("obj"),
  file: _get__("file"),
  dir: _get__("dir"),
  path: _get__("path"),
  prom: _get__("prom"),
  regex: _get__("regex"),
  str: _get__("str"),
  sym: _get__("sym"),
  typa: _get__("typa"),
  undef: _get__("undef"),
  what: _get__("what")
};

var _default = _get__("is");

exports["default"] = _default;

function _getGlobalObject() {
  try {
    if (!!global) {
      return global;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    var globalVariable = _getGlobalObject();

    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }

    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }

  return _RewireModuleId__;
}

function _getRewireRegistry__() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }

  return theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
  var moduleId = _getRewireModuleId__();

  var registry = _getRewireRegistry__();

  var rewireData = registry[moduleId];

  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }

  return rewireData;
}

(function registerResetAll() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};
exports.__RewireAPI__ = _RewireAPI__;

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case "nll":
      return nll;

    case "undef":
      return undef;

    case "empty":
      return empty;

    case "err":
      return err;

    case "str":
      return str;

    case "arr":
      return arr;

    case "obj":
      return obj;

    case "noru":
      return noru;

    case "is":
      return is;

    case "bad":
      return bad;

    case "bool":
      return bool;

    case "date":
      return date;

    case "fn":
      return fn;

    case "inte":
      return inte;

    case "json":
      return json;

    case "num":
      return num;

    case "file":
      return file;

    case "dir":
      return dir;

    case "path":
      return path;

    case "prom":
      return prom;

    case "regex":
      return regex;

    case "sym":
      return sym;

    case "typa":
      return typa;

    case "what":
      return what;
  }

  return undefined;
}

function _assign__(variableName, value) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return rewireData[variableName] = value;
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);

  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

  _assign__(variableName, newValue);

  return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
  var rewireData = _getRewiredData__();

  if (_typeof(variableName) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
    return function () {
      Object.keys(variableName).forEach(function (name) {
        _reset__(variableName);
      });
    };
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  var rewireData = _getRewiredData__();

  delete rewireData[variableName];

  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }

  ;
}

function _with__(object) {
  var rewireData = _getRewiredData__();

  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset)["catch"](reset);
    } else {
      reset();
    }

    return result;
  };
}

var _typeOfOriginalExport = _typeof(is);

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(is, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(is)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}