"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__GetDependency__ = exports.__get__ = _get__;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__ResetDependency__ = _reset__;
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function get() {
    return _Model["default"];
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function get() {
    return _Template["default"];
  }
});
exports["default"] = exports.__RewireAPI__ = exports.Mole = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _Outputs = _interopRequireDefault(require("./Outputs"));

var _Peripherals = _interopRequireDefault(require("./Peripherals"));

var _Config = _interopRequireDefault(require("./Config"));

var _Model = _interopRequireDefault(require("./Model"));

var _Template = _interopRequireDefault(require("./Template"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var env = process.env.NODE_ENV || 'dev'; // Todo: Consider separating looking up config peripherals into to parts?

// var env = new nunjucks.Environment()
var nunjucksEnv = _get__("nunjucks").configure();
/**
 * Create a new instance of the main application
 *
 * ```js
 * import * from 'mole'
 *
 * mole.add(
 *	new Model('model-name', ({data}) => {
 *		data.hello = "hello"
 *		return data
 *	})
 * )
 *
 * mole.build()
 * ```
 */


var Mole =
/*#__PURE__*/
function () {
  function Mole() {
    _classCallCheck(this, Mole);

    // this.outputs = new Outputs()
    // this.files = parse()
    this.peripherals = new (_get__("Peripherals"))();
  }
  /**
   * Renders the `templates` and `models` of the outputs
   * @param {Object} outputs Outputs with string and data to render
   * @return {Mole#files} Returns an array of objects with contents and paths
   */


  _createClass(Mole, [{
    key: "render",
    value: function render(outputs) {
      var files = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = outputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var output = _step.value;
          var file = {
            content: _get__("nunjucksEnv").renderString(output.template, output.model),
            path: output.path
          };
          files.push(file);
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

      return files;
    }
    /**
     * Builds the files from the outputs
     * @param {Object}
     * @return {Mole#outputs}
     * @tutorial Outputting build files
     * @example
     * // Example output
     * build/
     * 	css/
     * 		styles.css
     * 	ios/
     * 		styles.h
     * 	android/
     * 		styles.xml
     */

  }, {
    key: "build",
    value: function build() {
      this.outputs = new (_get__("Outputs"))(this.peripherals);
      this.files = this.render(this.outputs);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var file = _step2.value;

          _get__("fs").outputFile(file.path, file.content, function (err) {
            if (err) console.log(err); // => null

            if (_get__("env") === 'dev') {
              _get__("fs").readFile(file.path, 'utf8', function (err, data) {
                console.log(data); // => hello!
              });
            }
          });
        };

        for (var _iterator2 = this.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    /**
     * Adds a new `model` or `template` to list of peripherals
     * @param {Mole.Model|Mole.Template} peripheral Either an instance of a `Model` or a `Template`
     * @return {Mole#peripherals}
     * @example
     * // Adding a template dynamically to a named output of `css`
     * mole.add(
     * 	new Template('template-name', ({data, theme}) => {
     * 		return '// return string'
     * 	}
     * )
     */

  }, {
    key: "add",
    value: function add() {
      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'model') {
        this.peripherals.model.push(new (_get__("Model"))(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]));
      }

      if ((arguments.length <= 0 ? undefined : arguments[0]) === 'template') {
        this.peripherals.template.push(new (_get__("Template"))(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]));
      } // if (peripheral instanceof Model) {
      // 	this.peripherals.model.push(peripheral)
      // }
      // if (peripheral instanceof Template) {
      // 	this.peripherals.template.push(peripheral)
      // }

    }
  }]);

  return Mole;
}();

exports.Mole = Mole;

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
    case "nunjucks":
      return _nunjucks["default"];

    case "Peripherals":
      return _Peripherals["default"];

    case "nunjucksEnv":
      return nunjucksEnv;

    case "Outputs":
      return _Outputs["default"];

    case "fs":
      return _fsExtra["default"];

    case "env":
      return env;

    case "Model":
      return _Model["default"];

    case "Template":
      return _Template["default"];
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

var _default = _RewireAPI__;
exports["default"] = _default;