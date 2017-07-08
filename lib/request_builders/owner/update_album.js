'use strict';

exports.__esModule = true;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateAlbum = function updateAlbum(_ref, _ref2, cb) {
  var order_id = _ref.order_id,
      mapping = _ref.mapping;
  var redisClient = _ref2.redisClient;

  _async2.default.waterfall([function (done) {
    redisClient.hget('order_id_' + order_id, 'albums', function (err, albums) {
      albums = albums ? JSON.parse(albums) : undefined;

      if (albums && albums.length) return done(err, albums);

      done(err);
    });
  }, function (albums, done) {
    var updateCount = 0;
    albums.forEach(function (album) {
      var id = album.id,
          priority = album.priority;


      if (mapping[id]) {
        album.priority = mapping[id];
        updateCount++;
      }
    });

    if (updateCount) {
      albums.sort(function (prev, curr) {
        return prev.priority - curr.priority;
      });

      redisClient.hmset('order_id_' + order_id, ['albums', JSON.stringify(albums)], function (err, data) {
        if (err) return done(err);
        done(null, { count: updateCount });
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

exports.default = updateAlbum;