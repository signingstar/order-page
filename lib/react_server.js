"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _store = require("./frontend/store");

var _store2 = _interopRequireDefault(_store);

var _app = require("./frontend/components/app");

var _app2 = _interopRequireDefault(_app);

var _view_order = require("./request_builders/creater/view_order");

var _view_order2 = _interopRequireDefault(_view_order);

var _view_order3 = require("./database/api/view_order");

var _populate_order = require("./presenters/populate_order");

var _populate_order2 = _interopRequireDefault(_populate_order);

var _request_builders = require("./request_builders");

var _request_builders2 = _interopRequireDefault(_request_builders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactComponent = function ReactComponent(_ref, _ref2, cb) {
  var location = _ref.location,
      userid = _ref.userid;
  var logger = _ref2.logger,
      queryDb = _ref2.queryDb,
      redisClient = _ref2.redisClient;

  var err = null;
  var context = (0, _reactRouter.createServerRenderContext)();
  var pageInProgress = location === '/order/process' || location === '/order/confirm' ? true : false;
  var RequestBuilder = (0, _request_builders2.default)({ redisClient: redisClient, queryDb: queryDb, logger: logger });

  var requests = { products: RequestBuilder.products, categories: RequestBuilder.categories };

  _async2.default.waterfall([function (done) {
    if (pageInProgress) {
      (0, _view_order3.viewInProgressOrder)([userid], { logger: logger, queryDb: queryDb }, function (err, res) {
        if (res && res.length) {
          return done(null, { orderid: res[0].id, status: res[0].status });
        }
        done(err, {});
      });
    } else {
      done(null, {});
    }
  }, function (_ref3, done) {
    var orderid = _ref3.orderid,
        status = _ref3.status;

    if (pageInProgress) {
      if (orderid) {
        var requestOrderData = (0, _view_order2.default)({ userid: userid, orderid: orderid }, { logger: logger, queryDb: queryDb, redisClient: redisClient });
        Object.assign(requests, requestOrderData);
      } else {
        return done({ reason: 'order_not_found' });
      }
    }

    _async2.default.parallel(requests, function (err, results) {
      done(err, results);
    });
  }, function (results, done) {
    var initialPayload = (0, _populate_order2.default)(results);

    // Create a new Redux store instance
    var store = (0, _store2.default)(initialPayload);

    var reactHTML = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouter.ServerRouter,
        { location: location, context: context },
        _react2.default.createElement(_app2.default, { location: location })
      )
    ));

    var result = context.getResult();

    if (result.redirect) {
      err = { reason: 'redirect', location: result.redirect.pathname };
      return cb(err);
    } else {
      if (result.missed) {
        reactHTML = (0, _server.renderToString)(_react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(
            _reactRouter.ServerRouter,
            { location: location, context: context },
            _react2.default.createElement(_app2.default, { location: location })
          )
        ));

        err = { reason: 'missed' };
      }
    }
    // Grab the initial state from our Redux store
    var preloadedState = store.getState();

    cb(err, reactHTML, preloadedState);
  }], function (err) {
    cb(err);
  });
};

exports.default = ReactComponent;
//# sourceMappingURL=react_server.js.map