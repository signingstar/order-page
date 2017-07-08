"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _home = require("../containers/home");

var _home2 = _interopRequireDefault(_home);

var _image_modal = require("../containers/image_modal");

var _image_modal2 = _interopRequireDefault(_image_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var pathname = _ref.pathname;
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(
        "div",
        { className: "main-section-content" },
        _react2.default.createElement(_reactRouterDom.Route, { path: "/orders/:orderId/preview", component: _home2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: "/order/:usersHash/:orderId/:fileName", component: _image_modal2.default })
      )
    )
  );
};

exports.default = App;