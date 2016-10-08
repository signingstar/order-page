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

var _request_builder = require("../request_builder");

var _request_builder2 = _interopRequireDefault(_request_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareInitialState = function prepareInitialState(orderData, staticData) {
  var imageList = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
  var products = staticData.products;
  var categories = staticData.categories;

  var product = products.find(function (product) {
    return product.id === orderData.productid;
  });
  var order = Object.assign({}, orderData, {
    productLabel: product.description
  });

  var images = imageList.map(function (image) {
    return JSON.parse(image);
  });

  return { order: order, images: images };
};

var ReactComponent = function ReactComponent(_ref, _ref2, cb) {
  var location = _ref.location;
  var images = _ref.images;
  var orderResult = _ref.orderResult;
  var logger = _ref2.logger;
  var queryDb = _ref2.queryDb;
  var redisClient = _ref2.redisClient;

  var context = (0, _reactRouter.createServerRenderContext)();
  var requests = (0, _request_builder2.default)({ logger: logger, queryDb: queryDb, redisClient: redisClient });

  _async2.default.waterfall([function (done) {
    _async2.default.parallel(requests, function (err, results) {
      done(err, results);
    });
  }, function (results, done) {
    var err = null;
    var initialPayload = prepareInitialState(orderResult, results, images);

    var context = (0, _reactRouter.createServerRenderContext)();
    // Create a new Redux store instance
    var store = (0, _store2.default)(initialPayload);

    var reactHTML = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouter.ServerRouter,
        { location: location, context: context },
        _react2.default.createElement(_app2.default, null)
      )
    ));

    var result = context.getResult();

    if (result.redirect) {
      err = { reason: 'redirect', location: result.redirect.pathname };
      cb(err);
    } else {
      if (result.missed) {
        reactHTML = (0, _server.renderToString)(_react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(
            _reactRouter.ServerRouter,
            { location: location, context: context },
            _react2.default.createElement(_app2.default, null)
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
//# sourceMappingURL=react_server.js.map