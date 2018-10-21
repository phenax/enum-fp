"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EnumTag = void 0;

// type EnumAction = ...a -> EnumTagType
var checkType = function checkType(props, args) {
  return !props ? true : props.length === args.length;
}; // EnumTag :: (String, EnumType, ?Array String) -> ...a -> EnumTagType


var EnumTag = function EnumTag(name, Type, props) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!checkType(props, args)) throw new TypeError("Invalid number of arguments passed to constructor ".concat(name));
    var self = {
      // args :: Array *
      args: args,
      // name :: String
      name: name,
      // props :: ?Array String
      props: props,
      // is :: String | EnumTagType | EnumToken ~> Boolean
      is: function is(otherType) {
        return [otherType, otherType.name].indexOf(name) !== -1;
      }
    };

    self.match = function (pattern) {
      return Type.match(self, pattern);
    };

    return self;
  };
};

exports.EnumTag = EnumTag;
var _default = EnumTag;
exports.default = _default;