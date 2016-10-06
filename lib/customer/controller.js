"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _tiskoLayout = require("tisko-layout");

var _tiskoLayout2 = _interopRequireDefault(_tiskoLayout);

var _react_server = require("./react_server");

var _react_server2 = _interopRequireDefault(_react_server);

var _view_customer_order = require("../database/api/view_customer_order");

var _view_customer_order2 = _interopRequireDefault(_view_customer_order);

var _form_validator = require("./presenters/form_validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require("debug")('Modules:Order:Controller');

var controller = function controller(_ref) {
  var modules = _ref.modules;
  var pugCompiler = modules.pugCompiler;
  var logger = modules.logger;
  var jsAsset = modules.jsAsset;
  var cssAsset = modules.cssAsset;
  var queryDb = modules.queryDb;
  var Mailer = modules.Mailer;

  var srcPath = _path2.default.join(__dirname, '../', '../', 'customer_main');
  var renderHTML = pugCompiler(srcPath);
  var title = 'Tisko - My Order';
  var localModule = { logger: logger, queryDb: queryDb };
  var isSecured = true;

  return {
    viewCustomer: function viewCustomer(_ref2) {
      var attributes = _ref2.attributes;
      var responders = _ref2.responders;
      var page = _ref2.page;
      var req = attributes.req;
      var res = attributes.res;
      var session = req.session;
      var orderId = req.params.orderId;
      var location = req.url;

      var _layoutPresenter = (0, _tiskoLayout2.default)({ session: session, topNav: false }, page, { jsAsset: jsAsset });

      var _layoutPresenter$isLo = _layoutPresenter.isLogged;
      var isLogged = _layoutPresenter$isLo === undefined ? false : _layoutPresenter$isLo;
      var user = session.user;


      if (!user || !user.id) {
        responders.redirectForAuthentication(location, "authenticate", logger);
        return;
      }

      var _validateCustomerLink = (0, _form_validator.validateCustomerLinkData)({ orderId: orderId });

      var err = _validateCustomerLink.err;
      var formData = _validateCustomerLink.formData;

      if (err) {
        responders.json(err, { message: 'Bad Input' }, 400);
        return;
      }

      var userid = user.id;
      var orderData = [userid, formData.orderId];

      _async2.default.waterfall([function (done) {
        (0, _view_customer_order2.default)(orderData, { logger: logger, queryDb: queryDb }, function (err, orderResult) {
          done(err, orderResult);
        });
      }, function (orderResult, done) {
        (0, _react_server2.default)({ location: location, orderResult: orderResult }, localModule, function (err, reactHTML, preloadedState) {
          if (err) {
            if (err.reason === 'redirect') {
              res.writeHead(301, {
                Location: result.redirect.pathname
              });
              res.end();
            } else if (err.reason === 'missed') {
              res.status(404).end();
            }
          }
          page.set({
            javascript: jsAsset('customerjs'),
            stylesheet: cssAsset('ordercss'),
            body_class: 'customer-order',
            title: title,
            reactHTML: reactHTML,
            preloadedState: preloadedState
          });

          responders.html(renderHTML(page));
        });
      }], function (err) {
        logger.info('ERROR in viewOrderAsCustomer');
      });
    }
  };
};

exports.default = controller;
//# sourceMappingURL=controller.js.map