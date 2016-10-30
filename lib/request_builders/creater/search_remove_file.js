"use strict";

exports.__esModule = true;
exports.searchImage = undefined;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _remove_file = require("./remove_file");

var _remove_file2 = _interopRequireDefault(_remove_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchImage = exports.searchImage = function searchImage(_ref, _ref2, cb) {
  var order_id = _ref.order_id,
      album_id = _ref.album_id,
      filename = _ref.filename;
  var redisClient = _ref2.redisClient;

  var key = "order_id_" + order_id + ":files";

  _async2.default.waterfall([function (done) {
    redisClient.zrange(key, [0, -1], function (err, files) {
      done(err, files);
    });
  }, function (files, done) {
    var fileObj = files.find(function (file) {
      var jsonFile = JSON.parse(file);
      return filename === jsonFile.originalname && jsonFile.album_id === album_id;
    });

    if (fileObj) {
      (0, _remove_file2.default)(redisClient, key, fileObj, function (err, data) {
        if (err) return done(err);
        done(null, { count: 1 });
      });
    } else {
      done(null, { count: 0 });
    }
  }, function (updateCount, done) {
    cb(null, updateCount);
  }], function (err) {
    return cb(err);
  });
};

exports.default = searchImage;
//# sourceMappingURL=search_remove_file.js.map