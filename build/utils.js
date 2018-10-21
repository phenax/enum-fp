"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.prop = exports.error = exports.reduceTypeConstructors = exports.EnumToken = void 0;

var _EnumTag = _interopRequireDefault(require("./EnumTag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: Sanitize name to alphanumeric value
// EnumToken :: Object -> EnumToken
var EnumToken = function EnumToken(_ref) {
  var name = _ref.name,
      props = _ref.props;
  return {
    name: name,
    props: props
  };
}; // reduceTypeConstructors :: (EnumType, Array EnumToken) -> Object EnumAction


exports.EnumToken = EnumToken;

var reduceTypeConstructors = function reduceTypeConstructors(Type, subTypes) {
  return subTypes.reduce(function (obj, subtype) {
    return _objectSpread({}, obj, _defineProperty({}, subtype.name, (0, _EnumTag.default)(subtype.name, Type, subtype.props)));
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

var isArray = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

exports.isArray = isArray;