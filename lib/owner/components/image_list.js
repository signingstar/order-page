"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _canvas = require("../containers/canvas");

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CANVAS_THRESHOLD = 1 * 1024 * 1024;

var ImageFiles = function ImageFiles(_ref) {
  var images = _ref.images,
      onRemove = _ref.onRemove,
      placeholder = _ref.placeholder,
      mode = _ref.mode;

  return images.length > 0 ? _react2.default.createElement(
    "div",
    { className: "image-view" },
    mode === 'list' ? _react2.default.createElement(
      "div",
      { className: "list-header" },
      _react2.default.createElement(
        "div",
        { className: "name" },
        "File Name"
      ),
      _react2.default.createElement(
        "div",
        { className: "size" },
        "File Size"
      ),
      _react2.default.createElement(
        "div",
        { className: "action" },
        "Action"
      )
    ) : undefined,
    _react2.default.createElement(
      "ul",
      { className: mode === 'thumbnail' ? 'image-list thumbnail' : 'image-list list' },
      images.map(function (image) {
        return _react2.default.createElement(
          "li",
          { key: image.name, className: "image-list-item" },
          mode === 'thumbnail' ? _react2.default.createElement(_canvas2.default, { image: image, onRemove: onRemove }) : _react2.default.createElement(
            "div",
            { className: "list-view" },
            _react2.default.createElement(
              "div",
              { className: "image-name" },
              image.name
            ),
            _react2.default.createElement(
              "div",
              { className: "image-size" },
              image.size
            ),
            _react2.default.createElement(
              "div",
              { className: "image-action", onClick: function onClick(e) {
                  return onRemove(e, image);
                } },
              String.fromCharCode(0x2013)
            )
          )
        );
      })
    )
  ) : _react2.default.createElement(
    "div",
    { className: "placeholder" },
    placeholder
  );
};

exports.default = ImageFiles;
//# sourceMappingURL=image_list.js.map