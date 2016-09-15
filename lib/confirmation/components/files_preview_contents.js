'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilesPreviewContent = function FilesPreviewContent(_ref) {
  var files = _ref.files;
  var modalHeader = _ref.modalHeader;
  var onClose = _ref.onClose;

  var fileNodes = files.map(function (file) {
    return _react2.default.createElement(
      'div',
      { key: file.name, className: 'card-box' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('img', { src: file.preview })
      ),
      _react2.default.createElement(
        'figcaption',
        null,
        _react2.default.createElement(
          'div',
          { className: 'file-caption' },
          file.name
        )
      )
    );
  });

  return _react2.default.createElement(
    'div',
    { className: 'files-preview-modal' },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h3',
        null,
        modalHeader
      ),
      _react2.default.createElement('div', { className: 'close-icon', onClick: onClose })
    ),
    _react2.default.createElement(
      'div',
      { className: 'files-preview-content' },
      fileNodes
    )
  );
};

exports.default = FilesPreviewContent;