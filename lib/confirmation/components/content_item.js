"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContentItem = function ContentItem(_ref) {
  var label = _ref.label;
  var value = _ref.value;

  return _react2.default.createElement(
    "li",
    null,
    _react2.default.createElement(
      "span",
      { className: "label" },
      label,
      ":"
    ),
    _react2.default.createElement(
      "span",
      null,
      value
    )
  );
};

exports.default = ContentItem;