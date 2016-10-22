'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadFilesHeader = function UploadFilesHeader(_ref) {
  var onAlbumRemove = _ref.onAlbumRemove;
  var albumCount = _ref.albumCount;
  var albumName = _ref.albumName;
  var handleNameChange = _ref.handleNameChange;
  return _react2.default.createElement(
    'div',
    { className: 'row upload-header' },
    _react2.default.createElement(
      'div',
      { className: 'album-name large-field required' },
      _react2.default.createElement(
        'label',
        { htmlFor: 'mainAlbum' },
        'Album Name'
      ),
      _react2.default.createElement('input', {
        type: 'text',
        defaultValue: albumName,
        required: true,
        name: 'albumName',
        onBlur: handleNameChange,
        autoFocus: true
      })
    ),
    albumCount > 1 ? _react2.default.createElement(
      'div',
      { className: 'delete-album' },
      _react2.default.createElement('input', { type: 'button', value: 'Remove Album', onClick: onAlbumRemove })
    ) : undefined
  );
};

exports.default = UploadFilesHeader;
//# sourceMappingURL=upload_header.js.map