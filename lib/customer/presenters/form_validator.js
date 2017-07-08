"use strict";

exports.__esModule = true;
exports.validateOrderId = exports.validateCustomerLinkData = exports.validateOrderData = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _xssFilters = require("xss-filters");

var _xssFilters2 = _interopRequireDefault(_xssFilters);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var errorMessage = 'Please provide correct input';

var validateOrderData = exports.validateOrderData = function validateOrderData(_ref) {
  var id = _ref.id,
      category = _ref.category,
      product = _ref.product,
      first_name = _ref.first_name,
      last_name = _ref.last_name,
      email = _ref.email,
      phone_number = _ref.phone_number,
      image_count = _ref.image_count;

  var err = {};

  category = _xssFilters2.default.inHTMLData((0, _validator.trim)(category));
  product = _xssFilters2.default.inHTMLData((0, _validator.trim)(product));
  first_name = _xssFilters2.default.inHTMLData((0, _validator.trim)(first_name));
  last_name = _xssFilters2.default.inHTMLData((0, _validator.trim)(last_name));
  email = _xssFilters2.default.inHTMLData((0, _validator.trim)(email));
  phone_number = _xssFilters2.default.inHTMLData((0, _validator.trim)(phone_number));
  // image_count = xssFilters.inHTMLData(trim(image_count))
  id = id ? _xssFilters2.default.inHTMLData((0, _validator.trim)(id)) : undefined;

  verifyAndAttachError('first_name', first_name, 'stringWithSpaces', err);
  verifyAndAttachError('last_name', last_name, 'stringWithSpaces', err);
  verifyAndAttachError('category', category, 'withSpaces', err);
  verifyAndAttachError('email', email, 'email', err);
  verifyAndAttachError('phone_number', phone_number, 'numeric', err);
  id && verifyAndAttachError('id', id, 'numeric', err);

  if (!_underscore2.default.isEmpty(err)) {
    return { err: err };
  }

  var formData = { id: id, category: category, product: product, first_name: first_name, last_name: last_name, email: email, phone_number: phone_number, image_count: image_count };

  return { formData: formData };
};

var validateCustomerLinkData = exports.validateCustomerLinkData = function validateCustomerLinkData(_ref2) {
  var userHash = _ref2.userHash,
      orderId = _ref2.orderId;

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

var verifyAndAttachError = function verifyAndAttachError(id, value, type, err) {
  if (!verifyField(value, type)) {
    err[id] = errorMessage;
  }
};