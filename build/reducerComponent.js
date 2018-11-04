"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.reducerComponent = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// type State = Object *;
// type Reducer = EnumTagType -> (State | State -> State);
// type Config = { state :: State, reducer :: Reducer };
// reducerComponent :: Config -> React.Component -> React.Component
var reducerComponent = function reducerComponent(reducer, state) {
  return function (Component) {
    var ReducerComponent =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(ReducerComponent, _React$Component);

      function ReducerComponent() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, ReducerComponent);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ReducerComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", _objectSpread({}, state));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "dispatch", function (action) {
          return _this.setState(reducer(action));
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
          return _react.default.createElement(Component, _objectSpread({}, _this.props, {
            dispatch: _this.dispatch,
            state: _this.state
          }));
        });

        return _this;
      }

      return ReducerComponent;
    }(_react.default.Component);

    ReducerComponent.displayName = "ReducerComponent(".concat(Component.displayName || Component.name || 'Unknown', ")");
    return ReducerComponent;
  };
};

exports.reducerComponent = reducerComponent;
var _default = reducerComponent;
exports.default = _default;