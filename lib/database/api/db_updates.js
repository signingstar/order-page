"use strict";

exports.__esModule = true;
exports.updateOrderToConfirm = exports.updateUser = exports.addUser = exports.updateOrder = undefined;

var _update = require("../query/update");

var updateDatabaseEntry = function updateDatabaseEntry(query, params, modules, cb) {
  var queryDb = modules.queryDb;
  var logger = modules.logger;

  var callback = cb;

  queryDb(query, params, { logger: logger }, function (err, result) {
    if (err || result.rowCount === 0) {
      logger.error("[DATABASE] error while updating Record");
      callback(err, result);
      return;
    }

    logger.info("[DATABASE] Record updated successfully");
    callback(err, result.rowCount);
  });
};

var updateOrder = exports.updateOrder = function updateOrder() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return updateDatabaseEntry.apply(undefined, [_update.updateOrderTable].concat(args));
};

var addUser = exports.addUser = function addUser() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return updateDatabaseEntry.apply(undefined, [_update.addAdditionalUser].concat(args));
};

var updateUser = exports.updateUser = function updateUser() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return updateDatabaseEntry.apply(undefined, [_update.updateAdditionalUser].concat(args));
};

var updateOrderToConfirm = exports.updateOrderToConfirm = function updateOrderToConfirm() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return updateDatabaseEntry.apply(undefined, [_update.updateToConfirmOrder].concat(args));
};
//# sourceMappingURL=db_updates.js.map