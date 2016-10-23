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
  var onAddImage = _ref.onAddImage;
  var uploadProgress = _ref.uploadProgress;
  var handleCancel = _ref.handleCancel;
  return _react2.default.createElement(
    'div',
    { className: 'upload-footer' },
    _react2.default.createElement(
      'div',
      { className: 'action' },
      _react2.default.createElement(
        'div',
        { className: 'upload-action' },
        _react2.default.createElement('input', { type: 'button', value: 'Add Images', onClick: onAddImage })
      ),
      _react2.default.createElement(
        'div',
        { className: 'upload-action' },
        _react2.default.createElement('input', { type: 'submit', value: 'Start Upload', disabled: queued ? false : true })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'status' },
      _react2.default.createElement(
        'div',
        { className: 'queued status' },
        'Queued: ',
        queued,
        ' ',
        queuedSize ? ' (' + queuedSize + ')' : undefined,
        ' '
      ),
      _react2.default.createElement(
        'div',
        { className: 'uploaded status' },
        'Uploaded: ',
        uploaded,
        ' ',
        uploadedSize ? ' (' + uploadedSize + ')' : undefined
      ),
      _react2.default.createElement(
        'div',
        null,
        uploadProgress
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { type: 'button', onClick: handleCancel, value: 'Cancel' })
      )
    )
  );
};

exports.default = UploadFilesFooter;
//# sourceMappingURL=upload_footer.js.map