"use strict";

exports.__esModule = true;

var _redux = require("redux");

var _product = require("./product");

var _product2 = _interopRequireDefault(_product);

var _customer = require("./customer");

var _customer2 = _interopRequireDefault(_customer);

var _order = require("./order");

var _order2 = _interopRequireDefault(_order);

var _error = require("./error");

var _error2 = _interopRequireDefault(_error);

var _products = require("./products");

var _products2 = _interopRequireDefault(_products);

var _categories = require("./categories");

var _categories2 = _interopRequireDefault(_categories);

var _image = require("./image");

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderApp = (0, _redux.combineReducers)({
  products: _products2.default,
  categories: _categories2.default,
  product: _product2.default,
  customer: _customer2.default,
  order: _order2.default,
  image: _image2.default,
  error: _error2.default
});

exports.default = orderApp;
//# sourceMappingURL=index.js.map