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

var _upload_header = require("../components/upload_header");

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

    var _props = this.props;
    var onDrop = _props.onDrop;
    var onRemove = _props.onRemove;
    var onAlbumRemove = _props.onAlbumRemove;
    var accept = _props.accept;
    var albumName = _props.albumName;
    var handleNameChange = _props.handleNameChange;
    var uploadImage = _props.uploadImage;
    var albumId = _props.albumId;
    var albumCount = _props.albumCount;

    return _react2.default.createElement(
      "div",
      { className: "file-upload-area" },
      _react2.default.createElement(
        "form",
        { onSubmit: uploadImage },
        _react2.default.createElement(_upload_header2.default, {
          onAlbumRemove: onAlbumRemove,
          albumCount: albumCount,
          albumName: albumName,
          handleNameChange: handleNameChange
        }),
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
            _react2.default.createElement(_image_list2.default, { onRemove: onRemove, albumId: albumId })
          )
        ),
        _react2.default.createElement(_upload_footer2.default, { albumId: albumId, onAddImage: function onAddImage() {
            return _this2.dropzone.open();
          } })
      )
    );
  };

  return UploadFiles;
}(_react.Component);

exports.default = UploadFiles;
//# sourceMappingURL=upload_files.js.map