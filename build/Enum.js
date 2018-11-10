<<<<<<< HEAD
"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _utils=require("./utils");var _commonUtils=require("./common-utils");function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))}ownKeys.forEach(function(key){_defineProperty(target,key,source[key])})}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}// type Pattern = Object (a -> b);
// (constructor)
// Enum :: Array String | Object * -> Enum
var Enum=function Enum(sumTypeBody){var constructors=(0,_utils.normalizeSumType)(sumTypeBody);var types=constructors.map((0,_utils.prop)(["name"]));// isConstructor :: String ~> Boolean
var isConstructor=(0,_commonUtils.isConstructor)(types);// isPatternKey :: String -> Boolean
var isPatternKey=function isPatternKey(c){return c==="_"||isConstructor(c)};// isValidPattern :: Pattern -> Boolean
var isValidPattern=function isValidPattern(p){return!!Object.keys(p).filter(isPatternKey).length};// cata :: Pattern ~> EnumTagType -> b
var cata=function cata(pattern){return function(instance){if(!instance||!instance.name)throw new Error("Invalid instance passed to match");if(!isValidPattern(pattern))throw new Error("Invalid constructor name in pattern");return(0,_commonUtils.matchPattern)(instance,pattern)}};var self={// match :: EnumTagType ~> Pattern -> b
match:function match(instance,pattern){return cata(pattern)(instance)},cata:cata,caseOf:cata,reduce:cata,isConstructor:isConstructor};return _objectSpread({},(0,_utils.reduceTypeConstructors)(self,constructors),self)};var _default=Enum;exports.default=_default;
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _utils=require("./utils");function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))}ownKeys.forEach(function(key){_defineProperty(target,key,source[key])})}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}// type Pattern = Object (a -> b);
// (constructor)
// Enum :: Array String | Object * -> Enum
var Enum=function Enum(sumTypeBody){var constructors=(0,_utils.normalizeSumType)(sumTypeBody);var types=constructors.map((0,_utils.prop)(["name"]));// isConstructor :: String ~> Boolean
var isConstructor=function isConstructor(c){return types.indexOf(c)!==-1||types.indexOf(c.name)!==-1};// cata :: Pattern ~> EnumTagType -> b
var cata=function cata(pattern){return function(instance){return(0,_utils.match)(instance,pattern)}};var self={match:_utils.match,cata:cata,caseOf:cata,reduce:cata,isConstructor:isConstructor};return _objectSpread({},(0,_utils.reduceTypeConstructors)(self,constructors),self)};var _default=Enum;exports.default=_default;
>>>>>>> 5556161effd4458582b2aa15c5c966449374e653
