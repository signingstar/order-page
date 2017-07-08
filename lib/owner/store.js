"use strict";

exports.__esModule = true;

var _redux = require("redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = function configureStore(initialState) {
  var orderStore = (0, _redux.createStore)(_reducers2.default, initialState);

  return orderStore;
};

exports.default = configureStore;