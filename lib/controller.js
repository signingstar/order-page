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

var _react_server_view = require("./react_server_view");

var _react_server_view2 = _interopRequireDefault(_react_server_view);

var _view_order = require("./database/api/view_order");

var _api_executor = require("./presenters/api_executor");

var _album = require("./request_builders/album");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require("debug")('Modules:Order:Controller');

var getUserObject = function getUserObject(session, responders, ajax, logger, location) {
  var user = session.user;


  if (!user || !user.id) {
    if (ajax) {
      return responders.json(null, { message: 'Sesstion Timed out' }, 401);
    }
    return responders.redirectForAuthentication(location, "authenticate", logger);
  }

  return user;
};

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
  var localModule = { logger: logger, queryDb: queryDb, redisClient: redisClient };
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


      var user = getUserObject(session, responders, false, logger, location);
      if (!user) return;

      (0, _tiskoLayout2.default)({ user: user, topNav: false }, page, { jsAsset: jsAsset });
      var userid = user.id;

      (0, _react_server2.default)({ location: location, userid: userid }, localModule, function (err, reactHTML, preloadedState) {
        if (err) {
          if (err.reason === 'redirect') {
            res.writeHead(302, {
              Location: err.location
            });

            return res.end();
          } else if (err.reason === 'missed') {
            res.status(404);
          } else if (err.reason === 'order_not_found') {
            res.redirect('/');
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
      var body = req.body;
      var session = req.session;

      var formData = Object.assign({}, body);

      var user = getUserObject(session, responders, true);
      if (!user) return;

      (0, _api_executor.createOrder)({ formData: formData, session: session }, { logger: logger, queryDb: queryDb }, function (_ref4) {
        var err = _ref4.err;
        var orderData = _ref4.orderData;
        var result = _ref4.result;

        if (err) {
          return responders.json(null, err, err.statusCode || 500);
        }
        var order_id = result.order_id;

        orderData.id = order_id;

        (0, _album.addAlbum)({ order_id: order_id }, { redisClient: redisClient }, function (err, result) {
          if (err) return res.status(500).end();
          var id = result.id;
          var name = result.name;
          var priority = result.priority;
          // Send response first. Redis update can happen thereafter

          responders.json({ order_id: order_id, id: id, name: name, priority: priority });
          redisClient.hmset("order_id_" + order_id, orderData);
        });
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


      var user = getUserObject(session, responders, true);
      if (!user) return;

      (0, _api_executor.processOrder)({ params: params, body: body, session: session, location: location }, { logger: logger, queryDb: queryDb }, function (_ref6) {
        var err = _ref6.err;
        var orderData = _ref6.orderData;
        var result = _ref6.result;

        if (err) {
          return responders.json(null, err, err.statusCode || 500);
        }

        var order_id = orderData.order_id;


        redisClient.hget("order_id_" + order_id, 'albums', function (err, res) {
          if (err) return responder.json(err);
          var albums = JSON.parse(res);
          albums.forEach(function (album) {
            if (body[album.id]) album.name = body[album.id];
          });

          redisClient.hmset("order_id_" + order_id, ['albums', JSON.stringify(albums), 'status', 'in_process']);
        });

        responders.json(result);
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


      var user = getUserObject(session, responders, true);
      if (!user) return;

      _async2.default.waterfall([function (done) {
        (0, _api_executor.confirmOrder)({ params: params, body: body, session: session, location: location }, { logger: logger, queryDb: queryDb }, function (_ref8) {
          var err = _ref8.err;
          var orderData = _ref8.orderData;
          var result = _ref8.result;

          if (err) return done(err);

          var order_id = orderData.order_id;
          var order_name = orderData.order_name;

          done(null, { orderId: order_id, orderName: order_name });
        });
      }, function (order, done) {
        var orderId = order.orderId;
        var orderName = order.orderName;

        redisClient.hmset("order_id_" + orderId, ['status', 'confirmed', 'name', orderName]);
        redisClient.hgetall("order_id_" + orderId, function (err, orderData) {
          done(null, orderData);
        });
      }, function (orderData, done) {
        var userData = session.user;
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

    addAlbum: function addAlbum(_ref9) {
      var attributes = _ref9.attributes;
      var responders = _ref9.responders;
      var page = _ref9.page;
      var req = attributes.req;
      var res = attributes.res;
      var params = req.params;
      var body = req.body;
      var session = req.session;
      var location = req.url;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      var order_id = body.order_id;

      (0, _album.addAlbum)({ order_id: order_id }, { redisClient: redisClient }, function (err, result) {
        if (err) return res.status(500).end();
        responders.json(result);
      });
    },

    updateAlbum: function updateAlbum(_ref10) {
      var attributes = _ref10.attributes;
      var responders = _ref10.responders;
      var page = _ref10.page;
      var req = attributes.req;
      var res = attributes.res;
      var params = req.params;
      var body = req.body;
      var session = req.session;
      var location = req.url;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      var order_id = body.order_id;
      var mapping = body.mapping;
      var album_id = body.album_id;
      var action = body.action;


      if (action && !album_id || !action && (!mapping || !Object.keys(mapping))) {
        res.status(400).end();
      }

      if (action === '-1') {
        (0, _album.removeAlbum)({ order_id: order_id, album_id: album_id }, { redisClient: redisClient }, function (err, result) {
          if (err) return res.status(500).end();
          responders.json(result);
        });
      } else {
        (0, _album.updateAlbum)({ order_id: order_id, mapping: mapping }, { redisClient: redisClient }, function (err, result) {
          if (err) return res.status(500).end();
          responders.json(result);
        });
      }
    },

    deleteFile: function deleteFile(_ref11) {
      var attributes = _ref11.attributes;
      var responders = _ref11.responders;
      var page = _ref11.page;
      var req = attributes.req;
      var res = attributes.res;
      var params = req.params;
      var body = req.body;
      var session = req.session;
      var location = req.url;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      var order_id = body.order_id;
      var album_id = body.album_id;
      var filename = body.filename;


      if (!order_id || !filename || !album_id) {
        res.status(400).end();
      }

      (0, _album.removeImage)({ order_id: order_id, album_id: album_id, filename: filename }, { redisClient: redisClient }, function (err, result) {
        if (err) return res.status(500).end();
        responders.json(result);
      });
    },

    // To Get the list of orders
    viewOrders: function viewOrders(_ref12) {
      var attributes = _ref12.attributes;
      var responders = _ref12.responders;
      var page = _ref12.page;
      var req = attributes.req;
      var res = attributes.res;
      var session = req.session;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      (0, _view_order.viewOwnerOrders)([user.id], localModule, function (err, orderResults) {
        if (err) res.status(500).end();

        responders.json(orderResults);
      });
    },

    // This will be order detail page
    viewOrder: function viewOrder(_ref13) {
      var attributes = _ref13.attributes;
      var responders = _ref13.responders;
      var page = _ref13.page;
      var req = attributes.req;
      var res = attributes.res;
      var session = req.session;
      var location = req.url;
      var orderid = req.params.orderid;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      (0, _tiskoLayout2.default)({ user: user, topNav: false }, page, { jsAsset: jsAsset });
      var userid = user.id;

      (0, _react_server_view2.default)({ location: location, userid: userid, orderid: orderid }, localModule, function (err, reactHTML, preloadedState) {
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
    }
  };
};

exports.default = controller;
//# sourceMappingURL=controller.js.map