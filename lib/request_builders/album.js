"use strict";

exports.__esModule = true;
exports.removeImage = exports.removeAlbum = exports.updateAlbum = exports.addAlbum = undefined;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

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
    redisClient.hgetall("order_id_" + order_id, function (err, orderData) {
      //TODO fetch albums directly
      if (err) return done(err);
      done(err, orderData || {});
    });
  }, function (orderData, done) {
    var albums = orderData.albums;

    albums = albums ? JSON.parse(albums) : [];

    var id = getRandomInt(START_PRIORITY, END_PRIORITY).toString();
    var name = "Album-" + id;
    var priority = albums.length ? albums[albums.length - 1].priority + STEP_PRIORITY : START_PRIORITY;

    albums.push({ id: id, name: name, priority: priority });

    redisClient.hmset("order_id_" + order_id, ['albums', JSON.stringify(albums)], function (err, data) {
      if (err) return done(err);
      done(null, { id: id, name: name, priority: priority });
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
    redisClient.hget("order_id_" + order_id, 'albums', function (err, albums) {
      //TODO fetch albums directly
      albums = albums ? JSON.parse(albums) : undefined;

      if (albums && albums.length) return done(err, albums);

      done(err);
    });
  }, function (albums, done) {
    var updateCount = 0;
    albums.forEach(function (album) {
      var id = album.id;
      var priority = album.priority;


      if (mapping[id]) {
        album.priority = mapping[id];
        updateCount++;
      }
    });

    if (updateCount) {
      albums.sort(function (prev, curr) {
        return prev.priority - curr.priority;
      });

      redisClient.hmset("order_id_" + order_id, ['albums', JSON.stringify(albums)], function (err, data) {
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

var removeAlbum = exports.removeAlbum = function removeAlbum(_ref5, _ref6, callback) {
  var order_id = _ref5.order_id;
  var album_id = _ref5.album_id;
  var redisClient = _ref6.redisClient;


  _async2.default.parallel({
    removeAlbumFiles: function removeAlbumFiles(cb) {
      var key = "order_id_" + order_id + ":files";
      redisClient.zrange(key, [0, -1], function (err, files) {
        if (err) return cb(err);

        files.forEach(function (file) {
          return album_id === JSON.parse(file).album_id ? removeFile(redisClient, key, file) : 'noop';
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

var removeFile = function removeFile(redisClient, key, entry, cb) {
  var _JSON$parse = JSON.parse(entry);

  var destination = _JSON$parse.destination;
  var filename = _JSON$parse.filename;

  var filePath = destination + "/" + filename;

  _fs2.default.unlink(filePath, function (err) {
    if (!err) {
      redisClient.zrem(key, entry, function (err, data) {
        if (cb) cb(err, { count: 1 });
      });
    }
  });
};

var removeImage = exports.removeImage = function removeImage(_ref7, _ref8, cb) {
  var order_id = _ref7.order_id;
  var album_id = _ref7.album_id;
  var filename = _ref7.filename;
  var redisClient = _ref8.redisClient;

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
      removeFile(redisClient, key, fileObj, function (err, data) {
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
//# sourceMappingURL=album.js.map