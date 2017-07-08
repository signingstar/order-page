"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _underscore = require("underscore");

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _app = require("./components/app");

var _app2 = _interopRequireDefault(_app);

var _populate_order = require("./presenters/populate_order");

var _populate_order2 = _interopRequireDefault(_populate_order);

var _request_builders = require("../request_builders");

var _request_builders2 = _interopRequireDefault(_request_builders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactComponent = function ReactComponent(_ref, _ref2, cb) {
  var location = _ref.location,
      userid = _ref.userid,
      orderid = _ref.orderid;
  var logger = _ref2.logger,
      queryDb = _ref2.queryDb,
      redisClient = _ref2.redisClient;

  var err = null;
  var context = (0, _reactRouter.createServerRenderContext)();
  var RequestBuilder = (0, _request_builders2.default)({ redisClient: redisClient, queryDb: queryDb, logger: logger });
  var products = RequestBuilder.products,
      categories = RequestBuilder.categories,
      viewOrder = RequestBuilder.viewOrder;

  var _viewOrder = viewOrder({ orderid: orderid, userid: userid }),
      order = _viewOrder.order,
      files = _viewOrder.files;

  var requests = { products: products, categories: categories, order: order, files: files };

  _async2.default.waterfall([function (done) {
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
  }]);
};

exports.default = ReactComponent;