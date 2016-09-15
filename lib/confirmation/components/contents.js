"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _button = require("./button");

var _button2 = _interopRequireDefault(_button);

var _files_preview = require("../containers/files_preview");

var _files_preview2 = _interopRequireDefault(_files_preview);

var _content_item = require("./content_item");

var _content_item2 = _interopRequireDefault(_content_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfirmationContent = function ConfirmationContent(_ref) {
  var fieldsMap = _ref.fieldsMap;
  var filesNode = _ref.filesNode;
  var onReset = _ref.onReset;
  var isComplete = _ref.isComplete;
  var isEmpty = _ref.isEmpty;
  var onSubmit = _ref.onSubmit;
  var itemNodes = _ref.itemNodes;

  return _react2.default.createElement(
    "div",
    { className: "right-panel-content" },
    _react2.default.createElement(
      "form",
      { method: "post", action: "/checkout" },
      _react2.default.createElement(
        "div",
        { className: "confirmation-content" },
        _react2.default.createElement(
          "div",
          { className: isEmpty ? 'hide clear' : 'clear' },
          _react2.default.createElement(
            "span",
            { onClick: onReset },
            "clear"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "header" },
          _react2.default.createElement(
            "h4",
            null,
            "Order Summary "
          )
        ),
        _react2.default.createElement(
          "ul",
          { className: "order-summary" },
          itemNodes,
          _react2.default.createElement(_content_item2.default, { label: "Estimated Price", value: isComplete ? 'Rs. 1000' : '' }),
          _react2.default.createElement(
            "li",
            { className: "upload-list" },
            _react2.default.createElement(
              "span",
              { className: "label" },
              "Uploaded Design: "
            ),
            _react2.default.createElement(
              "span",
              null,
              _react2.default.createElement(_files_preview2.default, null)
            )
          )
        )
      )
    ),
    _react2.default.createElement(_button2.default, { onSubmit: onSubmit, isComplete: isComplete, fields: fieldsMap })
  );
};

exports.default = ConfirmationContent;