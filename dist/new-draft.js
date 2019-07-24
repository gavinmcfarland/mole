"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _plugins = _interopRequireDefault(require("./plugins.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// let config = {
// 	theme: 'index.js',
// 	platforms: [
// 		{
// 			css: {
// 				process: {
// 					data: ''
// 				},
// 				output: {
// 					dir: 'src/css/',
// 					file: 'index.css',
// 					template: 'css',
// 					data: ''
// 				}
// 			}
// 		},
// 		{
// 			ios: {
// 				output: {
// 					dir: 'src/ios/',
// 					file: 'index.css',
// 					template: 'css'
// 				}
// 			}
// 		}
// 	],
// 	plugins: []
// }
// let array = []
// let platforms = []
// for (let platform of config) {
// 	for (let platform of platforms) {
// 		let object = {
// 			template: platform.output.template,
// 			path: template: platform.output.data,
// 			data: ''
// 		}
// 		platforms.push(object)
// 	}
// }
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _plugins["default"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var plugin = _step.value;

    // Call each of the plugins
    for (var _i = 0, _Object$entries = Object.entries(_plugins["default"]); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      _plugins["default"][key]({
        theme: theme,
        output: output,
        property: property
      });
    }
  } // function output(template, data, path) {
  // 	let array = []
  // 	// Should update values of platforms array
  // 	// If entries present in array then update them
  // 	// If entries empty then add new ones
  // 	path = path || config.path
  // 	data = data || config.data
  // 	template = template || config.template
  // 	// TODO: Edgecase? If a path is specified then a new file will be created in addition to what is in config
  // 	if (config.path) {
  // 		let object = {
  // 			template: platform.output.template,
  // 			path: template: platform.output.data,
  // 			data: ''
  // 		}
  // 		array.push(object)
  // 	}
  // 	platforms.push(array)
  // }
  // for (let platform of platforms) {
  // 	fs.writeFile()
  // }

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