"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _select_from_orders = require("../../database/api/select_from_orders");

var _select_from_orders2 = _interopRequireDefault(_select_from_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderInfo = function orderInfo(_ref, _ref2, callback) {
  var orderid = _ref.orderid,
      userid = _ref.userid;
  var logger = _ref2.logger,
      queryDb = _ref2.queryDb,
      redisClient = _ref2.redisClient;

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

exports.default = orderInfo;
//# sourceMappingURL=view_order.js.map