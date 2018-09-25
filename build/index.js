"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EnumType = exports.EnumTag = void 0;

var _utils = require("./utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var EnumTag = function EnumTag(name) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    args: args,
    name: name,
    is: function is(otherType) {
      return name === otherType;
    }
  };
};

exports.EnumTag = EnumTag;

var EnumType = function EnumType(unionMap) {
  // TODO: Allow passing object instead of array
  var types = _toConsumableArray(unionMap);

  var self = _objectSpread({}, (0, _utils.reduceTypeConstructors)(types), {
    types: (0, _utils.reduceTypeNames)(types),
    match: function match(action, patternMap) {
      if (!action.name) return (0, _utils.error)('Invalid action passed to match'); // TODO: Add check to check if all cases are covered in pattern

      var actor = patternMap[action.name],
          defaultActor = patternMap._;
      var args = action.args || [];

      var fn = actor || defaultActor || function () {
        return (0, _utils.error)('Missing default case _');
      };

      return fn.apply(void 0, _toConsumableArray(args));
    },
    caseOf: function caseOf(patternMap) {
      return function (action) {
        return self.match(action, patternMap);
      };
    }
  });

  return self;
};

exports.EnumType = EnumType;
var _default = EnumType;
/*

// -- Use

const Action = EnumType([ 'Add', 'Delete', 'Edit' ]);

const actn = Action.Add('Hello world');

Action.match(actn, {
    Add: name => `Adding ${name}`,
    Delete: () => 'Deleteing',
    _: () => 'Default case',
});

*/

/*

// -- Ideas

TODO: Add specify predicate to validate value as well
EnumType({
    Add: todo => todo && typeof todo.name === 'string',
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