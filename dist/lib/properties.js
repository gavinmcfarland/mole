"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeProp;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(arguments[i], key)); }); } } return target; }

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
};
var properties = {
  border: _objectSpread({}, function () {
    return _lodash["default"].reduce(side, function (result, value, key) {
      return _objectSpread({}, result, _defineProperty({}, key, _objectSpread({
        width: null,
        style: null
      }, key === 'bottom' || key === 'top' ? {
        left: {
          radius: null
        },
        right: {
          radius: null
        }
      } : {}, {
        color: null
      })));
    }, {});
  }(), {
    collapse: '',
    color: '',
    image: {
      outset: '',
      repeat: '',
      slice: '',
      source: '',
      width: '',
      spacing: '',
      style: ''
    },
    _abbr: 'b'
  }),
  margin: _objectSpread({}, function () {
    return side;
  }(), {
    _abbr: 'm'
  }),
  padding: _objectSpread({}, function () {
    return side;
  }(), {
    _abbr: 'p'
  }),
  color: null
};

function makeProp(name) {
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : properties;
  var part = {
    name: '',
    abbr: null,
    children: []
  };

  _lodash["default"].each(properties, function (children, property) {
    if (property === name) {
      part.name = property;

      _lodash["default"].each(children, function (value, child) {
        if (child !== "_abbr") {
          part.children.push({
            name: child,
            abbr: value._abbr,
            parent: property
          });
        } else if (child == "_abbr") {
          part.abbr = value;
        }
      });
    }
  });

  return part;
}