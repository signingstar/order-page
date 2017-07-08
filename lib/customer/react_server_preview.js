"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _store = require("./preview/store");

var _store2 = _interopRequireDefault(_store);

var _app = require("./preview/components/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var albumifyImages = function albumifyImages(imageList, albumList) {
  var albums = {};

  albumList.forEach(function (album, index) {
    return albums[album.id.toString()] = { name: album.name, priority: index + 1, files: [] };
  });

  imageList.forEach(function (image) {
    return albums[image.album_id].files.push(image);
  });

  return albums;
};

var prepareInitialState = function prepareInitialState(order) {
  var imageList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var albums = arguments[2];
  var users = order.users;


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

  return { order: order, images: images, users: userList };
};

var ReactComponent = function ReactComponent(location, _ref, _ref2, cb) {
  var images = _ref.images,
      orderResult = _ref.orderResult,
      albums = _ref.albums;
  var logger = _ref2.logger,
      queryDb = _ref2.queryDb,
      redisClient = _ref2.redisClient;

  var err = null;
  var initialPayload = prepareInitialState(orderResult, images, albums);

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

  // Grab the initial state from our Redux store
  var preloadedState = store.getState();

  cb(err, reactHTML, preloadedState);
};

exports.default = ReactComponent;