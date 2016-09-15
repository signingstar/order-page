"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("core-js/shim");

var _redux = require("redux");

var _reactRouterRedux = require("react-router-redux");

var _selection_state = require("./selection_state");

var _selection_state2 = _interopRequireDefault(_selection_state);

var _category_state = require("./category_state");

var _category_state2 = _interopRequireDefault(_category_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderApp = (0, _redux.combineReducers)({
  categoryState: _category_state2.default,
  selectionState: _selection_state2.default,
  routing: _reactRouterRedux.routerReducer
});

exports.default = orderApp;