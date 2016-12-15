"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _image_feedback = require("../containers/image_feedback");

var _image_feedback2 = _interopRequireDefault(_image_feedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageModalTileContent = function ImageModalTileContent(_ref) {
  var onClose = _ref.onClose,
      showNext = _ref.showNext,
      showPrevious = _ref.showPrevious,
      image = _ref.image,
      nextLink = _ref.nextLink,
      previousLink = _ref.previousLink,
      showFullScreen = _ref.showFullScreen;
  var destination = image.destination,
      filename = image.filename;

  var fileSrc = "/" + destination + "/" + filename;

  return _react2.default.createElement(
    "div",
    { className: "half-screen" },
    _react2.default.createElement(
      "div",
      { className: "screen-left" },
      _react2.default.createElement(
        "div",
        { className: "half-screen-image" },
        _react2.default.createElement("img", { src: fileSrc + "_modal" })
      ),
      _react2.default.createElement(
        "div",
        { className: "image-nav" },
        _react2.default.createElement(
          "div",
          { className: previousLink ? 'slide' : 'slide invisible' },
          previousLink
        ),
        _react2.default.createElement(
          "div",
          { className: nextLink ? 'slide' : 'slide invisible' },
          nextLink
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "fullscreen" },
        _react2.default.createElement(
          "button",
          { className: "glyph", type: "button", onClick: showFullScreen },
          _react2.default.createElement("span", { className: "glyphicon glyphicon-resize-full" })
        )
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "screen-right" },
      _react2.default.createElement(_image_feedback2.default, { image: image, modal: true, onClose: onClose })
    )
  );
};

exports.default = ImageModalTileContent;
//# sourceMappingURL=image_modal_tile_content.js.map