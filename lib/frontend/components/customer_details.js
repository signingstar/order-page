'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomerDetails = function CustomerDetails(_ref) {
  var onChange = _ref.onChange;
  var onSubmit = _ref.onSubmit;
  var title = _ref.title;
  var _ref$data = _ref.data;
  var data = _ref$data === undefined ? {} : _ref$data;
  var pathname = _ref.pathname;
  var message = _ref.message;
  var cust_name = data.cust_name;
  var email = data.email;
  var phone_number = data.phone_number;
  var image_count = data.image_count;


  var hasError = !isEmpty(message);
  var messageClass = 'message ' + (message.success ? 'success' : 'error');
  var messageText = hasError ? 'Please enter the correct Value' : '';
  return _react2.default.createElement(
    'div',
    { className: 'customer-section' },
    _react2.default.createElement(
      'h2',
      null,
      title
    ),
    _react2.default.createElement(
      'div',
      { className: messageClass },
      messageText
    ),
    _react2.default.createElement(
      'form',
      { onSubmit: onSubmit },
      _react2.default.createElement(
        'div',
        { className: 'form fields' },
        _react2.default.createElement(
          'div',
          { className: 'large-field required' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'cust_name' },
            'Customer Name'
          ),
          _react2.default.createElement('input', {
            type: 'text',
            name: 'cust_name',
            className: 'field ' + (message.first_name || message.last_name ? 'error' : ''),
            defaultValue: cust_name,
            onBlur: onChange,
            required: true
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'large-field required' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'email' },
            'Customer Email Id'
          ),
          _react2.default.createElement('input', {
            type: 'email',
            name: 'email',
            className: 'field ' + (message.email ? 'error' : ''),
            defaultValue: email,
            onBlur: onChange,
            required: true
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'large-field required' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'phone_number' },
            'Phone Number'
          ),
          _react2.default.createElement('input', {
            type: 'tel',
            name: 'phone_number',
            className: 'field ' + (message.phone_number ? 'error' : ''),
            defaultValue: phone_number,
            onBlur: onChange,
            required: true
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'small-field' },
          _react2.default.createElement(
            'label',
            { htmlFor: 'image_count' },
            'Number of Images'
          ),
          _react2.default.createElement('input', {
            type: 'number',
            name: 'image_count',
            className: 'field ' + (message.image_count ? 'error' : ''),
            defaultValue: image_count,
            onBlur: onChange
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'submit-button' },
          _react2.default.createElement(
            'button',
            { type: 'submit' },
            ' Next '
          )
        )
      )
    )
  );
};

var isEmpty = function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
};

exports.default = CustomerDetails;
//# sourceMappingURL=customer_details.js.map