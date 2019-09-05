"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a new user defined template
 * @memberof Mole.Peripherals
 * @param {string} name Name of the template
 * @param {Mole.Peripherals.Template~function|string} func A callback that returns a string for the template
 * @return {{name: string, func: function, output: string}} An object with a `name`, a `func`, and an optional `output` property
 * @example
 * // Example while exporting as module
 * import Template from 'mole'
 *
 * export default new Template('template-name', function(model) {
 * 		return // The string you'd like to return to be parsed
 * 	})
 * )
 */
var Template = function Template(name, func, theme, data) {
  _classCallCheck(this, Template);

  /**
   * Callback for returning a template string
   * @callback Mole.Peripherals.Template~function
   * @param {Object} data - Access to the data model
   * @param {Object} theme - Access the original theme data
   * @return {String} Returns a string which is rendered using a templating engine
   */
  theme = (0, _lodash["default"])(theme);
  deepFreeze(theme);
  this.name = name;
  this.string = func(theme, data);
};

function deepFreeze(object) {
  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(object); // Freeze properties before freezing self

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;
      var value = object[name];
      object[name] = value && _typeof(value) === "object" ? deepFreeze(value) : value;
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

  return Object.freeze(object);
}

var _default = Template;
exports["default"] = _default;
module.exports = exports.default;