'use strict';

exports.__esModule = true;

var _select = require('../query/select');

var getStaticDetails = function getStaticDetails(category, modules, cb) {
  var queryDb = modules.queryDb;
  var logger = modules.logger;

  var callback = cb;
  var selectQuery = void 0;

  switch (category) {
    case 'products':
      selectQuery = _select.products;
      break;
    case 'categories':
      selectQuery = _select.categories;
      break;
  }

  queryDb(selectQuery, [], { logger: logger }, function (err, result) {
    if (err || result.rowCount === 0) {
      logger.error('[DATABASE] error while fetching the static records');
      callback(err, result);
      return;
    }

    logger.info('[DATABASE] Static data fetched successfully');
    callback(err, result.rows);
  });
};

exports.default = getStaticDetails;
//# sourceMappingURL=select_from_orders.js.map