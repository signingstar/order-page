'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInputContainer = function TextInputContainer(_ref) {
  var label = _ref.label;
  var value = _ref.value;
  var onChange = _ref.onChange;

  return _react2.default.createElement(
    'div',
    { className: 'inner-section', id: 'print-others' },
    _react2.default.createElement(
      'label',
      null,
      label
    ),
    _react2.default.createElement('input', { type: 'text', className: 'text-input', value: value, onChange: onChange })
  );
};

exports.default = TextInputContainer;