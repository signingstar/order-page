"use strict";

exports.__esModule = true;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeFile = function removeFile(redisClient, key, entry, cb) {
  var _JSON$parse = JSON.parse(entry),
      destination = _JSON$parse.destination,
      filename = _JSON$parse.filename;

  var filePath = destination + "/" + filename;

  _fs2.default.unlink(filePath, function (err) {
    if (!err) {
      redisClient.zrem(key, entry, function (err, data) {
        if (cb) cb(err, { count: 1 });
      });
    }
  });
};

exports.default = removeFile;