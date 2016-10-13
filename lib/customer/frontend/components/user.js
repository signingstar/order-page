"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = function User(_ref) {
  var email = _ref.email;
  var role = _ref.role;
  var onDelete = _ref.onDelete;
  return _react2.default.createElement(
    "div",
    { className: "user-info" },
    _react2.default.createElement(
      "div",
      { className: "email" },
      email
    ),
    _react2.default.createElement(
      "div",
      { className: "role" },
      _actions.USER_ROLES[role].shortDescription
    ),
    _react2.default.createElement(
      "div",
      { className: "submit-button" },
      _react2.default.createElement("input", { type: "button", value: "Remove", onClick: onDelete })
    )
  );
};

exports.default = User;
//# sourceMappingURL=user.js.map