'use strict';

exports.__esModule = true;

var _globals = require('../../globals');

//Returns {"3bbb7a37a0f34b3f958582802d8d6dba":{"likes":1,"liked":[],"albumId":"465"}}
var parseReactions = function parseReactions(obj, userId, albumId) {
  if (!obj) {
    return;
  }

  var reactionObj = { likes: false, liked: [], albumId: albumId };

  for (var index in obj) {
    var _JSON$parse = JSON.parse(obj[index]),
        user_name = _JSON$parse.user_name,
        reaction = _JSON$parse.reaction;

    if (index === 'force_qualify') {
      reactionObj.forceQualify = { name: user_name, reaction_type: reaction };
    } else if (index === userId) {
      reactionObj[_globals.LIKES] = +reaction;
      reactionObj[_globals.LIKED].push({ name: 'You', reaction_type: reaction });
    } else {
      reactionObj[_globals.LIKED].push({ name: user_name, reaction_type: reaction });
    }
  }

  return reactionObj;
};

var imageReaction = function imageReaction(_ref, _ref2, cb) {
  var order_id = _ref.order_id,
      image_id = _ref.image_id,
      user_id = _ref.user_id,
      album_id = _ref.album_id;
  var redisClient = _ref2.redisClient;

  if (!image_id) {
    return cb(null, undefined);
  }

  redisClient.hgetall('order_id_' + order_id + ':files:' + image_id, function (err, res) {
    if (!err && res !== null) {
      var _cb;

      cb(null, (_cb = {}, _cb[image_id] = parseReactions(res, user_id, album_id), _cb));
    } else {
      cb(err);
    }
  });
};

exports.default = imageReaction;
//# sourceMappingURL=image_reactions.js.map