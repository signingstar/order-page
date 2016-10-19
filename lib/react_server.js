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

var _request_builder = require("./request_builder");

var _request_builder2 = _interopRequireDefault(_request_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactComponent = function ReactComponent(_ref, _ref2, cb) {
  var location = _ref.location;
  var userid = _ref.userid;
  var logger = _ref2.logger;
  var queryDb = _ref2.queryDb;
  var redisClient = _ref2.redisClient;

  var err = null;
  var context = (0, _reactRouter.createServerRenderContext)();
  var requests = (0, _request_builder2.default)({ logger: logger, queryDb: queryDb, redisClient: redisClient });

  _async2.default.waterfall([function (done) {
    _async2.default.parallel(requests, function (err, results) {
      done(err, results);
    });
  }, function (results, done) {
    var initialPayload = JSON.parse("\n          {\n            \"products\":[\n              {\"id\":1,\"name\":\"wedding_album\",\"description\":\"Wedding Album Design and Printing\"},\n              {\"id\":2,\"name\":\"retouching\",\"description\":\"Image Retouching\"},\n              {\"id\":3,\"name\":\"post_processing\",\"description\":\"Image Post-Processing\"},\n              {\"id\":4,\"name\":\"portrait_album\",\"description\":\"Portrait Album Design and Printing\"}\n            ],\n            \"categories\":[\n              {\"id\":3,\"name\":\"babynkids\",\"description\":\"Baby & Kids\"},\n              {\"id\":4,\"name\":\"anniversary\",\"description\":\"Birthday/Anniversary\"},\n              {\"id\":5,\"name\":\"wedding\",\"description\":\"Wedding\"},\n              {\"id\":6,\"name\":\"travel\",\"description\":\"Travel & Adventure\"}\n            ],\n            \"product\":{\"key\":1,\"value\":\"Wedding Album Design and Printing\"},\n            \"customer\":{\"cust_name\":\"Test user\",\"email\":\"test3@user.com\",\"phone_number\":\"234\",\"category\":\"anniversary\",\"image_count\":\"2\",\"dirty\":false},\n            \"order\":{\"id\":121},\n            \"image\":{\n              \"624\":{\"name\":\"Pre-Wedding\",\"priority\":100,\"queued\":0,\"queuedSize\":0,\"uploaded\":2,\"uploadedSize\":228446,\"files\":[{\"size\": 100000},{\"size\": 250000}]},\n              \"652\":{\"name\":\"Wedding\",\"priority\":120,\"queued\":0,\"queuedSize\":0,\"uploaded\":1,\"uploadedSize\":543307,\"files\":[{\"size\": 200000}]}\n            },\n              \"error\":{}\n          }");

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
//# sourceMappingURL=react_server.js.map