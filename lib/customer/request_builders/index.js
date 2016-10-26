"use strict";

exports.__esModule = true;

var _albums = require("./albums");

var _albums2 = _interopRequireDefault(_albums);

var _fetch_db_order = require("./fetch_db_order");

var _fetch_db_order2 = _interopRequireDefault(_fetch_db_order);

var _images = require("./images");

var _images2 = _interopRequireDefault(_images);

var _image_reactions = require("./image_reactions");

var _image_reactions2 = _interopRequireDefault(_image_reactions);

var _set_image_reaction = require("./set_image_reaction");

var _set_image_reaction2 = _interopRequireDefault(_set_image_reaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestList = function requestList(modules) {

  return {
    getAlbums: function getAlbums(params, cb) {
      return (0, _albums2.default)(params, modules, cb);
    },
    fetchOrderForCustomer: function fetchOrderForCustomer(params, cb) {
      return (0, _fetch_db_order2.default)(params, modules, cb);
    },
    getImages: function getImages(params, cb) {
      return (0, _images2.default)(params, modules, cb);
    },
    getImageReactions: function getImageReactions(params, cb) {
      return (0, _image_reactions2.default)(params, modules, cb);
    },
    setImageReaction: function setImageReaction(params, cb) {
      return (0, _set_image_reaction2.default)(params, modules, cb);
    }
  };
};

exports.default = requestList;
//# sourceMappingURL=index.js.map