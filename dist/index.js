"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _voca = _interopRequireDefault(require("voca"));

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
  var newObject = JSON.parse(JSON.stringify(object));

  function x(object) {
    if (_typeof(object) === 'object') {
      _lodash["default"].each(object, function (value, key) {
        if (key === 'value') {
          object.value = _voca["default"].kebabCase(value);
        } else if (Array.isArray(value)) {
          _lodash["default"].each(value, function (item, index) {
            x(item);
          });
        }
      });
    }
  }

  x(newObject);
  return newObject;
}; // Takes an array like list of plugins and outputs an array of objects with keys string and data


function processPlugins(plugins) {
  var array = [];

  function output(string, data) {
    if (arguments.length === 1 && _typeof(arguments[0]) === 'object') {
      // probably data
      data = string;
    } // console.log(transforms.kebabcase)


    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _config["default"].platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var platform = _step.value;
        var name = Object.keys(platform)[0];
        var _templateDir = platform[name].output.template;
        var dir = platform[name].output.dir;
        var file = platform[name].output.file;

        var template = _fs["default"].readFileSync(__dirname + '/templates/' + _templateDir + '/class.hbars').toString();

        var newData = false;

        if (platform[name].output.hasOwnProperty('data')) {
          if (platform[name].output.data.hasOwnProperty('transform')) {
            newData = Transforms[platform[name].output.data.transform](data);

            if (arguments.length === 1) {
              if (_typeof(arguments[0]) === 'object') {
                array.push({
                  template: template,
                  path: './test/' + dir + file,
                  data: newData
                });
              } else {
                array.push({
                  template: string + '\n',
                  path: './test/' + dir + file
                });
              }
            } // For each data transform check if it is defined in config


            if (arguments.length >= 2) {
              array.push({
                template: string,
                path: './test/' + dir + file,
                data: newData
              });
            }
          }
        } else {
          if (arguments.length === 1) {
            if (_typeof(arguments[0]) === 'object') {
              array.push({
                template: template,
                path: './test/' + dir + file,
                data: data
              });
            } else {
              array.push({
                template: string + '\n',
                path: './test/' + dir + file
              });
            }
          } // For each data transform check if it is defined in config


          if (arguments.length >= 2) {
            array.push({
              template: string,
              path: './test/' + dir + file,
              data: data
            });
          }
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

var files = processPlugins(_plugins["default"]); // console.log(JSON.stringify(files, null, 4))

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var file = _step2.value;
    var string = '';

    if (file.data) {
      string = _handlebars["default"].compile(file.template)(file.data);
    } else {
      string = file.template;
    }

    _fs["default"].writeFile(file.path, string, function (err) {
      if (err) console.log(err);
      console.log('Successfully Written to File.');
    });
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