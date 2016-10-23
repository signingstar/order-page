'use strict';

exports.__esModule = true;
exports.deleteFile = exports.updateAlbum = exports.addAlbum = exports.uploadImages = exports.confirmOrder = exports.processOrder = exports.createOrder = exports.setSuccess = exports.setError = exports.clearError = exports.clearAllErrors = exports.setOrderName = exports.swapAlbum = exports.populateImageList = exports.removeAlbum = exports.addAlbumToImage = exports.setImageUploaded = exports.removeImage = exports.setImages = exports.updateOrder = exports.updateCustomerFormStatus = exports.updateCustomerDetails = exports.resetProduct = exports.setProduct = exports.SET_SUCCESS = exports.SET_ERROR = exports.CLEAR_ERROR = exports.CLEAR_ALL_ERRORS = exports.SET_ORDER_NAME = exports.SWAP_ALBUM = exports.POPULATE_IMAGES = exports.SET_IMAGES = exports.UPDATE_ORDER = exports.UPDATE_CUSTOMER_STATUS = exports.UPDATE_CUSTOMER_DETAILS = exports.RESET_PRODUCT = exports.SET_PRODUCT = undefined;

var _jquery = require('jquery');

var SET_PRODUCT = exports.SET_PRODUCT = 'SET_PRODUCT';
var RESET_PRODUCT = exports.RESET_PRODUCT = 'RESET_PRODUCT';
var UPDATE_CUSTOMER_DETAILS = exports.UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS';
var UPDATE_CUSTOMER_STATUS = exports.UPDATE_CUSTOMER_STATUS = 'UPDATE_CUSTOMER_STATUS';
var UPDATE_ORDER = exports.UPDATE_ORDER = 'UPDATE_ORDER';
var SET_IMAGES = exports.SET_IMAGES = 'SET_IMAGES';
var POPULATE_IMAGES = exports.POPULATE_IMAGES = 'POPULATE_IMAGE_LIST';
var SWAP_ALBUM = exports.SWAP_ALBUM = 'SWAP_ALBUM';
var SET_ORDER_NAME = exports.SET_ORDER_NAME = 'SET_ORDER_NAME';

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
  return {
    type: UPDATE_CUSTOMER_DETAILS,
    params: { key: key, value: value }
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

var setImages = exports.setImages = function setImages(images, albumId) {
  return {
    type: SET_IMAGES,
    params: { images: images, albumId: albumId }
  };
};

var removeImage = exports.removeImage = function removeImage(image, albumId) {
  return {
    type: 'REMOVE_IMAGE',
    params: { image: image, albumId: albumId }
  };
};

var setImageUploaded = exports.setImageUploaded = function setImageUploaded(albumId) {
  return {
    type: 'SET_IMAGE_UPLOADED',
    params: albumId
  };
};

var addAlbumToImage = exports.addAlbumToImage = function addAlbumToImage(id, name, priority) {
  return {
    type: 'ADD_ALBUM',
    params: { id: id, name: name, priority: priority }
  };
};

var removeAlbum = exports.removeAlbum = function removeAlbum(albumId) {
  return {
    type: 'REMOVE_ALBUM',
    params: albumId
  };
};

var populateImageList = exports.populateImageList = function populateImageList(images) {
  return {
    type: POPULATE_IMAGES,
    params: images
  };
};

var swapAlbum = exports.swapAlbum = function swapAlbum(src, dest) {
  return {
    type: SWAP_ALBUM,
    params: { src: src, dest: dest }
  };
};

var setOrderName = exports.setOrderName = function setOrderName(name) {
  return {
    type: SET_ORDER_NAME,
    params: name
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
  var posting = (0, _jquery.post)('/order/create', data);

  posting.done(function (res, textStatus) {
    return cb({ res: res });
  });
  posting.fail(function (xhr, status, err) {
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

var uploadImages = exports.uploadImages = function uploadImages(data, progress, cb) {
  var posting = (0, _jquery.ajax)({
    url: '/order/upload',
    method: 'POST',
    processData: false,
    contentType: false,
    data: data,
    xhr: function xhr() {
      var myXhr = _jquery.ajaxSettings.xhr();

      if (myXhr.upload) {
        myXhr.upload.addEventListener('progress', progress, false);
      }

      return myXhr;
    }
  }).done(function (res, textStatus) {
    return cb({ res: res });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });

  return posting;
};

var addAlbum = exports.addAlbum = function addAlbum(data, cb) {
  (0, _jquery.ajax)({
    url: '/order/album/add',
    method: 'POST',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, staus: xhr.status });
  });
};

var updateAlbum = exports.updateAlbum = function updateAlbum(data, cb) {
  (0, _jquery.ajax)({
    url: '/order/album/update',
    method: 'POST',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, staus: xhr.status });
  });
};

var deleteFile = exports.deleteFile = function deleteFile(data, cb) {
  (0, _jquery.ajax)({
    url: '/order/file/delete',
    method: 'POST',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, staus: xhr.status });
  });
};
//# sourceMappingURL=actions.js.map