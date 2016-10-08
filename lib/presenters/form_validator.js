"use strict";

exports.__esModule = true;
exports.validateConfirmOrderData = exports.validateProcessOrderData = exports.validateOrderId = exports.validateCustomerLinkData = exports.validateOrderData = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _xssFilters = require("xss-filters");

var _xssFilters2 = _interopRequireDefault(_xssFilters);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var invalidMessage = 'Please provide correct input';
var emptyMessage = 'This field can not be blank';

var validateOrderData = exports.validateOrderData = function validateOrderData(_ref) {
  var id = _ref.id;
  var category = _ref.category;
  var product = _ref.product;
  var first_name = _ref.first_name;
  var last_name = _ref.last_name;
  var email = _ref.email;
  var phone_number = _ref.phone_number;
  var image_count = _ref.image_count;

  var err = {};

  first_name = verifyAndAttachError('first_name', first_name, 'stringWithSpaces', err);
  last_name = verifyAndAttachError('last_name', last_name, 'stringWithSpaces', err);
  category = verifyAndAttachError('category', category, 'stringWithNoSpaces', err);
  product = verifyAndAttachError('product', product, 'numeric', err);
  email = verifyAndAttachError('email', email, 'email', err);
  phone_number = verifyAndAttachError('phone_number', phone_number, 'numeric', err);
  id = verifyAndAttachError('id', id, 'numeric', err, true);

  if (!_underscore2.default.isEmpty(err)) {
    return { err: err };
  }

  var orderData = { category: category, product: product, first_name: first_name, last_name: last_name, email: email, phone_number: phone_number, image_count: image_count };
  if (id) {
    orderData.id = id;
  }

  return { orderData: orderData };
};

var validateCustomerLinkData = exports.validateCustomerLinkData = function validateCustomerLinkData(_ref2) {
  var userHash = _ref2.userHash;
  var orderId = _ref2.orderId;

  var err = {};

  orderId = _xssFilters2.default.inHTMLData((0, _validator.trim)(orderId));
  verifyAndAttachError('orderId', orderId, 'isAlphaNumeric', err);

  if (!_underscore2.default.isEmpty(err)) {
    return { err: err };
  }
  var formData = { userHash: userHash, orderId: orderId };

  return { formData: formData };
};

var validateOrderId = exports.validateOrderId = function validateOrderId(_ref3) {
  _objectDestructuringEmpty(_ref3);
};

var validateProcessOrderData = exports.validateProcessOrderData = function validateProcessOrderData(_ref4) {
  var order_id = _ref4.order_id;

  var err = {};

  order_id = _xssFilters2.default.inHTMLData((0, _validator.trim)(order_id));
  verifyAndAttachError('order_id', order_id, 'isAlphaNumeric', err);

  if (!_underscore2.default.isEmpty(err)) {
    return { err: err };
  }
  var orderData = { order_id: order_id };

  return { orderData: orderData };
};

var validateConfirmOrderData = exports.validateConfirmOrderData = function validateConfirmOrderData(_ref5) {
  var order_id = _ref5.order_id;

  var err = {};

  order_id = _xssFilters2.default.inHTMLData((0, _validator.trim)(order_id));
  verifyAndAttachError('order_id', order_id, 'isAlphaNumeric', err);

  if (!_underscore2.default.isEmpty(err)) {
    return { err: err };
  }
  var orderData = { order_id: order_id };

  return { orderData: orderData };
};

var verifyField = function verifyField(value, type) {
  switch (type) {
    case 'withSpaces':
      return !(0, _validator.isEmpty)(value);
    case 'stringWithSpaces':
      return !(0, _validator.isEmpty)(value) && (0, _validator.matches)(value, /^[a-z\s ]+$/i);
    case 'stringWithNoSpaces':
      return !(0, _validator.isEmpty)(value) && (0, _validator.isAlpha)(value);
    case 'isAlphaNumeric':
      return !(0, _validator.isEmpty)(value) && (0, _validator.isAlphanumeric)(value);
    case 'email':
      return !(0, _validator.isEmpty)(value) && (0, _validator.isEmail)(value);
    case 'numeric':
      return !(0, _validator.isEmpty)(value) && (0, _validator.isNumeric)(value);
    default:
      return true;
  }
};

var verifyAndAttachError = function verifyAndAttachError(id, value, type, err, optional) {
  if (value) {
    value = _xssFilters2.default.inHTMLData((0, _validator.trim)(value));
    if (!verifyField(value, type)) {
      err[id] = invalidMessage;
    }
  } else if (!optional) {
    err[id] = emptyMessage;
  }

  return value;
};
//# sourceMappingURL=form_validator.js.map