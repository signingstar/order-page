"use strict";

exports.__esModule = true;

var _redux = require("redux");

var _order = require("./order");

var _order2 = _interopRequireDefault(_order);

var _error = require("./error");

var _error2 = _interopRequireDefault(_error);

var _products = require("./products");

var _products2 = _interopRequireDefault(_products);

var _categories = require("./categories");

var _categories2 = _interopRequireDefault(_categories);

var _albums = require("./albums");

var _albums2 = _interopRequireDefault(_albums);

var _image_list = require("./image_list");

var _image_list2 = _interopRequireDefault(_image_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderApp = (0, _redux.combineReducers)({
  products: _products2.default,
  categories: _categories2.default,
  order: _order2.default,
  albums: _albums2.default,
  imageList: _image_list2.default,
  error: _error2.default
});

exports.default = orderApp;
//# sourceMappingURL=index.js.map