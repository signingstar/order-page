"use strict";

exports.__esModule = true;
exports.confirmOrder = exports.processOrder = exports.updateCustomerDetails = exports.createOrder = undefined;

var _add_order = require("../../database/api/add_order");

var _add_order2 = _interopRequireDefault(_add_order);

var _db_updates = require("../../database/api/db_updates");

var _form_validator = require("./form_validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WEDDING = 'wedding';

var createOrder = exports.createOrder = function createOrder(_ref, _ref2, cb) {
  var formData = _ref.formData,
      session = _ref.session;
  var logger = _ref2.logger,
      queryDb = _ref2.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    return cb({ err: { message: 'session timed out', statusCode: 401 } });
  }

  var _validateOrderData = (0, _form_validator.validateOrderData)(formData),
      err = _validateOrderData.err,
      orderData = _validateOrderData.orderData;

  if (err) {
    return cb({ err: err });
  }

  var product = orderData.product,
      first_name = orderData.first_name,
      last_name = orderData.last_name,
      email = orderData.email,
      phone_number = orderData.phone_number,
      image_count = orderData.image_count;

  var userid = user.id;
  var queryParams = [userid, product, first_name, last_name, email, phone_number, image_count];

  (0, _add_order2.default)(queryParams, { logger: logger, queryDb: queryDb }, function (err, result) {
    cb({ err: err, orderData: orderData, result: result });
  });
};

var updateCustomerDetails = exports.updateCustomerDetails = function updateCustomerDetails(_ref3, _ref4, cb) {
  var formData = _ref3.formData,
      session = _ref3.session;
  var logger = _ref4.logger,
      queryDb = _ref4.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    return cb({ err: { message: 'session timed out', statusCode: 401 } });
  }

  var _validateOrderData2 = (0, _form_validator.validateOrderData)(formData),
      err = _validateOrderData2.err,
      orderData = _validateOrderData2.orderData;

  if (err) {
    return cb({ err: err });
  }

  var product = orderData.product,
      first_name = orderData.first_name,
      last_name = orderData.last_name,
      email = orderData.email,
      phone_number = orderData.phone_number,
      image_count = orderData.image_count;

  var userid = user.id;
  var queryParams = [userid, product, first_name, last_name, email, phone_number, image_count];

  (0, _db_updates.updateOrder)(queryParams, { logger: logger, queryDb: queryDb }, function (err, result) {
    cb({ err: err, orderData: orderData, result: result });
  });
};

var processOrder = exports.processOrder = function processOrder(_ref5, _ref6, cb) {
  var params = _ref5.params,
      body = _ref5.body,
      session = _ref5.session;
  var logger = _ref6.logger,
      queryDb = _ref6.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    return cb({ err: { message: 'session timed out', statusCode: 401 } });
  }

  var _validateProcessOrder = (0, _form_validator.validateProcessOrderData)(body),
      err = _validateProcessOrder.err,
      orderData = _validateProcessOrder.orderData;

  if (err) {
    return cb({ err: err });
  }

  var order_id = orderData.order_id;

  var userid = user.id;
  var queryParams = [userid, order_id, 'in_process', null];

  (0, _db_updates.updateOrder)(queryParams, { logger: logger, queryDb: queryDb }, function (err, result) {
    cb({ err: err, orderData: orderData, result: result });
  });
};

var confirmOrder = exports.confirmOrder = function confirmOrder(_ref7, _ref8, cb) {
  var params = _ref7.params,
      body = _ref7.body,
      userId = _ref7.userId;
  var logger = _ref8.logger,
      queryDb = _ref8.queryDb;

  var _validateConfirmOrder = (0, _form_validator.validateConfirmOrderData)(body),
      err = _validateConfirmOrder.err,
      orderData = _validateConfirmOrder.orderData;

  if (err) {
    return cb({ err: err });
  }

  var order_id = orderData.order_id,
      _orderData$order_name = orderData.order_name,
      order_name = _orderData$order_name === undefined ? null : _orderData$order_name,
      _orderData$category = orderData.category,
      category = _orderData$category === undefined ? WEDDING : _orderData$category;

  var queryParams = [userId, order_id, 'confirmed', order_name, category];

  (0, _db_updates.updateOrderToConfirm)(queryParams, { logger: logger, queryDb: queryDb }, function (err, result) {
    cb({ err: err, orderData: orderData, result: result });
  });
};