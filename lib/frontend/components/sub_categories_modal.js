"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

var _sub_categories_content = require("./sub_categories_content");

var _sub_categories_content2 = _interopRequireDefault(_sub_categories_content);

var _category_item = require("./category_item");

var _category_item2 = _interopRequireDefault(_category_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {}
};

var SubCategoriesComponent = function SubCategoriesComponent(_ref) {
  var onClick = _ref.onClick;
  var onClose = _ref.onClose;
  var isShowing = _ref.isShowing;
  var modalHeader = _ref.modalHeader;
  var label = _ref.label;
  var type = _ref.type;
  var imgSrc = _ref.imgSrc;
  var categoryClass = _ref.categoryClass;

  return _react2.default.createElement(
    "div",
    { className: "item-box" },
    _react2.default.createElement(
      "a",
      { href: "javascript:void(0)", onClick: onClick },
      _react2.default.createElement(_category_item2.default, {
        label: label,
        imgSrc: imgSrc,
        categoryClass: categoryClass
      })
    ),
    _react2.default.createElement(
      _reactModal2.default,
      {
        isOpen: isShowing,
        onRequestClose: onClose,
        style: customStyles,
        portalClassName: "abcd" },
      _react2.default.createElement(_sub_categories_content2.default, { label: label, type: type })
    )
  );
};

exports.default = SubCategoriesComponent;