"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _is = _interopRequireDefault(require("../util/is"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _Config = _interopRequireDefault(require("./Config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = new _Config["default"]();
/**
 * Creates an output which is then consumable by `mole.build()`
 * ```js
 * {
 *	output: [
 *		{
 *			name: 'css',
 *			template: 'The color red is {{color.red}}',
 *			model: {
 *				token: {
 *					name: 'colorRed',
 *					value: '#FF0000'
 *				}
 *			},
 *			path: 'output/file.css'
 *		}
 *	]
 * }
 * ```
 * @memberof Mole
 * @see {@link mole.build()}
 * @property {String} name The name of the output
 * @property {String} template A template which is available to render with a model
 * @property {Object} model The model used to provide the context for the template
 *
 */

var Output = function Output(output, peripherals) {
  _classCallCheck(this, Output);

  Object.assign(this, _objectSpread({
    name: output.name
  }, getContent(output, peripherals), {
    path: output.dir + output.file
  }));
};
/**
 * Gets the content from plugin, directory or file
 * @memberof Mole.Output
 * @private
 * @param {Object} output An individual output
 * @param {Object} peripherals  A List of peripherals which contain `models` and/or `templates`
 * @returns {String|Object} Returns either an object for a `model` or an string for a `template`
 */


function getContent(output, peripherals) {
  var object = {};

  for (var type in peripherals) {
    if (output[type]) {
      for (var value in output[type]) {
        switch (_is["default"].what(output[type][value])) {
          case 'dir':
            // eg "templates/"
            object[type] = getContentFromDirs(output[type][value], output);
            break;

          case 'file':
            // eg "templates/files.njk"
            object[type] = getFileContent(output[type][value]);
            break;

          case 'string':
            if (peripherals[type]) {
              // Check if any peripherals have been added
              if (peripherals[type].length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = peripherals[type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var peripheral = _step.value;

                    if (output[type][value] === peripheral.name) {
                      // eg "plugin-name"
                      object[type] = peripheral.data || peripheral.string;
                    } else {
                      console.log("Does not match a named ".concat(type, ", please check"));
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
              } else {// console.log(`No ${type}s added yet`)
              }
            } else {
              console.log("No ".concat(type, "s named '").concat(output[type][value], "', please check"));
            }

            break;

          default: // Backup plan?

        }
      }
    }
  }

  return object;
} // Todo: Add functionality to get template or model from files in dirs


function getContentFromDirs(dir, output) {
  var result = []; // If has subdirectory that matches named output eg "templates/ios/"

  if (_fsExtra["default"].existsSync(config.path + dir + output.name + '/')) {
    // console.log('has matching directories')
    // Get files that match model eg "templates/ios/class.njk" or "templates/ios/index.njk"
    var files = _glob["default"].sync(config.path + dir + output.name + '/@(class*|index*)');

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var file = _step2.value;
        // console.log(fs.readFileSync(file, 'utf8'))
        result.push(_fsExtra["default"].readFileSync(file, 'utf8'));
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
  } else {
    // If main directory has file that matches named output eg "templates/ios.njk"
    // TODO: Could possibly also check if filename matches model eg. "ios.class.njk"
    var _files = _glob["default"].sync(config.path + dir + output.name + '*');

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _files[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _file = _step3.value;
        // console.log(fs.readFileSync(file, 'utf8'))
        result.push(_fsExtra["default"].readFileSync(_file, 'utf8'));
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  return result.join('\n');
}

function getFileContent(file) {
  return _fsExtra["default"].readFileSync(config.path + file, 'utf8');
} // Todo: Add functionality to get template or model from user defined model of template


function getPluginContent(value, type) {
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = type[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var plugin = _step4.value;

      if (value === plugin.name) {
        return plugin.string || plugin.data;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

var _default = Output;
exports["default"] = _default;
module.exports = exports.default;