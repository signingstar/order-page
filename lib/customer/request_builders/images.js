"use strict";

exports.__esModule = true;
var images = function images(orderid, _ref, cb) {
  var redisClient = _ref.redisClient;

  redisClient.zrange("order_id_" + orderid + ":files", [0, -1], function (err, res) {
    if (err) return cb(err);
    var images = res.map(function (image) {
      return JSON.parse(image);
    });
    cb(err, images);
  });
};

exports.default = images;
//# sourceMappingURL=images.js.map