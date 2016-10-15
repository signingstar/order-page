"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductItemTile = function ProductItemTile(_ref) {
  var label = _ref.label;
  var imgSrc = _ref.imgSrc;
  var categoryClass = _ref.categoryClass;
  return _react2.default.createElement(
    "div",
    { className: categoryClass },
    _react2.default.createElement(
      "figure",
      { className: "multi-row" },
      _react2.default.createElement(
        "div",
        { className: "item-tile" },
        _react2.default.createElement(
          "div",
          { className: "item-image" },
          _react2.default.createElement("img", { src: imgSrc })
        ),
        _react2.default.createElement(
          "figcaption",
          null,
          _react2.default.createElement(
            "div",
            { className: "item-action" },
            label
          )
        )
      )
    )
  );
};

exports.default = ProductItemTile;
//# sourceMappingURL=product_item_tile.js.map