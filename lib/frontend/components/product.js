"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _product_item = require("./product_item");

var _product_item2 = _interopRequireDefault(_product_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Products = function Products(_ref) {
  var label = _ref.label;
  var pathname = _ref.pathname;

  var retouching = 'Image Retouching';
  var printing = 'Album Printing';

  return _react2.default.createElement(
    "div",
    { className: "main-section-body products" },
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        _Link2.default,
        {
          to: {
            pathname: '/order',
            state: { type: { key: 'retouching', value: retouching } }
          },
          className: "item-box"
        },
        _react2.default.createElement(_product_item2.default, {
          label: retouching,
          imgSrc: "/assets/round3.png",
          categoryClass: "category"
        })
      )
    ),
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        _Link2.default,
        {
          to: {
            pathname: '/order',
            state: { type: { key: 'printing', value: printing } }
          },
          className: "item-box"
        },
        _react2.default.createElement(_product_item2.default, {
          label: printing,
          imgSrc: "/assets/round2.png",
          categoryClass: "category"
        })
      )
    )
  );
};

exports.default = Products;
//# sourceMappingURL=product.js.map