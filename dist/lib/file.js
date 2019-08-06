"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _is = _interopRequireDefault(require("../util/is"));

var _glob = _interopRequireDefault(require("glob"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cwd = process.cwd(); // var env = new nunjucks.Environment()

var env = _nunjucks["default"].configure();

var File =
/*#__PURE__*/
function () {
  function File(output, plugins, model) {
    _classCallCheck(this, File);

    this.content = this.getContent(output, plugins, model);
    this.path = output.path;
  }

  _createClass(File, [{
    key: "getContentFromDirs",
    value: function getContentFromDirs(dir, output) {
      var result = []; // If has subdirectory that matches named output eg "templates/ios/"

      if (_fsExtra["default"].existsSync(cwd + '/' + dir + output.name + '/')) {
        console.log('has matching directories'); // Get files that match model eg "templates/ios/class.njk" or "templates/ios/index.njk"

        var files = _glob["default"].sync(cwd + '/' + dir + output.name + '/@(class*|index*)');

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var file = _step.value;
            // console.log(fs.readFileSync(file, 'utf8'))
            result.push(_fsExtra["default"].readFileSync(file, 'utf8'));
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
        // If main directory has file that matches named output eg "templates/ios.njk"
        // TODO: Could possibly also check if filename matches model eg. "ios.class.njk"
        var _files = _glob["default"].sync(cwd + '/' + dir + output.name + '*');

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _file = _step2.value;
            // console.log(fs.readFileSync(file, 'utf8'))
            result.push(_fsExtra["default"].readFileSync(_file, 'utf8'));
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

      return result.join('\n');
    }
  }, {
    key: "getContent",
    value: function getContent(output, plugins, model) {
      // Need to check if templates is an array or not
      // console.log(output)
      if (_is["default"].arr(output.template)) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = output.template[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var template = _step3.value;

            switch (_is["default"].what(template)[0]) {
              case 'dir':
                console.log('value is a dir'); // eg "templates/"

                return env.renderString(_fsExtra["default"].readFileSync(this.getContentFromDirs(template, output), 'utf8'), model);

              case 'file':
                return env.renderString(_fsExtra["default"].readFileSync(cwd + '/' + template, 'utf8'), model);

              case 'string':
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                  for (var _iterator4 = plugins[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var plugin = _step4.value;

                    if (template === plugin.name) {
                      // eg "plugin-name"
                      console.log('value is a named plugin');
                      return plugin.rendered;
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

                break;

              default: // do something

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
      } else {
        // If not an array then put into array and process again
        output.template = [output.template];
        return this.getContent(output, plugins, model);
      }
    }
  }]);

  return File;
}();

exports["default"] = File;
module.exports = exports.default;