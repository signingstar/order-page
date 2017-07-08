"use strict";

exports.__esModule = true;

var _redux = require("redux");

var _order = require("./order");

var _order2 = _interopRequireDefault(_order);

var _albums = require("./albums");

var _albums2 = _interopRequireDefault(_albums);

var _images = require("./images");

var _images2 = _interopRequireDefault(_images);

var _users = require("./users");

var _users2 = _interopRequireDefault(_users);

var _reaction_by_user = require("./reaction_by_user");

var _reaction_by_user2 = _interopRequireDefault(_reaction_by_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderApp = (0, _redux.combineReducers)({
  order: _order2.default,
  albums: _albums2.default,
  images: _images2.default,
  users: _users2.default,
  reactionByUser: _reaction_by_user2.default
});

exports.default = orderApp;