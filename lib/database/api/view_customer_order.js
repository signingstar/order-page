"use strict";

exports.__esModule = true;

var _select = require("../query/select");

var viewOrder = function viewOrder(orderData, modules, cb) {
  var queryDb = modules.queryDb;
  var logger = modules.logger;

  var callback = cb;

  queryDb(_select.viewCustomerOrder, orderData, { logger: logger }, function (err, result) {
    if (err || result.rowCount === 0) {
      logger.error("[DATABASE] error while fetching the order");
      callback(err, result);
      return;
    }

    logger.info("[DATABASE] Order fetched successfully for user: " + orderData[0]);
    callback(err, result.rows[0]);
  });
};

exports.default = viewOrder;
//# sourceMappingURL=view_customer_order.js.map