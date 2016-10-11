"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageFeedback = function ImageFeedback(_ref) {
  var onLike = _ref.onLike;
  var onDisike = _ref.onDisike;
  var onLove = _ref.onLove;
  var likes = _ref.likes;
  return _react2.default.createElement(
    "div",
    { className: "item-action" },
    _react2.default.createElement(
      "div",
      { className: "like" },
      _react2.default.createElement("input", { type: "button", value: "Like", onClick: onLike, className: likes === 1 ? 'selected' : 'enable' })
    ),
    _react2.default.createElement(
      "div",
      { className: "dislike" },
      _react2.default.createElement("input", { type: "button", value: "Dislike", onClick: onDisike, className: likes === 0 ? 'selected' : 'enable' })
    ),
    _react2.default.createElement(
      "div",
      { className: "love" },
      _react2.default.createElement("input", { type: "button", value: "Love", onClick: onLove, className: likes === 2 ? 'selected' : 'enable' })
    )
  );
};

exports.default = ImageFeedback;
//# sourceMappingURL=image_feedback.js.map