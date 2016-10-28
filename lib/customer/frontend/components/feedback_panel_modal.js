"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _actions = require("../actions");

var _reactor_list = require("./reactor_list");

var _reactor_list2 = _interopRequireDefault(_reactor_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageFeedback = function ImageFeedback(_ref) {
  var onLike = _ref.onLike,
      onDisike = _ref.onDisike,
      onLove = _ref.onLove,
      onClose = _ref.onClose,
      likes = _ref.likes,
      reactions = _ref.reactions;

  var liked = reactions[_actions.LIKE] || {};
  var disliked = reactions[_actions.DISLIKE] || {};
  var loved = reactions[_actions.LOVE] || {};

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "close-icon", onClick: onClose },
      _react2.default.createElement(
        "span",
        null,
        "Close"
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "item-action-modal" },
      _react2.default.createElement(
        "div",
        { className: "like" },
        _react2.default.createElement("input", { type: "button", value: "Like", onClick: onLike, className: likes === _actions.LIKE ? 'selected' : 'enable' }),
        _react2.default.createElement(_reactor_list2.default, { users: liked.users })
      ),
      _react2.default.createElement(
        "div",
        { className: "dislike" },
        _react2.default.createElement("input", { type: "button", value: "Dislike", onClick: onDisike, className: likes === _actions.DISLIKE ? 'selected' : 'enable' }),
        _react2.default.createElement(_reactor_list2.default, { users: disliked.users })
      ),
      _react2.default.createElement(
        "div",
        { className: "love" },
        _react2.default.createElement("input", { type: "button", value: "Love", onClick: onLove, className: likes === _actions.LOVE ? 'selected' : 'enable' }),
        _react2.default.createElement(_reactor_list2.default, { users: loved.users })
      )
    )
  );
};

exports.default = ImageFeedback;
//# sourceMappingURL=feedback_panel_modal.js.map