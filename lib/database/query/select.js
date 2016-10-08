"use strict";

exports.__esModule = true;
var viewCustomerOrder = exports.viewCustomerOrder = "select * from orders.viewCustomerOrder($1, $2)";

var products = exports.products = "select id, name, description from orders.product;";

var categories = exports.categories = "select id, name, description from orders.category;";
//# sourceMappingURL=select.js.map