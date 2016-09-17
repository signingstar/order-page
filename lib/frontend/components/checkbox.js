'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckBoxComponent = function CheckBoxComponent(_ref) {
  var label = _ref.label;
  var checked = _ref.checked;
  var onChange = _ref.onChange;

  return _react2.default.createElement(
    'div',
    { className: 'inner-section', id: 'print-others' },
    _react2.default.createElement(
      'label',
      null,
      label
    ),
    _react2.default.createElement('input', { type: 'checkbox', className: 'checkbox-input', checked: checked, onChange: onChange })
  );
};

exports.default = CheckBoxComponent;