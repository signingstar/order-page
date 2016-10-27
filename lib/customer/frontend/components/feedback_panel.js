"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageFeedback = function ImageFeedback(_ref) {
  var onLike = _ref.onLike,
      onDisike = _ref.onDisike,
      onLove = _ref.onLove,
      likes = _ref.likes,
      reactions = _ref.reactions;

  var liked = reactions[_actions.LIKE] || {};
  var disliked = reactions[_actions.DISLIKE] || {};
  var loved = reactions[_actions.LOVE] || {};

  return _react2.default.createElement(
    "div",
    { className: "item-action" },
    _react2.default.createElement(
      "div",
      { className: "like" },
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: onLike,
          className: likes === _actions.LIKE ? 'selected' : 'enable',
          title: likes === _actions.LIKE ? 'You like it' : 'Like'
        },
        _react2.default.createElement("span", { className: "glyphicon glyphicon-thumbs-up icon" })
      ),
      _react2.default.createElement(
        "span",
        { className: "number" },
        liked.count
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "dislike" },
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: onDisike,
          className: likes === _actions.DISLIKE ? 'selected' : 'enable',
          title: likes === _actions.DISLIKE ? 'You dislike it' : 'Dislike'
        },
        _react2.default.createElement("span", { className: "glyphicon glyphicon-thumbs-down icon" })
      ),
      _react2.default.createElement(
        "span",
        { className: "number" },
        disliked.count
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "love" },
      _react2.default.createElement(
        "button",
        {
          type: "button",
          onClick: onLove,
          className: likes === _actions.LOVE ? 'selected' : 'enable',
          title: likes === _actions.LOVE ? 'You Love It' : 'Love'
        },
        _react2.default.createElement("span", { className: "glyphicon icon " + (likes === _actions.LOVE ? 'glyphicon-heart' : 'glyphicon-heart-empty') })
      ),
      _react2.default.createElement(
        "span",
        { className: "number" },
        loved.count
      )
    )
  );
};

exports.default = ImageFeedback;
//# sourceMappingURL=feedback_panel.js.map