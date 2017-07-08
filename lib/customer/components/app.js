"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _home = require("../containers/home");

var _home2 = _interopRequireDefault(_home);

var _image_modal = require("../containers/image_modal");

var _image_modal2 = _interopRequireDefault(_image_modal);

var _finalized_order = require("../containers/finalized_order");

var _finalized_order2 = _interopRequireDefault(_finalized_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
        _react2.default.createElement(_reactRouterDom.Route, { path: "/order/:usersHash/:orderId", component: _home2.default }),
        _react2.default.createElement(MatchImage, { path: "/order/:usersHash/:orderId/:fileName", component: _image_modal2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/order/finalize", component: _finalized_order2.default })
      )
    )
  );
};

var MatchImage = function MatchImage(_ref2) {
  var Component = _ref2.component,
      rest = _objectWithoutProperties(_ref2, ["component"]);

  return _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, {
    render: function render(matchProps) {
      var imageId = matchProps.params.fileName;

      return imageId.Route(/^[a-z0-9]{32}$/) ? _react2.default.createElement(Component, matchProps) : null;
    }
  }));
};

exports.default = App;