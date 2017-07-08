"use strict";

exports.__esModule = true;

var _db_updates = require("../../database/api/db_updates");

var qualifyImage = function qualifyImage(_ref, _ref2, cb) {
  var order_id = _ref.order_id,
      user = _ref.user,
      reaction = _ref.reaction,
      image_id = _ref.image_id;
  var queryDb = _ref2.queryDb,
      logger = _ref2.logger;


  var fileToUserMap = {
    user_name: user.first_name,
    reaction: reaction
  };

  (0, _db_updates.forceQualifyImage)([order_id, image_id, fileToUserMap], { queryDb: queryDb, logger: logger }, function (err, result) {
    cb(err, result);
  });

  // redisClient.hset(`order_id_${order_id}:files:${image_id}`, ['force_qualify', JSON.stringify(fileToUserMap)], (err, result) => {
  //   cb(err, result)
  // })
};

exports.default = qualifyImage;