"use strict";

exports.__esModule = true;

var _redux = require("redux");

var _order = require("./order");

var _order2 = _interopRequireDefault(_order);

var _images = require("./images");

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderApp = (0, _redux.combineReducers)({
  order: _order2.default,
  images: _images2.default
});

exports.default = orderApp;
//# sourceMappingURL=index.js.map