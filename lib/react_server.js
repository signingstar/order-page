"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _store = require("./frontend/store");

var _store2 = _interopRequireDefault(_store);

var _app = require("./frontend/components/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactComponent = function ReactComponent(_ref, _ref2, cb) {
  var location = _ref.location;
  var userid = _ref.userid;
  var logger = _ref2.logger;
  var queryDb = _ref2.queryDb;

  var err = null;

  //TODO Add validation
  var initialPayload = {};

  var context = (0, _reactRouter.createServerRenderContext)();
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
};

exports.default = ReactComponent;
//# sourceMappingURL=react_server.js.map