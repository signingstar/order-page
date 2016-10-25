'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadFilesHeader = function UploadFilesHeader(_ref) {
  var onAlbumRemove = _ref.onAlbumRemove;
  var albumCount = _ref.albumCount;
  var albumName = _ref.albumName;
  var onAddImage = _ref.onAddImage;
  var handleNameChange = _ref.handleNameChange;
  var queued = _ref.queued;
  return _react2.default.createElement(
    'div',
    { className: 'upload-header' },
    _react2.default.createElement(
      'div',
      { className: 'album-name' },
      _react2.default.createElement(
        'div',
        { className: 'large-field required' },
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
    ),
    _react2.default.createElement(
      'div',
      { className: 'action-preview' },
      _react2.default.createElement(
        'div',
        { className: 'action' },
        _react2.default.createElement(
          'div',
          { className: 'upload-action' },
          _react2.default.createElement(
            'button',
            { className: 'queue', type: 'button', onClick: onAddImage },
            _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' }),
            'Add Images'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'upload-action' },
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'upload', disabled: queued ? false : true },
            _react2.default.createElement('span', { className: 'glyphicon glyphicon-upload' }),
            'Start Upload'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'preview-mode' },
        _react2.default.createElement(
          'button',
          { className: 'list', type: 'button', onClick: function onClick() {
              return handleModeChange('list');
            } },
          _react2.default.createElement('span', { className: 'glyphicon glyphicon-th-list' })
        ),
        _react2.default.createElement(
          'button',
          { className: 'thumbnail', type: 'button', onClick: function onClick() {
              return handleModeChange('thumbnail');
            } },
          _react2.default.createElement('span', { className: 'glyphicon glyphicon-th-large' })
        )
      )
    )
  );
};

exports.default = UploadFilesHeader;
//# sourceMappingURL=upload_header.js.map