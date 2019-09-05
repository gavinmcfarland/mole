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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Output = function Output(output, peripherals, config, theme, data) {
  _classCallCheck(this, Output);

  Object.assign(this, _objectSpread({
    name: output.name
  }, getContent(output, peripherals, config, theme, data), {
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
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = peripherals[type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var peripheral = _step.value;

                    if (output[type][value] === peripheral.name) {
                      // eg "plugin-name"
                      result.push(peripheral.data || peripheral.string);
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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
    var _files = _glob["default"].sync(config.root + dir + output.name + '*');

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _files[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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