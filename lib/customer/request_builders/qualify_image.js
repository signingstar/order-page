'use strict';

exports.__esModule = true;
var forceQualifyImage = function forceQualifyImage(_ref, _ref2, cb) {
  var order_id = _ref.order_id,
      user = _ref.user,
      reaction = _ref.reaction,
      image_id = _ref.image_id;
  var redisClient = _ref2.redisClient;


  var fileToUserMap = {
    user_name: user.first_name,
    reaction: reaction
  };

  redisClient.hset('order_id_' + order_id + ':files:' + image_id, ['force_qualify', JSON.stringify(fileToUserMap)], function (err, result) {
    cb(err, result);
  });
};

exports.default = forceQualifyImage;
//# sourceMappingURL=qualify_image.js.map