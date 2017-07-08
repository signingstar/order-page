"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderInfo = function orderInfo(_ref, _ref2, callback) {
  var order_id = _ref.order_id;
  var redisClient = _ref2.redisClient;

  redisClient.hgetall("order_id_" + order_id, function (err, res) {
    if (!err && res) {
      res.albums = JSON.parse(res.albums);
    }
    // TODO: Fetch from db once data is synced
    callback(err, res);
  });
};

exports.default = orderInfo;