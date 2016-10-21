"use strict";

exports.__esModule = true;
var customerOrder = exports.customerOrder = "select * from orders.viewCustomerOrder($1, $2, $3)";

var products = exports.products = "select id, name, description from orders.product;";

var categories = exports.categories = "select id, name, description from orders.category;";

var ownerOrders = exports.ownerOrders = "\n    SELECT o.id, o.status, o.category_id, u.email, u.first_name, u.last_name, u.phone_number FROM orders.order o INNER JOIN user_account.users u\n    ON o.on_behalf = u.id\n    WHERE o.user_id=$1\n    ORDER BY o.status ASC, o.id DESC\n  ";
//# sourceMappingURL=select.js.map