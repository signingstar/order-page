'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = function User(_ref) {
  var email = _ref.email;
  var role = _ref.role;
  return _react2.default.createElement(
    'div',
    { className: 'user-info' },
    _react2.default.createElement(
      'div',
      { className: 'email' },
      email
    ),
    _react2.default.createElement(
      'div',
      { className: 'role' },
      role
    )
  );
};

exports.default = User;
//# sourceMappingURL=user.js.map