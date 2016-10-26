"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customStyles = {
  content: {
    display: 'flex',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    maxHeight: '100%'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  }
};

var ImageModalTile = function ImageModalTile(_ref) {
  var onClose = _ref.onClose;
  var isShowing = _ref.isShowing;
  var label = _ref.label;
  var showNext = _ref.showNext;
  var showPrevious = _ref.showPrevious;
  var image = _ref.image;
  var nextLink = _ref.nextLink;
  var previousLink = _ref.previousLink;
  var destination = image.destination;
  var filename = image.filename;

  var fileSrc = "/" + destination + "/" + filename;

  return _react2.default.createElement(
    _reactModal2.default,
    {
      isOpen: isShowing,
      onRequestClose: onClose,
      style: customStyles },
    _react2.default.createElement(
      "div",
      { className: "half-screen" },
      _react2.default.createElement(
        "div",
        { className: "screen-left" },
        _react2.default.createElement(
          "div",
          { className: "half-screen-image" },
          _react2.default.createElement("img", { src: fileSrc })
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
        )
      )
    )
  );
};

exports.default = ImageModalTile;
//# sourceMappingURL=image_modal_tile.js.map