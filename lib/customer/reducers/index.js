"use strict";

exports.__esModule = true;

var _redux = require("redux");

var _product = require("./product");

var _product2 = _interopRequireDefault(_product);

var _customer = require("./customer");

var _customer2 = _interopRequireDefault(_customer);

var _order = require("./order");

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderApp = (0, _redux.combineReducers)({
  product: _product2.default,
  customer: _customer2.default,
  order: _order2.default
});

exports.default = orderApp;
//# sourceMappingURL=index.js.map