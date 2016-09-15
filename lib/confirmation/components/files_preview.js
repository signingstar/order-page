"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

var _files_preview_contents = require("./files_preview_contents");

var _files_preview_contents2 = _interopRequireDefault(_files_preview_contents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {}
};

var FilesPreview = function FilesPreview(_ref) {
  var onClick = _ref.onClick;
  var onClose = _ref.onClose;
  var isShowing = _ref.isShowing;
  var files = _ref.files;
  var modalHeader = _ref.modalHeader;
  var label = _ref.label;

  if (files.length === 0) {
    return null;
  }

  return _react2.default.createElement(
    "div",
    { className: "file-preview" },
    _react2.default.createElement(
      "a",
      { href: "javascript:void(0)", onClick: onClick },
      label
    ),
    _react2.default.createElement(
      _reactModal2.default,
      {
        isOpen: isShowing,
        onRequestClose: onClose,
        style: customStyles },
      _react2.default.createElement(_files_preview_contents2.default, {
        files: files,
        onClose: onClose,
        modalHeader: modalHeader })
    )
  );
};

exports.default = FilesPreview;