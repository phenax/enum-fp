"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EnumType = _interopRequireDefault(require("./EnumType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _EnumType.default;
/*

TODO: Allow passing object instead of array
TODO: Add specify predicate to validate value

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