"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _album_list = require("../../containers/order_page/album_list");

var _album_list2 = _interopRequireDefault(_album_list);

var _preview = require("../../containers/order_page/preview");

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewOrder = function ViewOrder(_ref) {
  var order = _ref.order,
      customer = _ref.customer,
      albums = _ref.albums;
  var cust_name = customer.cust_name,
      email = customer.email,
      phone_number = customer.phone_number;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "h1",
      null,
      "#",
      order.id,
      ": ",
      order.name ? order.name : order.product.value
    ),
    _react2.default.createElement(_preview2.default, null),
    _react2.default.createElement(
      "div",
      { className: "inner-section customer row" },
      _react2.default.createElement(
        "h3",
        null,
        " Customer Details ",
        _react2.default.createElement("span", null)
      ),
      _react2.default.createElement(
        "div",
        { className: "customer-info" },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("span", { className: "glyphicon glyphicon-user icon" }),
          _react2.default.createElement(
            "span",
            { className: "value" },
            cust_name
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("span", { className: "glyphicon glyphicon-envelope icon" }),
          _react2.default.createElement(
            "span",
            { className: "value" },
            email
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("span", { className: "glyphicon glyphicon-phone icon" }),
          _react2.default.createElement(
            "span",
            { className: "value" },
            phone_number
          )
        )
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "inner-section album-details row" },
      _react2.default.createElement(
        "h3",
        null,
        " Album Details ",
        _react2.default.createElement(
          "span",
          null,
          _react2.default.createElement(
            _Link2.default,
            { to: "/order/process" },
            "Edit"
          )
        )
      ),
      _react2.default.createElement(_album_list2.default, null)
    )
  );
};

exports.default = ViewOrder;
//# sourceMappingURL=order_view.js.map