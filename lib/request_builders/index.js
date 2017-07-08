"use strict";

exports.__esModule = true;

var _all_images = require("./all_images");

var _all_images2 = _interopRequireDefault(_all_images);

var _raw_images = require("./raw_images");

var _raw_images2 = _interopRequireDefault(_raw_images);

var _albums = require("./customer/albums");

var _albums2 = _interopRequireDefault(_albums);

var _fetch_db_order = require("./customer/fetch_db_order");

var _fetch_db_order2 = _interopRequireDefault(_fetch_db_order);

var _image_reactions = require("./customer/image_reactions");

var _image_reactions2 = _interopRequireDefault(_image_reactions);

var _set_image_reaction = require("./customer/set_image_reaction");

var _set_image_reaction2 = _interopRequireDefault(_set_image_reaction);

var _qualify_image = require("./customer/qualify_image");

var _qualify_image2 = _interopRequireDefault(_qualify_image);

var _add_album = require("./owner/add_album");

var _add_album2 = _interopRequireDefault(_add_album);

var _update_album = require("./owner/update_album");

var _update_album2 = _interopRequireDefault(_update_album);

var _remove_album = require("./owner/remove_album");

var _remove_album2 = _interopRequireDefault(_remove_album);

var _remove_file = require("./owner/remove_file");

var _remove_file2 = _interopRequireDefault(_remove_file);

var _search_remove_file = require("./owner/search_remove_file");

var _search_remove_file2 = _interopRequireDefault(_search_remove_file);

var _view_order = require("./owner/view_order");

var _view_order2 = _interopRequireDefault(_view_order);

var _persist_order = require("./owner/persist_order");

var _persist_order2 = _interopRequireDefault(_persist_order);

var _order_info = require("./owner/order_info");

var _order_info2 = _interopRequireDefault(_order_info);

var _products2 = require("./products");

var _products3 = _interopRequireDefault(_products2);

var _categories2 = require("./categories");

var _categories3 = _interopRequireDefault(_categories2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------ Common ---------------------


// ------------------ Creator -------------------
var requestList = function requestList(modules) {
  var logger = modules.logger,
      queryDb = modules.queryDb,
      Mailer = modules.Mailer,
      redisClient = modules.redisClient;


  return {
    getAlbums: function getAlbums(params, cb) {
      return (0, _albums2.default)(params, modules, cb);
    },
    fetchOrderForCustomer: function fetchOrderForCustomer(params, cb) {
      return (0, _fetch_db_order2.default)(params, modules, cb);
    },
    getImages: function getImages(params, cb) {
      return (0, _all_images2.default)(params, modules, cb);
    },
    getImageReactions: function getImageReactions(params, cb) {
      return (0, _image_reactions2.default)(params, modules, cb);
    },
    setImageReaction: function setImageReaction(params, cb) {
      return (0, _set_image_reaction2.default)(params, modules, cb);
    },
    forceQualifyImage: function forceQualifyImage(params, cb) {
      return (0, _qualify_image2.default)(params, modules, cb);
    },
    viewOrder: function viewOrder(params, cb) {
      return (0, _view_order2.default)(params, modules, cb);
    },

    getOrderInfo: function getOrderInfo(params, cb) {
      return (0, _order_info2.default)(params, { redisClient: redisClient }, cb);
    },
    addAlbum: function addAlbum(params, cb) {
      return (0, _add_album2.default)(params, { redisClient: redisClient }, cb);
    },
    updateAlbum: function updateAlbum(params, cb) {
      return (0, _update_album2.default)(params, { redisClient: redisClient }, cb);
    },
    removeAlbum: function removeAlbum(params, cb) {
      return (0, _remove_album2.default)(params, { redisClient: redisClient }, cb);
    },
    removeFile: function removeFile(params, cb) {
      return (0, _remove_file2.default)(params, { redisClient: redisClient }, cb);
    },
    searchAndRemoveFile: function searchAndRemoveFile(params, cb) {
      return (0, _search_remove_file2.default)(params, { redisClient: redisClient }, cb);
    },
    persistOrder: function persistOrder(params, cb) {
      return (0, _persist_order2.default)(params, { queryDb: queryDb, logger: logger }, cb);
    },
    getRawImages: function getRawImages(params, cb) {
      return (0, _raw_images2.default)(params, modules, cb);
    },

    // Static Data

    products: function products(cb) {
      return (0, _products3.default)(modules, cb);
    },
    categories: function categories(cb) {
      return (0, _categories3.default)(modules, cb);
    }
  };
};

// ----------------- Customer ------------------
exports.default = requestList;