"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _upload_files = require("../containers/upload_files");

var _upload_files2 = _interopRequireDefault(_upload_files);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessOrderComponent = function ProcessOrderComponent(_ref) {
  var pathname = _ref.pathname,
      onClick = _ref.onClick,
      addAlbum = _ref.addAlbum,
      albums = _ref.albums;

  var albumIds = Object.keys(albums).sort(function (id1, id2) {
    return albums[id1].priority - albums[id2].priority;
  });

  return _react2.default.createElement(
    "div",
    { className: "image-section" },
    _react2.default.createElement(
      "h2",
      null,
      "Upload Files"
    ),
    _react2.default.createElement(
      "div",
      { className: "fields" },
      albumIds.map(function (albumId) {
        return _react2.default.createElement(_upload_files2.default, { key: albumId, albumId: albumId });
      }),
      _react2.default.createElement(
        "div",
        { className: "action-section" },
        _react2.default.createElement(
          "div",
          { className: "add-album row" },
          _react2.default.createElement("input", { type: "button", onClick: addAlbum, value: "+ Add Another Album" })
        ),
        _react2.default.createElement(
          "div",
          { className: "nav-page row" },
          _react2.default.createElement(
            "div",
            { className: "button back" },
            _react2.default.createElement(
              _Link2.default,
              { to: "/order", replace: true, className: "submit-button" },
              "Back"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "button next" },
            _react2.default.createElement("input", { type: "button", onClick: onClick, value: "Next" })
          )
        )
      )
    )
  );
};

exports.default = ProcessOrderComponent;
//# sourceMappingURL=process_order.js.map