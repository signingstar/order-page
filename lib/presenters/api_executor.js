"use strict";

exports.__esModule = true;
exports.confirmOrder = exports.processOrder = exports.updateCustomerDetails = exports.createOrder = undefined;

var _add_order = require("../database/api/add_order");

var _add_order2 = _interopRequireDefault(_add_order);

var _db_updates = require("../database/api/db_updates");

var _form_validator = require("./form_validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOrder = exports.createOrder = function createOrder(_ref, _ref2, cb) {
  var formData = _ref.formData;
  var session = _ref.session;
  var logger = _ref2.logger;
  var queryDb = _ref2.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    return cb({ err: { message: 'session timed out', statusCode: 401 } });
  }

  var _validateOrderData = (0, _form_validator.validateOrderData)(formData);

  var err = _validateOrderData.err;
  var orderData = _validateOrderData.orderData;

  if (err) {
    return cb({ err: err });
  }

  var category = orderData.category;
  var product = orderData.product;
  var first_name = orderData.first_name;
  var last_name = orderData.last_name;
  var email = orderData.email;
  var phone_number = orderData.phone_number;
  var image_count = orderData.image_count;

  var userid = user.id;
  var queryParams = [userid, category, product, first_name, last_name, email, phone_number, image_count];

  (0, _add_order2.default)(queryParams, { logger: logger, queryDb: queryDb }, function (err, result) {
    cb({ err: err, orderData: orderData, result: result });
  });
};

var updateCustomerDetails = exports.updateCustomerDetails = function updateCustomerDetails(_ref3, _ref4, cb) {
  var formData = _ref3.formData;
  var session = _ref3.session;
  var logger = _ref4.logger;
  var queryDb = _ref4.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    return cb({ err: { message: 'session timed out', statusCode: 401 } });
  }

  var _validateOrderData2 = (0, _form_validator.validateOrderData)(formData);

  var err = _validateOrderData2.err;
  var orderData = _validateOrderData2.orderData;

  if (err) {
    return cb({ err: err });
  }

  var category = orderData.category;
  var product = orderData.product;
  var first_name = orderData.first_name;
  var last_name = orderData.last_name;
  var email = orderData.email;
  var phone_number = orderData.phone_number;
  var image_count = orderData.image_count;

  var userid = user.id;
  var queryParams = [userid, category, product, first_name, last_name, email, phone_number, image_count];

  (0, _db_updates.updateOrder)(queryParams, { logger: logger, queryDb: queryDb }, function (err, result) {
    cb({ err: err, orderData: orderData, result: result });
  });
};

var processOrder = exports.processOrder = function processOrder(_ref5, _ref6, cb) {
  var params = _ref5.params;
  var body = _ref5.body;
  var session = _ref5.session;
  var logger = _ref6.logger;
  var queryDb = _ref6.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    return cb({ err: { message: 'session timed out', statusCode: 401 } });
  }

  var _validateProcessOrder = (0, _form_validator.validateProcessOrderData)(body);

  var err = _validateProcessOrder.err;
  var orderData = _validateProcessOrder.orderData;

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
  var params = _ref7.params;
  var body = _ref7.body;
  var session = _ref7.session;
  var logger = _ref8.logger;
  var queryDb = _ref8.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    return cb({ err: { message: 'session timed out', statusCode: 401 } });
  }

  var _validateConfirmOrder = (0, _form_validator.validateConfirmOrderData)(body);

  var err = _validateConfirmOrder.err;
  var orderData = _validateConfirmOrder.orderData;

  if (err) {
    return cb({ err: err });
  }

  var order_id = orderData.order_id;
  var _orderData$order_name = orderData.order_name;
  var order_name = _orderData$order_name === undefined ? null : _orderData$order_name;

  var userid = user.id;
  var queryParams = [userid, order_id, 'confirmed', order_name];

  (0, _db_updates.updateOrder)(queryParams, { logger: logger, queryDb: queryDb }, function (err, result) {
    cb({ err: err, orderData: orderData, result: result });
  });
};
//# sourceMappingURL=api_executor.js.map