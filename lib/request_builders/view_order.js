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
  var orderid = _ref.orderid;
  var userid = _ref.userid;
  var logger = _ref2.logger;
  var queryDb = _ref2.queryDb;
  var redisClient = _ref2.redisClient;

  var _StaticRequests = (0, _request_builder2.default)({ logger: logger, queryDb: queryDb, redisClient: redisClient });

  var products = _StaticRequests.products;
  var categories = _StaticRequests.categories;

  var order = function order(cb) {
    _async2.default.parallel({});
    _async2.default.waterfall([function (done) {
      redisClient.hgetall("order_id_" + orderid, function (err, res) {
        if (!err && res) {
          res.albums = JSON.parse(res.albums);
        }
        done(err, res);
      });
    }, function (order, done) {
      if (!order || order.length === 0) {
        // TODO: Fetch from db once data is synced
      } else {
        cb(null, order);
      }
    }], function (err) {
      cb(err);
    });
  };

  return { products: products, categories: categories, order: order };
};

exports.default = RequestBuilder;
//# sourceMappingURL=view_order.js.map