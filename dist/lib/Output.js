"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _is = _interopRequireDefault(require("../util/is"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _glob = _interopRequireDefault(require("glob"));

var _Template = _interopRequireDefault(require("./Template"));

var _Model = _interopRequireDefault(require("./Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Output = function Output(output, peripherals, config, theme, data) {
  _classCallCheck(this, Output);

  Object.assign(this, _objectSpread(_objectSpread({
    name: output.name
  }, getContent(output, peripherals, config, theme, data)), {}, {
    path: output.dir + output.file
  }));
};

function getContent(output, peripherals, config, theme, data) {
  var object = {};

  for (var type in peripherals) {
    if (output[type] === null) {
      output[type] = data;
    }

    if (output[type]) {
      var result = [];

      for (var value in output[type]) {
        switch (_is["default"].what(output[type][value])) {
          case 'dir':
            // eg "templates/"
            result.push(getContentFromDirs(output[type][value], output, peripherals, type, config, theme, data));
            break;

          case 'file':
            // eg "templates/files.njk"
            result.push(getFileContent(output[type][value], type, config, theme, data));
            break;

          case 'string':
            if (peripherals[type]) {
              // Check if any peripherals have been added
              if (peripherals[type].length > 0) {
                var _iterator = _createForOfIteratorHelper(peripherals[type]),
                    _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var peripheral = _step.value;

                    if (output[type][value] === peripheral.name) {
                      // eg "plugin-name"
                      result.push(peripheral.data || peripheral.string);
                    } else {// console.log(`Does not match a named ${type}, please check`)
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              } else {
                // When model is added using config, but doesn't exist then set model to data. Needs improving
                result.push(data); // console.log(`No ${type}s added yet`)
              }
            } else {
              console.log("No ".concat(type, "s named '").concat(output[type][value], "', please check"));
            }

            break;

          default:
            result.push(output[type]);
        }
      }

      if (type === 'model') {
        object[type] = _lodash["default"].apply(void 0, result);
      }

      if (type === 'template') {
        object[type] = result.join('\n');
      }
    }
  } // console.log('object -> ', object)


  return object;
}

function getContentFromDirs(dir, output, peripherals, type, config, theme, data) {
  var keys = [];
  keys = Object.keys(data);
  keys.push('index');
  keys = keys.join('|'); // console.log(keys)

  var result = []; // If has subdirectory that matches named output eg "templates/ios/"

  if (_fsExtra["default"].existsSync(config.root + dir + output.name + '/')) {
    // console.log('has matching directories')
    // Get files that match model eg "templates/ios/class.njk" or "templates/ios/index.njk"
    var files = _glob["default"].sync(config.root + dir + output.name + '/@(' + keys + ')*');

    var _iterator2 = _createForOfIteratorHelper(files),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var file = _step2.value;

        // console.log(fs.readFileSync(file, 'utf8'))
        if (/\.js$/gmi.test(file)) {
          if (type === 'model') {
            var model = new _Model["default"]('name', require(file), theme, data);
            result.push(model.data);
            data.update(model.data);
          }

          if (type === 'template') {
            result.push(new _Template["default"]('name', require(file), theme, data).string);
          }
        } else {
          result.push(_fsExtra["default"].readFileSync(file, 'utf8'));
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  } else {
    // If main directory has file that matches named output eg "templates/ios.njk"
    // TODO: Could possibly also check if filename matches model eg. "ios.class.njk"
    var _files = _glob["default"].sync(config.root + dir + output.name + '*');

    var _iterator3 = _createForOfIteratorHelper(_files),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _file = _step3.value;

        if (/\.js$/gmi.test(_file)) {
          if (type === 'model') {
            var _model = new _Model["default"]('name', require(_file), theme, data);

            result.push(_model.data);
            data.update(_model.data);
          }

          if (type === 'template') {
            result.push(new _Template["default"]('name', require(_file), theme, data).string);
          }
        } else {
          result.push(_fsExtra["default"].readFileSync(_file, 'utf8'));
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  if (type === 'model') {
    return _lodash["default"].apply(void 0, result);
  }

  if (type === 'template') {
    return result.join('\n');
  }
}

function getFileContent(file, type, config, theme, data) {
  if (/\.js$/gmi.test(file)) {
    if (type === 'model') {
      var model = new _Model["default"]('name', require(config.root + file), theme, data);
      data.update(model.data);
      return model.data;
    }

    if (type === 'template') {
      return new _Template["default"]('name', require(config.root + file), theme, data).string;
    }
  } else {
    return _fsExtra["default"].readFileSync(config.root + file, 'utf8');
  }
} // Todo: Add functionality to get template or model from user defined model of template


function getPluginContent(value, type) {
  var _iterator4 = _createForOfIteratorHelper(type),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var plugin = _step4.value;

      if (value === plugin.name) {
        return plugin.string || plugin.data;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}

var _default = Output;
exports["default"] = _default;
module.exports = exports.default;