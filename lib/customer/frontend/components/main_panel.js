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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainPanel = function MainPanel(_ref) {
  var order = _ref.order;
  var usersHash = _ref.usersHash;
  var role = order.role;
  var id = order.id;


  return _react2.default.createElement(
    "div",
    { className: "main-panel" },
    _react2.default.createElement(
      "div",
      { className: "left-panel" },
      role === 5 ? _react2.default.createElement(
        _Link2.default,
        { to: "/order/" + usersHash + "/" + id + "/addUser" },
        "Add User"
      ) : null
    ),
    _react2.default.createElement(
      "div",
      { className: "right-panel" },
      _react2.default.createElement(_Match2.default, { exactly: true, pattern: "/order/:usersHash/:orderId", component: _image_arrangement2.default }),
      _react2.default.createElement(_Match2.default, { exactly: true, pattern: "/order/:usersHash/:orderId/addUser", component: _add_user2.default })
    )
  );
};

exports.default = MainPanel;
//# sourceMappingURL=main_panel.js.map