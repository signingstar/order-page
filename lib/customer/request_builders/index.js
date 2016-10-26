"use strict";

exports.__esModule = true;

var _albums2 = require("./albums");

var _albums3 = _interopRequireDefault(_albums2);

var _fetch_db_order = require("./fetch_db_order");

var _fetch_db_order2 = _interopRequireDefault(_fetch_db_order);

var _images2 = require("./images");

var _images3 = _interopRequireDefault(_images2);

var _image_reactions = require("./image_reactions");

var _image_reactions2 = _interopRequireDefault(_image_reactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestList = function requestList(modules) {

  return {
    albums: function albums(params, cb) {
      return (0, _albums3.default)(params, modules, cb);
    },
    fetchOrderForCustomer: function fetchOrderForCustomer(params, cb) {
      return (0, _fetch_db_order2.default)(params, modules, cb);
    },
    images: function images(params, cb) {
      return (0, _images3.default)(params, modules, cb);
    },
    imageReactions: function imageReactions(params, cb) {
      return (0, _image_reactions2.default)(params, modules, cb);
    }
  };
};

exports.default = requestList;
//# sourceMappingURL=index.js.map