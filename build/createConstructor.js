"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.createConstructor=void 0;// type TypeConstructor = ...a -> EnumTagType
// validateArguments :: (?Array String, [a]) -> Boolean
var validateArguments=function validateArguments(props,args){return!props?true:props.length===args.length};// createConstructor :: (String, Enum, ?Array String) -> TypeConstructor
var createConstructor=function createConstructor(name,Type,props){return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}if(!validateArguments(props,args))throw new TypeError("Invalid number of arguments passed to constructor ".concat(name));var self={// args :: Array *
args:args,// name :: String
name:name,// props :: ?Array String
props:props,// is :: String | EnumTagType | ConstructorDescription ~> Boolean
is:function is(otherType){return[otherType,otherType.name].indexOf(name)!==-1}};// match :: Object (* -> b) ~> b
self.match=function(pattern){return Type.match(self,pattern)};return self}};exports.createConstructor=createConstructor;var _default=createConstructor;exports.default=_default;