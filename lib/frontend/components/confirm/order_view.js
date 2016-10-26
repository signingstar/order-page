"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewOrder = function ViewOrder(_ref) {
  var order = _ref.order;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "h1",
      null,
      "Order Name: ",
      order.name
    ),
    _react2.default.createElement(
      _Link2.default,
      { to: "/order" },
      "Edit"
    )
  );
};

exports.default = ViewOrder;
//# sourceMappingURL=order_view.js.map