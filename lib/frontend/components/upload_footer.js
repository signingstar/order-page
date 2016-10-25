'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadFilesFooter = function UploadFilesFooter(_ref) {
  var queued = _ref.queued;
  var queuedSize = _ref.queuedSize;
  var uploaded = _ref.uploaded;
  var uploadedSize = _ref.uploadedSize;
  var uploadProgress = _ref.uploadProgress;
  var handleCancel = _ref.handleCancel;
  var uploading = _ref.uploading;
  return _react2.default.createElement(
    'div',
    { className: 'upload-footer' },
    _react2.default.createElement(
      'div',
      { className: 'queued' },
      'Images Queued: ',
      queued,
      ' ',
      queuedSize ? ' (' + queuedSize + ')' : '',
      ' '
    ),
    _react2.default.createElement(
      'div',
      { className: 'uploaded' },
      'Images Uploaded: ',
      uploaded,
      ' ',
      uploadedSize ? ' (' + uploadedSize + ')' : ''
    ),
    _react2.default.createElement(
      'div',
      { className: 'upload-progress' },
      _react2.default.createElement(
        'div',
        { className: 'progress' },
        _react2.default.createElement(
          'div',
          {
            className: 'progress-bar progress-bar-info progress-bar-striped',
            role: 'progressbar',
            'aria-valuenow': uploadProgress,
            'aria-valuemin': '0',
            'aria-valuemax': '100',
            style: {
              width: uploadProgress + '%',
              minWidth: '1em'
            }
          },
          _react2.default.createElement(
            'div',
            null,
            uploadProgress,
            '%'
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'upload-action' },
      _react2.default.createElement(
        'button',
        { className: 'cancel', onClick: handleCancel, disabled: uploading ? false : true },
        _react2.default.createElement('span', { className: 'glyphicon glyphicon-ban-circle' }),
        'Cancel Upload'
      )
    )
  );
};

exports.default = UploadFilesFooter;
//# sourceMappingURL=upload_footer.js.map