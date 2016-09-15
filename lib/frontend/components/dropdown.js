"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDropdown = require("react-dropdown");

var _reactDropdown2 = _interopRequireDefault(_reactDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectBox = function SelectBox(_ref) {
  var onClick = _ref.onClick;
  var state = _ref.state;
  var label = state.label;
  var selected = state.selected;
  var optionButtonNodes = state.optionButtonNodes;
  var placeholder = state.placeholder;


  return _react2.default.createElement(
    "div",
    { className: "inner-section", id: "print-others" },
    _react2.default.createElement(
      "label",
      null,
      label
    ),
    _react2.default.createElement(_reactDropdown2.default, {
      options: optionButtonNodes,
      onChange: onClick,
      value: selected,
      placeholder: placeholder })
  );
};

exports.default = SelectBox;