"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var side = {
  top: {
    _abbr: 't'
  },
  right: {
    _abbr: 'r'
  },
  bottom: {
    _abbr: 'b'
  },
  left: {
    _abbr: 'l'
  }
}; // Below is a definition list of CSS properties. I'm not sure if this method of writing them is convinient, but it has been useful to learn how to do it this way.

var cSSproperties = {
  border: _objectSpread(_objectSpread({}, function () {
    return _lodash["default"].reduce(side, function (result, value, key) {
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, _objectSpread(_objectSpread({
        width: null,
        style: null
      }, key === 'bottom' || key === 'top' ? {
        left: {
          radius: null
        },
        right: {
          radius: null
        }
      } : {}), {}, {
        color: null
      })));
    }, {});
  }()), {}, {
    collapse: null,
    color: null,
    radius: null,
    image: {
      outset: null,
      repeat: null,
      slice: null,
      source: null,
      width: null,
      spacing: null,
      style: null
    },
    _abbr: 'b'
  }),
  margin: _objectSpread(_objectSpread({}, function () {
    return side;
  }()), {}, {
    _abbr: 'm'
  }),
  padding: _objectSpread(_objectSpread({}, function () {
    return side;
  }()), {}, {
    _abbr: 'p'
  }),
  color: null
}; // The following function creates an object which provides a name, abbreviation and if there is a parent and or any children.
//
// @param name: the name of the property you want to look up or create
// @param properties: a definition of the property you want to use if it does not already exsist
// for eg.
//
// {
// 	font: {
// 		style: { _abbr: 's'}
// 		_abbr: 'f'
// 	}
// }

/**
 * Look up the definition of a property
 * @memberof Mole.Peripherals
 * @param {String} name The nameThe name of the property you want to look up, or create
 * @param {Object} definition An outline of the property, or properties you want to retrieve a definition for.
 * @example
 * {
 * 	name: 'padding',
 * 	abbr: 'p',
 * 	children: [
 * 		{ name: 'top', abbr: 't', parent: 'padding' },
 * 		{ name: 'right', abbr: 'r', parent: 'padding' },
 * 		{ name: 'bottom', abbr: 'b', parent: 'padding' },
 * 		{ name: 'left', abbr: 'l', parent: 'padding' }
 * 	]
 * }
 */

function def(name) {
  var definition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cSSproperties;
  var part = {
    name: '',
    abbr: null,
    children: []
  };

  _lodash["default"].each(definition, function (children, property) {
    if (property === name) {
      part.name = property;

      _lodash["default"].each(children, function (value, child) {
        if (child !== '_abbr') {
          part.children.push(_objectSpread(_objectSpread({
            name: child
          }, value !== null ? {
            abbr: value._abbr
          } : {}), {}, {
            parent: property
          }));
        } else if (child == '_abbr') {
          part.abbr = value;
        }
      });
    }
  });

  return part;
}