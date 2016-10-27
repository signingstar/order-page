"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

var _image_modal_tile_content = require("../components/image_modal_tile_content");

var _image_modal_tile_content2 = _interopRequireDefault(_image_modal_tile_content);

var _image_modal_full = require("../components/image_modal_full");

var _image_modal_full2 = _interopRequireDefault(_image_modal_full);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customStyles = {
  content: {
    border: 0,
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

var ImageModalTile = function ImageModalTile(modalparams) {
  var onClose = modalparams.onClose,
      isShowing = modalparams.isShowing,
      fullScreen = modalparams.fullScreen;


  return _react2.default.createElement(
    _reactModal2.default,
    {
      isOpen: isShowing,
      onRequestClose: onClose,
      style: customStyles
    },
    fullScreen ? _react2.default.createElement(_image_modal_full2.default, modalparams) : _react2.default.createElement(_image_modal_tile_content2.default, modalparams)
  );
};

exports.default = ImageModalTile;
//# sourceMappingURL=image_modal_tile.js.map