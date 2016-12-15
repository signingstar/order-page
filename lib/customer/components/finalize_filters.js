"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actions = require("../actions");

var _preview_modes = require("./preview_modes");

var _preview_modes2 = _interopRequireDefault(_preview_modes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FinalizeFilters = function FinalizeFilters(_ref) {
  var filter = _ref.filter,
      updateFilter = _ref.updateFilter,
      totalCount = _ref.totalCount,
      qualifiedCount = _ref.qualifiedCount,
      viewMode = _ref.viewMode,
      handleModeChange = _ref.handleModeChange;

  var allClass = 'glyph filter all' + (filter === _actions.ALL ? ' selected' : '');
  var qualifiedClass = 'glyph filter qualified' + (filter === _actions.QUALIFIED ? ' selected' : '');
  var unqualifiedClass = 'glyph filter unqualified' + (filter === _actions.UNQUALIFIED ? ' selected' : '');

  return _react2.default.createElement(
    "div",
    { className: "fields" },
    _react2.default.createElement(
      "div",
      { className: "filters" },
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: function onClick() {
            return updateFilter(_actions.ALL);
          },
          className: allClass,
          title: "All Images"
        },
        _react2.default.createElement("span", { className: "glyphicon glyphicon-picture" }),
        "All images (",
        totalCount,
        ")"
      ),
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: function onClick() {
            return updateFilter(_actions.QUALIFIED);
          },
          className: qualifiedClass,
          title: "Qualified for further processing"
        },
        _react2.default.createElement("span", { className: "glyphicon glyphicon-ok-circle" }),
        "Selected (",
        qualifiedCount,
        ")"
      ),
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: function onClick() {
            return updateFilter(_actions.UNQUALIFIED);
          },
          className: unqualifiedClass,
          title: "Not yet Qualified for further processing"
        },
        _react2.default.createElement("span", { className: "glyphicon glyphicon-exclamation-sign" }),
        "Filtered Out (",
        totalCount - qualifiedCount,
        ")"
      )
    ),
    _react2.default.createElement(_preview_modes2.default, { previewMode: viewMode, updatePreviewMode: handleModeChange })
  );
};

exports.default = FinalizeFilters;
//# sourceMappingURL=finalize_filters.js.map