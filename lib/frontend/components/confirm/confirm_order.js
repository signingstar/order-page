"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _album_list = require("../../containers/confirm/album_list");

var _album_list2 = _interopRequireDefault(_album_list);

var _image_selection_criteria = require("../../containers/confirm/image_selection_criteria");

var _image_selection_criteria2 = _interopRequireDefault(_image_selection_criteria);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfirmOrderComponent = function ConfirmOrderComponent(_ref) {
  var pathname = _ref.pathname;
  var onClick = _ref.onClick;
  var orderName = _ref.orderName;
  var handleChange = _ref.handleChange;
  return _react2.default.createElement(
    "div",
    { className: "main-section-body" },
    _react2.default.createElement(
      "h1",
      null,
      "Order Confirmation"
    ),
    _react2.default.createElement(
      "div",
      { className: "fields row" },
      _react2.default.createElement(
        "div",
        { className: "large-field required" },
        _react2.default.createElement(
          "label",
          { htmlFor: "orderName" },
          "Order Name"
        ),
        _react2.default.createElement("input", { type: "text", defaultValue: orderName, onChange: handleChange })
      )
    ),
    _react2.default.createElement(_album_list2.default, null),
    _react2.default.createElement(_image_selection_criteria2.default, null),
    _react2.default.createElement(
      "div",
      { className: "fields" },
      _react2.default.createElement(
        "div",
        { className: "action-section" },
        _react2.default.createElement(
          "div",
          { className: "nav-page row" },
          _react2.default.createElement(
            "div",
            { className: "button back" },
            _react2.default.createElement(
              _Link2.default,
              { to: "/order/process", replace: true, className: "submit-button" },
              "Back"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "button next" },
            _react2.default.createElement("input", { type: "button", onClick: onClick, value: "Confirm" })
          )
        )
      )
    )
  );
};

exports.default = ConfirmOrderComponent;
//# sourceMappingURL=confirm_order.js.map