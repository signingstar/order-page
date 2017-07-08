"use strict";

exports.__esModule = true;
exports.viewInProgressOrder = exports.viewOwnerOrders = exports.viewCustomerOrder = undefined;

var _select = require("../query/select");

var viewOrder = function viewOrder(query, orderData, modules, cb) {
  var queryDb = modules.queryDb,
      logger = modules.logger;

  var callback = cb;

  queryDb(query, orderData, { logger: logger }, function (err, result) {
    if (err || result.rowCount === 0) {
      logger.error("[DATABASE] error while fetching the order");
      callback(err, result);
      return;
    }

    logger.info("[DATABASE] Order fetched successfully for user: " + orderData[0]);
    callback(err, result.rows);
  });
};

var viewCustomerOrder = exports.viewCustomerOrder = function viewCustomerOrder() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return viewOrder.apply(undefined, [_select.customerOrder].concat(args));
};

var viewOwnerOrders = exports.viewOwnerOrders = function viewOwnerOrders() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return viewOrder.apply(undefined, [_select.ownerOrders].concat(args));
};

var viewInProgressOrder = exports.viewInProgressOrder = function viewInProgressOrder() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return viewOrder.apply(undefined, [_select.lastOpenOrder].concat(args));
};