"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prop = exports.error = exports.reduceTypeConstructors = exports.EnumTag = exports.EnumToken = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: Sanitize name to alphanumeric value
// EnumToken :: Options -> EnumTag
var EnumToken = function EnumToken(_ref) {
  var name = _ref.name;
  return {
    name: name
  };
}; // EnumTag :: String -> (...*) -> EnumTag


exports.EnumToken = EnumToken;

var EnumTag = function EnumTag(name) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return {
      args: args,
      name: name,
      is: function is(otherType) {
        return name === otherType.name;
      }
    };
  };
}; // reduceTypeConstructors :: Array EnumToken -> Object EnumTag


exports.EnumTag = EnumTag;

var reduceTypeConstructors = function reduceTypeConstructors(types) {
  return types.reduce(function (o, type) {
    return _objectSpread({}, o, _defineProperty({}, type.name, EnumTag(type.name)));
  }, {});
}; // error :: String -> ()


exports.reduceTypeConstructors = reduceTypeConstructors;

var error = function error(msg) {
  throw new Error(msg);
}; // prop :: Array -> Object


exports.error = error;

var prop = function prop(path) {
  return function (obj) {
    return path.reduce(function (o, key) {
      return _objectSpread({}, o, _defineProperty({}, key, o[key]));
    }, obj);
  };
};

exports.prop = prop;