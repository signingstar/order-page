"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageFeedback = function ImageFeedback(_ref) {
  var onLike = _ref.onLike;
  var onDisike = _ref.onDisike;
  var onLove = _ref.onLove;
  var likes = _ref.likes;
  var reactions = _ref.reactions;

  var liked = reactions[_actions.LIKE] || {};
  var disliked = reactions[_actions.DISLIKE] || {};
  var loved = reactions[_actions.LOVE] || {};

  return _react2.default.createElement(
    "div",
    { className: "item-action" },
    _react2.default.createElement(
      "div",
      { className: "like" },
      _react2.default.createElement("input", { type: "button", value: "Like", onClick: onLike, className: likes === _actions.LIKE ? 'selected' : 'enable' }),
      _react2.default.createElement(
        "div",
        null,
        liked.count
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "dislike" },
      _react2.default.createElement("input", { type: "button", value: "Dislike", onClick: onDisike, className: likes === _actions.DISLIKE ? 'selected' : 'enable' }),
      _react2.default.createElement(
        "div",
        null,
        disliked.count
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "love" },
      _react2.default.createElement("input", { type: "button", value: "Love", onClick: onLove, className: likes === _actions.LOVE ? 'selected' : 'enable' }),
      _react2.default.createElement(
        "div",
        null,
        loved.count
      )
    )
  );
};

exports.default = ImageFeedback;
//# sourceMappingURL=feedback_panel.js.map