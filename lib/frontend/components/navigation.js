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

  return _react2.default.createElement(
    "div",
    { className: "main-section-body" },
    _react2.default.createElement(
      "div",
      { className: "inner-section main", id: "print-type" },
      _react2.default.createElement(
        _Link2.default,
        {
          to: {
            pathname: '/order',
            state: { type: { key: 'retouching', value: 'Image retouching' } }
          },
          className: "item-box"
        },
        _react2.default.createElement(_product_item2.default, {
          label: retouching,
          imgSrc: "/assets/round3.png",
          categoryClass: "category"
        })
      )
    )
  );
};

exports.default = Products;
//# sourceMappingURL=navigation.js.map