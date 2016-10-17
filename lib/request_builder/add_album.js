"use strict";

exports.__esModule = true;
exports.addAlbum = undefined;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var START_PRIORITY = 100;
var END_PRIORITY = 1000;
var STEP_PRIORITY = 20;

var getRandomInt = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var addAlbum = exports.addAlbum = function addAlbum(_ref, _ref2, cb) {
  var redisClient = _ref2.redisClient;

  _objectDestructuringEmpty(_ref);

  _async2.default.waterfall([function (done) {
    redisClient.hgetall("order_id_" + order_id, function (err, orderData) {
      //TODO fetch albums directly
      done(err, orderData);
    });
  }, function (orderData, done) {
    var albums = orderData.albums;

    albums = albums ? JSON.parse(albums) : [];

    var album_id = getRandomInt(START_PRIORITY, END_PRIORITY);
    var album_name = "Album-" + album_id;
    var priority = albums.length ? albums[albums.length - 1].priority + STEP_PRIORITY : START_PRIORITY;

    albums.push({ album_id: album_id, album_name: album_name, priority: priority });

    redisClient.hmset("order_id_" + order_id, ['albums', JSON.stringify(albums)], function (err, data) {
      if (err) return done(err);
      done(null, { album_id: album_id, album_name: album_name });
    });
  }, function (albumData, done) {
    cb(null, albumData);
  }], function (err) {
    return cb(err);
  });
};
//# sourceMappingURL=add_album.js.map