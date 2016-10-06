'use strict';

exports.__esModule = true;
exports.createOrder = exports.setFiles = exports.updateOrder = exports.updateCustomerDetails = exports.resetProduct = exports.setProduct = exports.SET_FILES = exports.UPDATE_ORDER = exports.UPDATE_CUSTOMER_DETAILS = exports.RESET_PRODUCT = exports.SET_PRODUCT = undefined;

var _jquery = require('jquery');

var SET_PRODUCT = exports.SET_PRODUCT = 'SET_PRODUCT';
var RESET_PRODUCT = exports.RESET_PRODUCT = 'RESET_PRODUCT';
var UPDATE_CUSTOMER_DETAILS = exports.UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS';
var UPDATE_ORDER = exports.UPDATE_ORDER = 'UPDATE_ORDER';
var SET_FILES = exports.SET_FILES = 'SET_FILES';

var setProduct = exports.setProduct = function setProduct(id, value) {
  return {
    type: SET_PRODUCT,
    params: [id, value]
  };
};

var resetProduct = exports.resetProduct = function resetProduct() {
  return {
    type: RESET_PRODUCT
  };
};

var updateCustomerDetails = exports.updateCustomerDetails = function updateCustomerDetails(key, value) {
  var _params;

  return {
    type: UPDATE_CUSTOMER_DETAILS,
    params: (_params = {}, _params[key] = value, _params)
  };
};

var updateOrder = exports.updateOrder = function updateOrder(key, value) {
  var _params2;

  return {
    type: UPDATE_ORDER,
    params: (_params2 = {}, _params2[key] = value, _params2)
  };
};

var setFiles = exports.setFiles = function setFiles(files) {
  return {
    type: SET_FILES,
    value: files
  };
};

var createOrder = exports.createOrder = function createOrder(data, cb) {
  (0, _jquery.ajax)({
    method: 'POST',
    url: '/order/create',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({});
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};
//# sourceMappingURL=actions.js.map