'use strict';

exports.__esModule = true;
exports.finalizeCustomerOrder = exports.viewOrderAsCustomer = exports.createOrder = undefined;

var _db_updates = require('../../database/api/db_updates');

var createOrder = exports.createOrder = function createOrder(_ref, _ref2) {
  var params = _ref.params,
      body = _ref.body,
      session = _ref.session;
  var responders = _ref2.responders,
      logger = _ref2.logger,
      queryDb = _ref2.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    responders.json(null, { message: 'session timed out' }, 401);
    return;
  }

  var _validateOrderData = validateOrderData(body),
      err = _validateOrderData.err,
      formData = _validateOrderData.formData;

  if (err) {
    responders.json(err, { message: 'Bad Input' }, 400);
    return;
  }

  var category = formData.category,
      product = formData.product,
      first_name = formData.first_name,
      last_name = formData.last_name,
      email = formData.email,
      phone_number = formData.phone_number,
      image_count = formData.image_count;

  var userid = user.id;
  var orderData = [userid, category, product, first_name, last_name, email, phone_number, image_count];

  addOrder(orderData, { logger: logger, queryDb: queryDb }, function (err, result) {
    if (!err) {
      responders.json(result);
    }
    responders.json(null, { message: 'Internal Server Error' }, 500);
  });
};

var viewOrderAsCustomer = exports.viewOrderAsCustomer = function viewOrderAsCustomer(_ref3, _ref4) {
  var orderId = _ref3.orderId,
      session = _ref3.session,
      location = _ref3.location;
  var responders = _ref4.responders,
      logger = _ref4.logger,
      queryDb = _ref4.queryDb;
  var user = session.user;


  if (!user || !user.id) {
    responders.redirectForAuthentication(location, "authenticate", logger);
    return;
  }

  var _validateCustomerLink = validateCustomerLinkData({ orderId: orderId }),
      err = _validateCustomerLink.err,
      formData = _validateCustomerLink.formData;

  if (err) {
    responders.json(err, { message: 'Bad Input' }, 400);
    return;
  }

  var userid = user.id;
  var orderData = [userid, formData.orderId];

  viewCustomerOrder(orderData, { logger: logger, queryDb: queryDb }, function (err, result) {
    if (!err) {
      responders.json(result);
    }
    responders.json(null, { message: 'Internal Server Error' }, 500);
  });
};

var finalizeCustomerOrder = exports.finalizeCustomerOrder = function finalizeCustomerOrder(_ref5, _ref6, cb) {
  var params = _ref5.params,
      body = _ref5.body,
      userId = _ref5.userId;
  var logger = _ref6.logger,
      queryDb = _ref6.queryDb;
  var order_id = body.order_id;

  var queryParams = [userId, order_id, 'review_complete'];

  (0, _db_updates.updateOrderToFinalize)(queryParams, { logger: logger, queryDb: queryDb }, function (err, result) {
    cb({ err: err, orderData: orderData, result: result });
  });
};