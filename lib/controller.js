'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _tiskoHeader = require('tisko-header');

var _tiskoHeader2 = _interopRequireDefault(_tiskoHeader);

var _react_server = require('./react_server');

var _react_server2 = _interopRequireDefault(_react_server);

var _store = require('./frontend/store');

var _store2 = _interopRequireDefault(_store);

var _routes = require('./frontend/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require("debug")('Modules:Order:Controller');

var orderController = function orderController(_ref) {
  var modules = _ref.modules;
  var pug = modules.pug;
  var logger = modules.logger;
  var jsAsset = modules.jsAsset;
  var cssAsset = modules.cssAsset;

  var srcPath = _path2.default.join(__dirname, '../main.pug');
  var fn = pug.compileFile(srcPath, { cache: false, pretty: true });

  return {
    main: function main(_ref2) {
      var attributes = _ref2.attributes;
      var responders = _ref2.responders;
      var page = _ref2.page;
      var req = attributes.req;
      var res = attributes.res;
      var cookies = req.cookies;

      var title = 'Tisko - Place an Order';

      var location = req.url;
      var category = req.params.category;

      var memoryHistory = (0, _reactRouter.createMemoryHistory)(location);
      var store = (0, _store2.default)(memoryHistory);
      var history = (0, _reactRouterRedux.syncHistoryWithStore)(memoryHistory, store);

      (0, _tiskoHeader2.default)({ cookies: cookies, topNav: true }, page);

      page.set({
        promotional_header: false,
        javascript: jsAsset('orderjs'),
        stylesheet: cssAsset('ordercss'),
        title: title,
        body_class: 'order'
      });

      (0, _reactRouter.match)({ routes: _routes2.default, location: location, history: history }, function (error, redirectLocation, renderProps) {
        if (renderProps) {
          var _ReactComponent = (0, _react_server2.default)(renderProps, history);

          var reactHTML = _ReactComponent.reactHTML;
          var preloadedState = _ReactComponent.preloadedState;

          page.set({
            reactHTML: reactHTML,
            preloadedState: preloadedState
          });

          var html = fn(page);

          responders.html(html);
        } else if (redirectLocation) {
          var redirectionPath = redirectLocation.pathname + redirectLocation.search;
          logger.info('Redirecting to: ' + redirectionPath);
          res.redirect(302, redirectionPath);
        } else {
          logger.info('renderProps is not passed');
          responders.error();
        }
      });
    }
  };
};

exports.default = orderController;