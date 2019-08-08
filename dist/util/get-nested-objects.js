"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _DefaultExportValue;
exports.__GetDependency__ = exports.__get__ = _get__;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This function will get property at desired level
function _DefaultExportValue(obj, depth) {
  function iterObj(obj, depth) {
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    i++;

    _get__("_").each(obj, function (value, property) {
      while (i < depth) {
        if (_typeof(obj[property]) === 'object') {
          return iterObj(obj[property], depth, i);
        } else {
          return false;
        }
      }

      if (i === depth) {
        arr.push(_defineProperty({}, property, value));
      }

      return obj;
    }); // console.log(arr)


    if (i === depth) {
      return arr;
    }
  }

  var arr = [];
  iterObj(obj, depth);
  return arr;
} // function* foo() {
// 	yield getNestedObjects(example, 1)
// 	yield getNestedObjects(example, 2)
// 	yield getNestedObjects(example, 3)
// }
// const iter = foo()
// for (var v of iter) {
// 	console.log(v) // 1 2 3
// }
// // console.log(getNestedObjects(example, 1))
// // console.log(getArrayOfObjects(example, 2))
// // depth(test)
// // console.log('---------------------')
// const stuff = {
// 	[Symbol.iterator](test) {
// 		let step = 0
// 		const iterator = {
// 			next() {
// 				step++
// 				if (step === 1) {
// 					return getArrayOfObjects(test, 1)
// 				} else if (step === 2) {
// 					return getArrayOfObjects(test, 2)
// 				} else if (step === 3) {
// 					return {
// 						value: 'Iterator',
// 						done: 'false'
// 					}
// 				}
// 				return {
// 					value: undefined,
// 					done: 'true'
// 				}
// 			}
// 		}
// 		return iterator
// 	}
// }
// var iterator = stuff[Symbol.iterator](example)
// console.log(iterator.next()) // {value: 'Example', done: 'false'}
// console.log(iterator.next()) // {value: 'for', done: 'false'}
// console.log(iterator.next()) // {value: 'iterator', done: 'false'}
// console.log(iterator.next()) // {value: undefined, done: 'false'}
// Use below to create an iterator
// function* foo(obj, i = 1) {
// 	// let result = {}
// 	while (i <= objectDepth(obj)) {
// 		yield getNestedObjects(obj, i)
// 		i++
// 	}
// }
// const iter = foo(config.theme.color.theme)
// This creates a method which allows you to get the end result of all iterations
// iter.result = function() {
// 	let obj = []
// 	for (var v of iter) {
// 		// console.log(v)
// 		obj.push(v)
// 	}
// 	return obj
// }
// console.log(iter.result())
// Output each iteration one at a tie
// // for (var v of iter) {
// // 	console.log(v) // 1 2 3
// // }


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
    case "_":
      return _lodash["default"];
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

var _typeOfOriginalExport = _typeof(_DefaultExportValue);

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(_DefaultExportValue, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}