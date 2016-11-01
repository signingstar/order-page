"use strict";

exports.__esModule = true;

var _fetch_order_details = require("../database/api/fetch_order_details");

var images = function images(orderid, modules, cb) {
  (0, _fetch_order_details.getAllImages)([orderid], modules, function (err, res) {
    if (err) return cb(err);
    cb(err, res[0].files);
  });
};

exports.default = images;
//# sourceMappingURL=raw_images.js.map