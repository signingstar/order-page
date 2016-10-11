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

var _actions = require("./frontend/actions");

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

  var srcPath = _path2.default.join(__dirname, '../', '../', 'customer_main');
  var renderHTML = pugCompiler(srcPath);
  var title = 'Tisko - My Order';
  var localModule = { logger: logger, queryDb: queryDb, redisClient: redisClient };
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
      var orderid = formData.orderId;
      var orderQueryData = [userid, orderid];

      _async2.default.waterfall([function (done) {
        _async2.default.parallel({
          orderResult: function orderResult(cb) {
            (0, _view_customer_order2.default)(orderQueryData, localModule, function (err, orderResult) {
              orderResult.id = orderid;

              cb(err, orderResult);
            });
          },
          images: function images(cb) {
            redisClient.zrange("order_id_" + orderid + ":files", [0, -1], function (err, res) {
              cb(err, res);
            });
          }
        }, function (err, results) {
          return done(err, results);
        });
      }, function (results, done) {
        var orderResult = results.orderResult;
        var images = results.images;

        if (!orderResult.productid) {
          return responders.redirectWithoutCookies("/myorder/" + orderid, logger, '[Incorrect Portal]');
        }
        (0, _react_server2.default)({ location: location, orderResult: orderResult, images: images }, localModule, function (err, reactHTML, preloadedState) {
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

    customerFeedback: function customerFeedback(_ref3) {
      var attributes = _ref3.attributes;
      var responders = _ref3.responders;
      var page = _ref3.page;
      var req = attributes.req;
      var res = attributes.res;
      var session = req.session;
      var body = req.body;
      var location = req.url;
      var user = session.user;


      if (!user || !user.id) {
        return res.status(401).end();
      }

      var reaction_type = body.reaction_type;
      var image_uuid = body.image_uuid;
      var order_id = body.order_id;
      var index = body.index;


      var fileToUserMap = {
        user_name: user.first_name,
        reaction: reaction_type
      };

      redisClient.hset("order_id_" + order_id + ":files:" + image_uuid, [user.id, JSON.stringify(fileToUserMap)]);

      var userToFileMap = {
        image_id: image_uuid,
        reaction: reaction_type
      };

      redisClient.zadd(["order_id_" + order_id + ":users:" + user.id, +new Date(), JSON.stringify(userToFileMap)]);
      res.status(200).end();
    },

    getReaction: function getReaction(_ref4) {
      var attributes = _ref4.attributes;
      var responders = _ref4.responders;
      var page = _ref4.page;
      var req = attributes.req;
      var res = attributes.res;
      var session = req.session;
      var query = req.query;
      var user = session.user;
      var order_id = query.order_id;


      if (!user || !user.id) {
        return res.status(401).end();
      }

      _async2.default.waterfall([function (done) {
        redisClient.zrange("order_id_" + order_id + ":files", [0, 10], function (err, res) {
          done(err, res);
        });
      }, function (files, done) {
        var filesReactionMap = {};

        files.forEach(function (file, index) {
          var fileObj = JSON.parse(file);
          redisClient.hgetall("order_id_" + order_id + ":files:" + fileObj.id, function (err, res) {
            if (!err) {
              if (res && res !== null) {
                filesReactionMap[index] = parseReactions(res, user.id);
              }

              if (index === files.length - 1) {
                return done(null, filesReactionMap);
              }
            } else {
              return done(err);
            }
          });
        });
      }, function (filesMap, done) {
        responders.json(filesMap);
      }], function (err) {
        logger.error('Error while fetching data');
        res.status(500).end();
      });
    }
  };
};

var parseReactions = function parseReactions(obj, userId) {
  if (!obj) {
    return;
  }

  var reactionObj = { likes: false, liked: [] };

  for (var index in obj) {
    var jsonObj = JSON.parse(obj[index]);

    if (index === userId) {
      reactionObj[_actions.LIKES] = +jsonObj.reaction;
    } else {
      reactionObj[_actions.LIKED].push({ name: jsonObj.user_name, reaction_type: jsonObj.reaction });
    }
  }

  return reactionObj;
};

exports.default = controller;
//# sourceMappingURL=controller.js.map