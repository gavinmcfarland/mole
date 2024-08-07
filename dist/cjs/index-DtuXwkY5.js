'use strict';

var index$3 = require('./index-BOdCij7U.js');
var require$$0 = require('domain');
var require$$4 = require('events');
var require$$0$1 = require('fs');
var require$$1 = require('path');

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

var lib$8 = {exports: {}};

var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;
var escapeMap = {
  '&': '&amp;',
  '"': '&quot;',
  '\'': '&#39;',
  '<': '&lt;',
  '>': '&gt;',
  '\\': '&#92;'
};
var escapeRegex = /[&"'<>\\]/g;
var _exports$1 = lib$8.exports = {};
function hasOwnProp(obj, k) {
  return ObjProto.hasOwnProperty.call(obj, k);
}
_exports$1.hasOwnProp = hasOwnProp;
function lookupEscape(ch) {
  return escapeMap[ch];
}
function _prettifyError$1(path, withInternals, err) {
  if (!err.Update) {
    // not one of ours, cast it
    err = new _exports$1.TemplateError(err);
  }
  err.Update(path);

  // Unless they marked the dev flag, show them a trace from here
  if (!withInternals) {
    var old = err;
    err = new Error(old.message);
    err.name = old.name;
  }
  return err;
}
_exports$1._prettifyError = _prettifyError$1;
function TemplateError$1(message, lineno, colno) {
  var err;
  var cause;
  if (message instanceof Error) {
    cause = message;
    message = cause.name + ": " + cause.message;
  }
  if (Object.setPrototypeOf) {
    err = new Error(message);
    Object.setPrototypeOf(err, TemplateError$1.prototype);
  } else {
    err = this;
    Object.defineProperty(err, 'message', {
      enumerable: false,
      writable: true,
      value: message
    });
  }
  Object.defineProperty(err, 'name', {
    value: 'Template render error'
  });
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, this.constructor);
  }
  var getStack;
  if (cause) {
    var stackDescriptor = Object.getOwnPropertyDescriptor(cause, 'stack');
    getStack = stackDescriptor && (stackDescriptor.get || function () {
      return stackDescriptor.value;
    });
    if (!getStack) {
      getStack = function getStack() {
        return cause.stack;
      };
    }
  } else {
    var stack = new Error(message).stack;
    getStack = function getStack() {
      return stack;
    };
  }
  Object.defineProperty(err, 'stack', {
    get: function get() {
      return getStack.call(err);
    }
  });
  Object.defineProperty(err, 'cause', {
    value: cause
  });
  err.lineno = lineno;
  err.colno = colno;
  err.firstUpdate = true;
  err.Update = function Update(path) {
    var msg = '(' + (path || 'unknown path') + ')';

    // only show lineno + colno next to path of template
    // where error occurred
    if (this.firstUpdate) {
      if (this.lineno && this.colno) {
        msg += " [Line " + this.lineno + ", Column " + this.colno + "]";
      } else if (this.lineno) {
        msg += " [Line " + this.lineno + "]";
      }
    }
    msg += '\n ';
    if (this.firstUpdate) {
      msg += ' ';
    }
    this.message = msg + (this.message || '');
    this.firstUpdate = false;
    return this;
  };
  return err;
}
if (Object.setPrototypeOf) {
  Object.setPrototypeOf(TemplateError$1.prototype, Error.prototype);
} else {
  TemplateError$1.prototype = Object.create(Error.prototype, {
    constructor: {
      value: TemplateError$1
    }
  });
}
_exports$1.TemplateError = TemplateError$1;
function escape$1(val) {
  return val.replace(escapeRegex, lookupEscape);
}
_exports$1.escape = escape$1;
function isFunction(obj) {
  return ObjProto.toString.call(obj) === '[object Function]';
}
_exports$1.isFunction = isFunction;
function isArray(obj) {
  return ObjProto.toString.call(obj) === '[object Array]';
}
_exports$1.isArray = isArray;
function isString(obj) {
  return ObjProto.toString.call(obj) === '[object String]';
}
_exports$1.isString = isString;
function isObject(obj) {
  return ObjProto.toString.call(obj) === '[object Object]';
}
_exports$1.isObject = isObject;

/**
 * @param {string|number} attr
 * @returns {(string|number)[]}
 * @private
 */
function _prepareAttributeParts(attr) {
  if (!attr) {
    return [];
  }
  if (typeof attr === 'string') {
    return attr.split('.');
  }
  return [attr];
}

/**
 * @param {string}   attribute      Attribute value. Dots allowed.
 * @returns {function(Object): *}
 */
function getAttrGetter(attribute) {
  var parts = _prepareAttributeParts(attribute);
  return function attrGetter(item) {
    var _item = item;
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];

      // If item is not an object, and we still got parts to handle, it means
      // that something goes wrong. Just roll out to undefined in that case.
      if (hasOwnProp(_item, part)) {
        _item = _item[part];
      } else {
        return undefined;
      }
    }
    return _item;
  };
}
_exports$1.getAttrGetter = getAttrGetter;
function groupBy(obj, val, throwOnUndefined) {
  var result = {};
  var iterator = isFunction(val) ? val : getAttrGetter(val);
  for (var i = 0; i < obj.length; i++) {
    var value = obj[i];
    var key = iterator(value, i);
    if (key === undefined && throwOnUndefined === true) {
      throw new TypeError("groupby: attribute \"" + val + "\" resolved to undefined");
    }
    (result[key] || (result[key] = [])).push(value);
  }
  return result;
}
_exports$1.groupBy = groupBy;
function toArray(obj) {
  return Array.prototype.slice.call(obj);
}
_exports$1.toArray = toArray;
function without(array) {
  var result = [];
  if (!array) {
    return result;
  }
  var length = array.length;
  var contains = toArray(arguments).slice(1);
  var index = -1;
  while (++index < length) {
    if (indexOf(contains, array[index]) === -1) {
      result.push(array[index]);
    }
  }
  return result;
}
_exports$1.without = without;
function repeat(char_, n) {
  var str = '';
  for (var i = 0; i < n; i++) {
    str += char_;
  }
  return str;
}
_exports$1.repeat = repeat;
function each(obj, func, context) {
  if (obj == null) {
    return;
  }
  if (ArrayProto.forEach && obj.forEach === ArrayProto.forEach) {
    obj.forEach(func, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      func.call(context, obj[i], i, obj);
    }
  }
}
_exports$1.each = each;
function map(obj, func) {
  var results = [];
  if (obj == null) {
    return results;
  }
  if (ArrayProto.map && obj.map === ArrayProto.map) {
    return obj.map(func);
  }
  for (var i = 0; i < obj.length; i++) {
    results[results.length] = func(obj[i], i);
  }
  if (obj.length === +obj.length) {
    results.length = obj.length;
  }
  return results;
}
_exports$1.map = map;
function asyncIter(arr, iter, cb) {
  var i = -1;
  function next() {
    i++;
    if (i < arr.length) {
      iter(arr[i], i, next, cb);
    } else {
      cb();
    }
  }
  next();
}
_exports$1.asyncIter = asyncIter;
function asyncFor(obj, iter, cb) {
  var keys = keys_(obj || {});
  var len = keys.length;
  var i = -1;
  function next() {
    i++;
    var k = keys[i];
    if (i < len) {
      iter(k, obj[k], i, len, next);
    } else {
      cb();
    }
  }
  next();
}
_exports$1.asyncFor = asyncFor;
function indexOf(arr, searchElement, fromIndex) {
  return Array.prototype.indexOf.call(arr || [], searchElement, fromIndex);
}
_exports$1.indexOf = indexOf;
function keys_(obj) {
  /* eslint-disable no-restricted-syntax */
  var arr = [];
  for (var k in obj) {
    if (hasOwnProp(obj, k)) {
      arr.push(k);
    }
  }
  return arr;
}
_exports$1.keys = keys_;
function _entries(obj) {
  return keys_(obj).map(function (k) {
    return [k, obj[k]];
  });
}
_exports$1._entries = _entries;
function _values(obj) {
  return keys_(obj).map(function (k) {
    return obj[k];
  });
}
_exports$1._values = _values;
function extend(obj1, obj2) {
  obj1 = obj1 || {};
  keys_(obj2).forEach(function (k) {
    obj1[k] = obj2[k];
  });
  return obj1;
}
_exports$1._assign = _exports$1.extend = extend;
function inOperator(key, val) {
  if (isArray(val) || isString(val)) {
    return val.indexOf(key) !== -1;
  } else if (isObject(val)) {
    return key in val;
  }
  throw new Error('Cannot use "in" operator to search for "' + key + '" in unexpected types.');
}
_exports$1.inOperator = inOperator;

var libExports = lib$8.exports;

var domain; // The domain module is executed on demand
var hasSetImmediate = typeof setImmediate === "function";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including network IO events in Node.js.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
var raw = rawAsap$1;
function rawAsap$1(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Avoids a function call
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index$2 = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory excaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index$2 < queue.length) {
        var currentIndex = index$2;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index$2 = index$2 + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index$2 > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index$2; scan < newLength; scan++) {
                queue[scan] = queue[scan + index$2];
            }
            queue.length -= index$2;
            index$2 = 0;
        }
    }
    queue.length = 0;
    index$2 = 0;
    flushing = false;
}

rawAsap$1.requestFlush = requestFlush;
function requestFlush() {
    // Ensure flushing is not bound to any domain.
    // It is not sufficient to exit the domain, because domains exist on a stack.
    // To execute code outside of any domain, the following dance is necessary.
    var parentDomain = process.domain;
    if (parentDomain) {
        if (!domain) {
            // Lazy execute the domain module.
            // Only employed if the user elects to use domains.
            domain = require$$0;
        }
        domain.active = process.domain = null;
    }

    // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
    // cannot handle recursion.
    // `requestFlush` will only be called recursively from `asap.js`, to resume
    // flushing after an error is thrown into a domain.
    // Conveniently, `setImmediate` was introduced in the same version
    // `process.nextTick` started throwing recursion errors.
    if (flushing && hasSetImmediate) {
        setImmediate(flush);
    } else {
        process.nextTick(flush);
    }

    if (parentDomain) {
        domain.active = process.domain = parentDomain;
    }
}

var rawAsap = raw;
var freeTasks = [];

/**
 * Calls a task as soon as possible after returning, in its own event, with
 * priority over IO events. An exception thrown in a task can be handled by
 * `process.on("uncaughtException") or `domain.on("error")`, but will otherwise
 * crash the process. If the error is handled, all subsequent tasks will
 * resume.
 *
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
var asap_1 = asap$1;
function asap$1(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawTask.domain = process.domain;
    rawAsap(rawTask);
}

function RawTask() {
    this.task = null;
    this.domain = null;
}

RawTask.prototype.call = function () {
    if (this.domain) {
        this.domain.enter();
    }
    var threw = true;
    try {
        this.task.call();
        threw = false;
        // If the task throws an exception (presumably) Node.js restores the
        // domain stack for the next event.
        if (this.domain) {
            this.domain.exit();
        }
    } finally {
        // We use try/finally and a threw flag to avoid messing up stack traces
        // when we catch and release errors.
        if (threw) {
            // In Node.js, uncaught exceptions are considered fatal errors.
            // Re-throw them to interrupt flushing!
            // Ensure that flushing continues if an uncaught exception is
            // suppressed listening process.on("uncaughtException") or
            // domain.on("error").
            rawAsap.requestFlush();
        }
        // If the task threw an error, we do not want to exit the domain here.
        // Exiting the domain would prevent the domain from catching the error.
        this.task = null;
        this.domain = null;
        freeTasks.push(this);
    }
};

var aSyncWaterfall = {exports: {}};

(function (module) {
	// MIT license (by Elan Shanker).
	(function(globals) {

	  var executeSync = function(){
	    var args = Array.prototype.slice.call(arguments);
	    if (typeof args[0] === 'function'){
	      args[0].apply(null, args.splice(1));
	    }
	  };

	  var executeAsync = function(fn){
	    if (typeof setImmediate === 'function') {
	      setImmediate(fn);
	    } else if (typeof process !== 'undefined' && process.nextTick) {
	      process.nextTick(fn);
	    } else {
	      setTimeout(fn, 0);
	    }
	  };

	  var makeIterator = function (tasks) {
	    var makeCallback = function (index) {
	      var fn = function () {
	        if (tasks.length) {
	          tasks[index].apply(null, arguments);
	        }
	        return fn.next();
	      };
	      fn.next = function () {
	        return (index < tasks.length - 1) ? makeCallback(index + 1): null;
	      };
	      return fn;
	    };
	    return makeCallback(0);
	  };
	  
	  var _isArray = Array.isArray || function(maybeArray){
	    return Object.prototype.toString.call(maybeArray) === '[object Array]';
	  };

	  var waterfall = function (tasks, callback, forceAsync) {
	    var nextTick = forceAsync ? executeAsync : executeSync;
	    callback = callback || function () {};
	    if (!_isArray(tasks)) {
	      var err = new Error('First argument to waterfall must be an array of functions');
	      return callback(err);
	    }
	    if (!tasks.length) {
	      return callback();
	    }
	    var wrapIterator = function (iterator) {
	      return function (err) {
	        if (err) {
	          callback.apply(null, arguments);
	          callback = function () {};
	        } else {
	          var args = Array.prototype.slice.call(arguments, 1);
	          var next = iterator.next();
	          if (next) {
	            args.push(wrapIterator(next));
	          } else {
	            args.push(callback);
	          }
	          nextTick(function () {
	            iterator.apply(null, args);
	          });
	        }
	      };
	    };
	    wrapIterator(makeIterator(tasks))();
	  };

	  if (module.exports) {
	    module.exports = waterfall; // CommonJS
	  } else {
	    globals.waterfall = waterfall; // <script>
	  }
	})(index$3.commonjsGlobal); 
} (aSyncWaterfall));

var aSyncWaterfallExports = aSyncWaterfall.exports;

var lib$7 = libExports;
var whitespaceChars = " \n\t\r\xA0";
var delimChars = '()[]{}%*-+~/#,:|.<>=!';
var intChars = '0123456789';
var BLOCK_START = '{%';
var BLOCK_END = '%}';
var VARIABLE_START = '{{';
var VARIABLE_END = '}}';
var COMMENT_START = '{#';
var COMMENT_END = '#}';
var TOKEN_STRING = 'string';
var TOKEN_WHITESPACE = 'whitespace';
var TOKEN_DATA = 'data';
var TOKEN_BLOCK_START = 'block-start';
var TOKEN_BLOCK_END = 'block-end';
var TOKEN_VARIABLE_START = 'variable-start';
var TOKEN_VARIABLE_END = 'variable-end';
var TOKEN_COMMENT = 'comment';
var TOKEN_LEFT_PAREN = 'left-paren';
var TOKEN_RIGHT_PAREN = 'right-paren';
var TOKEN_LEFT_BRACKET = 'left-bracket';
var TOKEN_RIGHT_BRACKET = 'right-bracket';
var TOKEN_LEFT_CURLY = 'left-curly';
var TOKEN_RIGHT_CURLY = 'right-curly';
var TOKEN_OPERATOR = 'operator';
var TOKEN_COMMA = 'comma';
var TOKEN_COLON = 'colon';
var TOKEN_TILDE = 'tilde';
var TOKEN_PIPE = 'pipe';
var TOKEN_INT = 'int';
var TOKEN_FLOAT = 'float';
var TOKEN_BOOLEAN = 'boolean';
var TOKEN_NONE = 'none';
var TOKEN_SYMBOL = 'symbol';
var TOKEN_SPECIAL = 'special';
var TOKEN_REGEX = 'regex';
function token(type, value, lineno, colno) {
  return {
    type: type,
    value: value,
    lineno: lineno,
    colno: colno
  };
}
var Tokenizer = /*#__PURE__*/function () {
  function Tokenizer(str, opts) {
    this.str = str;
    this.index = 0;
    this.len = str.length;
    this.lineno = 0;
    this.colno = 0;
    this.in_code = false;
    opts = opts || {};
    var tags = opts.tags || {};
    this.tags = {
      BLOCK_START: tags.blockStart || BLOCK_START,
      BLOCK_END: tags.blockEnd || BLOCK_END,
      VARIABLE_START: tags.variableStart || VARIABLE_START,
      VARIABLE_END: tags.variableEnd || VARIABLE_END,
      COMMENT_START: tags.commentStart || COMMENT_START,
      COMMENT_END: tags.commentEnd || COMMENT_END
    };
    this.trimBlocks = !!opts.trimBlocks;
    this.lstripBlocks = !!opts.lstripBlocks;
  }
  var _proto = Tokenizer.prototype;
  _proto.nextToken = function nextToken() {
    var lineno = this.lineno;
    var colno = this.colno;
    var tok;
    if (this.in_code) {
      // Otherwise, if we are in a block parse it as code
      var cur = this.current();
      if (this.isFinished()) {
        // We have nothing else to parse
        return null;
      } else if (cur === '"' || cur === '\'') {
        // We've hit a string
        return token(TOKEN_STRING, this._parseString(cur), lineno, colno);
      } else if (tok = this._extract(whitespaceChars)) {
        // We hit some whitespace
        return token(TOKEN_WHITESPACE, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.BLOCK_END)) || (tok = this._extractString('-' + this.tags.BLOCK_END))) {
        // Special check for the block end tag
        //
        // It is a requirement that start and end tags are composed of
        // delimiter characters (%{}[] etc), and our code always
        // breaks on delimiters so we can assume the token parsing
        // doesn't consume these elsewhere
        this.in_code = false;
        if (this.trimBlocks) {
          cur = this.current();
          if (cur === '\n') {
            // Skip newline
            this.forward();
          } else if (cur === '\r') {
            // Skip CRLF newline
            this.forward();
            cur = this.current();
            if (cur === '\n') {
              this.forward();
            } else {
              // Was not a CRLF, so go back
              this.back();
            }
          }
        }
        return token(TOKEN_BLOCK_END, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.VARIABLE_END)) || (tok = this._extractString('-' + this.tags.VARIABLE_END))) {
        // Special check for variable end tag (see above)
        this.in_code = false;
        return token(TOKEN_VARIABLE_END, tok, lineno, colno);
      } else if (cur === 'r' && this.str.charAt(this.index + 1) === '/') {
        // Skip past 'r/'.
        this.forwardN(2);

        // Extract until the end of the regex -- / ends it, \/ does not.
        var regexBody = '';
        while (!this.isFinished()) {
          if (this.current() === '/' && this.previous() !== '\\') {
            this.forward();
            break;
          } else {
            regexBody += this.current();
            this.forward();
          }
        }

        // Check for flags.
        // The possible flags are according to https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
        var POSSIBLE_FLAGS = ['g', 'i', 'm', 'y'];
        var regexFlags = '';
        while (!this.isFinished()) {
          var isCurrentAFlag = POSSIBLE_FLAGS.indexOf(this.current()) !== -1;
          if (isCurrentAFlag) {
            regexFlags += this.current();
            this.forward();
          } else {
            break;
          }
        }
        return token(TOKEN_REGEX, {
          body: regexBody,
          flags: regexFlags
        }, lineno, colno);
      } else if (delimChars.indexOf(cur) !== -1) {
        // We've hit a delimiter (a special char like a bracket)
        this.forward();
        var complexOps = ['==', '===', '!=', '!==', '<=', '>=', '//', '**'];
        var curComplex = cur + this.current();
        var type;
        if (lib$7.indexOf(complexOps, curComplex) !== -1) {
          this.forward();
          cur = curComplex;

          // See if this is a strict equality/inequality comparator
          if (lib$7.indexOf(complexOps, curComplex + this.current()) !== -1) {
            cur = curComplex + this.current();
            this.forward();
          }
        }
        switch (cur) {
          case '(':
            type = TOKEN_LEFT_PAREN;
            break;
          case ')':
            type = TOKEN_RIGHT_PAREN;
            break;
          case '[':
            type = TOKEN_LEFT_BRACKET;
            break;
          case ']':
            type = TOKEN_RIGHT_BRACKET;
            break;
          case '{':
            type = TOKEN_LEFT_CURLY;
            break;
          case '}':
            type = TOKEN_RIGHT_CURLY;
            break;
          case ',':
            type = TOKEN_COMMA;
            break;
          case ':':
            type = TOKEN_COLON;
            break;
          case '~':
            type = TOKEN_TILDE;
            break;
          case '|':
            type = TOKEN_PIPE;
            break;
          default:
            type = TOKEN_OPERATOR;
        }
        return token(type, cur, lineno, colno);
      } else {
        // We are not at whitespace or a delimiter, so extract the
        // text and parse it
        tok = this._extractUntil(whitespaceChars + delimChars);
        if (tok.match(/^[-+]?[0-9]+$/)) {
          if (this.current() === '.') {
            this.forward();
            var dec = this._extract(intChars);
            return token(TOKEN_FLOAT, tok + '.' + dec, lineno, colno);
          } else {
            return token(TOKEN_INT, tok, lineno, colno);
          }
        } else if (tok.match(/^(true|false)$/)) {
          return token(TOKEN_BOOLEAN, tok, lineno, colno);
        } else if (tok === 'none') {
          return token(TOKEN_NONE, tok, lineno, colno);
          /*
           * Added to make the test `null is null` evaluate truthily.
           * Otherwise, Nunjucks will look up null in the context and
           * return `undefined`, which is not what we want. This *may* have
           * consequences is someone is using null in their templates as a
           * variable.
           */
        } else if (tok === 'null') {
          return token(TOKEN_NONE, tok, lineno, colno);
        } else if (tok) {
          return token(TOKEN_SYMBOL, tok, lineno, colno);
        } else {
          throw new Error('Unexpected value while parsing: ' + tok);
        }
      }
    } else {
      // Parse out the template text, breaking on tag
      // delimiters because we need to look for block/variable start
      // tags (don't use the full delimChars for optimization)
      var beginChars = this.tags.BLOCK_START.charAt(0) + this.tags.VARIABLE_START.charAt(0) + this.tags.COMMENT_START.charAt(0) + this.tags.COMMENT_END.charAt(0);
      if (this.isFinished()) {
        return null;
      } else if ((tok = this._extractString(this.tags.BLOCK_START + '-')) || (tok = this._extractString(this.tags.BLOCK_START))) {
        this.in_code = true;
        return token(TOKEN_BLOCK_START, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.VARIABLE_START + '-')) || (tok = this._extractString(this.tags.VARIABLE_START))) {
        this.in_code = true;
        return token(TOKEN_VARIABLE_START, tok, lineno, colno);
      } else {
        tok = '';
        var data;
        var inComment = false;
        if (this._matches(this.tags.COMMENT_START)) {
          inComment = true;
          tok = this._extractString(this.tags.COMMENT_START);
        }

        // Continually consume text, breaking on the tag delimiter
        // characters and checking to see if it's a start tag.
        //
        // We could hit the end of the template in the middle of
        // our looping, so check for the null return value from
        // _extractUntil
        while ((data = this._extractUntil(beginChars)) !== null) {
          tok += data;
          if ((this._matches(this.tags.BLOCK_START) || this._matches(this.tags.VARIABLE_START) || this._matches(this.tags.COMMENT_START)) && !inComment) {
            if (this.lstripBlocks && this._matches(this.tags.BLOCK_START) && this.colno > 0 && this.colno <= tok.length) {
              var lastLine = tok.slice(-this.colno);
              if (/^\s+$/.test(lastLine)) {
                // Remove block leading whitespace from beginning of the string
                tok = tok.slice(0, -this.colno);
                if (!tok.length) {
                  // All data removed, collapse to avoid unnecessary nodes
                  // by returning next token (block start)
                  return this.nextToken();
                }
              }
            }
            // If it is a start tag, stop looping
            break;
          } else if (this._matches(this.tags.COMMENT_END)) {
            if (!inComment) {
              throw new Error('unexpected end of comment');
            }
            tok += this._extractString(this.tags.COMMENT_END);
            break;
          } else {
            // It does not match any tag, so add the character and
            // carry on
            tok += this.current();
            this.forward();
          }
        }
        if (data === null && inComment) {
          throw new Error('expected end of comment, got end of file');
        }
        return token(inComment ? TOKEN_COMMENT : TOKEN_DATA, tok, lineno, colno);
      }
    }
  };
  _proto._parseString = function _parseString(delimiter) {
    this.forward();
    var str = '';
    while (!this.isFinished() && this.current() !== delimiter) {
      var cur = this.current();
      if (cur === '\\') {
        this.forward();
        switch (this.current()) {
          case 'n':
            str += '\n';
            break;
          case 't':
            str += '\t';
            break;
          case 'r':
            str += '\r';
            break;
          default:
            str += this.current();
        }
        this.forward();
      } else {
        str += cur;
        this.forward();
      }
    }
    this.forward();
    return str;
  };
  _proto._matches = function _matches(str) {
    if (this.index + str.length > this.len) {
      return null;
    }
    var m = this.str.slice(this.index, this.index + str.length);
    return m === str;
  };
  _proto._extractString = function _extractString(str) {
    if (this._matches(str)) {
      this.forwardN(str.length);
      return str;
    }
    return null;
  };
  _proto._extractUntil = function _extractUntil(charString) {
    // Extract all non-matching chars, with the default matching set
    // to everything
    return this._extractMatching(true, charString || '');
  };
  _proto._extract = function _extract(charString) {
    // Extract all matching chars (no default, so charString must be
    // explicit)
    return this._extractMatching(false, charString);
  };
  _proto._extractMatching = function _extractMatching(breakOnMatch, charString) {
    // Pull out characters until a breaking char is hit.
    // If breakOnMatch is false, a non-matching char stops it.
    // If breakOnMatch is true, a matching char stops it.

    if (this.isFinished()) {
      return null;
    }
    var first = charString.indexOf(this.current());

    // Only proceed if the first character doesn't meet our condition
    if (breakOnMatch && first === -1 || !breakOnMatch && first !== -1) {
      var t = this.current();
      this.forward();

      // And pull out all the chars one at a time until we hit a
      // breaking char
      var idx = charString.indexOf(this.current());
      while ((breakOnMatch && idx === -1 || !breakOnMatch && idx !== -1) && !this.isFinished()) {
        t += this.current();
        this.forward();
        idx = charString.indexOf(this.current());
      }
      return t;
    }
    return '';
  };
  _proto._extractRegex = function _extractRegex(regex) {
    var matches = this.currentStr().match(regex);
    if (!matches) {
      return null;
    }

    // Move forward whatever was matched
    this.forwardN(matches[0].length);
    return matches;
  };
  _proto.isFinished = function isFinished() {
    return this.index >= this.len;
  };
  _proto.forwardN = function forwardN(n) {
    for (var i = 0; i < n; i++) {
      this.forward();
    }
  };
  _proto.forward = function forward() {
    this.index++;
    if (this.previous() === '\n') {
      this.lineno++;
      this.colno = 0;
    } else {
      this.colno++;
    }
  };
  _proto.backN = function backN(n) {
    for (var i = 0; i < n; i++) {
      this.back();
    }
  };
  _proto.back = function back() {
    this.index--;
    if (this.current() === '\n') {
      this.lineno--;
      var idx = this.src.lastIndexOf('\n', this.index - 1);
      if (idx === -1) {
        this.colno = this.index;
      } else {
        this.colno = this.index - idx;
      }
    } else {
      this.colno--;
    }
  }

  // current returns current character
  ;
  _proto.current = function current() {
    if (!this.isFinished()) {
      return this.str.charAt(this.index);
    }
    return '';
  }

  // currentStr returns what's left of the unparsed string
  ;
  _proto.currentStr = function currentStr() {
    if (!this.isFinished()) {
      return this.str.substr(this.index);
    }
    return '';
  };
  _proto.previous = function previous() {
    return this.str.charAt(this.index - 1);
  };
  return Tokenizer;
}();
var lexer$2 = {
  lex: function lex(src, opts) {
    return new Tokenizer(src, opts);
  },
  TOKEN_STRING: TOKEN_STRING,
  TOKEN_WHITESPACE: TOKEN_WHITESPACE,
  TOKEN_DATA: TOKEN_DATA,
  TOKEN_BLOCK_START: TOKEN_BLOCK_START,
  TOKEN_BLOCK_END: TOKEN_BLOCK_END,
  TOKEN_VARIABLE_START: TOKEN_VARIABLE_START,
  TOKEN_VARIABLE_END: TOKEN_VARIABLE_END,
  TOKEN_COMMENT: TOKEN_COMMENT,
  TOKEN_LEFT_PAREN: TOKEN_LEFT_PAREN,
  TOKEN_RIGHT_PAREN: TOKEN_RIGHT_PAREN,
  TOKEN_LEFT_BRACKET: TOKEN_LEFT_BRACKET,
  TOKEN_RIGHT_BRACKET: TOKEN_RIGHT_BRACKET,
  TOKEN_LEFT_CURLY: TOKEN_LEFT_CURLY,
  TOKEN_RIGHT_CURLY: TOKEN_RIGHT_CURLY,
  TOKEN_OPERATOR: TOKEN_OPERATOR,
  TOKEN_COMMA: TOKEN_COMMA,
  TOKEN_COLON: TOKEN_COLON,
  TOKEN_TILDE: TOKEN_TILDE,
  TOKEN_PIPE: TOKEN_PIPE,
  TOKEN_INT: TOKEN_INT,
  TOKEN_FLOAT: TOKEN_FLOAT,
  TOKEN_BOOLEAN: TOKEN_BOOLEAN,
  TOKEN_NONE: TOKEN_NONE,
  TOKEN_SYMBOL: TOKEN_SYMBOL,
  TOKEN_SPECIAL: TOKEN_SPECIAL,
  TOKEN_REGEX: TOKEN_REGEX
};

// A simple class system, more documentation to come
function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor); } }
function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(input); }
function _inheritsLoose$7(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$7(subClass, superClass); }
function _setPrototypeOf$7(o, p) { _setPrototypeOf$7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$7(o, p); }
var EventEmitter = require$$4;
var lib$6 = libExports;
function parentWrap(parent, prop) {
  if (typeof parent !== 'function' || typeof prop !== 'function') {
    return prop;
  }
  return function wrap() {
    // Save the current parent method
    var tmp = this.parent;

    // Set parent to the previous method, call, and restore
    this.parent = parent;
    var res = prop.apply(this, arguments);
    this.parent = tmp;
    return res;
  };
}
function extendClass(cls, name, props) {
  props = props || {};
  lib$6.keys(props).forEach(function (k) {
    props[k] = parentWrap(cls.prototype[k], props[k]);
  });
  var subclass = /*#__PURE__*/function (_cls) {
    _inheritsLoose$7(subclass, _cls);
    function subclass() {
      return _cls.apply(this, arguments) || this;
    }
    _createClass$1(subclass, [{
      key: "typename",
      get: function get() {
        return name;
      }
    }]);
    return subclass;
  }(cls);
  lib$6._assign(subclass.prototype, props);
  return subclass;
}
var Obj$4 = /*#__PURE__*/function () {
  function Obj() {
    // Unfortunately necessary for backwards compatibility
    this.init.apply(this, arguments);
  }
  var _proto = Obj.prototype;
  _proto.init = function init() {};
  Obj.extend = function extend(name, props) {
    if (typeof name === 'object') {
      props = name;
      name = 'anonymous';
    }
    return extendClass(this, name, props);
  };
  _createClass$1(Obj, [{
    key: "typename",
    get: function get() {
      return this.constructor.name;
    }
  }]);
  return Obj;
}();
var EmitterObj$2 = /*#__PURE__*/function (_EventEmitter) {
  _inheritsLoose$7(EmitterObj, _EventEmitter);
  function EmitterObj() {
    var _this2;
    var _this;
    _this = _EventEmitter.call(this) || this;
    // Unfortunately necessary for backwards compatibility
    (_this2 = _this).init.apply(_this2, arguments);
    return _this;
  }
  var _proto2 = EmitterObj.prototype;
  _proto2.init = function init() {};
  EmitterObj.extend = function extend(name, props) {
    if (typeof name === 'object') {
      props = name;
      name = 'anonymous';
    }
    return extendClass(this, name, props);
  };
  _createClass$1(EmitterObj, [{
    key: "typename",
    get: function get() {
      return this.constructor.name;
    }
  }]);
  return EmitterObj;
}(EventEmitter);
var object = {
  Obj: Obj$4,
  EmitterObj: EmitterObj$2
};

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(input); }
function _inheritsLoose$6(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$6(subClass, superClass); }
function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }
var _require$6 = object,
  Obj$3 = _require$6.Obj;
function traverseAndCheck(obj, type, results) {
  if (obj instanceof type) {
    results.push(obj);
  }
  if (obj instanceof Node) {
    obj.findAll(type, results);
  }
}
var Node = /*#__PURE__*/function (_Obj) {
  _inheritsLoose$6(Node, _Obj);
  function Node() {
    return _Obj.apply(this, arguments) || this;
  }
  var _proto = Node.prototype;
  _proto.init = function init(lineno, colno) {
    var _arguments = arguments,
      _this = this;
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    this.lineno = lineno;
    this.colno = colno;
    this.fields.forEach(function (field, i) {
      // The first two args are line/col numbers, so offset by 2
      var val = _arguments[i + 2];

      // Fields should never be undefined, but null. It makes
      // testing easier to normalize values.
      if (val === undefined) {
        val = null;
      }
      _this[field] = val;
    });
  };
  _proto.findAll = function findAll(type, results) {
    var _this2 = this;
    results = results || [];
    if (this instanceof NodeList) {
      this.children.forEach(function (child) {
        return traverseAndCheck(child, type, results);
      });
    } else {
      this.fields.forEach(function (field) {
        return traverseAndCheck(_this2[field], type, results);
      });
    }
    return results;
  };
  _proto.iterFields = function iterFields(func) {
    var _this3 = this;
    this.fields.forEach(function (field) {
      func(_this3[field], field);
    });
  };
  return Node;
}(Obj$3); // Abstract nodes
var Value = /*#__PURE__*/function (_Node) {
  _inheritsLoose$6(Value, _Node);
  function Value() {
    return _Node.apply(this, arguments) || this;
  }
  _createClass(Value, [{
    key: "typename",
    get: function get() {
      return 'Value';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['value'];
    }
  }]);
  return Value;
}(Node); // Concrete nodes
var NodeList = /*#__PURE__*/function (_Node2) {
  _inheritsLoose$6(NodeList, _Node2);
  function NodeList() {
    return _Node2.apply(this, arguments) || this;
  }
  var _proto2 = NodeList.prototype;
  _proto2.init = function init(lineno, colno, nodes) {
    _Node2.prototype.init.call(this, lineno, colno, nodes || []);
  };
  _proto2.addChild = function addChild(node) {
    this.children.push(node);
  };
  _createClass(NodeList, [{
    key: "typename",
    get: function get() {
      return 'NodeList';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['children'];
    }
  }]);
  return NodeList;
}(Node);
var Root = NodeList.extend('Root');
var Literal = Value.extend('Literal');
var _Symbol = Value.extend('Symbol');
var Group = NodeList.extend('Group');
var ArrayNode = NodeList.extend('Array');
var Pair = Node.extend('Pair', {
  fields: ['key', 'value']
});
var Dict = NodeList.extend('Dict');
var LookupVal = Node.extend('LookupVal', {
  fields: ['target', 'val']
});
var If = Node.extend('If', {
  fields: ['cond', 'body', 'else_']
});
var IfAsync = If.extend('IfAsync');
var InlineIf = Node.extend('InlineIf', {
  fields: ['cond', 'body', 'else_']
});
var For = Node.extend('For', {
  fields: ['arr', 'name', 'body', 'else_']
});
var AsyncEach = For.extend('AsyncEach');
var AsyncAll = For.extend('AsyncAll');
var Macro = Node.extend('Macro', {
  fields: ['name', 'args', 'body']
});
var Caller = Macro.extend('Caller');
var Import = Node.extend('Import', {
  fields: ['template', 'target', 'withContext']
});
var FromImport = /*#__PURE__*/function (_Node3) {
  _inheritsLoose$6(FromImport, _Node3);
  function FromImport() {
    return _Node3.apply(this, arguments) || this;
  }
  var _proto3 = FromImport.prototype;
  _proto3.init = function init(lineno, colno, template, names, withContext) {
    _Node3.prototype.init.call(this, lineno, colno, template, names || new NodeList(), withContext);
  };
  _createClass(FromImport, [{
    key: "typename",
    get: function get() {
      return 'FromImport';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['template', 'names', 'withContext'];
    }
  }]);
  return FromImport;
}(Node);
var FunCall = Node.extend('FunCall', {
  fields: ['name', 'args']
});
var Filter = FunCall.extend('Filter');
var FilterAsync = Filter.extend('FilterAsync', {
  fields: ['name', 'args', 'symbol']
});
var KeywordArgs = Dict.extend('KeywordArgs');
var Block = Node.extend('Block', {
  fields: ['name', 'body']
});
var Super = Node.extend('Super', {
  fields: ['blockName', 'symbol']
});
var TemplateRef = Node.extend('TemplateRef', {
  fields: ['template']
});
var Extends = TemplateRef.extend('Extends');
var Include = Node.extend('Include', {
  fields: ['template', 'ignoreMissing']
});
var Set$1 = Node.extend('Set', {
  fields: ['targets', 'value']
});
var Switch = Node.extend('Switch', {
  fields: ['expr', 'cases', 'default']
});
var Case = Node.extend('Case', {
  fields: ['cond', 'body']
});
var Output = NodeList.extend('Output');
var Capture = Node.extend('Capture', {
  fields: ['body']
});
var TemplateData = Literal.extend('TemplateData');
var UnaryOp = Node.extend('UnaryOp', {
  fields: ['target']
});
var BinOp = Node.extend('BinOp', {
  fields: ['left', 'right']
});
var In = BinOp.extend('In');
var Is = BinOp.extend('Is');
var Or = BinOp.extend('Or');
var And = BinOp.extend('And');
var Not = UnaryOp.extend('Not');
var Add = BinOp.extend('Add');
var Concat = BinOp.extend('Concat');
var Sub = BinOp.extend('Sub');
var Mul = BinOp.extend('Mul');
var Div = BinOp.extend('Div');
var FloorDiv = BinOp.extend('FloorDiv');
var Mod = BinOp.extend('Mod');
var Pow = BinOp.extend('Pow');
var Neg = UnaryOp.extend('Neg');
var Pos = UnaryOp.extend('Pos');
var Compare = Node.extend('Compare', {
  fields: ['expr', 'ops']
});
var CompareOperand = Node.extend('CompareOperand', {
  fields: ['expr', 'type']
});
var CallExtension = Node.extend('CallExtension', {
  init: function init(ext, prop, args, contentArgs) {
    this.parent();
    this.extName = ext.__name || ext;
    this.prop = prop;
    this.args = args || new NodeList();
    this.contentArgs = contentArgs || [];
    this.autoescape = ext.autoescape;
  },
  fields: ['extName', 'prop', 'args', 'contentArgs']
});
var CallExtensionAsync = CallExtension.extend('CallExtensionAsync');

// This is hacky, but this is just a debugging function anyway
function print(str, indent, inline) {
  var lines = str.split('\n');
  lines.forEach(function (line, i) {
    if (line && (inline && i > 0 || !inline)) {
      process.stdout.write(' '.repeat(indent));
    }
    var nl = i === lines.length - 1 ? '' : '\n';
    process.stdout.write("" + line + nl);
  });
}

// Print the AST in a nicely formatted tree format for debuggin
function printNodes(node, indent) {
  indent = indent || 0;
  print(node.typename + ': ', indent);
  if (node instanceof NodeList) {
    print('\n');
    node.children.forEach(function (n) {
      printNodes(n, indent + 2);
    });
  } else if (node instanceof CallExtension) {
    print(node.extName + "." + node.prop + "\n");
    if (node.args) {
      printNodes(node.args, indent + 2);
    }
    if (node.contentArgs) {
      node.contentArgs.forEach(function (n) {
        printNodes(n, indent + 2);
      });
    }
  } else {
    var nodes = [];
    var props = null;
    node.iterFields(function (val, fieldName) {
      if (val instanceof Node) {
        nodes.push([fieldName, val]);
      } else {
        props = props || {};
        props[fieldName] = val;
      }
    });
    if (props) {
      print(JSON.stringify(props, null, 2) + '\n', null, true);
    } else {
      print('\n');
    }
    nodes.forEach(function (_ref) {
      var fieldName = _ref[0],
        n = _ref[1];
      print("[" + fieldName + "] =>", indent + 2);
      printNodes(n, indent + 4);
    });
  }
}
var nodes$4 = {
  Node: Node,
  Root: Root,
  NodeList: NodeList,
  Value: Value,
  Literal: Literal,
  Symbol: _Symbol,
  Group: Group,
  Array: ArrayNode,
  Pair: Pair,
  Dict: Dict,
  Output: Output,
  Capture: Capture,
  TemplateData: TemplateData,
  If: If,
  IfAsync: IfAsync,
  InlineIf: InlineIf,
  For: For,
  AsyncEach: AsyncEach,
  AsyncAll: AsyncAll,
  Macro: Macro,
  Caller: Caller,
  Import: Import,
  FromImport: FromImport,
  FunCall: FunCall,
  Filter: Filter,
  FilterAsync: FilterAsync,
  KeywordArgs: KeywordArgs,
  Block: Block,
  Super: Super,
  Extends: Extends,
  Include: Include,
  Set: Set$1,
  Switch: Switch,
  Case: Case,
  LookupVal: LookupVal,
  BinOp: BinOp,
  In: In,
  Is: Is,
  Or: Or,
  And: And,
  Not: Not,
  Add: Add,
  Concat: Concat,
  Sub: Sub,
  Mul: Mul,
  Div: Div,
  FloorDiv: FloorDiv,
  Mod: Mod,
  Pow: Pow,
  Neg: Neg,
  Pos: Pos,
  Compare: Compare,
  CompareOperand: CompareOperand,
  CallExtension: CallExtension,
  CallExtensionAsync: CallExtensionAsync,
  printNodes: printNodes
};

function _inheritsLoose$5(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$5(subClass, superClass); }
function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }
var lexer$1 = lexer$2;
var nodes$3 = nodes$4;
var Obj$2 = object.Obj;
var lib$5 = libExports;
var Parser = /*#__PURE__*/function (_Obj) {
  _inheritsLoose$5(Parser, _Obj);
  function Parser() {
    return _Obj.apply(this, arguments) || this;
  }
  var _proto = Parser.prototype;
  _proto.init = function init(tokens) {
    this.tokens = tokens;
    this.peeked = null;
    this.breakOnBlocks = null;
    this.dropLeadingWhitespace = false;
    this.extensions = [];
  };
  _proto.nextToken = function nextToken(withWhitespace) {
    var tok;
    if (this.peeked) {
      if (!withWhitespace && this.peeked.type === lexer$1.TOKEN_WHITESPACE) {
        this.peeked = null;
      } else {
        tok = this.peeked;
        this.peeked = null;
        return tok;
      }
    }
    tok = this.tokens.nextToken();
    if (!withWhitespace) {
      while (tok && tok.type === lexer$1.TOKEN_WHITESPACE) {
        tok = this.tokens.nextToken();
      }
    }
    return tok;
  };
  _proto.peekToken = function peekToken() {
    this.peeked = this.peeked || this.nextToken();
    return this.peeked;
  };
  _proto.pushToken = function pushToken(tok) {
    if (this.peeked) {
      throw new Error('pushToken: can only push one token on between reads');
    }
    this.peeked = tok;
  };
  _proto.error = function error(msg, lineno, colno) {
    if (lineno === undefined || colno === undefined) {
      var tok = this.peekToken() || {};
      lineno = tok.lineno;
      colno = tok.colno;
    }
    if (lineno !== undefined) {
      lineno += 1;
    }
    if (colno !== undefined) {
      colno += 1;
    }
    return new lib$5.TemplateError(msg, lineno, colno);
  };
  _proto.fail = function fail(msg, lineno, colno) {
    throw this.error(msg, lineno, colno);
  };
  _proto.skip = function skip(type) {
    var tok = this.nextToken();
    if (!tok || tok.type !== type) {
      this.pushToken(tok);
      return false;
    }
    return true;
  };
  _proto.expect = function expect(type) {
    var tok = this.nextToken();
    if (tok.type !== type) {
      this.fail('expected ' + type + ', got ' + tok.type, tok.lineno, tok.colno);
    }
    return tok;
  };
  _proto.skipValue = function skipValue(type, val) {
    var tok = this.nextToken();
    if (!tok || tok.type !== type || tok.value !== val) {
      this.pushToken(tok);
      return false;
    }
    return true;
  };
  _proto.skipSymbol = function skipSymbol(val) {
    return this.skipValue(lexer$1.TOKEN_SYMBOL, val);
  };
  _proto.advanceAfterBlockEnd = function advanceAfterBlockEnd(name) {
    var tok;
    if (!name) {
      tok = this.peekToken();
      if (!tok) {
        this.fail('unexpected end of file');
      }
      if (tok.type !== lexer$1.TOKEN_SYMBOL) {
        this.fail('advanceAfterBlockEnd: expected symbol token or ' + 'explicit name to be passed');
      }
      name = this.nextToken().value;
    }
    tok = this.nextToken();
    if (tok && tok.type === lexer$1.TOKEN_BLOCK_END) {
      if (tok.value.charAt(0) === '-') {
        this.dropLeadingWhitespace = true;
      }
    } else {
      this.fail('expected block end in ' + name + ' statement');
    }
    return tok;
  };
  _proto.advanceAfterVariableEnd = function advanceAfterVariableEnd() {
    var tok = this.nextToken();
    if (tok && tok.type === lexer$1.TOKEN_VARIABLE_END) {
      this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.VARIABLE_END.length - 1) === '-';
    } else {
      this.pushToken(tok);
      this.fail('expected variable end');
    }
  };
  _proto.parseFor = function parseFor() {
    var forTok = this.peekToken();
    var node;
    var endBlock;
    if (this.skipSymbol('for')) {
      node = new nodes$3.For(forTok.lineno, forTok.colno);
      endBlock = 'endfor';
    } else if (this.skipSymbol('asyncEach')) {
      node = new nodes$3.AsyncEach(forTok.lineno, forTok.colno);
      endBlock = 'endeach';
    } else if (this.skipSymbol('asyncAll')) {
      node = new nodes$3.AsyncAll(forTok.lineno, forTok.colno);
      endBlock = 'endall';
    } else {
      this.fail('parseFor: expected for{Async}', forTok.lineno, forTok.colno);
    }
    node.name = this.parsePrimary();
    if (!(node.name instanceof nodes$3.Symbol)) {
      this.fail('parseFor: variable name expected for loop');
    }
    var type = this.peekToken().type;
    if (type === lexer$1.TOKEN_COMMA) {
      // key/value iteration
      var key = node.name;
      node.name = new nodes$3.Array(key.lineno, key.colno);
      node.name.addChild(key);
      while (this.skip(lexer$1.TOKEN_COMMA)) {
        var prim = this.parsePrimary();
        node.name.addChild(prim);
      }
    }
    if (!this.skipSymbol('in')) {
      this.fail('parseFor: expected "in" keyword for loop', forTok.lineno, forTok.colno);
    }
    node.arr = this.parseExpression();
    this.advanceAfterBlockEnd(forTok.value);
    node.body = this.parseUntilBlocks(endBlock, 'else');
    if (this.skipSymbol('else')) {
      this.advanceAfterBlockEnd('else');
      node.else_ = this.parseUntilBlocks(endBlock);
    }
    this.advanceAfterBlockEnd();
    return node;
  };
  _proto.parseMacro = function parseMacro() {
    var macroTok = this.peekToken();
    if (!this.skipSymbol('macro')) {
      this.fail('expected macro');
    }
    var name = this.parsePrimary(true);
    var args = this.parseSignature();
    var node = new nodes$3.Macro(macroTok.lineno, macroTok.colno, name, args);
    this.advanceAfterBlockEnd(macroTok.value);
    node.body = this.parseUntilBlocks('endmacro');
    this.advanceAfterBlockEnd();
    return node;
  };
  _proto.parseCall = function parseCall() {
    // a call block is parsed as a normal FunCall, but with an added
    // 'caller' kwarg which is a Caller node.
    var callTok = this.peekToken();
    if (!this.skipSymbol('call')) {
      this.fail('expected call');
    }
    var callerArgs = this.parseSignature(true) || new nodes$3.NodeList();
    var macroCall = this.parsePrimary();
    this.advanceAfterBlockEnd(callTok.value);
    var body = this.parseUntilBlocks('endcall');
    this.advanceAfterBlockEnd();
    var callerName = new nodes$3.Symbol(callTok.lineno, callTok.colno, 'caller');
    var callerNode = new nodes$3.Caller(callTok.lineno, callTok.colno, callerName, callerArgs, body);

    // add the additional caller kwarg, adding kwargs if necessary
    var args = macroCall.args.children;
    if (!(args[args.length - 1] instanceof nodes$3.KeywordArgs)) {
      args.push(new nodes$3.KeywordArgs());
    }
    var kwargs = args[args.length - 1];
    kwargs.addChild(new nodes$3.Pair(callTok.lineno, callTok.colno, callerName, callerNode));
    return new nodes$3.Output(callTok.lineno, callTok.colno, [macroCall]);
  };
  _proto.parseWithContext = function parseWithContext() {
    var tok = this.peekToken();
    var withContext = null;
    if (this.skipSymbol('with')) {
      withContext = true;
    } else if (this.skipSymbol('without')) {
      withContext = false;
    }
    if (withContext !== null) {
      if (!this.skipSymbol('context')) {
        this.fail('parseFrom: expected context after with/without', tok.lineno, tok.colno);
      }
    }
    return withContext;
  };
  _proto.parseImport = function parseImport() {
    var importTok = this.peekToken();
    if (!this.skipSymbol('import')) {
      this.fail('parseImport: expected import', importTok.lineno, importTok.colno);
    }
    var template = this.parseExpression();
    if (!this.skipSymbol('as')) {
      this.fail('parseImport: expected "as" keyword', importTok.lineno, importTok.colno);
    }
    var target = this.parseExpression();
    var withContext = this.parseWithContext();
    var node = new nodes$3.Import(importTok.lineno, importTok.colno, template, target, withContext);
    this.advanceAfterBlockEnd(importTok.value);
    return node;
  };
  _proto.parseFrom = function parseFrom() {
    var fromTok = this.peekToken();
    if (!this.skipSymbol('from')) {
      this.fail('parseFrom: expected from');
    }
    var template = this.parseExpression();
    if (!this.skipSymbol('import')) {
      this.fail('parseFrom: expected import', fromTok.lineno, fromTok.colno);
    }
    var names = new nodes$3.NodeList();
    var withContext;
    while (1) {
      // eslint-disable-line no-constant-condition
      var nextTok = this.peekToken();
      if (nextTok.type === lexer$1.TOKEN_BLOCK_END) {
        if (!names.children.length) {
          this.fail('parseFrom: Expected at least one import name', fromTok.lineno, fromTok.colno);
        }

        // Since we are manually advancing past the block end,
        // need to keep track of whitespace control (normally
        // this is done in `advanceAfterBlockEnd`
        if (nextTok.value.charAt(0) === '-') {
          this.dropLeadingWhitespace = true;
        }
        this.nextToken();
        break;
      }
      if (names.children.length > 0 && !this.skip(lexer$1.TOKEN_COMMA)) {
        this.fail('parseFrom: expected comma', fromTok.lineno, fromTok.colno);
      }
      var name = this.parsePrimary();
      if (name.value.charAt(0) === '_') {
        this.fail('parseFrom: names starting with an underscore cannot be imported', name.lineno, name.colno);
      }
      if (this.skipSymbol('as')) {
        var alias = this.parsePrimary();
        names.addChild(new nodes$3.Pair(name.lineno, name.colno, name, alias));
      } else {
        names.addChild(name);
      }
      withContext = this.parseWithContext();
    }
    return new nodes$3.FromImport(fromTok.lineno, fromTok.colno, template, names, withContext);
  };
  _proto.parseBlock = function parseBlock() {
    var tag = this.peekToken();
    if (!this.skipSymbol('block')) {
      this.fail('parseBlock: expected block', tag.lineno, tag.colno);
    }
    var node = new nodes$3.Block(tag.lineno, tag.colno);
    node.name = this.parsePrimary();
    if (!(node.name instanceof nodes$3.Symbol)) {
      this.fail('parseBlock: variable name expected', tag.lineno, tag.colno);
    }
    this.advanceAfterBlockEnd(tag.value);
    node.body = this.parseUntilBlocks('endblock');
    this.skipSymbol('endblock');
    this.skipSymbol(node.name.value);
    var tok = this.peekToken();
    if (!tok) {
      this.fail('parseBlock: expected endblock, got end of file');
    }
    this.advanceAfterBlockEnd(tok.value);
    return node;
  };
  _proto.parseExtends = function parseExtends() {
    var tagName = 'extends';
    var tag = this.peekToken();
    if (!this.skipSymbol(tagName)) {
      this.fail('parseTemplateRef: expected ' + tagName);
    }
    var node = new nodes$3.Extends(tag.lineno, tag.colno);
    node.template = this.parseExpression();
    this.advanceAfterBlockEnd(tag.value);
    return node;
  };
  _proto.parseInclude = function parseInclude() {
    var tagName = 'include';
    var tag = this.peekToken();
    if (!this.skipSymbol(tagName)) {
      this.fail('parseInclude: expected ' + tagName);
    }
    var node = new nodes$3.Include(tag.lineno, tag.colno);
    node.template = this.parseExpression();
    if (this.skipSymbol('ignore') && this.skipSymbol('missing')) {
      node.ignoreMissing = true;
    }
    this.advanceAfterBlockEnd(tag.value);
    return node;
  };
  _proto.parseIf = function parseIf() {
    var tag = this.peekToken();
    var node;
    if (this.skipSymbol('if') || this.skipSymbol('elif') || this.skipSymbol('elseif')) {
      node = new nodes$3.If(tag.lineno, tag.colno);
    } else if (this.skipSymbol('ifAsync')) {
      node = new nodes$3.IfAsync(tag.lineno, tag.colno);
    } else {
      this.fail('parseIf: expected if, elif, or elseif', tag.lineno, tag.colno);
    }
    node.cond = this.parseExpression();
    this.advanceAfterBlockEnd(tag.value);
    node.body = this.parseUntilBlocks('elif', 'elseif', 'else', 'endif');
    var tok = this.peekToken();
    switch (tok && tok.value) {
      case 'elseif':
      case 'elif':
        node.else_ = this.parseIf();
        break;
      case 'else':
        this.advanceAfterBlockEnd();
        node.else_ = this.parseUntilBlocks('endif');
        this.advanceAfterBlockEnd();
        break;
      case 'endif':
        node.else_ = null;
        this.advanceAfterBlockEnd();
        break;
      default:
        this.fail('parseIf: expected elif, else, or endif, got end of file');
    }
    return node;
  };
  _proto.parseSet = function parseSet() {
    var tag = this.peekToken();
    if (!this.skipSymbol('set')) {
      this.fail('parseSet: expected set', tag.lineno, tag.colno);
    }
    var node = new nodes$3.Set(tag.lineno, tag.colno, []);
    var target;
    while (target = this.parsePrimary()) {
      node.targets.push(target);
      if (!this.skip(lexer$1.TOKEN_COMMA)) {
        break;
      }
    }
    if (!this.skipValue(lexer$1.TOKEN_OPERATOR, '=')) {
      if (!this.skip(lexer$1.TOKEN_BLOCK_END)) {
        this.fail('parseSet: expected = or block end in set tag', tag.lineno, tag.colno);
      } else {
        node.body = new nodes$3.Capture(tag.lineno, tag.colno, this.parseUntilBlocks('endset'));
        node.value = null;
        this.advanceAfterBlockEnd();
      }
    } else {
      node.value = this.parseExpression();
      this.advanceAfterBlockEnd(tag.value);
    }
    return node;
  };
  _proto.parseSwitch = function parseSwitch() {
    /*
     * Store the tag names in variables in case someone ever wants to
     * customize this.
     */
    var switchStart = 'switch';
    var switchEnd = 'endswitch';
    var caseStart = 'case';
    var caseDefault = 'default';

    // Get the switch tag.
    var tag = this.peekToken();

    // fail early if we get some unexpected tag.
    if (!this.skipSymbol(switchStart) && !this.skipSymbol(caseStart) && !this.skipSymbol(caseDefault)) {
      this.fail('parseSwitch: expected "switch," "case" or "default"', tag.lineno, tag.colno);
    }

    // parse the switch expression
    var expr = this.parseExpression();

    // advance until a start of a case, a default case or an endswitch.
    this.advanceAfterBlockEnd(switchStart);
    this.parseUntilBlocks(caseStart, caseDefault, switchEnd);

    // this is the first case. it could also be an endswitch, we'll check.
    var tok = this.peekToken();

    // create new variables for our cases and default case.
    var cases = [];
    var defaultCase;

    // while we're dealing with new cases nodes...
    do {
      // skip the start symbol and get the case expression
      this.skipSymbol(caseStart);
      var cond = this.parseExpression();
      this.advanceAfterBlockEnd(switchStart);
      // get the body of the case node and add it to the array of cases.
      var body = this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
      cases.push(new nodes$3.Case(tok.line, tok.col, cond, body));
      // get our next case
      tok = this.peekToken();
    } while (tok && tok.value === caseStart);

    // we either have a default case or a switch end.
    switch (tok.value) {
      case caseDefault:
        this.advanceAfterBlockEnd();
        defaultCase = this.parseUntilBlocks(switchEnd);
        this.advanceAfterBlockEnd();
        break;
      case switchEnd:
        this.advanceAfterBlockEnd();
        break;
      default:
        // otherwise bail because EOF
        this.fail('parseSwitch: expected "case," "default" or "endswitch," got EOF.');
    }

    // and return the switch node.
    return new nodes$3.Switch(tag.lineno, tag.colno, expr, cases, defaultCase);
  };
  _proto.parseStatement = function parseStatement() {
    var tok = this.peekToken();
    var node;
    if (tok.type !== lexer$1.TOKEN_SYMBOL) {
      this.fail('tag name expected', tok.lineno, tok.colno);
    }
    if (this.breakOnBlocks && lib$5.indexOf(this.breakOnBlocks, tok.value) !== -1) {
      return null;
    }
    switch (tok.value) {
      case 'raw':
        return this.parseRaw();
      case 'verbatim':
        return this.parseRaw('verbatim');
      case 'if':
      case 'ifAsync':
        return this.parseIf();
      case 'for':
      case 'asyncEach':
      case 'asyncAll':
        return this.parseFor();
      case 'block':
        return this.parseBlock();
      case 'extends':
        return this.parseExtends();
      case 'include':
        return this.parseInclude();
      case 'set':
        return this.parseSet();
      case 'macro':
        return this.parseMacro();
      case 'call':
        return this.parseCall();
      case 'import':
        return this.parseImport();
      case 'from':
        return this.parseFrom();
      case 'filter':
        return this.parseFilterStatement();
      case 'switch':
        return this.parseSwitch();
      default:
        if (this.extensions.length) {
          for (var i = 0; i < this.extensions.length; i++) {
            var ext = this.extensions[i];
            if (lib$5.indexOf(ext.tags || [], tok.value) !== -1) {
              return ext.parse(this, nodes$3, lexer$1);
            }
          }
        }
        this.fail('unknown block tag: ' + tok.value, tok.lineno, tok.colno);
    }
    return node;
  };
  _proto.parseRaw = function parseRaw(tagName) {
    tagName = tagName || 'raw';
    var endTagName = 'end' + tagName;
    // Look for upcoming raw blocks (ignore all other kinds of blocks)
    var rawBlockRegex = new RegExp('([\\s\\S]*?){%\\s*(' + tagName + '|' + endTagName + ')\\s*(?=%})%}');
    var rawLevel = 1;
    var str = '';
    var matches = null;

    // Skip opening raw token
    // Keep this token to track line and column numbers
    var begun = this.advanceAfterBlockEnd();

    // Exit when there's nothing to match
    // or when we've found the matching "endraw" block
    while ((matches = this.tokens._extractRegex(rawBlockRegex)) && rawLevel > 0) {
      var all = matches[0];
      var pre = matches[1];
      var blockName = matches[2];

      // Adjust rawlevel
      if (blockName === tagName) {
        rawLevel += 1;
      } else if (blockName === endTagName) {
        rawLevel -= 1;
      }

      // Add to str
      if (rawLevel === 0) {
        // We want to exclude the last "endraw"
        str += pre;
        // Move tokenizer to beginning of endraw block
        this.tokens.backN(all.length - pre.length);
      } else {
        str += all;
      }
    }
    return new nodes$3.Output(begun.lineno, begun.colno, [new nodes$3.TemplateData(begun.lineno, begun.colno, str)]);
  };
  _proto.parsePostfix = function parsePostfix(node) {
    var lookup;
    var tok = this.peekToken();
    while (tok) {
      if (tok.type === lexer$1.TOKEN_LEFT_PAREN) {
        // Function call
        node = new nodes$3.FunCall(tok.lineno, tok.colno, node, this.parseSignature());
      } else if (tok.type === lexer$1.TOKEN_LEFT_BRACKET) {
        // Reference
        lookup = this.parseAggregate();
        if (lookup.children.length > 1) {
          this.fail('invalid index');
        }
        node = new nodes$3.LookupVal(tok.lineno, tok.colno, node, lookup.children[0]);
      } else if (tok.type === lexer$1.TOKEN_OPERATOR && tok.value === '.') {
        // Reference
        this.nextToken();
        var val = this.nextToken();
        if (val.type !== lexer$1.TOKEN_SYMBOL) {
          this.fail('expected name as lookup value, got ' + val.value, val.lineno, val.colno);
        }

        // Make a literal string because it's not a variable
        // reference
        lookup = new nodes$3.Literal(val.lineno, val.colno, val.value);
        node = new nodes$3.LookupVal(tok.lineno, tok.colno, node, lookup);
      } else {
        break;
      }
      tok = this.peekToken();
    }
    return node;
  };
  _proto.parseExpression = function parseExpression() {
    var node = this.parseInlineIf();
    return node;
  };
  _proto.parseInlineIf = function parseInlineIf() {
    var node = this.parseOr();
    if (this.skipSymbol('if')) {
      var condNode = this.parseOr();
      var bodyNode = node;
      node = new nodes$3.InlineIf(node.lineno, node.colno);
      node.body = bodyNode;
      node.cond = condNode;
      if (this.skipSymbol('else')) {
        node.else_ = this.parseOr();
      } else {
        node.else_ = null;
      }
    }
    return node;
  };
  _proto.parseOr = function parseOr() {
    var node = this.parseAnd();
    while (this.skipSymbol('or')) {
      var node2 = this.parseAnd();
      node = new nodes$3.Or(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseAnd = function parseAnd() {
    var node = this.parseNot();
    while (this.skipSymbol('and')) {
      var node2 = this.parseNot();
      node = new nodes$3.And(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseNot = function parseNot() {
    var tok = this.peekToken();
    if (this.skipSymbol('not')) {
      return new nodes$3.Not(tok.lineno, tok.colno, this.parseNot());
    }
    return this.parseIn();
  };
  _proto.parseIn = function parseIn() {
    var node = this.parseIs();
    while (1) {
      // eslint-disable-line no-constant-condition
      // check if the next token is 'not'
      var tok = this.nextToken();
      if (!tok) {
        break;
      }
      var invert = tok.type === lexer$1.TOKEN_SYMBOL && tok.value === 'not';
      // if it wasn't 'not', put it back
      if (!invert) {
        this.pushToken(tok);
      }
      if (this.skipSymbol('in')) {
        var node2 = this.parseIs();
        node = new nodes$3.In(node.lineno, node.colno, node, node2);
        if (invert) {
          node = new nodes$3.Not(node.lineno, node.colno, node);
        }
      } else {
        // if we'd found a 'not' but this wasn't an 'in', put back the 'not'
        if (invert) {
          this.pushToken(tok);
        }
        break;
      }
    }
    return node;
  }

  // I put this right after "in" in the operator precedence stack. That can
  // obviously be changed to be closer to Jinja.
  ;
  _proto.parseIs = function parseIs() {
    var node = this.parseCompare();
    // look for an is
    if (this.skipSymbol('is')) {
      // look for a not
      var not = this.skipSymbol('not');
      // get the next node
      var node2 = this.parseCompare();
      // create an Is node using the next node and the info from our Is node.
      node = new nodes$3.Is(node.lineno, node.colno, node, node2);
      // if we have a Not, create a Not node from our Is node.
      if (not) {
        node = new nodes$3.Not(node.lineno, node.colno, node);
      }
    }
    // return the node.
    return node;
  };
  _proto.parseCompare = function parseCompare() {
    var compareOps = ['==', '===', '!=', '!==', '<', '>', '<=', '>='];
    var expr = this.parseConcat();
    var ops = [];
    while (1) {
      // eslint-disable-line no-constant-condition
      var tok = this.nextToken();
      if (!tok) {
        break;
      } else if (compareOps.indexOf(tok.value) !== -1) {
        ops.push(new nodes$3.CompareOperand(tok.lineno, tok.colno, this.parseConcat(), tok.value));
      } else {
        this.pushToken(tok);
        break;
      }
    }
    if (ops.length) {
      return new nodes$3.Compare(ops[0].lineno, ops[0].colno, expr, ops);
    } else {
      return expr;
    }
  }

  // finds the '~' for string concatenation
  ;
  _proto.parseConcat = function parseConcat() {
    var node = this.parseAdd();
    while (this.skipValue(lexer$1.TOKEN_TILDE, '~')) {
      var node2 = this.parseAdd();
      node = new nodes$3.Concat(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseAdd = function parseAdd() {
    var node = this.parseSub();
    while (this.skipValue(lexer$1.TOKEN_OPERATOR, '+')) {
      var node2 = this.parseSub();
      node = new nodes$3.Add(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseSub = function parseSub() {
    var node = this.parseMul();
    while (this.skipValue(lexer$1.TOKEN_OPERATOR, '-')) {
      var node2 = this.parseMul();
      node = new nodes$3.Sub(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseMul = function parseMul() {
    var node = this.parseDiv();
    while (this.skipValue(lexer$1.TOKEN_OPERATOR, '*')) {
      var node2 = this.parseDiv();
      node = new nodes$3.Mul(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseDiv = function parseDiv() {
    var node = this.parseFloorDiv();
    while (this.skipValue(lexer$1.TOKEN_OPERATOR, '/')) {
      var node2 = this.parseFloorDiv();
      node = new nodes$3.Div(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseFloorDiv = function parseFloorDiv() {
    var node = this.parseMod();
    while (this.skipValue(lexer$1.TOKEN_OPERATOR, '//')) {
      var node2 = this.parseMod();
      node = new nodes$3.FloorDiv(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseMod = function parseMod() {
    var node = this.parsePow();
    while (this.skipValue(lexer$1.TOKEN_OPERATOR, '%')) {
      var node2 = this.parsePow();
      node = new nodes$3.Mod(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parsePow = function parsePow() {
    var node = this.parseUnary();
    while (this.skipValue(lexer$1.TOKEN_OPERATOR, '**')) {
      var node2 = this.parseUnary();
      node = new nodes$3.Pow(node.lineno, node.colno, node, node2);
    }
    return node;
  };
  _proto.parseUnary = function parseUnary(noFilters) {
    var tok = this.peekToken();
    var node;
    if (this.skipValue(lexer$1.TOKEN_OPERATOR, '-')) {
      node = new nodes$3.Neg(tok.lineno, tok.colno, this.parseUnary(true));
    } else if (this.skipValue(lexer$1.TOKEN_OPERATOR, '+')) {
      node = new nodes$3.Pos(tok.lineno, tok.colno, this.parseUnary(true));
    } else {
      node = this.parsePrimary();
    }
    if (!noFilters) {
      node = this.parseFilter(node);
    }
    return node;
  };
  _proto.parsePrimary = function parsePrimary(noPostfix) {
    var tok = this.nextToken();
    var val;
    var node = null;
    if (!tok) {
      this.fail('expected expression, got end of file');
    } else if (tok.type === lexer$1.TOKEN_STRING) {
      val = tok.value;
    } else if (tok.type === lexer$1.TOKEN_INT) {
      val = parseInt(tok.value, 10);
    } else if (tok.type === lexer$1.TOKEN_FLOAT) {
      val = parseFloat(tok.value);
    } else if (tok.type === lexer$1.TOKEN_BOOLEAN) {
      if (tok.value === 'true') {
        val = true;
      } else if (tok.value === 'false') {
        val = false;
      } else {
        this.fail('invalid boolean: ' + tok.value, tok.lineno, tok.colno);
      }
    } else if (tok.type === lexer$1.TOKEN_NONE) {
      val = null;
    } else if (tok.type === lexer$1.TOKEN_REGEX) {
      val = new RegExp(tok.value.body, tok.value.flags);
    }
    if (val !== undefined) {
      node = new nodes$3.Literal(tok.lineno, tok.colno, val);
    } else if (tok.type === lexer$1.TOKEN_SYMBOL) {
      node = new nodes$3.Symbol(tok.lineno, tok.colno, tok.value);
    } else {
      // See if it's an aggregate type, we need to push the
      // current delimiter token back on
      this.pushToken(tok);
      node = this.parseAggregate();
    }
    if (!noPostfix) {
      node = this.parsePostfix(node);
    }
    if (node) {
      return node;
    } else {
      throw this.error("unexpected token: " + tok.value, tok.lineno, tok.colno);
    }
  };
  _proto.parseFilterName = function parseFilterName() {
    var tok = this.expect(lexer$1.TOKEN_SYMBOL);
    var name = tok.value;
    while (this.skipValue(lexer$1.TOKEN_OPERATOR, '.')) {
      name += '.' + this.expect(lexer$1.TOKEN_SYMBOL).value;
    }
    return new nodes$3.Symbol(tok.lineno, tok.colno, name);
  };
  _proto.parseFilterArgs = function parseFilterArgs(node) {
    if (this.peekToken().type === lexer$1.TOKEN_LEFT_PAREN) {
      // Get a FunCall node and add the parameters to the
      // filter
      var call = this.parsePostfix(node);
      return call.args.children;
    }
    return [];
  };
  _proto.parseFilter = function parseFilter(node) {
    while (this.skip(lexer$1.TOKEN_PIPE)) {
      var name = this.parseFilterName();
      node = new nodes$3.Filter(name.lineno, name.colno, name, new nodes$3.NodeList(name.lineno, name.colno, [node].concat(this.parseFilterArgs(node))));
    }
    return node;
  };
  _proto.parseFilterStatement = function parseFilterStatement() {
    var filterTok = this.peekToken();
    if (!this.skipSymbol('filter')) {
      this.fail('parseFilterStatement: expected filter');
    }
    var name = this.parseFilterName();
    var args = this.parseFilterArgs(name);
    this.advanceAfterBlockEnd(filterTok.value);
    var body = new nodes$3.Capture(name.lineno, name.colno, this.parseUntilBlocks('endfilter'));
    this.advanceAfterBlockEnd();
    var node = new nodes$3.Filter(name.lineno, name.colno, name, new nodes$3.NodeList(name.lineno, name.colno, [body].concat(args)));
    return new nodes$3.Output(name.lineno, name.colno, [node]);
  };
  _proto.parseAggregate = function parseAggregate() {
    var tok = this.nextToken();
    var node;
    switch (tok.type) {
      case lexer$1.TOKEN_LEFT_PAREN:
        node = new nodes$3.Group(tok.lineno, tok.colno);
        break;
      case lexer$1.TOKEN_LEFT_BRACKET:
        node = new nodes$3.Array(tok.lineno, tok.colno);
        break;
      case lexer$1.TOKEN_LEFT_CURLY:
        node = new nodes$3.Dict(tok.lineno, tok.colno);
        break;
      default:
        return null;
    }
    while (1) {
      // eslint-disable-line no-constant-condition
      var type = this.peekToken().type;
      if (type === lexer$1.TOKEN_RIGHT_PAREN || type === lexer$1.TOKEN_RIGHT_BRACKET || type === lexer$1.TOKEN_RIGHT_CURLY) {
        this.nextToken();
        break;
      }
      if (node.children.length > 0) {
        if (!this.skip(lexer$1.TOKEN_COMMA)) {
          this.fail('parseAggregate: expected comma after expression', tok.lineno, tok.colno);
        }
      }
      if (node instanceof nodes$3.Dict) {
        // TODO: check for errors
        var key = this.parsePrimary();

        // We expect a key/value pair for dicts, separated by a
        // colon
        if (!this.skip(lexer$1.TOKEN_COLON)) {
          this.fail('parseAggregate: expected colon after dict key', tok.lineno, tok.colno);
        }

        // TODO: check for errors
        var value = this.parseExpression();
        node.addChild(new nodes$3.Pair(key.lineno, key.colno, key, value));
      } else {
        // TODO: check for errors
        var expr = this.parseExpression();
        node.addChild(expr);
      }
    }
    return node;
  };
  _proto.parseSignature = function parseSignature(tolerant, noParens) {
    var tok = this.peekToken();
    if (!noParens && tok.type !== lexer$1.TOKEN_LEFT_PAREN) {
      if (tolerant) {
        return null;
      } else {
        this.fail('expected arguments', tok.lineno, tok.colno);
      }
    }
    if (tok.type === lexer$1.TOKEN_LEFT_PAREN) {
      tok = this.nextToken();
    }
    var args = new nodes$3.NodeList(tok.lineno, tok.colno);
    var kwargs = new nodes$3.KeywordArgs(tok.lineno, tok.colno);
    var checkComma = false;
    while (1) {
      // eslint-disable-line no-constant-condition
      tok = this.peekToken();
      if (!noParens && tok.type === lexer$1.TOKEN_RIGHT_PAREN) {
        this.nextToken();
        break;
      } else if (noParens && tok.type === lexer$1.TOKEN_BLOCK_END) {
        break;
      }
      if (checkComma && !this.skip(lexer$1.TOKEN_COMMA)) {
        this.fail('parseSignature: expected comma after expression', tok.lineno, tok.colno);
      } else {
        var arg = this.parseExpression();
        if (this.skipValue(lexer$1.TOKEN_OPERATOR, '=')) {
          kwargs.addChild(new nodes$3.Pair(arg.lineno, arg.colno, arg, this.parseExpression()));
        } else {
          args.addChild(arg);
        }
      }
      checkComma = true;
    }
    if (kwargs.children.length) {
      args.addChild(kwargs);
    }
    return args;
  };
  _proto.parseUntilBlocks = function parseUntilBlocks() {
    var prev = this.breakOnBlocks;
    for (var _len = arguments.length, blockNames = new Array(_len), _key = 0; _key < _len; _key++) {
      blockNames[_key] = arguments[_key];
    }
    this.breakOnBlocks = blockNames;
    var ret = this.parse();
    this.breakOnBlocks = prev;
    return ret;
  };
  _proto.parseNodes = function parseNodes() {
    var tok;
    var buf = [];
    while (tok = this.nextToken()) {
      if (tok.type === lexer$1.TOKEN_DATA) {
        var data = tok.value;
        var nextToken = this.peekToken();
        var nextVal = nextToken && nextToken.value;

        // If the last token has "-" we need to trim the
        // leading whitespace of the data. This is marked with
        // the `dropLeadingWhitespace` variable.
        if (this.dropLeadingWhitespace) {
          // TODO: this could be optimized (don't use regex)
          data = data.replace(/^\s*/, '');
          this.dropLeadingWhitespace = false;
        }

        // Same for the succeeding block start token
        if (nextToken && (nextToken.type === lexer$1.TOKEN_BLOCK_START && nextVal.charAt(nextVal.length - 1) === '-' || nextToken.type === lexer$1.TOKEN_VARIABLE_START && nextVal.charAt(this.tokens.tags.VARIABLE_START.length) === '-' || nextToken.type === lexer$1.TOKEN_COMMENT && nextVal.charAt(this.tokens.tags.COMMENT_START.length) === '-')) {
          // TODO: this could be optimized (don't use regex)
          data = data.replace(/\s*$/, '');
        }
        buf.push(new nodes$3.Output(tok.lineno, tok.colno, [new nodes$3.TemplateData(tok.lineno, tok.colno, data)]));
      } else if (tok.type === lexer$1.TOKEN_BLOCK_START) {
        this.dropLeadingWhitespace = false;
        var n = this.parseStatement();
        if (!n) {
          break;
        }
        buf.push(n);
      } else if (tok.type === lexer$1.TOKEN_VARIABLE_START) {
        var e = this.parseExpression();
        this.dropLeadingWhitespace = false;
        this.advanceAfterVariableEnd();
        buf.push(new nodes$3.Output(tok.lineno, tok.colno, [e]));
      } else if (tok.type === lexer$1.TOKEN_COMMENT) {
        this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.COMMENT_END.length - 1) === '-';
      } else {
        // Ignore comments, otherwise this should be an error
        this.fail('Unexpected token at top-level: ' + tok.type, tok.lineno, tok.colno);
      }
    }
    return buf;
  };
  _proto.parse = function parse() {
    return new nodes$3.NodeList(0, 0, this.parseNodes());
  };
  _proto.parseAsRoot = function parseAsRoot() {
    return new nodes$3.Root(0, 0, this.parseNodes());
  };
  return Parser;
}(Obj$2); // var util = require('util');
// var l = lexer.lex('{%- if x -%}\n hello {% endif %}');
// var t;
// while((t = l.nextToken())) {
//     console.log(util.inspect(t));
// }
// var p = new Parser(lexer.lex('hello {% filter title %}' +
//                              'Hello madam how are you' +
//                              '{% endfilter %}'));
// var n = p.parseAsRoot();
// nodes.printNodes(n);
var parser$2 = {
  parse: function parse(src, extensions, opts) {
    var p = new Parser(lexer$1.lex(src, opts));
    if (extensions !== undefined) {
      p.extensions = extensions;
    }
    return p.parseAsRoot();
  },
  Parser: Parser
};

var nodes$2 = nodes$4;
var lib$4 = libExports;
var sym = 0;
function gensym() {
  return 'hole_' + sym++;
}

// copy-on-write version of map
function mapCOW(arr, func) {
  var res = null;
  for (var i = 0; i < arr.length; i++) {
    var item = func(arr[i]);
    if (item !== arr[i]) {
      if (!res) {
        res = arr.slice();
      }
      res[i] = item;
    }
  }
  return res || arr;
}
function walk(ast, func, depthFirst) {
  if (!(ast instanceof nodes$2.Node)) {
    return ast;
  }
  if (!depthFirst) {
    var astT = func(ast);
    if (astT && astT !== ast) {
      return astT;
    }
  }
  if (ast instanceof nodes$2.NodeList) {
    var children = mapCOW(ast.children, function (node) {
      return walk(node, func, depthFirst);
    });
    if (children !== ast.children) {
      ast = new nodes$2[ast.typename](ast.lineno, ast.colno, children);
    }
  } else if (ast instanceof nodes$2.CallExtension) {
    var args = walk(ast.args, func, depthFirst);
    var contentArgs = mapCOW(ast.contentArgs, function (node) {
      return walk(node, func, depthFirst);
    });
    if (args !== ast.args || contentArgs !== ast.contentArgs) {
      ast = new nodes$2[ast.typename](ast.extName, ast.prop, args, contentArgs);
    }
  } else {
    var props = ast.fields.map(function (field) {
      return ast[field];
    });
    var propsT = mapCOW(props, function (prop) {
      return walk(prop, func, depthFirst);
    });
    if (propsT !== props) {
      ast = new nodes$2[ast.typename](ast.lineno, ast.colno);
      propsT.forEach(function (prop, i) {
        ast[ast.fields[i]] = prop;
      });
    }
  }
  return depthFirst ? func(ast) || ast : ast;
}
function depthWalk(ast, func) {
  return walk(ast, func, true);
}
function _liftFilters(node, asyncFilters, prop) {
  var children = [];
  var walked = depthWalk(prop ? node[prop] : node, function (descNode) {
    var symbol;
    if (descNode instanceof nodes$2.Block) {
      return descNode;
    } else if (descNode instanceof nodes$2.Filter && lib$4.indexOf(asyncFilters, descNode.name.value) !== -1 || descNode instanceof nodes$2.CallExtensionAsync) {
      symbol = new nodes$2.Symbol(descNode.lineno, descNode.colno, gensym());
      children.push(new nodes$2.FilterAsync(descNode.lineno, descNode.colno, descNode.name, descNode.args, symbol));
    }
    return symbol;
  });
  if (prop) {
    node[prop] = walked;
  } else {
    node = walked;
  }
  if (children.length) {
    children.push(node);
    return new nodes$2.NodeList(node.lineno, node.colno, children);
  } else {
    return node;
  }
}
function liftFilters(ast, asyncFilters) {
  return depthWalk(ast, function (node) {
    if (node instanceof nodes$2.Output) {
      return _liftFilters(node, asyncFilters);
    } else if (node instanceof nodes$2.Set) {
      return _liftFilters(node, asyncFilters, 'value');
    } else if (node instanceof nodes$2.For) {
      return _liftFilters(node, asyncFilters, 'arr');
    } else if (node instanceof nodes$2.If) {
      return _liftFilters(node, asyncFilters, 'cond');
    } else if (node instanceof nodes$2.CallExtension) {
      return _liftFilters(node, asyncFilters, 'args');
    } else {
      return undefined;
    }
  });
}
function liftSuper(ast) {
  return walk(ast, function (blockNode) {
    if (!(blockNode instanceof nodes$2.Block)) {
      return;
    }
    var hasSuper = false;
    var symbol = gensym();
    blockNode.body = walk(blockNode.body, function (node) {
      // eslint-disable-line consistent-return
      if (node instanceof nodes$2.FunCall && node.name.value === 'super') {
        hasSuper = true;
        return new nodes$2.Symbol(node.lineno, node.colno, symbol);
      }
    });
    if (hasSuper) {
      blockNode.body.children.unshift(new nodes$2.Super(0, 0, blockNode.name, new nodes$2.Symbol(0, 0, symbol)));
    }
  });
}
function convertStatements(ast) {
  return depthWalk(ast, function (node) {
    if (!(node instanceof nodes$2.If) && !(node instanceof nodes$2.For)) {
      return undefined;
    }
    var async = false;
    walk(node, function (child) {
      if (child instanceof nodes$2.FilterAsync || child instanceof nodes$2.IfAsync || child instanceof nodes$2.AsyncEach || child instanceof nodes$2.AsyncAll || child instanceof nodes$2.CallExtensionAsync) {
        async = true;
        // Stop iterating by returning the node
        return child;
      }
      return undefined;
    });
    if (async) {
      if (node instanceof nodes$2.If) {
        return new nodes$2.IfAsync(node.lineno, node.colno, node.cond, node.body, node.else_);
      } else if (node instanceof nodes$2.For && !(node instanceof nodes$2.AsyncAll)) {
        return new nodes$2.AsyncEach(node.lineno, node.colno, node.arr, node.name, node.body, node.else_);
      }
    }
    return undefined;
  });
}
function cps(ast, asyncFilters) {
  return convertStatements(liftSuper(liftFilters(ast, asyncFilters)));
}
function transform(ast, asyncFilters) {
  return cps(ast, asyncFilters || []);
}

// var parser = require('./parser');
// var src = 'hello {% foo %}{% endfoo %} end';
// var ast = transform(parser.parse(src, [new FooExtension()]), ['bar']);
// nodes.printNodes(ast);

var transformer$1 = {
  transform: transform
};

var lib$3 = libExports;
var arrayFrom = Array.from;
var supportsIterators = typeof Symbol === 'function' && Symbol.iterator && typeof arrayFrom === 'function';

// Frames keep track of scoping both at compile-time and run-time so
// we know how to access variables. Block tags can introduce special
// variables, for example.
var Frame$2 = /*#__PURE__*/function () {
  function Frame(parent, isolateWrites) {
    this.variables = Object.create(null);
    this.parent = parent;
    this.topLevel = false;
    // if this is true, writes (set) should never propagate upwards past
    // this frame to its parent (though reads may).
    this.isolateWrites = isolateWrites;
  }
  var _proto = Frame.prototype;
  _proto.set = function set(name, val, resolveUp) {
    // Allow variables with dots by automatically creating the
    // nested structure
    var parts = name.split('.');
    var obj = this.variables;
    var frame = this;
    if (resolveUp) {
      if (frame = this.resolve(parts[0], true)) {
        frame.set(name, val);
        return;
      }
    }
    for (var i = 0; i < parts.length - 1; i++) {
      var id = parts[i];
      if (!obj[id]) {
        obj[id] = {};
      }
      obj = obj[id];
    }
    obj[parts[parts.length - 1]] = val;
  };
  _proto.get = function get(name) {
    var val = this.variables[name];
    if (val !== undefined) {
      return val;
    }
    return null;
  };
  _proto.lookup = function lookup(name) {
    var p = this.parent;
    var val = this.variables[name];
    if (val !== undefined) {
      return val;
    }
    return p && p.lookup(name);
  };
  _proto.resolve = function resolve(name, forWrite) {
    var p = forWrite && this.isolateWrites ? undefined : this.parent;
    var val = this.variables[name];
    if (val !== undefined) {
      return this;
    }
    return p && p.resolve(name);
  };
  _proto.push = function push(isolateWrites) {
    return new Frame(this, isolateWrites);
  };
  _proto.pop = function pop() {
    return this.parent;
  };
  return Frame;
}();
function makeMacro(argNames, kwargNames, func) {
  return function macro() {
    for (var _len = arguments.length, macroArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      macroArgs[_key] = arguments[_key];
    }
    var argCount = numArgs(macroArgs);
    var args;
    var kwargs = getKeywordArgs(macroArgs);
    if (argCount > argNames.length) {
      args = macroArgs.slice(0, argNames.length);

      // Positional arguments that should be passed in as
      // keyword arguments (essentially default values)
      macroArgs.slice(args.length, argCount).forEach(function (val, i) {
        if (i < kwargNames.length) {
          kwargs[kwargNames[i]] = val;
        }
      });
      args.push(kwargs);
    } else if (argCount < argNames.length) {
      args = macroArgs.slice(0, argCount);
      for (var i = argCount; i < argNames.length; i++) {
        var arg = argNames[i];

        // Keyword arguments that should be passed as
        // positional arguments, i.e. the caller explicitly
        // used the name of a positional arg
        args.push(kwargs[arg]);
        delete kwargs[arg];
      }
      args.push(kwargs);
    } else {
      args = macroArgs;
    }
    return func.apply(this, args);
  };
}
function makeKeywordArgs(obj) {
  obj.__keywords = true;
  return obj;
}
function isKeywordArgs(obj) {
  return obj && Object.prototype.hasOwnProperty.call(obj, '__keywords');
}
function getKeywordArgs(args) {
  var len = args.length;
  if (len) {
    var lastArg = args[len - 1];
    if (isKeywordArgs(lastArg)) {
      return lastArg;
    }
  }
  return {};
}
function numArgs(args) {
  var len = args.length;
  if (len === 0) {
    return 0;
  }
  var lastArg = args[len - 1];
  if (isKeywordArgs(lastArg)) {
    return len - 1;
  } else {
    return len;
  }
}

// A SafeString object indicates that the string should not be
// autoescaped. This happens magically because autoescaping only
// occurs on primitive string objects.
function SafeString(val) {
  if (typeof val !== 'string') {
    return val;
  }
  this.val = val;
  this.length = val.length;
}
SafeString.prototype = Object.create(String.prototype, {
  length: {
    writable: true,
    configurable: true,
    value: 0
  }
});
SafeString.prototype.valueOf = function valueOf() {
  return this.val;
};
SafeString.prototype.toString = function toString() {
  return this.val;
};
function copySafeness(dest, target) {
  if (dest instanceof SafeString) {
    return new SafeString(target);
  }
  return target.toString();
}
function markSafe(val) {
  var type = typeof val;
  if (type === 'string') {
    return new SafeString(val);
  } else if (type !== 'function') {
    return val;
  } else {
    return function wrapSafe(args) {
      var ret = val.apply(this, arguments);
      if (typeof ret === 'string') {
        return new SafeString(ret);
      }
      return ret;
    };
  }
}
function suppressValue(val, autoescape) {
  val = val !== undefined && val !== null ? val : '';
  if (autoescape && !(val instanceof SafeString)) {
    val = lib$3.escape(val.toString());
  }
  return val;
}
function ensureDefined(val, lineno, colno) {
  if (val === null || val === undefined) {
    throw new lib$3.TemplateError('attempted to output null or undefined value', lineno + 1, colno + 1);
  }
  return val;
}
function memberLookup(obj, val) {
  if (obj === undefined || obj === null) {
    return undefined;
  }
  if (typeof obj[val] === 'function') {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return obj[val].apply(obj, args);
    };
  }
  return obj[val];
}
function callWrap(obj, name, context, args) {
  if (!obj) {
    throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
  } else if (typeof obj !== 'function') {
    throw new Error('Unable to call `' + name + '`, which is not a function');
  }
  return obj.apply(context, args);
}
function contextOrFrameLookup(context, frame, name) {
  var val = frame.lookup(name);
  return val !== undefined ? val : context.lookup(name);
}
function handleError$1(error, lineno, colno) {
  if (error.lineno) {
    return error;
  } else {
    return new lib$3.TemplateError(error, lineno, colno);
  }
}
function asyncEach(arr, dimen, iter, cb) {
  if (lib$3.isArray(arr)) {
    var len = arr.length;
    lib$3.asyncIter(arr, function iterCallback(item, i, next) {
      switch (dimen) {
        case 1:
          iter(item, i, len, next);
          break;
        case 2:
          iter(item[0], item[1], i, len, next);
          break;
        case 3:
          iter(item[0], item[1], item[2], i, len, next);
          break;
        default:
          item.push(i, len, next);
          iter.apply(this, item);
      }
    }, cb);
  } else {
    lib$3.asyncFor(arr, function iterCallback(key, val, i, len, next) {
      iter(key, val, i, len, next);
    }, cb);
  }
}
function asyncAll(arr, dimen, func, cb) {
  var finished = 0;
  var len;
  var outputArr;
  function done(i, output) {
    finished++;
    outputArr[i] = output;
    if (finished === len) {
      cb(null, outputArr.join(''));
    }
  }
  if (lib$3.isArray(arr)) {
    len = arr.length;
    outputArr = new Array(len);
    if (len === 0) {
      cb(null, '');
    } else {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        switch (dimen) {
          case 1:
            func(item, i, len, done);
            break;
          case 2:
            func(item[0], item[1], i, len, done);
            break;
          case 3:
            func(item[0], item[1], item[2], i, len, done);
            break;
          default:
            item.push(i, len, done);
            func.apply(this, item);
        }
      }
    }
  } else {
    var keys = lib$3.keys(arr || {});
    len = keys.length;
    outputArr = new Array(len);
    if (len === 0) {
      cb(null, '');
    } else {
      for (var _i = 0; _i < keys.length; _i++) {
        var k = keys[_i];
        func(k, arr[k], _i, len, done);
      }
    }
  }
}
function fromIterator(arr) {
  if (typeof arr !== 'object' || arr === null || lib$3.isArray(arr)) {
    return arr;
  } else if (supportsIterators && Symbol.iterator in arr) {
    return arrayFrom(arr);
  } else {
    return arr;
  }
}
var runtime$1 = {
  Frame: Frame$2,
  makeMacro: makeMacro,
  makeKeywordArgs: makeKeywordArgs,
  numArgs: numArgs,
  suppressValue: suppressValue,
  ensureDefined: ensureDefined,
  memberLookup: memberLookup,
  contextOrFrameLookup: contextOrFrameLookup,
  callWrap: callWrap,
  handleError: handleError$1,
  isArray: lib$3.isArray,
  keys: lib$3.keys,
  SafeString: SafeString,
  copySafeness: copySafeness,
  markSafe: markSafe,
  asyncEach: asyncEach,
  asyncAll: asyncAll,
  inOperator: lib$3.inOperator,
  fromIterator: fromIterator
};

function _inheritsLoose$4(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$4(subClass, superClass); }
function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }
var parser$1 = parser$2;
var transformer = transformer$1;
var nodes$1 = nodes$4;
var _require$5 = libExports,
  TemplateError = _require$5.TemplateError;
var _require2$2 = runtime$1,
  Frame$1 = _require2$2.Frame;
var _require3 = object,
  Obj$1 = _require3.Obj;

// These are all the same for now, but shouldn't be passed straight
// through
var compareOps = {
  '==': '==',
  '===': '===',
  '!=': '!=',
  '!==': '!==',
  '<': '<',
  '>': '>',
  '<=': '<=',
  '>=': '>='
};
var Compiler = /*#__PURE__*/function (_Obj) {
  _inheritsLoose$4(Compiler, _Obj);
  function Compiler() {
    return _Obj.apply(this, arguments) || this;
  }
  var _proto = Compiler.prototype;
  _proto.init = function init(templateName, throwOnUndefined) {
    this.templateName = templateName;
    this.codebuf = [];
    this.lastId = 0;
    this.buffer = null;
    this.bufferStack = [];
    this._scopeClosers = '';
    this.inBlock = false;
    this.throwOnUndefined = throwOnUndefined;
  };
  _proto.fail = function fail(msg, lineno, colno) {
    if (lineno !== undefined) {
      lineno += 1;
    }
    if (colno !== undefined) {
      colno += 1;
    }
    throw new TemplateError(msg, lineno, colno);
  };
  _proto._pushBuffer = function _pushBuffer() {
    var id = this._tmpid();
    this.bufferStack.push(this.buffer);
    this.buffer = id;
    this._emit("var " + this.buffer + " = \"\";");
    return id;
  };
  _proto._popBuffer = function _popBuffer() {
    this.buffer = this.bufferStack.pop();
  };
  _proto._emit = function _emit(code) {
    this.codebuf.push(code);
  };
  _proto._emitLine = function _emitLine(code) {
    this._emit(code + '\n');
  };
  _proto._emitLines = function _emitLines() {
    var _this = this;
    for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
      lines[_key] = arguments[_key];
    }
    lines.forEach(function (line) {
      return _this._emitLine(line);
    });
  };
  _proto._emitFuncBegin = function _emitFuncBegin(node, name) {
    this.buffer = 'output';
    this._scopeClosers = '';
    this._emitLine("function " + name + "(env, context, frame, runtime, cb) {");
    this._emitLine("var lineno = " + node.lineno + ";");
    this._emitLine("var colno = " + node.colno + ";");
    this._emitLine("var " + this.buffer + " = \"\";");
    this._emitLine('try {');
  };
  _proto._emitFuncEnd = function _emitFuncEnd(noReturn) {
    if (!noReturn) {
      this._emitLine('cb(null, ' + this.buffer + ');');
    }
    this._closeScopeLevels();
    this._emitLine('} catch (e) {');
    this._emitLine('  cb(runtime.handleError(e, lineno, colno));');
    this._emitLine('}');
    this._emitLine('}');
    this.buffer = null;
  };
  _proto._addScopeLevel = function _addScopeLevel() {
    this._scopeClosers += '})';
  };
  _proto._closeScopeLevels = function _closeScopeLevels() {
    this._emitLine(this._scopeClosers + ';');
    this._scopeClosers = '';
  };
  _proto._withScopedSyntax = function _withScopedSyntax(func) {
    var _scopeClosers = this._scopeClosers;
    this._scopeClosers = '';
    func.call(this);
    this._closeScopeLevels();
    this._scopeClosers = _scopeClosers;
  };
  _proto._makeCallback = function _makeCallback(res) {
    var err = this._tmpid();
    return 'function(' + err + (res ? ',' + res : '') + ') {\n' + 'if(' + err + ') { cb(' + err + '); return; }';
  };
  _proto._tmpid = function _tmpid() {
    this.lastId++;
    return 't_' + this.lastId;
  };
  _proto._templateName = function _templateName() {
    return this.templateName == null ? 'undefined' : JSON.stringify(this.templateName);
  };
  _proto._compileChildren = function _compileChildren(node, frame) {
    var _this2 = this;
    node.children.forEach(function (child) {
      _this2.compile(child, frame);
    });
  };
  _proto._compileAggregate = function _compileAggregate(node, frame, startChar, endChar) {
    var _this3 = this;
    if (startChar) {
      this._emit(startChar);
    }
    node.children.forEach(function (child, i) {
      if (i > 0) {
        _this3._emit(',');
      }
      _this3.compile(child, frame);
    });
    if (endChar) {
      this._emit(endChar);
    }
  };
  _proto._compileExpression = function _compileExpression(node, frame) {
    // TODO: I'm not really sure if this type check is worth it or
    // not.
    this.assertType(node, nodes$1.Literal, nodes$1.Symbol, nodes$1.Group, nodes$1.Array, nodes$1.Dict, nodes$1.FunCall, nodes$1.Caller, nodes$1.Filter, nodes$1.LookupVal, nodes$1.Compare, nodes$1.InlineIf, nodes$1.In, nodes$1.Is, nodes$1.And, nodes$1.Or, nodes$1.Not, nodes$1.Add, nodes$1.Concat, nodes$1.Sub, nodes$1.Mul, nodes$1.Div, nodes$1.FloorDiv, nodes$1.Mod, nodes$1.Pow, nodes$1.Neg, nodes$1.Pos, nodes$1.Compare, nodes$1.NodeList);
    this.compile(node, frame);
  };
  _proto.assertType = function assertType(node) {
    for (var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      types[_key2 - 1] = arguments[_key2];
    }
    if (!types.some(function (t) {
      return node instanceof t;
    })) {
      this.fail("assertType: invalid type: " + node.typename, node.lineno, node.colno);
    }
  };
  _proto.compileCallExtension = function compileCallExtension(node, frame, async) {
    var _this4 = this;
    var args = node.args;
    var contentArgs = node.contentArgs;
    var autoescape = typeof node.autoescape === 'boolean' ? node.autoescape : true;
    if (!async) {
      this._emit(this.buffer + " += runtime.suppressValue(");
    }
    this._emit("env.getExtension(\"" + node.extName + "\")[\"" + node.prop + "\"](");
    this._emit('context');
    if (args || contentArgs) {
      this._emit(',');
    }
    if (args) {
      if (!(args instanceof nodes$1.NodeList)) {
        this.fail('compileCallExtension: arguments must be a NodeList, ' + 'use `parser.parseSignature`');
      }
      args.children.forEach(function (arg, i) {
        // Tag arguments are passed normally to the call. Note
        // that keyword arguments are turned into a single js
        // object as the last argument, if they exist.
        _this4._compileExpression(arg, frame);
        if (i !== args.children.length - 1 || contentArgs.length) {
          _this4._emit(',');
        }
      });
    }
    if (contentArgs.length) {
      contentArgs.forEach(function (arg, i) {
        if (i > 0) {
          _this4._emit(',');
        }
        if (arg) {
          _this4._emitLine('function(cb) {');
          _this4._emitLine('if(!cb) { cb = function(err) { if(err) { throw err; }}}');
          var id = _this4._pushBuffer();
          _this4._withScopedSyntax(function () {
            _this4.compile(arg, frame);
            _this4._emitLine("cb(null, " + id + ");");
          });
          _this4._popBuffer();
          _this4._emitLine("return " + id + ";");
          _this4._emitLine('}');
        } else {
          _this4._emit('null');
        }
      });
    }
    if (async) {
      var res = this._tmpid();
      this._emitLine(', ' + this._makeCallback(res));
      this._emitLine(this.buffer + " += runtime.suppressValue(" + res + ", " + autoescape + " && env.opts.autoescape);");
      this._addScopeLevel();
    } else {
      this._emit(')');
      this._emit(", " + autoescape + " && env.opts.autoescape);\n");
    }
  };
  _proto.compileCallExtensionAsync = function compileCallExtensionAsync(node, frame) {
    this.compileCallExtension(node, frame, true);
  };
  _proto.compileNodeList = function compileNodeList(node, frame) {
    this._compileChildren(node, frame);
  };
  _proto.compileLiteral = function compileLiteral(node) {
    if (typeof node.value === 'string') {
      var val = node.value.replace(/\\/g, '\\\\');
      val = val.replace(/"/g, '\\"');
      val = val.replace(/\n/g, '\\n');
      val = val.replace(/\r/g, '\\r');
      val = val.replace(/\t/g, '\\t');
      val = val.replace(/\u2028/g, "\\u2028");
      this._emit("\"" + val + "\"");
    } else if (node.value === null) {
      this._emit('null');
    } else {
      this._emit(node.value.toString());
    }
  };
  _proto.compileSymbol = function compileSymbol(node, frame) {
    var name = node.value;
    var v = frame.lookup(name);
    if (v) {
      this._emit(v);
    } else {
      this._emit('runtime.contextOrFrameLookup(' + 'context, frame, "' + name + '")');
    }
  };
  _proto.compileGroup = function compileGroup(node, frame) {
    this._compileAggregate(node, frame, '(', ')');
  };
  _proto.compileArray = function compileArray(node, frame) {
    this._compileAggregate(node, frame, '[', ']');
  };
  _proto.compileDict = function compileDict(node, frame) {
    this._compileAggregate(node, frame, '{', '}');
  };
  _proto.compilePair = function compilePair(node, frame) {
    var key = node.key;
    var val = node.value;
    if (key instanceof nodes$1.Symbol) {
      key = new nodes$1.Literal(key.lineno, key.colno, key.value);
    } else if (!(key instanceof nodes$1.Literal && typeof key.value === 'string')) {
      this.fail('compilePair: Dict keys must be strings or names', key.lineno, key.colno);
    }
    this.compile(key, frame);
    this._emit(': ');
    this._compileExpression(val, frame);
  };
  _proto.compileInlineIf = function compileInlineIf(node, frame) {
    this._emit('(');
    this.compile(node.cond, frame);
    this._emit('?');
    this.compile(node.body, frame);
    this._emit(':');
    if (node.else_ !== null) {
      this.compile(node.else_, frame);
    } else {
      this._emit('""');
    }
    this._emit(')');
  };
  _proto.compileIn = function compileIn(node, frame) {
    this._emit('runtime.inOperator(');
    this.compile(node.left, frame);
    this._emit(',');
    this.compile(node.right, frame);
    this._emit(')');
  };
  _proto.compileIs = function compileIs(node, frame) {
    // first, we need to try to get the name of the test function, if it's a
    // callable (i.e., has args) and not a symbol.
    var right = node.right.name ? node.right.name.value
    // otherwise go with the symbol value
    : node.right.value;
    this._emit('env.getTest("' + right + '").call(context, ');
    this.compile(node.left, frame);
    // compile the arguments for the callable if they exist
    if (node.right.args) {
      this._emit(',');
      this.compile(node.right.args, frame);
    }
    this._emit(') === true');
  };
  _proto._binOpEmitter = function _binOpEmitter(node, frame, str) {
    this.compile(node.left, frame);
    this._emit(str);
    this.compile(node.right, frame);
  }

  // ensure concatenation instead of addition
  // by adding empty string in between
  ;
  _proto.compileOr = function compileOr(node, frame) {
    return this._binOpEmitter(node, frame, ' || ');
  };
  _proto.compileAnd = function compileAnd(node, frame) {
    return this._binOpEmitter(node, frame, ' && ');
  };
  _proto.compileAdd = function compileAdd(node, frame) {
    return this._binOpEmitter(node, frame, ' + ');
  };
  _proto.compileConcat = function compileConcat(node, frame) {
    return this._binOpEmitter(node, frame, ' + "" + ');
  };
  _proto.compileSub = function compileSub(node, frame) {
    return this._binOpEmitter(node, frame, ' - ');
  };
  _proto.compileMul = function compileMul(node, frame) {
    return this._binOpEmitter(node, frame, ' * ');
  };
  _proto.compileDiv = function compileDiv(node, frame) {
    return this._binOpEmitter(node, frame, ' / ');
  };
  _proto.compileMod = function compileMod(node, frame) {
    return this._binOpEmitter(node, frame, ' % ');
  };
  _proto.compileNot = function compileNot(node, frame) {
    this._emit('!');
    this.compile(node.target, frame);
  };
  _proto.compileFloorDiv = function compileFloorDiv(node, frame) {
    this._emit('Math.floor(');
    this.compile(node.left, frame);
    this._emit(' / ');
    this.compile(node.right, frame);
    this._emit(')');
  };
  _proto.compilePow = function compilePow(node, frame) {
    this._emit('Math.pow(');
    this.compile(node.left, frame);
    this._emit(', ');
    this.compile(node.right, frame);
    this._emit(')');
  };
  _proto.compileNeg = function compileNeg(node, frame) {
    this._emit('-');
    this.compile(node.target, frame);
  };
  _proto.compilePos = function compilePos(node, frame) {
    this._emit('+');
    this.compile(node.target, frame);
  };
  _proto.compileCompare = function compileCompare(node, frame) {
    var _this5 = this;
    this.compile(node.expr, frame);
    node.ops.forEach(function (op) {
      _this5._emit(" " + compareOps[op.type] + " ");
      _this5.compile(op.expr, frame);
    });
  };
  _proto.compileLookupVal = function compileLookupVal(node, frame) {
    this._emit('runtime.memberLookup((');
    this._compileExpression(node.target, frame);
    this._emit('),');
    this._compileExpression(node.val, frame);
    this._emit(')');
  };
  _proto._getNodeName = function _getNodeName(node) {
    switch (node.typename) {
      case 'Symbol':
        return node.value;
      case 'FunCall':
        return 'the return value of (' + this._getNodeName(node.name) + ')';
      case 'LookupVal':
        return this._getNodeName(node.target) + '["' + this._getNodeName(node.val) + '"]';
      case 'Literal':
        return node.value.toString();
      default:
        return '--expression--';
    }
  };
  _proto.compileFunCall = function compileFunCall(node, frame) {
    // Keep track of line/col info at runtime by settings
    // variables within an expression. An expression in javascript
    // like (x, y, z) returns the last value, and x and y can be
    // anything
    this._emit('(lineno = ' + node.lineno + ', colno = ' + node.colno + ', ');
    this._emit('runtime.callWrap(');
    // Compile it as normal.
    this._compileExpression(node.name, frame);

    // Output the name of what we're calling so we can get friendly errors
    // if the lookup fails.
    this._emit(', "' + this._getNodeName(node.name).replace(/"/g, '\\"') + '", context, ');
    this._compileAggregate(node.args, frame, '[', '])');
    this._emit(')');
  };
  _proto.compileFilter = function compileFilter(node, frame) {
    var name = node.name;
    this.assertType(name, nodes$1.Symbol);
    this._emit('env.getFilter("' + name.value + '").call(context, ');
    this._compileAggregate(node.args, frame);
    this._emit(')');
  };
  _proto.compileFilterAsync = function compileFilterAsync(node, frame) {
    var name = node.name;
    var symbol = node.symbol.value;
    this.assertType(name, nodes$1.Symbol);
    frame.set(symbol, symbol);
    this._emit('env.getFilter("' + name.value + '").call(context, ');
    this._compileAggregate(node.args, frame);
    this._emitLine(', ' + this._makeCallback(symbol));
    this._addScopeLevel();
  };
  _proto.compileKeywordArgs = function compileKeywordArgs(node, frame) {
    this._emit('runtime.makeKeywordArgs(');
    this.compileDict(node, frame);
    this._emit(')');
  };
  _proto.compileSet = function compileSet(node, frame) {
    var _this6 = this;
    var ids = [];

    // Lookup the variable names for each identifier and create
    // new ones if necessary
    node.targets.forEach(function (target) {
      var name = target.value;
      var id = frame.lookup(name);
      if (id === null || id === undefined) {
        id = _this6._tmpid();

        // Note: This relies on js allowing scope across
        // blocks, in case this is created inside an `if`
        _this6._emitLine('var ' + id + ';');
      }
      ids.push(id);
    });
    if (node.value) {
      this._emit(ids.join(' = ') + ' = ');
      this._compileExpression(node.value, frame);
      this._emitLine(';');
    } else {
      this._emit(ids.join(' = ') + ' = ');
      this.compile(node.body, frame);
      this._emitLine(';');
    }
    node.targets.forEach(function (target, i) {
      var id = ids[i];
      var name = target.value;

      // We are running this for every var, but it's very
      // uncommon to assign to multiple vars anyway
      _this6._emitLine("frame.set(\"" + name + "\", " + id + ", true);");
      _this6._emitLine('if(frame.topLevel) {');
      _this6._emitLine("context.setVariable(\"" + name + "\", " + id + ");");
      _this6._emitLine('}');
      if (name.charAt(0) !== '_') {
        _this6._emitLine('if(frame.topLevel) {');
        _this6._emitLine("context.addExport(\"" + name + "\", " + id + ");");
        _this6._emitLine('}');
      }
    });
  };
  _proto.compileSwitch = function compileSwitch(node, frame) {
    var _this7 = this;
    this._emit('switch (');
    this.compile(node.expr, frame);
    this._emit(') {');
    node.cases.forEach(function (c, i) {
      _this7._emit('case ');
      _this7.compile(c.cond, frame);
      _this7._emit(': ');
      _this7.compile(c.body, frame);
      // preserve fall-throughs
      if (c.body.children.length) {
        _this7._emitLine('break;');
      }
    });
    if (node.default) {
      this._emit('default:');
      this.compile(node.default, frame);
    }
    this._emit('}');
  };
  _proto.compileIf = function compileIf(node, frame, async) {
    var _this8 = this;
    this._emit('if(');
    this._compileExpression(node.cond, frame);
    this._emitLine(') {');
    this._withScopedSyntax(function () {
      _this8.compile(node.body, frame);
      if (async) {
        _this8._emit('cb()');
      }
    });
    if (node.else_) {
      this._emitLine('}\nelse {');
      this._withScopedSyntax(function () {
        _this8.compile(node.else_, frame);
        if (async) {
          _this8._emit('cb()');
        }
      });
    } else if (async) {
      this._emitLine('}\nelse {');
      this._emit('cb()');
    }
    this._emitLine('}');
  };
  _proto.compileIfAsync = function compileIfAsync(node, frame) {
    this._emit('(function(cb) {');
    this.compileIf(node, frame, true);
    this._emit('})(' + this._makeCallback());
    this._addScopeLevel();
  };
  _proto._emitLoopBindings = function _emitLoopBindings(node, arr, i, len) {
    var _this9 = this;
    var bindings = [{
      name: 'index',
      val: i + " + 1"
    }, {
      name: 'index0',
      val: i
    }, {
      name: 'revindex',
      val: len + " - " + i
    }, {
      name: 'revindex0',
      val: len + " - " + i + " - 1"
    }, {
      name: 'first',
      val: i + " === 0"
    }, {
      name: 'last',
      val: i + " === " + len + " - 1"
    }, {
      name: 'length',
      val: len
    }];
    bindings.forEach(function (b) {
      _this9._emitLine("frame.set(\"loop." + b.name + "\", " + b.val + ");");
    });
  };
  _proto.compileFor = function compileFor(node, frame) {
    var _this10 = this;
    // Some of this code is ugly, but it keeps the generated code
    // as fast as possible. ForAsync also shares some of this, but
    // not much.

    var i = this._tmpid();
    var len = this._tmpid();
    var arr = this._tmpid();
    frame = frame.push();
    this._emitLine('frame = frame.push();');
    this._emit("var " + arr + " = ");
    this._compileExpression(node.arr, frame);
    this._emitLine(';');
    this._emit("if(" + arr + ") {");
    this._emitLine(arr + ' = runtime.fromIterator(' + arr + ');');

    // If multiple names are passed, we need to bind them
    // appropriately
    if (node.name instanceof nodes$1.Array) {
      this._emitLine("var " + i + ";");

      // The object could be an arroy or object. Note that the
      // body of the loop is duplicated for each condition, but
      // we are optimizing for speed over size.
      this._emitLine("if(runtime.isArray(" + arr + ")) {");
      this._emitLine("var " + len + " = " + arr + ".length;");
      this._emitLine("for(" + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");

      // Bind each declared var
      node.name.children.forEach(function (child, u) {
        var tid = _this10._tmpid();
        _this10._emitLine("var " + tid + " = " + arr + "[" + i + "][" + u + "];");
        _this10._emitLine("frame.set(\"" + child + "\", " + arr + "[" + i + "][" + u + "]);");
        frame.set(node.name.children[u].value, tid);
      });
      this._emitLoopBindings(node, arr, i, len);
      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });
      this._emitLine('}');
      this._emitLine('} else {');
      // Iterate over the key/values of an object
      var _node$name$children = node.name.children,
        key = _node$name$children[0],
        val = _node$name$children[1];
      var k = this._tmpid();
      var v = this._tmpid();
      frame.set(key.value, k);
      frame.set(val.value, v);
      this._emitLine(i + " = -1;");
      this._emitLine("var " + len + " = runtime.keys(" + arr + ").length;");
      this._emitLine("for(var " + k + " in " + arr + ") {");
      this._emitLine(i + "++;");
      this._emitLine("var " + v + " = " + arr + "[" + k + "];");
      this._emitLine("frame.set(\"" + key.value + "\", " + k + ");");
      this._emitLine("frame.set(\"" + val.value + "\", " + v + ");");
      this._emitLoopBindings(node, arr, i, len);
      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });
      this._emitLine('}');
      this._emitLine('}');
    } else {
      // Generate a typical array iteration
      var _v = this._tmpid();
      frame.set(node.name.value, _v);
      this._emitLine("var " + len + " = " + arr + ".length;");
      this._emitLine("for(var " + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
      this._emitLine("var " + _v + " = " + arr + "[" + i + "];");
      this._emitLine("frame.set(\"" + node.name.value + "\", " + _v + ");");
      this._emitLoopBindings(node, arr, i, len);
      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });
      this._emitLine('}');
    }
    this._emitLine('}');
    if (node.else_) {
      this._emitLine('if (!' + len + ') {');
      this.compile(node.else_, frame);
      this._emitLine('}');
    }
    this._emitLine('frame = frame.pop();');
  };
  _proto._compileAsyncLoop = function _compileAsyncLoop(node, frame, parallel) {
    var _this11 = this;
    // This shares some code with the For tag, but not enough to
    // worry about. This iterates across an object asynchronously,
    // but not in parallel.

    var i = this._tmpid();
    var len = this._tmpid();
    var arr = this._tmpid();
    var asyncMethod = parallel ? 'asyncAll' : 'asyncEach';
    frame = frame.push();
    this._emitLine('frame = frame.push();');
    this._emit('var ' + arr + ' = runtime.fromIterator(');
    this._compileExpression(node.arr, frame);
    this._emitLine(');');
    if (node.name instanceof nodes$1.Array) {
      var arrayLen = node.name.children.length;
      this._emit("runtime." + asyncMethod + "(" + arr + ", " + arrayLen + ", function(");
      node.name.children.forEach(function (name) {
        _this11._emit(name.value + ",");
      });
      this._emit(i + ',' + len + ',next) {');
      node.name.children.forEach(function (name) {
        var id = name.value;
        frame.set(id, id);
        _this11._emitLine("frame.set(\"" + id + "\", " + id + ");");
      });
    } else {
      var id = node.name.value;
      this._emitLine("runtime." + asyncMethod + "(" + arr + ", 1, function(" + id + ", " + i + ", " + len + ",next) {");
      this._emitLine('frame.set("' + id + '", ' + id + ');');
      frame.set(id, id);
    }
    this._emitLoopBindings(node, arr, i, len);
    this._withScopedSyntax(function () {
      var buf;
      if (parallel) {
        buf = _this11._pushBuffer();
      }
      _this11.compile(node.body, frame);
      _this11._emitLine('next(' + i + (buf ? ',' + buf : '') + ');');
      if (parallel) {
        _this11._popBuffer();
      }
    });
    var output = this._tmpid();
    this._emitLine('}, ' + this._makeCallback(output));
    this._addScopeLevel();
    if (parallel) {
      this._emitLine(this.buffer + ' += ' + output + ';');
    }
    if (node.else_) {
      this._emitLine('if (!' + arr + '.length) {');
      this.compile(node.else_, frame);
      this._emitLine('}');
    }
    this._emitLine('frame = frame.pop();');
  };
  _proto.compileAsyncEach = function compileAsyncEach(node, frame) {
    this._compileAsyncLoop(node, frame);
  };
  _proto.compileAsyncAll = function compileAsyncAll(node, frame) {
    this._compileAsyncLoop(node, frame, true);
  };
  _proto._compileMacro = function _compileMacro(node, frame) {
    var _this12 = this;
    var args = [];
    var kwargs = null;
    var funcId = 'macro_' + this._tmpid();
    var keepFrame = frame !== undefined;

    // Type check the definition of the args
    node.args.children.forEach(function (arg, i) {
      if (i === node.args.children.length - 1 && arg instanceof nodes$1.Dict) {
        kwargs = arg;
      } else {
        _this12.assertType(arg, nodes$1.Symbol);
        args.push(arg);
      }
    });
    var realNames = [].concat(args.map(function (n) {
      return "l_" + n.value;
    }), ['kwargs']);

    // Quoted argument names
    var argNames = args.map(function (n) {
      return "\"" + n.value + "\"";
    });
    var kwargNames = (kwargs && kwargs.children || []).map(function (n) {
      return "\"" + n.key.value + "\"";
    });

    // We pass a function to makeMacro which destructures the
    // arguments so support setting positional args with keywords
    // args and passing keyword args as positional args
    // (essentially default values). See runtime.js.
    var currFrame;
    if (keepFrame) {
      currFrame = frame.push(true);
    } else {
      currFrame = new Frame$1();
    }
    this._emitLines("var " + funcId + " = runtime.makeMacro(", "[" + argNames.join(', ') + "], ", "[" + kwargNames.join(', ') + "], ", "function (" + realNames.join(', ') + ") {", 'var callerFrame = frame;', 'frame = ' + (keepFrame ? 'frame.push(true);' : 'new runtime.Frame();'), 'kwargs = kwargs || {};', 'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {', 'frame.set("caller", kwargs.caller); }');

    // Expose the arguments to the template. Don't need to use
    // random names because the function
    // will create a new run-time scope for us
    args.forEach(function (arg) {
      _this12._emitLine("frame.set(\"" + arg.value + "\", l_" + arg.value + ");");
      currFrame.set(arg.value, "l_" + arg.value);
    });

    // Expose the keyword arguments
    if (kwargs) {
      kwargs.children.forEach(function (pair) {
        var name = pair.key.value;
        _this12._emit("frame.set(\"" + name + "\", ");
        _this12._emit("Object.prototype.hasOwnProperty.call(kwargs, \"" + name + "\")");
        _this12._emit(" ? kwargs[\"" + name + "\"] : ");
        _this12._compileExpression(pair.value, currFrame);
        _this12._emit(');');
      });
    }
    var bufferId = this._pushBuffer();
    this._withScopedSyntax(function () {
      _this12.compile(node.body, currFrame);
    });
    this._emitLine('frame = ' + (keepFrame ? 'frame.pop();' : 'callerFrame;'));
    this._emitLine("return new runtime.SafeString(" + bufferId + ");");
    this._emitLine('});');
    this._popBuffer();
    return funcId;
  };
  _proto.compileMacro = function compileMacro(node, frame) {
    var funcId = this._compileMacro(node);

    // Expose the macro to the templates
    var name = node.name.value;
    frame.set(name, funcId);
    if (frame.parent) {
      this._emitLine("frame.set(\"" + name + "\", " + funcId + ");");
    } else {
      if (node.name.value.charAt(0) !== '_') {
        this._emitLine("context.addExport(\"" + name + "\");");
      }
      this._emitLine("context.setVariable(\"" + name + "\", " + funcId + ");");
    }
  };
  _proto.compileCaller = function compileCaller(node, frame) {
    // basically an anonymous "macro expression"
    this._emit('(function (){');
    var funcId = this._compileMacro(node, frame);
    this._emit("return " + funcId + ";})()");
  };
  _proto._compileGetTemplate = function _compileGetTemplate(node, frame, eagerCompile, ignoreMissing) {
    var parentTemplateId = this._tmpid();
    var parentName = this._templateName();
    var cb = this._makeCallback(parentTemplateId);
    var eagerCompileArg = eagerCompile ? 'true' : 'false';
    var ignoreMissingArg = ignoreMissing ? 'true' : 'false';
    this._emit('env.getTemplate(');
    this._compileExpression(node.template, frame);
    this._emitLine(", " + eagerCompileArg + ", " + parentName + ", " + ignoreMissingArg + ", " + cb);
    return parentTemplateId;
  };
  _proto.compileImport = function compileImport(node, frame) {
    var target = node.target.value;
    var id = this._compileGetTemplate(node, frame, false, false);
    this._addScopeLevel();
    this._emitLine(id + '.getExported(' + (node.withContext ? 'context.getVariables(), frame, ' : '') + this._makeCallback(id));
    this._addScopeLevel();
    frame.set(target, id);
    if (frame.parent) {
      this._emitLine("frame.set(\"" + target + "\", " + id + ");");
    } else {
      this._emitLine("context.setVariable(\"" + target + "\", " + id + ");");
    }
  };
  _proto.compileFromImport = function compileFromImport(node, frame) {
    var _this13 = this;
    var importedId = this._compileGetTemplate(node, frame, false, false);
    this._addScopeLevel();
    this._emitLine(importedId + '.getExported(' + (node.withContext ? 'context.getVariables(), frame, ' : '') + this._makeCallback(importedId));
    this._addScopeLevel();
    node.names.children.forEach(function (nameNode) {
      var name;
      var alias;
      var id = _this13._tmpid();
      if (nameNode instanceof nodes$1.Pair) {
        name = nameNode.key.value;
        alias = nameNode.value.value;
      } else {
        name = nameNode.value;
        alias = name;
      }
      _this13._emitLine("if(Object.prototype.hasOwnProperty.call(" + importedId + ", \"" + name + "\")) {");
      _this13._emitLine("var " + id + " = " + importedId + "." + name + ";");
      _this13._emitLine('} else {');
      _this13._emitLine("cb(new Error(\"cannot import '" + name + "'\")); return;");
      _this13._emitLine('}');
      frame.set(alias, id);
      if (frame.parent) {
        _this13._emitLine("frame.set(\"" + alias + "\", " + id + ");");
      } else {
        _this13._emitLine("context.setVariable(\"" + alias + "\", " + id + ");");
      }
    });
  };
  _proto.compileBlock = function compileBlock(node) {
    var id = this._tmpid();

    // If we are executing outside a block (creating a top-level
    // block), we really don't want to execute its code because it
    // will execute twice: once when the child template runs and
    // again when the parent template runs. Note that blocks
    // within blocks will *always* execute immediately *and*
    // wherever else they are invoked (like used in a parent
    // template). This may have behavioral differences from jinja
    // because blocks can have side effects, but it seems like a
    // waste of performance to always execute huge top-level
    // blocks twice
    if (!this.inBlock) {
      this._emit('(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : ');
    }
    this._emit("context.getBlock(\"" + node.name.value + "\")");
    if (!this.inBlock) {
      this._emit(')');
    }
    this._emitLine('(env, context, frame, runtime, ' + this._makeCallback(id));
    this._emitLine(this.buffer + " += " + id + ";");
    this._addScopeLevel();
  };
  _proto.compileSuper = function compileSuper(node, frame) {
    var name = node.blockName.value;
    var id = node.symbol.value;
    var cb = this._makeCallback(id);
    this._emitLine("context.getSuper(env, \"" + name + "\", b_" + name + ", frame, runtime, " + cb);
    this._emitLine(id + " = runtime.markSafe(" + id + ");");
    this._addScopeLevel();
    frame.set(id, id);
  };
  _proto.compileExtends = function compileExtends(node, frame) {
    var k = this._tmpid();
    var parentTemplateId = this._compileGetTemplate(node, frame, true, false);

    // extends is a dynamic tag and can occur within a block like
    // `if`, so if this happens we need to capture the parent
    // template in the top-level scope
    this._emitLine("parentTemplate = " + parentTemplateId);
    this._emitLine("for(var " + k + " in parentTemplate.blocks) {");
    this._emitLine("context.addBlock(" + k + ", parentTemplate.blocks[" + k + "]);");
    this._emitLine('}');
    this._addScopeLevel();
  };
  _proto.compileInclude = function compileInclude(node, frame) {
    this._emitLine('var tasks = [];');
    this._emitLine('tasks.push(');
    this._emitLine('function(callback) {');
    var id = this._compileGetTemplate(node, frame, false, node.ignoreMissing);
    this._emitLine("callback(null," + id + ");});");
    this._emitLine('});');
    var id2 = this._tmpid();
    this._emitLine('tasks.push(');
    this._emitLine('function(template, callback){');
    this._emitLine('template.render(context.getVariables(), frame, ' + this._makeCallback(id2));
    this._emitLine('callback(null,' + id2 + ');});');
    this._emitLine('});');
    this._emitLine('tasks.push(');
    this._emitLine('function(result, callback){');
    this._emitLine(this.buffer + " += result;");
    this._emitLine('callback(null);');
    this._emitLine('});');
    this._emitLine('env.waterfall(tasks, function(){');
    this._addScopeLevel();
  };
  _proto.compileTemplateData = function compileTemplateData(node, frame) {
    this.compileLiteral(node, frame);
  };
  _proto.compileCapture = function compileCapture(node, frame) {
    var _this14 = this;
    // we need to temporarily override the current buffer id as 'output'
    // so the set block writes to the capture output instead of the buffer
    var buffer = this.buffer;
    this.buffer = 'output';
    this._emitLine('(function() {');
    this._emitLine('var output = "";');
    this._withScopedSyntax(function () {
      _this14.compile(node.body, frame);
    });
    this._emitLine('return output;');
    this._emitLine('})()');
    // and of course, revert back to the old buffer id
    this.buffer = buffer;
  };
  _proto.compileOutput = function compileOutput(node, frame) {
    var _this15 = this;
    var children = node.children;
    children.forEach(function (child) {
      // TemplateData is a special case because it is never
      // autoescaped, so simply output it for optimization
      if (child instanceof nodes$1.TemplateData) {
        if (child.value) {
          _this15._emit(_this15.buffer + " += ");
          _this15.compileLiteral(child, frame);
          _this15._emitLine(';');
        }
      } else {
        _this15._emit(_this15.buffer + " += runtime.suppressValue(");
        if (_this15.throwOnUndefined) {
          _this15._emit('runtime.ensureDefined(');
        }
        _this15.compile(child, frame);
        if (_this15.throwOnUndefined) {
          _this15._emit("," + node.lineno + "," + node.colno + ")");
        }
        _this15._emit(', env.opts.autoescape);\n');
      }
    });
  };
  _proto.compileRoot = function compileRoot(node, frame) {
    var _this16 = this;
    if (frame) {
      this.fail('compileRoot: root node can\'t have frame');
    }
    frame = new Frame$1();
    this._emitFuncBegin(node, 'root');
    this._emitLine('var parentTemplate = null;');
    this._compileChildren(node, frame);
    this._emitLine('if(parentTemplate) {');
    this._emitLine('parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);');
    this._emitLine('} else {');
    this._emitLine("cb(null, " + this.buffer + ");");
    this._emitLine('}');
    this._emitFuncEnd(true);
    this.inBlock = true;
    var blockNames = [];
    var blocks = node.findAll(nodes$1.Block);
    blocks.forEach(function (block, i) {
      var name = block.name.value;
      if (blockNames.indexOf(name) !== -1) {
        throw new Error("Block \"" + name + "\" defined more than once.");
      }
      blockNames.push(name);
      _this16._emitFuncBegin(block, "b_" + name);
      var tmpFrame = new Frame$1();
      _this16._emitLine('var frame = frame.push(true);');
      _this16.compile(block.body, tmpFrame);
      _this16._emitFuncEnd();
    });
    this._emitLine('return {');
    blocks.forEach(function (block, i) {
      var blockName = "b_" + block.name.value;
      _this16._emitLine(blockName + ": " + blockName + ",");
    });
    this._emitLine('root: root\n};');
  };
  _proto.compile = function compile(node, frame) {
    var _compile = this['compile' + node.typename];
    if (_compile) {
      _compile.call(this, node, frame);
    } else {
      this.fail("compile: Cannot compile node: " + node.typename, node.lineno, node.colno);
    }
  };
  _proto.getCode = function getCode() {
    return this.codebuf.join('');
  };
  return Compiler;
}(Obj$1);
var compiler$3 = {
  compile: function compile(src, asyncFilters, extensions, name, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var c = new Compiler(name, opts.throwOnUndefined);

    // Run the extension preprocessors against the source.
    var preprocessors = (extensions || []).map(function (ext) {
      return ext.preprocess;
    }).filter(function (f) {
      return !!f;
    });
    var processedSrc = preprocessors.reduce(function (s, processor) {
      return processor(s);
    }, src);
    c.compile(transformer.transform(parser$1.parse(processedSrc, extensions, opts), asyncFilters, name));
    return c.getCode();
  },
  Compiler: Compiler
};

var filters$1 = {exports: {}};

var lib$2 = libExports;
var r = runtime$1;
var _exports = filters$1.exports = {};
function normalize(value, defaultValue) {
  if (value === null || value === undefined || value === false) {
    return defaultValue;
  }
  return value;
}
_exports.abs = Math.abs;
function isNaN(num) {
  return num !== num; // eslint-disable-line no-self-compare
}

function batch(arr, linecount, fillWith) {
  var i;
  var res = [];
  var tmp = [];
  for (i = 0; i < arr.length; i++) {
    if (i % linecount === 0 && tmp.length) {
      res.push(tmp);
      tmp = [];
    }
    tmp.push(arr[i]);
  }
  if (tmp.length) {
    if (fillWith) {
      for (i = tmp.length; i < linecount; i++) {
        tmp.push(fillWith);
      }
    }
    res.push(tmp);
  }
  return res;
}
_exports.batch = batch;
function capitalize(str) {
  str = normalize(str, '');
  var ret = str.toLowerCase();
  return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
}
_exports.capitalize = capitalize;
function center(str, width) {
  str = normalize(str, '');
  width = width || 80;
  if (str.length >= width) {
    return str;
  }
  var spaces = width - str.length;
  var pre = lib$2.repeat(' ', spaces / 2 - spaces % 2);
  var post = lib$2.repeat(' ', spaces / 2);
  return r.copySafeness(str, pre + str + post);
}
_exports.center = center;
function default_(val, def, bool) {
  if (bool) {
    return val || def;
  } else {
    return val !== undefined ? val : def;
  }
}

// TODO: it is confusing to export something called 'default'
_exports['default'] = default_; // eslint-disable-line dot-notation

function dictsort(val, caseSensitive, by) {
  if (!lib$2.isObject(val)) {
    throw new lib$2.TemplateError('dictsort filter: val must be an object');
  }
  var array = [];
  // deliberately include properties from the object's prototype
  for (var k in val) {
    // eslint-disable-line guard-for-in, no-restricted-syntax
    array.push([k, val[k]]);
  }
  var si;
  if (by === undefined || by === 'key') {
    si = 0;
  } else if (by === 'value') {
    si = 1;
  } else {
    throw new lib$2.TemplateError('dictsort filter: You can only sort by either key or value');
  }
  array.sort(function (t1, t2) {
    var a = t1[si];
    var b = t2[si];
    if (!caseSensitive) {
      if (lib$2.isString(a)) {
        a = a.toUpperCase();
      }
      if (lib$2.isString(b)) {
        b = b.toUpperCase();
      }
    }
    return a > b ? 1 : a === b ? 0 : -1; // eslint-disable-line no-nested-ternary
  });

  return array;
}
_exports.dictsort = dictsort;
function dump(obj, spaces) {
  return JSON.stringify(obj, null, spaces);
}
_exports.dump = dump;
function escape(str) {
  if (str instanceof r.SafeString) {
    return str;
  }
  str = str === null || str === undefined ? '' : str;
  return r.markSafe(lib$2.escape(str.toString()));
}
_exports.escape = escape;
function safe(str) {
  if (str instanceof r.SafeString) {
    return str;
  }
  str = str === null || str === undefined ? '' : str;
  return r.markSafe(str.toString());
}
_exports.safe = safe;
function first(arr) {
  return arr[0];
}
_exports.first = first;
function forceescape(str) {
  str = str === null || str === undefined ? '' : str;
  return r.markSafe(lib$2.escape(str.toString()));
}
_exports.forceescape = forceescape;
function groupby(arr, attr) {
  return lib$2.groupBy(arr, attr, this.env.opts.throwOnUndefined);
}
_exports.groupby = groupby;
function indent(str, width, indentfirst) {
  str = normalize(str, '');
  if (str === '') {
    return '';
  }
  width = width || 4;
  // let res = '';
  var lines = str.split('\n');
  var sp = lib$2.repeat(' ', width);
  var res = lines.map(function (l, i) {
    return i === 0 && !indentfirst ? l : "" + sp + l;
  }).join('\n');
  return r.copySafeness(str, res);
}
_exports.indent = indent;
function join(arr, del, attr) {
  del = del || '';
  if (attr) {
    arr = lib$2.map(arr, function (v) {
      return v[attr];
    });
  }
  return arr.join(del);
}
_exports.join = join;
function last(arr) {
  return arr[arr.length - 1];
}
_exports.last = last;
function lengthFilter(val) {
  var value = normalize(val, '');
  if (value !== undefined) {
    if (typeof Map === 'function' && value instanceof Map || typeof Set === 'function' && value instanceof Set) {
      // ECMAScript 2015 Maps and Sets
      return value.size;
    }
    if (lib$2.isObject(value) && !(value instanceof r.SafeString)) {
      // Objects (besides SafeStrings), non-primative Arrays
      return lib$2.keys(value).length;
    }
    return value.length;
  }
  return 0;
}
_exports.length = lengthFilter;
function list(val) {
  if (lib$2.isString(val)) {
    return val.split('');
  } else if (lib$2.isObject(val)) {
    return lib$2._entries(val || {}).map(function (_ref) {
      var key = _ref[0],
        value = _ref[1];
      return {
        key: key,
        value: value
      };
    });
  } else if (lib$2.isArray(val)) {
    return val;
  } else {
    throw new lib$2.TemplateError('list filter: type not iterable');
  }
}
_exports.list = list;
function lower(str) {
  str = normalize(str, '');
  return str.toLowerCase();
}
_exports.lower = lower;
function nl2br(str) {
  if (str === null || str === undefined) {
    return '';
  }
  return r.copySafeness(str, str.replace(/\r\n|\n/g, '<br />\n'));
}
_exports.nl2br = nl2br;
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
_exports.random = random;

/**
 * Construct select or reject filter
 *
 * @param {boolean} expectedTestResult
 * @returns {function(array, string, *): array}
 */
function getSelectOrReject(expectedTestResult) {
  function filter(arr, testName, secondArg) {
    if (testName === void 0) {
      testName = 'truthy';
    }
    var context = this;
    var test = context.env.getTest(testName);
    return lib$2.toArray(arr).filter(function examineTestResult(item) {
      return test.call(context, item, secondArg) === expectedTestResult;
    });
  }
  return filter;
}
_exports.reject = getSelectOrReject(false);
function rejectattr(arr, attr) {
  return arr.filter(function (item) {
    return !item[attr];
  });
}
_exports.rejectattr = rejectattr;
_exports.select = getSelectOrReject(true);
function selectattr(arr, attr) {
  return arr.filter(function (item) {
    return !!item[attr];
  });
}
_exports.selectattr = selectattr;
function replace(str, old, new_, maxCount) {
  var originalStr = str;
  if (old instanceof RegExp) {
    return str.replace(old, new_);
  }
  if (typeof maxCount === 'undefined') {
    maxCount = -1;
  }
  var res = ''; // Output

  // Cast Numbers in the search term to string
  if (typeof old === 'number') {
    old = '' + old;
  } else if (typeof old !== 'string') {
    // If it is something other than number or string,
    // return the original string
    return str;
  }

  // Cast numbers in the replacement to string
  if (typeof str === 'number') {
    str = '' + str;
  }

  // If by now, we don't have a string, throw it back
  if (typeof str !== 'string' && !(str instanceof r.SafeString)) {
    return str;
  }

  // ShortCircuits
  if (old === '') {
    // Mimic the python behaviour: empty string is replaced
    // by replacement e.g. "abc"|replace("", ".") -> .a.b.c.
    res = new_ + str.split('').join(new_) + new_;
    return r.copySafeness(str, res);
  }
  var nextIndex = str.indexOf(old);
  // if # of replacements to perform is 0, or the string to does
  // not contain the old value, return the string
  if (maxCount === 0 || nextIndex === -1) {
    return str;
  }
  var pos = 0;
  var count = 0; // # of replacements made

  while (nextIndex > -1 && (maxCount === -1 || count < maxCount)) {
    // Grab the next chunk of src string and add it with the
    // replacement, to the result
    res += str.substring(pos, nextIndex) + new_;
    // Increment our pointer in the src string
    pos = nextIndex + old.length;
    count++;
    // See if there are any more replacements to be made
    nextIndex = str.indexOf(old, pos);
  }

  // We've either reached the end, or done the max # of
  // replacements, tack on any remaining string
  if (pos < str.length) {
    res += str.substring(pos);
  }
  return r.copySafeness(originalStr, res);
}
_exports.replace = replace;
function reverse(val) {
  var arr;
  if (lib$2.isString(val)) {
    arr = list(val);
  } else {
    // Copy it
    arr = lib$2.map(val, function (v) {
      return v;
    });
  }
  arr.reverse();
  if (lib$2.isString(val)) {
    return r.copySafeness(val, arr.join(''));
  }
  return arr;
}
_exports.reverse = reverse;
function round(val, precision, method) {
  precision = precision || 0;
  var factor = Math.pow(10, precision);
  var rounder;
  if (method === 'ceil') {
    rounder = Math.ceil;
  } else if (method === 'floor') {
    rounder = Math.floor;
  } else {
    rounder = Math.round;
  }
  return rounder(val * factor) / factor;
}
_exports.round = round;
function slice(arr, slices, fillWith) {
  var sliceLength = Math.floor(arr.length / slices);
  var extra = arr.length % slices;
  var res = [];
  var offset = 0;
  for (var i = 0; i < slices; i++) {
    var start = offset + i * sliceLength;
    if (i < extra) {
      offset++;
    }
    var end = offset + (i + 1) * sliceLength;
    var currSlice = arr.slice(start, end);
    if (fillWith && i >= extra) {
      currSlice.push(fillWith);
    }
    res.push(currSlice);
  }
  return res;
}
_exports.slice = slice;
function sum(arr, attr, start) {
  if (start === void 0) {
    start = 0;
  }
  if (attr) {
    arr = lib$2.map(arr, function (v) {
      return v[attr];
    });
  }
  return start + arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}
_exports.sum = sum;
_exports.sort = r.makeMacro(['value', 'reverse', 'case_sensitive', 'attribute'], [], function sortFilter(arr, reversed, caseSens, attr) {
  var _this = this;
  // Copy it
  var array = lib$2.map(arr, function (v) {
    return v;
  });
  var getAttribute = lib$2.getAttrGetter(attr);
  array.sort(function (a, b) {
    var x = attr ? getAttribute(a) : a;
    var y = attr ? getAttribute(b) : b;
    if (_this.env.opts.throwOnUndefined && attr && (x === undefined || y === undefined)) {
      throw new TypeError("sort: attribute \"" + attr + "\" resolved to undefined");
    }
    if (!caseSens && lib$2.isString(x) && lib$2.isString(y)) {
      x = x.toLowerCase();
      y = y.toLowerCase();
    }
    if (x < y) {
      return reversed ? 1 : -1;
    } else if (x > y) {
      return reversed ? -1 : 1;
    } else {
      return 0;
    }
  });
  return array;
});
function string(obj) {
  return r.copySafeness(obj, obj);
}
_exports.string = string;
function striptags(input, preserveLinebreaks) {
  input = normalize(input, '');
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
  var trimmedInput = trim(input.replace(tags, ''));
  var res = '';
  if (preserveLinebreaks) {
    res = trimmedInput.replace(/^ +| +$/gm, '') // remove leading and trailing spaces
    .replace(/ +/g, ' ') // squash adjacent spaces
    .replace(/(\r\n)/g, '\n') // normalize linebreaks (CRLF -> LF)
    .replace(/\n\n\n+/g, '\n\n'); // squash abnormal adjacent linebreaks
  } else {
    res = trimmedInput.replace(/\s+/gi, ' ');
  }
  return r.copySafeness(input, res);
}
_exports.striptags = striptags;
function title(str) {
  str = normalize(str, '');
  var words = str.split(' ').map(function (word) {
    return capitalize(word);
  });
  return r.copySafeness(str, words.join(' '));
}
_exports.title = title;
function trim(str) {
  return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
}
_exports.trim = trim;
function truncate(input, length, killwords, end) {
  var orig = input;
  input = normalize(input, '');
  length = length || 255;
  if (input.length <= length) {
    return input;
  }
  if (killwords) {
    input = input.substring(0, length);
  } else {
    var idx = input.lastIndexOf(' ', length);
    if (idx === -1) {
      idx = length;
    }
    input = input.substring(0, idx);
  }
  input += end !== undefined && end !== null ? end : '...';
  return r.copySafeness(orig, input);
}
_exports.truncate = truncate;
function upper(str) {
  str = normalize(str, '');
  return str.toUpperCase();
}
_exports.upper = upper;
function urlencode(obj) {
  var enc = encodeURIComponent;
  if (lib$2.isString(obj)) {
    return enc(obj);
  } else {
    var keyvals = lib$2.isArray(obj) ? obj : lib$2._entries(obj);
    return keyvals.map(function (_ref2) {
      var k = _ref2[0],
        v = _ref2[1];
      return enc(k) + "=" + enc(v);
    }).join('&');
  }
}
_exports.urlencode = urlencode;

// For the jinja regexp, see
// https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23
var puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
// from http://blog.gerv.net/2011/05/html5_email_address_regexp/
var emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
var httpHttpsRe = /^https?:\/\/.*$/;
var wwwRe = /^www\./;
var tldRe = /\.(?:org|net|com)(?:\:|\/|$)/;
function urlize(str, length, nofollow) {
  if (isNaN(length)) {
    length = Infinity;
  }
  var noFollowAttr = nofollow === true ? ' rel="nofollow"' : '';
  var words = str.split(/(\s+)/).filter(function (word) {
    // If the word has no length, bail. This can happen for str with
    // trailing whitespace.
    return word && word.length;
  }).map(function (word) {
    var matches = word.match(puncRe);
    var possibleUrl = matches ? matches[1] : word;
    var shortUrl = possibleUrl.substr(0, length);

    // url that starts with http or https
    if (httpHttpsRe.test(possibleUrl)) {
      return "<a href=\"" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    }

    // url that starts with www.
    if (wwwRe.test(possibleUrl)) {
      return "<a href=\"http://" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    }

    // an email address of the form username@domain.tld
    if (emailRe.test(possibleUrl)) {
      return "<a href=\"mailto:" + possibleUrl + "\">" + possibleUrl + "</a>";
    }

    // url that ends in .com, .org or .net that is not an email address
    if (tldRe.test(possibleUrl)) {
      return "<a href=\"http://" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    }
    return word;
  });
  return words.join('');
}
_exports.urlize = urlize;
function wordcount(str) {
  str = normalize(str, '');
  var words = str ? str.match(/\w+/g) : null;
  return words ? words.length : null;
}
_exports.wordcount = wordcount;
function float(val, def) {
  var res = parseFloat(val);
  return isNaN(res) ? def : res;
}
_exports.float = float;
var intFilter = r.makeMacro(['value', 'default', 'base'], [], function doInt(value, defaultValue, base) {
  if (base === void 0) {
    base = 10;
  }
  var res = parseInt(value, base);
  return isNaN(res) ? defaultValue : res;
});
_exports.int = intFilter;

// Aliases
_exports.d = _exports.default;
_exports.e = _exports.escape;

var filtersExports = filters$1.exports;

function _inheritsLoose$3(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$3(subClass, superClass); }
function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }
var path$3 = require$$1;
var _require$4 = object,
  EmitterObj$1 = _require$4.EmitterObj;
var loader = /*#__PURE__*/function (_EmitterObj) {
  _inheritsLoose$3(Loader, _EmitterObj);
  function Loader() {
    return _EmitterObj.apply(this, arguments) || this;
  }
  var _proto = Loader.prototype;
  _proto.resolve = function resolve(from, to) {
    return path$3.resolve(path$3.dirname(from), to);
  };
  _proto.isRelative = function isRelative(filename) {
    return filename.indexOf('./') === 0 || filename.indexOf('../') === 0;
  };
  return Loader;
}(EmitterObj$1);

function _inheritsLoose$2(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$2(subClass, superClass); }
function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }
var Loader$2 = loader;
var PrecompiledLoader$2 = /*#__PURE__*/function (_Loader) {
  _inheritsLoose$2(PrecompiledLoader, _Loader);
  function PrecompiledLoader(compiledTemplates) {
    var _this;
    _this = _Loader.call(this) || this;
    _this.precompiled = compiledTemplates || {};
    return _this;
  }
  var _proto = PrecompiledLoader.prototype;
  _proto.getSource = function getSource(name) {
    if (this.precompiled[name]) {
      return {
        src: {
          type: 'code',
          obj: this.precompiled[name]
        },
        path: name
      };
    }
    return null;
  };
  return PrecompiledLoader;
}(Loader$2);
var precompiledLoader = {
  PrecompiledLoader: PrecompiledLoader$2
};

/* eslint-disable no-console */

function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$1(subClass, superClass); }
function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
var fs$1 = require$$0$1;
var path$2 = require$$1;
var Loader$1 = loader;
var _require$3 = precompiledLoader,
  PrecompiledLoader$1 = _require$3.PrecompiledLoader;
var chokidar;
var FileSystemLoader$1 = /*#__PURE__*/function (_Loader) {
  _inheritsLoose$1(FileSystemLoader, _Loader);
  function FileSystemLoader(searchPaths, opts) {
    var _this;
    _this = _Loader.call(this) || this;
    if (typeof opts === 'boolean') {
      console.log('[nunjucks] Warning: you passed a boolean as the second ' + 'argument to FileSystemLoader, but it now takes an options ' + 'object. See http://mozilla.github.io/nunjucks/api.html#filesystemloader');
    }
    opts = opts || {};
    _this.pathsToNames = {};
    _this.noCache = !!opts.noCache;
    if (searchPaths) {
      searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
      // For windows, convert to forward slashes
      _this.searchPaths = searchPaths.map(path$2.normalize);
    } else {
      _this.searchPaths = ['.'];
    }
    if (opts.watch) {
      // Watch all the templates in the paths and fire an event when
      // they change
      try {
        chokidar = require('chokidar'); // eslint-disable-line global-require
      } catch (e) {
        throw new Error('watch requires chokidar to be installed');
      }
      var paths = _this.searchPaths.filter(fs$1.existsSync);
      var watcher = chokidar.watch(paths);
      watcher.on('all', function (event, fullname) {
        fullname = path$2.resolve(fullname);
        if (event === 'change' && fullname in _this.pathsToNames) {
          _this.emit('update', _this.pathsToNames[fullname], fullname);
        }
      });
      watcher.on('error', function (error) {
        console.log('Watcher error: ' + error);
      });
    }
    return _this;
  }
  var _proto = FileSystemLoader.prototype;
  _proto.getSource = function getSource(name) {
    var fullpath = null;
    var paths = this.searchPaths;
    for (var i = 0; i < paths.length; i++) {
      var basePath = path$2.resolve(paths[i]);
      var p = path$2.resolve(paths[i], name);

      // Only allow the current directory and anything
      // underneath it to be searched
      if (p.indexOf(basePath) === 0 && fs$1.existsSync(p)) {
        fullpath = p;
        break;
      }
    }
    if (!fullpath) {
      return null;
    }
    this.pathsToNames[fullpath] = name;
    var source = {
      src: fs$1.readFileSync(fullpath, 'utf-8'),
      path: fullpath,
      noCache: this.noCache
    };
    this.emit('load', name, source);
    return source;
  };
  return FileSystemLoader;
}(Loader$1);
var NodeResolveLoader = /*#__PURE__*/function (_Loader2) {
  _inheritsLoose$1(NodeResolveLoader, _Loader2);
  function NodeResolveLoader(opts) {
    var _this2;
    _this2 = _Loader2.call(this) || this;
    opts = opts || {};
    _this2.pathsToNames = {};
    _this2.noCache = !!opts.noCache;
    if (opts.watch) {
      try {
        chokidar = require('chokidar'); // eslint-disable-line global-require
      } catch (e) {
        throw new Error('watch requires chokidar to be installed');
      }
      _this2.watcher = chokidar.watch();
      _this2.watcher.on('change', function (fullname) {
        _this2.emit('update', _this2.pathsToNames[fullname], fullname);
      });
      _this2.watcher.on('error', function (error) {
        console.log('Watcher error: ' + error);
      });
      _this2.on('load', function (name, source) {
        _this2.watcher.add(source.path);
      });
    }
    return _this2;
  }
  var _proto2 = NodeResolveLoader.prototype;
  _proto2.getSource = function getSource(name) {
    // Don't allow file-system traversal
    if (/^\.?\.?(\/|\\)/.test(name)) {
      return null;
    }
    if (/^[A-Z]:/.test(name)) {
      return null;
    }
    var fullpath;
    try {
      fullpath = require.resolve(name);
    } catch (e) {
      return null;
    }
    this.pathsToNames[fullpath] = name;
    var source = {
      src: fs$1.readFileSync(fullpath, 'utf-8'),
      path: fullpath,
      noCache: this.noCache
    };
    this.emit('load', name, source);
    return source;
  };
  return NodeResolveLoader;
}(Loader$1);
var nodeLoaders = {
  FileSystemLoader: FileSystemLoader$1,
  PrecompiledLoader: PrecompiledLoader$1,
  NodeResolveLoader: NodeResolveLoader
};

// This file will automatically be rewired to web-loader.js when
// building for the browser
var loaders$1 = nodeLoaders;

var tests$1 = {};

(function (exports) {

	var SafeString = runtime$1.SafeString;

	/**
	 * Returns `true` if the object is a function, otherwise `false`.
	 * @param { any } value
	 * @returns { boolean }
	 */
	function callable(value) {
	  return typeof value === 'function';
	}
	exports.callable = callable;

	/**
	 * Returns `true` if the object is strictly not `undefined`.
	 * @param { any } value
	 * @returns { boolean }
	 */
	function defined(value) {
	  return value !== undefined;
	}
	exports.defined = defined;

	/**
	 * Returns `true` if the operand (one) is divisble by the test's argument
	 * (two).
	 * @param { number } one
	 * @param { number } two
	 * @returns { boolean }
	 */
	function divisibleby(one, two) {
	  return one % two === 0;
	}
	exports.divisibleby = divisibleby;

	/**
	 * Returns true if the string has been escaped (i.e., is a SafeString).
	 * @param { any } value
	 * @returns { boolean }
	 */
	function escaped(value) {
	  return value instanceof SafeString;
	}
	exports.escaped = escaped;

	/**
	 * Returns `true` if the arguments are strictly equal.
	 * @param { any } one
	 * @param { any } two
	 */
	function equalto(one, two) {
	  return one === two;
	}
	exports.equalto = equalto;

	// Aliases
	exports.eq = exports.equalto;
	exports.sameas = exports.equalto;

	/**
	 * Returns `true` if the value is evenly divisible by 2.
	 * @param { number } value
	 * @returns { boolean }
	 */
	function even(value) {
	  return value % 2 === 0;
	}
	exports.even = even;

	/**
	 * Returns `true` if the value is falsy - if I recall correctly, '', 0, false,
	 * undefined, NaN or null. I don't know if we should stick to the default JS
	 * behavior or attempt to replicate what Python believes should be falsy (i.e.,
	 * empty arrays, empty dicts, not 0...).
	 * @param { any } value
	 * @returns { boolean }
	 */
	function falsy(value) {
	  return !value;
	}
	exports.falsy = falsy;

	/**
	 * Returns `true` if the operand (one) is greater or equal to the test's
	 * argument (two).
	 * @param { number } one
	 * @param { number } two
	 * @returns { boolean }
	 */
	function ge(one, two) {
	  return one >= two;
	}
	exports.ge = ge;

	/**
	 * Returns `true` if the operand (one) is greater than the test's argument
	 * (two).
	 * @param { number } one
	 * @param { number } two
	 * @returns { boolean }
	 */
	function greaterthan(one, two) {
	  return one > two;
	}
	exports.greaterthan = greaterthan;

	// alias
	exports.gt = exports.greaterthan;

	/**
	 * Returns `true` if the operand (one) is less than or equal to the test's
	 * argument (two).
	 * @param { number } one
	 * @param { number } two
	 * @returns { boolean }
	 */
	function le(one, two) {
	  return one <= two;
	}
	exports.le = le;

	/**
	 * Returns `true` if the operand (one) is less than the test's passed argument
	 * (two).
	 * @param { number } one
	 * @param { number } two
	 * @returns { boolean }
	 */
	function lessthan(one, two) {
	  return one < two;
	}
	exports.lessthan = lessthan;

	// alias
	exports.lt = exports.lessthan;

	/**
	 * Returns `true` if the string is lowercased.
	 * @param { string } value
	 * @returns { boolean }
	 */
	function lower(value) {
	  return value.toLowerCase() === value;
	}
	exports.lower = lower;

	/**
	 * Returns `true` if the operand (one) is less than or equal to the test's
	 * argument (two).
	 * @param { number } one
	 * @param { number } two
	 * @returns { boolean }
	 */
	function ne(one, two) {
	  return one !== two;
	}
	exports.ne = ne;

	/**
	 * Returns true if the value is strictly equal to `null`.
	 * @param { any }
	 * @returns { boolean }
	 */
	function nullTest(value) {
	  return value === null;
	}
	exports.null = nullTest;

	/**
	 * Returns true if value is a number.
	 * @param { any }
	 * @returns { boolean }
	 */
	function number(value) {
	  return typeof value === 'number';
	}
	exports.number = number;

	/**
	 * Returns `true` if the value is *not* evenly divisible by 2.
	 * @param { number } value
	 * @returns { boolean }
	 */
	function odd(value) {
	  return value % 2 === 1;
	}
	exports.odd = odd;

	/**
	 * Returns `true` if the value is a string, `false` if not.
	 * @param { any } value
	 * @returns { boolean }
	 */
	function string(value) {
	  return typeof value === 'string';
	}
	exports.string = string;

	/**
	 * Returns `true` if the value is not in the list of things considered falsy:
	 * '', null, undefined, 0, NaN and false.
	 * @param { any } value
	 * @returns { boolean }
	 */
	function truthy(value) {
	  return !!value;
	}
	exports.truthy = truthy;

	/**
	 * Returns `true` if the value is undefined.
	 * @param { any } value
	 * @returns { boolean }
	 */
	function undefinedTest(value) {
	  return value === undefined;
	}
	exports.undefined = undefinedTest;

	/**
	 * Returns `true` if the string is uppercased.
	 * @param { string } value
	 * @returns { boolean }
	 */
	function upper(value) {
	  return value.toUpperCase() === value;
	}
	exports.upper = upper;

	/**
	 * If ES6 features are available, returns `true` if the value implements the
	 * `Symbol.iterator` method. If not, it's a string or Array.
	 *
	 * Could potentially cause issues if a browser exists that has Set and Map but
	 * not Symbol.
	 *
	 * @param { any } value
	 * @returns { boolean }
	 */
	function iterable(value) {
	  if (typeof Symbol !== 'undefined') {
	    return !!value[Symbol.iterator];
	  } else {
	    return Array.isArray(value) || typeof value === 'string';
	  }
	}
	exports.iterable = iterable;

	/**
	 * If ES6 features are available, returns `true` if the value is an object hash
	 * or an ES6 Map. Otherwise just return if it's an object hash.
	 * @param { any } value
	 * @returns { boolean }
	 */
	function mapping(value) {
	  // only maps and object hashes
	  var bool = value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value);
	  if (Set) {
	    return bool && !(value instanceof Set);
	  } else {
	    return bool;
	  }
	}
	exports.mapping = mapping; 
} (tests$1));

function _cycler(items) {
  var index = -1;
  return {
    current: null,
    reset: function reset() {
      index = -1;
      this.current = null;
    },
    next: function next() {
      index++;
      if (index >= items.length) {
        index = 0;
      }
      this.current = items[index];
      return this.current;
    }
  };
}
function _joiner(sep) {
  sep = sep || ',';
  var first = true;
  return function () {
    var val = first ? '' : sep;
    first = false;
    return val;
  };
}

// Making this a function instead so it returns a new object
// each time it's called. That way, if something like an environment
// uses it, they will each have their own copy.
function globals$1() {
  return {
    range: function range(start, stop, step) {
      if (typeof stop === 'undefined') {
        stop = start;
        start = 0;
        step = 1;
      } else if (!step) {
        step = 1;
      }
      var arr = [];
      if (step > 0) {
        for (var i = start; i < stop; i += step) {
          arr.push(i);
        }
      } else {
        for (var _i = start; _i > stop; _i += step) {
          // eslint-disable-line for-direction
          arr.push(_i);
        }
      }
      return arr;
    },
    cycler: function cycler() {
      return _cycler(Array.prototype.slice.call(arguments));
    },
    joiner: function joiner(sep) {
      return _joiner(sep);
    }
  };
}
var globals_1 = globals$1;

var path$1 = require$$1;
var expressApp$1 = function express(env, app) {
  function NunjucksView(name, opts) {
    this.name = name;
    this.path = name;
    this.defaultEngine = opts.defaultEngine;
    this.ext = path$1.extname(name);
    if (!this.ext && !this.defaultEngine) {
      throw new Error('No default engine was specified and no extension was provided.');
    }
    if (!this.ext) {
      this.name += this.ext = (this.defaultEngine[0] !== '.' ? '.' : '') + this.defaultEngine;
    }
  }
  NunjucksView.prototype.render = function render(opts, cb) {
    env.render(this.name, opts, cb);
  };
  app.set('view', NunjucksView);
  app.set('nunjucksEnv', env);
  return env;
};

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var asap = asap_1;
var _waterfall = aSyncWaterfallExports;
var lib$1 = libExports;
var compiler$2 = compiler$3;
var filters = filtersExports;
var _require$2 = loaders$1,
  FileSystemLoader = _require$2.FileSystemLoader,
  WebLoader = _require$2.WebLoader,
  PrecompiledLoader = _require$2.PrecompiledLoader;
var tests = tests$1;
var globals = globals_1;
var _require2$1 = object,
  Obj = _require2$1.Obj,
  EmitterObj = _require2$1.EmitterObj;
var globalRuntime = runtime$1;
var handleError = globalRuntime.handleError,
  Frame = globalRuntime.Frame;
var expressApp = expressApp$1;

// If the user is using the async API, *always* call it
// asynchronously even if the template was synchronous.
function callbackAsap(cb, err, res) {
  asap(function () {
    cb(err, res);
  });
}

/**
 * A no-op template, for use with {% include ignore missing %}
 */
var noopTmplSrc = {
  type: 'code',
  obj: {
    root: function root(env, context, frame, runtime, cb) {
      try {
        cb(null, '');
      } catch (e) {
        cb(handleError(e, null, null));
      }
    }
  }
};
var Environment$2 = /*#__PURE__*/function (_EmitterObj) {
  _inheritsLoose(Environment, _EmitterObj);
  function Environment() {
    return _EmitterObj.apply(this, arguments) || this;
  }
  var _proto = Environment.prototype;
  _proto.init = function init(loaders, opts) {
    var _this = this;
    // The dev flag determines the trace that'll be shown on errors.
    // If set to true, returns the full trace from the error point,
    // otherwise will return trace starting from Template.render
    // (the full trace from within nunjucks may confuse developers using
    //  the library)
    // defaults to false
    opts = this.opts = opts || {};
    this.opts.dev = !!opts.dev;

    // The autoescape flag sets global autoescaping. If true,
    // every string variable will be escaped by default.
    // If false, strings can be manually escaped using the `escape` filter.
    // defaults to true
    this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;

    // If true, this will make the system throw errors if trying
    // to output a null or undefined value
    this.opts.throwOnUndefined = !!opts.throwOnUndefined;
    this.opts.trimBlocks = !!opts.trimBlocks;
    this.opts.lstripBlocks = !!opts.lstripBlocks;
    this.loaders = [];
    if (!loaders) {
      // The filesystem loader is only available server-side
      if (FileSystemLoader) {
        this.loaders = [new FileSystemLoader('views')];
      } else if (WebLoader) {
        this.loaders = [new WebLoader('/views')];
      }
    } else {
      this.loaders = lib$1.isArray(loaders) ? loaders : [loaders];
    }

    // It's easy to use precompiled templates: just include them
    // before you configure nunjucks and this will automatically
    // pick it up and use it
    if (typeof window !== 'undefined' && window.nunjucksPrecompiled) {
      this.loaders.unshift(new PrecompiledLoader(window.nunjucksPrecompiled));
    }
    this._initLoaders();
    this.globals = globals();
    this.filters = {};
    this.tests = {};
    this.asyncFilters = [];
    this.extensions = {};
    this.extensionsList = [];
    lib$1._entries(filters).forEach(function (_ref) {
      var name = _ref[0],
        filter = _ref[1];
      return _this.addFilter(name, filter);
    });
    lib$1._entries(tests).forEach(function (_ref2) {
      var name = _ref2[0],
        test = _ref2[1];
      return _this.addTest(name, test);
    });
  };
  _proto._initLoaders = function _initLoaders() {
    var _this2 = this;
    this.loaders.forEach(function (loader) {
      // Caching and cache busting
      loader.cache = {};
      if (typeof loader.on === 'function') {
        loader.on('update', function (name, fullname) {
          loader.cache[name] = null;
          _this2.emit('update', name, fullname, loader);
        });
        loader.on('load', function (name, source) {
          _this2.emit('load', name, source, loader);
        });
      }
    });
  };
  _proto.invalidateCache = function invalidateCache() {
    this.loaders.forEach(function (loader) {
      loader.cache = {};
    });
  };
  _proto.addExtension = function addExtension(name, extension) {
    extension.__name = name;
    this.extensions[name] = extension;
    this.extensionsList.push(extension);
    return this;
  };
  _proto.removeExtension = function removeExtension(name) {
    var extension = this.getExtension(name);
    if (!extension) {
      return;
    }
    this.extensionsList = lib$1.without(this.extensionsList, extension);
    delete this.extensions[name];
  };
  _proto.getExtension = function getExtension(name) {
    return this.extensions[name];
  };
  _proto.hasExtension = function hasExtension(name) {
    return !!this.extensions[name];
  };
  _proto.addGlobal = function addGlobal(name, value) {
    this.globals[name] = value;
    return this;
  };
  _proto.getGlobal = function getGlobal(name) {
    if (typeof this.globals[name] === 'undefined') {
      throw new Error('global not found: ' + name);
    }
    return this.globals[name];
  };
  _proto.addFilter = function addFilter(name, func, async) {
    var wrapped = func;
    if (async) {
      this.asyncFilters.push(name);
    }
    this.filters[name] = wrapped;
    return this;
  };
  _proto.getFilter = function getFilter(name) {
    if (!this.filters[name]) {
      throw new Error('filter not found: ' + name);
    }
    return this.filters[name];
  };
  _proto.addTest = function addTest(name, func) {
    this.tests[name] = func;
    return this;
  };
  _proto.getTest = function getTest(name) {
    if (!this.tests[name]) {
      throw new Error('test not found: ' + name);
    }
    return this.tests[name];
  };
  _proto.resolveTemplate = function resolveTemplate(loader, parentName, filename) {
    var isRelative = loader.isRelative && parentName ? loader.isRelative(filename) : false;
    return isRelative && loader.resolve ? loader.resolve(parentName, filename) : filename;
  };
  _proto.getTemplate = function getTemplate(name, eagerCompile, parentName, ignoreMissing, cb) {
    var _this3 = this;
    var that = this;
    var tmpl = null;
    if (name && name.raw) {
      // this fixes autoescape for templates referenced in symbols
      name = name.raw;
    }
    if (lib$1.isFunction(parentName)) {
      cb = parentName;
      parentName = null;
      eagerCompile = eagerCompile || false;
    }
    if (lib$1.isFunction(eagerCompile)) {
      cb = eagerCompile;
      eagerCompile = false;
    }
    if (name instanceof Template$1) {
      tmpl = name;
    } else if (typeof name !== 'string') {
      throw new Error('template names must be a string: ' + name);
    } else {
      for (var i = 0; i < this.loaders.length; i++) {
        var loader = this.loaders[i];
        tmpl = loader.cache[this.resolveTemplate(loader, parentName, name)];
        if (tmpl) {
          break;
        }
      }
    }
    if (tmpl) {
      if (eagerCompile) {
        tmpl.compile();
      }
      if (cb) {
        cb(null, tmpl);
        return undefined;
      } else {
        return tmpl;
      }
    }
    var syncResult;
    var createTemplate = function createTemplate(err, info) {
      if (!info && !err && !ignoreMissing) {
        err = new Error('template not found: ' + name);
      }
      if (err) {
        if (cb) {
          cb(err);
          return;
        } else {
          throw err;
        }
      }
      var newTmpl;
      if (!info) {
        newTmpl = new Template$1(noopTmplSrc, _this3, '', eagerCompile);
      } else {
        newTmpl = new Template$1(info.src, _this3, info.path, eagerCompile);
        if (!info.noCache) {
          info.loader.cache[name] = newTmpl;
        }
      }
      if (cb) {
        cb(null, newTmpl);
      } else {
        syncResult = newTmpl;
      }
    };
    lib$1.asyncIter(this.loaders, function (loader, i, next, done) {
      function handle(err, src) {
        if (err) {
          done(err);
        } else if (src) {
          src.loader = loader;
          done(null, src);
        } else {
          next();
        }
      }

      // Resolve name relative to parentName
      name = that.resolveTemplate(loader, parentName, name);
      if (loader.async) {
        loader.getSource(name, handle);
      } else {
        handle(null, loader.getSource(name));
      }
    }, createTemplate);
    return syncResult;
  };
  _proto.express = function express(app) {
    return expressApp(this, app);
  };
  _proto.render = function render(name, ctx, cb) {
    if (lib$1.isFunction(ctx)) {
      cb = ctx;
      ctx = null;
    }

    // We support a synchronous API to make it easier to migrate
    // existing code to async. This works because if you don't do
    // anything async work, the whole thing is actually run
    // synchronously.
    var syncResult = null;
    this.getTemplate(name, function (err, tmpl) {
      if (err && cb) {
        callbackAsap(cb, err);
      } else if (err) {
        throw err;
      } else {
        syncResult = tmpl.render(ctx, cb);
      }
    });
    return syncResult;
  };
  _proto.renderString = function renderString(src, ctx, opts, cb) {
    if (lib$1.isFunction(opts)) {
      cb = opts;
      opts = {};
    }
    opts = opts || {};
    var tmpl = new Template$1(src, this, opts.path);
    return tmpl.render(ctx, cb);
  };
  _proto.waterfall = function waterfall(tasks, callback, forceAsync) {
    return _waterfall(tasks, callback, forceAsync);
  };
  return Environment;
}(EmitterObj);
var Context = /*#__PURE__*/function (_Obj) {
  _inheritsLoose(Context, _Obj);
  function Context() {
    return _Obj.apply(this, arguments) || this;
  }
  var _proto2 = Context.prototype;
  _proto2.init = function init(ctx, blocks, env) {
    var _this4 = this;
    // Has to be tied to an environment so we can tap into its globals.
    this.env = env || new Environment$2();

    // Make a duplicate of ctx
    this.ctx = lib$1.extend({}, ctx);
    this.blocks = {};
    this.exported = [];
    lib$1.keys(blocks).forEach(function (name) {
      _this4.addBlock(name, blocks[name]);
    });
  };
  _proto2.lookup = function lookup(name) {
    // This is one of the most called functions, so optimize for
    // the typical case where the name isn't in the globals
    if (name in this.env.globals && !(name in this.ctx)) {
      return this.env.globals[name];
    } else {
      return this.ctx[name];
    }
  };
  _proto2.setVariable = function setVariable(name, val) {
    this.ctx[name] = val;
  };
  _proto2.getVariables = function getVariables() {
    return this.ctx;
  };
  _proto2.addBlock = function addBlock(name, block) {
    this.blocks[name] = this.blocks[name] || [];
    this.blocks[name].push(block);
    return this;
  };
  _proto2.getBlock = function getBlock(name) {
    if (!this.blocks[name]) {
      throw new Error('unknown block "' + name + '"');
    }
    return this.blocks[name][0];
  };
  _proto2.getSuper = function getSuper(env, name, block, frame, runtime, cb) {
    var idx = lib$1.indexOf(this.blocks[name] || [], block);
    var blk = this.blocks[name][idx + 1];
    var context = this;
    if (idx === -1 || !blk) {
      throw new Error('no super block available for "' + name + '"');
    }
    blk(env, context, frame, runtime, cb);
  };
  _proto2.addExport = function addExport(name) {
    this.exported.push(name);
  };
  _proto2.getExported = function getExported() {
    var _this5 = this;
    var exported = {};
    this.exported.forEach(function (name) {
      exported[name] = _this5.ctx[name];
    });
    return exported;
  };
  return Context;
}(Obj);
var Template$1 = /*#__PURE__*/function (_Obj2) {
  _inheritsLoose(Template, _Obj2);
  function Template() {
    return _Obj2.apply(this, arguments) || this;
  }
  var _proto3 = Template.prototype;
  _proto3.init = function init(src, env, path, eagerCompile) {
    this.env = env || new Environment$2();
    if (lib$1.isObject(src)) {
      switch (src.type) {
        case 'code':
          this.tmplProps = src.obj;
          break;
        case 'string':
          this.tmplStr = src.obj;
          break;
        default:
          throw new Error("Unexpected template object type " + src.type + "; expected 'code', or 'string'");
      }
    } else if (lib$1.isString(src)) {
      this.tmplStr = src;
    } else {
      throw new Error('src must be a string or an object describing the source');
    }
    this.path = path;
    if (eagerCompile) {
      try {
        this._compile();
      } catch (err) {
        throw lib$1._prettifyError(this.path, this.env.opts.dev, err);
      }
    } else {
      this.compiled = false;
    }
  };
  _proto3.render = function render(ctx, parentFrame, cb) {
    var _this6 = this;
    if (typeof ctx === 'function') {
      cb = ctx;
      ctx = {};
    } else if (typeof parentFrame === 'function') {
      cb = parentFrame;
      parentFrame = null;
    }

    // If there is a parent frame, we are being called from internal
    // code of another template, and the internal system
    // depends on the sync/async nature of the parent template
    // to be inherited, so force an async callback
    var forceAsync = !parentFrame;

    // Catch compile errors for async rendering
    try {
      this.compile();
    } catch (e) {
      var err = lib$1._prettifyError(this.path, this.env.opts.dev, e);
      if (cb) {
        return callbackAsap(cb, err);
      } else {
        throw err;
      }
    }
    var context = new Context(ctx || {}, this.blocks, this.env);
    var frame = parentFrame ? parentFrame.push(true) : new Frame();
    frame.topLevel = true;
    var syncResult = null;
    var didError = false;
    this.rootRenderFunc(this.env, context, frame, globalRuntime, function (err, res) {
      // TODO: this is actually a bug in the compiled template (because waterfall
      // tasks are both not passing errors up the chain of callbacks AND are not
      // causing a return from the top-most render function). But fixing that
      // will require a more substantial change to the compiler.
      if (didError && cb && typeof res !== 'undefined') {
        // prevent multiple calls to cb
        return;
      }
      if (err) {
        err = lib$1._prettifyError(_this6.path, _this6.env.opts.dev, err);
        didError = true;
      }
      if (cb) {
        if (forceAsync) {
          callbackAsap(cb, err, res);
        } else {
          cb(err, res);
        }
      } else {
        if (err) {
          throw err;
        }
        syncResult = res;
      }
    });
    return syncResult;
  };
  _proto3.getExported = function getExported(ctx, parentFrame, cb) {
    // eslint-disable-line consistent-return
    if (typeof ctx === 'function') {
      cb = ctx;
      ctx = {};
    }
    if (typeof parentFrame === 'function') {
      cb = parentFrame;
      parentFrame = null;
    }

    // Catch compile errors for async rendering
    try {
      this.compile();
    } catch (e) {
      if (cb) {
        return cb(e);
      } else {
        throw e;
      }
    }
    var frame = parentFrame ? parentFrame.push() : new Frame();
    frame.topLevel = true;

    // Run the rootRenderFunc to populate the context with exported vars
    var context = new Context(ctx || {}, this.blocks, this.env);
    this.rootRenderFunc(this.env, context, frame, globalRuntime, function (err) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, context.getExported());
      }
    });
  };
  _proto3.compile = function compile() {
    if (!this.compiled) {
      this._compile();
    }
  };
  _proto3._compile = function _compile() {
    var props;
    if (this.tmplProps) {
      props = this.tmplProps;
    } else {
      var source = compiler$2.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts);
      var func = new Function(source); // eslint-disable-line no-new-func
      props = func();
    }
    this.blocks = this._getBlocks(props);
    this.rootRenderFunc = props.root;
    this.compiled = true;
  };
  _proto3._getBlocks = function _getBlocks(props) {
    var blocks = {};
    lib$1.keys(props).forEach(function (k) {
      if (k.slice(0, 2) === 'b_') {
        blocks[k.slice(2)] = props[k];
      }
    });
    return blocks;
  };
  return Template;
}(Obj);
var environment = {
  Environment: Environment$2,
  Template: Template$1
};

function precompileGlobal$1(templates, opts) {
  var out = '';
  opts = opts || {};
  for (var i = 0; i < templates.length; i++) {
    var name = JSON.stringify(templates[i].name);
    var template = templates[i].template;
    out += '(function() {' + '(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})' + '[' + name + '] = (function() {\n' + template + '\n})();\n';
    if (opts.asFunction) {
      out += 'return function(ctx, cb) { return nunjucks.render(' + name + ', ctx, cb); }\n';
    }
    out += '})();\n';
  }
  return out;
}
var precompileGlobal_1 = precompileGlobal$1;

var fs = require$$0$1;
var path = require$$1;
var _require$1 = libExports,
  _prettifyError = _require$1._prettifyError;
var compiler$1 = compiler$3;
var _require2 = environment,
  Environment$1 = _require2.Environment;
var precompileGlobal = precompileGlobal_1;
function match(filename, patterns) {
  if (!Array.isArray(patterns)) {
    return false;
  }
  return patterns.some(function (pattern) {
    return filename.match(pattern);
  });
}
function precompileString(str, opts) {
  opts = opts || {};
  opts.isString = true;
  var env = opts.env || new Environment$1([]);
  var wrapper = opts.wrapper || precompileGlobal;
  if (!opts.name) {
    throw new Error('the "name" option is required when compiling a string');
  }
  return wrapper([_precompile(str, opts.name, env)], opts);
}
function precompile$1(input, opts) {
  // The following options are available:
  //
  // * name: name of the template (auto-generated when compiling a directory)
  // * isString: input is a string, not a file path
  // * asFunction: generate a callable function
  // * force: keep compiling on error
  // * env: the Environment to use (gets extensions and async filters from it)
  // * include: which file/folders to include (folders are auto-included, files are auto-excluded)
  // * exclude: which file/folders to exclude (folders are auto-included, files are auto-excluded)
  // * wrapper: function(templates, opts) {...}
  //       Customize the output format to store the compiled template.
  //       By default, templates are stored in a global variable used by the runtime.
  //       A custom loader will be necessary to load your custom wrapper.

  opts = opts || {};
  var env = opts.env || new Environment$1([]);
  var wrapper = opts.wrapper || precompileGlobal;
  if (opts.isString) {
    return precompileString(input, opts);
  }
  var pathStats = fs.existsSync(input) && fs.statSync(input);
  var precompiled = [];
  var templates = [];
  function addTemplates(dir) {
    fs.readdirSync(dir).forEach(function (file) {
      var filepath = path.join(dir, file);
      var subpath = filepath.substr(path.join(input, '/').length);
      var stat = fs.statSync(filepath);
      if (stat && stat.isDirectory()) {
        subpath += '/';
        if (!match(subpath, opts.exclude)) {
          addTemplates(filepath);
        }
      } else if (match(subpath, opts.include)) {
        templates.push(filepath);
      }
    });
  }
  if (pathStats.isFile()) {
    precompiled.push(_precompile(fs.readFileSync(input, 'utf-8'), opts.name || input, env));
  } else if (pathStats.isDirectory()) {
    addTemplates(input);
    for (var i = 0; i < templates.length; i++) {
      var name = templates[i].replace(path.join(input, '/'), '');
      try {
        precompiled.push(_precompile(fs.readFileSync(templates[i], 'utf-8'), name, env));
      } catch (e) {
        if (opts.force) {
          // Don't stop generating the output if we're
          // forcing compilation.
          console.error(e); // eslint-disable-line no-console
        } else {
          throw e;
        }
      }
    }
  }
  return wrapper(precompiled, opts);
}
function _precompile(str, name, env) {
  env = env || new Environment$1([]);
  var asyncFilters = env.asyncFilters;
  var extensions = env.extensionsList;
  var template;
  name = name.replace(/\\/g, '/');
  try {
    template = compiler$1.compile(str, asyncFilters, extensions, name, env.opts);
  } catch (err) {
    throw _prettifyError(name, false, err);
  }
  return {
    name: name,
    template: template
  };
}
var precompile_1 = {
  precompile: precompile$1,
  precompileString: precompileString
};

function installCompat() {

  /* eslint-disable camelcase */

  // This must be called like `nunjucks.installCompat` so that `this`
  // references the nunjucks instance
  var runtime = this.runtime;
  var lib = this.lib;
  // Handle slim case where these 'modules' are excluded from the built source
  var Compiler = this.compiler.Compiler;
  var Parser = this.parser.Parser;
  var nodes = this.nodes;
  var lexer = this.lexer;
  var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
  var orig_memberLookup = runtime.memberLookup;
  var orig_Compiler_assertType;
  var orig_Parser_parseAggregate;
  if (Compiler) {
    orig_Compiler_assertType = Compiler.prototype.assertType;
  }
  if (Parser) {
    orig_Parser_parseAggregate = Parser.prototype.parseAggregate;
  }
  function uninstall() {
    runtime.contextOrFrameLookup = orig_contextOrFrameLookup;
    runtime.memberLookup = orig_memberLookup;
    if (Compiler) {
      Compiler.prototype.assertType = orig_Compiler_assertType;
    }
    if (Parser) {
      Parser.prototype.parseAggregate = orig_Parser_parseAggregate;
    }
  }
  runtime.contextOrFrameLookup = function contextOrFrameLookup(context, frame, key) {
    var val = orig_contextOrFrameLookup.apply(this, arguments);
    if (val !== undefined) {
      return val;
    }
    switch (key) {
      case 'True':
        return true;
      case 'False':
        return false;
      case 'None':
        return null;
      default:
        return undefined;
    }
  };
  function getTokensState(tokens) {
    return {
      index: tokens.index,
      lineno: tokens.lineno,
      colno: tokens.colno
    };
  }
  if (process.env.BUILD_TYPE !== 'SLIM' && nodes && Compiler && Parser) {
    // i.e., not slim mode
    var Slice = nodes.Node.extend('Slice', {
      fields: ['start', 'stop', 'step'],
      init: function init(lineno, colno, start, stop, step) {
        start = start || new nodes.Literal(lineno, colno, null);
        stop = stop || new nodes.Literal(lineno, colno, null);
        step = step || new nodes.Literal(lineno, colno, 1);
        this.parent(lineno, colno, start, stop, step);
      }
    });
    Compiler.prototype.assertType = function assertType(node) {
      if (node instanceof Slice) {
        return;
      }
      orig_Compiler_assertType.apply(this, arguments);
    };
    Compiler.prototype.compileSlice = function compileSlice(node, frame) {
      this._emit('(');
      this._compileExpression(node.start, frame);
      this._emit('),(');
      this._compileExpression(node.stop, frame);
      this._emit('),(');
      this._compileExpression(node.step, frame);
      this._emit(')');
    };
    Parser.prototype.parseAggregate = function parseAggregate() {
      var _this = this;
      var origState = getTokensState(this.tokens);
      // Set back one accounting for opening bracket/parens
      origState.colno--;
      origState.index--;
      try {
        return orig_Parser_parseAggregate.apply(this);
      } catch (e) {
        var errState = getTokensState(this.tokens);
        var rethrow = function rethrow() {
          lib._assign(_this.tokens, errState);
          return e;
        };

        // Reset to state before original parseAggregate called
        lib._assign(this.tokens, origState);
        this.peeked = false;
        var tok = this.peekToken();
        if (tok.type !== lexer.TOKEN_LEFT_BRACKET) {
          throw rethrow();
        } else {
          this.nextToken();
        }
        var node = new Slice(tok.lineno, tok.colno);

        // If we don't encounter a colon while parsing, this is not a slice,
        // so re-raise the original exception.
        var isSlice = false;
        for (var i = 0; i <= node.fields.length; i++) {
          if (this.skip(lexer.TOKEN_RIGHT_BRACKET)) {
            break;
          }
          if (i === node.fields.length) {
            if (isSlice) {
              this.fail('parseSlice: too many slice components', tok.lineno, tok.colno);
            } else {
              break;
            }
          }
          if (this.skip(lexer.TOKEN_COLON)) {
            isSlice = true;
          } else {
            var field = node.fields[i];
            node[field] = this.parseExpression();
            isSlice = this.skip(lexer.TOKEN_COLON) || isSlice;
          }
        }
        if (!isSlice) {
          throw rethrow();
        }
        return new nodes.Array(tok.lineno, tok.colno, [node]);
      }
    };
  }
  function sliceLookup(obj, start, stop, step) {
    obj = obj || [];
    if (start === null) {
      start = step < 0 ? obj.length - 1 : 0;
    }
    if (stop === null) {
      stop = step < 0 ? -1 : obj.length;
    } else if (stop < 0) {
      stop += obj.length;
    }
    if (start < 0) {
      start += obj.length;
    }
    var results = [];
    for (var i = start;; i += step) {
      if (i < 0 || i > obj.length) {
        break;
      }
      if (step > 0 && i >= stop) {
        break;
      }
      if (step < 0 && i <= stop) {
        break;
      }
      results.push(runtime.memberLookup(obj, i));
    }
    return results;
  }
  function hasOwnProp(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  var ARRAY_MEMBERS = {
    pop: function pop(index) {
      if (index === undefined) {
        return this.pop();
      }
      if (index >= this.length || index < 0) {
        throw new Error('KeyError');
      }
      return this.splice(index, 1);
    },
    append: function append(element) {
      return this.push(element);
    },
    remove: function remove(element) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
          return this.splice(i, 1);
        }
      }
      throw new Error('ValueError');
    },
    count: function count(element) {
      var count = 0;
      for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
          count++;
        }
      }
      return count;
    },
    index: function index(element) {
      var i;
      if ((i = this.indexOf(element)) === -1) {
        throw new Error('ValueError');
      }
      return i;
    },
    find: function find(element) {
      return this.indexOf(element);
    },
    insert: function insert(index, elem) {
      return this.splice(index, 0, elem);
    }
  };
  var OBJECT_MEMBERS = {
    items: function items() {
      return lib._entries(this);
    },
    values: function values() {
      return lib._values(this);
    },
    keys: function keys() {
      return lib.keys(this);
    },
    get: function get(key, def) {
      var output = this[key];
      if (output === undefined) {
        output = def;
      }
      return output;
    },
    has_key: function has_key(key) {
      return hasOwnProp(this, key);
    },
    pop: function pop(key, def) {
      var output = this[key];
      if (output === undefined && def !== undefined) {
        output = def;
      } else if (output === undefined) {
        throw new Error('KeyError');
      } else {
        delete this[key];
      }
      return output;
    },
    popitem: function popitem() {
      var keys = lib.keys(this);
      if (!keys.length) {
        throw new Error('KeyError');
      }
      var k = keys[0];
      var val = this[k];
      delete this[k];
      return [k, val];
    },
    setdefault: function setdefault(key, def) {
      if (def === void 0) {
        def = null;
      }
      if (!(key in this)) {
        this[key] = def;
      }
      return this[key];
    },
    update: function update(kwargs) {
      lib._assign(this, kwargs);
      return null; // Always returns None
    }
  };

  OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
  OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
  OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
  runtime.memberLookup = function memberLookup(obj, val, autoescape) {
    if (arguments.length === 4) {
      return sliceLookup.apply(this, arguments);
    }
    obj = obj || {};

    // If the object is an object, return any of the methods that Python would
    // otherwise provide.
    if (lib.isArray(obj) && hasOwnProp(ARRAY_MEMBERS, val)) {
      return ARRAY_MEMBERS[val].bind(obj);
    }
    if (lib.isObject(obj) && hasOwnProp(OBJECT_MEMBERS, val)) {
      return OBJECT_MEMBERS[val].bind(obj);
    }
    return orig_memberLookup.apply(this, arguments);
  };
  return uninstall;
}
var jinjaCompat = installCompat;

var lib = libExports;
var _require = environment,
  Environment = _require.Environment,
  Template = _require.Template;
var Loader = loader;
var loaders = loaders$1;
var precompile = precompile_1;
var compiler = compiler$3;
var parser = parser$2;
var lexer = lexer$2;
var runtime = runtime$1;
var nodes = nodes$4;
var installJinjaCompat = jinjaCompat;

// A single instance of an environment, since this is so commonly used
var e;
function configure(templatesPath, opts) {
  opts = opts || {};
  if (lib.isObject(templatesPath)) {
    opts = templatesPath;
    templatesPath = null;
  }
  var TemplateLoader;
  if (loaders.FileSystemLoader) {
    TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
      watch: opts.watch,
      noCache: opts.noCache
    });
  } else if (loaders.WebLoader) {
    TemplateLoader = new loaders.WebLoader(templatesPath, {
      useCache: opts.web && opts.web.useCache,
      async: opts.web && opts.web.async
    });
  }
  e = new Environment(TemplateLoader, opts);
  if (opts && opts.express) {
    e.express(opts.express);
  }
  return e;
}
var nunjucks = {
  Environment: Environment,
  Template: Template,
  Loader: Loader,
  FileSystemLoader: loaders.FileSystemLoader,
  NodeResolveLoader: loaders.NodeResolveLoader,
  PrecompiledLoader: loaders.PrecompiledLoader,
  WebLoader: loaders.WebLoader,
  compiler: compiler,
  parser: parser,
  lexer: lexer,
  runtime: runtime,
  lib: lib,
  nodes: nodes,
  installJinjaCompat: installJinjaCompat,
  configure: configure,
  reset: function reset() {
    e = undefined;
  },
  compile: function compile(src, env, path, eagerCompile) {
    if (!e) {
      configure();
    }
    return new Template(src, env, path, eagerCompile);
  },
  render: function render(name, ctx, cb) {
    if (!e) {
      configure();
    }
    return e.render(name, ctx, cb);
  },
  renderString: function renderString(src, ctx, cb) {
    if (!e) {
      configure();
    }
    return e.renderString(src, ctx, cb);
  },
  precompile: precompile ? precompile.precompile : undefined,
  precompileString: precompile ? precompile.precompileString : undefined
};

var index = /*@__PURE__*/index$3.getDefaultExportFromCjs(nunjucks);

var index$1 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: index
}, [nunjucks]);

exports.index = index$1;
//# sourceMappingURL=index-DtuXwkY5.js.map
