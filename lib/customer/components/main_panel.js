"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _image_arrangement = require("../containers/image_arrangement");

var _image_arrangement2 = _interopRequireDefault(_image_arrangement);

var _users = require("../containers/users");

var _users2 = _interopRequireDefault(_users);

var _album_list = require("../containers/album_list");

var _album_list2 = _interopRequireDefault(_album_list);

var _finalize_selection = require("../containers/finalize_selection");

var _finalize_selection2 = _interopRequireDefault(_finalize_selection);

var _images_liked = require("../containers/images_liked");

var _images_liked2 = _interopRequireDefault(_images_liked);

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
        { className: "all-images" },
        _react2.default.createElement(
          "li",
          { className: "nav-left" },
          _react2.default.createElement(
            Link,
            {
              to: "/order/" + usersHash + "/" + id,
              activeClassName: "active",
              activeOnlyWhenExact: true,
              isActive: function isActive(location) {
                return (!location.query || !location.query.album) && location.pathname.Route(/^\/order\/[a-z0-9]+\/[0-9]+$/);
              }
            },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-picture icon" }),
            "All Photos"
          )
        )
      ),
      role === 5 ? _react2.default.createElement(
        "ul",
        { className: "admin-panel" },
        _react2.default.createElement(
          "li",
          { className: "nav-left" },
          _react2.default.createElement(
            Link,
            {
              to: "/order/" + usersHash + "/" + id + "/adduser",
              activeClassName: "active"
            },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-user icon" }),
            "Add Users"
          )
        ),
        _react2.default.createElement(
          "li",
          { className: "nav-left" },
          _react2.default.createElement(
            Link,
            {
              to: "/order/" + usersHash + "/" + id + "/liked",
              activeClassName: "active"
            },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-thumbs-up icon" }),
            "Images Liked"
          )
        ),
        _react2.default.createElement(
          "li",
          { className: "nav-left submit" },
          _react2.default.createElement(
            Link,
            {
              to: "/order/" + usersHash + "/" + id + "/finalize",
              activeClassName: "active"
            },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-ok icon" }),
            "Finalize & Submit"
          )
        )
      ) : null
    ),
    _react2.default.createElement(
      "div",
      { className: "right-panel" },
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/order/:usersHash/:orderId", component: _image_arrangement2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/order/:usersHash/:orderId/adduser", component: _users2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/order/:usersHash/:orderId/finalize", component: _finalize_selection2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/order/:usersHash/:orderId/liked", component: _images_liked2.default })
    )
  );
};

exports.default = MainPanel;