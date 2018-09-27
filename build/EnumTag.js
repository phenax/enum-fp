"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EnumTag = void 0;

// type EnumAction = ...a -> EnumTagType
var checkType = function checkType(props, args) {
  return !props ? true : props.length === args.length;
}; // EnumTag :: String -> ?Array String -> ...a -> EnumTagType


var EnumTag = function EnumTag(name, props) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!checkType(props, args)) {
      throw new Error("Constructor ".concat(name, " expected ").concat(props.length, " arguments, ").concat(args.length, " passed"));
    }

    return {
      // args :: Array *
      args: args,
      // name :: String
      name: name,
      // props :: ?Array String
      props: props,
      // is :: String | EnumTagType | EnumToken ~> Boolean
      is: function is(otherType) {
        return typeof otherType === 'string' ? name === otherType : name === otherType.name;
      }
    };
  };
};

exports.EnumTag = EnumTag;
var _default = EnumTag;
exports.default = _default;