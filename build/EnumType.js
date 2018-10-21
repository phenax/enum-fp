"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// EnumType :: Array String | Object * -> EnumType
var EnumType = function EnumType(enumTokens) {
  var types = (0, _utils.isArray)(enumTokens) ? enumTokens.map(function (name) {
    return (0, _utils.EnumToken)({
      name: name
    });
  }) : Object.keys(enumTokens).map(function (name) {
    return (0, _utils.EnumToken)({
      name: name,
      props: enumTokens[name]
    });
  });
  var self = {
    // types :: Array String
    types: types.map((0, _utils.prop)(['name'])),
    // isValidConstructor :: String -> Boolean
    isValidConstructor: function isValidConstructor(c) {
      return c === '_' || !!self[c];
    },
    // matchToDefault :: Object (...a -> b) -> Array a ~> b
    matchToDefault: function matchToDefault(patternMap) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var defaultAction = patternMap._;
      if (!defaultAction) return (0, _utils.error)('Missing default case _ for match');
      return defaultAction.apply(void 0, _toConsumableArray(args));
    },
    // match :: EnumTagType ~> Object (a -> b) -> b
    match: function match(token, patternMap) {
      if (!token || !token.name) return (0, _utils.error)('Invalid token passed to match');
      var isValidPattern = !!Object.keys(patternMap).filter(self.isValidConstructor).length;
      if (!isValidPattern) return (0, _utils.error)('Invalid constructor in pattern');
      var action = patternMap[token.name];
      var args = token.args || [];
      if (!action) return self.matchToDefault(patternMap, args);
      return action.apply(void 0, _toConsumableArray(args));
    },
    // caseOf :: Object (a -> b) ~> EnumTagType -> b
    caseOf: function caseOf(patternMap) {
      return function (token) {
        return self.match(token, patternMap);
      };
    }
  };
  self = _objectSpread({}, (0, _utils.reduceTypeConstructors)(self, types), self);
  return self;
};

var _default = EnumType;
exports.default = _default;