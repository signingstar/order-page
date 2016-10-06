'use strict';

exports.__esModule = true;
exports.viewOrderAsCustomer = exports.createOrder = undefined;

var _form_validator = require('./form_validator');

var createOrder = exports.createOrder = function createOrder(_ref, _ref2) {
  var params = _ref.params;
  var body = _ref.body;
  var session = _ref.session;
  var responders = _ref2.responders;
  var logger = _ref2.logger;
  var queryDb = _ref2.queryDb;
  var user = session.user;

  if (!user || !user.id) {
    responders.json(null, { message: 'session timed out' }, 401);
    return;
  }

  var _validateOrderData = validateOrderData(body);

  var err = _validateOrderData.err;
  var formData = _validateOrderData.formData;

  if (err) {
    responders.json(err, { message: 'Bad Input' }, 400);
    return;
  }

  var category = formData.category;
  var product = formData.product;
  var first_name = formData.first_name;
  var last_name = formData.last_name;
  var email = formData.email;
  var phone_number = formData.phone_number;
  var image_count = formData.image_count;

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
  var orderId = _ref3.orderId;
  var session = _ref3.session;
  var location = _ref3.location;
  var responders = _ref4.responders;
  var logger = _ref4.logger;
  var queryDb = _ref4.queryDb;
  var user = session.user;


  if (!user || !user.id) {
    responders.redirectForAuthentication(location, "authenticate", logger);
    return;
  }

  var _validateCustomerLink = (0, _form_validator.validateCustomerLinkData)({ orderId: orderId });

  var err = _validateCustomerLink.err;
  var formData = _validateCustomerLink.formData;

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
//# sourceMappingURL=api_executor.js.map