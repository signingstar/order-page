"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlbumList = function AlbumList(_ref) {
  var usersHash = _ref.usersHash;
  var id = _ref.id;
  var albums = _ref.albums;

  var albumList = albums.map(function (album) {
    return _react2.default.createElement(
      "li",
      { key: album.id, className: "nav-left" },
      _react2.default.createElement(
        _Link2.default,
        {
          to: {
            pathname: "/order/" + usersHash + "/" + id,
            query: { album: album.id }
          },
          activeClassName: "active",
          activeOnlyWhenExact: true
        },
        album.name
      )
    );
  });

  return _react2.default.createElement(
    "ul",
    null,
    albumList
  );
};

exports.default = AlbumList;
//# sourceMappingURL=album_list.js.map