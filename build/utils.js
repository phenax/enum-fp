"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeSumType = exports.matchToDefault = exports.isArray = exports.prop = exports.reduceTypeConstructors = exports.ConstructorDescription = void 0;

var _createConstructor = _interopRequireDefault(require("./createConstructor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: Sanitize name to alphanumeric value
// ConstructorDescription :: Object -> ConstructorDescription
var ConstructorDescription = function ConstructorDescription(_ref) {
  var name = _ref.name,
      props = _ref.props;
  return {
    name: name,
    props: props
  };
}; // reduceTypeConstructors :: (Enum, Array ConstructorDescription) -> Object EnumAction


exports.ConstructorDescription = ConstructorDescription;

var reduceTypeConstructors = function reduceTypeConstructors(Type, subTypes) {
  return subTypes.reduce(function (obj, subtype) {
    return _objectSpread({}, obj, _defineProperty({}, subtype.name, (0, _createConstructor.default)(subtype.name, Type, subtype.props)));
  }, {});
}; // prop :: Array -> Object


exports.reduceTypeConstructors = reduceTypeConstructors;

var prop = function prop(_ref2, defaultVal) {
  var _ref3 = _toArray(_ref2),
      key = _ref3[0],
      path = _ref3.slice(1);

  return function (obj) {
    return (obj || {}).hasOwnProperty(key) ? path.length ? prop(path, defaultVal)(obj[key]) : obj[key] : defaultVal;
  };
}; // isArray :: * -> Boolean


exports.prop = prop;

var isArray = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}; // matchToDefault :: Object (...a -> b) -> [a] -> b


exports.isArray = isArray;

var matchToDefault = function matchToDefault(patternMap, args) {
  var defaultAction = patternMap._;
  if (!defaultAction) throw new Error('Missing default case _ for match');
  return defaultAction.apply(void 0, _toConsumableArray(args));
}; // normalizeSumType :: Array String | Object [a] -> ConstructorDescription


exports.matchToDefault = matchToDefault;

var normalizeSumType = function normalizeSumType(sumType) {
  return isArray(sumType) ? sumType.map(function (name) {
    return ConstructorDescription({
      name: name
    });
  }) : Object.keys(sumType).map(function (name) {
    return ConstructorDescription({
      name: name,
      props: sumType[name]
    });
  });
};

exports.normalizeSumType = normalizeSumType;