"use strict";

exports.__esModule = true;
var setImageReaction = function setImageReaction(_ref, _ref2, cb) {
  var order_id = _ref.order_id,
      user = _ref.user,
      reaction = _ref.reaction,
      image_id = _ref.image_id;
  var redisClient = _ref2.redisClient;

  var fileToUserMap = {
    user_name: user.first_name,
    reaction: reaction
  };

  redisClient.hset("order_id_" + order_id + ":files:" + image_id, [user.id, JSON.stringify(fileToUserMap)]);

  var userToFileMap = {
    image_id: image_id,
    reaction: reaction
  };

  redisClient.zadd(["order_id_" + order_id + ":users:" + user.id, +new Date(), JSON.stringify(userToFileMap)]);
};

exports.default = setImageReaction;
//# sourceMappingURL=set_image_reaction.js.map