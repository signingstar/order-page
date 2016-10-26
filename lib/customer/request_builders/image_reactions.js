"use strict";

exports.__esModule = true;
var parseReactions = function parseReactions(obj, userId, albumId) {
  if (!obj) {
    return;
  }

  var reactionObj = { likes: false, liked: [], albumId: albumId };

  for (var index in obj) {
    var jsonObj = JSON.parse(obj[index]);

    if (index === userId) {
      reactionObj[LIKES] = +jsonObj.reaction;
    } else {
      reactionObj[LIKED].push({ name: jsonObj.user_name, reaction_type: jsonObj.reaction });
    }
  }

  return reactionObj;
};

var imageReaction = function imageReaction(_ref, _ref2, cb) {
  var orderid = _ref.orderid;
  var image_id = _ref.image_id;
  var redisClient = _ref2.redisClient;

  if (!image_id) {
    return cb(null, undefined);
  }

  redisClient.hgetall("order_id_" + orderid + ":files:" + image_id, function (err, res) {
    if (!err && res !== null) {
      var _cb;

      cb(null, (_cb = {}, _cb[image_id] = parseReactions(res, user.id), _cb));
    } else {
      cb(err);
    }
  });
};

exports.default = imageReaction;
//# sourceMappingURL=image_reactions.js.map