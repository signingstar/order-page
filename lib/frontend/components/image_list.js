"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _canvas = require("../containers/canvas");

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageFiles = function ImageFiles(_ref) {
  var images = _ref.images;
  var onRemove = _ref.onRemove;
  var placeholder = _ref.placeholder;

  return images.length > 0 ? _react2.default.createElement(
    "ul",
    { className: "image-list" },
    images.map(function (image) {
      return _react2.default.createElement(
        "li",
        { key: image.name, className: "image-list-item" },
        _react2.default.createElement(_canvas2.default, { image: image, onRemove: onRemove })
      )
      // <li
      //   className='image-list-item'
      //   key={image.name} >
      //   <div className='image-name'>{image.name}</div>
      //   <div className='image-action' onClick={(e) => onRemove(e, image)}>x</div>
      // </li>
      ;
    })
  ) : _react2.default.createElement(
    "div",
    { className: "placeholder" },
    placeholder
  );
};

exports.default = ImageFiles;
//# sourceMappingURL=image_list.js.map