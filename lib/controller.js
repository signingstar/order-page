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

var _api_executor = require("./presenters/api_executor");

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
  var redisClient = modules.redisClient;

  var srcPath = _path2.default.join(__dirname, '../', 'main');
  var renderHTML = pugCompiler(srcPath);
  var title = 'Tisko - Place an Order';
  var localModule = { logger: logger, queryDb: queryDb };
  var isSecured = true;

  return {
    main: function main(_ref2) {
      var attributes = _ref2.attributes;
      var responders = _ref2.responders;
      var page = _ref2.page;
      var req = attributes.req;
      var res = attributes.res;
      var session = req.session;
      var location = req.url;

      var _layoutPresenter = (0, _tiskoLayout2.default)({ session: session, topNav: false }, page, { jsAsset: jsAsset });

      var _layoutPresenter$isLo = _layoutPresenter.isLogged;
      var isLogged = _layoutPresenter$isLo === undefined ? false : _layoutPresenter$isLo;


      if (isSecured && !isLogged) {
        responders.redirectForAuthentication(location, "authenticate", logger);
        return;
      }

      var userid = session.user.id;

      (0, _react_server2.default)({ location: location, userid: userid }, localModule, function (err, reactHTML, preloadedState) {
        if (err) {
          if (err.reason === 'redirect') {
            res.writeHead(302, {
              Location: err.location
            });

            return res.end();
          } else if (err.reason === 'missed') {
            res.status(404);
          }
        }

        page.set({
          javascript: jsAsset('orderjs'),
          stylesheet: cssAsset('ordercss'),
          body_class: 'order',
          title: title,
          reactHTML: reactHTML,
          preloadedState: preloadedState
        });

        responders.html(renderHTML(page));
      });
    },

    create: function create(_ref3) {
      var attributes = _ref3.attributes;
      var responders = _ref3.responders;
      var page = _ref3.page;
      var req = attributes.req;
      var res = attributes.res;
      var params = req.params;
      var body = req.body;
      var session = req.session;
      var location = req.url;

      var formData = Object.assign({}, body);

      (0, _api_executor.createOrder)({ formData: formData, session: session }, { logger: logger, queryDb: queryDb }, function (_ref4) {
        var err = _ref4.err;
        var orderData = _ref4.orderData;
        var result = _ref4.result;

        if (err) {
          return responders.json(null, err, err.statusCode || 500);
        }
        var order_id = result.order_id;


        responders.json(result);
        redisClient.hmset("order_id_" + order_id, orderData);
        redisClient.hmset("order_id_" + order_id, ['id', order_id]);
      });
    },

    process: function process(_ref5) {
      var attributes = _ref5.attributes;
      var responders = _ref5.responders;
      var page = _ref5.page;
      var req = attributes.req;
      var res = attributes.res;
      var params = req.params;
      var body = req.body;
      var session = req.session;
      var location = req.url;


      (0, _api_executor.processOrder)({ params: params, body: body, session: session, location: location }, { logger: logger, queryDb: queryDb }, function (_ref6) {
        var err = _ref6.err;
        var orderData = _ref6.orderData;
        var result = _ref6.result;

        if (err) {
          return responders.json(null, err, err.statusCode || 500);
        }

        // redisClient.hgetall(`order_id_${orderData.order_id}`, (err, obj) => {
        //   console.dir(obj)
        // })

        responders.json(result);
        redisClient.hset("order_id_" + orderData.order_id, ['status', 'in_process']);
      });
    },

    confirm: function confirm(_ref7) {
      var attributes = _ref7.attributes;
      var responders = _ref7.responders;
      var page = _ref7.page;
      var req = attributes.req;
      var res = attributes.res;
      var params = req.params;
      var body = req.body;
      var session = req.session;
      var location = req.url;

      _async2.default.waterfall([function (done) {
        (0, _api_executor.confirmOrder)({ params: params, body: body, session: session, location: location }, { logger: logger, queryDb: queryDb }, function (_ref8) {
          var err = _ref8.err;
          var orderData = _ref8.orderData;
          var result = _ref8.result;

          done(err, { orderId: orderData.order_id });
        });
      }, function (order, done) {
        var orderId = order.orderId;

        redisClient.hset("order_id_" + orderId, ['status', 'confirmed']);
        redisClient.hgetall("order_id_" + orderId, function (err, orderData) {
          done(null, orderData, session.user);
        });
      }, function (orderData, userData, done) {
        var mailOptions = {
          to: orderData.email,
          cc: userData.email,
          from: 'verify@tisko.com',
          subject: 'Tisko Order Creation',
          text: 'You are receiving this because Anil has created request on behalf of you.\n\n' + 'Please click on the following link, or paste this into your browser to view the details:\n\n' + ("http://" + req.headers.host + "/order/random_string/" + orderData.id) + '\n\n' + 'If you did not request this, please ignore this email and chill out :D.\n'
        };

        Mailer(mailOptions)(function (err, info) {
          if (err) {
            req.flash('An error occured whie sending the reset email');
          } else {
            req.flash('info', 'An e-mail has been sent to ' + 'me' + ' with further instructions.');
          }
          res.status(200).end();
        });
      }], function (err) {
        res.status(500).end();
      });
    },

    viewOwner: function viewOwner(_ref9) {
      var attributes = _ref9.attributes;
      var responders = _ref9.responders;
      var page = _ref9.page;
      var req = attributes.req;
      var res = attributes.res;

      var orderId = req.params.orderid;
    }
  };
};

exports.default = controller;
//# sourceMappingURL=controller.js.map