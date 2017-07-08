"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _BrowserRouter = require("react-router-dom/BrowserRouter");

var _BrowserRouter2 = _interopRequireDefault(_BrowserRouter);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preloadedState = window.__PRELOADED_STATE__;
var store = (0, _store2.default)(preloadedState);
var rootElem = document.getElementById('main-contents');

var renderDom = function renderDom() {
  (0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _BrowserRouter2.default,
      null,
      function (_ref) {
        var router = _ref.router;
        return _react2.default.createElement(_app2.default, null);
      }
    )
  ), rootElem);
};

renderDom();
store.subscribe(renderDom);