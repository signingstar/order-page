"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DesignFiles = function DesignFiles(_ref) {
  var label = _ref.label;
  var placeholder = _ref.placeholder;
  var onDrop = _ref.onDrop;
  var accept = _ref.accept;

  return _react2.default.createElement(
    "div",
    { className: "inner-section file-upload-preview" },
    _react2.default.createElement(
      "div",
      { className: "file-upload" },
      _react2.default.createElement(
        "label",
        null,
        label
      ),
      _react2.default.createElement(
        _reactDropzone2.default,
        {
          className: "upload-box",
          onDrop: onDrop,
          activeClassName: "active",
          rejectClassName: "reject",
          accept: accept },
        _react2.default.createElement(
          "div",
          { className: "upload-content" },
          _react2.default.createElement(
            "div",
            null,
            placeholder
          )
        )
      )
    )
  );
};

exports.default = DesignFiles;
//# sourceMappingURL=design_files_contents.js.map