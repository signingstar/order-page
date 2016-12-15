"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavLinks = function NavLinks(_ref) {
  var originalUrl = _ref.originalUrl,
      imageId = _ref.imageId,
      albumId = _ref.albumId,
      index = _ref.index,
      next = _ref.next;

  var nextIndex = next ? index + 1 : index - 1;
  var className = 'glyphicon icon ' + (next ? 'glyphicon-menu-right' : 'glyphicon-menu-left');

  return _react2.default.createElement(
    _Link2.default,
    {
      to: {
        pathname: originalUrl + "/" + imageId,
        state: { originalUrl: originalUrl, fromModal: true, index: nextIndex, albumId: albumId }
      },
      className: "image-nav-item"
    },
    _react2.default.createElement("span", { className: className })
  );
};

exports.default = NavLinks;
//# sourceMappingURL=nav_links.js.map