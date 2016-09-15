"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _main_contents = require("./components/main_contents");

var _main_contents2 = _interopRequireDefault(_main_contents);

var _categories = require("./components/categories");

var _categories2 = _interopRequireDefault(_categories);

var _main = require("./print_types/stationary/main");

var _main2 = _interopRequireDefault(_main);

var _main3 = require("./print_types/visiting_card/main");

var _main4 = _interopRequireDefault(_main3);

var _main5 = require("./print_types/broucher/main");

var _main6 = _interopRequireDefault(_main5);

var _main7 = require("./print_types/flyers/main");

var _main8 = _interopRequireDefault(_main7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(
  _reactRouter.Route,
  { path: "/order", component: _main_contents2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _categories2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: "/order/envelope", component: _main2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: "/order/letterhead", component: _main2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: "/order/notebook", component: _main2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: "/order/visitingcard", component: _main4.default }),
  _react2.default.createElement(_reactRouter.Route, { path: "/order/broucher", component: _main6.default }),
  _react2.default.createElement(_reactRouter.Route, { path: "/order/flyers-*", component: _main8.default })
);

exports.default = routes;