"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageFeedbackUsers = function ImageFeedbackUsers(_ref) {
  var users = _ref.users;

  var userList = users.map(function (user) {
    return _react2.default.createElement(
      "li",
      { key: user },
      user
    );
  });

  return _react2.default.createElement(
    "ul",
    { className: "reactors" },
    userList
  );
};

exports.default = ImageFeedbackUsers;