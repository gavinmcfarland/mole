"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _parseTheme = _interopRequireDefault(require("./lib/parse-theme.js"));

var _config = _interopRequireDefault(require("./config.js"));

var _plugins = _interopRequireDefault(require("./plugins.js"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _registerTemplates = _interopRequireDefault(require("./lib/register-templates.js"));

var _output = _interopRequireDefault(require("./lib/output.js"));

var _propertyDefinition = _interopRequireDefault(require("./lib/property-definition.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var templateDir = _config["default"].platforms[0].css.output.template;
var Transforms = {};

Transforms.kebabcase = function (object) {
  if (_typeof(object) === 'object') {
    _lodash["default"].each(object, function (value, key) {
      if (key === 'value') {
        object.value = v.kebabCase(value);
      } else if (Array.isArray(value)) {
        _lodash["default"].each(value, function (item, index) {
          convertCase(item);
        });
      }
    });
  }

  return object;
}; // Takes an array like list of plugins and outputs an array of objects with keys string and data


function processPlugins(plugins) {
  var array = [];

  function output(string, data) {
    var str = ''; // For each data transform check if it is defined in config

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _config["default"].platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var platform = _step.value;
        var name = Object.keys(platform)[0];

        if (platform[name].hasOwnProperty('data')) {
          if (platform[name].data.hasOwnProperty('transform')) {
            Transforms[platform[name].data.transform](data);
          }
        }
      } // console.log(transforms.kebabcase)

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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _config["default"].platforms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _platform = _step2.value;
        var _name = Object.keys(_platform)[0];
        var _templateDir = _platform[_name].output.template;
        var dir = _platform[_name].output.dir;
        var file = _platform[_name].output.file;

        var template = _fs["default"].readFileSync(__dirname + '/templates/' + _templateDir + '/class.hbars').toString();

        if (arguments.length === 1) {
          if (_typeof(arguments[0]) === 'object') {
            // probably data
            data = string;
            str = _handlebars["default"].compile(template)(data);
            array.push({
              string: str,
              path: './test/' + dir + file
            });
          } else {
            str = string + '\n';
            array.push({
              string: str,
              path: './test/' + dir + file
            });
          }
        } else if (arguments.length >= 2) {
          str = _handlebars["default"].compile(string)(data) + '\n';
          array.push({
            string: str,
            path: './test/' + dir + file
          });
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

  _lodash["default"].mapKeys(plugins, function (value, key) {
    plugins[key]({
      theme: _parseTheme["default"],
      output: output,
      property: _propertyDefinition["default"]
    });
  });

  return array;
}

var content = processPlugins(_plugins["default"]);
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = content[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _v = _step3.value;

    _fs["default"].writeFile(_v.path, _v.string, function (err) {
      if (err) console.log(err);
      console.log('Successfully Written to File.');
    });
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