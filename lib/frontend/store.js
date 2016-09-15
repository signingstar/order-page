"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reactRouterRedux = require("react-router-redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = function configureStore(history, initialState) {
  var orderStore = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)((0, _reactRouterRedux.routerMiddleware)(history))));

  return orderStore;
};

exports.default = configureStore;