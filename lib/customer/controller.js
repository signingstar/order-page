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

var _react_server_preview = require("./react_server_preview");

var _react_server_preview2 = _interopRequireDefault(_react_server_preview);

var _view_order = require("../database/api/view_order");

var _db_updates = require("../database/api/db_updates");

var _form_validator = require("./presenters/form_validator");

var _request_builders = require("./request_builders");

var _request_builders2 = _interopRequireDefault(_request_builders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require("debug")('Modules:Order:Controller');

var controller = function controller(_ref) {
  var modules = _ref.modules;
  var pugCompiler = modules.pugCompiler,
      logger = modules.logger,
      jsAsset = modules.jsAsset,
      cssAsset = modules.cssAsset,
      queryDb = modules.queryDb,
      Mailer = modules.Mailer,
      redisClient = modules.redisClient;

  var srcPath = _path2.default.join(__dirname, '../', '../', 'customer_main');
  var renderHTML = pugCompiler(srcPath);
  var title = 'Tisko - My Order';
  var localModule = { logger: logger, queryDb: queryDb, redisClient: redisClient };
  var isSecured = true;
  var RequestBuilder = (0, _request_builders2.default)({ redisClient: redisClient, queryDb: queryDb, logger: logger });

  var getUserObject = function getUserObject(session, responders, ajax, location) {
    var user = session.user;


    if (!user || !user.id) {
      if (ajax) {
        return responders.json(null, { message: 'Session Timed out' }, 401);
      }
      return responders.redirectForAuthentication(location, "authenticate", logger);
    }

    return user;
  };

  return {
    viewCustomer: function viewCustomer(_ref2) {
      var attributes = _ref2.attributes,
          responders = _ref2.responders,
          page = _ref2.page;
      var req = attributes.req,
          res = attributes.res;
      var session = req.session,
          _req$params = req.params,
          orderId = _req$params.orderId,
          image_id = _req$params.image_id,
          location = req.url;


      var user = getUserObject(session, responders, false, location);
      if (!user) return;

      (0, _tiskoLayout2.default)({ user: user, topNav: false }, page, { jsAsset: jsAsset });

      var _validateCustomerLink = (0, _form_validator.validateCustomerLinkData)({ orderId: orderId }),
          err = _validateCustomerLink.err,
          formData = _validateCustomerLink.formData;

      if (err) {
        responders.json(err, { message: 'Bad Input' }, 400);
        return;
      }

      var userid = user.id;
      var order_id = formData.orderId;
      var orderQueryData = [userid, order_id, user.email];

      var fetchOrderForCustomer = RequestBuilder.fetchOrderForCustomer,
          getAlbums = RequestBuilder.getAlbums,
          getImages = RequestBuilder.getImages,
          getImageReactions = RequestBuilder.getImageReactions;


      _async2.default.waterfall([function (done) {
        _async2.default.parallel({
          orderResult: function orderResult(cb) {
            return fetchOrderForCustomer(orderQueryData, cb);
          },
          albums: function albums(cb) {
            return getAlbums(order_id, cb);
          },
          images: function images(cb) {
            return getImages(order_id, cb);
          },
          imageReaction: function imageReaction(cb) {
            return getImageReactions({ order_id: order_id, image_id: image_id, user_id: userid }, cb);
          }
        }, function (err, results) {
          return done(err, results);
        });
      }, function (results, done) {
        var orderResult = results.orderResult,
            images = results.images,
            albums = results.albums,
            imageReaction = results.imageReaction;


        orderResult.id = order_id;
        if (!orderResult.productid) {
          return responders.redirectWithoutCookies("/myorder/" + orderid, logger, '[Incorrect Portal]');
        }
        (0, _react_server2.default)(location, results, localModule, function (err, reactHTML, preloadedState) {
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
            stylesheet: cssAsset('customercss'),
            body_class: 'customer-order',
            title: title,
            reactHTML: reactHTML,
            preloadedState: preloadedState
          });

          responders.html(renderHTML(page));
        });
      }], function (err) {
        logger.error('ERROR in viewOrderAsCustomer' + err);
        return res.status(500).end();
      });
    },

    viewPreview: function viewPreview(_ref3) {
      var attributes = _ref3.attributes,
          responders = _ref3.responders,
          page = _ref3.page;
      var req = attributes.req,
          res = attributes.res;
      var _req$params2 = req.params,
          orderid = _req$params2.orderid,
          image_id = _req$params2.image_id,
          location = req.url;


      (0, _tiskoLayout2.default)({ undefined: undefined, topNav: false }, page, { jsAsset: jsAsset });

      // TODO: Remove hard coded user id
      var orderQueryData = ['3011b393-e9bf-4177-b50a-7a25fc4a64d2', orderid, 'abc'];

      var fetchOrderForCustomer = RequestBuilder.fetchOrderForCustomer,
          _albums = RequestBuilder.albums,
          _images = RequestBuilder.images,
          imageReactions = RequestBuilder.imageReactions;


      _async2.default.waterfall([function (done) {
        _async2.default.parallel({
          orderResult: function orderResult(cb) {
            return fetchOrderForCustomer(orderQueryData, cb);
          },
          albums: function albums(cb) {
            return _albums(orderid, cb);
          },
          images: function images(cb) {
            return _images(orderid, cb);
          }
        }, function (err, results) {
          return done(err, results);
        });
      }, function (results, done) {
        var orderResult = results.orderResult,
            images = results.images,
            albums = results.albums;


        orderResult.id = orderid;
        (0, _react_server_preview2.default)(location, results, localModule, function (err, reactHTML, preloadedState) {
          page.set({
            javascript: jsAsset('preview'),
            stylesheet: cssAsset('customercss'),
            body_class: 'customer-order',
            title: title,
            reactHTML: reactHTML,
            preloadedState: preloadedState
          });

          responders.html(renderHTML(page));
        });
      }], function (err) {
        logger.error('ERROR in viewOrderAsCustomer' + err);
        return res.status(500).end();
      });
    },

    customerFeedback: function customerFeedback(_ref4) {
      var attributes = _ref4.attributes,
          responders = _ref4.responders,
          page = _ref4.page;
      var req = attributes.req,
          res = attributes.res;
      var session = req.session,
          body = req.body;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      var reaction = body.reaction_type,
          image_id = body.image_uuid,
          order_id = body.order_id,
          index = body.index;
      var setImageReaction = RequestBuilder.setImageReaction;


      setImageReaction({ order_id: order_id, user: user, reaction: reaction, image_id: image_id });
      res.status(200).end();
    },

    getReaction: function getReaction(_ref5) {
      var attributes = _ref5.attributes,
          responders = _ref5.responders,
          page = _ref5.page;
      var req = attributes.req,
          res = attributes.res;
      var session = req.session,
          query = req.query;
      var order_id = query.order_id;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      var getImages = RequestBuilder.getImages,
          getImageReactions = RequestBuilder.getImageReactions;


      _async2.default.waterfall([function (done) {
        return getImages(order_id, done);
      }, function (files, done) {
        var filesReactionMap = {};

        files.forEach(function (file, index) {
          var id = file.id,
              album_id = file.album_id;

          getImageReactions({ order_id: order_id, image_id: id, user_id: user.id, album_id: album_id }, function (err, res) {
            if (err) return done(err);

            if (res !== null) {
              filesReactionMap[id] = res[id];
            }

            if (index === files.length - 1) {
              return done(null, filesReactionMap);
            }
          });
        });
      }, function (filesMap, done) {
        responders.json(filesMap);
      }], function (err) {
        logger.error('Error while fetching data');
        res.status(500).end();
      });
    },

    addUser: function addUser(_ref6) {
      var attributes = _ref6.attributes,
          responders = _ref6.responders,
          page = _ref6.page;
      var req = attributes.req,
          res = attributes.res;
      var session = req.session,
          body = req.body;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      var emailid = body.emailid,
          role = body.role,
          order_id = body.order_id;


      (0, _db_updates.addUser)([emailid, "{\"active\": true, \"role\": " + role + "}", order_id, user.id], { queryDb: queryDb, logger: logger }, function (err, result) {
        if (err) return res.status(500).end();
        res.status(200).end();
      });
    },

    deactivateUser: function deactivateUser(_ref7) {
      var attributes = _ref7.attributes,
          responders = _ref7.responders,
          page = _ref7.page;
      var req = attributes.req,
          res = attributes.res;
      var session = req.session,
          body = req.body;


      var user = getUserObject(session, responders, true);
      if (!user) return;

      var emailid = body.emailid,
          order_id = body.order_id;


      (0, _db_updates.addUser)([emailid, "{\"active\": false, \"role\": 1}", order_id, user.id], { queryDb: queryDb, logger: logger }, function (err, result) {
        if (err) return res.status(500).end();
        res.status(200).end();
      });
    }

  };
};

exports.default = controller;
//# sourceMappingURL=controller.js.map