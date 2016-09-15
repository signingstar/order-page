'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
  var isComplete = _ref.isComplete;
  var onSubmit = _ref.onSubmit;

  return _react2.default.createElement(
    'div',
    { className: 'checkout-button', id: 'checkout' },
    _react2.default.createElement(
      'button',
      { type: 'submit', onClick: onSubmit, className: isComplete ? 'active' : 'inactive', rel: 'nofollow' },
      'Confirm Order'
    )
  );
};

exports.default = Button;