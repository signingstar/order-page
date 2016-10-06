"use strict";

exports.__esModule = true;
exports.updateOrder = undefined;

var _update = require("../query/update");

var updateDatabaseEntry = function updateDatabaseEntry(params, modules, cb) {
  var queryDb = modules.queryDb;
  var logger = modules.logger;

  var callback = cb;

  queryDb(_update.updateOrderTable, params, { logger: logger }, function (err, result) {
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
  return updateDatabaseEntry.apply(undefined, arguments);
};
//# sourceMappingURL=db_updates.js.map