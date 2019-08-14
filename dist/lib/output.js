"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _is = _interopRequireDefault(require("../util/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            object[type] = 'should get contents from directory eg templates/';
            break;

          case 'file':
            // eg "templates/files.njk"
            object[type] = 'should get contents from file eg templates/file.njk';
            break;

          case 'string':
            if (peripherals[type]) {
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


function getDirContent() {} // Todo: Add functionality to get template or model from files


function getFileContent() {} // Todo: Add functionality to get template or model from user defined model of template


function getPluginContent(value, type) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = type[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var plugin = _step2.value;

      if (value === plugin.name) {
        return plugin.string || plugin.data;
      }
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

var _default = Output;
exports["default"] = _default;
module.exports = exports.default;