'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageFiles = function ImageFiles(_ref) {
  var images = _ref.images;
  var onRemove = _ref.onRemove;
  var placeholder = _ref.placeholder;

  return images.length > 0 ? _react2.default.createElement(
    'ul',
    { className: 'image-list' },
    images.map(function (image) {
      return _react2.default.createElement(
        'li',
        {
          className: 'image-list-item',
          key: image.name },
        _react2.default.createElement(
          'div',
          { className: 'image-name' },
          image.name
        ),
        _react2.default.createElement(
          'div',
          { className: 'image-action', onClick: function onClick(e) {
              return onRemove(e, image);
            } },
          'x'
        )
      );
    })
  ) : _react2.default.createElement(
    'div',
    { className: 'placeholder' },
    placeholder
  );
};

exports.default = ImageFiles;
//# sourceMappingURL=image_list.js.map