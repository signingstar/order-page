'use strict';

exports.__esModule = true;
exports.updateAlbum = exports.addAlbum = undefined;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var START_PRIORITY = 100;
var END_PRIORITY = 1000;
var STEP_PRIORITY = 20;

var getRandomInt = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var addAlbum = exports.addAlbum = function addAlbum(_ref, _ref2, cb) {
  var order_id = _ref.order_id;
  var redisClient = _ref2.redisClient;

  _async2.default.waterfall([function (done) {
    redisClient.hgetall('order_id_' + order_id, function (err, orderData) {
      //TODO fetch albums directly
      if (err) return done(err);
      done(err, orderData || {});
    });
  }, function (orderData, done) {
    var albums = orderData.albums;

    albums = albums ? JSON.parse(albums) : [];

    var album_id = getRandomInt(START_PRIORITY, END_PRIORITY);
    var album_name = 'Album-' + album_id;
    var priority = albums.length ? albums[albums.length - 1].priority + STEP_PRIORITY : START_PRIORITY;

    albums.push({ album_id: album_id, album_name: album_name, priority: priority });

    redisClient.hmset('order_id_' + order_id, ['albums', JSON.stringify(albums)], function (err, data) {
      if (err) return done(err);
      done(null, { album_id: album_id, album_name: album_name, priority: priority });
    });
  }, function (albumData, done) {
    cb(null, albumData);
  }], function (err) {
    return cb(err);
  });
};

var updateAlbum = exports.updateAlbum = function updateAlbum(_ref3, _ref4, cb) {
  var order_id = _ref3.order_id;
  var mapping = _ref3.mapping;
  var redisClient = _ref4.redisClient;

  _async2.default.waterfall([function (done) {
    redisClient.hget('order_id_' + order_id, 'albums', function (err, albums) {
      //TODO fetch albums directly
      albums = albums ? JSON.parse(albums) : undefined;

      if (albums && albums.length) return done(err, albums);

      done(err);
    });
  }, function (albums, done) {
    var updateCount = 0;
    albums.forEach(function (album) {
      var album_id = album.album_id;
      var priority = album.priority;


      if (mapping[album_id]) {
        album.priority = mapping[album_id];
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
//# sourceMappingURL=album.js.map