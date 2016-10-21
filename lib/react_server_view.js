"use strict";

exports.__esModule = true;

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _underscore = require("underscore");

var _store = require("./frontend/store");

var _store2 = _interopRequireDefault(_store);

var _app = require("./frontend/components/app");

var _app2 = _interopRequireDefault(_app);

var _view_order = require("./request_builders/view_order");

var _view_order2 = _interopRequireDefault(_view_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var albumifyImages = function albumifyImages(imageList, albumList) {
  var albums = {};

  albumList.forEach(function (album, index) {
    return albums[album.id.toString()] = { name: album.name, priority: index + 1, files: [] };
  });

  imageList.forEach(function (image) {
    image = JSON.parse(image);
    albums[image.album_id].files.push(Object.assign(image, { name: image.originalname }));
  });

  Object.keys(albums).forEach(function (albumId) {
    var count = albums[albumId].uploaded = albums[albumId].files.length;
    var size = count > 1 ? albums[albumId].files.reduce(function (prev, curr) {
      return prev.size + curr.size;
    }) : count > 0 ? albums[albumId].files[0].size : 0;
    albums[albumId].uploadedSize = size;
  });

  return albums;
};

var prepareInitialState = function prepareInitialState(results) {
  var products = results.products;
  var _results$orderInfo = results.orderInfo;
  var order = _results$orderInfo.order;
  var files = _results$orderInfo.files;

  var productObj = products.find(function (product) {
    return product.id === +order.product;
  });

  order.product = productObj ? { key: productObj.id, value: productObj.description } : '';
  order.customer = (0, _underscore.pick)(order, 'email', 'phone_number', 'image_count', 'category');
  order.customer.cust_name = order.first_name + " " + order.last_name;

  var _pick = (0, _underscore.pick)(order, 'albums');

  var albums = _pick.albums;


  return albumifyImages(files, albums);
};

var ReactComponent = function ReactComponent(_ref, _ref2, cb) {
  var location = _ref.location;
  var userid = _ref.userid;
  var orderid = _ref.orderid;
  var logger = _ref2.logger;
  var queryDb = _ref2.queryDb;
  var redisClient = _ref2.redisClient;

  var err = null;
  var context = (0, _reactRouter.createServerRenderContext)();
  var requests = (0, _view_order2.default)({ userid: userid, orderid: orderid }, { logger: logger, queryDb: queryDb, redisClient: redisClient });

  _async2.default.waterfall([function (done) {
    _async2.default.parallel(requests, function (err, results) {
      done(err, results);
    });
  }, function (results, done) {
    // const initialPayload = JSON.parse(`
    //   {
    //     "products":[
    //       {"id":1,"name":"wedding_album","description":"Wedding Album Design and Printing"},
    //       {"id":2,"name":"retouching","description":"Image Retouching"},
    //       {"id":3,"name":"post_processing","description":"Image Post-Processing"},
    //       {"id":4,"name":"portrait_album","description":"Portrait Album Design and Printing"}
    //     ],
    //     "categories":[
    //       {"id":3,"name":"babynkids","description":"Baby & Kids"},
    //       {"id":4,"name":"anniversary","description":"Birthday/Anniversary"},
    //       {"id":5,"name":"wedding","description":"Wedding"},
    //       {"id":6,"name":"travel","description":"Travel & Adventure"}
    //     ],
    //     "product":{"key":1,"value":"Wedding Album Design and Printing"},
    //     "customer":{"cust_name":"Test user","email":"test3@user.com","phone_number":"234","category":"anniversary","image_count":"2","dirty":false},
    //     "order":{"id":121},
    //     "image":{
    //       "624":{"name":"Pre-Wedding","priority":100,"queued":0,"queuedSize":0,"uploaded":2,"uploadedSize":228446,"files":[{"size": 100000},{"size": 250000}]},
    //       "652":{"name":"Wedding","priority":120,"queued":0,"queuedSize":0,"uploaded":1,"uploadedSize":543307,"files":[{"size": 200000}]}
    //     },
    //       "error":{}
    //   }`)

    var products = results.products;
    var categories = results.categories;
    var _results$orderInfo2 = results.orderInfo;
    var order = _results$orderInfo2.order;
    var files = _results$orderInfo2.files;

    var albums = prepareInitialState(results);
    var initialPayload = { products: products, categories: categories, order: order, image: albums };

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
  }]);
};

exports.default = ReactComponent;
//# sourceMappingURL=react_server_view.js.map