"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _Match = require("react-router/Match");

var _Match2 = _interopRequireDefault(_Match);

var _image_arrangement = require("../containers/image_arrangement");

var _image_arrangement2 = _interopRequireDefault(_image_arrangement);

var _add_user = require("../containers/add_user");

var _add_user2 = _interopRequireDefault(_add_user);

var _album_list = require("../containers/album_list");

var _album_list2 = _interopRequireDefault(_album_list);

var _finalize_selection = require("../containers/finalize_selection");

var _finalize_selection2 = _interopRequireDefault(_finalize_selection);

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
            _Link2.default,
            {
              to: "/order/" + usersHash + "/" + id,
              activeClassName: "active",
              activeOnlyWhenExact: true,
              isActive: function isActive(location) {
                return (!location.query || !location.query.album) && location.pathname.match(/^\/order\/[a-z0-9]+\/[0-9]+$/);
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
            _Link2.default,
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
            _Link2.default,
            {
              to: "/order/" + usersHash + "/" + id + "/finalize",
              activeClassName: "active"
            },
            _react2.default.createElement("span", { className: "glyphicon glyphicon-ok icon" }),
            "Finalize Selection"
          )
        )
      ) : null
    ),
    _react2.default.createElement(
      "div",
      { className: "right-panel" },
      _react2.default.createElement(_Match2.default, { exactly: true, pattern: "/order/:usersHash/:orderId", component: _image_arrangement2.default }),
      _react2.default.createElement(_Match2.default, { exactly: true, pattern: "/order/:usersHash/:orderId/adduser", component: _add_user2.default }),
      _react2.default.createElement(_Match2.default, { exactly: true, pattern: "/order/:usersHash/:orderId/finalize", component: _finalize_selection2.default })
    )
  );
};

exports.default = MainPanel;
//# sourceMappingURL=main_panel.js.map