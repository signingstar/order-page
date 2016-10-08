"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _select_from_orders = require("./database/api/select_from_orders");

var _select_from_orders2 = _interopRequireDefault(_select_from_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestBuilder = function RequestBuilder(_ref) {
  var logger = _ref.logger;
  var queryDb = _ref.queryDb;
  var redisClient = _ref.redisClient;

  var products = function products(cb) {
    _async2.default.waterfall([function (done) {
      redisClient.zrangebyscore(['products', 1, 99], function (err, res) {
        done(err, res);
      });
    }, function (products, done) {
      if (!products || products.length === 0) {
        (0, _select_from_orders2.default)('products', { logger: logger, queryDb: queryDb }, function (err, res) {
          for (var _iterator = res || [], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref2 = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref2 = _i.value;
            }

            var product = _ref2;
            var id = product.id;
            var name = product.name;
            var description = product.description;

            redisClient.zadd(['products', id, JSON.stringify({ id: id, name: name, description: description })]);
          }

          return cb(err, res);
        });
      } else {
        cb(null, products.map(function (product) {
          return JSON.parse(product);
        }));
      }
    }], function (err) {
      cb(err);
    });
  };

  var categories = function categories(cb) {
    _async2.default.waterfall([function (done) {
      redisClient.zrangebyscore(['categories', 1, 99], function (err, res) {
        done(err, res);
      });
    }, function (categories, done) {
      if (!categories || categories.length === 0) {
        (0, _select_from_orders2.default)('categories', { logger: logger, queryDb: queryDb }, function (err, res) {
          for (var _iterator2 = res || [], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref3 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref3 = _i2.value;
            }

            var category = _ref3;
            var id = category.id;
            var name = category.name;
            var description = category.description;

            redisClient.zadd(['categories', id, JSON.stringify({ id: id, name: name, description: description })]);
          }

          return cb(err, res);
        });
      } else {
        cb(null, categories.map(function (category) {
          return JSON.parse(category);
        }));
      }
    }], function (err) {
      cb(err);
    });
  };

  return { products: products, categories: categories };
};

exports.default = RequestBuilder;
//# sourceMappingURL=request_builder.js.map