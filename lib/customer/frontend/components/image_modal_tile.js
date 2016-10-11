"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

var _image_feedback = require("../containers/image_feedback");

var _image_feedback2 = _interopRequireDefault(_image_feedback);

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
  overlay: {}
};

var ImageModalTile = function ImageModalTile(_ref) {
  var onClose = _ref.onClose;
  var isShowing = _ref.isShowing;
  var label = _ref.label;
  var showNext = _ref.showNext;
  var showPrevious = _ref.showPrevious;
  var image = _ref.image;
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
            null,
            _react2.default.createElement("input", { type: "button", value: "Previous", onClick: showPrevious })
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement("input", { type: "button", value: "Next", onClick: showNext })
          )
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "screen-right" },
        _react2.default.createElement(_image_feedback2.default, { image: image })
      )
    )
  );
};

exports.default = ImageModalTile;
//# sourceMappingURL=image_modal_tile.js.map