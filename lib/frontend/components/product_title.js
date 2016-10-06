"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChangeProduct = function ChangeProduct(_ref) {
  var pathname = _ref.pathname;
  var label = _ref.label;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "h2",
      { className: "product-title" },
      "Selected Product: ",
      label
    ),
    _react2.default.createElement(
      _Link2.default,
      { to: {
          pathname: pathname + "/products",
          state: { type: 'select' }
        } },
      "Change"
    )
  );
};

exports.default = ChangeProduct;
//# sourceMappingURL=product_title.js.map