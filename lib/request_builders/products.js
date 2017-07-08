"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _select_from_orders = require("../database/api/select_from_orders");

var _select_from_orders2 = _interopRequireDefault(_select_from_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var products = function products(_ref, cb) {
  var redisClient = _ref.redisClient,
      queryDb = _ref.queryDb,
      logger = _ref.logger;

  _async2.default.waterfall([function (done) {
    redisClient.zrangebyscore(['products', 1, 99], function (err, res) {
      done(err, res);
    });
  }, function (productList, done) {
    if (!productList || productList.length === 0) {
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
          var id = product.id,
              name = product.name,
              description = product.description;

          redisClient.zadd(['products', id, JSON.stringify({ id: id, name: name, description: description })]);
        }

        return cb(err, res);
      });
    } else {
      cb(null, productList.map(function (product) {
        return JSON.parse(product);
      }));
    }
  }], function (err) {
    cb(err);
  });
};

exports.default = products;