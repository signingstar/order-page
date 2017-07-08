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

var _underscore = require("underscore");

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _app = require("./components/app");

var _app2 = _interopRequireDefault(_app);

var _globals = require("../globals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var albumifyImages = function albumifyImages(imageList, albumList) {
  var albums = {};

  albumList.forEach(function (album, index) {
    return albums[album.id] = { name: album.name, priority: index + 1, files: [] };
  });

  for (var imageId in imageList) {
    var image = imageList[imageId];
    albums[image.album_id].files.push(imageId);
  }
  // Object.keys(imageList).forEach((image) => albums[image.album_id].files.push(image) )

  return albums;
};

var prepareInitialState = function prepareInitialState(order, products, categories, imageReaction) {
  var users = order.users,
      productid = order.productid,
      albumlist = order.albumlist,
      imagefiles = order.imagefiles;


  var product = products.find(function (product) {
    return product.id === order.productid;
  });

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

  var albums = albumifyImages(imagefiles, albumlist);
  var minOrder = (0, _underscore.pick)(order, 'id', 'productLabel', 'role', 'photographer', 'orderstatus');

  // const imagesWithReaction = imageReaction ? mergeReaction(imageReaction, imagefiles) : images

  return { order: minOrder, images: imagefiles, users: userList, albums: albums };
};

var mergeReaction = exports.mergeReaction = function mergeReaction(reaction, images) {
  var image_id = Object.keys(reaction)[0];
  var image = images.find(function (image) {
    return image_id === image.id;
  });

  image[_globals.LIKES] = reaction[image_id].likes;
  image[_globals.LIKED] = reaction[image_id].liked;
};

var ReactComponent = function ReactComponent(location, _ref, cb) {
  var orderResult = _ref.orderResult,
      products = _ref.products,
      categories = _ref.categories,
      imageReaction = _ref.imageReaction;

  var err = null;
  var initialPayload = prepareInitialState(orderResult, products, categories, imageReaction);
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

  cb(err, { reactHTML: reactHTML, preloadedState: preloadedState });
};

exports.default = ReactComponent;