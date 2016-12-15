"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _image_tile = require("../containers/image_tile");

var _image_tile2 = _interopRequireDefault(_image_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageTiles = function ImageTiles(props) {
  var images = props.images,
      pathname = props.pathname,
      albumId = props.albumId;


  var imageNodes = images.map(function (image, index) {
    return _react2.default.createElement(_image_tile2.default, { index: index, key: image, id: image, pathname: pathname, albumId: albumId });
  });

  return _react2.default.createElement(
    "div",
    { className: "thumbnail" },
    imageNodes
  );
};

exports.default = ImageTiles;
//# sourceMappingURL=image_tiles.js.map