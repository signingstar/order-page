"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router-dom/Link");

var _Link2 = _interopRequireDefault(_Link);

var _Route = require("react-router/Route");

var _Route2 = _interopRequireDefault(_Route);

var _image_arrangement = require("../containers/image_arrangement");

var _image_arrangement2 = _interopRequireDefault(_image_arrangement);

var _add_user = require("../containers/add_user");

var _add_user2 = _interopRequireDefault(_add_user);

var _album_list = require("../containers/album_list");

var _album_list2 = _interopRequireDefault(_album_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainPanel = function MainPanel(_ref) {
  var order = _ref.order,
      usersHash = _ref.usersHash,
      query = _ref.query;
  var role = order.role,
      id = order.id;


  return _react2.default.createElement(
    "div",
    { className: "main-panel" },
    _react2.default.createElement(
      "div",
      { className: "left-panel" },
      _react2.default.createElement(_album_list2.default, { usersHash: usersHash, id: id }),
      _react2.default.createElement(
        "ul",
        null,
        _react2.default.createElement(
          "li",
          { className: "nav-left" },
          _react2.default.createElement(
            _Link2.default,
            {
              to: "/orders/" + id + "/preview",
              activeClassName: "active",
              activeOnlyWhenExact: true,
              isActive: function isActive(location) {
                return (!location.query || !location.query.album) && location.pathname.Route(/^\/orders\/[a-z0-9]+\/preview$/);
              }
            },
            "All Photos"
          )
        ),
        role === 5 ? _react2.default.createElement(
          "li",
          { className: "nav-left" },
          _react2.default.createElement(
            _Link2.default,
            {
              to: "/orders/" + id + "/preview/addUser",
              activeClassName: "active"
            },
            "Add User"
          )
        ) : null
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "right-panel" },
      _react2.default.createElement(_Route2.default, { exactly: true, pattern: "/orders/:orderId/preview", component: _image_arrangement2.default }),
      _react2.default.createElement(_Route2.default, { exactly: true, pattern: "/orders/:orderId/preview/addUser", component: _add_user2.default })
    )
  );
};

exports.default = MainPanel;