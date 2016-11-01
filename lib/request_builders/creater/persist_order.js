"use strict";

exports.__esModule = true;

var _db_updates = require("../../database/api/db_updates");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var persistOrder = function persistOrder(_ref, modules, cb) {
  var order_name = _ref.order_name,
      category = _ref.category,
      order_info = _ref.order_info,
      images = _ref.images,
      userId = _ref.userId;

  var orderId = order_info.id;

  var imageMap = {};
  images.map(function (_ref2, index) {
    var id = _ref2.id,
        image = _objectWithoutProperties(_ref2, ["id"]);

    return imageMap[id] = Object.assign(image, { index: index });
  });

  // const { orderId, order_name = null, category = WEDDING} = order_info
  var queryParams = [userId, orderId, order_name, category, JSON.stringify(imageMap)];

  (0, _db_updates.persistConfirmOrder)(queryParams, modules, function (err, result) {
    cb(err, { result: 'success' });
  });
};

exports.default = persistOrder;
//# sourceMappingURL=persist_order.js.map