"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.createConstructor=void 0;var _Type=require("./Type");// type TypeConstructor = ...a -> EnumTagType
var validate=function validate(props,args){return props.length===args.length&&(0,_Type.validateArgs)(props,args)};// createConstructor :: (Enum, ConstructorDescription) -> TypeConstructor
var createConstructor=function createConstructor(Type,_ref){var name=_ref.name,props=_ref.props;return function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}if(props?!validate(props,args):false)throw new TypeError("Invalid number of args passed to constructor ".concat(name));var self={// args :: Array *
args:args,// name :: String
name:name,// props :: ?Array String
props:props,// is :: String | EnumTagType | ConstructorDescription ~> Boolean
is:function is(otherType){return[otherType,otherType.name].indexOf(name)!==-1},// match :: Object (* -> b) ~> b
match:function match(pattern){return Type.match(self,pattern)}};return self}};exports.createConstructor=createConstructor;var _default=createConstructor;exports.default=_default;