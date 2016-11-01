"use strict";

exports.__esModule = true;
exports.mergeReaction = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _request_builders = require("../request_builders");

var _request_builders2 = _interopRequireDefault(_request_builders);

var _actions = require("./frontend/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var albumifyImages = function albumifyImages(imageList, albumList) {
  var albums = {};

  albumList.forEach(function (album, index) {
    return albums[album.id.toString()] = { name: album.name, priority: index + 1, files: [] };
  });

  for (var imageId in imageList) {
    var image = imageList[imageId];
    albums[image.album_id].files.push(Object.assign(image, { id: imageId }));
  }
  // Object.keys(imageList).forEach((image) => albums[image.album_id].files.push(image) )

  return albums;
};

var prepareInitialState = function prepareInitialState(order, staticData) {
  var imageList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var imageReaction = arguments[3];
  var albums = arguments[4];
  var products = staticData.products,
      categories = staticData.categories;

  var product = products.find(function (product) {
    return product.id === order.productid;
  });
  var users = order.users;


  order.productLabel = product.description;
  var userList = [];

  if (users && order.role === 5) {
    var userIds = Object.keys(users);

    for (var userId in users) {
      var user = users[userId];

      if (user.active) {
        userList.push(_extends({ email: userId }, users[userId]));
      }
    }
  }

  delete order.users;
  var images = albumifyImages(imageList, albums);
  var imagesWithReaction = imageReaction ? mergeReaction(imageReaction, imageList) : images;

  return { order: order, images: images, users: userList };
};

var mergeReaction = exports.mergeReaction = function mergeReaction(reaction, images) {
  var image_id = Object.keys(reaction)[0];
  var image = images.find(function (image) {
    return image_id === image.id;
  });

  image[_actions.LIKES] = reaction[image_id].likes;
  image[_actions.LIKED] = reaction[image_id].liked;
};

var ReactComponent = function ReactComponent(location, _ref, _ref2, cb) {
  var images = _ref.images,
      orderResult = _ref.orderResult,
      albums = _ref.albums,
      imageReaction = _ref.imageReaction;
  var logger = _ref2.logger,
      queryDb = _ref2.queryDb,
      redisClient = _ref2.redisClient;

  var context = (0, _reactRouter.createServerRenderContext)();
  var RequestBuilder = (0, _request_builders2.default)({ redisClient: redisClient, queryDb: queryDb, logger: logger });

  var requests = { products: RequestBuilder.products, categories: RequestBuilder.categories };
  // const requests = RequestBuilder({logger, queryDb, redisClient})

  _async2.default.waterfall([function (done) {
    _async2.default.parallel(requests, function (err, results) {
      done(err, results);
    });
  }, function (results, done) {
    var err = null;
    var initialPayload = prepareInitialState(orderResult, results, images, imageReaction, albums);

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