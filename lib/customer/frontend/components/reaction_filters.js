"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _actions = require("../actions");

var _preview_modes = require("./preview_modes");

var _preview_modes2 = _interopRequireDefault(_preview_modes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactionFilters = function ReactionFilters(_ref) {
  var filter = _ref.filter,
      updateFilter = _ref.updateFilter,
      totalCount = _ref.totalCount,
      likedCount = _ref.likedCount,
      dislikedCount = _ref.dislikedCount,
      lovedCount = _ref.lovedCount,
      updatePreviewMode = _ref.updatePreviewMode,
      previewMode = _ref.previewMode,
      user = _ref.user,
      onChange = _ref.onChange,
      userNodes = _ref.userNodes;

  var allClass = 'glyph filter all' + (filter === _actions.ALL ? ' selected' : '');
  var likedClass = 'glyph filter liked' + (filter === _actions.LIKE ? ' selected' : '');
  var dislikedClass = 'glyph filter disliked' + (filter === _actions.DISLIKE ? ' selected' : '');
  var lovedClass = 'glyph filter loved' + (filter === _actions.LOVE ? ' selected' : '');

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
        "All (",
        totalCount,
        ")"
      ),
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: function onClick() {
            return updateFilter(_actions.LIKE);
          },
          className: likedClass,
          title: "Images Liked"
        },
        _react2.default.createElement("span", { className: "glyphicon glyphicon-thumbs-up" }),
        "Liked (",
        likedCount,
        ")"
      ),
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: function onClick() {
            return updateFilter(_actions.DISLIKE);
          },
          className: dislikedClass,
          title: "Images Disliked"
        },
        _react2.default.createElement("span", { className: "glyphicon glyphicon-thumbs-down" }),
        "Disliked (",
        dislikedCount,
        ")"
      ),
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: function onClick() {
            return updateFilter(_actions.LOVE);
          },
          className: lovedClass,
          title: "Images Loved"
        },
        _react2.default.createElement("span", { className: "glyphicon glyphicon-heart" }),
        "Loved (",
        lovedCount,
        ")"
      )
    ),
    _react2.default.createElement(_reactSelect2.default, {
      name: "category",
      options: userNodes,
      onChange: onChange,
      className: "users",
      value: user,
      searchable: false,
      clearable: false
    }),
    _react2.default.createElement(_preview_modes2.default, { previewMode: previewMode, updatePreviewMode: updatePreviewMode })
  );
};

exports.default = ReactionFilters;
//# sourceMappingURL=reaction_filters.js.map