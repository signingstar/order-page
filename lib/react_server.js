"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _store = require("./frontend/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactComponent = function ReactComponent(renderProps, history) {
  var pathname = renderProps.location.pathname;

  var orderPath = /^\/order[\/]?([a-z]+)\-?([a-z0-9\-]*)$/;
  pathname.match(orderPath);

  var category = RegExp.$1;
  var subCategory = RegExp.$2;

  //TODO Add validation
  var initialPayload = { categoryState: { category: category, subCategory: subCategory } };

  // Create a new Redux store instance
  var store = (0, _store2.default)(history, initialPayload);

  // Render the component to a string
  var reactHTML = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_reactRouter.RouterContext, renderProps)
  ));

  // Grab the initial state from our Redux store
  var preloadedState = store.getState();

  return { reactHTML: reactHTML, preloadedState: preloadedState };
};

exports.default = ReactComponent;