"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _category_item = require("./category_item");

var _category_item2 = _interopRequireDefault(_category_item);

var _sub_categories_modal = require("../containers/sub_categories_modal");

var _sub_categories_modal2 = _interopRequireDefault(_sub_categories_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Categories = function Categories(_ref) {
  var label = _ref.label;
  var type = _ref.type;

  var visiting_card = 'Visiting Card';
  var broucher = 'Broucher';
  var stationary = 'Stationary';
  var flyers = 'Flyers';

  return _react2.default.createElement(
    "div",
    { className: "main-section-body" },
    _react2.default.createElement(
      "div",
      { className: "left-panel category" },
      _react2.default.createElement(
        "div",
        { className: "inner-section main", id: "print-type" },
        _react2.default.createElement(
          "h2",
          null,
          label
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_sub_categories_modal2.default, {
            type: "visiting_card",
            label: visiting_card,
            imgSrc: "/assets/round2.png",
            categoryClass: "category"
          }),
          _react2.default.createElement(
            _reactRouter.Link,
            {
              to: "/order/broucher",
              className: "item-box" },
            _react2.default.createElement(_category_item2.default, {
              label: broucher,
              imgSrc: "/assets/round3.png",
              categoryClass: "category"
            })
          ),
          _react2.default.createElement(_sub_categories_modal2.default, {
            type: "stationary",
            label: stationary,
            imgSrc: "/assets/round1.png",
            categoryClass: "category"
          }),
          _react2.default.createElement(_sub_categories_modal2.default, {
            type: "flyers",
            label: flyers,
            imgSrc: "/assets/round4.png",
            categoryClass: "category"
          })
        )
      )
    )
  );
};

exports.default = Categories;