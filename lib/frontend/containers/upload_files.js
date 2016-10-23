"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _upload_files = require("../components/upload_files");

var _upload_files2 = _interopRequireDefault(_upload_files);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadFilesHandler = function (_React$Component) {
  _inherits(UploadFilesHandler, _React$Component);

  function UploadFilesHandler() {
    _classCallCheck(this, UploadFilesHandler);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.onImageAdd = _this.onImageAdd.bind(_this);
    _this.onImageRemove = _this.onImageRemove.bind(_this);
    _this.onAlbumRemove = _this.onAlbumRemove.bind(_this);
    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.handleModeChange = _this.handleModeChange.bind(_this);
    _this.trackProgress = _this.trackProgress.bind(_this);
    _this.handleCancelUpload = _this.handleCancelUpload.bind(_this);

    _this.state = {
      previewMode: 'list',
      uploadPercent: 0
    };
    return _this;
  }

  UploadFilesHandler.prototype.trackProgress = function trackProgress(e) {
    if (e.lengthComputable) {
      var max = e.total;
      var current = e.loaded;

      var uploadPercent = Math.round(current * 100 / max);
      this.setState({ uploadPercent: uploadPercent });
    }
  };

  UploadFilesHandler.prototype.handleSubmit = function handleSubmit(e) {
    var _this2 = this;

    e.preventDefault();

    var _props = this.props;
    var album = _props.album;
    var albumId = _props.albumId;
    var order = _props.order;
    var onUpload = _props.onUpload;

    var files = album.files;
    var fileNames = [];
    var formData = new FormData();

    formData.append('order_id', order.id);
    formData.append('album_id', albumId);
    formData.append('album_name', album.name);

    files.map(function (file) {
      if (!file.uploaded) {
        formData.append('images', file);
        fileNames.push(file.name);
      }
    });

    formData.append('imagelist', fileNames);

    var uploading = (0, _actions.uploadImages)(formData, this.trackProgress, function () {
      _this2.setState({ uploading: false });
      onUpload(album.id);
    });
    this.setState({ uploading: uploading });
  };

  UploadFilesHandler.prototype.handleCancelUpload = function handleCancelUpload() {
    var uploading = this.state.uploading;


    if (uploading) {
      uploading.abort();
    }
  };

  UploadFilesHandler.prototype.handleModeChange = function handleModeChange(mode) {
    this.setState({ previewMode: mode });
  };

  UploadFilesHandler.prototype.handleNameChange = function handleNameChange(e) {
    var album = this.props.album;


    album.name = e.target.value;
  };

  UploadFilesHandler.prototype.onImageAdd = function onImageAdd(acceptedFiles, rejectedFiles) {
    var _props2 = this.props;
    var album = _props2.album;
    var onDrop = _props2.onDrop;

    var albumId = album.id;
    onDrop(acceptedFiles, albumId);
  };

  UploadFilesHandler.prototype.onImageRemove = function onImageRemove(e, file) {
    e.stopPropagation();
    var _props3 = this.props;
    var order = _props3.order;
    var albumId = _props3.albumId;
    var removeImageFromStore = _props3.removeImageFromStore;


    if (file.uploaded) {
      (0, _actions.deleteFile)({ order_id: order.id, filename: file.name, album_id: albumId }, function (_ref) {
        var res = _ref.res;
        var err = _ref.err;
        return console.log(res);
      });
    }

    removeImageFromStore(file, albumId);
  };

  UploadFilesHandler.prototype.onAlbumRemove = function onAlbumRemove() {
    var _props4 = this.props;
    var albumId = _props4.albumId;
    var removeAlbumFromStore = _props4.removeAlbumFromStore;
    var order = _props4.order;


    (0, _actions.updateAlbum)({ order_id: order.id, album_id: albumId, action: -1 }, function (_ref2) {
      var res = _ref2.res;
      var err = _ref2.err;

      if (!err && res.count) {
        removeAlbumFromStore(albumId);
      }
    });
  };

  UploadFilesHandler.prototype.render = function render() {
    var acceptFiles = 'image/jpeg, image/png, .ai';
    var _props5 = this.props;
    var onRemove = _props5.onRemove;
    var album = _props5.album;
    var albumId = _props5.albumId;
    var albumCount = _props5.albumCount;


    return _react2.default.createElement(_upload_files2.default, {
      onDrop: this.onImageAdd,
      accept: acceptFiles,
      onRemove: this.onImageRemove,
      onAlbumRemove: this.onAlbumRemove,
      uploadImage: this.handleSubmit,
      albumId: albumId,
      albumName: album.name,
      handleNameChange: this.handleNameChange,
      albumCount: albumCount,
      disablePreview: true,
      handleModeChange: this.handleModeChange,
      mode: this.state.previewMode,
      uploadProgress: this.state.uploadPercent,
      cancelUpload: this.handleCancelUpload
    });
  };

  return UploadFilesHandler;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var albumId = ownProps.albumId;


  return {
    order: store.order,
    album: store.image[albumId],
    albumCount: Object.keys(store.image).length
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  var albumId = ownProps.albumId;


  return {
    onDrop: function onDrop(images) {
      dispatch((0, _actions.setImages)(images, albumId));
    },

    removeImageFromStore: function removeImageFromStore(image) {
      dispatch((0, _actions.removeImage)(image, albumId));
    },

    removeAlbumFromStore: function removeAlbumFromStore() {
      dispatch((0, _actions.removeAlbum)(albumId));
    },

    onUpload: function onUpload() {
      dispatch((0, _actions.setImageUploaded)(albumId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadFilesHandler);
//# sourceMappingURL=upload_files.js.map