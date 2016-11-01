"use strict";

exports.__esModule = true;
var customerOrder = exports.customerOrder = "select * from orders.viewCustomerOrder($1, $2, $3)";

var products = exports.products = "select id, name, description from orders.product;";

var categories = exports.categories = "select id, name, description from orders.category;";

var ownerOrders = exports.ownerOrders = "\n    SELECT o.id, o.status, o.category_id, u.email, u.first_name, u.last_name, u.phone_number FROM orders.order o INNER JOIN user_account.users u\n    ON o.on_behalf = u.id\n    WHERE o.user_id=$1\n    ORDER BY o.status ASC, o.id DESC\n  ";

var lastOpenOrder = exports.lastOpenOrder = "\n  SELECT * FROM orders.order WHERE id IN (\n    SELECT id FROM orders.order\n    WHERE user_id = $1\n    ORDER BY updated_at DESC LIMIT 1\n  )\n  AND status < 'confirmed'";

var getFiles = exports.getFiles = "SELECT files\n  FROM orders.order_item oi\n  WHERE order_id = $1;";

// export const sampleImageQuery = `select files #> '{0}' from orders.order_item where order_id=148 and files #> '{0}' @> '{"id":"aaeb1758526a4a0f8d81bb0a2472dca7"}';`

// export const multipleFieldQuery = `select section ->> 'id', section ->> 'originalname' from orders.order_item t
//     cross join jsonb_array_elements(files) section
//     where order_id=148`


// export const multipleFieldQueryForObject = ` select files #> array[section, 'originalname'] from orders.order_item t
// cross join jsonb_object_keys(files) section
// where order_id=148`


// select files #> array[section] ->> 'index', section from orders.order_item t
//    cross join jsonb_object_keys(files) section
//    where order_id=148 and files #>> array[section, 'index'] >= '0'
//    order by files #>> array[section, 'index'] ;
//# sourceMappingURL=select.js.map