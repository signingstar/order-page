"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _image_list = require("../containers/image_list");

var _image_list2 = _interopRequireDefault(_image_list);

var _upload_footer = require("../containers/upload_footer");

var _upload_footer2 = _interopRequireDefault(_upload_footer);

var _upload_header = require("../containers/upload_header");

var _upload_header2 = _interopRequireDefault(_upload_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadFiles = function (_Component) {
  _inherits(UploadFiles, _Component);

  function UploadFiles() {
    _classCallCheck(this, UploadFiles);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  UploadFiles.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        onDrop = _props.onDrop,
        onRemove = _props.onRemove,
        onAlbumRemove = _props.onAlbumRemove,
        handleNameChange = _props.handleNameChange,
        uploadImage = _props.uploadImage,
        handleModeChange = _props.handleModeChange,
        uploadProgress = _props.uploadProgress,
        cancelUpload = _props.cancelUpload,
        uploading = _props.uploading;
    var _props2 = this.props,
        accept = _props2.accept,
        albumId = _props2.albumId,
        mode = _props2.mode;


    return _react2.default.createElement(
      "div",
      { className: "file-upload-area" },
      _react2.default.createElement(
        "form",
        { onSubmit: uploadImage },
        _react2.default.createElement(_upload_header2.default, {
          onAlbumRemove: onAlbumRemove,
          albumId: albumId,
          handleNameChange: handleNameChange,
          onAddImage: function onAddImage() {
            return _this2.dropzone.open();
          },
          handleModeChange: handleModeChange,
          mode: mode
        }),
        _react2.default.createElement(
          "div",
          { className: "drop-area" },
          _react2.default.createElement(
            _reactDropzone2.default,
            {
              className: "upload-box",
              onDrop: onDrop,
              activeClassName: "active",
              rejectClassName: "reject",
              accept: accept,
              ref: function ref(node) {
                _this2.dropzone = node;
              },
              disableClick: true
            },
            _react2.default.createElement(
              "div",
              { className: "upload-content" },
              _react2.default.createElement(_image_list2.default, { onRemove: onRemove, albumId: albumId, mode: mode })
            )
          )
        ),
        _react2.default.createElement(_upload_footer2.default, {
          albumId: albumId,
          uploadProgress: uploadProgress,
          handleCancel: cancelUpload,
          uploading: uploading
        })
      )
    );
  };

  return UploadFiles;
}(_react.Component);

UploadFiles.propTypes = {
  onDrop: _react2.default.PropTypes.func,
  onRemove: _react2.default.PropTypes.func,
  onAlbumRemove: _react2.default.PropTypes.func,
  accept: _react2.default.PropTypes.string,
  handleNameChange: _react2.default.PropTypes.func,
  uploadImage: _react2.default.PropTypes.func,
  albumId: _react2.default.PropTypes.string,
  albumCount: _react2.default.PropTypes.number,
  handleModeChange: _react2.default.PropTypes.func,
  mode: _react2.default.PropTypes.string,
  uploadProgress: _react2.default.PropTypes.number,
  cancelUpload: _react2.default.PropTypes.func
};

exports.default = UploadFiles;