"use strict";

exports.__esModule = true;

var _view_order = require("../../database/api/view_order");

var orderResult = function orderResult(orderQueryData, modules, cb) {
  (0, _view_order.viewCustomerOrder)(orderQueryData, modules, function (err, orderResults) {
    if (err || !orderResults[0]) cb(err);

    // orderResult.id = orderid

    cb(err, orderResults[0]);
  });
};

exports.default = orderResult;
//# sourceMappingURL=fetch_db_order.js.map