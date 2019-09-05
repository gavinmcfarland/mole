"use strict";var _lodash=_interopRequireDefault(require("lodash"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function ownKeys(a,b){var c=Object.keys(a);return Object.getOwnPropertySymbols&&c.push.apply(c,Object.getOwnPropertySymbols(a)),b&&(c=c.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var side={top:{_abbr:"t"},right:{_abbr:"r"},bottom:{_abbr:"b"},left:{_abbr:"l"}// Below is a definition list of CSS properties. I'm not sure if this method of writing them is convinient, but it has been useful to learn how to do it this way.
},cSSproperties={border:_objectSpread({},function(){return _lodash["default"].reduce(side,function(a,b,c){return _objectSpread({},a,_defineProperty({},c,_objectSpread({width:null,style:null},"bottom"===c||"top"===c?{left:{radius:null},right:{radius:null}}:{},{color:null})))},{})}(),{collapse:null,color:null,radius:null,image:{outset:null,repeat:null,slice:null,source:null,width:null,spacing:null,style:null},_abbr:"b"}),margin:_objectSpread({},function(){return side}(),{_abbr:"m"}),padding:_objectSpread({},function(){return side}(),{_abbr:"p"}),color:null// The following function creates an object which provides a name, abbreviation and if there is a parent and or any children.
//
// @param name: the name of the property you want to look up or create
// @param properties: a definition of the property you want to use if it does not already exsist
// for eg.
//
// {
// 	font: {
// 		style: { _abbr: 's'}
// 		_abbr: 'f'
// 	}
// }
/**
 * Look up the definition of a property
 * @memberof Mole.Peripherals
 * @param {String} name The nameThe name of the property you want to look up, or create
 * @param {Object} definition An outline of the property, or properties you want to retrieve a definition for.
 * @example
 * {
 * 	name: 'padding',
 * 	abbr: 'p',
 * 	children: [
 * 		{ name: 'top', abbr: 't', parent: 'padding' },
 * 		{ name: 'right', abbr: 'r', parent: 'padding' },
 * 		{ name: 'bottom', abbr: 'b', parent: 'padding' },
 * 		{ name: 'left', abbr: 'l', parent: 'padding' }
 * 	]
 * }
 */};function def(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:cSSproperties,c={name:"",abbr:null,children:[]};return _lodash["default"].each(b,function(b,d){d===a&&(c.name=d,_lodash["default"].each(b,function(a,b){"_abbr"===b?"_abbr"==b&&(c.abbr=a):c.children.push(_objectSpread({name:b},null===a?{}:{abbr:a._abbr},{parent:d}))}))}),c}