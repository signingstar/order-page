'use strict';

exports.__esModule = true;
exports.uploadImages = exports.confirmOrder = exports.processOrder = exports.createOrder = exports.setSuccess = exports.setError = exports.clearError = exports.clearAllErrors = exports.setImageUploaded = exports.removeImage = exports.setImages = exports.updateOrder = exports.updateCustomerFormStatus = exports.updateCustomerDetails = exports.resetProduct = exports.setProduct = exports.SET_SUCCESS = exports.SET_ERROR = exports.CLEAR_ERROR = exports.CLEAR_ALL_ERRORS = exports.SET_IMAGES = exports.UPDATE_ORDER = exports.UPDATE_CUSTOMER_STATUS = exports.UPDATE_CUSTOMER_DETAILS = exports.RESET_PRODUCT = exports.SET_PRODUCT = undefined;

var _jquery = require('jquery');

var SET_PRODUCT = exports.SET_PRODUCT = 'SET_PRODUCT';
var RESET_PRODUCT = exports.RESET_PRODUCT = 'RESET_PRODUCT';
var UPDATE_CUSTOMER_DETAILS = exports.UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS';
var UPDATE_CUSTOMER_STATUS = exports.UPDATE_CUSTOMER_STATUS = 'UPDATE_CUSTOMER_STATUS';
var UPDATE_ORDER = exports.UPDATE_ORDER = 'UPDATE_ORDER';
var SET_IMAGES = exports.SET_IMAGES = 'SET_IMAGES';

//Error related
var CLEAR_ALL_ERRORS = exports.CLEAR_ALL_ERRORS = 'CLEAR_ALL_ERRORS';
var CLEAR_ERROR = exports.CLEAR_ERROR = 'CLEAR_ERROR';
var SET_ERROR = exports.SET_ERROR = 'SET_ERROR';
var SET_SUCCESS = exports.SET_SUCCESS = 'SET_SUCCESS';

var setProduct = exports.setProduct = function setProduct(key, value) {
  return {
    type: SET_PRODUCT,
    params: { key: key, value: value }
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

var updateCustomerFormStatus = exports.updateCustomerFormStatus = function updateCustomerFormStatus(flag) {
  return {
    type: UPDATE_CUSTOMER_STATUS,
    params: flag
  };
};

var updateOrder = exports.updateOrder = function updateOrder(orderData) {
  return {
    type: UPDATE_ORDER,
    params: orderData
  };
};

var setImages = exports.setImages = function setImages(images) {
  return {
    type: SET_IMAGES,
    params: images
  };
};

var removeImage = exports.removeImage = function removeImage(image) {
  return {
    type: 'REMOVE_IMAGE',
    params: image
  };
};

var setImageUploaded = exports.setImageUploaded = function setImageUploaded() {
  return {
    type: 'SET_IMAGE_UPLOADED'
  };
};

//------------------------- Error Related ---------------------------

var clearAllErrors = exports.clearAllErrors = function clearAllErrors() {
  return {
    type: CLEAR_ALL_ERRORS
  };
};

var clearError = exports.clearError = function clearError(category) {
  return {
    type: CLEAR_ERROR,
    details: category
  };
};

var setError = exports.setError = function setError(message) {
  return {
    type: SET_ERROR,
    details: message
  };
};

var setSuccess = exports.setSuccess = function setSuccess(message) {
  return {
    type: SET_SUCCESS,
    details: message || { success: true }
  };
};

//-------------------------- Server calls ----------------------------

var createOrder = exports.createOrder = function createOrder(data, cb) {
  (0, _jquery.ajax)({
    method: 'POST',
    url: '/order/create',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};

var processOrder = exports.processOrder = function processOrder(data, cb) {
  (0, _jquery.ajax)({
    method: 'POST',
    url: '/order/process',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};

var confirmOrder = exports.confirmOrder = function confirmOrder(data, cb) {
  (0, _jquery.ajax)({
    method: 'POST',
    url: '/order/confirm',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};

var uploadImages = exports.uploadImages = function uploadImages(data, cb) {
  (0, _jquery.ajax)({
    url: '/order/upload',
    method: 'POST',
    processData: false,
    contentType: false,
    data: data
  }).done(function (res, textStatus) {
    return cb({ res: res });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};
//# sourceMappingURL=actions.js.map