"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _category_item = require("../../components/category_item");

var _category_item2 = _interopRequireDefault(_category_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubCategories = function SubCategories(_ref) {
  var label = _ref.label;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      _reactRouter.Link,
      { to: "/order/flyers-short", className: "item-box" },
      _react2.default.createElement(_category_item2.default, { imgSrc: "/assets/round1.png", label: "Short", categoryClass: "sub-category" })
    ),
    _react2.default.createElement(
      _reactRouter.Link,
      { to: "/order/flyers-short", className: "item-box" },
      _react2.default.createElement(_category_item2.default, { imgSrc: "/assets/round2.png", label: "Medium", categoryClass: "sub-category" })
    ),
    _react2.default.createElement(
      _reactRouter.Link,
      { to: "/order/flyers-short", className: "item-box" },
      _react2.default.createElement(_category_item2.default, { imgSrc: "/assets/round3.png", label: "Large", categoryClass: "sub-category" })
    )
  );
};

exports.default = SubCategories;