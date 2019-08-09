"use strict";

var _Config = _interopRequireDefault(require("./Config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Theme data used by templates with outputs
 * @memberof Mole
 * @return {Object} Returns an object which is used by {@link Mole.Data}
 * ```js
 * // theme/index.js
 * export default {
 * 	font: {
 * 		size: [ 16, 19, 22, 26, 30, 35 ]
 * 	}
 * }
 */
var Theme =
/*#__PURE__*/
function () {
  function Theme() {
    _classCallCheck(this, Theme);
  }
  /**
   * Keeps an original copy of the theme data in case it needs to be referenced by the user
   */


  _createClass(Theme, [{
    key: "clone",
    value: function clone() {}
    /*
    1. Clone parse theme for use by models and templates */

    /**
     * Parses the given theme data so it's usable by the rest of the app
     */

  }, {
    key: "parse",
    value: function parse() {
      /*
      1. Find location of theme files
      2. Determine what type of file they are
      3. Convert to js object or json */
    }
  }]);

  return Theme;
}();