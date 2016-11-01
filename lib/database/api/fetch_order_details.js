"use strict";

exports.__esModule = true;
exports.getAllImages = undefined;

var _select = require("../query/select");

var fetchOrderDetails = function fetchOrderDetails(query, orderData, modules, cb) {
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

var getAllImages = exports.getAllImages = function getAllImages() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return fetchOrderDetails.apply(undefined, [_select.getFiles].concat(args));
};
//# sourceMappingURL=fetch_order_details.js.map