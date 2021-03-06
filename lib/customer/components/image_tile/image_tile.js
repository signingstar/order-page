"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router-dom/Link");

var _Link2 = _interopRequireDefault(_Link);

var _image_feedback = require("../../containers/image_feedback");

var _image_feedback2 = _interopRequireDefault(_image_feedback);

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
        _react2.default.createElement(
          _Link2.default,
          { to: {
              pathname: pathname + "/" + id,
              state: { originalUrl: pathname, index: index, albumId: albumId }
            }
          },
          _react2.default.createElement("img", { id: id, src: "/" + destination + "/" + filename + "_tile", title: originalname, alt: "" })
        )
      ),
      _react2.default.createElement(
        "figcaption",
        null,
        _react2.default.createElement(
          "div",
          { className: "item-label" },
          originalname
        ),
        _react2.default.createElement(_image_feedback2.default, { image: image, modal: false, albumId: albumId })
      )
    )
  );
};

exports.default = ImageTile;