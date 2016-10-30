"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _select_from_orders = require("../database/api/select_from_orders");

var _select_from_orders2 = _interopRequireDefault(_select_from_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var categories = function categories(_ref, cb) {
  var redisClient = _ref.redisClient,
      queryDb = _ref.queryDb,
      logger = _ref.logger;

  _async2.default.waterfall([function (done) {
    redisClient.zrangebyscore(['categories', 1, 99], function (err, res) {
      done(err, res);
    });
  }, function (categoryList, done) {
    if (!categoryList || categoryList.length === 0) {
      (0, _select_from_orders2.default)('categories', { logger: logger, queryDb: queryDb }, function (err, res) {
        for (var _iterator = res || [], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
          }

          var category = _ref2;
          var id = category.id,
              name = category.name,
              description = category.description;

          redisClient.zadd(['categories', id, JSON.stringify({ id: id, name: name, description: description })]);
        }

        return cb(err, res);
      });
    } else {
      cb(null, categoryList.map(function (category) {
        return JSON.parse(category);
      }));
    }
  }], function (err) {
    cb(err);
  });
};

exports.default = categories;
//# sourceMappingURL=categories.js.map