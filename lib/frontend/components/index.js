"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _reactRouterRedux = require("react-router-redux");

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _routes = require("../routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preloadedState = window.__PRELOADED_STATE__;

var sessionStoreStr = sessionStorage.getItem('orderApp');
if ((!preloadedState || Object.keys(preloadedState.selectionState).length < 3) && sessionStoreStr) {
  var sessionStore = JSON.parse(sessionStoreStr);
  preloadedState = preloadedState.categoryState.category ? sessionStore : preloadedState;
}

var rootElem = document.getElementById('main-contents');
var store = (0, _store2.default)(_reactRouter.browserHistory, preloadedState);
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

var renderDom = function renderDom() {
  return (0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_reactRouter.Router, { routes: _routes2.default, history: history })
  ), rootElem);
};

renderDom();
store.subscribe(renderDom);