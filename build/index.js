"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EnumType = void 0;

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// type Config = Array | Object *
// EnumType :: Config -> EnumType
var EnumType = function EnumType(enumTokens) {
  // TODO: Allow passing object instead of array
  var types = enumTokens.map(function (name) {
    return (0, _utils.EnumToken)({
      name: name
    });
  });

  var self = _objectSpread({}, (0, _utils.reduceTypeConstructors)(types), {
    // types :: Array String
    types: types.map((0, _utils.prop)(['name'])),
    matchToDefault: function matchToDefault(patternMap) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var defaultAction = patternMap._;
      if (!defaultAction) return (0, _utils.error)('Missing default case _ for match');
      return defaultAction.apply(void 0, _toConsumableArray(args));
    },
    // match :: EnumTag ~> Object (a -> b) -> b
    match: function match(token, patternMap) {
      if (!token) return (0, _utils.error)('Invalid token passed to match');
      if (!token.name) return (0, _utils.error)('Invalid token passed to match');
      var action = patternMap[token.name];
      var args = token.args || [];
      if (!action) return self.matchToDefault(patternMap, args);
      return action.apply(void 0, _toConsumableArray(args));
    },
    // caseOf :: Object (a -> b) ~> EnumTag -> b
    caseOf: function caseOf(patternMap) {
      return function (token) {
        return self.match(token, patternMap);
      };
    }
  });

  return self;
};

exports.EnumType = EnumType;
var _default = EnumType;
/*

// -- Ideas

TODO: Add specify predicate to validate value as well

EnumType({
    Add: message => typeof message === 'string',
});

OR

EnumType({
    Add: [ 'string' ],
});

OR

EnumType({
    Add: {
        Todo: todo => todo && typeof todo.name === 'string',
        NewTodo: name => typeof name === 'string',
    },
})
*/

exports.default = _default;