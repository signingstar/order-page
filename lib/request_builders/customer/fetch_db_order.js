"use strict";

exports.__esModule = true;

var _view_order = require("../../database/api/view_order");

var orderResult = function orderResult(_ref, modules, cb) {
  var user_id = _ref.user_id,
      order_id = _ref.order_id,
      email = _ref.email;


  (0, _view_order.viewCustomerOrder)([user_id, order_id, email], modules, function (err, orderResults) {
    if (err || !orderResults[0]) cb(err);

    cb(err, Object.assign(orderResults[0], { id: order_id }));
  });
};

exports.default = orderResult;
//# sourceMappingURL=fetch_db_order.js.map