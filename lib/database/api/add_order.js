"use strict";

exports.__esModule = true;

var _insert = require("../query/insert");

var createOrder = function createOrder(orderData, modules, cb) {
  var queryDb = modules.queryDb,
      logger = modules.logger;

  var callback = cb;

  queryDb(_insert.addOrder, orderData, { logger: logger }, function (err, result) {
    if (err || result.rowCount === 0) {
      logger.error("[DATABASE] error while adding the order");
      callback(err, result);
      return;
    }

    logger.info("[DATABASE] Order added successfully for user: " + orderData[0]);
    callback(err, result.rows[0]);
  });
};

exports.default = createOrder;
//# sourceMappingURL=add_order.js.map