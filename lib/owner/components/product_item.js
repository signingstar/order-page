"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router-dom/Link");

var _Link2 = _interopRequireDefault(_Link);

var _product_item_tile = require("./product_item_tile");

var _product_item_tile2 = _interopRequireDefault(_product_item_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductItem = function ProductItem(_ref) {
  var item = _ref.item,
      imgSrc = _ref.imgSrc;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      _Link2.default,
      {
        to: {
          pathname: '/order',
          state: { type: { key: item.id, value: item.description } }
        },
        className: "item-box"
      },
      _react2.default.createElement(_product_item_tile2.default, {
        label: item.description,
        imgSrc: imgSrc,
        categoryClass: "category"
      })
    )
  );
};

exports.default = ProductItem;