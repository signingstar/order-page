"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _remove_file = require("./remove_file");

var _remove_file2 = _interopRequireDefault(_remove_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeAlbum = function removeAlbum(_ref, _ref2, callback) {
  var order_id = _ref.order_id,
      album_id = _ref.album_id;
  var redisClient = _ref2.redisClient;

  _async2.default.parallel({
    removeAlbumFiles: function removeAlbumFiles(cb) {
      var key = "order_id_" + order_id + ":files";
      redisClient.zrange(key, [0, -1], function (err, files) {
        if (err) return cb(err);

        files.forEach(function (file) {
          return album_id === JSON.parse(file).album_id ? (0, _remove_file2.default)(redisClient, key, file) : 'noop';
        });
        cb(null);
      });
    },

    removeAlbumFromOrder: function removeAlbumFromOrder(cb) {
      _async2.default.waterfall([function (done) {
        redisClient.hget("order_id_" + order_id, 'albums', function (err, albums) {
          albums = albums ? JSON.parse(albums) : undefined;

          if (albums && albums.length) return done(err, albums);

          done(err);
        });
      }, function (albums, done) {
        var index = albums.findIndex(function (album) {
          return album.id === album_id;
        });

        if (index > -1) {
          albums.splice(index, 1);

          redisClient.hmset("order_id_" + order_id, ['albums', JSON.stringify(albums)], function (err, data) {
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
    }
  }, function (err, results) {
    callback(err, results.removeAlbumFromOrder);
  });
};

exports.default = removeAlbum;
//# sourceMappingURL=remove_album.js.map