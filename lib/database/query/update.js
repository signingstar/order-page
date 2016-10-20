"use strict";

exports.__esModule = true;
var updateOrderTable = exports.updateOrderTable = "UPDATE orders.order SET status=$3, short_name=COALESCE($4, short_name) WHERE user_id=$1 AND id=$2";

var addAdditionalUser = exports.addAdditionalUser = "UPDATE orders.order\n                                  SET additional_users=jsonb_set(additional_users, ARRAY[$1], $2::jsonb, true)\n                                  WHERE id=$3 AND on_behalf=$4";
//# sourceMappingURL=update.js.map