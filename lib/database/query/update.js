"use strict";

exports.__esModule = true;
var updateOrderTable = exports.updateOrderTable = "UPDATE orders.order SET status=$3 WHERE user_id=$1 AND id=$2";

var addAdditionalUser = exports.addAdditionalUser = "UPDATE orders.order\n                                  SET additional_users=jsonb_insert(additional_users, $1, $2::jsonb)\n                                  WHERE id=$3 AND on_behalf=$4";

var updateAdditionalUser = exports.updateAdditionalUser = "UPDATE orders.order SET additional_users=jsonb_set(additional_users, $1, $2, true)  where id=$3 AND user_id=$4";
//# sourceMappingURL=update.js.map