"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderPanel = function HeaderPanel(_ref) {
  var order = _ref.order;
  return _react2.default.createElement(
    "div",
    { className: "top-panel" },
    _react2.default.createElement(
      "h1",
      null,
      order.productLabel
    ),
    _react2.default.createElement(
      "div",
      null,
      "Photographer: ",
      order.photographer
    ),
    _react2.default.createElement(
      "div",
      null,
      "Status: ",
      order.orderstatus
    )
  );
};

exports.default = HeaderPanel;
//# sourceMappingURL=header_panel.js.map