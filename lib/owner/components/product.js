"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router-dom/Link");

var _Link2 = _interopRequireDefault(_Link);

var _product_item = require("./product_item");

var _product_item2 = _interopRequireDefault(_product_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Products = function Products(_ref) {
  var pathname = _ref.pathname,
      items = _ref.items;

  var linkNodes = items.map(function (item) {
    var imgSrc = '/assets/round3.png';
    switch (item.name) {
      case 'wedding_album':
        imgSrc = '/assets/wedding.jpg';
        break;
      case 'post_processing':
        imgSrc = '/assets/post_processing.png';
        break;
      case 'retouching':
        imgSrc = '/assets/retouching.png';
        break;
      case 'portrait_album':
        imgSrc = '/assets/portrait.png';
        break;
    }

    return _react2.default.createElement(_product_item2.default, {
      key: item.id,
      item: item,
      imgSrc: imgSrc
    });
  });

  return _react2.default.createElement(
    "div",
    { className: "main-section-body products" },
    linkNodes
  );
};

exports.default = Products;