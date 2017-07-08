'use strict';

exports.__esModule = true;
var albums = function albums(orderid, _ref, cb) {
  var redisClient = _ref.redisClient;

  redisClient.hget('order_id_' + orderid, 'albums', function (err, res) {
    if (err) return cb(err);

    cb(null, JSON.parse(res));
  });
};

exports.default = albums;