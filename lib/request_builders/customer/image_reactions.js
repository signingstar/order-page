"use strict";

exports.__esModule = true;

var _globals = require("../../globals");

//Returns {"3bbb7a37a0f34b3f958582802d8d6dba":{"likes":1,"liked":[],"albumId":"465"}}
var parseReactions = function parseReactions(obj, userId, albumId, image) {
  if (!obj) {
    return;
  }

  var reactionObj = { likes: false, liked: [], albumId: albumId };

  for (var index in obj) {
    var _JSON$parse = JSON.parse(obj[index]),
        user_name = _JSON$parse.user_name,
        reaction = _JSON$parse.reaction;

    if (index === userId) {
      reactionObj[_globals.LIKES] = +reaction;
      reactionObj[_globals.LIKED].push({ name: 'You', reaction_type: reaction });
    } else {
      reactionObj[_globals.LIKED].push({ name: user_name, reaction_type: reaction });
    }
  }

  Object.assign(image, reactionObj);
};

var imageReaction = function imageReaction(_ref, _ref2, cb) {
  var order_id = _ref.order_id,
      image_id = _ref.image_id,
      user_id = _ref.user_id,
      album_id = _ref.album_id,
      files = _ref.files;
  var redisClient = _ref2.redisClient;


  if (image_id) {
    redisClient.hgetall("order_id_" + order_id + ":files:" + image_id, function (err, res) {
      if (!err && res !== null) {
        parseReactions(res, user_id, album_id, files[image_id]);
        cb(null);
      } else {
        cb(err);
      }
    });
  } else {
    (function () {
      var filesCount = Object.keys(files).length;
      var index = 0;

      var _loop = function _loop(_image_id) {
        redisClient.hgetall("order_id_" + order_id + ":files:" + _image_id, function (err, res) {
          if (!err && res !== null) {
            parseReactions(res, user_id, album_id, files[_image_id]);
          }

          if (err) {
            cb(err);
          }

          if (++index > filesCount - 1) {
            cb(null);
          }
        });
      };

      for (var _image_id in files) {
        _loop(_image_id);
      }
    })();
  }
};

exports.default = imageReaction;