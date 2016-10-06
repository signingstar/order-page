'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('react-router/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfirmOrderComponent = function ConfirmOrderComponent(_ref) {
  var pathname = _ref.pathname;
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    'div',
    { className: 'main-section-body' },
    _react2.default.createElement(
      'h2',
      null,
      'Hurry. One last step'
    ),
    _react2.default.createElement(
      'div',
      { className: 'fields' },
      _react2.default.createElement(
        'div',
        { className: 'submit-button' },
        _react2.default.createElement(
          _Link2.default,
          { to: '/order/process', className: 'submit-button' },
          'Back'
        ),
        _react2.default.createElement('input', { type: 'button', onClick: onClick, value: 'Next' })
      )
    )
  );
};

exports.default = ConfirmOrderComponent;
//# sourceMappingURL=confirm_order.js.map