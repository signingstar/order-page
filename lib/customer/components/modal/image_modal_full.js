'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageModalFullScreen = function ImageModalFullScreen(_ref) {
  var onClose = _ref.onClose,
      showNext = _ref.showNext,
      showPrevious = _ref.showPrevious,
      image = _ref.image,
      nextLink = _ref.nextLink,
      previousLink = _ref.previousLink,
      showFullScreen = _ref.showFullScreen;
  var destination = image.destination,
      filename = image.filename;

  var fileSrc = '/' + destination + '/' + filename;
  var w = window,
      d = document,
      e = d.documentElement,
      b = d.body,
      x = w.innerWidth || e.clientWidth || b.clientWidth,
      y = w.innerHeight || e.clientHeight || b.clientHeight;

  return _react2.default.createElement(
    'div',
    { className: 'full-screen' },
    _react2.default.createElement(
      'div',
      { className: 'full-screen-image' },
      _react2.default.createElement('img', { src: fileSrc + '_full', style: { maxWidth: x, maxHeight: y } })
    ),
    _react2.default.createElement(
      'div',
      { className: 'image-nav' },
      _react2.default.createElement(
        'div',
        { className: previousLink ? 'slide' : 'slide invisible' },
        previousLink
      ),
      _react2.default.createElement(
        'div',
        { className: nextLink ? 'slide' : 'slide invisible' },
        nextLink
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'fullscreen' },
      _react2.default.createElement(
        'button',
        { className: 'glyph', type: 'button', onClick: showFullScreen },
        _react2.default.createElement('span', { className: 'glyphicon glyphicon-resize-small' })
      )
    )
  );
};

exports.default = ImageModalFullScreen;