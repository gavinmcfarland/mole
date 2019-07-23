"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _getNestedObjects = _interopRequireDefault(require("../util/get-nested-objects.js"));

var _objectDepth = _interopRequireDefault(require("../util/object-depth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import v from 'voca'
function _default(_ref) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(foo);

  var output = _ref.output,
      theme = _ref.theme;

  function foo(obj) {
    var i,
        _args = arguments;
    return regeneratorRuntime.wrap(function foo$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;

          case 1:
            if (!(i <= (0, _objectDepth["default"])(obj))) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return (0, _getNestedObjects["default"])(obj, i);

          case 4:
            i++;
            _context.next = 1;
            break;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  var iter = foo(theme.color.theme); // console.log(iter.next().value)

  var newThing = [];

  _lodash["default"].each(iter.next().value, function (level) {
    _lodash["default"].each(level, function (token, key) {
      newThing.push({
        value: key,
        type: 'class',
        children: []
      });

      _lodash["default"].each(token, function (value, key) {// newThing[.children.push({
        // 	value: key,
        // 	type: 'var'
        // })
      });
    });
  }); // console.log(newThing)
  // const result = (function() {
  // 	let obj = []
  // 	for (var v of iter) {
  // 		obj.push(v)
  // 	}
  // 	return obj
  // })()
  // -------------------------------------------------------------
  // console.log('------')
  // console.log(getNestedObjects(config.theme.color.theme, 1))
  // _.each(result, function(level) {
  // 	console.log('----- start ----')
  // 	_.each(level, function(token) {
  // 		_.each(token, function(value, key) {
  // 			console.log(key)
  // 		})
  // 	})
  // })

}