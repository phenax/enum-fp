"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _default = function _default(reducer, initialState) {
  return (0, _react.useReducer)(function (state, action) {
    return reducer(action)(state);
  }, initialState);
};

exports.default = _default;