"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _upload_files = require("../containers/upload_files");

var _upload_files2 = _interopRequireDefault(_upload_files);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessOrderComponent = function ProcessOrderComponent(_ref) {
  var pathname = _ref.pathname;
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    "div",
    { className: "main-section-body" },
    _react2.default.createElement(
      "h2",
      null,
      "Upload Files"
    ),
    _react2.default.createElement(
      "div",
      { className: "fields" },
      _react2.default.createElement(_upload_files2.default, null),
      _react2.default.createElement(
        "div",
        { className: "submit-button" },
        _react2.default.createElement(
          _Link2.default,
          { to: "/order", className: "submit-button" },
          "Back"
        ),
        _react2.default.createElement("input", { type: "button", onClick: onClick, value: "Next" })
      )
    )
  );
};

exports.default = ProcessOrderComponent;
//# sourceMappingURL=process_order.js.map