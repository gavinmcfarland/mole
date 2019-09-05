"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}// array
function arr(a){return a&&"object"===_typeof(a)&&a.constructor===Array}// bad
function bad(a){return nll(a)||undef(a)||empty(a)||err(a)}// boolean
function bool(a){return"boolean"==typeof a}// empty
function empty(a){return str(a)&&""===a||arr(a)&&0===a.length||obj(a)&&0===Object.keys(a).length}// date
function date(a){return a instanceof Date}// error
function err(a){return a instanceof Error&&"undefined"!=typeof a.message}// json
function json(a){try{return JSON.parse(a),!0}catch(a){return!1}}// function
function fn(a){return"function"==typeof a}// integer
function inte(a){return"number"==typeof a&&isFinite(a)&&Number.isInteger(a)}// null
function nll(a){return null==a}// null or undefined
function noru(a){return null==a||"undefined"==typeof a}// number
function num(a){return"number"==typeof a&&isFinite(a)}// object
function obj(a){return a&&"object"===_typeof(a)&&a.constructor===Object}// promise
function prom(a){return!!a&&("object"===_typeof(a)||"function"==typeof a)&&"function"==typeof a.then}// regex
function regex(a){return a&&"object"===_typeof(a)&&a.constructor===RegExp}// string
function str(a){return"string"==typeof a||a instanceof String}// symbol
function sym(a){return"symbol"===_typeof(a)}// undefined
function undef(a){return a===void 0||"undefined"==typeof a}function path(a){return /\/|\./im.test(a)}function dir(a){return /^\.?\/?(\w+\/)+/im.test(a)}function file(a){return /\/\w+$|\w+\.\w+$/im.test(a)}// if type of $value is true, $fn1() else $fn2()
function typa(a,b,c,d){if(!noru(a)&&!noru(b)&&!noru(c)&&!noru(d))return is[a](b)?c:d;throw new Error("Invalid parameters.")}// return type(s) of $value
function what(a){var b=[];if([{fn:"arr",name:"array"},{fn:"bool",name:"boolean"},{fn:"date",name:"date"},{fn:"err",name:"error"},{fn:"fn",name:"function"},{fn:"inte",name:"integer"},{fn:"json",name:"json"},{fn:"nll",name:"null"},{fn:"num",name:"number"},{fn:"obj",name:"object"},{fn:"file",name:"file"},{fn:"dir",name:"dir"},{fn:"path",name:"path"},{fn:"prom",name:"promise"},{fn:"regex",name:"regexp"},{fn:"str",name:"string"},{fn:"sym",name:"symbol"},{fn:"undef",name:"undefined"}].forEach(function(c){is[c.fn](a)&&b.push(c.name)}),is.noru(a))throw new Error("Missing value to test.");return b[0]}var is={arr:arr,bad:bad,bool:bool,date:date,empty:empty,err:err,fn:fn,inte:inte,json:json,nll:nll,noru:noru,num:num,obj:obj,file:file,dir:dir,path:path,prom:prom,regex:regex,str:str,sym:sym,typa:typa,undef:undef,what:what},_default=is;exports["default"]=_default,module.exports=exports.default;