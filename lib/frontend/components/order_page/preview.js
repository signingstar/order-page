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

var OrderPreview = function OrderPreview(_ref) {
  var onClose = _ref.onClose,
      isShowing = _ref.isShowing,
      content = _ref.content,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "a",
      { href: "javascript:void(0)", onClick: onClick },
      "Preview"
    ),
    _react2.default.createElement(
      _reactModal2.default,
      {
        isOpen: isShowing,
        onRequestClose: onClose,
        style: customStyles },
      _react2.default.createElement("div", { dangerouslySetInnerHTML: content })
    )
  );
};

exports.default = OrderPreview;
//# sourceMappingURL=preview.js.map