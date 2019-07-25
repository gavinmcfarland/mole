"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _groupBy = _interopRequireDefault(require("../util/group-by.js"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Takes an array of ouputs like `[{ template: {string}, data: {object}, path: {string} }]`
// and writes them to file by converting to uniques
function _default(outputs) {
  // 1. Look for unique path names and add to array
  var unique = _toConsumableArray(new Set(outputs.map(function (a) {
    return a.path;
  }))); // 2. for each unique path name group outputs by path name and create new array of objects


  var grouped = (0, _groupBy["default"])(outputs, function (output) {
    return output.path;
  }); // 3. for each object in array create a new object grouped by path name

  var files = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = unique[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var thing = _step.value;

      var object = _defineProperty({}, thing, grouped.get(thing));

      files.push(object);
    } // 4. For each group of paths create a new string for content (will have template parses in here eventually)

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

  var contents = [];

  for (var _i = 0, _files = files; _i < _files.length; _i++) {
    var file = _files[_i];
    var name = Object.keys(file)[0];
    file = file[Object.keys(file)]; // console.log(file)

    var string = '';
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = file[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var output = _step2.value;

        _nunjucks["default"].configure("".concat(__dirname, "/../templates/").concat(output.template, "/"));

        var templatePath = "".concat(__dirname, "/../templates/").concat(output.template, "/class.njk");

        var template = _fsExtra["default"].readFileSync(templatePath).toString();

        string += _nunjucks["default"].render(templatePath, output.data);
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

    contents.push({
      string: string,
      path: name
    });
  } // 5. For each bit of content write it to file


  var _loop = function _loop() {
    var content = _contents[_i2];

    _fsExtra["default"].outputFile(content.path, content.string, function (err) {
      if (err) console.log(err); // => null

      _fsExtra["default"].readFile(content.path, 'utf8', function (err, data) {
        console.log(data); // => hello!
      });
    });
  };

  for (var _i2 = 0, _contents = contents; _i2 < _contents.length; _i2++) {
    _loop();
  }
}