"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _select_from_orders = require("../database/api/select_from_orders");

var _select_from_orders2 = _interopRequireDefault(_select_from_orders);

var _request_builder = require("../request_builder");

var _request_builder2 = _interopRequireDefault(_request_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestBuilder = function RequestBuilder(_ref, _ref2) {
  var orderid = _ref.orderid,
      userid = _ref.userid;
  var logger = _ref2.logger,
      queryDb = _ref2.queryDb,
      redisClient = _ref2.redisClient;

  var _StaticRequests = (0, _request_builder2.default)({ logger: logger, queryDb: queryDb, redisClient: redisClient }),
      products = _StaticRequests.products,
      categories = _StaticRequests.categories;

  var orderInfo = function orderInfo(callback) {
    _async2.default.parallel({
      order: function order(cb) {
        redisClient.hgetall("order_id_" + orderid, function (err, res) {
          if (!err && res) {
            res.albums = JSON.parse(res.albums);
          }
          // TODO: Fetch from db once data is synced
          cb(err, res);
        });
      },
      files: function files(cb) {
        redisClient.zrange("order_id_" + orderid + ":files", [0, -1], function (err, res) {
          if (err) return cb(err);

          cb(null, res);
        });
      }
    }, function (err, results) {
      callback(err, results);
    });
  };

  return { products: products, categories: categories, orderInfo: orderInfo };
};

exports.default = RequestBuilder;
//# sourceMappingURL=view_order.js.map