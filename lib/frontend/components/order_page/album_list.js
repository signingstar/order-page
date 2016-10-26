"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _album = require("../../containers/order_page/album");

var _album2 = _interopRequireDefault(_album);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlbumList = function AlbumList(_ref) {
  var albumList = _ref.albumList;
  var itemHeight = _ref.itemHeight;
  var itemSpacing = _ref.itemSpacing;

  var albumLength = albumList.length;

  return _react2.default.createElement(
    "div",
    { className: "album-container" },
    _react2.default.createElement(
      "ul",
      { className: "album-list-view" },
      albumList.map(function (entry, index) {
        return _react2.default.createElement(_album2.default, { album: entry, key: entry.name });
      })
    )
  );
};

exports.default = AlbumList;
//# sourceMappingURL=album_list.js.map