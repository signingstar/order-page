"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageTile = function ImageTile(_ref) {
  var pathname = _ref.pathname,
      albumId = _ref.albumId,
      image = _ref.image;
  var id = image.id,
      filename = image.filename,
      destination = image.destination,
      index = image.index,
      originalname = image.originalname;


  return _react2.default.createElement(
    "figure",
    { className: "multi-row" },
    _react2.default.createElement(
      "div",
      { className: "item-tile" },
      _react2.default.createElement(
        "div",
        { className: "item-image" },
        _react2.default.createElement("img", { id: id, src: "/" + destination + "/" + filename, title: originalname, alt: "" })
      ),
      _react2.default.createElement(
        "figcaption",
        null,
        _react2.default.createElement(
          "div",
          { className: "item-label" },
          originalname
        )
      )
    )
  );
};

exports.default = ImageTile;
//# sourceMappingURL=image_tile.js.map