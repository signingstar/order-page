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
  var pathname = _ref.pathname;
  var items = _ref.items;

  var linkNodes = items.map(function (item) {
    return _react2.default.createElement(
      "div",
      { key: item.id },
      _react2.default.createElement(
        _Link2.default,
        {
          to: {
            pathname: '/order',
            state: { type: { key: item.id, value: item.description } }
          },
          className: "item-box"
        },
        _react2.default.createElement(_product_item2.default, {
          label: item.description,
          imgSrc: "/assets/round3.png",
          categoryClass: "category"
        })
      )
    );
  });
  var retouching = items[0].description;
  var printing = 'Album Printing';

  return _react2.default.createElement(
    "div",
    { className: "main-section-body products" },
    linkNodes
  );
};

exports.default = Products;
//# sourceMappingURL=product.js.map