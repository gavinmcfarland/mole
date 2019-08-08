"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
{
	output: [
		{
			name: 'css',
			template: 'The color red is {{color.red}}',
			model: [Object],
			path: 'output/file.css'
		}
	]
}
*/
var Output =
/*#__PURE__*/
function () {
  function Output(output) {
    _classCallCheck(this, Output);

    this.name = output.name;
    this.template = getContent(output, 'template');
    this.model = getContent(output, 'model');
    this.path = output.dir + output.file;
  }

  _createClass(Output, [{
    key: "getContent",
    value: function getContent(output, type) {
      if (output[type]) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = output[type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            switch (type(value)) {
              case 'dir':
                // eg "templates/"
                return getDirContent(value, type);

              case 'file':
                // eg "templates/files.njk"
                return getFileContent(value, type);

              case 'string':
                // eg "plugin-name"
                return getPluginContent(value, type);

              default: // Backup plan?

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
    }
  }]);

  return Output;
}();

function getDirContent() {}

function getFileContent() {}

function getPluginContent(value, type) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = type[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var plugin = _step2.value;

      if (value === plugin.name) {
        return plugin.string || plugin.data;
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

var _default = Output;
exports["default"] = _default;
module.exports = exports.default;