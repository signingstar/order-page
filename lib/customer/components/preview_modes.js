"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PreviewModes = function PreviewModes(_ref) {
  var previewMode = _ref.previewMode,
      updatePreviewMode = _ref.updatePreviewMode;
  return _react2.default.createElement(
    "div",
    { className: "preview-mode" },
    _react2.default.createElement(
      "button",
      {
        className: previewMode === _actions.LIST_VIEW ? 'selected list' : 'list',
        type: "button",
        onClick: function onClick() {
          return updatePreviewMode(_actions.LIST_VIEW);
        },
        title: "List View" },
      _react2.default.createElement("span", { className: "glyphicon glyphicon-list" })
    ),
    _react2.default.createElement(
      "button",
      {
        className: previewMode === _actions.THUMBNAIL_VIEW ? 'selected thumbnail' : 'thumbnail',
        type: "button",
        onClick: function onClick() {
          return updatePreviewMode(_actions.THUMBNAIL_VIEW);
        },
        title: "Thumbnail View" },
      _react2.default.createElement("span", { className: "glyphicon glyphicon-th" })
    )
  );
};

exports.default = PreviewModes;